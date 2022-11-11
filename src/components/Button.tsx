import * as React from 'react';
import Button from '@mui/material/Button';

type BasicButtonsProps = {
    title: string,
    handleAction: any
}

export default function BasicButtons({title, handleAction}: BasicButtonsProps) {
    return (
        <Button variant="contained" onClick={handleAction}>{title}</Button>
    );
}