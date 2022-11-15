import BasicButton from "./Button"
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


type HomeProps = {
    loggedIn: boolean,
    logout: () => void,
}

export default function Home({ loggedIn, logout }: HomeProps) {
    
    return (
        <div>
            <div className="heading-container" >
                <h3>
                    Welcome
                </h3>
                <p style={{marginTop: 50, marginBottom: 50}}>This is my demo using React, TypeScript, Material-UI, Firebase authentication, React Routing and Redux Toolkit.</p>
            </div>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                {loggedIn 
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