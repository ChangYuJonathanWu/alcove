// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getAllSignups } from '@/lib/api/userManagement'
import { withAuth } from '@/lib/api/withAuth';
import { createAlert } from '@/lib/alerting';

const ADMIN_UID = process.env.ADMIN_UID
async function handler(req, res) {
    const { method, uid } = req;

    if (uid !== ADMIN_UID) {
        return res.status(400).json({ error: "Unauthorized" })
    }

    if (method === "POST") {
        const result = await createAlert("Test alert", "This is a test alert", "P1")
        return res.status(200).json({ success: true })
    }

}

export default withAuth(handler)