import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import AvatarGroup from '@mui/joy/AvatarGroup';
import Typography from '@mui/joy/Typography';
import Table from '@mui/joy/Table';
import { Button, Link } from '@mui/joy';

// Icons import
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import { Skeleton,Box } from '@mui/joy';

// custom

function TableFiles({files,loading}:any) {
  
  return (
    <div>
      <Table
        hoverRow
        size="sm"
        borderAxis="none"
        variant="soft"
        sx={{
          '--TableCell-paddingX': '1rem',
          '--TableCell-paddingY': '1rem',
        }}
      >
        <thead>
          <tr>
            <th>
              <Typography level="title-sm">File</Typography>
            </th>
            <th>
              <Typography level="title-sm">Type</Typography>
            </th>
            <th>
              <Typography level="title-sm">Action</Typography>
            </th>
          </tr>
        </thead>
        {loading ? <Box sx={{ m: 'auto', display: 'flex', alignItems: 'center', gap: 2 }}>
        <Skeleton variant="circular" width={48} height={48} />
        <div>
          <Skeleton variant="rectangular" width={200} height="1em" sx={{ mb: 1 }} />
          <Skeleton variant="rectangular" width={140} height="1em" />
        </div>
      </Box>:
        <tbody>
          {files.map((file:any, index: number) => (
          <tr key={index}>
            <td>
              <Typography
                level="title-sm"
                startDecorator={<FolderRoundedIcon color="primary" />}
                sx={{ alignItems: 'flex-start' }}
              >
                {file.name}
              </Typography>
            </td>
            <td>
              <Typography level="body-sm">{file.type}</Typography>
            </td>
            <td>
           <Link href={file.downloadURL} target="_blank" rel="noopener noreferrer" download><Button>Download</Button></Link>
            </td>
          </tr>))}
        </tbody>}
      </Table>
    </div>
  );
}

export default TableFiles;
