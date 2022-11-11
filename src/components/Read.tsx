import BasicButton from "./Button"
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs } from "firebase/firestore";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


type ReadProps = {
    currentUser: any,
    navigate: any,
    setEntries: any,
    entries: any,
    db: any
}

export default function Read({ currentUser, navigate, entries, setEntries, db }: ReadProps) {
    const fetchPost = async () => {

        await getDocs(collection(db, "practice_users"))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setEntries(newData);
                console.log(entries, newData);
            })

    }

    useEffect(() => {
        fetchPost();
    }, [])

    useEffect(() => {
        if (!currentUser()) {
            navigate("/")
        }
    })

    return (
        <div>
            <div className="heading-container">
                <h3>
                    Read
                </h3>
                <p>Read all entries in DB</p>
            </div>
            <div style={{margin: 'auto', width: 'fit-content', marginBottom: 10}}>
            <TableContainer component={Paper}>
                <Table  aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>id#</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="right">Job</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                    entries?.map((entry: any, i: any) => (
                        <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                            <TableCell component="th" scope="row">{entry.id}</TableCell>
                            <TableCell align="right">{entry.name}</TableCell>
                            <TableCell align="right">{entry.job}</TableCell>
                        </TableRow>
                    ))
                }
                    </TableBody>
                </Table>
            </TableContainer>
            </div>
            <Link to="/" style={{ textDecoration: 'none' }}><Button variant="contained">Home</Button></Link>
        </div>
    );
}