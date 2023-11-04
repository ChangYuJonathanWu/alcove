import { TextFieldDefaultInputProps, TextFieldDefaultStyling, HOME_THEME } from '@/utils/themeConfig';
import { TextField, Button, Stack } from '@mui/material'

export const AlcoveTextField = (props) => (
    <TextField variant="outlined"
        InputProps={{
            sx: TextFieldDefaultInputProps
        }}
        sx={TextFieldDefaultStyling}
        {...props} />
);

export const AlcoveSubmitButton = (props) => (
    <Button {...props} variant="contained" type="submit" style={{ textTransform: 'none', backgroundColor: props.disabled ? 'lightgrey' : HOME_THEME.primary, width: "100%", height: '3rem', borderRadius: '0.5rem', marginTop: '1em' }} />
)

export const AlcoveStack = (props) => (
    <Stack {...props} alignItems="center" justifyContent="start" spacing={7} style={{ padding: '1rem 3rem 1rem 3rem', maxWidth: '330px', margin: 'auto', height: '100vh', ...props.style }} />
)