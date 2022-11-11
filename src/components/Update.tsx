import BasicButton from "./Button"
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useEffect } from "react";
import { TextField } from "@mui/material";

type UpdateProps = {
    currentUser: any,
    navigate: any,
    newId: any,
    setNewId: any,
    setNewName: any,
    setNewJob: any,
    updateDocument: any
}

export default function Update({ currentUser, navigate, newId, setNewId, setNewName, setNewJob, updateDocument}: UpdateProps) {
    useEffect(() => {
        if(!currentUser()) {
            navigate()
        }
    })

    return (
        <div>
            <div className="heading-container">
                <h3>
                    Update
                </h3>
                <p>Update a DB entry in Firestore by its ID</p>
            </div>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField id="email" label="Enter ID" variant="outlined" onChange={(e) => setNewId(e.target.value)}/>
                <TextField id="email" label="Enter Name" variant="outlined" onChange={(e) => setNewName(e.target.value)}/>
                <TextField id="email" label="Enter Job" variant="outlined" onChange={(e) => setNewJob(e.target.value)}/>

            </Box>
            <Link to="/" style={{ textDecoration: 'none', marginRight: 5 }}><Button variant="contained">Home</Button></Link>
            <BasicButton title="Update" handleAction={updateDocument(newId)} />

        </div>
    )
}