// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getAllSignups } from '@/lib/api/userManagement'
import { withAuth } from '@/lib/api/withAuth';

const ADMIN_UID = process.env.ADMIN_UID
async function handler(req, res) {
    const { method, uid } = req;

    if (uid !== ADMIN_UID) {
        return res.status(400).json({ error: "Unauthorized" })
    }

    if (method === "GET") {
        const allSignups = await getAllSignups()
        return res.status(200).json({ results: allSignups ?? []})
    }

}

export default withAuth(handler)