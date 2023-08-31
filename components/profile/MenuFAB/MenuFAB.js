import * as React from 'react';
import Box from '@mui/material/Box';
import { Avatar, Fab, Stack, Typography } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import LogoutIcon from '@mui/icons-material/Logout';
import PaletteIcon from '@mui/icons-material/Palette';
import PublicIcon from '@mui/icons-material/Public';
import TryIcon from '@mui/icons-material/Try';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';


const actions = [
  { icon: <LogoutIcon />, name: 'Logout' },
  { icon: <TryIcon />, name: 'Feedback' },
  { icon: <PaletteIcon />, name: 'Theme' },
  { icon: <PublicIcon />, name: 'View as Public' },
];

export default function MenuFAB({ handle, profilePhotoUri }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const FabStyling = {
    bgcolor: "orange",
    // position: 'absolute',
    // bottom: 0,
    // right: 0,
    
    padding: 0,
    width: '3.5rem',
    height: '3.5rem',
    maxWidth: 'none'

  }
  const SpeedDialFabIcon = (
    <>
      {/* <Typography variant="subtitle2" style={{textTransform: 'none'}}>
        {handle}
      </Typography> */}

      <Avatar style={{}} src={profilePhotoUri} />
    </>

  )
  return (
    <>
      <Backdrop open={open} />

      <Box sx={{ height: 330, transform: 'translateZ(0px)', flexGrow: 1 }}>

        <SpeedDial
          ariaLabel="SpeedDial tooltip example"
          sx={{ position: 'absolute', bottom: 16, right: 16 }}
          icon={<Avatar style={{width: '3.2rem', height: '3.2rem'}} src={profilePhotoUri} />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          FabProps={
            { sx: FabStyling,
            }
          }
        >
          {actions.map((action, idx) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipOpen
              onClick={handleClose}
            />
          ))}
        </SpeedDial>
      </Box>
    </>
  );
}
