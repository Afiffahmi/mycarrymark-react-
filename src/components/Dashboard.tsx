import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Sheet,CardCover } from '@mui/joy';

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
      
  return (<Sheet>
                <Card sx={{ minHeight: '180px' }}>
            <CardCover>
                <img
                src="https://i.pinimg.com/originals/34/1e/80/341e800b1f29d3e34ea2eba5a6af205c.gif"
                loading="lazy"
                alt=""
                />
            </CardCover>
            <CardCover
                sx={{
                background:
                    'linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 20px), linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 300px)',
                }}
            />
            <CardContent sx={{ justifyContent: 'flex-end' }}>
                <Typography fontWeight={500} fontSize={50} textColor="#fff">
                Hey, Scholars! 
                </Typography>
                <Typography
                textColor="neutral.300"
                fontWeight={300} 
                fontSize={30}
                >
                Welcome aboard MyCarrymark, your pathway to academic excellence.
                </Typography>
            </CardContent>
            </Card>
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
    </Sheet>
  );
}
