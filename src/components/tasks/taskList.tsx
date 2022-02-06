import { Button, Card, Divider, Grid, Row, Text } from '@nextui-org/react'
import { Task } from 'src/interfaces/Task'

interface Props {
    tasks: Task[];
}

function TaskList({tasks}:Props){
    console.log(tasks)
    return(
        <Grid.Container gap={2} justify="center"> 
            <Row>
                <Text h1 style={{textAlign:'center',width:'100%'}}>Tasks</Text>
            </Row>
            {tasks.map((item,index)=>(
              <Grid>  
                <Card css={{ w: "330px" }}>
                  <Card.Header key={index}>

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
                      <Button size="sm" color="error">Delete</Button>
                      <Button size="sm" color="warning">Update</Button>
                    </Row>                   
                  </Card.Footer>
                </Card>
              </Grid>  
            ))}
            
        </Grid.Container>
    )
}

export default TaskList