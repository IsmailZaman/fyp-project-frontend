import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'



export default function NotificationsList({data, markAsRead}) {

  const bgColors = {
    seen: 'lightblue',
    notSeen: 'white'
  }

 

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>

        {data.length === 0 && (<ListItem alignItems="flex-start">
        <ListItemText
          primary="No Notifications to show"
        />
      </ListItem>)}


      {data.length > 0 && data.map((data)=>(
        <Box key={data._id}
        onClick={()=>{
          if(!data.seen){
          markAsRead(data._id)
          data.seen = true
          }
        }}
        sx={{
          marginLeft: '10px',
          marginRight: '10px',
          borderRadius: '12px',
          backgroundColor: data.seen ? bgColors['notSeen'] : bgColors['seen'],
          '&:hover':{
            opacity: '0.7',
            cursor: 'pointer'
          }
        }}
        >
            <Divider variant="inset" component="li"/>
            <ListItem alignItems="flex-start">
                <ListItemText
                secondary={
                    <>
                    <Typography
                        sx={{ display: 'inline' }}
                        component="span"
                        variant="body2"
                        color="text.primary"
                    >
                        {data.title}
                    </Typography>
                    {` - ${data.text}`}
                    </>
                }
                />
            </ListItem>
        </Box>




      ))}
    
    </List>
  );
}
