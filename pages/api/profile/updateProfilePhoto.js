// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getFullProfile, updateProfile } from '../../../lib/api/profile'
import { withAuth } from '@/lib/api/withAuth';
import multiparty from 'multiparty'
import util from 'util'

// This is the Administrative /profile endpoint, intended to be accessed only by the owner of the profile.
// We don't want to expose profile information like email, etc. This endpoint can reveal sensitive information. 
async function handler(req, res) {
    const { method } = req;
    if (method === "POST" ) {
        const { query, uid, body } = req; // don't really need UID from request as have it from auth

        // Here we need firebase admin to verify the auth information
        if(!uid) {
            return res.status(400).json({error: "Missing UID"})
        }
        console.log("HERE")
        const form = new multiparty.Form()
        console.log(util.inspect(req.data))
        form.parse(req, (err, fields, files) => {
            console.log(err)
            console.log(util.inspect({fields, files}))
            return res.status(200).json({success: true})
        })
        
        
    }
}



export default withAuth(handler)

export const config = {
    api: {
        bodyParser: false
    }
}
