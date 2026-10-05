import React, { useEffect, useState } from "react";

export function UserList() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetch(`https://randomuser.me/api/?page=${page}&results=10`)
      .then((response) => response.json())
      .then((data) => {
        if (isMounted) {
          setUsers((prevUsers) => [...prevUsers, ...data.results]);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, [page]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.login.uuid}>
              {user.name.first} {user.name.last}
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={() => {
          setLoading(true);
          setPage((prevPage) => prevPage + 1);
        }}
      >
        Load More
      </button>
      <button
        onClick={() => {
          setLoading(true);
          setPage((prevPage) => Math.max(prevPage - 1, 1));
        }}
      >
        Load Previous
      </button>
    </div>
  );
}

/* // Example of importing and using the Articles component in another React file
// App.jsx
import React from 'react';
import Articles from './Articles';

const sampleArticles = [
  { id: 1, title: 'React Basics', upvotes: 150, date: '2024-01-15' },
  { id: 2, title: 'Understanding JSX', upvotes: 200, date: '2024-02-10' },
  { id: 3, title: 'State and Props', upvotes: 250, date: '2024-03-05' },
];

function App() {
  return (
    <div>
      <h1>Article List</h1>
      <Articles articles={sampleArticles} />
    </div>
  );
}

export default App; 
 */
