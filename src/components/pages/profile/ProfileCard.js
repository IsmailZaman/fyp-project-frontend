import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import "./Note.css";
import BCard from './basiccard';
import { Grid } from '@mui/material';
import LCard from './leftcard';
import ProfileForm from './ProfileForm';
import { useForm } from 'react-hook-form';
import changePasswordFields from './changePasswordFields';


export default function ProfileCard(props)
{
    const {data, title} = props
    delete data.__v
    delete data._id
    const { register, handleSubmit, formState: { errors }} = useForm();

    return (
    <div
    style={{width:"100%"}}>

        <Card className='ProfileCard' elevation={3} sx={{
            backgroundColor: '#e4f2f7'
        }} >
            
            <CardHeader 
                
                title={title}
                sx={{
                    
                    color: '#FAF9F6',
                    ml: 2
                }}
            />
            <CardContent>

                    
                {Object.keys(data).map((key)=>(
                    <Grid
                    key={key}
                    container
                    spacing={2}
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                    marginLeft={2}
                    >
                    <BCard tempv={key}/><LCard tempv={data[key]}/>
                </Grid>
                ))}
                
            </CardContent>
            <CardActions>
                



                <div style={{width: "100%"}}>

                <ProfileForm
                    title="Change Password"
                    btnTitle="Change Password"
                    register={register} 
                    handleSubmit={handleSubmit} 
                    errors={errors} 
                    url='/users/changepassword' 
                    fields={changePasswordFields}
            
                />

                </div>

                <div style={{width: "100%"}}>

                <ProfileForm
                    title="Change Password"
                    btnTitle="Change Password"
                    register={register} 
                    handleSubmit={handleSubmit} 
                    errors={errors} 
                    url='/users/changepassword' 
                    fields={changePasswordFields}
            
                />

                </div>
                
            </CardActions>
        
    
        </Card>

    </div>
    )
}