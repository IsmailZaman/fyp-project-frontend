import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import { useState } from 'react';
import Badge from '@mui/material/Badge';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import NotificationsList from './NotificationList';
import useFetch from '../../hooks/useFetch'
import Loading from '../../components/reusable-components/Loading'
import useAxiosprivate from '../../hooks/useAxiosPrivate';



export default function NotificationMenu() {

    const axiosPrivate = useAxiosprivate()

    
    const {apiData, loading } = useFetch('/notification')
    const {apiData: unreadNotifications, setData} = useFetch('/notification/unread/number')
    const [listOfItemsMarked, setList] = useState([])

   
   


    

    const markAsRead = (id) =>{
        
        let temp = [...listOfItemsMarked, id]
        setList([...new Set(temp)])
        setData({...unreadNotifications, data: unreadNotifications.data - 1 });
        
    }

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = async() => {
        setAnchorEl(null);
        
        if(listOfItemsMarked.length > 0){
            let x = await axiosPrivate.patch('/notification', listOfItemsMarked)
        }
        setList([])
        
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
                <Badge color="primary" badgeContent={unreadNotifications?.data} showZero>
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
                {apiData && <NotificationsList data={apiData.data} markAsRead={markAsRead}/>}
                {(!apiData && !loading) && <NotificationsList markAsRead={markAsRead} data={[]}/>}
            </Menu>
        </div>
  );
}
