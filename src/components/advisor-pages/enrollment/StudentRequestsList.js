import { Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import useFetch from '../../../hooks/useFetch';
import Loading from '../../reusable-components/Loading';






const columns = [
  { field: 'id', headerName: 'ID', width: 90, flex:0.5 },
  {
    field: 'Name',
    headerName: 'Name',
    flex: 1,
  },
  {
    field: 'Email',
    headerName: 'Email',
    flex: 1,
  },

];





export default function StudentRequestsGrid() {


  const {apiData, loading, error, setRefresh} = useFetch('/advisor')

  let rows = []
  
  if(apiData){
    rows = apiData.data.map((row)=>({
      id: row?._id,
      Name: row?.name,
      Email: row?.email
    }))
  }
  

  return (
    
    <div>
      {!loading &&
      <Box sx={{ height:700}}>
        <DataGrid columns={columns} rows={rows} components={{ Toolbar: GridToolbar }} />
      </Box>}
      {loading && <Loading/>}
      {error && <h1>Failed to Fetch Data</h1>}
    </div>
    
  );
}
