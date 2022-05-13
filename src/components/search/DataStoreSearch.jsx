import { useEffect, useState } from "react";
import { Dropdown, Button } from "semantic-ui-react";
import { HelpTooltip } from 'components';
import styles from './DataStoreSearch.module.scss';
import { useHistory } from "react-router-dom";

const options = [{ key: 1, text: "DataStores", value: 1 }];

const ADDRESS_TYPES = { BN: "BN", SecP: "SecP" };

export function DataStoreSearch() {
  const history = useHistory();

  const [term, setTerm] = useState("");
  const [offset, setOffset] = useState("");
  const [option, setOption] = useState(options[0].value);
  const [addressType, setAddressType] = useState("");

  const handleChange = (e, { value }) => setOption(value);

  const handleSearch = () => history.push(`/data?address=${term}&curve=${addressType === ADDRESS_TYPES ? 2 : 1}${offset && `&offset=${offset.padStart(64, '0')}`}`);

  const isBN = address => address.substring(0, 2) === ADDRESS_TYPES.BN;

  useEffect(() => {
    if (!term) setAddressType("");
    if (isBN(term)) setAddressType(ADDRESS_TYPES.BN);
    else setAddressType(ADDRESS_TYPES.SecP);
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
                    onChange={handleChange}
                    className={styles.dropdown}
                    options={options}
                    value={option}
                  >
                    <Dropdown.Menu className={styles.menu}>
                      <Dropdown.Item
                        onClick={handleChange}
                        value={options[0].value}
                        className={styles.option}
                      >
                        {options[0].text}
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <input
                    className={styles.input}
                    value={term}
                    onChange={e => setTerm(e.target.value)}
                    placeholder='Address'
                  />
                  </div>

                  <div className={styles.inputSection}>
                    <div className="mr-2">Offset</div>
                    <input
                      className={styles.inputOffset}
                      value={offset}
                      onChange={e => setOffset(e.target.value)}
                      placeholder='(optional)'
                    />
                    <HelpTooltip type="offset"/>
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

      {addressType && term && term.length > 0 && (
        <div className={styles.addressType}>
          <div className={styles.greenDot}/>
          <h3>This Is A {ADDRESS_TYPES[addressType]} Address</h3>
          {addressType === ADDRESS_TYPES.BN ? <HelpTooltip type="bn"/> : <HelpTooltip type="secp"/>}
        </div>
      )}
    </div>
  );
}
