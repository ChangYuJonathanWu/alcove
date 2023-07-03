// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { completeSignup } from '@/lib/api/signup'


export default async function handler(req, res) {

    const { method } = req;
    if (method === "POST") {
        const { body } = req;
        const { signupId, password } = JSON.parse(body)

        const signupResult = await completeSignup(id, password)
        const { success, error } = signupResult
        if (success) {
            return res.status(200).json({ success: true });
        } else {
            return res.status(400).json({ success: false, error });
        }
    }
}