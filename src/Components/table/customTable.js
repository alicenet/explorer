import { Table } from "semantic-ui-react"
import './customTable.css';

function CustomTable(props){
    const { title, Icon, headers, rows = [] } = props;
    return <Table>
                <Table.Header fullWidth>
                    <Table.Row>
                        <Table.HeaderCell colSpan={headers.length}>
                            <div className="title">{Icon && <Icon/>}{title}</div>
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
                            {headers.map(h => <Table.Cell>{r[h]}</Table.Cell>)}
                        </Table.Row>)}
                </Table.Body>
            </Table>
}

export default CustomTable;