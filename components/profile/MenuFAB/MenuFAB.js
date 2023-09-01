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
import Skeleton from '@mui/material/Skeleton';


export default function MenuFAB({ handle, profilePhotoUri, clickHandlers }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const toggleOpen = () => setOpen(!open);

  const [profilePhotoLoaded, setProfilePhotoLoaded] = React.useState(false)

  const {
    onLogout, onThemeChange
  } = clickHandlers

  const onViewAsPublic = () => {
    window.open(`${handle}/public/`, '_blank')
  }


  const actions = [
    { icon: <LogoutIcon />, name: 'Logout', onClick: onLogout },
    // { icon: <TryIcon />, name: 'Feedback' },
    { icon: <PaletteIcon />, name: 'Theme', onClick: onThemeChange },
    { icon: <PublicIcon />, name: 'View as Public', onClick: onViewAsPublic },
  ];

  const onSpeedDialClick = (callback) => {
    return (
      () => {
        setOpen(false)
        callback()
      }
    )

  }

  const FabStyling = {
    bgcolor: "primary",
    padding: 0,
    width: '3.5rem',
    height: '3.5rem',
    maxWidth: 'none',
    color: 'none'
  }

  const SpeedDialIcon =  () => {
    // Show skeleton while photo loading
    
    const photoReady = profilePhotoLoaded || !profilePhotoUri
    return (
      <>
        {!photoReady && <Skeleton variant="circular" width='3.2rem' height='3.2rem' style={{backgroundColor: 'white'}} />}
        <Avatar imgProps={{ onLoad: () => setProfilePhotoLoaded(true) }} style={{ display: photoReady ? 'block' : 'none', width: '3.2rem', height: '3.2rem', touchAction: 'none'  }} src={profilePhotoUri} data-cy="menu-fab--profile-photo"/>
      </>
    )
  }

  return (
    <div style={{ position: 'fixed', bottom: 0, right: 0, left: 'auto', top: 'auto', zIndex: 100 }}>
      <Backdrop open={open} onClick={handleClose} onTouchStart={handleClose} data-cy="menu-fab--backdrop"/>
      <Box sx={{ height: 330, transform: 'translateZ(0px)', flexGrow: 1 }}>
        <SpeedDial
          data-cy="menu-fab--speeddial"
          ariaLabel="Open menu button"
          sx={{ position: 'absolute', bottom: 16, right: 16 }}
          icon={SpeedDialIcon()}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
          FabProps={
            { 
              sx: FabStyling,
              color: 'primary'
            }
          }
        >
          {actions.map((action, idx) => (
            <SpeedDialAction
              data-cy={`menu-fab--option`}
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipOpen
              onClick={onSpeedDialClick(action.onClick)}
            />
          ))}
        </SpeedDial>
      </Box>
    </div>
  );
}
