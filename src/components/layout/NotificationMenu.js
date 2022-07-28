import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import { useState } from 'react';
import Badge from '@mui/material/Badge';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import NotificationsList from './NotificationList';
import useFetch from '../../hooks/useFetch'
import Loading from '../../components/reusable-components/Loading'


export default function NotificationMenu() {

    
    const {apiData, loading} = useFetch('/notification')
    

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
                <Badge color="primary" badgeContent={apiData?.data?.length} showZero>
                    <NotificationsNoneOutlinedIcon style={{
                        backgroundColor: '#d2d2d2',
                        borderRadius: '25px',
                        width: '35px',
                        height: '35px'
                
                    }}/>
                </Badge>
            
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
                {loading && <Loading />}
                {apiData && <NotificationsList data={apiData.data} />}
                {(!apiData && !loading) && <NotificationsList data={[]} />}
            </Menu>
        </div>
  );
}
