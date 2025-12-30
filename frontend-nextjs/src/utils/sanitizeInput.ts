type SanitizeInput = string | number | boolean | null | undefined | SanitizeInput[] | { [key: string]: SanitizeInput };

export const sanitizeInput = (input: SanitizeInput): SanitizeInput => {
    if (input === null || input === undefined) return "";
    if (typeof input === "number") return input;
    if (typeof input === "boolean") return input;
    if (Array.isArray(input)) return input.map((item) => sanitizeInput(item));
    if (typeof input === "object") {
        const sanitizedObject: { [key: string]: SanitizeInput } = {};
        for (const key in input) {
            if (Object.prototype.hasOwnProperty.call(input, key)) {
                sanitizedObject[key] = sanitizeInput(input[key]);
            }
        }
        return sanitizedObject;
    }
    if (typeof input === "string") {
        let sanitized = input.trim();
        const blacklistPatterns = [
            /<script.*?>.*?<\/script>/gi,
            /javascript:/gi,
            /on\w+=".*?"/gi,
            /--/g,
            /;/g,
        ];
        blacklistPatterns.forEach((pattern) => {
            sanitized = sanitized.replace(pattern, "");
        });
        sanitized = sanitized
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "'")
            .replace(/\\/g, "");
        return sanitized;
    }
    return String(input);
};
