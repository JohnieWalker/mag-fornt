import { BmsWexProjectPage } from './app.po';

describe('bms-wex-project App', function() {
  let page: BmsWexProjectPage;

  beforeEach(() => {
    page = new BmsWexProjectPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('bms works!');
  });
});
