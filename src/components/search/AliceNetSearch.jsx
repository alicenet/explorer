import { useEffect, useState } from "react";
import { Button, Checkbox, Container, Dropdown } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import styles from "./AliceNetSearch.module.scss";
import { classNames, curveTypes, isBN, searchTypes } from "utils";
import { content, HelpTooltip } from "components";

const options = [
    { text: 'Transactions', placeHolder: "Transactions Hash", value: searchTypes.TRANSACTIONS },
    { text: 'Blocks', placeHolder: "Block Number", value: searchTypes.BLOCKS },
    { text: 'DataStores', placeHolder: "Address", value: searchTypes.DATASTORES },
];

export function AliceNetSearch() {
    const history = useHistory();
    const [term, setTerm] = useState("");
    const [offset, setOffset] = useState("");
    const [showMore, setShowMore] = useState(false);
    const [selectedOption, setSelectedOption] = useState(options[0]);
    const [addressType, setAddressType] = useState(curveTypes.SECP256K1);

    useEffect(() => {
        if (term && selectedOption.value === searchTypes.DATASTORES) {
            setAddressType(isBN(term) ? curveTypes.BARRETO_NAEHRIG : curveTypes.SECP256K1);
        }
    }, [selectedOption, term]);

    const handleChange = (e, { value }) => {
        setOffset("");
        setSelectedOption(options[value]);
    };

    const handleSearch = () => {
        if (!term) {
            return;
        }
        switch (selectedOption.value) {
            case searchTypes.BLOCKS:
                history.push(`/block?height=${term}`);
                break;
            case searchTypes.TRANSACTIONS:
                history.push(`/tx?hash=${term}`);
                break;
            case searchTypes.DATASTORES:
                history.push(`/data?address=${term}&curve=${addressType}&showMore=${offset ? showMore : true}${offset && `&offset=${offset.padStart(64, '0')}`}`);
                break;
            default:
                alert('Invalid option');
        }
    };

    return (
        <Container className="flex flex-col text-left bg-darkgray rounded-md px-8 py-10 gap-3">
            <div>
                <h3 className="m-0 text-2xl font-light">Explore the AliceNet blockchain</h3>
            </div>
            <div className="flex flex-col justify-between gap-2">
                <div className="flex flex-row justify-between gap-5">
                    <div className="flex flex-row w-full">
                        <Dropdown
                            className={classNames(
                                "flex justify-center items-center text-black bg-cleargray rounded-md w-1/6 rounded-r-none font-bold",
                                { "w-1/6": selectedOption.value !== searchTypes.DATASTORES }
                            )}
                            text={selectedOption.text}
                        >
                            <Dropdown.Menu
                                className={classNames('bg-dropgray', styles.dropdownMenu)}
                            >
                                {options.map(option =>
                                    <Dropdown.Item
                                        key={`header-option-${option.value}`}
                                        onClick={handleChange}
                                        value={option.value}
                                        className="text-black font-bold"
                                    >
                                        {option.text}
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>
                        <div className="flex flex-row w-full gap-3">
                            <input
                                className={classNames(
                                    "px-4 bg-dark rounded-l-none rounded-md focus:outline-none focus:border-neongreen",
                                    { "w-full": selectedOption.value !== searchTypes.DATASTORES },
                                    { "w-1/2": selectedOption.value === searchTypes.DATASTORES }
                                )}
                                placeholder={` ${selectedOption.placeHolder}`}
                                value={term}
                                onChange={(e) => setTerm(e.target.value)}
                            />
                            {
                                selectedOption.value === searchTypes.DATASTORES &&
                                <div className="flex items-center w-1/2 gap-2">
                                    <input
                                        className="px-4 bg-dark rounded-md w-full h-full focus:outline-none focus:border-neongreen"
                                        placeholder=" Offset"
                                        value={offset}
                                        onChange={e => setOffset(e.target.value)}
                                    />
                                    <HelpTooltip content={content.offset} />
                                </div>
                            }
                        </div>
                    </div>
                    <Button
                        className="text-black bg-neongreen m-0 w-40 text-xl py-2"
                        onClick={() => handleSearch(term)}
                        content="Search"
                    />
                </div>
                <div className="flex">
                    {addressType && term && selectedOption.value === searchTypes.DATASTORES && (
                        <div className="flex items-center gap-3 w-1/2">
                            <div className="bg-neongreen w-2 h-2 rounded-md" />
                            <h4>This is a {addressType === curveTypes.BARRETO_NAEHRIG ? content.bn : content.secp}</h4>
                            <HelpTooltip content={addressType === curveTypes.BARRETO_NAEHRIG ? content.bn : content.secp} />
                        </div>
                    )}
                    {offset && selectedOption.value === searchTypes.DATASTORES && (
                        <div className="flex items-center gap-3">
                            <Checkbox toggle className='ml-2 mr-2' checked={showMore} onClick={() => setShowMore(!showMore)}/> 
                            <span>Show More Datastores</span>
                        </div>
                    )}
                </div>
            </div>
        </Container>
    );
}