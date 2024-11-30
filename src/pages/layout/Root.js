import { Box } from "@mui/material";
import PageHeader from "../../components/layout/PageHeader";
import { Outlet } from "react-router-dom";

export default function Root(){
    return <Box>
        <PageHeader/>
        <Outlet/>
    </Box>
}