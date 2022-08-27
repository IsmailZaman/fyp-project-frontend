import { Modal , Box} from "@mui/material";
import { useEffect ,useState} from "react";
import Loading from "../../reusable-components/Loading";
import useAxiosprivate from "../../../hooks/useAxiosPrivate";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const PrereqModal = ({open,handleClose, params}) => {
    const [apiData, setApiData] = useState([]);
    const [loading, setLoading] = useState(false)
    const axiosPrivate = useAxiosprivate()
    useEffect(()=>{

        const getPrereqData = async()=>{
            setApiData([])
            setLoading(true)
            const data = await axiosPrivate.post('/students/prereqdata', params.prereq)
            if(data){
                setApiData(data)
                setLoading(false)
            }
            setLoading(false)
        }
        if(params?.prereq){
            getPrereqData()
        }
    },[open])



    let found = false
    if(apiData){

        apiData.data?.forEach((course)=>{
            found = false
            for(let i = 0; i<params?.userPrereqHistory?.length; i++){
                if(params?.userPrereqHistory[i].course === course.id){
                    course['grade'] = params?.userPrereqHistory[i].grade
                    found = true
                }
            }
            if(!found) course['grade'] = "Not taken yet"
        })
    }

    return ( <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
            
            <Box sx={style}>
                <h4 style={{marginBottom: '20px'}}>Pre requisite Information</h4>
            {loading && <Loading />}
            {apiData?.data?.length > 0 && (
                    <TableContainer component={Paper}>
                    <Table sx={{ minWidth: '400' }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                        <TableCell>Course Name</TableCell>
                        <TableCell align="right">Grade</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {apiData?.data?.length > 0 && apiData?.data?.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                            {row?.name}
                            </TableCell>
                            <TableCell align="right">{row?.grade}</TableCell>
                        </TableRow>
                        ))}
                    </TableBody>
                    </Table>
                </TableContainer>
            )}
            {apiData?.data?.length === 0 && <h5>This course has no pre requisites</h5>}
        </Box>
        </Modal>
      </div> );
}
 
export default PrereqModal;
