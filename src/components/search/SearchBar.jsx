import React, { useEffect, useState } from "react";
import { Button, Dropdown, Icon } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import { classNames, curveTypes, isBN, searchTypes } from "utils";
import { content, HelpTooltip } from "components";

const options = [
    { text: 'Transactions', placeHolder: "Transactions Hash", value: searchTypes.TRANSACTIONS },
    { text: 'Blocks', placeHolder: "Block Height", value: searchTypes.BLOCKS },
    { text: 'DataStores', placeHolder: "Address", value: searchTypes.DATASTORES },
];

export function SearchBar({ currentSearch = null }) {

    const history = useHistory();

    const [offset, setOffset] = useState("");

    const [term, setTerm] = useState("");
    const [selectedOption, setSelectedOption] = useState(options[0]);

    const [curveType, setCurveType] = useState(curveTypes.SECP256K1);

    useEffect(() => {
        if (term && selectedOption.value === searchTypes.DATASTORES) {
            setCurveType(isBN(term) ? curveTypes.BARRETO_NAEHRIG : curveTypes.SECP256K1);
        }
    }, [selectedOption, term]);

    useEffect(() => {
        if (currentSearch) {
            setSelectedOption(options.find(option => option.value === currentSearch.type));
        }
    }, []);

    const handleChange = (e, { value }) => {
        setTerm("");
        setOffset("");
        setSelectedOption(options[value]);
    };

    const handleSearch = () => {
        if (!term) {
            return;
        }
        switch (selectedOption.value) {
            case searchTypes.BLOCKS:
                history.push(`/block/${term}`);
                break;
            case searchTypes.TRANSACTIONS:
                history.push(`/tx/${term}`);
                break;
            case searchTypes.DATASTORES:
                history.push(`/data/${term}/${offset}`);
                break;
            default:
                alert('Invalid option');
        }
    };

    return (
        <div className="flex flex-col text-left bg-darkgray rounded-md px-8 py-10 gap-3">

            <div>
                <h3 className="m-0 text-2xl font-light">Explore the <span className="mobile:hidden">AliceNet </span>blockchain
                </h3>
            </div>

            <div className="flex flex-col justify-between gap-2">

                <div className="flex flex-row mobile:flex-col justify-between gap-5">

                    <div className="flex flex-row mobile:flex-col w-full mobile:gap-5">

                        <Dropdown
                            className="flex justify-center items-center text-black bg-cleargray rounded-md rounded-r-none font-bold flex-shrink-0 min-w-9 mobile:py-2 mobile:rounded-md mobile:text-xl"
                            text={selectedOption.text}
                        >
                            <Dropdown.Menu className="bg-dropgray w-full">
                                {options.map(option =>
                                    <Dropdown.Item
                                        key={`header-option-${option.value}`}
                                        onClick={handleChange}
                                        value={option.value}
                                        className="text-black font-bold mobile:text-xl"
                                    >
                                        {option.text}
                                    </Dropdown.Item>
                                )}
                            </Dropdown.Menu>
                        </Dropdown>

                        <div className="flex flex-row mobile:flex-col w-full gap-3">
                            <input
                                className={classNames(
                                    "px-4 bg-dark rounded-l-none rounded-md focus:outline-none focus:border-neongreen mobile:py-3 mobile:rounded-md  mobile:text-xl",
                                    { "w-full": selectedOption.value !== searchTypes.DATASTORES },
                                    { "w-1/2 mobile:w-full": selectedOption.value === searchTypes.DATASTORES }
                                )}
                                placeholder={` ${selectedOption.placeHolder}`}
                                value={term}
                                onChange={(e) => setTerm(e.target.value)}
                            />
                            {
                                selectedOption.value === searchTypes.DATASTORES &&
                                <div className="flex items-center w-1/2 gap-2 mobile:w-full">
                                    <input
                                        className="px-4 bg-dark rounded-md w-full h-full focus:outline-none focus:border-neongreen mobile:py-3 mobile:text-xl"
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
                        className="text-black bg-neongreen m-0 w-40 text-xl py-2 mobile:w-full"
                        onClick={() => handleSearch(term)}
                        content="Search"
                    />

                </div>

                <div className="flex">
                    {curveType && term && selectedOption.value === searchTypes.DATASTORES && (
                        <div className="flex items-center gap-3 w-1/2 mobile:w-full">
                            <Icon name="circle" size="mini" className="text-neongreen m-0 h-auto" />
                            <h4>This is a {curveType === curveTypes.BARRETO_NAEHRIG ? content.bn : content.secp}</h4>
                            <HelpTooltip
                                content={curveType === curveTypes.BARRETO_NAEHRIG ? content.bn : content.secp}
                            />
                        </div>
                    )}
                </div>

            </div>

        </div>
    );
}