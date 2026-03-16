import { Fab, Typography } from "@mui/material"
import { Link } from "react-router-dom"
import NavigationIcon from '@mui/icons-material/Navigation';


const ToNewProcedure = () => {
    return (
        <Link to="/new-procedure">
                <Fab variant="extended" color="primary" sx={{position:'fixed', bottom:16, right:16}}>
                    <NavigationIcon sx={{ ml: 1 }} />
                    <Typography variant='h6'>إجراء جديد</Typography>
                </Fab>
        </Link>
    )
}

export default ToNewProcedure