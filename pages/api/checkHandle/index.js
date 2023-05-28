// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { availableHandle } from '../../../lib/api/signup'

export default async function handler(req, res) {
    const { method } = req;
    if (method === "POST") {
        const { body } = req; 
        const { handle } = JSON.parse(body)
        console.log("Check Handle called: " + handle)
        
        const available = await availableHandle(handle)
        const data = {
            available
        }
        return res.status(200).json(data);
    }
}

