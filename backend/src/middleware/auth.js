import { getAuth } from 'firebase-admin/auth';
import { firebaseApp } from '../config/firebase.js';

const auth = getAuth(firebaseApp);

export async function requireAuth(request, response, next) {
    const header = request.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
        return response.status(401).json({error: "missing or invalid authorization header"});
    }

    const token = header.split(" ")[1];

    try {
        const decodeToken = await auth.verifyIdToken(token);
        request.user = decodeToken;
        next();
    } catch (error) {
        console.error("Token authorization failed", error.code);
        return response.status(401).json({error: "invalid or expired token"});
    }
}