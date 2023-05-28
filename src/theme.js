import { createTheme } from '@mui/material/styles';

import '@fontsource/poppins';
import '@fontsource-variable/inter';
import '@fontsource/poppins/200.css';
import '@fontsource/poppins/300.css';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/500.css';
import '@fontsource/poppins/600.css';
import '@fontsource/poppins/700.css';
import '@fontsource/poppins/800.css';
import '@fontsource/poppins/900.css';

const theme = createTheme({
   palette: {
      primary: {
         main: '#465EFC',
      },
      secondary: {
         main: '#6C757D',
      },
      background: {
         paper: '#d9d9d9',
      },
      text: '#fff',
   },

   typography: {
      fontFamily: 'Inter Variable, sans-serif',
   },
});

export default theme;
