import { NextApiRequest, NextApiResponse } from "next"

// eslint-disable-next-line import/no-anonymous-default-export
export default (req:NextApiRequest,res:NextApiResponse)=>{
    const { method } = req

    switch (method) {
        case 'GET':
            return res.status(200).json('get tasks')
        case 'POST':
            return res.status(200).json('creating tasks')
        case 'PUT':
            return res.status(200).json('update tasks')
        case 'DELETE':
            return res.status(200).json('delete tasks')
        default:
            return res.status(400).json('invalid method')
    }
}