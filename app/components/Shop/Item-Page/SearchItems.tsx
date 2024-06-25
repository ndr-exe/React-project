import React from 'react';

export default function SearchItems({ handleSearch }: { handleSearch: (string) => void }) {
  let searchTimeout;

  function handleChange(query) {
    clearTimeout(searchTimeout);
    if (!query) return handleSearch('empty');

    searchTimeout = setTimeout(() => {
      handleSearch(query);
    }, 500);
  }
  return (
    <div>
      <input
        type="text"
        name="searchbar"
        id="searchbar"
        placeholder="Search Items..."
        className="border rounded-md px-2 py-1 text-lg"
        onChange={e => handleChange(e.target.value)}
      />
    </div>
  );
}
