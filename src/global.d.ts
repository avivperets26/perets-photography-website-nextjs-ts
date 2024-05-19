import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
}

// This is to ensure this file is treated as a module.
export { };
