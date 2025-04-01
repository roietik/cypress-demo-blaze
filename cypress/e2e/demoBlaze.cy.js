/// <reference types='cypress' />
import { faker } from '@faker-js/faker';

describe('Bank app', () => {
  let username;
  let password;
  before(() => {
    username = faker.internet.userName();
    password = faker.internet.password();
  });
  beforeEach(() => {
    cy.visit('/');
  });

  it('should register', () => {
    const stub = cy.stub();
    cy.on('window:alert', stub);
    cy.get('#signin2').click();
    cy.wait(2000);
    cy.get('#sign-username').type(username);
    cy.get('#sign-password').type(password);
    cy.contains('.btn', 'Sign up').click();
    cy.wait(2000);
    cy.then(() => {
      expect(stub).to.be.calledWith('Sign up successful.');
    });
  });

  it('should login', () => {
    cy.get('#login2').click();
    cy.wait(2000);
    cy.get('#loginusername').type(username);
    cy.get('#loginpassword').type(password);
    cy.contains('.btn', 'Log in').click();
    cy.wait(2000);
    cy.get('.nav-link').should('contain', `Welcome ${username}`);
  });

  it('should adding Samsung Galaxy s6 to the cart', () => {
    const stub = cy.stub();
    cy.on('window:alert', stub);
    cy.get('a.hrefch').contains('Samsung galaxy s6').click();
    cy.wait(2000);
    cy.get('.btn').contains('Add to cart').click();
    cy.wait(2000);

    cy.then(() => {
      expect(stub).to.be.calledWith('Product added');
    });
  });
});
