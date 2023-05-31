/* eslint-disable no-unused-expressions */
/* global describe it */

import { expect } from '@esm-bundle/chai';
import { getLatestNewsArticleInt } from '../../../blocks/news/news.js';

describe('News Block', () => {
  it('Latest news article', async () => {
    let idxName = '';
    const ffunc = (nm) => {
      idxName = nm;

      return {
        data: [
          { path: '/news/b/', title: 'b', lastModified: 1685443972 },
          { path: '/news/a/', title: 'a', lastModified: 1685443971 },
          { path: '/c/news/', title: 'c', lastModified: 1685443970 },
        ],
      };
    };

    const latest = await getLatestNewsArticleInt(ffunc);

    expect(idxName).to.equal('query-index');
    expect(latest.title).to.equal('a');
  });
});
