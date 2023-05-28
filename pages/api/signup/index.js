// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { availableHandle, availableEmail, createSignup } from '../../../lib/api/signup'


export default async function handler(req, res) {

    const { method } = req;
    if (method === "POST") {
        const { body } = req; 
        const { handle, email } = JSON.parse(body)

        const handleAvailable = await availableHandle(handle)
        const validEmail = await availableEmail(email)
        
        const errors = []
        if (!handleAvailable){
          errors.push("HANDLE_TAKEN")
        }
        if (!validEmail) {
          errors.push("EMAIL_TAKEN")
        }
        let signupSuccess = false
        if(handleAvailable && validEmail) {
        // This is NOT transactional. It's possible for duplicates to exist. This is only acceptable for MVP.
          signupSuccess = await createSignup(email, handle)
        } 


        const data = {
            success: signupSuccess,
            errors
        }
        return res.status(200).json(data);
    }
}