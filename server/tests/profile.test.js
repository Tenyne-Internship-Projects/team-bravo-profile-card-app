const request = require("supertest");
const express = require("express");
const { PrismaClient } = require("@prisma/client");

jest.mock("@prisma/client");

const {
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
} = require("../controllers/userProfileController");

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

// Mock routes for testing
app.get("/users", getAllUsers);
app.get("/users/:userId", getUserProfile);
app.put(
  "/users/:userId",
  (req, res, next) => {
    // simulate file uploads with req.files if needed
    req.files = req.files || {};
    next();
  },
  updateUserProfile
);
app.delete("/users/:userId", deleteUserAccount);

describe("User Profile Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllUsers", () => {
    it("should fetch all users successfully", async () => {
      const mockUsers = [
        {
          id: "1",
          fullname: "User One",
          profile: { fullName: "User One" },
          createdAt: new Date(),
        },
        {
          id: "2",
          fullname: "User Two",
          profile: { fullName: "User Two" },
          createdAt: new Date(),
        },
      ];
      prisma.user.findMany.mockResolvedValue(mockUsers);

      const response = await request(app).get("/users");

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("All users fetched successfully");
      expect(response.body.count).toBe(mockUsers.length);
      expect(response.body.users).toEqual(mockUsers);
      expect(prisma.user.findMany).toHaveBeenCalledWith({
        include: { profile: true },
        orderBy: { createdAt: "desc" },
      });
    });

    it("should handle errors gracefully", async () => {
      prisma.user.findMany.mockRejectedValue(new Error("DB failure"));

      const response = await request(app).get("/users");

      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Internal server error");
      expect(response.body.error).toBe("DB failure");
    });
  });

  describe("getUserProfile", () => {
    it("should fetch user profile successfully", async () => {
      const userId = "1";
      const mockUser = {
        id: userId,
        fullname: "User One",
        profile: { fullName: "User One" },
      };
      prisma.user.findUnique.mockResolvedValue(mockUser);

      const response = await request(app).get(`/users/${userId}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("User profile fetched successfully");
      expect(response.body.user).toEqual(mockUser);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: userId },
        include: { profile: true },
      });
    });

    it("should return 404 if user not found", async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      const response = await request(app).get("/users/unknown-id");

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("User not found");
    });

    it("should handle errors gracefully", async () => {
      prisma.user.findUnique.mockRejectedValue(new Error("DB failure"));

      const response = await request(app).get("/users/1");

      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Internal server error");
      expect(response.body.error).toBe("DB failure");
    });
  });

  describe("updateUserProfile", () => {
    it("should update user profile successfully", async () => {
      const userId = "1";
      const existingUser = { id: userId, profile: {} };
      const updatedUser = {
        id: userId,
        fullname: "Updated User",
        profile: { fullName: "Updated User" },
      };

      prisma.user.findUnique.mockResolvedValue(existingUser);
      prisma.user.update.mockResolvedValue(updatedUser);

      const response = await request(app)
        .put(`/users/${userId}`)
        .send({
          fullname: "Updated User",
          gender: "female",
          age: "30",
          dateOfBirth: "1994-01-01",
          profession: "Engineer",
          specialization: "Software",
          location: "Mars",
          bio: "Updated bio",
          skills: JSON.stringify(["JavaScript", "Node"]),
          linkedIn: "linkedin-url",
          github: "github-url",
          primaryEmail: "primary@example.com",
          phoneNumber: "123456789",
          salaryExpectation: "75000",
        });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("User profile updated successfully");
      expect(response.body.user).toEqual(updatedUser);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: userId },
        include: { profile: true },
      });

      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: userId },
        data: expect.objectContaining({
          fullname: "Updated User",
          profile: expect.objectContaining({
            fullName: "Updated User",
            gender: "female",
            age: 30,
            dateOfBirth: new Date("1994-01-01"),
            profession: "Engineer",
            specialization: "Software",
            location: "Mars",
            bio: "Updated bio",
            skills: ["JavaScript", "Node"],
            linkedIn: "linkedin-url",
            github: "github-url",
            primaryEmail: "primary@example.com",
            phoneNumber: "123456789",
            salaryExpectation: 75000,
          }),
        }),
        include: { profile: true },
      });
    });

    it("should handle missing user", async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      const response = await request(app)
        .put("/users/nonexistent")
        .send({ fullname: "No User" });

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("User not found");
    });

    it("should handle errors gracefully", async () => {
      prisma.user.findUnique.mockResolvedValue({ id: "1", profile: {} });
      prisma.user.update.mockRejectedValue(new Error("DB failure"));

      const response = await request(app)
        .put("/users/1")
        .send({ fullname: "Error Case" });

      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Internal server error");
      expect(response.body.error).toBe("DB failure");
    });
  });

  describe("deleteUserAccount", () => {
    it("should delete user account successfully", async () => {
      const userId = "1";
      prisma.user.findUnique.mockResolvedValue({ id: userId });
      prisma.user.delete.mockResolvedValue({});

      const response = await request(app).delete(`/users/${userId}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("User account deleted successfully");

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: userId },
      });
      expect(prisma.user.delete).toHaveBeenCalledWith({
        where: { id: userId },
      });
    });

    it("should return 404 if user not found", async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      const response = await request(app).delete("/users/nonexistent");

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("User not found");
    });

    it("should handle errors gracefully", async () => {
      prisma.user.findUnique.mockResolvedValue({ id: "1" });
      prisma.user.delete.mockRejectedValue(new Error("DB failure"));

      const response = await request(app).delete("/users/1");

      expect(response.status).toBe(500);
      expect(response.body.message).toBe("Internal server error");
      expect(response.body.error).toBe("DB failure");
    });
  });
});
