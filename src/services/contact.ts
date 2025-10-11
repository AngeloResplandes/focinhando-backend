import { prisma } from "../libs/prisma"
import { Contact } from "../types/contact";

export const createContact = async (data: Contact) => {
    const { fullName, email, phoneNumber, subject, message } = data;

    const existing = await prisma.contact.findFirst({ where: { email } });
    if (existing) return null;

    const contact = await prisma.contact.create({
        data: {
            fullName,
            email: email.toLowerCase(),
            phoneNumber,
            subject,
            message
        }
    });

    if (!contact) return null;
    return {
        id: contact.id,
        fullName: contact.fullName,
        email: contact.email,
        phoneNumber: contact.phoneNumber,
        subject: contact.subject,
        message: contact.message,
        createdAt: contact.createdAt,
        updatedAt: contact.updatedAt
    }
}

export const readAllContacts = async () => {
    return await prisma.contact.findMany({
        select: {
            id: true,
            fullName: true,
            email: true,
            phoneNumber: true,
            subject: true,
            message: true,
            createdAt: true,
            updatedAt: true
        }
    });
}

export const readContactsPaginated = async (page: number, limit: number) => {
    const skip = (page - 1) * limit;

    const [contacts, totalContacts] = await Promise.all([
        prisma.contact.findMany({
            skip,
            take: limit,
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                fullName: true,
                email: true,
                phoneNumber: true,
                subject: true,
                message: true,
                createdAt: true,
                updatedAt: true
            }
        }),
        prisma.contact.count()
    ]);

    const totalPages = Math.ceil(totalContacts / limit);

    return {
        contacts,
        pagination: {
            totalContacts,
            totalPages,
            currentPage: page,
            limit
        }
    };
}