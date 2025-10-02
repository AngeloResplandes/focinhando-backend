import { compare, hash } from "bcryptjs";
import { prisma } from "../libs/prisma"
import { v4 } from "uuid";

export const createUser = async (
    name: string,
    email: string,
    password: string,
) => {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return null;

    const hashPassword = await hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name,
            email: email.toLowerCase(),
            password: hashPassword,
            role: "member"
        }
    });

    if (!user) return null;
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    }
}

export const logUser = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    const validPassword = await compare(password, user.password);
    if (!validPassword) return null;

    const token = v4();
    await prisma.user.update({
        where: { id: user.id },
        data: { token }
    });
    return token;
}