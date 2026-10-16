import { useState, useMemo } from "react";
import { Articles } from "./Articles.jsx";

const parseDate = (value) => {
  if (value instanceof Date) return value.getTime();
  if (typeof value !== "string") return new Date(value).getTime();

  const dateOnly = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  if (dateOnly) {
    return Date.UTC(Number(dateOnly[1]), Number(dateOnly[2]) - 1, Number(dateOnly[3]));
  }

  const localized = /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(value.trim());
  if (localized) {
    return Date.UTC(Number(localized[3]), Number(localized[2]) - 1, Number(localized[1]));
  }

  return new Date(value).getTime();
};

const toTimestamp = (value) => {
  const time = parseDate(value);
  return Number.isNaN(time) ? -Infinity : time;
};

export const App = ({ articles }) => {
  const [sortBy, setSortBy] = useState("upvotes");

  const sortedArticles = useMemo(() => {
    const list = [...(articles ?? [])];

    if (sortBy === "upvotes") {
      return list.sort((a, b) => b.upvotes - a.upvotes);
    }

    if (sortBy === "date") {
      return list.sort((a, b) => toTimestamp(b.date) - toTimestamp(a.date));
    }

    return list;
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
