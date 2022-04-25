import Alert from '@mui/material/Alert';




export default function ErrorMsg(props) {
  const {msg} = props



  return (
    
      <Alert severity="error" sx={{marginTop: '20px', mb: 2}}>
        {/* <AlertTitle>Error</AlertTitle> */}
        {msg}
      </Alert>
  
  );
}