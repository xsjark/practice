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
                ? <>
                <Link to="/create" style={{ textDecoration: 'none' }}><Button variant="contained">Create DB entry</Button></Link>                
                <Link to="/read" style={{ textDecoration: 'none' }}><Button variant="contained">Read DB entries</Button></Link>                
                <Link to="/update" style={{ textDecoration: 'none' }}><Button variant="contained">Update DB entry</Button></Link>                
                <Link to="/delete" style={{ textDecoration: 'none' }}><Button variant="contained">Delete DB entry</Button></Link>                
                <BasicButton title={"Logout"} handleAction={logout} /> 
                </>
                : <>
                <Link to="/login" style={{ textDecoration: 'none' }}><Button variant="contained">Log in</Button></Link>
                <Link to="/register" style={{ textDecoration: 'none' }}><Button variant="contained">Register</Button></Link>
                </>
                }

            </Box>

        </div>
    );
}