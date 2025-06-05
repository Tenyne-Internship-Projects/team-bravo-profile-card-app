// utils/verifiedProfile.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Check if the user has verified their email
 * @param {string} userId - The user ID
 * @returns {Promise<boolean>}
 */
const isVerifiedProfile = async (userId) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { verified: true },
  });

  return user?.verified || false;
};

module.exports = isVerifiedProfile;
