import { useEffect, useState } from "react";
import { Button, Checkbox, Dropdown } from "semantic-ui-react";
import { content, HelpTooltip } from "components";
import styles from "./DataStoreSearch.module.scss";
import { useHistory } from "react-router-dom";
import { curveTypes, isBN } from "utils";

const options = [{ text: "DataStores", value: 0 }];

export function DataStoreSearch() {
    const history = useHistory();

    const [term, setTerm] = useState("");
    const [offset, setOffset] = useState("");
    const [showMore, setShowMore] = useState(false);
    const [selectedOption, setSelectedOption] = useState(options[0]);
    const [addressType, setAddressType] = useState(curveTypes.SECP256K1);

    const handleChange = (e, { value }) => {
        setSelectedOption(options[value]);
    };

    const handleSearch = () => {
        if (term && addressType) {
            history.push(`/data?address=${term}&curve=${addressType} ${offset && `&showMore=${showMore}`} ${offset && `&offset=${offset.padStart(64, '0')}`}`);
        }
    };

    useEffect(() => {
        if (!term) setAddressType(null);
        setAddressType(isBN(term) ? curveTypes.BARRETO_NAEHRIG : curveTypes.SECP256K1);
    }, [term]);

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.inputWrapper}>
                    <div>
                        <h2 className={styles.headers}>Explore the Madnet blockchain</h2>
                    </div>
                    <div className={styles.sectionContainer}>
                        <div className={styles.inputSection}>
                            <Dropdown
                                text={selectedOption.text}
                                className={styles.dropdown}
                            >
                                <Dropdown.Menu className={styles.menu}>
                                    {options.map(option =>
                                        <Dropdown.Item
                                            key={`header-option-${option.value}`}
                                            onClick={handleChange}
                                            value={option.value}
                                            className={styles.option}
                                        >
                                            {option.text}
                                        </Dropdown.Item>
                                    )}
                                </Dropdown.Menu>
                            </Dropdown>
                            <input
                                className={styles.input}
                                value={term}
                                onChange={e => setTerm(e.target.value)}
                                placeholder="Address"
                            />
                        </div>
                        <div className={styles.inputSection}>
                            <div className="mr-2">Offset</div>
                            <input
                                className={styles.inputOffset}
                                value={offset}
                                onChange={e => setOffset(e.target.value)}
                                placeholder="(optional)"
                            />
                            <HelpTooltip content={content.offset} />
                        </div>
                        <Button
                            className={styles.button}
                            onClick={() => handleSearch(term, offset)}
                        >
                            Search
                        </Button>

                    </div>
                </div>
            </div>

            <div className={styles.sectionContainer}>
                <div className={styles.inputSection}>
                    {addressType && term && term.length > 0 && (
                        <div className={styles.addressType}>
                            <div className={styles.greenDot} />
                            <h3>This is a {addressType === curveTypes.BARRETO_NAEHRIG ? content.bn : content.secp}</h3>
                            <HelpTooltip content={addressType === curveTypes.BARRETO_NAEHRIG ? content.bn : content.secp} />
                        </div>
                    )}
                </div>
                <div className={styles.inputSection}>
                    {offset && 
                        <div className={styles.addressType}>
                            <Checkbox toggle className='ml-2 mr-2' checked={showMore} onClick={() => setShowMore(!showMore)}/> 
                            <span>Show More Datastores</span>
                        </div>
                    }
                </div>
            </div>

            
        </div>
    );
}
