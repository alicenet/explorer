import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography, useTheme } from "@mui/material";
import React from "react";

export function CustomTable({ title, icon, headerCells, rows = [], key }) {

    const theme = useTheme();

    return (

        <Table key={key}>

            <TableHead>

                <TableRow>

                    <TableCell
                        sx={{ border: 0 }}
                        colSpan={headerCells.length}
                        key="table-header-main"
                        padding="none"
                    >
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
                            sx={{
                                backgroundColor: theme.palette.tableBlack.main,
                                borderBottomLeftRadius: 0,
                                borderBottomRightRadius: 0,
                            }}
                        >
                            {icon}
                            <Typography fontWeight="bold" fontSize="medium">
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
                            <Typography fontWeight="bold" fontSize="medium">
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
                                    <Typography fontSize={"medium"} variant={"span"}>
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
