import { compare, hash } from "bcryptjs";
import { prisma } from "../libs/prisma"
import { v4 } from "uuid";
import { Complement } from "../types/complement";
import { User } from "../types/user";

export const createUser = async (data: User) => {
    const { name, email, password } = data;

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

export const getUserByToken = async (token: string) => {
    const user = await prisma.user.findFirst({
        where: { token }
    });
    if (!user) return null;
    return user.id;
}

export const getUserById = async (id: string) => {
    const user = await prisma.user.findUnique({
        where: {
            id,
        },
    });

    return user;
};

export const createComplement = async (userId: string, complement: Complement) => {
    return await prisma.userComplement.create({
        data: {
            ...complement,
            userId,
            adoptedPet: 0,
            availablePet: 0
        }
    });
}

export const getComplementFromUserId = async (userId: string) => {
    return await prisma.userComplement.findFirst({
        where: { userId },
        select: {
            id: true,
            img: true,
            phoneNumber: true,
            city: true,
            state: true,
            dateOfBirth: true,
            adoptedPet: true,
            availablePet: true,
            createdAt: true,
            updatedAt: true,
        }
    });
}