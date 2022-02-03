import { NextApiRequest, NextApiResponse } from 'next';
// eslint-disable-next-line import/no-anonymous-default-export
export default (req:NextApiRequest,res:NextApiResponse)=>{
    const { method } = req

    switch (method) {
        case 'GET':
            return res.status(200).json('get task')
        case 'PUT':
            return res.status(200).json('update task')
        case 'DELETE':
            return res.status(200).json('delete task')
        default:
            return res.status(400).json('method not allowed')
    }
}