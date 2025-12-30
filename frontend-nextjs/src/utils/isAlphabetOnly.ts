export const isAlphabetOnly = (data: string): number => {
    if (typeof data !== "string") return 0;
    const name = data.trim();
    const namePattern = /^[A-Za-z]+(?:\s[A-Za-z]+)?$/;
    return namePattern.test(name) ? 1 : 0;
};
