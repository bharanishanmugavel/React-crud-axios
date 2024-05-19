import{ThemeProvider,createTheme} from '@mui/material/styles'
import {red,green} from '@mui/material/colors'
import {CssBaseline} from '@mui/material'
import UserList from './UserList'

const theme=createTheme({
  palette:{
    primary:{
      main:green[900]
    },
    secondary:{
      main:red[900]
    }
  }
})

function App() {
  return (
    <>
     <ThemeProvider theme={theme}>
       <CssBaseline/>
       <UserList/>
     </ThemeProvider>
    </>
  )
}

export default App
