import { Button, Card, Container, Divider, Grid, Row, Text } from '@nextui-org/react';
import router from 'next/router';
import Layout from 'src/components/Layout';
import TaskList from 'src/components/tasks/taskList';
import {Task} from 'src/interfaces/Task'

interface Props{
  tasks:Task[]
}

export default function index({tasks}:Props){

  return(
    <Layout>
      {tasks.length === 0 ? (
        <Container>
          <Row justify="center" align="center">
            <Text h6 size={15} color="black" style={{ margin: 0, textAlign: 'center'}} >
              Task not found
              <Button onClick={()=>router.push('tasks/create')}>Create a task</Button>
            </Text>
          </Row>
        </Container>
      )
      : ( 
        <TaskList tasks={tasks}/>
      )}
    </Layout>
  )  
}

export const getServerSideProps = async () => {

    const res = await fetch('http://localhost:3000/api/task');
    const tasks = await res.json()

    return {
      props:{
        tasks:tasks
      }
    }
}