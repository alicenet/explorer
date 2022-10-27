import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography, useTheme } from "@mui/material";
import React from "react";

export function CustomTable({ title, icon, headerCells, rows = [], key }) {

    const theme = useTheme();

    return (

        <Table key={key} className="mobile:whitespace-normal rounded-md rounded-b-none overflow-hidden">

            <TableHead>

                <TableRow sx={{ borderTop: `2px solid ${theme.palette.primary.main}` }}>

                    <TableCell
                        sx={{
                            background: theme.palette.tableBlack.main,
                            borderColor: theme.palette.tableBlack.main,
                        }}
                        colSpan={headerCells.length}
                        key={`table-header-main`}
                    >
                        <Box display="flex" alignItems="center" gap={3}>
                            {icon}
                            <Typography sx={{ fontSize: '1.25rem', fontWeight: 600 }}>
                                {title}
                            </Typography>
                        </Box>
                    </TableCell>

                </TableRow>

                <TableRow>
                    {headerCells.map(header =>
                        <TableCell
                            sx={{
                                backgroundColor: theme.palette.rowBlack.main,
                                borderColor: theme.palette.tableBlack.main,
                            }}
                            key={`table-header-${header.id}`}
                        >
                            <Typography sx={{ fontSize: '1.15rem', fontWeight: 600 }}>
                                {header.label}
                            </Typography>
                        </TableCell>
                    )}
                </TableRow>

            </TableHead>

            <TableBody>

                {rows.map((row, rowIndex) =>
                    (
                        <TableRow
                            sx={{ backgroundColor: theme.palette.rowBlack.main }}
                            key={`table-row-${rowIndex}`}
                        >
                            {headerCells.map((headerCell) =>

                                <TableCell
                                    sx={{ borderColor: theme.palette.tableBlack.main }}
                                    key={`row-${headerCell.id}`}
                                >
                                    <Typography sx={{ fontSize: '1.15rem' }}>
                                        {headerCell?.displayCallback ? headerCell.displayCallback({ theme, ...row }) : row[headerCell.id]}
                                    </Typography>
                                </TableCell>
                            )}
                        </TableRow>
                    )
                )}

            </TableBody>

        </Table>

    );

}
