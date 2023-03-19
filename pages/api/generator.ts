import { NextApiRequest, NextApiResponse } from "next"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const body = req.body

    if (!body.mocName) {
        return res.status(400).json({ data: 'MOC name missing' } )
    }

    res.status(200).json({ data: "Success"})
}