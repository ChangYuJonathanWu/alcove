import React from 'react'

import {
    validatePasswordLength,
} from '@/utils/authConfigs';
import { Typography } from '@mui/material';

export default function PasswordRequirements({ password }) {
    return (
        <div>
            {!validatePasswordLength(password) && <Typography variant="subtitle2" style={{ margin: 0, fontSize: '0.8rem' }}> Minimum 8 characters</Typography>}
        </div>
    )
}
