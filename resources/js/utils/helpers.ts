import CryptoJS from "crypto-js";

const SECRET_KEY = CryptoJS.enc.Utf8.parse(
    import.meta.env.VITE_ENCRYPTION_KEY ?? "12345678901234567890123456789012"
);

const SECRET_IV = CryptoJS.enc.Utf8.parse(
    import.meta.env.VITE_ENCRYPTION_IV ?? "1234567890123456"
);

/**
 * Encrypt an ID for use in URLs.
 */
export const encryptId = (id: string | number): string => {
    const encrypted = CryptoJS.AES.encrypt(
        id.toString(),
        SECRET_KEY,
        {
            iv: SECRET_IV,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        }
    );

    return encodeURIComponent(encrypted.toString());
};

/**
 * Format date as: 12 Jun 2026
 */
export const formatDate = (
    date: string | Date | null | undefined
): string => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};

/**
 * Format date and time as: 12 Jun 2026 14:35
 */
export const formatDateTime = (
    date: string | Date | null | undefined
): string => {
    if (!date) return "";

    return new Date(date).toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    });
};

/**
 * Format full patient name.
 */
export const fullName = (
    firstName?: string,
    lastName?: string
): string => {
    return `${firstName ?? ""} ${lastName ?? ""}`.trim();
};

/**
 * Calculate age from date of birth.
 */
export const calculateAge = (
    dob: string | Date | null | undefined
): number | null => {
    if (!dob) return null;

    const birth = new Date(dob);
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();

    const month = today.getMonth() - birth.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birth.getDate())) {
        age--;
    }

    return age;
};
