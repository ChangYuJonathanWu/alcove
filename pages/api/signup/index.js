// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { availableHandle, availableEmail, createSignup } from '../../../lib/api/signup'
import { getAllSignups, attemptOnboard } from '@/lib/api/userManagement'

const ALLOW_DIRECT_SIGNUP = true

export default async function handler(req, res) {

  const { method } = req;
  if (method === "POST") {
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
    let signupSuccess = false
    if (handleAvailable && validEmail) {
      // This is NOT transactional. It's possible for duplicates to exist. This is only acceptable for MVP.
      signupSuccess = await createSignup(email, handle)
      if (ALLOW_DIRECT_SIGNUP && signupSuccess) {
        // Send onboarding email
        // This needs to be a transaction or atleast throw an alert if this fails to do manual onboarding
        console.log("Attempting onboard for ", email)
        const result = await attemptOnboard(signupSuccess.insertedId.toString(), 0, email, handle, false, true)
      }
    }


    const data = {
      success: signupSuccess,
      errors
    }
    return res.status(200).json(data);
  }
}