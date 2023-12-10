import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';
import { Card, Divider, Stack } from '@mui/joy';
import { useEffect } from 'react';
import axios from 'axios';
import IconButton from '@mui/joy/IconButton';
import Sheet from '@mui/joy/Sheet';
import CelebrationOutlinedIcon from '@mui/icons-material/CelebrationOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';

interface Forums {
    avatar: string;
    name: string
    title: string;
    sender: string
    messages: [{content : string, sender : string,timestamp : number}]
  }
  

export default function Forum({token,selectedId}:any) {
    const [forum, setForum] = React.useState<Forums[]>([]);

    useEffect(() => {
        axios({
          method: "get",
          url: `https://mycarrymark-node-afiffahmis-projects.vercel.app/class/${selectedId}/forum`,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
            setForum(response.data);
            console.log(response.data);
        });
    
        
      }, [token,selectedId]);

  return (
      <Stack spacing={2} direction='row'>
      <Card>
      <Typography
        id="ellipsis-list-demo"
        level="body-xs"
        textTransform="uppercase"
        sx={{ letterSpacing: '0.15rem' }}
      >
        Forum
      </Typography>
      <List
        aria-labelledby="ellipsis-list-demo"
        sx={{ '--ListItemDecorator-size': '56px' }}
      >
        {forum.map((item:any) => (
            <React.Fragment key={item.id}>
                <ListItem>

                <ListItemContent onClick={() => console.log('clicked')}
                    sx={{
                    py: 1,
                    px: 2,
                    }}
                >
                    <Typography level="body-xs" fontWeight="bold">
                    {item.title}
                    </Typography>
                    <Typography level="body-xs" >
                    {item.sender}
                    </Typography>
                </ListItemContent>
                </ListItem>
                <Divider />
            </React.Fragment>
        ))}
        
      </List>
      </Card>
      <Card sx={{width:1100}}>
        
        {forum.map((item:any) => (
  <Box sx={{ maxWidth: '100%', minWidth: 'auto' }}>
    <Stack
      direction="column"
      justifyContent="space-between"
      spacing={2}
      sx={{ mb: 0.25 }}
    >
        <Typography
            id="ellipsis-list-demo"
            level="body-md"
            
            textTransform="uppercase"
            sx={{ letterSpacing: '0.15rem' }}>
            {item.title}
        <Typography> | </Typography>

            <Typography level="body-md" textTransform='lowercase'>
        {item.sender === 'afiffahmi@gmail.com' ? item.sender : null}
      </Typography>
        </Typography>
      
      {item.messages.map((message: any) => (
        <Typography level="body-xs" key={message.id}>
          {message.content}
        </Typography>
      ))}
    </Stack>
  </Box>
))}
        
      </Card>
      </Stack>
  );
}