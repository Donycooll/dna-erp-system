import {Link} from "react-router-dom";
import { Typography } from "@mui/material";

export default function Reportspage() {
    return (
        <div>
            <Link to="/">
                <img src="/images/DNA-logo.png" alt="DNA Logo" style={{width:'200px'}} />
            </Link>
            <Typography>Reports Page Component</Typography>
             <Typography variant="h5" color={"secondary"} sx={{mt:2}}>
                هذه الصفحة تحت الإنشاء، يرجى العودة لاحقًا.
            </Typography>
        </div>
    )
}