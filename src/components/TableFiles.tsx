import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import AvatarGroup from '@mui/joy/AvatarGroup';
import Typography from '@mui/joy/Typography';
import Table from '@mui/joy/Table';

// Icons import
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';

// custom

function TableFiles() {
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
              <Typography level="title-sm">Folder</Typography>
            </th>
            <th>
              <Typography
                level="title-sm"
                endDecorator={<ArrowDropDownRoundedIcon />}
              >
                Last modified
              </Typography>
            </th>
            <th>
              <Typography level="title-sm">Size</Typography>
            </th>
            <th>
              <Typography level="title-sm">Action</Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Typography
                level="title-sm"
                startDecorator={<FolderRoundedIcon color="primary" />}
                sx={{ alignItems: 'flex-start' }}
              >
                Travel pictures
              </Typography>
            </td>
            <td>
              <Typography level="body-sm">21 Oct 2023, 3PM</Typography>
            </td>
            <td>
              <Typography level="body-sm">987.5MB</Typography>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default TableFiles;
