import { MenuItem, Select, Stack, Switch, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import { useState } from 'react';

import { useAppContext } from '../contexts/AppContext';
import { MuiTelInput } from 'mui-tel-input';

const EditProcedureDialog = ({opId, open, handleClose, handleSubmit}) => {

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

  const [newProcedureValues, setNewProcedureValues] = useState(JSON.parse(localStorage.getItem('operations')).find((o) => o.id === opId))

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle color='primary' fontSize={40}>تعديل بيانات الإجراء</DialogTitle>
        <DialogContent>
          <div>
            <Stack direction={'row'} sx={{width:'100%', padding:'10px', display:'flex', justifyContent:'space-between', alignItems:'center', gap:2}}>
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
            </Stack>
            <Stack direction={'row'} sx={{width:'100%', padding:'10px', display:'flex', justifyContent:'space-between', alignItems:'center', gap:2}}>
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
            </Stack>
            {(newProcedureValues.selectedProcedure === 'تذكرة طيران' || newProcedureValues.selectedProcedure === 'تذكرة باخرة' || newProcedureValues.selectedProcedure === 'تذكرة باص سياحي') && (
                    <>
                        <Stack direction={'row'} sx={{width:'100%', padding:'20px 10px', display:'flex', justifyContent:'space-between', alignItems:'center', gap:2}}>
                            <Typography variant='h6' sx={{ml:1}}>
                                من
                            </Typography>
                            <TextField
                              fullWidth
                              id="from"
                              value={newProcedureValues.from}
                              onChange={(e) => setNewProcedureValues({...newProcedureValues, from: e.target.value})}
                            />
                            <Typography variant='h6' sx={{ml:1}}>
                                إلى
                            </Typography>
                            <TextField
                              fullWidth
                              id="to"
                                value={newProcedureValues.to}
                                onChange={(e) => setNewProcedureValues({...newProcedureValues, to: e.target.value})}
                            />
                        </Stack>
                        <Stack direction={'row'} sx={{width:'100%', padding:'20px 10px', display:'flex', justifyContent:'space-between', alignItems:'center', gap:2}}>
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
                        </Stack>
                    </>
                )}
                <Stack direction={'row'} sx={{width:'100%', padding:'20px 10px', display:'flex', justifyContent:'space-between', alignItems:'center', gap:2}}>
                    <Typography variant='h6' sx={{ml:1}}>
                       تاريخ الإجراء
                    </Typography>
                    <TextField
                      type="date"
                      id="operationData"
                      value={newProcedureValues.operationData}
                      onChange={(e) => setNewProcedureValues({...newProcedureValues, operationData: e.target.value})}
                    />
                </Stack>
                <Stack direction={'row'} sx={{width:'100%', padding:'20px 10px', display:'flex', justifyContent:'space-between', alignItems:'center', gap:2}}>
                    <Typography variant='h6' sx={{ml:1}}>
                       رقم هاتف مرجعي
                    </Typography>
                    <MuiTelInput
                      defaultCountry='SD'
                      id="phone"
                      value={newProcedureValues.phone}
                      onChange={(newPhone) => setNewProcedureValues({...newProcedureValues, phone: newPhone})}
                    />
                </Stack>
                <Stack direction={'row'} sx={{width:'100%', padding:'20px 10px', display:'flex', justifyContent:'space-between', alignItems:'center', gap:2}}>
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
                </Stack>
                <Stack sx={{width:'100%', padding:'20px 10px', display:'flex',flexDirection:'column', justifyContent:'center', alignItems:'start', gap:2}}>
                    <Typography variant='h6' sx={{ml:1}}>
                       أسماء الأشخاص
                    </Typography>
                    {[...Array(newProcedureValues.peopleCount)].map((_, index) => (
                        <TextField
                          disabled
                          key={index}
                          id="passengersNames"
                          fullWidth
                          value={newProcedureValues.passengersNames[index]}
                            onChange={(e) => {
                                const newNames = [...newProcedureValues.passengersNames];
                                newNames[index] = e.target.value;
                                setNewProcedureValues({...newProcedureValues, passengersNames: newNames});
                            }}
                          placeholder={`اسم الشخص ${index + 1}`}
                        />
                    ))}
                </Stack>
                <Stack sx={{width:'100%', padding:'20px 10px', display:'flex',flexDirection:'column', justifyContent:'center', alignItems:'start', gap:2}}>
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
                </Stack>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>إلغاء</Button>
          <Button variant='contained' sx={{mr:1, fontWeight:'bold'}}onClick={()=> handleSubmit(newProcedureValues)}>
            حفظ لتعديلات
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditProcedureDialog;