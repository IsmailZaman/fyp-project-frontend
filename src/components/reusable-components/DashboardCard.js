import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';



export default function DashboardCard(props) {
  
  const users=1000

  return (
    <Card sx={{p:1, m:5 ,minWidth: 250,maxWidth:300,minHeight:200, display:'flex', flexDirection: 'column', backgroundColor:"#F5F5F5", boxShadow:10 }}>
      <br/>
      
          <PersonIcon sx={{fontSize:60, marginLeft: 5}}/>
        
      <div style={{marginLeft: '45px'}}>
      <Typography gutterBottom variant="h5" component="div" align="left">
            Total Students:
          </Typography>

          <Typography gutterBottom variant="h4" component="div" align="left" >
            {users}
          </Typography>
          </div>
      <CardActions >
        <Button size="large"  sx={{ color: 'white', backgroundColor: '#3F51B5', borderColor: 'blue' }}>See all students</Button>
      </CardActions>
    </Card>
  );
}