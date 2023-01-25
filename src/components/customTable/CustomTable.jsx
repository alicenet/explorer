import { Box, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography, useTheme } from "@mui/material";
import React from "react";

export function CustomTable({ title, icon, headerCells, rows = [], key, double }) {

    const theme = useTheme();
    const doubleHeaderCells = headerCells.concat(double ? headerCells : []);

    return (

        <Paper elevation={2} square sx={{ boxShadow: "unset" }}>

            <Table key={key}>

                <TableHead>

                    <TableRow>

                        <TableCell
                            sx={{ border: 0 }}
                            colSpan={doubleHeaderCells.length}
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

                        {doubleHeaderCells.map((header, headerIndex) =>
                            <TableCell key={`table-header-${header.id}-${headerIndex}`} sx={{ border: 0 }}>

                                <Typography fontWeight="bold">
                                    {header.label}
                                </Typography>

                            </TableCell>
                        )}

                    </TableRow>

                </TableHead>

                <TableBody>

                    {rows.map((row, rowIndex) => {
                        if (rowIndex % 2 !== 0 && double) {
                            return null;
                        }
                        return (
                            <TableRow key={`table-row-${rowIndex}`}>

                                {doubleHeaderCells.map((headerCell, headerCellIndex) => {
                                        const selectedRow = headerCellIndex >= headerCells.length ? rows[rowIndex + 1] : row;
                                        return (
                                            <TableCell
                                                sx={{ border: 0, fontSize: "small" }}
                                                key={`row-${headerCell.id}-${headerCellIndex}`}
                                            >

                                                <Typography variant="span">
                                                    {headerCell?.displayCallback ? headerCell.displayCallback({ theme, ...selectedRow }) : selectedRow[headerCell.id]}
                                                </Typography>

                                            </TableCell>
                                        );
                                    }
                                )}

                            </TableRow>
                        );
                    })}

                </TableBody>

            </Table>

        </Paper>
    );

}
