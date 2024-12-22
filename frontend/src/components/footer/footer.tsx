import { FC } from "react"
import { AppBar, Toolbar, Container} from "@mui/material";
import NavbarItem from "../navbarItem/navbarItem";
import NavigationOutlinedIcon from '@mui/icons-material/NavigationOutlined';
import StyleOutlinedIcon from '@mui/icons-material/StyleOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import { useSelector } from "react-redux";
import { RootState } from "../../../state/store";

const Footer: FC = () => {
  const userId = useSelector((state: RootState) => state.user.user?.id) 
  const role = useSelector((state: RootState) => state.user.user?.role)
  return (
    <AppBar position="sticky" color="secondary" sx={{bottom: 0}}>
      <Container 
        maxWidth="sm"
        sx={{ 
          backgroundColor: "#FFFFFF",
          color: "#000000"
        }}>
        <Toolbar 
          sx={{ 
            justifyContent: 'space-between',
            padding: "0"
          }}>
          {role === "ADMIN" && (
            <NavbarItem
              to="/admin"
              text="Admin"
              icon={<NavigationOutlinedIcon />}
            />
          )}
          <NavbarItem to="/" text="Hit or miss" icon={<StyleOutlinedIcon />} ></NavbarItem>
          <NavbarItem to="/likes" text="Likes" icon={<FavoriteBorderOutlinedIcon />} ></NavbarItem>
          <NavbarItem to="/chats" text="Chats" icon={<ChatOutlinedIcon />} ></NavbarItem>
          <NavbarItem to={`/profiles/${userId}`} text="Profile" icon={<PermIdentityOutlinedIcon />} ></NavbarItem>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Footer;