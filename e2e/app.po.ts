import { browser, element, by } from 'protractor';

export class BmsWexProjectPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('bms-root h1')).getText();
  }
}
