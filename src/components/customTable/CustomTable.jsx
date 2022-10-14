import { Table, TableBody, TableCell, TableHead, TableRow, useTheme } from "@mui/material";

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
                        className="text-xl font-semibold"
                        colSpan={headerCells.length}
                        key={`table-header-main`}
                    >
                        <div className="flex items-center gap-5">{icon}{title}</div>
                    </TableCell>

                </TableRow>

                <TableRow>
                    {headerCells.map(header =>
                        <TableCell
                            sx={{
                                backgroundColor: theme.palette.rowBlack.main,
                                borderColor: theme.palette.tableBlack.main,
                            }}
                            className="text-lg font-semibold"
                            key={`table-header-${header.id}`}
                        >
                            {header.label}
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
                                    className="border-t-1 text-lg"
                                    key={`row-${headerCell.id}`}
                                >
                                    {headerCell?.displayCallback ? headerCell.displayCallback({ theme, ...row }) : row[headerCell.id]}
                                </TableCell>
                            )}
                        </TableRow>
                    )
                )}

            </TableBody>

        </Table>

    );

}
