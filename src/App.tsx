import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import THEME from './components/Theme';
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider';
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
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route element={<AppHeader />}>
            <Route path='/documents' element={<LandingPage />}>
              <Route index element={<DocumentList />} />
              <Route path='create' element={<CreatePage /> }/>
              <Route path=':docId' element={<EditPage />} />
            </Route>
            <Route path='/profile' element={<ProfilePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
