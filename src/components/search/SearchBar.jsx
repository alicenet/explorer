import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    FormControl,
    MenuItem,
    Select,
    TextField,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import { useHistory } from "react-router-dom";
import { curveTypes, isBN, searchTypes } from "utils";
import { content, HelpTooltip } from "components";
import { FiberManualRecord } from "@mui/icons-material";

const options = [
    { text: "Transactions", placeHolder: "Transactions Hash", value: searchTypes.TRANSACTIONS },
    { text: "Blocks", placeHolder: "Block Height", value: searchTypes.BLOCKS },
    { text: "DataStores", placeHolder: "Address", value: searchTypes.DATASTORES },
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

            <Typography fontSize="x-large">Explore the AliceNet Blockchain</Typography>

            <Box display="flex" flexDirection="column" justifyContent="space-between" gap={1}>

                <Box
                    display="flex"
                    justifyContent="space-between"
                    gap={2}
                    sx={{ flexDirection: { xs: "column", md: "row" } }}
                >

                    <Box
                        display="flex"
                        justifyContent="space-between"
                        flexGrow={1}
                        sx={{
                            flexDirection: { xs: "column", md: "row" },
                            gap: { xs: 1.5, md: "unset" },
                        }}
                    >

                        <FormControl variant="outlined">
                            <Select
                                sx={{
                                    textAlign: "center",
                                    minWidth: "10em",
                                    backgroundColor: theme.palette.clearGray.main,
                                    color: "black",
                                    fontWeight: "bold",
                                    borderTopRightRadius: { xs: theme.spacing, md: 0 },
                                    borderBottomRightRadius: { xs: theme.spacing, md: 0 },
                                    "& .MuiSvgIcon-root": {
                                        color: "black"
                                    }
                                }}
                                value={selectedOption.value}
                                onChange={handleChange}
                                inputProps={{
                                    sx: {
                                        paddingY: 1.5,
                                    }
                                }}
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
                                        sx={{
                                            color: "black",
                                            fontWeight: "bold",
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
                            sx={{ flexDirection: { xs: "column", md: "row" } }}
                        >
                            <TextField
                                sx={{
                                    width: selectedOption.value === searchTypes.DATASTORES ? {
                                        xs: "100%",
                                        md: "50%"
                                    } : "100%",
                                    backgroundColor: theme.palette.dark.main,
                                    '& fieldset': {
                                        borderBottomLeftRadius: { xs: theme.spacing, md: 0 },
                                        borderTopLeftRadius: { xs: theme.spacing, md: 0 },
                                    }
                                }}

                                inputProps={{
                                    placeholder: `${selectedOption.placeHolder}`,
                                    sx: { paddingY: 1.5 }
                                }}
                                variant={"outlined"}
                                value={term}
                                onChange={(e) => setTerm(e.target.value)}
                            />
                            {
                                selectedOption.value === searchTypes.DATASTORES &&
                                <Box
                                    display="flex"
                                    alignItems="center"
                                    gap={1}
                                    sx={{ width: { xs: "100%", md: "50%" } }}
                                >
                                    <TextField
                                        sx={{ backgroundColor: theme.palette.dark.main, width: "100%" }}
                                        inputProps={{
                                            placeholder: "Offset",
                                            sx: { paddingY: 1.5 }
                                        }}
                                        variant="outlined"
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
                        sx={{ paddingX: 5, fontSize: "larger" }}
                        onClick={() => handleSearch(term)}

                    >
                        Search
                    </Button>

                </Box>

                <Box display="flex">
                    {curveType && term && selectedOption.value === searchTypes.DATASTORES && (
                        <Box display="flex" alignItems="center" gap={1} sx={{ width: { xs: "100%", md: "50%" } }}>
                            <FiberManualRecord sx={{ color: theme.palette.primary.main, width: "0.5em" }} />
                            <Typography>
                                This is a {curveType === curveTypes.BARRETO_NAEHRIG ? content.bn : content.secp}
                            </Typography>
                            {
                                matches &&
                                <HelpTooltip
                                    content={curveType === curveTypes.BARRETO_NAEHRIG ? content.bn : content.secp}
                                />
                            }
                        </Box>
                    )}
                </Box>

            </Box>

        </Box>
    );
}