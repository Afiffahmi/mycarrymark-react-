import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface Lecturer {
    email: string;
  }
  interface Item {
    id: string;
    courseCode: string;
    courseName: string;
    group: string;
    nStudent: number;
    lecturers: Lecturer[];
  }

export default function Dashboard({token}:any) {
    const [data, setData] = useState<Item[]>([]);
    const [index, setIndex] = React.useState(0);
    const user = JSON.parse(token);
    useEffect(() => {
        axios({
          method: "get",
          url: "https://mycarrymark-node-afiffahmis-projects.vercel.app/class/list",
          headers: {
            
          },
        }).then((response) => {
          setData(response.data);
        });
    
        
      }, []);
      
  return (
    <Card
      size="lg"
      variant="plain"
      orientation="horizontal"
      sx={{
        textAlign: 'center',
        maxWidth: '100%',
        width: 500,
        // to make the demo resizable
        resize: 'horizontal',
        overflow: 'auto',
      }}
    >
      <CardOverflow
        variant="solid"
        color="primary"
        sx={{
          flex: '0 0 200px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          px: 'var(--Card-padding)',
        }}
      >
        <Typography fontSize="xl4" fontWeight="xl" textColor="#fff">
        {
            data.reduce((count, item) => 
            item.lecturers[0].email === user.email ? count + 1 : count
            , 0)
        }
        </Typography>
        <Typography textColor="primary.200">
          Total Class
        </Typography>
      </CardOverflow>
    </Card>
  );
}
