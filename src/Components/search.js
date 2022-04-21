import { useState } from 'react';
import { Dropdown, Button } from 'semantic-ui-react';
import { ReactComponent as Icon1 } from '../Assets/searchIcon1.svg';
import { ReactComponent as Icon2 } from '../Assets/searchIcon2.svg';
import { ReactComponent as Icon3 } from '../Assets/searchIcon3.svg';

const StylesIconContainer = {
    display: 'flex',
    alignItems: 'center',
    '& > svg': {
        margin: '0 15px'
    }
}

const StylesSearchContainer = { 
    backgroundColor: '#2D2D2D', 
    padding: '30px', 
    width: '90%',
    borderRadius: '5px'
}

const StylesContentWrapper = { 
    display: 'flex', 
    alignItems: 'center' 
}

const StylesInputWrapper = { 
    width: '100%', 
    textAlign: 'left'
}

const StylesInput = {
    width: '70%',
    height: '34px',
    border: '1px solid #383838',
    padding: '0 10px',
}

const StylesButton = {
    background: '#00FFD1',
    borderRadius: '0 4px 4px 0',
    color: '#0A0B09'
}

const StylesDropdown = {
    background: '#DEDEDE',
    color: 'black',
    padding: '8px 20px',
    borderRadius: '4px 0px 0px 4px',
}

const StylesDropdownMenu = {
    width: 'calc(100% - 2px)',
    borderRadius: '0 0 4px 4px',
}

const StylesDropdownMenuItem = {
    backgroundColor: '#2D2D2D'
}

const StylesIcon = {
    marginRight: '10px'
}

const options = [
    { key: 1, text: 'Block', value: 1 },
    { key: 2, text: 'Tx', value: 2 },
  ]

function Search({ handleSearch }){
    const [term, setTerm] = useState('')
    const [option, setOption] = useState(options[0].value)

    const handleChange = (e, { value }) => setOption(value)

    return <div style={StylesSearchContainer}>
        <div style={StylesContentWrapper}>
            <div style={StylesInputWrapper}>
                <div>
                    <h2 style={{ marginBottom: '10px' }}>Explore the Madnet blockchain</h2>
                </div>
                <div>
                    <Dropdown 
                        onChange={handleChange}
                        style={StylesDropdown} 
                        options={options}
                        value={option}
                    >
                        <Dropdown.Menu style={StylesDropdownMenu}>
                            <Dropdown.Item onClick={handleChange} value={options[0].value} style={StylesDropdownMenuItem}>Block</Dropdown.Item>
                            <Dropdown.Item onClick={handleChange} value={options[1].value} style={StylesDropdownMenuItem}>Tx</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <input placeholder={option === options[0].value ? 'Block number' : 'Tx hash'} style={StylesInput} value={term} onChange={(e) => setTerm(e.target.value)}/>
                    <Button style={StylesButton} onClick={() => handleSearch(term)}>Search</Button>
                </div>
            </div>
            <div style={StylesIconContainer}>
                <Icon1 style={StylesIcon}/>
                <Icon2 style={StylesIcon}/>
                <Icon3 style={StylesIcon}/>
            </div>
        </div>
    </div>
}

export default Search;