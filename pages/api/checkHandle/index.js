// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const handles = ["jonathanwu", "jiwonkang"]
export default function handler(req, res) {
    const { method } = req;
    if (method === "POST") {
        const { body } = req; 
        const { handle } = JSON.parse(body)
        
        const data = {
            available: !handles.includes(handle) && handle.length >= 5
        }
        return res.status(200).json(data);
    }
}
