import BasicButton from "./Button"
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';



type HomeProps = {
    currentUser: any,
    logout: any,
}

export default function Home({ currentUser, logout }: HomeProps) {
    return (
        <div>
            <div className="heading-container">
                <h3>
                    Welcome
                </h3>
                <p>This is my demo using React, TypeScript, Material-UI, Firebase authentication and React Routing</p>
            </div>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                {currentUser() 
                ? <BasicButton title={"Logout"} handleAction={logout} /> 
                : <>
                <Link to="/login" style={{ textDecoration: 'none' }}><Button variant="contained">Log in</Button></Link>
                <Link to="/register" style={{ textDecoration: 'none' }}><Button variant="contained">Register</Button></Link>
                </>
                }

            </Box>

        </div>
    );
}