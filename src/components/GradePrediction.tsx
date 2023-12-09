import { Sheet,Box,Stack, Typography,Card,Chip,AspectRatio,Link ,Button,CardActions, Divider} from "@mui/joy";
import Prediction from "./Prediction";
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Snackbar } from "@mui/material";
import React, { useEffect,useState } from "react";
import axios from "axios";
import { LazyMotion, m } from "framer-motion"
import { domAnimation } from "framer-motion"
import Skeleton from "@mui/joy/Skeleton";

interface Lecturer {
  email: string;

}
interface Item {
  id: string;
  courseCode: string;
  courseName: string;
  groupClass: string;
  nStudent: number;
  lecturers: Lecturer[];
}


function GradePrediction({token}:any) {
const [grade, setGrade] = React.useState('');
const [data, setData] = useState<Item[]>([]);
const [loading, setLoading] = React.useState(true);

useEffect(() => {
  axios({
    method: 'get',
    url: 'https://mycarrymark-node-afiffahmis-projects.vercel.app/class/list',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    
  }).then(response => {
    setData(response.data)
    setLoading(false);
  
  })

}, [token]);



const user = JSON.parse(token);

    return (
        <Sheet >
           
            <Stack direction='row' alignItems='center' justifyContent='flex-start' spacing={5}  >
            
            <LazyMotion features={domAnimation}>
            <Card  sx={{display: 'flex',my: 1,flexDirection:{xs:'column', sm:'row'},alignItems: {xs:'start',sm:'center' } , width: '65%' }} variant="plain">
                <Stack spacing={2} direction="column" sx={{width: '100%'}}>
                <Card sx={{ minHeight: '180px' }}>
            <CardCover>
                <img
                src="https://media.tenor.com/9vRAkntogEMAAAAC/background.gif"
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
                Grade Prediction
                </Typography>
                <Typography
                startDecorator={<CheckCircleRounded />}
                textColor="neutral.300"
                fontWeight={300} 
                fontSize={30}
                >
                Predict your future now.
                </Typography>
            </CardContent>
            </Card>
            <Typography>Select class to predict :</Typography>
            { loading ?  <Card sx={{ m: 'auto', display: 'flex', gap: 2, width: 320,}}>
        <Skeleton variant="circular" width={48} height={48} />
        <div>
          <Skeleton variant="rectangular" width={200} height="1em" sx={{ mb: 1 }} />
          <Skeleton variant="rectangular" width={140} height="1em" />
        </div>
      </Card> :
            <Swiper
            spaceBetween={100}
            slidesPerView={2}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            >
              {data.map((item,index) =>  (item.lecturers[0].email === user.email ? ( <SwiperSlide>
                
            <Card
      variant="outlined"
      orientation="horizontal"
      sx={{
        width: 320,
        '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' },
      }}
    >
      <AspectRatio ratio="1" sx={{ width: 90 }}>
        <img
          src="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90"
          srcSet="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90&dpr=2 2x"
          loading="lazy"
          alt=""
        />
      </AspectRatio>
      <CardContent>
        <Typography level="title-lg" id="card-description">
          {item.courseCode}
        </Typography>
        <Typography level="title-md" id="card-description">
          {item.courseName}
        </Typography>
        <Typography level="body-sm" aria-describedby="card-description" mb={1}>
          <Link
            overlay
            underline="none"
            href="#interactive-card"
            sx={{ color: 'text.tertiary' }}
          >
            {item.groupClass}
          </Link>
        </Typography>
      </CardContent>
    </Card>
            </SwiperSlide>) : null))}
            
            
            </Swiper>}
            <Card
      variant="outlined"
      color="primary"
      invertedColors
      sx={{
        boxShadow: 'lg',
        width: 1050,
        height: 255,
        maxWidth: '100%',
        // to make the demo resizeable
        overflow: 'auto',
        resize: 'horizontal',
      }}
    >
      <div>
        <Typography level="h2">
          Results
        
        </Typography>
      </div>
      <CardContent>
        <Typography level="title-lg">Shown predicted result below</Typography>
        <Divider />
        <Typography fontSize={90}>
          {grade}
        </Typography>
      </CardContent>
    </Card>
    
                </Stack>
            </Card>
            </LazyMotion>
            <Prediction setGrade = {setGrade} />

            
            </Stack>
            
        </Sheet>
    );
}


export default GradePrediction;