import { useState } from 'react';
import { Dropdown, Button } from 'semantic-ui-react';
import { useHistory } from "react-router-dom";
import { ReactComponent as Icon1 } from '../../assets/searchIcon1.svg';
import { ReactComponent as Icon2 } from '../../assets/searchIcon2.svg';
import { ReactComponent as Icon3 } from '../../assets/searchIcon3.svg';
import styles from './AliceNetSearch.module.scss';

const options = [
    { key: 1, text: 'Block', value: 1 },
    { key: 2, text: 'Tx', value: 2 },
  ]

export function AliceNetSearch(){
    const history = useHistory();
    const [term, setTerm] = useState('')
    const [option, setOption] = useState(options[0].value)

    const handleChange = (e, { value }) => setOption(value)

    const handleSearch = () => {
        switch(option){
            case options[0].value:
                history.push(`/block?height=${term}`);
                break;
            case options[1].value:
                history.push(`/tx?hash=${term}`);
                break;
            default:
                alert('Invalid option')
        }
    }

    return <div className={styles.container}>
        <div className={styles.content}>
            <div className={styles.inputWrapper}>
                <div>
                    <h2 className={styles.headers}>Explore the Madnet blockchain</h2>
                </div>
                <div>
                    <Dropdown 
                        onChange={handleChange}
                        className={styles.dropdown}
                        options={options}
                        value={option}
                    >
                        <Dropdown.Menu className={styles.menu}>
                            <Dropdown.Item onClick={handleChange} value={options[0].value} className={styles.option}>{options[0].text}</Dropdown.Item>
                            <Dropdown.Item onClick={handleChange} value={options[1].value} className={styles.option}>{options[1].text}</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <input placeholder={option === options[0].value ? 'Block number' : 'Tx hash'} 
                            className={styles.input}
                            value={term} 
                            onChange={(e) => setTerm(e.target.value)}/>
                    <Button className={styles.button} onClick={() => handleSearch(term)}>Search</Button>
                </div>
            </div>
            <div className={styles.iconContainer}>
                <Icon1 className={styles.icon}/>
                <Icon2 className={styles.icon}/>
                <Icon3 className={styles.icon}/>
            </div>
        </div>
    </div>
}
