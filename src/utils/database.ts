import {Pool} from 'pg'

let connect:any
if(!connect){
    connect = new Pool({
        user: 'postgres',
        password: 'admin',
        host:'localhost',
        port:5432,
        database:'tasks'
    })
}

export {connect}