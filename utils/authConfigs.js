import * as Yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(Yup);

export const SignupSchema = Yup.object().shape({
    password: Yup.string()
        .min(6, 'Password must be atleast 6 characters')
        .max(60, 'Password must be less than 60 characters')
        .minLowercase(1, 'Password must contain at least 1 lower case letter')
        .minUppercase(1, 'Password must contain at least 1 upper case letter')
        .minNumbers(1, 'Password must contain at least 1 number')
        .required('Required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], "Passwords must match")
        .required('Required')
});

export const validatePasswordLength = (password) => {
    return password.length >= 8
}

export const validatePasswordUpperCase = (password) => {
    return /[A-Z]/.test(password)
}
export const validatePasswordLowerCase = (password) => {
    return /[a-z]/.test(password)
}

export const validatePasswordContainsNumber = (password) => {
    return /\d/.test(password)
}

export const validPassword = (password) => {
    return validatePasswordLength(password) && validatePasswordUpperCase(password) && validatePasswordLowerCase(password) && validatePasswordContainsNumber(password)
}
