/**
 * @typedef {Object} Article
 * @property {string|number} [id]
 * @property {string} title
 * @property {number} upvotes
 * @property {string|Date} date
 */

/**
 * @param {{ articles?: Article[] | null }} props
 */
export function Articles({ articles }) {
  const validArticles = (articles ?? []).filter(Boolean);

  return (
    <div className="card w-50 mx-auto">
      <table aria-label="Lista de artigos">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Upvotes</th>
            <th scope="col">Date</th>
          </tr>
        </thead>
        <tbody>
          {validArticles.length === 0 ? (
            <tr>
              <td colSpan={3} className="text-center py-4">
                Nenhum artigo encontrado.
              </td>
            </tr>
          ) : (
            validArticles.map((article, index) => (
              <tr
                data-testid="article"
                key={article.id ?? `${article.title}-${article.date}-${index}`}
              >
                <td data-testid="article-title">{article.title}</td>
                <td data-testid="article-upvotes">
                  {typeof article.upvotes === "number"
                    ? article.upvotes.toLocaleString()
                    : article.upvotes}
                </td>
                <td data-testid="article-date">{String(article.date)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Articles;
