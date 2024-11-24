import { IconButton } from "@mui/material";
import { FC } from "react";

interface ActionButtonProps 
{ 
    icon: React.ReactNode;
    onClick: () => void 
}

const ActionButton: FC<ActionButtonProps> = ({ icon, onClick }) => (
    <IconButton
      onClick={onClick}
      sx={{
        backgroundColor: 'white',
        color: 'black',
        border: '2px solid black',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        '&:hover': {
          backgroundColor: '#f5f5f5',
        },
      }}
    >
      {icon}
    </IconButton>
  );
  
export default ActionButton;