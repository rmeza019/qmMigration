import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SRCaseComponentsPage, SRCaseDeleteDialog, SRCaseUpdatePage } from './sr-case.page-object';

const expect = chai.expect;

describe('SRCase e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let sRCaseComponentsPage: SRCaseComponentsPage;
  let sRCaseUpdatePage: SRCaseUpdatePage;
  let sRCaseDeleteDialog: SRCaseDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load SRCases', async () => {
    await navBarPage.goToEntity('sr-case');
    sRCaseComponentsPage = new SRCaseComponentsPage();
    await browser.wait(ec.visibilityOf(sRCaseComponentsPage.title), 5000);
    expect(await sRCaseComponentsPage.getTitle()).to.eq('qmMigrationApp.sRCase.home.title');
  });

  it('should load create SRCase page', async () => {
    await sRCaseComponentsPage.clickOnCreateButton();
    sRCaseUpdatePage = new SRCaseUpdatePage();
    expect(await sRCaseUpdatePage.getPageTitle()).to.eq('qmMigrationApp.sRCase.home.createOrEditLabel');
    await sRCaseUpdatePage.cancel();
  });

  it('should create and save SRCases', async () => {
    const nbButtonsBeforeCreate = await sRCaseComponentsPage.countDeleteButtons();

    await sRCaseComponentsPage.clickOnCreateButton();
    await promise.all([
      sRCaseUpdatePage.setSrNumberInput('5'),
      sRCaseUpdatePage.setSeverityInput('severity'),
      sRCaseUpdatePage.setTypeInput('type'),
      sRCaseUpdatePage.caseOwnerSelectLastOption()
    ]);
    expect(await sRCaseUpdatePage.getSrNumberInput()).to.eq('5', 'Expected srNumber value to be equals to 5');
    expect(await sRCaseUpdatePage.getSeverityInput()).to.eq('severity', 'Expected Severity value to be equals to severity');
    expect(await sRCaseUpdatePage.getTypeInput()).to.eq('type', 'Expected Type value to be equals to type');
    await sRCaseUpdatePage.save();
    expect(await sRCaseUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await sRCaseComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last SRCase', async () => {
    const nbButtonsBeforeDelete = await sRCaseComponentsPage.countDeleteButtons();
    await sRCaseComponentsPage.clickOnLastDeleteButton();

    sRCaseDeleteDialog = new SRCaseDeleteDialog();
    expect(await sRCaseDeleteDialog.getDialogTitle()).to.eq('qmMigrationApp.sRCase.delete.question');
    await sRCaseDeleteDialog.clickOnConfirmButton();

    expect(await sRCaseComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
