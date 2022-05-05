import { useEffect, useState } from "react";
import { Dropdown, Button } from "semantic-ui-react";
import { ReactComponent as QuestionIcon } from "../assets/question-icon.svg";


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
    <div className='bg-darkGrey p-10 w-11/12 m-auto rounded'>
        <div className='flex items-center'>
            <div className='w-full text-left'>
                <div>
                    <h2 className='mb-5'>Explore the Madnet blockchain</h2>
                </div>
            <div className='flex justify-between space-x-36'>
                <div className='flex items-center w-1/2 mr-5'>
                  <Dropdown
                    onChange={handleChange}
                    className='max-h-5 bg-lightGrey text-neutral-800 px-6 py-3 rounded rounded-tr-none rounded-br-none'
                    options={options}
                    value={option}
                  >
                    <Dropdown.Menu className='rounded rounded-t-none rounded-tl-none w-[calc(100%_-_1rem)] '>
                      <Dropdown.Item
                        onClick={handleChange}
                        value={options[0].value}
                        className='bg-darkGrey'
                      >
                        {options[0].text}
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                  <input
                    className='w-3/4 h-px py-5 border border-solid border-darkGrey indent-2 rounded-br rounded-tr ' 
                    value={term}
                    onChange={e => setTerm(e.target.value)}
                  />
                  </div>

                  <div className='flex items-center w-1/2'>
                    <div className="mr-2">Offset</div>
                    <input
                      className='w-3/4 h-px py-5 border border-solid border-darkGrey indent-2 rounded' 
                      value={offset}
                      onChange={e => setOffset(e.target.value)}
                    />
                    <QuestionIcon className='-ml-8 cursor-pointer'/>
                  </div>
                  <Button
                    className='bg-primary rounded text-neutral-800 w-1/12'
                    onClick={() => handleSearch(term, offset)}
                  >
                    Search
                  </Button>
              
              
              
              
            </div>
            </div>
          </div>

      {addressType && term && term.length > 0 && (
        <div className='flex items-center mr-4 my-4'>
          <div className='h-3 w-3 bg-primary rounded-full mr-2'/>
          <div>
            <h3>This Is A {ADDRESS_TYPES[addressType]} Address</h3>
          </div>
        </div>
      )}
    </div>
  );
}
