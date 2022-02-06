import { Button, Grid, Row, Spacer } from "@nextui-org/react";
import router from "next/router";

export default function Navbar(){
    return(
        <nav style={{background:'#1c1d1c',marginBottom:'20px'}}>
            <Grid xs={12}>
                <Row style={{border:'solid transparent',width:'98vw', justifyContent:'space-between'}} >
                    <Button auto ghost rounded color="gradient" size="md" onClick={()=>router.push('/')}>Home</Button>
                    <Button auto ghost rounded color="gradient" size="md" onClick={()=>router.push('tasks/create')}>New task</Button>
                </Row>
            </Grid>
        </nav>
    )
}