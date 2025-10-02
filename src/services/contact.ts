import { prisma } from "../libs/prisma"

export const createContact = async (
    fullName: string,
    email: string,
    phoneNumber: string,
    subject: string,
    message: string
) => {
    const contact = await prisma.contact.create({
        data: {
            fullName,
            email: email.toLocaleLowerCase(),
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