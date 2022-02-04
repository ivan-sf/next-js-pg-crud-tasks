import { NextApiRequest, NextApiResponse } from 'next';
import { connect } from 'src/utils/database'

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req:NextApiRequest,res:NextApiResponse)=>{
    const { method,query,body } = req

    switch (method) {
        case 'GET':
            try {
                const sql = "SELECT * FROM tasks WHERE id = $1"
                const values = [query.id]
                const response = await connect.query(sql,values)
                if (response.rows.length === 0)
                    res.status(400).json({message:"Task not found"})
                return res.status(200).json(response.rows[0])    
            } catch (error:any) {
                res.status(400).json({error:error.message})
            }
        case 'PUT':
            try {
                const { title,description } = body
                const sql = "UPDATE tasks SET title=$1, description=$2 WHERE id = $3 RETURNING *"
                const values = [title,description,query.id]
                const response = await connect.query(sql,values)
                if (response.rowCount === 0)
                    res.status(400).json({message:"Task not found"})
                return res.status(200).json(response.rows[0])    
            } catch (error:any) {
                res.status(400).json({error:error.message})
            }
        case 'DELETE':
            try {
                const sql = "DELETE FROM tasks WHERE id = $1 RETURNING *"
                const values = [query.id]
                const response = await connect.query(sql,values)
                if (response.rowCount === 0)
                    res.status(400).json({message:"Task not found"})
                return res.status(200).json(response.rows[0])    
            } catch (error:any) {
                res.status(400).json({error:error.message})
            }
        default:
            return res.status(400).json('method not allowed')
    }
}