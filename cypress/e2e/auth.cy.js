import {AuthPage} from "../helpers/auth.page";

describe('Тесты авторизации', () => {
    const pageAuth = new AuthPage();

    beforeEach(() => {
        cy.intercept('POST', 'trainers/auth').as('postAuth');
        cy.visit('/');
    })


    it('Авторизация с корректными логином/паролем', () => {
       pageAuth.typeInField(0, Cypress.env().login);
       pageAuth.typeInField(1, Cypress.env().password);
       pageAuth.clickButton('buttonEnter');
       cy.wait('@postAuth').its('response.statusCode').should('eq', 200);
    });
    
    // it('Авторизация с пустыми логином/паролем', () => {
    //     pageAuth.typeInField(0, '{backspace}');
    //     pageAuth.typeInField(1, '{backspace}');
    //     pageAuth.clickButton('buttonEnter');
    //     pageAuth.checkElemText('errorText', 'Введите почту');
    //     pageAuth.checkElemText('errorText', 'Введите пароль', 1);
    //     pageAuth.checkCssForValue('errorText', 'color', pageAuth.base.error_color);
    //     pageAuth.checkCssForValue('errorText', 'color', pageAuth.base.error_color, 1);
    //  });

    //  it('Авторизация с некорректной почтой', () => {
    //     pageAuth.typeInField(0, 'wrong_emil');
    //     pageAuth.typeInField(1, Cypress.env().password);
    //     pageAuth.clickButton('buttonEnter');
    //     pageAuth.checkElemText('errorText', 'Введите почту');
    //     pageAuth.checkCssForValue('errorText', 'color', pageAuth.base.error_color);       
    //  });

    //  it('Авторизация с некорректным паролем', () => {
    //     pageAuth.typeInField(0, Cypress.env().login);
    //     pageAuth.typeInField(1, 'wrong_password');
    //     pageAuth.clickButton('buttonEnter');
    //     cy.wait('@postAuth').its('response.statusCode').should('eq', 400);
    //     pageAuth.checkElemText('errorText', 'Неверные логин или пароль', 2);
    //     pageAuth.checkCssForValue('errorText', 'color', pageAuth.base.error_color, 2);       
    //  });

    // Параметризация 2, 3, 4 тестов

     [
        ['Авторизация с пустыми логином/паролем', '{backspace}', '{backspace}', [
            [0, 'Введите почту'],
            [1, 'Введите пароль']
        ]],
        ['Авторизация с некорректной почтой', 'wrong_email', Cypress.env().password, [
            [0, 'Введите почту']
        ]],
        ['Авторизация с некорректным паролем', Cypress.env().login, 'wrong_email', [
            [2, 'Неверные логин или пароль']
        ]],        
     ].forEach((type) => {
        it(type[0], () => {
            pageAuth.typeInField(0, type[1]);
            pageAuth.typeInField(1, type[2]);
            pageAuth.clickButton('buttonEnter');

            if (type[0].includes('Авторизация с некорректным паролем')) {
                cy.wait('@postAuth').its('response.statusCode').should('eq', 400);
            }

            type[3].forEach(error => {
                pageAuth.checkElemText('errorText', error[1], error[0]);
                pageAuth.checkCssForValue('errorText', 'color', pageAuth.base.error_color, error[0]);
            });           
        });
     });

});