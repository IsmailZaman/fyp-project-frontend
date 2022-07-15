import { useState } from 'react';
import useFetch from '../../../hooks/useFetch';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Loading from '../../reusable-components/Loading';

export default function AdvisorBatches() {
  const [value, setValue] = useState('');
  const {apiData, loading, error} = useFetch('/advisor/sessiondata')


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%'}}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="secondary tabs example"
        centered
      >
        {apiData && apiData?.data?.batch.map((batch)=>(
            <Tab value={batch.name} label={batch.name} />
        ))}
        {loading && <Loading />}
        {error && 'error loading this session\'s data'}
        
      </Tabs>
    </Box>
  );
}
