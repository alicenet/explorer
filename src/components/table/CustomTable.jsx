import { Table } from "semantic-ui-react";

export function CustomTable({ title, icon, headerCells, rows = [], key }) {

    return (

        <Table
            unstackable
            padded
            singleLine
            key={key}
            className="border-0 border-t-2 border-neongreen bg-tableblack text-white mobile:whitespace-normal"
        >
            <Table.Header>

                <Table.Row>
                    <Table.HeaderCell
                        className="bg-tableblack text-white text-xl font-semibold"
                        colSpan={headerCells.length}
                        key={`table-header-main`}
                    >
                        <div className="flex items-center gap-5">{icon}{title}</div>
                    </Table.HeaderCell>
                </Table.Row>

                <Table.Row>
                    {headerCells.map(header =>
                        <Table.HeaderCell
                            className="bg-rowblack text-white border-t-1 border-tableblack"
                            key={`table-header-${header.id}`}
                        >
                            {header.label}
                        </Table.HeaderCell>
                    )}
                </Table.Row>

            </Table.Header>

            <Table.Body>

                {rows.map((row, rowIndex) =>
                    (
                        <Table.Row className="text-lg bg-rowblack" key={`table-row-${rowIndex}`}>
                            {headerCells.map((headerCell) =>

                                <Table.Cell className="border-t-1 border-tableblack" key={`row-${headerCell.id}`}>
                                    {headerCell?.displayCallback ? headerCell.displayCallback(row, rowIndex) : row[headerCell.id]}
                                </Table.Cell>
                            )}
                        </Table.Row>
                    )
                )}

            </Table.Body>

        </Table>

    );

}
