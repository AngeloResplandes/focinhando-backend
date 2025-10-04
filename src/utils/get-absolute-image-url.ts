import { getBaseUrl } from "./get-base-url"

export const getAbsoluteImageUrl = (path: string) => {
    return `${getBaseUrl()}/${path}`
}