function outerHeight(element) {
  if (!element) return 0;
  const height = element.offsetHeight;
  const style = window.getComputedStyle(element);
  return ['top', 'bottom']
    .map((side) => parseInt(style[`margin-${side}`], 10))
    .reduce((total, side) => total + side, height);
}

function buildTOCSide(ul, block) {
  const sectionContainer = block.closest('.section').querySelector(':scope > .section-container');
  const mainContent = document.createElement('div');
  mainContent.classList.add('main-content');
  const tocWrapper = document.querySelector('main > .toc-container > .section-container > .toc-wrapper');
  [...sectionContainer.children].forEach((div) => {
    if (div.querySelector('.toc') === null) {
      mainContent.append(div);
    }
  });

  const h2 = mainContent.querySelectorAll('h2');
  if (ul) {
    [...ul.children].forEach((liItem, i) => {
      const h2Id = h2[i] !== null ? h2[i].id : '';
      const aLink = document.createElement('a');
      aLink.href = `#${h2Id}`;
      aLink.innerText = liItem.innerText;
      liItem.innerText = '';
      liItem.append(aLink);
    });
  }

  sectionContainer.replaceChildren(tocWrapper);
  sectionContainer.append(mainContent);

  window.addEventListener('scroll', () => {
    if (ul) {
      if (document.documentElement.scrollTop > outerHeight(document.querySelector('main > .hero-vertical-tabs-container .hero-vertical-tabs.block')) - 45
        && document.documentElement.scrollTop < document.querySelector('body').offsetHeight
        - outerHeight(document.querySelector('main .toc-container ul'))
        - outerHeight(document.querySelector('main > .contact-us'))
        - outerHeight(document.querySelector('main > .about-us'))
        - outerHeight(document.querySelector('footer'))
        - 80) {
        ul.classList.add('fixed');
      } else {
        ul.classList.remove('fixed');
      }
    }
  });
}

function buildTOCTop(ul, block) {
  block.parentElement.classList.add('flat');
  let others = false;
  let tocIndex = 0;
  [...document.querySelector('main').children].forEach((section, i) => {
    if (others) {
      const liItem = ul.querySelectorAll('li')[i - tocIndex - 1];
      if (liItem) {
        const liVar = liItem.innerText.toLowerCase();
        section.id = liVar;
        const aLink = document.createElement('a');
        aLink.href = `#${liVar}`;
        aLink.innerText = liItem.innerText;
        liItem.innerText = '';
        liItem.append(aLink);
      }
    }
    if (section.classList.contains('toc-container')) {
      others = true;
      tocIndex = i;
    }
  });
}

export default async function decorate(block) {
  const ul = block.querySelector('ul');

  if (ul) {
    block.replaceChildren(ul);
  }
  if (block.classList.contains('flat')) {
    buildTOCTop(ul, block);
  } else {
    buildTOCSide(ul, block);
  }
}
