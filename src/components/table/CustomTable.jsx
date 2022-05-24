import { Table } from "semantic-ui-react"
import styles from "./CustomTable.module.scss";

export function CustomTable({ title, Icon, headers, rows = [], key }) {

    return (
        <Table key={key} className={styles.table}>
            <Table.Header fullWidth>
                <Table.Row>
                    <Table.HeaderCell colSpan={headers.length}>
                        <div className={styles.title}>{Icon && <Icon />}{title}</div>
                    </Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Header fullWidth>
                <Table.Row>
                    {headers.map(h => <Table.HeaderCell key={h}>{h}</Table.HeaderCell>)}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {rows.length > 0 && rows.map(r =>
                    <Table.Row key={`${r[headers[0]]} ${r[headers[0]]}`}>
                        {headers.map(h => <Table.Cell key={r[h]}>{r[h]}</Table.Cell>)}
                    </Table.Row>)}
            </Table.Body>
        </Table>
    );

}
