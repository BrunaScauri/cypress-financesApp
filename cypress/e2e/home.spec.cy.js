/// <reference types="cypress" />
import { format, prepareLocalStorage } from '../support/utils';

context('Dev Finances', () => {
  beforeEach(() => {
    cy.visit('https://devfinance-agilizei.netlify.app/', {
      onBeforeLoad: (win) => {
        prepareLocalStorage(win);
      }
    }); 
  });

  it('1 - Cadastro de entrada de dinheiro aparece na tela', () => {
    cy.get('#transaction .button').click();
    cy.get('#description').type('Mesada');
    cy.get('[name=amount').type(12); 
    cy.get('[type=date]').type('2022-12-31');
    cy.get('button').contains('Salvar').click(); 

    cy.get('#data-table tbody tr').should('have.length', 3);
  });

  it('2 - Cadastro de saída de dinheiro aparece na tela', () => {
    cy.get('#transaction .button').click();
    cy.get('#description').type('Mesada');
    cy.get('[name=amount').type(-12);
    cy.get('[type=date]').type('2022-12-31');
    cy.get('button').contains('Salvar').click(); 

    cy.get('#data-table tbody tr').should('have.length', 3);
  });

  it('3 - Remover entradas e saídas', () => {
    const entradaTexto = 'Mesada';
    const saidaTexto = 'Suco Kapo';

    // cy.viewport(411, 823);
    // cy.get('#transaction .button').click(); // id + classe
    // cy.get('#description').type(entradaTexto); // id
    // cy.get('[name=amount').type(100); // atributo
    // cy.get('[type=date]').type('2022-12-31'); // atributo
    // cy.get('button').contains('Salvar').click(); // tipo e valor

    // cy.get('#transaction .button').click();
    // cy.get('#description').type(saidaTexto);
    // cy.get('[name=amount').type(-120);
    // cy.get('[type=date]').type('2022-12-31');
    // cy.get('button').contains('Salvar').click();

    cy.get('td.description').contains(entradaTexto).parent().find('img[onclick*=remove]')
    cy.get('td.description').contains(saidaTexto).parent().find('img[onclick*=remove]')
      .click(); 

    cy.get('#data-table tbody tr').should('have.length', 0);
  });

  it.skip('4 - Validar saldo com diversas transações', () => {
    let incomes = 0;
    let expenses = 0;

    cy.get('#data-table tbody tr').each(($el, index, $list) => { // cypress não consegue achar a tabela no site
      cy.get($el).find('td.income, td.expense').invoke('text').then((text) => {
        if (text.includes('-')) {
          expenses += format(text);
        } else {
          incomes += format(text);
        }
      });
    });

    cy.get('#totalDisplay').invoke('text').then((text) => {
      let formattedTotalDisplay = format(text)
      let expectedTotal = incomes + expenses

      expect(formatedTotalDisplay).to.eq(expectedTotal);
    });
  });
});
