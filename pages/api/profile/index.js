// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getFullProfile, updateProfile } from '../../../lib/api/profile'
import { withAuth } from '@/lib/api/withAuth';

// This is the Administrative /profile endpoint, intended to be accessed only by the owner of the profile.
// We don't want to expose profile information like email, etc. This endpoint can reveal sensitive information. 
async function handler(req, res) {
    const { method } = req;
    if (method === "GET") {
        const { query } = req; 
        const { handle, uid } = query
        if(!handle && !uid){
            return res.status(200).json({})
        }
        const profile = await getFullProfile(handle, uid)
        return res.status(200).json(profile);
    }
    if (method === "PUT" ) {
        const { query, uid, body } = req; // don't really need UID from request as have it from auth

        // Here we need firebase admin to verify the auth information
        if(!uid) {
            return res.status(400).json({error: "Missing UID"})
        }
        
        const { description, title } = JSON.parse(body);
        console.log(description)
        // if null, then do not update the parameter. Otherwise if string (even empty) then update
        const updateQuery = {}
        if(description !== null && description !== undefined) {
            updateQuery.description = description;
        }

        if(title !== null && title !== undefined) {
            updateQuery.title = title;
        }
        console.log("Update Query: " + JSON.stringify(updateQuery))
        const result = await updateProfile(updateQuery, uid)
        console.log(result)
        if(result) {
            return res.status(200).json({success: true})
        } else {
            return res.status(400).json({error: "Could not update profile"})
        }

    }
}

export default withAuth(handler)