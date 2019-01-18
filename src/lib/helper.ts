export class Helper {
  /**
   * Создание элемента DOM из текста HTML
   * @param {string | HTMLElement} html
   * @param {Document} doc
   * @returns {HTMLElement}
   */
  static dom(html: string | HTMLElement, doc: Document): HTMLElement {
    if (html instanceof (<any>doc.defaultView).HTMLElement) {
      return <HTMLElement>html;
    }

    const div: HTMLDivElement = doc.createElement('div');

    div.innerHTML = <string>html;

    return (div.firstChild !== div.lastChild || !div.firstChild) ? div : <HTMLElement>div.firstChild;
  }
}
