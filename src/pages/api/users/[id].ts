import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from 'src/utils/database'

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req:NextApiRequest,res:NextApiResponse)=>{
    const {method,body,query} = req
    
    switch (method) {
        case "GET":
            try {
                const pg = 'SELECT * FROM users WHERE id = $1'
                const values = [query.id]
                const response = await connect.query(pg,values)
                if(response.rowCount === 0)
                    return res.status(400).json({message:"User not found"})
                return res.status(200).json(response.rows)
            } catch (error:any) {
                res.status(400).json({error:error.message})
            }

        case "PUT":
            try {
                const { name,user,estado } = body
                const pg = 'UPDATE users SET name=$1, "user"=$2, estado=$3 WHERE id = $4 RETURNING *'
                const values = [name,user,estado,query.id]
                const response = await connect.query(pg,values)
                if(response.rowCount === 0)
                    return res.status(400).json({message:"User not found"})
                return res.status(200).json(response.rows)
            } catch (error:any) {
                res.status(400).json({error:error.message})
            }
        
        case "DELETE":
        try {
            const pg = 'DELETE FROM users WHERE id = $1 RETURNING *'
            const values = [query.id]
            const response = await connect.query(pg,values)
            if(response.rowCount === 0)
                return res.status(400).json({message:"User not found"})
            return res.status(200).json(response.rows)
        } catch (error:any) {
            res.status(400).json({error:error.message})
        }
    
        default:
            break;
    }
}