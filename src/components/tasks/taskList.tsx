import { Button, Card, Divider, Grid, Row, Text } from '@nextui-org/react'
import {useRouter} from 'next/router'
import { Task } from 'src/interfaces/Task'

interface Props {
    tasks: Task[];
}

function TaskList({tasks}:Props){
    const router = useRouter()
    
    return(
        <Grid.Container gap={2} justify="center"> 
            <Row>
                <Text h1 style={{textAlign:'center',width:'100%'}}>Tasks</Text>
            </Row>
            {tasks.map((item,index)=>(
              <Grid key={item.id}>  
                <Card css={{ w: "330px" }}>
                  <Card.Header >

                  <Text b>{item.title}</Text>
                  </Card.Header>

                  <Divider/>
                    
                  <Card.Body css={{ py: '$14' }}>
                    <Text>
                      {item.description}
                    </Text>
                    <Text size={10} style={{position:'absolute',bottom:0,right:'20px'}}>
                      {item.created_on}
                    </Text>
                  </Card.Body>

                  <Divider/>

                  <Card.Footer>
                    <Row justify="flex-end">
                      <Button size="sm" color="warning" onClick={()=>router.push(`/tasks/update/${item.id}`)}>Update</Button>
                    </Row>                   
                  </Card.Footer>
                </Card>
              </Grid>  
            ))}
            
        </Grid.Container>
    )
}

export default TaskList