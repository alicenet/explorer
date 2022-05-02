import { Table } from "semantic-ui-react"
import './CustomTable.module.scss';

export function CustomTable(props) {
    const { title, Icon, headers, rows = [], key } = props;
    return (
        <Table key={key} className="bg-darkGrey">
            <Table.Header fullWidth>
                <Table.Row>
                    <Table.HeaderCell colSpan={headers.length}>
                        <div className="title flex items-center">{Icon && <Icon />}{title}</div>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Header fullWidth>
                <Table.Row>
                    {headers.map(h => <Table.HeaderCell key={h}>{h}</Table.HeaderCell>)}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {rows.map(r =>
                    <Table.Row key={`${r[headers[0]]} ${r[headers[0]]}`}>
                        {headers.map(h => <Table.Cell key={r[h]}>{r[h]}</Table.Cell>)}
                    </Table.Row>)}
            </Table.Body>
        </Table>
    )
}
