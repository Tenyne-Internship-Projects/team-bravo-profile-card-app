const request = require("supertest");
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

jest.mock("@prisma/client");
jest.mock("bcryptjs");
jest.mock("../utils/generateToken", () => jest.fn(() => "mocked-jwt-token"));
jest.mock("../utils/sendmail", () => ({
  sendVerificationEmail: jest.fn(),
  sendResetEmail: jest.fn(),
}));

const {
  registerUser,
  verifAccount,
  login,
  logout,
  resetPassword,
} = require("../controllers/userController");

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

// Mock routes using your controllers for testing
app.post("/register", registerUser);
app.post("/verify", verifAccount);
app.post("/login", login);
app.post("/logout", logout);
app.post("/reset-password", resetPassword);

describe("User Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("registerUser", () => {
    it("should register a user successfully", async () => {
      prisma.user.findUnique.mockResolvedValue(null); // no existing user
      bcrypt.hash.mockResolvedValue("hashed-password");
      prisma.user.create.mockResolvedValue({
        id: 1,
        email: "test@example.com",
        fullname: "Test User",
        profile: { fullName: "Test User" },
      });

      const response = await request(app)
        .post("/register")
        .send({
          fullname: "Test User",
          email: "test@example.com",
          password: "password123",
          gender: "male",
          age: "25",
          dateOfBirth: "1996-01-01",
          profession: "Developer",
          specialization: "Backend",
          location: "Earth",
          bio: "Hello",
          skills: JSON.stringify(["JS", "Node"]),
          linkedIn: "linkedin-url",
          github: "github-url",
          primaryEmail: "test@example.com",
          phoneNumber: "1234567890",
          salaryExpectation: "50000",
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe("User registered successfully");
      expect(response.body.token).toBe("mocked-jwt-token");
      expect(prisma.user.create).toHaveBeenCalled();
    });

    it("should return 400 if user already exists", async () => {
      prisma.user.findUnique.mockResolvedValue({
        id: 1,
        email: "test@example.com",
      });

      const response = await request(app).post("/register").send({
        fullname: "Test User",
        email: "test@example.com",
        password: "password123",
      });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("User already exists");
    });
  });

  describe("verifAccount", () => {
    it("should verify account with valid token", async () => {
      const user = {
        email: "test@example.com",
        isVerified: false,
        codes: [
          { code: "123456", expiresAt: new Date(Date.now() + 10000) }, // valid
        ],
      };
      prisma.user.findUnique.mockResolvedValue(user);
      prisma.user.update.mockResolvedValue({});

      const response = await request(app)
        .post("/verify")
        .send({ email: "test@example.com", token: "123456" });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Account verified successfully");
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { email: "test@example.com" },
        data: { isVerified: true },
      });
    });

    it("should return 400 if token invalid or expired", async () => {
      const user = {
        email: "test@example.com",
        isVerified: false,
        codes: [
          { code: "123456", expiresAt: new Date(Date.now() - 10000) }, // expired
        ],
      };
      prisma.user.findUnique.mockResolvedValue(user);

      const response = await request(app)
        .post("/verify")
        .send({ email: "test@example.com", token: "123456" });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Invalid or expired token");
    });

    it("should return 404 if user not found", async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      const response = await request(app)
        .post("/verify")
        .send({ email: "unknown@example.com", token: "123456" });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("User not found");
    });
  });

  describe("login", () => {
    it("should login successfully with valid credentials", async () => {
      const user = {
        id: 1,
        email: "test@example.com",
        password: "hashed-password",
      };

      prisma.user.findUnique.mockResolvedValue(user);
      bcrypt.compare.mockResolvedValue(true);
      prisma.user.update.mockResolvedValue({});

      const response = await request(app)
        .post("/login")
        .send({ email: "test@example.com", password: "password123" });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Login successful");
      expect(response.body.token).toBe("mocked-jwt-token");
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { token: "mocked-jwt-token" },
      });
    });

    it("should fail login with invalid email", async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      const response = await request(app)
        .post("/login")
        .send({ email: "wrong@example.com", password: "password123" });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Invalid email or password");
    });

    it("should fail login with invalid password", async () => {
      prisma.user.findUnique.mockResolvedValue({
        id: 1,
        email: "test@example.com",
        password: "hashed-password",
      });
      bcrypt.compare.mockResolvedValue(false);

      const response = await request(app)
        .post("/login")
        .send({ email: "test@example.com", password: "wrongpass" });

      expect(response.status).toBe(400);
      expect(response.body.message).toBe("Invalid email or password");
    });
  });

  describe("logout", () => {
    it("should logout successfully", async () => {
      prisma.user.update.mockResolvedValue({});

      const response = await request(app)
        .post("/logout")
        .send({ email: "test@example.com" });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Logout successful");
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { email: "test@example.com" },
        data: { token: null },
      });
    });
  });

  describe("resetPassword", () => {
    it("should send reset link if user exists", async () => {
      prisma.user.findUnique.mockResolvedValue({
        id: 1,
        email: "test@example.com",
      });
      prisma.user.update.mockResolvedValue({});
      const { sendResetEmail } = require("../utils/sendmail");

      const response = await request(app)
        .post("/reset-password")
        .send({ email: "test@example.com" });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Reset link sent to your email");
      expect(sendResetEmail).toHaveBeenCalled();
    });

    it("should return 404 if user not found", async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      const response = await request(app)
        .post("/reset-password")
        .send({ email: "unknown@example.com" });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("User not found");
    });
  });
});
