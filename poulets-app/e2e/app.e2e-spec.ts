import { PouletsDuMaraisPage } from './app.po';

describe('poulets-du-marais App', () => {
  let page: PouletsDuMaraisPage;

  beforeEach(() => {
    page = new PouletsDuMaraisPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
