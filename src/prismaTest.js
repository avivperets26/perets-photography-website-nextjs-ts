// src/prismaTest.js
const { PrismaClient } = require("@prisma/client");
require("dotenv").config({ path: ".env.local" });

const prisma = new PrismaClient();

async function testPrisma() {
  try {
    const users = await prisma.user.findMany();
    console.log("All Users:", users);

    const user = await prisma.user.findUnique({
      where: { email: "test@example.com" }, // Replace with an actual email in your database
    });
    console.log("Test User:", user);
  } catch (error) {
    console.error("Prisma Test Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

testPrisma();
