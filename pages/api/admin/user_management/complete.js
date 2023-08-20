

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getAllSignups, attemptOnboard, deleteSignupPermanently } from '@/lib/api/userManagement'
import { withAuth } from '@/lib/api/withAuth';

const ADMIN_UID = process.env.ADMIN_UID
async function handler(req, res) {
    const { method, uid } = req;

    if (uid !== ADMIN_UID) {
        return res.status(400).json({ error: "Unauthorized" })
    }

    if (method === "POST") {
        const { body } = req;
        const { signupId, deleteSignup = false } = JSON.parse(body)
        // increment attempt field on signup document 
        if (deleteSignup) {
            const deleteResult = await deleteSignupPermanently(signupId)
        }
        else {
            const signupResult = await attemptOnboard(signupId)
        }

        return res.status(200).json({ success: true })
    }


}

export default withAuth(handler)