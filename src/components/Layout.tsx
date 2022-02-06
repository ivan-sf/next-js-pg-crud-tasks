import {  Grid, } from "@nextui-org/react";
import Navbar from 'src/components/Nav'
export default function Layout({children}:any){
    return(
        <Grid.Container gap={2}>
            <Navbar/>
            {children}
        </Grid.Container>
    )
}