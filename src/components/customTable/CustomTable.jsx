import { Box, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography, useTheme } from "@mui/material";
import React from "react";

export function CustomTable({ title, icon, headerCells, rows = [], key }) {

    const theme = useTheme();

    return (

        <Paper elevation={2} square sx={{ boxShadow: "unset" }}>
            <Table key={key}>

                <TableHead>

                    <TableRow>

                        <TableCell
                            sx={{ border: 0 }}
                            colSpan={headerCells.length}
                            key="table-header-main"
                            padding="none"
                        >

                            <Paper elevation={8} sx={{ boxShadow: "unset" }} square>

                                <Box
                                    display="flex"
                                    alignItems="center"
                                    gap={2}
                                    padding={2}
                                    border={2}
                                    borderColor={theme.palette.primary.main}
                                    borderBottom={0}
                                    borderLeft={0}
                                    borderRight={0}
                                    borderRadius={1}
                                >
                                    {icon}
                                    <Typography fontWeight="bold">
                                        {title}
                                    </Typography>
                                </Box>

                            </Paper>

                        </TableCell>

                    </TableRow>

                    <TableRow>

                        {headerCells.map(header =>
                            <TableCell key={`table-header-${header.id}`} sx={{ border: 0 }}>

                                <Typography fontWeight="bold">
                                    {header.label}
                                </Typography>

                            </TableCell>
                        )}

                    </TableRow>

                </TableHead>

                <TableBody>

                    {rows.map((row, rowIndex) =>
                        (
                            <TableRow key={`table-row-${rowIndex}`}>

                                {headerCells.map((headerCell) =>

                                    <TableCell
                                        sx={{ border: 0, fontSize: "small" }}
                                        key={`row-${headerCell.id}`}
                                    >

                                        <Typography variant="span">
                                            {headerCell?.displayCallback ? headerCell.displayCallback({ theme, ...row }) : row[headerCell.id]}
                                        </Typography>

                                    </TableCell>
                                )}

                            </TableRow>
                        )
                    )}

                </TableBody>

            </Table>

        </Paper>
    );

}
