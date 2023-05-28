// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getPublicProfile } from '../../../lib/api/profile'


// This is the PUBLIC facing profile endpoint for loading profiles. It should sanitize profiles. 
export default async function handler(req, res) {
    const { method } = req;
    if (method === "GET") {
        const { query } = req; 
        const { handle, uid } = query
        if(!handle && !uid){
            return res.status(200).json({})
        }
        const profile = await getPublicProfile(handle, uid)
        const sanitized = sanitizeProfile(profile)
        return res.status(200).json(profile);
    }
}

const sanitizeProfile = (profile) => {
    return profile
}