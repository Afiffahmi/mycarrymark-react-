import { Sheet,Box,Stack, Typography,Card,Chip,AspectRatio,Link ,Button,CardActions, Divider} from "@mui/joy";
import Prediction from "./Prediction";
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

function GradePrediction({token}:any) {

    return (
        <Sheet >
            
           
            <Stack direction='row' alignItems='center' spacing={5} sx={({mx: {xs: 1, md: 1, sm:2}, pb:{xs: 4, md: 1, sm:4} , px:{xs:2 , md: 2}})}>
            

            <Card  sx={{display: 'flex',my: 1,flexDirection:{xs:'column', sm:'row'},alignItems: {xs:'start',sm:'center' } , width: '73%' }} variant="plain">
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
            <Swiper
            spaceBetween={50}
            slidesPerView={3}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            >
            <SwiperSlide>
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
          CSC662
        </Typography>
        <Typography level="title-md" id="card-description">
          Computer Security
        </Typography>
        <Typography level="body-sm" aria-describedby="card-description" mb={1}>
          <Link
            overlay
            underline="none"
            href="#interactive-card"
            sx={{ color: 'text.tertiary' }}
          >
            A4CS2306A
          </Link>
        </Typography>
      </CardContent>
    </Card>
            </SwiperSlide>
            <SwiperSlide>
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
          src="https://cdn.pixabay.com/photo/2017/02/01/22/02/mountain-landscape-2031539_640.jpg"
          srcSet="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90&dpr=2 2x"
          loading="lazy"
          alt=""
        />
      </AspectRatio>
      <CardContent>
        <Typography level="title-lg" id="card-description">
          CSP600
        </Typography>
        <Typography level="title-md" id="card-description">
          Final Year Project
        </Typography>
        <Typography level="body-sm" aria-describedby="card-description" mb={1}>
          <Link
            overlay
            underline="none"
            href="#interactive-card"
            sx={{ color: 'text.tertiary' }}
          >
            A4CS2306A
          </Link>
        </Typography>
      </CardContent>
    </Card>
            </SwiperSlide>
            <SwiperSlide>
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
          src="https://static.vecteezy.com/system/resources/previews/015/573/452/original/sunset-landscape-with-bird-silhouettes-free-vector.jpg"
          loading="lazy"
          alt=""
        />
      </AspectRatio>
      <CardContent>
        <Typography level="title-lg" id="card-description">
          CST500
        </Typography>
        <Typography level="title-md" id="card-description">
          Internship
        </Typography>
        <Typography level="body-sm" aria-describedby="card-description" mb={1}>
          <Link
            overlay
            underline="none"
            href="#interactive-card"
            sx={{ color: 'text.tertiary' }}
          >
            A4CS2306A
          </Link>
        </Typography>
      </CardContent>
    </Card>
            </SwiperSlide>
            <SwiperSlide>
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
          CSC559
        </Typography>
        <Typography level="title-md" id="card-description">
          Principle of Compiler
        </Typography>
        <Typography level="body-sm" aria-describedby="card-description" mb={1}>
          <Link
            overlay
            underline="none"
            href="#interactive-card"
            sx={{ color: 'text.tertiary' }}
          >
            A4CS2306A
          </Link>
        </Typography>
      </CardContent>
    </Card>
            </SwiperSlide>
            </Swiper>
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
          A
        </Typography>
      </CardContent>
    </Card>
    
                </Stack>
            </Card>
            <Prediction />

            
            </Stack>
            
        </Sheet>
    );
}


export default GradePrediction;