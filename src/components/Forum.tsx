import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemContent from '@mui/joy/ListItemContent';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Typography from '@mui/joy/Typography';
import { Card, Divider, ListItemButton, Stack } from '@mui/joy';
import { useEffect } from 'react';
import axios from 'axios';
import AddForum from './AddForum';
import { store } from '../redux/store';
import { Button, Input } from '@mui/joy';
interface Forums {
    avatar: string;
    name: string
    title: string;
    sender: string
    messages: [{content : string, sender : string,timestamp : number}]
    id : string
  }
  

export default function Forum({token,selectedId}:any) {
    const [forum, setForum] = React.useState<Forums[]>([]);
    const[reload,setReload] = React.useState(false);
    const [selectedForum, setSelectedForum] = React.useState<Forums | null>(null);
    const [message, setMessage] = React.useState('');


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
            forum.map((item:any) => (
              item.id === selectedForum?.id ? setSelectedForum(item) : null
            ))
            setReload(false);
        });
    
        
      }, [token,selectedId,reload,selectedForum?.id,forum]);

      const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        axios.post(`https://mycarrymark-node-afiffahmis-projects.vercel.app/class/${selectedId}/forum/${selectedForum?.id}/messages`, {
    content: message,
    // Add other data here
  }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then((response) => {
    console.log(response.data);
    setMessage('');
    setReload(true); // Trigger a reload to fetch the updated data
  })
  .catch((error) => {
    console.error(error);
  });
      };

  return (
    <Box><AddForum token={token} selectedId={selectedId} setReload = {setReload}/>
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
                <ListItemButton onClick={() => setSelectedForum(item)}
                style={{ backgroundColor: item === selectedForum ? 'lightgray' : 'transparent' }}>
                <ListItemContent 
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
                </ListItemButton>
                </ListItem>
                <Divider />
            </React.Fragment>
        ))}
        
      </List>
      </Card>
      <Card sx={{width:1100}}>
        
       
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
            {selectedForum?.title}

            <Typography level="body-md" textTransform='lowercase'>
        {selectedForum?.sender === 'afiffahmi@gmail.com' ? selectedForum?.sender : null}
      </Typography>
        </Typography>
      
      {selectedForum?.messages.map((message: any) => (
        <Card variant='solid' color='primary' style={{ display: 'inline-block',margin: '10px 0' }} >
        <Typography level="body-xs" key={message.id} style={{ color: 'white' }}>
          {message.content}
        </Typography>
        </Card>
      ))}
      <form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message here"

      />
      <Button type="submit">Send</Button>
    </form>
    </Stack>
  </Box>

        
      </Card>
      </Stack>
      </Box>
  );
}