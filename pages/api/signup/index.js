// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createAlert } from '@/lib/alerting';
import { availableHandle, availableEmail, createSignup } from '../../../lib/api/signup'
import { getAllSignups, attemptOnboard } from '@/lib/api/userManagement'

const ALLOW_DIRECT_SIGNUP = process.env.NEXT_PUBLIC_ALLOW_DIRECT_SIGNUP === "true"

export default async function handler(req, res) {

  const { method } = req;
  if (method === "POST") {
    try {
      const { body } = req;
      const { handle, email } = JSON.parse(body)

      const handleAvailable = await availableHandle(handle)
      const validEmail = await availableEmail(email)

      const errors = []
      if (!handleAvailable) {
        errors.push("HANDLE_TAKEN")
      }
      if (!validEmail) {
        errors.push("EMAIL_TAKEN")
      }

      console.log("Creating signup for ", handle, email)
      let signupSuccess = false
      let signupId = null
      if (handleAvailable && validEmail) {
        // This is NOT transactional. It's possible for duplicates to exist. This is only acceptable for MVP.
        signupId = await createSignup(email, handle)
        signupSuccess = !!signupId
        if (!signupSuccess) {
          throw new Error("Error creating signup for " + handle + " " + email + "")
        }
      }

      const data = {
        success: signupSuccess,
        signupId,
        errors
      }
      return res.status(200).json(data);
    } catch (e) {
      console.error(e)
      createAlert(`Error creating signup (general)`, e.message, "P1")
      return res.status(200).json({ success: true, errors: ["DELAYED"] })
    }

  }
}