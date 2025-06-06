const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        profile: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      message: "All users fetched successfully",
      count: users.length,
      users,
    });
  } catch (err) {
    console.error("Error fetching users:", err);
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

//  Get user by ID
const getUserProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
      },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    return res.status(200).json({
      message: "User profile fetched successfully",
      user,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  const { userId } = req.params;
  const {
    fullname,
    gender,
    age,
    dateOfBirth,
    profession,
    specialization,
    location,
    bio,
    skills,
    linkedIn,
    github,
    primaryEmail,
    phoneNumber,
    salaryExpectation,
    password,
  } = req.body;

  const avatarFile = req.files?.avatar?.[0];
  const documentFiles = req.files?.documents || [];

  const avatarUrl = avatarFile
    ? `/uploads/badges/${avatarFile.filename}`
    : undefined;

  const documents = documentFiles.map(
    (file) => `/uploads/badges/${file.filename}`
  );

  // Hash password only if provided
  const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

  // Safely parse skills JSON, default to undefined if invalid or empty
  let parsedSkills;
  if (skills) {
    try {
      parsedSkills = JSON.parse(skills);
    } catch {
      parsedSkills = undefined;
    }
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        fullname,
        profile: {
          update: {
            fullName: fullname, // Confirm this matches your schema casing
            gender,
            age: age ? Number(age) : undefined,
            dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
            profession,
            specialization,
            location,
            bio,
            skills: parsedSkills,
            avatarUrl,
            documents: documents.length > 0 ? documents : undefined,
            linkedIn,
            github,
            primaryEmail,
            // Only include password if hashedPassword exists
            ...(hashedPassword && { password: hashedPassword }),
            phoneNumber,
            salaryExpectation: salaryExpectation
              ? Number(salaryExpectation)
              : undefined,
          },
        },
      },
      include: { profile: true },
    });

    return res.status(200).json({
      message: "User profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

// Delete user account
const deleteUserAccount = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) return res.status(404).json({ message: "User not found" });

    await prisma.user.delete({ where: { id: userId } });

    return res
      .status(200)
      .json({ message: "User account deleted successfully" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
};

module.exports = {
  getAllUsers,
  getUserProfile,
  updateUserProfile,
  deleteUserAccount,
};
