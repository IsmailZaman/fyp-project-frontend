import { Container,Typography } from "@mui/material";
import Form from "../../reusable-components/Form";
import { useForm } from "react-hook-form";
import createSessionFields from "./createSessionFields";



const InactiveSession = () => {

    const { register, handleSubmit, formState: { errors }} = useForm();



    return ( 
    <>
        <Container sx={{borderRadius:"10px 10px 0 0",
        height: "100px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
        }}>
            
            <Typography sx={{color: "gray", marginBottom: "10px"}} variant="h5"> {`No active session in progress`}</Typography>
            
        </Container>
        
        <Form
            register={register} 
            handleSubmit={handleSubmit} 
            errors={errors} 
            url='/session' 
            fields={createSessionFields}
            title="Initiate Session"
            btnTitle="Initiate Session"
            btnStyle = {{marginBottom: '20px', width: "25%", borderRadius:"50px"}}
        />
    </>
    );
}
 
export default InactiveSession;