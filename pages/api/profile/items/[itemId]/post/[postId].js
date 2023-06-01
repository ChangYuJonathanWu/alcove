// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { deletePost, editPost } from '@/lib/api/profile'
import { withAuth } from '@/lib/api/withAuth';

async function handler(req, res) {

    const { method, uid } = req;
    if (method === "PUT") {
        const { query, body } = req;
        const { itemId, postId } = query;
        console.log("Attempting to edit post ID: " + postId)

        const { title="", subtitle="", caption="", image="", uri=""} = JSON.parse(body)
        const post = {
            title,
            subtitle,
            caption,
            image,
            uri
        }

        // Here we need firebase admin to verify the auth information
        if (!uid) {
            return res.status(400).json({ error: "Missing UID" })
        }
        // if null, then do not update the parameter. Otherwise if string (even empty) then update
        const result = await editPost(itemId, postId, post, uid)
        if (result) {
            return res.status(200).json({ success: true })
        } else {
            return res.status(400).json({ error: "Could not delete post from profile" })
        }

    }
    if (method === "DELETE") {
        const { query, body } = req;
        const { itemId, postId } = query;
        console.log("Attempting to delete post ID: " + postId)

        // Here we need firebase admin to verify the auth information
        if (!uid) {
            return res.status(400).json({ error: "Missing UID" })
        }
        // if null, then do not update the parameter. Otherwise if string (even empty) then update
        const result = await deletePost(itemId, postId, uid)
        if (result) {
            return res.status(200).json({ success: true })
        } else {
            return res.status(400).json({ error: "Could not delete post from profile" })
        }

    }


}

export default withAuth(handler)