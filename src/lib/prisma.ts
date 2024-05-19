import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

console.log('Prisma Client:', prisma);

async function testPrismaConnection() {
    try {
        const result = await prisma.$queryRaw`SELECT 1`;
        console.log('Database Connection Test Result:', result);
    } catch (error) {
        console.error('Prisma Connection Error:', error);
    }
}

testPrismaConnection();
