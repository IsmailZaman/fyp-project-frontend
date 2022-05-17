import React from 'react';
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';

import "./Note.css";



export default function LCard({tempv})
{ 
    return(
        <Card className='LC' elevation={3} sx={{ 
           
            
            maxHeight: 50,
            minHeight:50,
            backgroundColor: '#FAF9F6',
            border: 0,
            borderRadius: 2,
            borderColor: 'primary.main',
            ml:2,
            mt:3,
            minWidth: "150px",
            textAlign: "center"
        }}
        >
            <CardContent>
            <Typography >
                {tempv}
            </Typography>
            </CardContent>
        </Card>
    )
}