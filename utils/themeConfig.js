export const DEFAULT_PAPER_COLOR = 'rgba(255, 255, 255, .90)'
// export const HOME_THEME = {
//     bgColor: '#7C9070',
//     logoColor: "white",
//     textColor: "white",
//     buttonColor: '#F97B22',
//     buttonTextColor: 'white'
// }
export const HOME_THEME = {
    bgColor: 'white',
    logoColor: "black",
    textColor: "black",
    buttonColor: '#F97B22',
    buttonFocusColor: '#d67b3a',
    buttonTextColor: 'white',
    primary: "#F97B22",
}
export const PROFILE_ITEMS_WIDTH = '400px'
export const ITEM_FONT_SIZE = '1rem'
export const CENTER_PROFILE_ITEMS = true

const BORDER_RADIUS = '0.5rem'

export const TextFieldDefaultInputProps =
{
    borderRadius: BORDER_RADIUS,
    borderWidth: '1px',
    height: '3rem',
    "& .MuiInputBase-input.Mui-disabled": {
        WebkitTextFillColor: "#000000",
    }
}

export const TextFieldDefaultStyling = {
    borderRadius: BORDER_RADIUS,
    '& .MuiOutlinedInput-root': {
        '&:hover fieldset': {
            borderColor: HOME_THEME.primary,
            borderWidth: '2px',
        },
        '&.Mui-focused fieldset': {
            borderColor: HOME_THEME.primary,
            borderWidth: '2px',
        },
        '&.Mui-disabled fieldset': {
            borderColor: HOME_THEME.primary + "50",
            backgroundColor: HOME_THEME.primary + "20",
        },
    }
}
