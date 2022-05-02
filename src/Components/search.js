import { useState } from 'react';
import { Dropdown, Button } from 'semantic-ui-react';
import { ReactComponent as Icon1 } from '../assets/searchIcon1.svg';
import { ReactComponent as Icon2 } from '../assets/searchIcon2.svg';
import { ReactComponent as Icon3 } from '../assets/searchIcon3.svg';

const options = [
    { key: 1, text: 'Block', value: 1 },
    { key: 2, text: 'Tx', value: 2 },
  ]

function AliceNetSearch({ handleSearch }){
    const [term, setTerm] = useState('')
    const [option, setOption] = useState(options[0].value)

    const handleChange = (e, { value }) => setOption(value)

    return <div className='bg-darkGrey p-10 w-11/12 m-auto rounded'>
        <div className='flex items-center'>
            <div className='w-full text-left'>
                <div>
                    <h2 className='mb-5'>Explore the Madnet blockchain</h2>
                </div>
                <div>
                    <Dropdown 
                        onChange={handleChange}
                        className='max-h-5 bg-lightGrey text-neutral-800 px-6 py-3 rounded rounded-tr-none rounded-br-none'
                        options={options}
                        value={option}
                    >
                        <Dropdown.Menu className='rounded rounded-t-none rounded-tl-none w-[calc(100%_-_1rem)] '>
                            <Dropdown.Item onClick={handleChange} value={options[0].value} className='bg-darkGrey'>{options[0].text}</Dropdown.Item>
                            <Dropdown.Item onClick={handleChange} value={options[1].value} className='bg-darkGrey'>{options[1].text}</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <input placeholder={option === options[0].value ? 'Block number' : 'Tx hash'} 
                            className='w-3/4 h-px py-5 border border-solid border-darkGrey indent-2 ' 
                            value={term} 
                            onChange={(e) => setTerm(e.target.value)}/>
                    <Button className='bg-primary rounded rounded-l-none text-neutral-800' onClick={() => handleSearch(term)}>Search</Button>
                </div>
            </div>
            <div className='flex items-center'>
                <Icon1 className='mr-5'/>
                <Icon2 className='mr-5'/>
                <Icon3 className='mr-5'/>
            </div>
        </div>
    </div>
}

export default AliceNetSearch;