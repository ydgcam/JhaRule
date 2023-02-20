import { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Drawer, CssBaseline, AppBar, Toolbar, List, Typography,
  IconButton, ListItemButton, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Outlet, useNavigate } from 'react-router-dom';
import THEME from './Theme';

const HeaderGutter = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const AppHeader = (): JSX.Element => {

  const navigate = useNavigate(); 
  const [open, setOpen] = useState(false);

  const getSidebarLinkInfo = (): {to: string, text: string}[] => {
    return ([
      {to: '/', text: 'Home'},
      {to: '/profile', text: 'Profile'}, 
    ]); 
  };

  const toggleSidebar = (toggle: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }
    setOpen(toggle);
  };

  const renderSidebarLinks = (): JSX.Element => {
    return (
      <Box sx={{ overflow: 'auto', width: 250 }}>
        <List>
          {getSidebarLinkInfo().map((link) => (
            <ListItemButton key={link.text} onClick={() => { 
              setOpen(false);
              navigate(link.to);
            }}>
              <ListItemText sx={{ color: 'primary.dark', pl: 1 }} primary={link.text} />
            </ListItemButton>
          ))}
          <ListItemButton key={'Sign Out'} onClick={()=>{}}>
            <ListItemText sx={{ color: 'primary.dark', pl: 1 }} primary={'Sign Out'} />
          </ListItemButton>
        </List>
      </Box>
    );
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleSidebar(true)}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon sx={{ fontSize: 40 }} />
          </IconButton>
          <Typography variant="h3" noWrap component="div" color={'secondary.main'}>JhaRuler</Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          '& .MuiDrawer-paper': {
            backgroundColor: THEME.palette.secondary.main
          },
        }}
        anchor="left"
        open={open}
        onClose={toggleSidebar(false)}
      >
        {renderSidebarLinks()}
      </Drawer>
      <HeaderGutter />

      <Outlet />
    </>
  );
};
export default AppHeader;