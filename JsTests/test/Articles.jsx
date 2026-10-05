export function Articles({ articles = [] }) {
  return (
    <div className="card w-50 mx-auto">
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Upvotes</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article, index) => (
            <tr
              data-testid="article"
              key={article.id ?? `${article.title}-${article.date}-${index}`}
            >
              <td data-testid="article-title">{article.title}</td>
              <td data-testid="article-upvotes">{article.upvotes}</td>
              <td data-testid="article-date">{article.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Articles;

// gere um exemplo de importacao e uso do componente Articles em outro arquivo React

/* ```jsx
// App.jsx
import React from 'react';
import Articles from './Articles';

const sampleArticles = [
  { id: 1, title: 'React Basics', upvotes: 150, date: '2024-01-15' },
  { id: 2, title: 'Understanding JSX', upvotes: 200, date: '2024-02-10' },
  { id: 3, title: 'State and Props', upvotes: 250, date: '2024-03-05' },
];
 */
