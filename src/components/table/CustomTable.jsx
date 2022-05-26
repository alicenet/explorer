import { Table } from "semantic-ui-react"

export function CustomTable({ title, Icon, headers, rows = [], key }) {

    return (

        <Table
            padded
            singleLine
            key={key}
            className="border-0 border-t-4 border-neongreen bg-tableblack text-white"
        >
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell
                        className="bg-tableblack text-white text-xl font-semibold"
                        colSpan={headers.length}
                    >
                        <div className="flex items-center gap-5">{Icon && <Icon />}{title}</div>
                    </Table.HeaderCell>
                </Table.Row>
                <Table.Row>
                    {headers.map(header =>
                        <Table.HeaderCell
                            className="bg-rowblack text-white"
                            key={`table-header-${header}`}
                        >
                            {header}
                        </Table.HeaderCell>
                    )}
                </Table.Row>
            </Table.Header>
            {
                rows.length !== 0 &&
                <Table.Body>
                    {rows.length > 0 && rows.map(row =>
                        <Table.Row
                            className="text-lg bg-rowblack"
                            key={`${row[headers[0]]} ${row[headers[0]]}`}
                        >
                            {headers.map(headers =>
                                <Table.Cell className="border-t-1 border-tableblack" key={row[headers]}>
                                    {row[headers]}
                                </Table.Cell>
                            )}
                        </Table.Row>
                    )}
                </Table.Body>}
        </Table>

    );

}
