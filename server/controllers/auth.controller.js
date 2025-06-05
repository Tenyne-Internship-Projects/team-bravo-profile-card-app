const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const { sendVerificationEmail, sendResetEmail } = require("../utils/sendmail");

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

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000);

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
        codes: {
          create: {
            code,
            expiresAt,
          },
        },
      },
      include: {
        profile: true,
      },
    });

    await sendVerificationEmail(email, code);
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

// Verify Account
const verifAccount = async (req, res) => {
  const { email, token } = req.body;

  const user = await prisma.user.findUnique({
    where: { email },
    include: { codes: true },
  });

  if (!user) return res.status(404).json({ message: "User not found" });

  if (user.isVerified) {
    return res.status(400).json({ message: "Account already verified" });
  }

  const latestCode = user.codes?.[user.codes.length - 1];
  if (
    !latestCode ||
    latestCode.code !== token ||
    new Date(latestCode.expiresAt) < new Date()
  ) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }

  await prisma.user.update({
    where: { email },
    data: {
      isVerified: true,
    },
  });

  return res.status(200).json({ message: "Account verified successfully" });
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
    userId: user.id,
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

// Reset Password
const resetPassword = async (req, res) => {
  const { email } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const resetToken = Math.floor(100000 + Math.random() * 900000).toString();
  const resetTokenExpiresAt = new Date(Date.now() + 60 * 60 * 1000);

  await prisma.user.update({
    where: { email },
    data: {
      resetPasswordToken: resetToken,
      resetPasswordExpiresAt,
    },
  });

  const resetLink = `${process.env.RESET_PASSWORD_URL}/reset-password/${resetToken}`;
  await sendResetEmail(email, resetLink);

  return res.status(200).json({ message: "Reset link sent to your email" });
};

module.exports = {
  registerUser,
  verifAccount,
  login,
  logout,
  resetPassword,
};
