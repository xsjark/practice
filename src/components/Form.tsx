import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import BasicButton from './Button';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { useEffect } from 'react';


type BasicTextFieldsProps = {
    title: string,
    setEmail: any,
    setPassword: any,
    handleAction: () => void
}

export default function BasicTextFields({title, setEmail, setPassword, handleAction}: BasicTextFieldsProps) {

    useEffect(() => {
        setEmail("")
        setPassword("");
    }, [])
    
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
                <TextField id="email" label="Email" variant="outlined" onChange={(e) => setEmail(e.target.value)}/>
                <TextField id="password" label="Password" variant="outlined" type="password" onChange={(e) => setPassword(e.target.value)}/>
            </Box>
            <Link to="/" style={{ textDecoration: 'none', marginRight: 5 }}><Button variant="contained">Home</Button></Link>
            <BasicButton title={title} handleAction={handleAction}/>
        </div>
    );
}

