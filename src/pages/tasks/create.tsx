import { Card,Text, Divider, Row, Button, Grid, Input, Spacer, Textarea } from '@nextui-org/react';
import router from 'next/router';
import { ChangeEvent, FormEvent, useState } from 'react'
import Layout from 'src/components/Layout';
import { Task } from 'src/interfaces/Task';
export default ()=>{

    const [ task,setTask ] = useState({
        title:'',
        description:''
    })

    const handleChange = ({target:{name,value}}:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setTask({...task,[name]:value})

    const createTask = async(task:Task)=>{
        await fetch('http://localhost:3000/api/task',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        });
    }

    const handleSubmit = async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        console.log(task)
        try {
            createTask(task)
            router.push('/')
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <Layout>
            <Grid.Container gap={2} justify='center'> 
                <Grid>  
                <form onSubmit={handleSubmit}>
                    <Card css={{ w: "330px" }}>
                        <Card.Header>
                            <Text b>Card Title</Text>
                        </Card.Header>

                        <Divider/>
                        <Card.Body css={{ py: '$10' }}>
                                <Input autoFocus clearable bordered type="text" name="title" onChange={handleChange}/>
                                <Spacer y={1} />
                                <Textarea name="description" placeholder="Enter your amazing ideas." onChange={handleChange}/>
                        </Card.Body>

                        <Divider/>

                        <Card.Footer>
                            <Row justify="flex-end">
                                <Button size="sm" light>Cancel</Button>
                                <Button type='submit' size="sm">Save</Button>
                            </Row>
                        </Card.Footer>
                    </Card>
                </form>
                </Grid>  
            </Grid.Container>
        </Layout>
    )
}