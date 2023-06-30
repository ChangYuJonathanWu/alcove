import { firebaseAdmin } from "@/lib/firebase-admin";

export function withAuth(handler) {
    return async (req, res) => {
        const { token } = req.cookies
        if (!token) {
            return res.status(401).end('Not authenticated.');
        }
        let decodedToken;
        try {
            decodedToken = await firebaseAdmin.auth().verifyIdToken(token)
            if (!decodedToken || !decodedToken.uid){
                return res.status(401).end('Not authenticated');
            }
            req.uid = decodedToken.uid;
        } catch(error) {
            const errorCode = error.errorInfo.code;
            error.status = 401;
            if (errorCode === 'auth/internal-error') {
              error.status = 500;
            }
            //TODO handlle firebase admin errors in more detail
            return res.status(error.status).json({ error: errorCode });
        }
        return handler(req, res);
    }
}