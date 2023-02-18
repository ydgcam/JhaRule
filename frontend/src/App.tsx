import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import THEME from './components/Theme';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import LoginPage from './scenes/login/index';
import AppHeader from './components/AppHeader';
import LandingPage from './scenes/landing/index';
import CreatePage from './scenes/document/create/index';
import EditPage from './scenes/document/edit/index';
import DocumentList from './components/DocumentList';
import ProfilePage from './scenes/profile/index';

function App() {
  return (
    <ThemeProvider theme={THEME}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route element={<AppHeader />}>
              <Route path='/' element={<LandingPage />}>
                <Route index element={<DocumentList />} />
                <Route path='create' element={<CreatePage /> }/>
                <Route path=':docId' element={<EditPage />} />
              </Route>
              <Route path='/profile' element={<ProfilePage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
