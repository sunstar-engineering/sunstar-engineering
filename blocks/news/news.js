
async function getLatestNewsArticle() {
  const resp = await fetch(`${window.location.origin}/query-index.json`);
  const json = await resp.json();

  const result = json.data
    .filter((entry) => entry.path.startsWith('/news/'))
    .sort((x, y) => x.lastModified - y.lastModified);

  if (!result.length) {
    return null;
  }

  return result[0];
}

export default async function decorate(block) {
  // el.innerText = 'News!';
  const article = await getLatestNewsArticle();
  if (!article) {
    return;
  }

  // Use text to specify the html
  const dt = new Date(article.lastModified * 1000);

  const newsHTML = `News ${dt}`;
  const titleSpan = document.createElement('span');
  titleSpan.innerText = 'News'; // TODO i18n
  // block.appendChild(titleSpan);

  const dateSpan = document.createElement('span');
  dateSpan.innerText = dt.toLocaleDateString('en', { year: 'numeric', month: 'long', day: 'numeric' });
  // block.appendChild(dateSpan);

  const link = document.createElement('a');
  link.href = article.path;
  link.innerText = article.title;
  // block.appendChild(link);
  block.innerHTML = newsHTML;
}
