import axios from "axios";
import React, { useEffect, useState } from "react";

export default function () {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (query) {
      axios
        .get(`https://api.github.com/search/users?q="${query}"`)
        .then((res) => res.data.items)
        .then((users) => setSearchResults(users))
        .catch((err) => {
          console.error(err.response.data);
        });
    } else {
      setSearchResults([]);
    }
  }, [query]);

  return (
    <div>
      <h2>Search for github users</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {searchResults.map((githubUser) => (
        <div key={githubUser.login}>{githubUser.login} </div>
      ))}
    </div>
  );
}
