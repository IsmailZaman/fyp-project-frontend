import React from 'react';
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';

import "./Note.css";



export default function BCard({tempv})
{ 
    return(
        <Card className='BC' elevation={3} sx={{ 
           
            maxHeight: 50,
            minHeight:50,
            backgroundColor: '#FAF9F6',
            border: 0,
            borderRadius: 2,
            borderColor: '#FFA500',
            ml:2,
            mt:3,
            
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