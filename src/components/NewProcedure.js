import { Link } from "react-router-dom";
import { useState } from "react";

import { useAppContext } from "../contexts/AppContext";

import { Card, Stack, TextField, Typography, MenuItem, Select, Autocomplete } from "@mui/material";
import Fab from '@mui/material/Fab';
import NavigationIcon from '@mui/icons-material/Navigation';
import { MuiTelInput } from "mui-tel-input";
import Switch from '@mui/material/Switch';



export default function NewProcedures() {

    const AppContext = useAppContext();

    const procedures = AppContext.procedures.map(proc => {
        return {
            id: proc.id,
            name: proc.type
        }
    });

    const providers = AppContext.providers.map(provider => {
        return {
            id: provider.id,
            name: provider.name
        }
    });

    const destinations = AppContext.destinations.map(des => {
        return {
            id: des.id,
            name: des.name
        }
    })

    const customers = localStorage.getItem('customers') ?
        JSON.parse(localStorage.getItem('customers')).map(cus => {
            return {
                id: cus.id,
                name: cus.name
            }
        }) : []

    const [newProcedureValues, setNewProcedureValues] = useState({
        selectedProcedure: null,
        peopleCount: 1,
        operationData: null,
        phone: null,
        from: null,
        to: null,
        selectedProvider: null,
        financials: {
            cost:'',
            profit:'',
            isPaid:false
        },
        passengersNames: [],
        notes: null
    })


    return (
        <div style={{width:'70vw'}}>
           <Link to="/">
                <img src="/images/DNA-logo.png" alt="DNA Logo" style={{width:'100px'}} />
            </Link>
            <Stack direction="column" justifyContent="center" alignItems="center" spacing={0.5} sx={{mb:3}}>
                <Typography variant='h4' color='primary' style={{fontWeight:'bold', marginBottom:'50px'}}>تسجيل إجراء جديد</Typography>
                <Card sx={{width:'100%', padding:'20px 10px', display:'flex', justifyContent:'space-between', alignItems:'center', gap:2}}>
                    <Typography variant='h6' sx={{ml:1}}>
                       الإجراء المطلوب
                    </Typography>
                    <Select
                      label="الاجراء المطلوب"
                      id="selectedProcedure"
                        value={procedures.find(proc => proc.name === newProcedureValues.selectedProcedure)?.id || ''}
                        onChange={(e) => {
                            setNewProcedureValues({...newProcedureValues, selectedProcedure: procedures[e.target.value -1].name})
                        }}
                    >
                      {procedures.map(proc => {
                        return (
                            <MenuItem key={proc.id} value={proc.id}>{proc.name}</MenuItem>
                        )
                      })}
                    </Select>
                    <Typography variant='h6' sx={{ml:1}}>
                      عدد الأشخاص
                    </Typography>
                    <Select
                      label="عدد الأشخاص"
                      id="peopleCount"
                        value={newProcedureValues.peopleCount}
                        onChange={(e) => setNewProcedureValues({...newProcedureValues, peopleCount: e.target.value})}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => {
                        return (
                            <MenuItem key={num} value={num}>{num}</MenuItem>
                        )
                      })}
                    </Select>
                </Card>
                {(newProcedureValues.selectedProcedure === 'تذكرة طيران' || newProcedureValues.selectedProcedure === 'تذكرة باخرة' || newProcedureValues.selectedProcedure === 'تذكرة باص سياحي') && (
                    <>
                        <Card sx={{width:'100%', padding:'20px 10px', display:'flex', justifyContent:'space-between', alignItems:'center', gap:2}}>
                            <Typography variant='h6' sx={{ml:1}}>
                                من
                            </Typography>
                            <Autocomplete
                                id="from"
                                freeSolo
                                fullWidth
                                value={newProcedureValues.from}
                                onChange={(e, n) => setNewProcedureValues({...newProcedureValues, from: n})}
                                options={destinations.map((option) => option.name)}
                                renderInput={(params) => <TextField {...params} />}
                            />
                            <Typography variant='h6' sx={{ml:1}}>
                                إلى
                            </Typography>
                            <Autocomplete
                                id="from"
                                freeSolo
                                fullWidth
                                value={newProcedureValues.to}
                                onChange={(e, n) => setNewProcedureValues({...newProcedureValues, to: n})}
                                options={destinations.map((option) => option.name)}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </Card>
                        <Card sx={{width:'100%', padding:'20px 10px', display:'flex', justifyContent:'space-between', alignItems:'center', gap:2}}>
                            <Typography variant='h6' sx={{ml:1}}>
                                اسم الشركة
                            </Typography>
                            <Select
                                label="اسم الشركة"
                                id="selectedProvider"
                                value={providers.find(provider => provider.name === newProcedureValues.selectedProvider)?.id || ''}
                                onChange={(e) => setNewProcedureValues({...newProcedureValues, selectedProvider: providers[e.target.value -1].name})}
                            >
                                {providers.map(provider => {
                                    return (
                                        <MenuItem key={provider.id} value={provider.id}>{provider.name}</MenuItem>
                                    )
                                })}
                            </Select>
                        </Card>
                    </>
                )}
                <Card sx={{width:'100%', padding:'20px 10px', display:'flex', justifyContent:'space-between', alignItems:'center', gap:2}}>
                    <Typography variant='h6' sx={{ml:1}}>
                       تاريخ الإجراء
                    </Typography>
                    <TextField
                      type="date"
                      id="operationData"
                      value={newProcedureValues.operationData}
                      onChange={(e) => setNewProcedureValues({...newProcedureValues, operationData: e.target.value})}
                    />
                </Card>
                <Card sx={{width:'100%', padding:'20px 10px', display:'flex', justifyContent:'space-between', alignItems:'center', gap:2}}>
                    <Typography variant='h6' sx={{ml:1}}>
                       رقم هاتف مرجعي
                    </Typography>
                    <MuiTelInput
                      defaultCountry='SD'
                      id="phone"
                      value={newProcedureValues.phone}
                      onChange={(newPhone) => setNewProcedureValues({...newProcedureValues, phone: newPhone})}
                    />
                </Card>
                <Card sx={{width:'100%', padding:'20px 10px', display:'flex', justifyContent:'space-between', alignItems:'center', gap:2}}>
                    <Typography variant='h6' sx={{ml:1}}>
                       المبلغ
                    </Typography>
                    <TextField
                      id="cost"
                      value={newProcedureValues.financials.cost}
                      onChange={(e) => setNewProcedureValues({...newProcedureValues, financials : {...newProcedureValues.financials, cost: e.target.value}})}
                    />
                    <Typography variant='h6' sx={{ml:1}}>
                       الفائدة
                    </Typography>
                    <TextField
                      id="profit"
                      value={newProcedureValues.financials.profit}
                      onChange={(e) => setNewProcedureValues({...newProcedureValues, financials : {...newProcedureValues.financials, profit: e.target.value}})}
                    />
                    <Typography variant='h6' sx={{ml:1}}>
                       تم الدفع؟
                    </Typography>
                    <Switch
                      id="isPaid"
                      checked={newProcedureValues.financials.isPaid}
                      onChange={(e) => setNewProcedureValues({...newProcedureValues, financials : {...newProcedureValues.financials, isPaid: e.target.checked}})}
                    />
                </Card>
                <Card sx={{width:'100%', padding:'20px 10px', display:'flex',flexDirection:'column', justifyContent:'center', alignItems:'start', gap:2}}>
                    <Typography variant='h6' sx={{ml:1}}>
                       أسماء الأشخاص
                    </Typography>
                    {[...Array(newProcedureValues.peopleCount)].map((_, index) => (
                        <Autocomplete
                                id="passengersNames"
                                key={index}
                                freeSolo
                                fullWidth
                                value={newProcedureValues.passengersNames[index]}
                                onChange={(e, n) => {
                                    const newNames = [...newProcedureValues.passengersNames];
                                    newNames[index] = n;
                                    setNewProcedureValues({...newProcedureValues, passengersNames: newNames});
                                }}
                                options={customers.map((option) => option.name)}
                                renderInput={(params) => <TextField placeholder={`اسم الشخص ${index + 1}`} {...params} />}
                        />
                    ))}
                </Card>
                <Card sx={{width:'100%', padding:'20px 10px', display:'flex',flexDirection:'column', justifyContent:'center', alignItems:'start', gap:2}}>
                    <Typography variant='h6' sx={{ml:1}}>
                       ملاحظات
                    </Typography>
                    <TextField
                      fullWidth
                      id="notes"
                      multiline
                      rows={3}
                      value={newProcedureValues.notes}
                      onChange={(e) => setNewProcedureValues({...newProcedureValues, notes: e.target.value})}
                    />
                </Card>
                <Fab

                onClick={() => {
                    AppContext.addOperation(newProcedureValues);

                    AppContext.showHideSnack('تم اضافة الإجراء بنجاح')

                    setNewProcedureValues({
                        selectedProcedure: null,
                        peopleCount: 1,
                        operationData: null,
                        phone: null,
                        from: null,
                        to: null,
                        selectedProvider: null,
                        financials: {
                            cost:'',
                            profit:'',
                            isPaid:false
                        },
                        passengersNames: [],
                        notes: null})
                }}
                disabled={
                    !newProcedureValues.selectedProcedure ||
                    !newProcedureValues.operationData ||
                    !newProcedureValues.phone ||
                    newProcedureValues.passengersNames.length === 0 ||
                    !newProcedureValues.financials.cost ||
                    !newProcedureValues.financials.profit
                }
                variant="extended" color="primary" sx={{position:'fixed', bottom:16, right:16}}>
                    <NavigationIcon sx={{ ml: 1 }} />
                    <Typography variant='h6'>حفظ</Typography>
                </Fab>
            </Stack>
        </div>
    )
}