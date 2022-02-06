import { Button, Card, Checkbox, Divider, Grid, Input, Row, Spacer, Text } from "@nextui-org/react"
import { ChangeEvent, FormEvent, useState } from 'react'
import { User } from "src/interfaces/User"


export default ()=>{
    const [ user,setUser ] = useState({
        name:'',
        user:'',
        estado: '1'
    })
    
    const createUser = async(user:User)=>{
        await fetch('http://localhost:3000/api/users',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
    }
    
    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            createUser(user)
        } catch (error) {
            
        }
    }
    
    const handleChange = ({target:{name,value}}:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>setUser({...user,[name]:value})

    
    return (
        <Grid.Container gap={2}> 
            <Grid>  
                <form onSubmit={handleSubmit}>
                <Card css={{ w: "330px" }}>
                    <Card.Header>
                    <Text b>Card Title</Text>
                    </Card.Header>
                    <Divider/>
                    <Card.Body css={{ py: '$10' }}>
                        <Spacer y={2} />
                        <Input name="name" underlined labelPlaceholder="Name" onChange={handleChange}/>
                        <Spacer y={2} />
                        <Input name="user" underlined labelPlaceholder="User" onChange={handleChange}/>
                    </Card.Body>
                    <Divider/>
                    <Card.Footer>
                    <Button>Save</Button>
                    </Card.Footer>
                </Card>
                </form>
            </Grid>  
            </Grid.Container>
    )
}