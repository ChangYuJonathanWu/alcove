import * as React from 'react';
import Box from '@mui/material/Box';
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

export default function MenuFAB() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Backdrop open={open} />

      <Box sx={{ height: 330, transform: 'translateZ(0px)', flexGrow: 1 }}>

        <SpeedDial
          ariaLabel="SpeedDial tooltip example"
          sx={{ position: 'absolute', bottom: 16, right: 16 }}
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
        >
          {actions.map((action) => (
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
