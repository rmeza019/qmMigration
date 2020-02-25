import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { EngineerComponentsPage, EngineerDeleteDialog, EngineerUpdatePage } from './engineer.page-object';

const expect = chai.expect;

describe('Engineer e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let engineerComponentsPage: EngineerComponentsPage;
  let engineerUpdatePage: EngineerUpdatePage;
  let engineerDeleteDialog: EngineerDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Engineers', async () => {
    await navBarPage.goToEntity('engineer');
    engineerComponentsPage = new EngineerComponentsPage();
    await browser.wait(ec.visibilityOf(engineerComponentsPage.title), 5000);
    expect(await engineerComponentsPage.getTitle()).to.eq('qmMigrationApp.engineer.home.title');
  });

  it('should load create Engineer page', async () => {
    await engineerComponentsPage.clickOnCreateButton();
    engineerUpdatePage = new EngineerUpdatePage();
    expect(await engineerUpdatePage.getPageTitle()).to.eq('qmMigrationApp.engineer.home.createOrEditLabel');
    await engineerUpdatePage.cancel();
  });

  it('should create and save Engineers', async () => {
    const nbButtonsBeforeCreate = await engineerComponentsPage.countDeleteButtons();

    await engineerComponentsPage.clickOnCreateButton();
    await promise.all([
      engineerUpdatePage.setEngMailInput('engMail'),
      engineerUpdatePage.setEngNameInput('engName'),
      engineerUpdatePage.setEngLastNameInput('engLastName')
    ]);
    expect(await engineerUpdatePage.getEngMailInput()).to.eq('engMail', 'Expected EngMail value to be equals to engMail');
    expect(await engineerUpdatePage.getEngNameInput()).to.eq('engName', 'Expected EngName value to be equals to engName');
    expect(await engineerUpdatePage.getEngLastNameInput()).to.eq('engLastName', 'Expected EngLastName value to be equals to engLastName');
    await engineerUpdatePage.save();
    expect(await engineerUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await engineerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Engineer', async () => {
    const nbButtonsBeforeDelete = await engineerComponentsPage.countDeleteButtons();
    await engineerComponentsPage.clickOnLastDeleteButton();

    engineerDeleteDialog = new EngineerDeleteDialog();
    expect(await engineerDeleteDialog.getDialogTitle()).to.eq('qmMigrationApp.engineer.delete.question');
    await engineerDeleteDialog.clickOnConfirmButton();

    expect(await engineerComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
