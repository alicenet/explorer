import React, { useEffect, useState } from "react";
import { Box, Button, FormControl, MenuItem, Select, TextField, useMediaQuery, useTheme } from "@mui/material";
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
    const matches = useMediaQuery(theme.breakpoints.up("md"));

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
        <Box
            display={"flex"}
            flexDirection={"column"}
            sx={{ backgroundColor: theme.palette.darkGray.main }}
            paddingY={4.5}
            paddingX={3.5}
            gap={1.5}
            borderRadius={1}
        >

            <h3 className="m-0 text-2xl font-light">Explore the AliceNet Blockchain</h3>

            <Box display="flex" flexDirection="column" justifyContent="space-between" gap={1}>

                <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="space-between"
                    gap={2}
                    className="mobile:flex-col"
                >

                    <Box
                        display="flex"
                        flexDirection="row"
                        justifyContent="space-between"
                        flexGrow={1}
                        className="mobile:flex-col mobile:gap-5"
                    >

                        <FormControl variant="outlined" className="flex-shrink-0 text-center">
                            <Select
                                sx={{
                                    backgroundColor: theme.palette.clearGray.main,
                                    "& .MuiSvgIcon-root": {
                                        color: "black"
                                    }
                                }}
                                className="rounded-md rounded-r-none text-black font-bold min-w-9 mobile:rounded-md mobile:text-xl"
                                labelId="search-type-selection"
                                id="search-type-selection"
                                value={selectedOption.value}
                                onChange={handleChange}
                                inputProps={{ className: "py-3" }}
                                MenuProps={{
                                    sx: {
                                        "& .MuiPaper-root": {
                                            backgroundColor: "white",
                                        },
                                        "&& .Mui-selected": {
                                            backgroundColor: theme.palette.primary.light
                                        }
                                    }
                                }}
                            >
                                {options.map(option =>
                                    <MenuItem
                                        key={`header-option-${option.value}`}
                                        value={option.value}
                                        className="text-black font-bold mobile:text-xl"
                                        sx={{
                                            "&:hover": {
                                                backgroundColor: theme.palette.dark.light,
                                            }
                                        }}
                                    >
                                        {option.text}
                                    </MenuItem>
                                )}
                            </Select>
                        </FormControl>

                        <Box
                            display="flex"
                            flexDirection="row"
                            alignItems="center"
                            flexGrow={1}
                            gap={1}
                            className="mobile:flex-col mobile:gap-3"
                        >
                            <TextField
                                sx={{ backgroundColor: theme.palette.dark.main }}
                                inputProps={{
                                    placeholder: `${selectedOption.placeHolder}`,
                                    className: "py-3 mobile:text-xl"
                                }}
                                variant={"outlined"}
                                className={classNames(
                                    "mobile:text-xl rounded-md rounded-l-none mobile:rounded-l-md",
                                    { "w-full": selectedOption.value !== searchTypes.DATASTORES },
                                    { "w-1/2 mobile:w-full": selectedOption.value === searchTypes.DATASTORES }
                                )}
                                value={term}
                                onChange={(e) => setTerm(e.target.value)}
                            />
                            {
                                selectedOption.value === searchTypes.DATASTORES &&
                                <Box display="flex" alignItems="center" gap={1} className="w-1/2 mobile:w-full">
                                    <TextField
                                        sx={{ backgroundColor: theme.palette.dark.main }}
                                        inputProps={{
                                            placeholder: "Offset",
                                            className: "py-3 mobile:text-xl"
                                        }}
                                        variant={"outlined"}
                                        className="w-full rounded-md"
                                        value={offset}
                                        onChange={e => setOffset(e.target.value)}
                                    />
                                    {matches && <HelpTooltip content={content.offset} />}
                                </Box>
                            }
                        </Box>

                    </Box>

                    <Button
                        variant={"contained"}
                        className="text-black w-40 mobile:w-full text-xl mobile:py-2"
                        onClick={() => handleSearch(term)}
                    >
                        Search
                    </Button>

                </Box>

                <Box display="flex">
                    {curveType && term && selectedOption.value === searchTypes.DATASTORES && (
                        <Box display="flex" alignItems="center" gap={1} className="w-1/2 mobile:w-full">
                            <FiberManualRecord className="w-3" sx={{ color: theme.palette.primary.main }} />
                            <h4>This is a {curveType === curveTypes.BARRETO_NAEHRIG ? content.bn : content.secp}</h4>
                            <HelpTooltip
                                content={curveType === curveTypes.BARRETO_NAEHRIG ? content.bn : content.secp}
                            />
                        </Box>
                    )}
                </Box>

            </Box>

        </Box>
    );
}