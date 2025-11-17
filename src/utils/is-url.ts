/**
 * Verifica se a string fornecida é uma URL válida
 * @param value - String a ser verificada
 * @returns true se for uma URL, false se for um nome de arquivo
 */
export const isUrl = (value: string): boolean => {
    try {
        const url = new URL(value);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
        return false;
    }
}
