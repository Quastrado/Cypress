import {locators} from './locators.json'

export class BasePage {
    constructor () {
        this.base = locators;
    }

    get inputField() {
        return cy.get(this.base.inputField);
    }

    get errorText() {
        return cy.get(this.base.error_text);
    }

    /** 
     * Метод для ввода текста в поле
     * @param {number} index - индекс поля для ввода
     * @param {string} text - вводимый текст
     */
    typeInField(index, text) {
        this.inputField.eq(index).scrollIntoView().clear().type(text);

    }

    /**
     * Метод для клика на элемент
     * @param {string} getter - гет-метод необходимого элемента
     * @param {number} index - порядковый индекс элемента
     */
    clickButton(getter, index = 0) {
        this[getter].eq(index).scrollIntoView().click();
    }

    /**
     * Метод для проверки текста в элементах
     * @param {string} getter - гет-метод необходимого элемента
     * @param {string} text - текст для сравнения
     * @param {number} index - порядковый метод элемента
     */
    checkElemText(getter, text, index = 0) {
        this[getter].eq(index).scrollIntoView().should('be.visible').and('contain', text);
    }

    /**
     * Метод ля проверки css свойства элемента
     * @param {string} getter - гет-метод необходимого элемента
     * @param {number} index - порядковый метод элемента
     * @param {string} css - проверяемое свойство
     * @param {string} value - значение проверяемого css свойства
     */
    checkCssForValue(getter, css, value, index = 0) {
        this[getter].eq(index).should('have.css', css, value);
    }
}