import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
// import { useState } from 'react';

export default function DeleteProcedureDialog({opId, open, handleClose, handleSubmit}) {

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle color='secondary' fontSize={40}>
          هل انت متأكد ؟
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            اذا تم الحذف , لن يتم استرجاع البيانات المحذوفة بأي طريقة
          </DialogContentText>
        </DialogContent>
        <DialogActions >
          <Button onClick={()=> handleClose()}>إلغاء</Button>
          <Button color='secondary' variant='contained' sx={{mr:1, fontWeight:'bold'}} onClick={()=> handleSubmit(opId)} autoFocus>
            حذف
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}