import React from "react";

interface SearchInputProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ searchQuery, setSearchQuery }) => {
    return (
        <div className="search-input-container">
            <input
                type="text"
                placeholder="Hae maa..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
            />
        </div>
    );
};

export default SearchInput;
