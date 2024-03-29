import { Avatar } from '@mui/material';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import useLogout from '../../hooks/useLogout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';


export default function ProfileMenu() {

    const navigate = useNavigate()

    const logout = useLogout()
    const signOut = async()=>{
        setAnchorEl(null);
        await logout()
        
    }

    const profile = async() =>{
        setAnchorEl(null);
        navigate('/profile',{replace: true})
        
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
        <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            color="secondary"
        >
            <Avatar>
                <AccountCircleIcon />
            </Avatar>
        </Button>
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
            'aria-labelledby': 'basic-button',
            }}
        >
            <MenuItem onClick={profile}>Profile</MenuItem>
            <MenuItem onClick={signOut}>Logout</MenuItem>
        </Menu>
        </div>
  );
}