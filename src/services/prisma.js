const { PrismaClient } = require("@prisma/client");
const { global } = require("styled-jsx/css");

let prisma;

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
} else {
    if (!global.prisma) {
        global.prisma = new PrismaClient();
    }
    prisma = global.prisma
}

export default prisma;
