import {
  Routes, Route, BrowserRouter
} from "react-router-dom";
import { Toaster  } from 'react-hot-toast';
import Home from './components/Home/';
import SelectStepper from './components/SelectStepper';
import SignupStepper from './components/SignupStepper';
import SigninStepper from './components/SigninStepper';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import NoMatch from './components/NoMatch';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({    
});

export default function App() {        
    return ( <ThemeProvider theme={theme}>
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />               
                <Route exact path="select_stepper" element={<SelectStepper />} />
                <Route exact path="signup_stepper" element={<SignupStepper />} />
                <Route exact path="signin_stepper" element={<SigninStepper />} />
                 <Route exact path="dashboard" element={
                     <ProtectedRoute>
                         <Dashboard />
                     </ProtectedRoute>
                 } />      
                <Route path="*" element={<NoMatch  />} />                                                                  
            </Routes>      
        </BrowserRouter>
        <Toaster
            containerStyle={{              
                top: 20,               
            }}
         />
    </ThemeProvider>);
}




