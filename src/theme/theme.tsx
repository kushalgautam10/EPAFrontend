import { createTheme } from '@mui/material/styles';

export const getTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      primary: { main: '#223323ff' }, // use green theme
      background: { default: mode === 'light' ? '#f7fafb' : '#0b1020' },
      divider: 'rgba(0,0,0,0.08)'
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            borderBottom: '1px solid rgba(0,0,0,0.08)'
          }
        }
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            borderRight: '1px solid rgba(0,0,0,0.08)'
          }
        }
      }
    },
    spacing: 8
  });