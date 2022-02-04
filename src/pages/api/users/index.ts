import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from 'src/utils/database'

// eslint-disable-next-line import/no-anonymous-default-export
export default async(req:NextApiRequest,res:NextApiResponse)=>{
    const { method, body } = req;
    switch (method) {
        case 'GET':
            try {
                const query = 'SELECT * FROM users'
                const response = connect.query(query)
                return res.status(200).json(response.rows)
            } catch (error:any) {
                res.status(400).json({error:error.message})
            }   
        case 'POST':
            try {
                const { name,user,estado } = body
                const query = 'INSERT INTO users (name,"user",estado) values ($1,$2,$3) RETURNING *'
                const values = [name,user,estado]
                const response = await connect.query(query,values)
                return res.status(200).json(response.rows[0])
            } catch (error:any) {
                res.status(400).json({error:error.message})
            } 
        default:
            break;
    }
}