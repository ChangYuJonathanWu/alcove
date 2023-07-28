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
        const profile = await getFullProfile(uid)
        return res.status(200).json(profile);
    }
    if (method === "PUT" ) {
        const { query, uid, body } = req; // don't really need UID from request as have it from auth

        // Here we need firebase admin to verify the auth information
        if(!uid) {
            return res.status(400).json({error: "Missing UID"})
        }
        
        const { description, title, social_links } = JSON.parse(body);
        // if null, then do not update the parameter. Otherwise if string (even empty) then update
        const updateQuery = {}
        if(description || description === "") {
            updateQuery.description = description;
        }

        if(title || title === "") {
            updateQuery.title = title;
        }
        if(social_links) {
            const { instagram, facebook, bereal, snapchat, tiktok, twitter, reddit, linkedin } = social_links
            
            if(instagram || instagram === "") {
                updateQuery["social_links.instagram"] = instagram
            }
            if(facebook || facebook === "") {
                updateQuery["social_links.facebook"] = facebook
            }
            if(bereal || bereal === "") {
                updateQuery["social_links.bereal"] = bereal
            }
            if(snapchat || snapchat === "") {
                updateQuery["social_links.snapchat"] = snapchat
            }
            if(tiktok || tiktok === "") {
                updateQuery["social_links.tiktok"] = tiktok
            }
            if(twitter || twitter === "") {
                updateQuery["social_links.twitter"] = twitter
            }
            if(reddit || reddit === "") {
                updateQuery["social_links.reddit"] = reddit
            }
            if(linkedin || linkedin === "") {
                updateQuery["social_links.linkedin"] = linkedin
            }
            
        }
        console.log("Update Query: " + JSON.stringify(updateQuery))
        const result = await updateProfile(updateQuery, uid)
        res.revalidate('/jonathanwu_test')

        if(result) {
            return res.status(200).json({success: true})
        } else {
            return res.status(400).json({error: "Could not update profile"})
        }

    }
}

export default withAuth(handler)