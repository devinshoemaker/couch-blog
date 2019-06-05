import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getTitle() {
    return element(by.deepCss('app-root ion-title')).getText();
  }

  getPosts() {
    return element.all(by.deepCss('app-root ion-content')).getText();
  }
}
