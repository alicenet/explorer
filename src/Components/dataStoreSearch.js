import { useEffect, useState } from "react";
import { Dropdown, Button } from "semantic-ui-react";
import { ReactComponent as QuestionIcon } from "../assets/question-icon.svg";

const StylesSearchContainer = {
  backgroundColor: "#2D2D2D",
  padding: "30px",
  width: "90%",
  borderRadius: "5px"
};

const StylesContentWrapper = {
  display: "flex",
  alignItems: "center"
};

const StylesInputWrapper = {
  width: "100%",
  textAlign: "left"
};

const StylesInput = {
  width: "390px",
  height: "34px",
  border: "1px solid #383838",
  padding: "0 10px",
  borderRadius: "0px 4px 4px 0px"
};

const StylesButton = {
  background: "#00FFD1",
  borderRadius: "4px",
  color: "#0A0B09",
  width: "75px"
};

const StylesDropdown = {
  background: "#DEDEDE",
  color: "black",
  padding: "8px 20px",
  borderRadius: "4px 0px 0px 4px",
  maxHeight: "19px"
};

const StylesOffsetLabel = {
  ...StylesDropdown,
  width: "10%"
};

const StylesDropdownMenu = {
  width: "calc(100% - 2px)",
  borderRadius: "0 0 4px 4px"
};

const StylesDropdownMenuItem = {
  backgroundColor: "#2D2D2D"
};

const StylesContainer = {
  display: "flex"
};

const StylesQuestionIcon = {
  marginLeft: "-20px",
  top: "10px",
  position: "relative",
  cursor: "pointer"
};

const StylesCircle = {
  height: "25px",
  width: "25px",
  backgroundColor: "#00FFD1",
  borderRadius: "50%",
  display: "inline-block",
  marginRight: "15px"
};

const StylesInputContainer = {
  display: "flex",
  justifyContent: "space-between"
};

const StylesAddressType = {
  margin: "15px 0px",
  display: "flex",
  alignItems: "center"
};

const options = [{ key: 1, text: "DataStores", value: 1 }];

const ADDRESS_TYPES = { BN: "BN", SecP: "SecP" };

export function DataStoreSearch({ handleSearch }) {
  const [term, setTerm] = useState("");
  const [offset, setOffset] = useState("");
  const [option, setOption] = useState(options[0].value);
  const [addressType, setAddressType] = useState("");

  const handleChange = (e, { value }) => setOption(value);

  const isBN = address => address.substring(0, 2) === ADDRESS_TYPES.BN;

  useEffect(() => {
    if (!term) setAddressType("");
    if (isBN(term)) setAddressType(ADDRESS_TYPES.BN);
    else setAddressType(ADDRESS_TYPES.SecP);
  }, [term]);

  return (
    <div style={StylesSearchContainer}>
      <div style={StylesContentWrapper}>
        <div style={StylesInputWrapper}>
          <div>
            <h2 style={{ marginBottom: "10px" }}>
              Explore the Madnet blockchain
            </h2>
          </div>
          <div style={StylesInputContainer}>
            <div>
              <Dropdown
                onChange={handleChange}
                style={StylesDropdown}
                options={options}
                value={option}
              >
                <Dropdown.Menu style={StylesDropdownMenu}>
                  <Dropdown.Item
                    onClick={handleChange}
                    value={options[0].value}
                    style={StylesDropdownMenuItem}
                  >
                    {options[0].text}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <input
                style={StylesInput}
                value={term}
                onChange={e => setTerm(e.target.value)}
              />
            </div>
            <div style={StylesContainer}>
              <div style={StylesOffsetLabel}>Offset</div>
              <input
                style={StylesInput}
                value={offset}
                onChange={e => setOffset(e.target.value)}
              />
              <QuestionIcon style={StylesQuestionIcon} />
            </div>
            <Button
              style={StylesButton}
              onClick={() => handleSearch(term, offset)}
            >
              Search
            </Button>
          </div>
        </div>
      </div>

      {addressType && term && term.length > 0 && (
        <div style={StylesAddressType}>
          <div style={StylesCircle} />
          <div>
            <h3>This Is A {ADDRESS_TYPES[addressType]} Address</h3>
          </div>
        </div>
      )}
    </div>
  );
}
