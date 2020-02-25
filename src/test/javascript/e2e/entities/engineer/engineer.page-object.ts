import { element, by, ElementFinder } from 'protractor';

export class EngineerComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-engineer div table .btn-danger'));
  title = element.all(by.css('jhi-engineer div h2#page-heading span')).first();

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class EngineerUpdatePage {
  pageTitle = element(by.id('jhi-engineer-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  engMailInput = element(by.id('field_engMail'));
  engNameInput = element(by.id('field_engName'));
  engLastNameInput = element(by.id('field_engLastName'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setEngMailInput(engMail: string): Promise<void> {
    await this.engMailInput.sendKeys(engMail);
  }

  async getEngMailInput(): Promise<string> {
    return await this.engMailInput.getAttribute('value');
  }

  async setEngNameInput(engName: string): Promise<void> {
    await this.engNameInput.sendKeys(engName);
  }

  async getEngNameInput(): Promise<string> {
    return await this.engNameInput.getAttribute('value');
  }

  async setEngLastNameInput(engLastName: string): Promise<void> {
    await this.engLastNameInput.sendKeys(engLastName);
  }

  async getEngLastNameInput(): Promise<string> {
    return await this.engLastNameInput.getAttribute('value');
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class EngineerDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-engineer-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-engineer'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
