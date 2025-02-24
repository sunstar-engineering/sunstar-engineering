import { getMetadata } from '../../scripts/lib-franklin.js';

const getSocialURL = (type) => {
  let anchorHref;
  const currPath = document.location.href;
  const pageName = getMetadata('pagename') || '';
  const source = 'Sunstar Engineering';

  switch (type) {
    case 'facebook':
      anchorHref = `https://www.facebook.com/sharer?u=${currPath}&t=${pageName}`;
      break;
    case 'linkedin':
      anchorHref = `https://www.linkedin.com/shareArticle?mini=true&url=${currPath}&title=${pageName}&source=${source}`;
      break;
    case 'twitter':
      anchorHref = `https://twitter.com/intent/tweet?text=${pageName}&url=${currPath}`;
      break;
    default:
      anchorHref = '';
      break;
  }

  return anchorHref;
};

/**
 * decorates the social block
 * @param {Element} block The social block element
 */
export default async function decorate(block) {
  const childs = Array.from(block.children);
  const spanWithImg = [];

  childs.forEach((x) => {
    const span = document.createElement('span');
    const newAnchor = document.createElement('a');
    const firstGrandChild = x.querySelector('div');
    const firstGrandChildLower = firstGrandChild.innerText.toLowerCase();
    const anchorHref = getSocialURL(firstGrandChildLower);
    newAnchor.href = anchorHref.replaceAll(/%5C%5C&/g, '&'); // Replacing extra backslash which is getting appended
    newAnchor.setAttribute('aria-label', `${firstGrandChildLower} share`);
    span.classList.add(`icon-${firstGrandChildLower}`, 'icon');
    newAnchor.appendChild(span);
    spanWithImg.push(newAnchor);
  });

  block.innerHTML = '';
  const span = document.createElement('span');
  span.innerText = 'SHARE';
  block.appendChild(span);

  spanWithImg.forEach((x) => {
    block.appendChild(x);
  });
}
