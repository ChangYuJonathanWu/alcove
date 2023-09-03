import React from 'react'

import {
    validPassword,
    validatePasswordContainsNumber,
    validatePasswordLength,
    validatePasswordLowerCase,
    validatePasswordUpperCase
} from '@/utils/authConfigs';
import { Typography } from '@mui/material';

export default function PasswordRequirements({password, passwordConfirm}) {
    return (
        <div>
            {!validatePasswordLength(password) && <Typography variant="body2" style={{ margin: 0 }}> • Minimum 8 characters</Typography>}
            {!validatePasswordContainsNumber(password) && <Typography variant="body2" style={{ margin: 0 }}> • Atleast 1 number</Typography>}
            {!validatePasswordUpperCase(password) && <Typography variant="body2" style={{ margin: 0 }}> • Atleast 1 uppercase letter</Typography>}
            {!validatePasswordLowerCase(password) && <Typography variant="body2" style={{ margin: 0 }}> • Atleast 1 lowercase letter</Typography>}
            {(password !== passwordConfirm || password.length === 0) && <Typography variant="body2" style={{ margin: 0 }}> • Passwords must match</Typography>}
        </div>
    )
}
