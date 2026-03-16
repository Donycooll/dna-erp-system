import { Stack, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

import ToNewProcedure from "./ToNewProcedure";
import { useAppContext } from "../contexts/AppContext";


export default function LandingPage() {

    const customers = useAppContext().getCus

    return (
        <div>
            {customers}
            <Link to="/">
                <img src="/images/DNA-logo.png" alt="DNA Logo" style={{width:'200px'}} />
            </Link>
            <Typography variant="h4" color="primary" sx={{fontWeight:'bold'}}>
                نظـــام إدارة الموارد
            </Typography>
            <Stack direction="row" justifyContent="space-between" alignItems="center" style={{margin:'50px'}}>
                <Link to="/procedures">
                    <Button variant="outlined" style={{margin:'0 5px'}}>الإجراءات</Button>
                </Link>
                <Link to="/main-control-page" >
                    <Button variant="outlined" style={{margin:'0 5px'}}>لوحة التحكم الرئيسية</Button>
                </Link>
                <Link to="/customers-page" >
                    <Button variant="outlined" style={{margin:'0 5px'}}>العملاء</Button>
                </Link>
                <Link to="/reports-page" >
                    <Button variant="outlined" style={{margin:'0 5px'}}>التقارير</Button>
                </Link>
            </Stack>
            <ToNewProcedure />
        </div>
    )
}