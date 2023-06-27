import { getNamedValueFromTable } from '../../scripts/scripts.js';

function normalizeURL(url) {
  if (url.endsWith('/')) {
    return url;
  }
  return url.concat('/');
}

function getImage(block) {
  const div = getNamedValueFromTable(block, 'Image');
  div.classList.add('hero-horiz-tabs-img');
  return div;
}

function getTabs(block) {
  const tabs = document.createElement('nav');
  const div = getNamedValueFromTable(block, 'tabs');

  div.querySelectorAll('ul > li > a').forEach((a) => {
    if (normalizeURL(a.href) === normalizeURL(window.location.href)) {
      a.classList.add('current');
    }
    tabs.appendChild(a);
  });
  return tabs;
}

function getText(block) {
  const div = getNamedValueFromTable(block, 'Contents');
  div.classList.add('hero-horiz-tabs-text');
  return div;
}

export default async function decorate(block) {
  const text = getText(block);
  const image = getImage(block);
  const tabs = getTabs(block);

  const leftDiv = document.createElement('div');
  leftDiv.classList.add('hero-horiz-tabs-panel');
  leftDiv.append(text);
  leftDiv.append(tabs);

  block.replaceChildren(leftDiv);
  block.append(image);
}
