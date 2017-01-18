import { EnigmaTestPage } from './app.po';

describe('ng2-enigma App', function() {
  let page: EnigmaTestPage;

  beforeEach(() => {
    page = new EnigmaTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
