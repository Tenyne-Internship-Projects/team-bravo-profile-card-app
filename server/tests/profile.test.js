// tests/user.controller.test.js
jest.mock("@prisma/client");
jest.mock("bcryptjs");

const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const {
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
} = require("../controllers/user.controller");

const prisma = new PrismaClient();

describe("User Controller", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Reset mocks for prisma.user methods
    prisma.user.findMany = jest.fn();
    prisma.user.findUnique = jest.fn();
    prisma.user.update = jest.fn();
    prisma.user.delete = jest.fn();

    // Mock bcrypt.hash to always resolve a hashed password
    bcrypt.hash = jest.fn((password) => Promise.resolve("hashed_" + password));
  });

  describe("getAllUsers", () => {
    it("should fetch all users successfully", async () => {
      const mockUsers = [
        { id: "1", fullname: "John", profile: {} },
        { id: "2", fullname: "Jane", profile: {} },
      ];
      prisma.user.findMany.mockResolvedValue(mockUsers);

      const req = {};
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      await getAllUsers(req, res);

      expect(prisma.user.findMany).toHaveBeenCalledWith({
        include: { profile: true },
        orderBy: { createdAt: "desc" },
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "All users fetched successfully",
        count: mockUsers.length,
        users: mockUsers,
      });
    });

    it("should handle errors", async () => {
      const error = new Error("DB failure");
      prisma.user.findMany.mockRejectedValue(error);

      const req = {};
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      await getAllUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal server error",
        error: error.message,
      });
    });
  });

  describe("getUserProfile", () => {
    it("should return user profile if found", async () => {
      const userId = "1";
      const mockUser = { id: userId, fullname: "John", profile: {} };
      prisma.user.findUnique.mockResolvedValue(mockUser);

      const req = { params: { userId } };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      await getUserProfile(req, res);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: userId },
        include: { profile: true },
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "User profile fetched successfully",
        user: mockUser,
      });
    });

    it("should return 404 if user not found", async () => {
      const userId = "1";
      prisma.user.findUnique.mockResolvedValue(null);

      const req = { params: { userId } };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      await getUserProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "User not found",
      });
    });

    it("should handle errors", async () => {
      const error = new Error("DB failure");
      prisma.user.findUnique.mockRejectedValue(error);

      const req = { params: { userId: "1" } };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      await getUserProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal server error",
        error: error.message,
      });
    });
  });

  describe("deleteUserAccount", () => {
    it("should delete user account successfully", async () => {
      const userId = "1";

      prisma.user.findUnique.mockResolvedValue({ id: userId });
      prisma.user.delete.mockResolvedValue(true);

      const req = { params: { userId } };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      await deleteUserAccount(req, res);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: userId },
      });

      expect(prisma.user.delete).toHaveBeenCalledWith({
        where: { id: userId },
      });

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "User account deleted successfully",
      });
    });

    it("should return 404 if user not found", async () => {
      prisma.user.findUnique.mockResolvedValue(null);

      const req = { params: { userId: "1" } };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      await deleteUserAccount(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
    });

    it("should handle errors", async () => {
      const error = new Error("DB failure");
      prisma.user.findUnique.mockRejectedValue(error);

      const req = { params: { userId: "1" } };
      const res = {
        status: jest.fn(() => res),
        json: jest.fn(),
      };

      await deleteUserAccount(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal server error",
        error: error.message,
      });
    });
  });
});
