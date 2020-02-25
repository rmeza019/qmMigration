import { element, by, ElementFinder } from 'protractor';

export class SRCaseComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-sr-case div table .btn-danger'));
  title = element.all(by.css('jhi-sr-case div h2#page-heading span')).first();

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

export class SRCaseUpdatePage {
  pageTitle = element(by.id('jhi-sr-case-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));
  srNumberInput = element(by.id('field_srNumber'));
  severityInput = element(by.id('field_severity'));
  typeInput = element(by.id('field_type'));
  caseOwnerSelect = element(by.id('field_caseOwner'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setSrNumberInput(srNumber: string): Promise<void> {
    await this.srNumberInput.sendKeys(srNumber);
  }

  async getSrNumberInput(): Promise<string> {
    return await this.srNumberInput.getAttribute('value');
  }

  async setSeverityInput(severity: string): Promise<void> {
    await this.severityInput.sendKeys(severity);
  }

  async getSeverityInput(): Promise<string> {
    return await this.severityInput.getAttribute('value');
  }

  async setTypeInput(type: string): Promise<void> {
    await this.typeInput.sendKeys(type);
  }

  async getTypeInput(): Promise<string> {
    return await this.typeInput.getAttribute('value');
  }

  async caseOwnerSelectLastOption(): Promise<void> {
    await this.caseOwnerSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async caseOwnerSelectOption(option: string): Promise<void> {
    await this.caseOwnerSelect.sendKeys(option);
  }

  getCaseOwnerSelect(): ElementFinder {
    return this.caseOwnerSelect;
  }

  async getCaseOwnerSelectedOption(): Promise<string> {
    return await this.caseOwnerSelect.element(by.css('option:checked')).getText();
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

export class SRCaseDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-sRCase-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-sRCase'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
