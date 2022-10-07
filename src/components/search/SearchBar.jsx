import React, { useEffect, useState } from "react";
import { Button, FormControl, MenuItem, Select, TextField, useTheme } from "@mui/material";
import { useHistory } from "react-router-dom";
import { classNames, curveTypes, isBN, searchTypes } from "utils";
import { content, HelpTooltip } from "components";
import { FiberManualRecord } from '@mui/icons-material';

const options = [
    { text: 'Transactions', placeHolder: "Transactions Hash", value: searchTypes.TRANSACTIONS },
    { text: 'Blocks', placeHolder: "Block Height", value: searchTypes.BLOCKS },
    { text: 'DataStores', placeHolder: "Address", value: searchTypes.DATASTORES },
];

export function SearchBar({ currentSearch = null }) {

    const history = useHistory();
    const theme = useTheme();

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

    const handleChange = (e) => {
        setTerm("");
        setOffset("");
        setSelectedOption(options[e.target.value]);
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

                        <FormControl variant="outlined" className="flex-shrink-0 text-center">
                            <Select
                                className="bg-cleargray rounded-md rounded-r-none font-bold min-w-9 mobile:rounded-md mobile:text-xl"
                                labelId="search-type-selection"
                                id="search-type-selection"
                                value={selectedOption.value}
                                onChange={handleChange}
                                inputProps={{ className: "py-3" }}
                            >
                                {options.map(option =>
                                    <MenuItem
                                        key={`header-option-${option.value}`}
                                        value={option.value}
                                        className="font-bold mobile:text-xl"
                                    >{option.text}</MenuItem>
                                )}
                            </Select>
                        </FormControl>

                        <div className="flex flex-row items-center mobile:flex-col w-full gap-3">
                            <TextField
                                inputProps={{
                                    placeholder: `${selectedOption.placeHolder}`,
                                    className: "text-white py-3 mobile:text-xl"
                                }}
                                variant={"outlined"}
                                className={classNames(
                                    "bg-dark mobile:text-xl rounded-md rounded-l-none mobile:rounded-l-md",
                                    { "w-full": selectedOption.value !== searchTypes.DATASTORES },
                                    { "w-1/2 mobile:w-full": selectedOption.value === searchTypes.DATASTORES }
                                )}
                                value={term}
                                onChange={(e) => setTerm(e.target.value)}
                            />
                            {
                                selectedOption.value === searchTypes.DATASTORES &&
                                <div className="flex items-center w-1/2 gap-2 mobile:w-full">
                                    <TextField
                                        inputProps={{
                                            placeholder: "Offset",
                                            className: "text-white py-3 mobile:text-xl"
                                        }}
                                        variant={"outlined"}
                                        className="bg-dark w-full rounded-md"
                                        value={offset}
                                        onChange={e => setOffset(e.target.value)}
                                    />
                                    <HelpTooltip content={content.offset} />
                                </div>
                            }
                        </div>

                    </div>

                    <Button
                        variant={"contained"}
                        className="w-40 mobile:w-full text-xl mobile:py-2"
                        onClick={() => handleSearch(term)}
                    >
                        Search
                    </Button>

                </div>

                <div className="flex">
                    {curveType && term && selectedOption.value === searchTypes.DATASTORES && (
                        <div className="flex items-center gap-3 w-1/2 mobile:w-full">
                            <FiberManualRecord className="w-3" sx={{ color: theme.palette.primary.main }} />
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