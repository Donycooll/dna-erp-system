import { MenuItem, Select, Typography, FormControl, InputLabel, Button } from "@mui/material";
import {Link} from "react-router-dom";
import { Stack } from "@mui/system";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import ToNewProcedure from "./ToNewProcedure";
import EditProcedureDialog from "./EditProcedureDialog";
import DeleteProcedureDialog from "./DeleteProcedureDialog";

import { useState } from "react";
import { useAppContext } from "../contexts/AppContext";


const formatUSD = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'SDG',
  }).format(value);
};

export default function Procedures() {

    const AppContext = useAppContext()

     const procedures = AppContext.procedures.map(proc => {
        return {
            id: proc.id,
            name: proc.type
        }
    });


    const [curOp, setCurOp] = useState(localStorage.getItem('operations') ? JSON.parse(localStorage.getItem('operations')) : [])

    const [selectedFilters, setSelectedFilters] = useState({
        procedure: '',
        payment: '',
    })

    const filteredOp = curOp.filter((o) => {
        if(selectedFilters.procedure === '' && selectedFilters.payment === '') {
            return curOp
        }
        if(selectedFilters.procedure === '' && selectedFilters.payment !== '') {
            return o.financials.isPaid === selectedFilters.payment
        }
        if(selectedFilters.procedure !== '' && selectedFilters.payment === '') {
            return o.selectedProcedure === selectedFilters.procedure
        }
        return o.selectedProcedure === selectedFilters.procedure && o.financials.isPaid === selectedFilters.payment
    })

    // Edit dialog handlers
    const [openEditDialog, setOpenEditDialog] = useState(false)
    const handleClickOpenEditDialog = () => {
        setOpenEditDialog(true)
    };
    const handleCloseEditDialog = () => {
        setCurOpId('')
        setOpenEditDialog(false);
    };
    const handleSubmitEditDialog = (newProcedureValues) => {
        handleCloseEditDialog();
        const editedOp = curOp.map((o) => {
            if(o.id === newProcedureValues.id) {
                return newProcedureValues
            }
            return o
        })
        localStorage.setItem('operations', JSON.stringify(editedOp))
        setCurOp(editedOp)
        AppContext.showHideSnack('تم التعديل بنجاح')
    };
    //

    const [curOpId, setCurOpId] = useState('')

    // delete dialog handlers
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const handleClickOpenDeleteDialog = () => {
        setOpenDeleteDialog(true);
    };
    const handleCloseDeleteDialog = () => {
        setCurOpId('')
        setOpenDeleteDialog(false);
    };
    const handleSubmitDeleteDialog = (opId) => {
        handleCloseDeleteDialog()
        const curruntOp = curOp.filter((o) => {
            return o.id !== opId
        })
        localStorage.setItem('operations', JSON.stringify(curruntOp))
        setCurOp(curruntOp)
        AppContext.showHideSnack('تم الحذف بنجاح', 'error')
    }
    //

    return (
        <div style={{width:'70vw'}}>
            <Link to="/">
                <img src="/images/DNA-logo.png" alt="DNA Logo" style={{width:'100px'}} />
            </Link>
            <Stack direction="column" justifyContent="center" alignItems="center" spacing={0.5} sx={{mb:3}}>
                <Typography variant='h4' color='primary' style={{fontWeight:'bold', marginBottom:'30px'}}>الإجراءات</Typography>
                {filteredOp && (
                    <>
                        <Stack direction={'row'} gap={2}>
                            <FormControl variant="outlined" sx={{ minWidth: 150, mb: 2 }}>
                                <InputLabel id="procedure-select-label">نوع الإجراء</InputLabel>
                                <Select
                                    labelId="procedure-select-label"
                                    id="procedure-select"
                                    autoWidth
                                    label="نوع الإجراء"
                                    value={selectedFilters.procedure}
                                    onChange={(e) => {
                                        setSelectedFilters({...selectedFilters, procedure: e.target.value });
                                    }}
                                    >
                                    {procedures.map((p) => (
                                        <MenuItem key={p.id} value={p.name}>
                                            {p.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl variant="outlined" sx={{ minWidth: 150, mb: 2 }}>
                                <InputLabel id="payment-check">حالة الدفع</InputLabel>
                                <Select
                                    labelId="payment-check"
                                    id="payment-check"
                                    autoWidth
                                    label="نوع الإجراء"
                                    value={selectedFilters.payment}
                                    onChange={(e) => {
                                        setSelectedFilters({...selectedFilters, payment: e.target.value});
                                    }}
                                    >
                                    <MenuItem key={'payed'} value={true}>تم الدفع</MenuItem>
                                    <MenuItem key={'not-payed'} value={false}>لم يتم الدفع</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>
                        <Button
                            onClick={() => setSelectedFilters({payment: '', procedure:''})} disabled={selectedFilters.procedure === '' && selectedFilters.payment === ''}
                            variant="contained"
                            sx={{mt: 1}}
                        >إعدة تعيين الفلاتر</Button>
                        <Typography variant="h5" style={{margin:'10px'}}>عدد الإجراءات: <span style={{color:'red', fontWeight:'bold'}}>{filteredOp.length}</span></Typography>
                    </>
                )}

                {filteredOp && filteredOp.map(proc => (
                        <Accordion key={proc.id} sx={{width:'100%'}}>
                            <AccordionSummary  aria-controls="panel1bh-content" id="panel1bh-header" >
                                <Stack width={'100%'}>
                                    <Typography variant="h6" color="primary" sx={{fontWeight:'bold'}} >
                                        {proc.selectedProcedure}
                                    </Typography>
                                    <Typography variant="body1" color="secondary" style={{display:'flex', justifyContent:'space-between', marginBottom:'10px'}}>
                                    <span style={{padding:'5px 10px', fontWeight:'bold'}}>
                                        {new Date(proc.creationDate).toLocaleDateString()}
                                    </span>
                                    </Typography>
                                </Stack>
                                <Stack gap={1} direction={'row'}>
                                    <IconButton onClick={() => {
                                        const curruntOp = curOp.map((op) => {
                                            if (op.id === proc.id) {
                                                return {
                                                    ...op,
                                                    financials:{
                                                        ...op.financials,
                                                        isPaid: !op.financials.isPaid,
                                                    }
                                                }
                                            }
                                            return op
                                        })
                                        localStorage.setItem('operations', JSON.stringify(curruntOp))
                                        setCurOp(curruntOp)
                                        AppContext.showHideSnack('تم التعديل بنجاح')
                                    }}>
                                        <CheckCircleIcon style={{color: proc.financials.isPaid? 'green' : 'gray'}}/>
                                    </IconButton>
                                    <IconButton onClick={() => {
                                        setCurOpId(proc.id)
                                        handleClickOpenEditDialog()
                                    }}>
                                        <EditIcon style={{color: 'blue'}}/>
                                    </IconButton>
                                    <IconButton onClick={() => {
                                        handleClickOpenDeleteDialog()
                                        setCurOpId(proc.id)
                                    }}>
                                        <DeleteIcon style={{color: 'red'}}/>
                                    </IconButton>
                                </Stack>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant="body1" color="secondary" style={{display:'flex', justifyContent:'space-between', marginBottom:'10px'}}>
                                    تاريخ الإجراء:
                                    <span style={{padding:'5px 10px', fontWeight:'bold'}}>
                                        {new Date(proc.operationData).toLocaleDateString()}
                                    </span>
                                </Typography>
                                <Typography variant="body1" style={{display:'flex', justifyContent:'space-between', marginBottom:'10px'}}>
                                    عدد الأشخاص:
                                    <span style={{padding:'5px 10px', fontWeight:'bold'}}>
                                        {proc.peopleCount}
                                    </span>
                                </Typography>
                                <Typography variant="body1" style={{display:'flex', justifyContent:'space-between', marginBottom:'10px'}}>
                                    رقم الهاتف:
                                    <span style={{padding:'5px 10px', fontWeight:'bold', direction:'ltr'}}>
                                        {proc.phone}
                                    </span>
                                </Typography>
                                <Typography variant="body1" style={{display:'flex', justifyContent:'space-between', marginBottom:'10px'}}>
                                    الفائدة:
                                    <span style={{padding:'5px 10px', fontWeight:'bold'}}>
                                        {formatUSD(proc.financials.profit)}
                                    </span>
                                </Typography>

                                {proc.selectedProvider && <Typography variant="body1" style={{display:'flex', justifyContent:'space-between', marginBottom:'10px'}}>
                                    الشركة المزودة:
                                    <span style={{padding:'5px 10px', fontWeight:'bold'}}>
                                        {proc.selectedProvider}
                                    </span>
                                </Typography>}

                                {proc.from && <Typography variant="body1" style={{display:'flex', justifyContent:'space-between', marginBottom:'10px'}}>
                                    من:
                                    <span style={{padding:'5px 10px', fontWeight:'bold'}}>
                                        {proc.from}
                                    </span> إلى:
                                    <span style={{padding:'5px 10px', fontWeight:'bold'}}>
                                        {proc.to}
                                    </span>
                                </Typography>}

                                <Typography variant="body1" style={{display:'flex', flexDirection:'column', alignItems:'flex-start', gap:1}}>
                                    العملاء:
                                        {proc.passengersNames.map(customer => (
                                            <span key={customer} style={{color:'blue', fontWeight:'bold'}}>
                                                - {customer}
                                            </span>
                                        ))}
                                </Typography>

                                {proc.notes && <Typography variant="body1" style={{display:'flex', justifyContent:'space-between', marginBottom:'10px'}}>
                                    ملاحظات:
                                    <span style={{padding:'5px 10px', fontWeight:'bold'}}>
                                        {proc.notes}
                                    </span>
                                </Typography>}
                            </AccordionDetails>
                        </Accordion>
                ))}
                {curOp.length === 0 && (
                    <Typography variant="h5" color="secondary">
                        لا توجد إجراءات مسجلة حتى الآن.
                    </Typography>
                )}
            </Stack>
            <ToNewProcedure />
            {curOpId &&
            <EditProcedureDialog
                opId={curOpId}
                open={openEditDialog}
                handleClose={handleCloseEditDialog}
                handleSubmit={handleSubmitEditDialog}
            />}
            <DeleteProcedureDialog
                opId={curOpId}
                open={openDeleteDialog}
                handleClose={handleCloseDeleteDialog}
                handleSubmit={handleSubmitDeleteDialog}
            />
        </div>
    )
}