import BasicButton from "./Button"
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useEffect } from "react";
import { TextField } from "@mui/material";

type DeleteProps = {
    currentUser: any,
    navigate: any,
    newId: any,
    setNewId: any,
    setNewName: any,
    setNewJob: any,
    deleteDocument: any
}

export default function Delete({ currentUser, navigate, newId, setNewId, setNewName, setNewJob, deleteDocument}: DeleteProps) {
    useEffect(() => {
        if(!currentUser()) {
            navigate()
        }
    })

    return (
        <div>
            <div className="heading-container">
                <h3>
                    Delete
                </h3>
                <p>Delete a DB entry in Firestore by its ID</p>
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

            </Box>
            <BasicButton title="Delete" handleAction={deleteDocument(newId)} />

        </div>
    )
}