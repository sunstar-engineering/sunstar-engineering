import { fetchIndex } from '../../scripts/scripts.js';

export async function getLatestNewsArticleInt(ffunc) {
  const json = await ffunc('query-index');

  const result = json.data
    .filter((entry) => entry.path.startsWith('/news/'))
    .sort((x, y) => x.lastModified - y.lastModified);

  if (!result.length) {
    return null;
  }

  return result[0];
}

function getLatestNewsArticle() {
  return getLatestNewsArticleInt(fetchIndex);
}

export default async function decorate(block) {
  const article = await getLatestNewsArticle();
  if (!article) {
    return;
  }

  const title = 'News'; // TODO obtain from placeholders i18n
  const dt = new Date(article.lastModified * 1000);
  const date = dt.toLocaleDateString('en', { year: 'numeric', month: 'long', day: 'numeric' });

  const newsHTML = `<span>${title}</span> <span>${date}</span>
    <a href="${article.path}">${article.title}</a>`;
  block.innerHTML = newsHTML;
}
