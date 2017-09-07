import { ClientAlbumsPage } from './app.po';

describe('client-albums App', () => {
  let page: ClientAlbumsPage;

  beforeEach(() => {
    page = new ClientAlbumsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
