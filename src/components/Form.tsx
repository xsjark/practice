import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import BasicButton from './Button';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';


type BasicTextFieldsProps = {
    title: string,
    setEmail: any,
    setPassword: any,
    handleAction: any
}

export default function BasicTextFields({title, setEmail, setPassword, handleAction}: BasicTextFieldsProps) {
    return (
        <div>
            <div className="heading-container">
                <h3>
                    {title} Form
                </h3>
            </div>

            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch', marginTop: 2, marginBottom: 2 },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField id="email" label="Enter the Email" variant="outlined" onChange={(e) => setEmail(e.target.value)}/>
                <TextField id="password" label="Enter the Password" variant="outlined" onChange={(e) => setPassword(e.target.value)}/>
            </Box>
            <Link to="/" style={{ textDecoration: 'none', marginRight: 5 }}><Button variant="contained">Home</Button></Link>
            <BasicButton title={title} handleAction={handleAction}/>
        </div>
    );
}

