import React, { useState } from 'react';
import '../App.css'

interface SearchBarProps {
    onSearchTermChange: (term: string) => void;
}

function SearchBar({ onSearchTermChange }: SearchBarProps){

    const [inputValue, setInputValue] = useState('');
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setInputValue(newValue);
        onSearchTermChange(newValue); // Call the passed callback function with the new search term
    };

    return (
        <div >
            <input className="search-bar"
                type="text"
                placeholder="Search..."
                value={inputValue}
                onChange={handleInputChange}
            />
        </div>
    );
}

export default SearchBar;