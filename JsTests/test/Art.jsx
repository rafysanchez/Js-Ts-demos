import { useState, useMemo } from "react";
import { Articles } from "./Articles.jsx";

export const App = ({ articles = [] }) => {
  const [sortBy, setSortBy] = useState("upvotes");

  const sortedArticles = useMemo(() => {
    const list = [...articles];

    if (sortBy === "upvotes") {
      return list.sort((a, b) => b.upvotes - a.upvotes);
    } else {
      return list.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
    }
  }, [articles, sortBy]);

  return (
    <div className="App">
      <div className="layout-row align-items-center justify-content-center my-20">
        <span className="form-hint mb-0 text-uppercase font-weight-light">
          Sort By
        </span>
        <button
          type="button"
          data-testid="most-upvoted-link"
          aria-pressed={sortBy === "upvotes"}
          onClick={() => setSortBy("upvotes")}
        >
          Most Upvoted
        </button>
        <button
          type="button"
          data-testid="most-recent-link"
          aria-pressed={sortBy === "date"}
          onClick={() => setSortBy("date")}
        >
          Most Recent
        </button>
      </div>
      <Articles articles={sortedArticles} />
    </div>
  );
};

export default App;
