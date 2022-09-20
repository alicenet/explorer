import { aliceNetAdapter } from "adapter/alicenetadapter";
import React from "react";
import { useSelector } from "react-redux";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

export const ErrorOverlay = () => {

    useSelector(s => s);

    const error = aliceNetAdapter.error || ""; // Todo: Update to support all required errors

    return (

        <Dialog open={!!error}>
            <DialogTitle className="text-white text-2xl">
                Error!
            </DialogTitle>
            <DialogContent dividers>
                <DialogContentText className="text-white">
                    {error}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button variant={"contained"} onClick={() => document.location.reload(true)}>
                    Try Again
                </Button>
            </DialogActions>
        </Dialog>

    );

}