const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

const prisma = new PrismaClient();

// Register User
const registerUser = async (req, res) => {
  try {
    const {
      fullname,
      email,
      password,
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
    } = req.body;

    const avatarFile = req.files?.avatar?.[0];
    const documentFiles = req.files?.documents || [];

    const avatarUrl = avatarFile
      ? `/uploads/badges/${avatarFile.filename}`
      : null;

    const documents = documentFiles.map(
      (file) => `/uploads/badges/${file.filename}`
    );

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        fullname,
        email,
        password: hashedPassword,
        profile: {
          create: {
            fullName: fullname,
            gender,
            age: Number(age),
            dateOfBirth: new Date(dateOfBirth),
            profession,
            specialization,
            location,
            bio,
            skills: skills ? JSON.parse(skills) : [],
            avatarUrl,
            documents,
            linkedIn,
            github,
            primaryEmail,
            phoneNumber,
            salaryExpectation: salaryExpectation
              ? Number(salaryExpectation)
              : null,
          },
        },
      },
      include: {
        profile: true,
      },
    });

    const token = generateToken(newUser.id);

    return res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        fullname: newUser.fullname,
        profile: newUser.profile,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
};

// Login
const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = generateToken(user.id);

  await prisma.user.update({
    where: { id: user.id },
    data: { token },
  });

  return res.status(200).json({
    message: "Login successful",
    token,
    user: {
      id: user.id,
      email: user.email,
    },
  });
};

// Logout
const logout = async (req, res) => {
  const { email } = req.body;

  await prisma.user.update({
    where: { email },
    data: { token: null },
  });

  return res.status(200).json({ message: "Logout successful" });
};

module.exports = {
  registerUser,
  login,
  logout,
};
