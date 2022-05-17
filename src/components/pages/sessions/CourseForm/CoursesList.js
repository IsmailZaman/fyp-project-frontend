import { DataGrid } from '@mui/x-data-grid';
import { useState} from 'react';
import useFetch from '../../../../hooks/useFetch';
import Loading from '../../../reusable-components/Loading'
import Box from '@mui/material/Box';



const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'Name',
    headerName: 'Name',
    flex: 0.5,
    minWidth: 150,
  },
  {
      field: 'Department',
      headerName: 'Department',
      flex: 0.5,
      minWidth: 150,
  }
];

export default function CoursesList (){
  

  const {apiData, loading, error} = useFetch('/courses')
  let rows = []
  
  if(apiData){
      
    rows = apiData.data.map((row)=>({
      id: row?._id,
      Name: row?.name,
      Department: row?.department?.name
    }))
  }
  const [selectionModel, setSelectionModel] = useState([]);

  return (

    <div>
        {!loading &&
        <Box sx={{ height:700}}>
          <DataGrid
        checkboxSelection
        onSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel);
        }}
        selectionModel={selectionModel}
        columns={columns} rows={rows}
      />
        </Box>}
        {loading && <Loading/>}
        {error && <h1>Failed to Fetch Data</h1>}
      </div>
  );

}



