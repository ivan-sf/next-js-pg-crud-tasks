import {NextApiRequest, NextApiResponse} from 'next'
import {connect} from 'src/utils/database'

export default async (req:NextApiRequest,res:NextApiResponse)=>{
    const { body,query,method } = req;
    switch (method) {
        case 'GET':
            try {
                const sql = "SELECT * FROM users WHERE id=$1"
                const values = [query.id]
                const response = await connect.query(sql,values);
                if (response.rowCount===0)
                    return res.status(400).json('user not found')
                return res.status(200).json(response.rows)
            } catch (error:any) {
                return res.status(400).json({error:error.message})
            }
        case 'PUT':
            try {
                const {name,user,estado} = body;
                const sql = 'UPDATE users SET name=$1, "user"=$2, estado=$3 WHERE id = $4 RETURNING *'
                const values = [name,user,estado,query.id]
                const response = await connect.query(sql,values)
                if(response.rowCount === 0)
                    res.status(400).json('User not found')
                res.status(200).json(response.rows)
            } catch (error:any) {
                return res.status(400).json({error:error.message})
            }
        case 'DELETE':
            try {
                const sql = 'DELETE FROM users WHERE id = $1 RETURNING *'
                const values = [query.id]
                const response = connect.query(sql,values)
                if(response.rows===0)
                    return res.status(400).json('User not found')
                return res.status(200).json(response.rows)
            } catch (error:any) {
                return res.status(400).json({error:error.message})
            }
        default:
            break;
    }
}