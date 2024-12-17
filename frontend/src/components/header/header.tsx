import { AppBar, Box, Container, IconButton, Toolbar, Typography } from "@mui/material";
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { FC, ReactElement } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  title: string,
  icons?: ReactElement[]
}

const Header: FC<HeaderProps> = ({ title, icons }) => {
  const isAuth = useSelector((state: RootState) => state.user.isAuth); 
  const navigate = useNavigate();
  
  const handleAuthClick = () => {
    navigate("/login");
  }

  const handlelogout = async() => {
    localStorage.removeItem("token")
    navigate("/login");
  }

  return ( 
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#FFFFFF",
        top: "0",
      }}>
      <Container>
      <Toolbar
        disableGutters
        sx={{
          justifyContent: 'space-between'
        }}>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              color: "#000000"
            }}>
            {title}
          </Typography>
          <Box>
            {icons?.map((icon, index) => {
              return <IconButton key={index} >{icon}</IconButton>
            })}
            { isAuth ?
              <>
                <IconButton>
                  <SupervisorAccountOutlinedIcon/>
                </IconButton>
                <IconButton onClick={handlelogout}>
                  <ExitToAppOutlinedIcon/>
                </IconButton>
              </>
              :
              <IconButton onClick={handleAuthClick}>
                <HowToRegOutlinedIcon/>
              </IconButton>
            }
          </Box>
        </Toolbar>
      </Container>
      
    </AppBar>
  )
}

export default Header;