import { Card,Text, Divider, Row, Button, Grid, Input, Spacer, Textarea, Modal } from '@nextui-org/react';
import router from 'next/router';
import React from 'react';
import { ChangeEvent, FormEvent, useState, useEffect } from 'react'
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

    const updateTask = async (id:string,task:Task)=>{
        await fetch('http://localhost:3000/api/task/'+id,{
            method:'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(task)
        })
    }

    const deleteTask = async(id:string)=>{
        await fetch('http://localhost:3000/api/task/'+id,{
            method:'DELETE',
        })
        setVisible(false);
        router.push('/')
    }

    const handleSubmit = async (e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        // console.log(task)
        try {
            if(typeof router.query.id === 'string'){
                updateTask(router.query.id,task)
            }else{
                createTask(task)
            }
                
            router.push('/')
        } catch (error) {
            console.log(error)
        }
    }

    const loadData = async(id:string)=>{
        const res = await fetch(`http://localhost:3000/api/task/${id}`)
        const task = await res.json()
        setTask({title:task.title,description:task.description})
        console.log(task) 
    }

    useEffect(()=>{
        if(typeof router.query.id === 'string') loadData(router.query.id)
    },[router.query])


    //////////MODAL

    const [visible, setVisible] = React.useState(false);
    const handler = () => {
        setVisible(true)
    };
    const closeHandler = () => {
        setVisible(false);
        console.log('closed');
    };

    return(
        <Layout>
            <Grid.Container gap={2} justify='center'> 
                <Grid>  
                <form onSubmit={handleSubmit}>
                    <Card css={{ w: "330px" }}>
                        <Card.Header>
                            <Text b>New Task</Text>
                        </Card.Header>

                        <Divider/>
                        <Card.Body css={{ py: '$10' }}>
                                <Input initialValue={task.title} autoFocus clearable bordered type="text" name="title" onChange={handleChange}/>
                                <Spacer y={1} />
                                <Textarea initialValue={task.description} name="description" placeholder="Enter your amazing ideas." onChange={handleChange}/>
                        </Card.Body>

                        <Divider/>

                        {router.query.id ? (
                            <Card.Footer>
                                <Row justify="flex-end">
                                    <Button type='submit' size="sm" color="warning">Update</Button>
                                </Row>
                            </Card.Footer>
                        ):(
                            <Card.Footer>
                                <Row justify="flex-end">
                                    <Button type='submit' size="sm">Save</Button>
                                </Row>
                            </Card.Footer>
                        )}
                    </Card>
                </form>
                {router.query.id ? (
                    <Grid>
                        <Button size="sm" auto ghost color="error" onClick={handler}>
                            Delete
                        </Button>
                        <Modal
                            closeButton
                            preventClose
                            aria-labelledby="modal-title"
                            open={visible}
                            onClose={closeHandler}>
                            <Modal.Header>
                                <Text id="modal-title" size={18}>
                                Confirm delete <Text b size={18}>task</Text>
                                </Text>
                            </Modal.Header>
                            <Modal.Body>
                                Are you sure you want to delete this task {router.query.id}?
                            </Modal.Body>
                            <Modal.Footer>
                                <Button auto flat color="primary" onClick={closeHandler}>
                                    Close
                                </Button>
                                <Button color="error" auto onClick={()=>{
                                    if(typeof router.query.id === 'string')
                                        deleteTask(router.query.id)
                                }}>
                                    Delete
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </Grid>
                ):(
                    <Grid></Grid>
                )}
                </Grid>  
            </Grid.Container>
        </Layout>
    )
}