import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

export function CustomTable({ title, icon, headerCells, rows = [], key }) {

    return (

        <div className="border-t-2 rounded-md border-neongreen">

            <Table key={key} className="bg-tableblack text-white mobile:whitespace-normal">

                <TableHead>

                    <TableRow>

                        <TableCell
                            className="bg-tableblack text-white text-xl font-semibold border-tableblack"
                            colSpan={headerCells.length}
                            key={`table-header-main`}
                        >
                            <div className="flex items-center gap-5">{icon}{title}</div>
                        </TableCell>

                    </TableRow>

                    <TableRow>
                        {headerCells.map(header =>
                            <TableCell
                                className="bg-rowblack text-white text-lg font-semibold border-tableblack"
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
                            <TableRow className="bg-rowblack" key={`table-row-${rowIndex}`}>
                                {headerCells.map((headerCell) =>

                                    <TableCell
                                        className="border-t-1 border-tableblack text-lg text-white"
                                        key={`row-${headerCell.id}`}
                                    >
                                        {headerCell?.displayCallback ? headerCell.displayCallback(row) : row[headerCell.id]}
                                    </TableCell>
                                )}
                            </TableRow>
                        )
                    )}

                </TableBody>

            </Table>

        </div>
    );

}
