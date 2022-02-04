import { NextApiRequest, NextApiResponse } from "next"
import { connect } from "src/utils/database"
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req:NextApiRequest,res:NextApiResponse)=>{
    const { method,body } = req

    switch (method) {
        case 'GET':
            try {
                const sql = 'SELECT * FROM tasks'
                const response = await connect.query(sql)
                return res.status(200).json(response.rows)
            } catch (error:any) {
                res.status(400).json({ error:error.message })
            }
        case 'POST':
            try {
                const {title, description} = body;
                const sql = 'INSERT INTO tasks(title, description) VALUES ($1,$2) RETURNING *'
                const values = [title,description]
                const response = await connect.query(sql,values)
                return res.status(200).json(response.rows[0])
            } catch (error) {
                console.error(error)
            }
        case 'PUT':
            return res.status(200).json('update tasks')
        case 'DELETE':
            return res.status(200).json('delete tasks')
        default:
            return res.status(400).json('invalid method')
    }
}