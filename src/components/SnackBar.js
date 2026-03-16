import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';


export default function SnackBar({ message, open, severity = 'success' }) {
  return (
    <div>
      <Snackbar
        open={open}
      >
        <Alert
          severity={severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}