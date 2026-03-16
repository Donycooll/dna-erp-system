import { Card, Stack, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts';
import {Link} from 'react-router-dom';

import { useState, useMemo } from 'react';

import ToNewProcedure from './ToNewProcedure';

const formatUSD = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'SDG',
  }).format(value);
};

export default function MainControlPage() {

    const [curOp] = useState(localStorage.getItem('operations') ? JSON.parse(localStorage.getItem('operations')) : [])

    const todayOps = useMemo(() => {
        const today = new Date().setHours(0,0,0,0)
        return curOp.filter((op) => {
            const ops = new Date(op.creationDate).setHours(0,0,0,0)
            return ops === today
        })
    }, [curOp])

    const todayIncome = todayOps
    .map((op) => parseInt(op.financials.profit))
    .reduce((a, b) => {
        return a + b
    }, 0)

    const pendingOps = curOp.filter(op => op.financials.isPaid === false).length

    return (
        <div style={{width:'70vw'}}>
             <Link to="/">
                <img src="/images/DNA-logo.png" alt="DNA Logo" style={{width:'100px'}} />
            </Link>
            <Stack direction="column" justifyContent="center" alignItems="center" spacing={0.5} sx={{mb:3}}>
                <Typography variant='h4' color='primary' style={{fontWeight:'bold', marginBottom:'50px'}}>لوحة التحكم الرئيسية</Typography>
                <Card sx={{width:'100%', padding:'20px', display:'flex', flexDirection:'column', alignItems:'center', gap:2}}>
                    <Stack sx={{width:'100%'}} direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                        <Typography variant='h6' fontWeight={'bold'}>تاريخ اليوم</Typography>
                        <Typography variant='h6' color='secondary'>{new Date().toLocaleDateString()}</Typography>
                    </Stack>
                </Card>

                <Card sx={{width:'100%', padding:'20px', display:'flex', flexDirection:'column', alignItems:'center', gap:2}}>
                    <Stack sx={{width:'100%'}} direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                        <Typography variant='h6' fontWeight={'bold'}>ايراد اليوم</Typography>
                        <Typography variant='h6' color='secondary'>{formatUSD(todayIncome)}</Typography>
                    </Stack>
                </Card>

                <Card sx={{width:'100%', padding:'20px', display:'flex', flexDirection:'column', alignItems:'center', gap:2}}>
                    <Stack sx={{width:'100%'}} direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                        <Typography variant='h6' fontWeight={'bold'}>الطلبات المعلقة</Typography>
                        <Typography variant='h6' color='secondary'>{pendingOps}</Typography>
                    </Stack>
                </Card>
            </Stack>
            <Stack direction='column' justifyContent='center' alignItems='center' spacing={2}>
                <Typography variant='h5' color='secondary' fontWeight={'bold'}>إحصائيات الأسبوع</Typography>
                <BarChart
                    yAxis={[{ position: 'none' }]}
                    xAxis={[{ data: ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'], position: 'bottom' }]}
                    series={[{ data: [5000, 45000, 25000, 35000, 40000, 10000], barLabel:'value', barLabelPlacement:'outside', label:'الإيراد' }]}
                    height={300}
                    style={{width:'70vw'}}
                />
            </Stack>
            <ToNewProcedure />
        </div>
    )
}