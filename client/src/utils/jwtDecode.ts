export const parseJwt = (token: string): any | null => {
    try {
        const base64Payload = token.split('.')[1];
        const decodedPayload = atob(base64Payload);
        return JSON.parse(decodedPayload);
    } catch {
        return null;
    }
};
