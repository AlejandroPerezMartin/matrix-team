import { MatrixTeamPage } from './app.po';

describe('matrix-team App', function() {
  let page: MatrixTeamPage;

  beforeEach(() => {
    page = new MatrixTeamPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
