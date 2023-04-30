// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const handles = ["jonathanwu", "jiwonkang"]
const registeredEmails = ["jonwux1@gmail.com"]
export default function handler(req, res) {
    const { method } = req;
    if (method === "POST") {
        const { body } = req; 
        const { handle, email } = JSON.parse(body)

        const availableHandle = !handles.includes(handle)
        const validEmail = !registeredEmails.includes(email)
        
        const errors = []
        if (!availableHandle){
          errors.push("HANDLE_TAKEN")
        }
        if (!validEmail) {
          errors.push("EMAIL_TAKEN")
        }
        const data = {
            success: availableHandle && validEmail,
            errors
        }
        return res.status(200).json(data);
    }
}