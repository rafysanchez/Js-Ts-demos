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
