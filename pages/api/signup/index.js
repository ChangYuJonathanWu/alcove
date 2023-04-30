// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { availableHandle, availableEmail } from '../../../lib/queries'


export default async function handler(req, res) {

    const { method } = req;
    if (method === "POST") {
        const { body } = req; 
        const { handle, email } = JSON.parse(body)

        const handleAvailable = await availableHandle(handle)
        console.log(availableHandle)
        const validEmail = await availableEmail(email)
        
        const errors = []
        if (!handleAvailable){
          errors.push("HANDLE_TAKEN")
        }
        if (!validEmail) {
          errors.push("EMAIL_TAKEN")
        }
        const data = {
            success: handleAvailable && validEmail,
            errors
        }
        return res.status(200).json(data);
    }
}