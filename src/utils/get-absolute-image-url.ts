import { getBaseUrl } from "./get-base-url"

export const getAbsoluteImageUrlPets = (path: string) => {
    if (path.includes('https')) {
        return path
    }
    return `${getBaseUrl()}/media/pets/${path}`
}

export const getAbsoluteImageUrlPublications = (path: string) => {
    if (path.includes('https')) {
        return path
    }
    return `${getBaseUrl()}/media/publications/${path}`
}