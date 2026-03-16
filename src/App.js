import './App.css';
import LandingPage from './components/LandingPage';
import Procedures from './components/Procedures';
import MainControlPage from './components/MainControlPage';
import CustomersPage from './components/CustomersPage';
import Reportspage from './components/Reportspage';
import NewProcedure from './components/NewProcedure';
import {AppProvider} from './contexts/AppContext';

import { Routes, Route, Link } from "react-router-dom";

import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Cairo',
    ].join(','),
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#00008b',
        },
        secondary: {
          main: '#ff0000',
        },
      },
    },
  },
});


function App() {
  return (
    <ThemeProvider theme={theme}>
        <AppProvider>
            <div className="App"
                dir="rtl"
                style={{
                    backgroundColor:'#e0e0e0',
                    minHeight:'100vh',
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center'
                }}
                >
                    <Container maxWidth="lg" sx={{minHeight:'100vh', placeItems:'center', display:'grid'}}>
                        <div style={{textAlign:'center', backgroundColor:'#f0f0f0', padding:'50px', borderRadius:'10px', boxShadow:'0 4px 8px rgba(0, 0, 0, 0.1)'}}>
                            <Routes>
                                <Route path="/" element={<LandingPage />} />
                                <Route path='/procedures' element={<Procedures />} />
                                <Route path='/new-procedure' element={<NewProcedure />} />
                                <Route path='/main-control-page' element={<MainControlPage />} />
                                <Route path='/customers-page' element={<CustomersPage />} />
                                <Route path='/reports-page' element={<Reportspage />} />
                                <Route path="*" element={
                                    <div style={{textAlign:'center', backgroundColor:'#f0f0f0', padding:'50px', borderRadius:'10px', boxShadow:'0 4px 8px rgba(0, 0, 0, 0.1)'}}>
                                        <h1 style={{color:'#ff0000'}}>404 - الصفحة غير موجودة</h1>
                                        <p>عذرًا، الصفحة التي تبحث عنها غير موجودة.</p>
                                        <Link to="/" style={{color:'blue', textDecoration:'none'}}>العودة إلى الصفحة الرئيسية</Link>
                                    </div>
                                } />
                            </Routes>
                        </div>
                    </Container>
            </div>
        </AppProvider>
    </ThemeProvider>
  );
}

export default App;