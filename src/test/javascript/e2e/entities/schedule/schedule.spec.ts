import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ScheduleComponentsPage, ScheduleDeleteDialog, ScheduleUpdatePage } from './schedule.page-object';

const expect = chai.expect;

describe('Schedule e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let scheduleComponentsPage: ScheduleComponentsPage;
  let scheduleUpdatePage: ScheduleUpdatePage;
  let scheduleDeleteDialog: ScheduleDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Schedules', async () => {
    await navBarPage.goToEntity('schedule');
    scheduleComponentsPage = new ScheduleComponentsPage();
    await browser.wait(ec.visibilityOf(scheduleComponentsPage.title), 5000);
    expect(await scheduleComponentsPage.getTitle()).to.eq('qmMigrationApp.schedule.home.title');
  });

  it('should load create Schedule page', async () => {
    await scheduleComponentsPage.clickOnCreateButton();
    scheduleUpdatePage = new ScheduleUpdatePage();
    expect(await scheduleUpdatePage.getPageTitle()).to.eq('qmMigrationApp.schedule.home.createOrEditLabel');
    await scheduleUpdatePage.cancel();
  });

  it('should create and save Schedules', async () => {
    const nbButtonsBeforeCreate = await scheduleComponentsPage.countDeleteButtons();

    await scheduleComponentsPage.clickOnCreateButton();
    await promise.all([
      scheduleUpdatePage.setDayInput('day'),
      scheduleUpdatePage.setStartTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      scheduleUpdatePage.setEndTimeInput('01/01/2001' + protractor.Key.TAB + '02:30AM')
    ]);
    expect(await scheduleUpdatePage.getDayInput()).to.eq('day', 'Expected Day value to be equals to day');
    expect(await scheduleUpdatePage.getStartTimeInput()).to.contain(
      '2001-01-01T02:30',
      'Expected startTime value to be equals to 2000-12-31'
    );
    expect(await scheduleUpdatePage.getEndTimeInput()).to.contain('2001-01-01T02:30', 'Expected endTime value to be equals to 2000-12-31');
    await scheduleUpdatePage.save();
    expect(await scheduleUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await scheduleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Schedule', async () => {
    const nbButtonsBeforeDelete = await scheduleComponentsPage.countDeleteButtons();
    await scheduleComponentsPage.clickOnLastDeleteButton();

    scheduleDeleteDialog = new ScheduleDeleteDialog();
    expect(await scheduleDeleteDialog.getDialogTitle()).to.eq('qmMigrationApp.schedule.delete.question');
    await scheduleDeleteDialog.clickOnConfirmButton();

    expect(await scheduleComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
