import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import CssBaseline from '@mui/joy/CssBaseline';
import AspectRatio from '@mui/joy/AspectRatio';
import Avatar from '@mui/joy/Avatar';
import AvatarGroup from '@mui/joy/AvatarGroup';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardOverflow from '@mui/joy/CardOverflow';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Divider from '@mui/joy/Divider';
import Sheet from '@mui/joy/Sheet';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListDivider from '@mui/joy/ListDivider';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Stack from '@mui/joy/Stack';
import Chip from '@mui/joy/Chip';
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';

// Icons import
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

// custom
import Layout from './Layout';
import TableFiles from './TableFiles';

export default function FilesExample({token}:any) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      {drawerOpen && (
        <Layout.SideDrawer onClose={() => setDrawerOpen(false)}>
        </Layout.SideDrawer>
      )}
      <Stack
        id="tab-bar"
        direction="row"
        justifyContent="space-around"
        spacing={1}
        sx={{
          display: { xs: 'flex', sm: 'none' },
          zIndex: '999',
          bottom: 0,
          position: 'fixed',
          width: '100dvw',
          py: 2,
          backgroundColor: 'background.body',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
      </Stack>
 
            
   
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 2,
            }}
          >
            {' '}
            <Sheet
              variant="outlined"
              sx={{
                borderRadius: 'sm',
                gridColumn: '1/-1',
                display: { xs: 'none', md: 'flex' },
              }}
            >
              <TableFiles />
            </Sheet>
            <Sheet
              variant="outlined"
              sx={{
                display: { xs: 'inherit', sm: 'none' },
                borderRadius: 'sm',
                overflow: 'auto',
                backgroundColor: 'background.surface',
                '& > *': {
                  '&:nth-child(n):not(:nth-last-child(-n+4))': {
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                  },
                },
              }}
            >
            </Sheet>
            <Card variant="outlined" size="sm">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flex: 1 }}>
                  <Typography level="title-md">lotr-two-towers.pdf</Typography>
                  <Typography level="body-sm">132.2MB</Typography>
                </Box>
                <Dropdown>
                  <MenuButton
                    variant="plain"
                    size="sm"
                    sx={{
                      maxWidth: '32px',
                      maxHeight: '32px',
                      borderRadius: '9999999px',
                    }}
                  >
                    <IconButton
                      component="span"
                      variant="plain"
                      color="neutral"
                      size="sm"
                    >
                      <MoreVertRoundedIcon />
                    </IconButton>
                  </MenuButton>
                  <Menu
                    placement="bottom-end"
                    size="sm"
                    sx={{
                      zIndex: '99999',
                      p: 1,
                      gap: 1,
                      '--ListItem-radius': 'var(--joy-radius-sm)',
                    }}
                  >
                    <MenuItem>
                      <EditRoundedIcon />
                      Rename file
                    </MenuItem>
                    <MenuItem>
                      <ShareRoundedIcon />
                      Share file
                    </MenuItem>
                    <MenuItem sx={{ textColor: 'danger.500' }}>
                      <DeleteRoundedIcon  />
                      Delete file
                    </MenuItem>
                  </Menu>
                </Dropdown>
              </Box>
              <CardOverflow
                sx={{
                  borderBottom: '1px solid',
                  borderTop: '1px solid',
                  borderColor: 'neutral.outlinedBorder',
                }}
              >
                <AspectRatio ratio="16/9" color="primary" sx={{ borderRadius: 0 }}>
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?auto=format&fit=crop&q=80&w=3024&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  />
                </AspectRatio>
              </CardOverflow>
              <Typography level="body-xs">Added 27 Jun 2023</Typography>
            </Card>
          </Box>
     
    </CssVarsProvider>
  );
}