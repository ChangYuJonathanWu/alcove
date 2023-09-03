import { TextFieldDefaultInputProps, TextFieldDefaultStyling, HOME_THEME } from '@/utils/themeConfig';
import { TextField, Button } from '@mui/material'

export const AlcoveTextField = (props) => (
    <TextField variant="outlined"
        InputProps={{
            sx: TextFieldDefaultInputProps
        }}
        sx={TextFieldDefaultStyling}
        {...props} />
);

export const AlcoveSubmitButton = (props) => (
    <Button {...props} variant="contained" type="submit" style={{ textTransform: 'none', backgroundColor: HOME_THEME.primary, width: "100%", borderRadius: '0.5rem', marginTop: '1em' }}/>
)