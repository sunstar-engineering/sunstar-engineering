/**
 * This function finds an element with the given name specified as text in the block
 * It then returns the sibling element _after_ it, which is the data associated with
 * the named element.
 *
 * @param {HTMLElement} block The block to look in
 * @param {string} name The name (case-insensitive)
 * @returns The element after the element that contains the name as text
 */
function getNamedValueFromTable(block, name) {
  // This XPath finds the div that has the name. It uses the XPath translate function to make
  // the lookup case-insensitive.
  return document.evaluate(
    `//div/text()[translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz') = '${name.toLowerCase()}']/parent::div/parent::div/div[2]`,
    block,
    null,
    XPathResult.ANY_TYPE,
    null,
  ).iterateNext();
}

function getImage(block) {
  const div = getNamedValueFromTable(block, 'Image');
  div.classList.add('hero-horiz-tabs-img');
  return div;
}

function normalizeURL(url) {
  // TODO remove
  const nurl = url.replace('_drafts/bosschae', 'global-network');

  if (nurl.endsWith('/')) {
    return nurl;
  }
  return nurl.concat('/');
}

function getTabs(block) {
  // const tabs = document.createElement('div');
  // const ul = document.createElement('ul');
  // tabs.appendChild(ul);

  // const div = getNamedValueFromTable(block, 'tabs');

  // div.querySelectorAll('ul li').forEach((li) => {
  //   ul.appendChild(li);
  // });

  // return tabs;
  // const div = getNamedValueFromTable(block, 'tabs');
  // div.classList.add('hero-horiz-tabs-tabs');
  // return div;

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
  // const tablist = document.createElement('div');
  // const heroImage = document.createElement('div');
  // taglist.classList.add('hero-vertical-tabs-taglist');
  // heroImage.classList.add('hero-vertical-tabs-background-image');
  // buildTaglist(taglist, block);
  // buildImageAndContent(heroImage, block);

  const text = getText(block);
  const image = getImage(block);
  const tabs = getTabs(block);

  const leftDiv = document.createElement('div');
  leftDiv.classList.add('hero-horiz-tabs-panel');
  leftDiv.append(text);
  leftDiv.append(tabs);

  block.replaceChildren(leftDiv);
  block.append(image);
  // block.append(tabs);
}
