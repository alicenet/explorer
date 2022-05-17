import { useState } from "react";
import { Button, Dropdown } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { ReactComponent as Icon1 } from "assets/searchIcon1.svg";
import { ReactComponent as Icon2 } from "assets/searchIcon2.svg";
import { ReactComponent as Icon3 } from "assets/searchIcon3.svg";
import styles from "./AliceNetSearch.module.scss";

const options = [
    { text: 'Block', value: 1 },
    { text: 'Tx', value: 2 },
];

export function AliceNetSearch() {
    const history = useHistory();
    const [term, setTerm] = useState('');
    const [selectedOption, setSelectedOption] = useState(options[0]);

    const handleChange = (e, { value }) => {
        setSelectedOption(options[value - 1]);
    };

    const handleSearch = () => {
        switch (selectedOption.value) {
            case options[0].value:
                history.push(`/block?height=${term}`);
                break;
            case options[1].value:
                history.push(`/tx?hash=${term}`);
                break;
            default:
                alert('Invalid option');
        }
    };

    return <div className={styles.container}>
        <div className={styles.content}>
            <div className={styles.inputWrapper}>
                <div>
                    <h2 className={styles.headers}>Explore the Madnet blockchain</h2>
                </div>
                <div>
                    <Dropdown
                        text={selectedOption.text}
                        className={styles.dropdown}
                    >
                        <Dropdown.Menu className={styles.menu}>
                            {options.map(option => {
                                    return (<Dropdown.Item
                                        key={`header-option-${option.value}`}
                                        onClick={handleChange}
                                        value={option.value}
                                        className={styles.option}
                                    >
                                        {option.text}
                                    </Dropdown.Item>);
                                }
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <input
                        placeholder={selectedOption.value === options[0].value ? 'Block number' : 'Tx hash'}
                        className={styles.input}
                        value={term}
                        onChange={(e) => setTerm(e.target.value)}
                    />
                    <Button className={styles.button} onClick={() => handleSearch(term)}>Search</Button>
                </div>
            </div>
            <div className={styles.iconContainer}>
                <Icon1 className={styles.icon} />
                <Icon2 className={styles.icon} />
                <Icon3 className={styles.icon} />
            </div>
        </div>
    </div>
}