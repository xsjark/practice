import BasicButton from "./Button"
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useEffect } from "react";
import { TextField } from "@mui/material";

type CreateProps = {
    currentUser: any,
    navigate: any,
    setNewName: any,
    setNewJob: any,
    createDocument: any
}

export default function Create({currentUser, navigate, setNewName, setNewJob, createDocument}: CreateProps) {

    useEffect(() => {
        if(!currentUser()) {
            navigate()
        }
    })

    return (
        <div>
            <div className="heading-container">
                <h3>
                    Create
                </h3>
                <p>Create a DB entry in Firestore</p>
            </div>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField id="email" label="Enter Name" variant="outlined" onChange={(e) => setNewName(e.target.value)}/>
                <TextField id="password" label="Enter Job" variant="outlined" onChange={(e) => setNewJob(e.target.value)}/>

            </Box>
            <Link to="/" style={{ textDecoration: 'none', marginRight: 5 }}><Button variant="contained">Home</Button></Link>
            <BasicButton title="Create" handleAction={createDocument} />

        </div>
    );
}