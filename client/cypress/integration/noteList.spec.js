import { baseUrl } from '../../cypress.json';
import { notes } from '../fixtures/notes.json';

describe('Note app tests', () => {
    beforeEach(() => {
        cy.intercept({
            method: 'GET',
            url: '/notes'
        }, notes);

        cy.visit(baseUrl);
    });

    it('Should show notes correctly', () => {
        cy.get('h1').should('have.text', `Collect Your  Thoughts.`);
        
        notes.forEach((note, index) => {
            cy.get('.shorthandContent').within((element) => {
                cy.get(element)
                    .eq(index)
                    .find('.text')
                    .should('have.text', note.title);

                cy.get(element)
                    .eq(index)
                    .find('.subtext')
                    .should('have.text', note.content);

                cy.get(element)
                    .eq(index)
                    .click();
            });

            cy.get('.formContainer').within((element) => {
                cy.get(element)
                    .find('input[name=title]')
                    .should('have.value', note.title);

                cy.get(element)
                    .find('textarea[name=content]')
                    .should('have.value', note.content);
            });
        });
    });

    it('Should add a new note to the list', () => {
        const favBooks = 'Haruki Murakami - Norwegian Wood\n Haruki Murakami - Hard‑Boiled Wonderland and the End of the World\n  Leo Tolstoy - War and Peace\n Fyodor Dostoevsky - Demons\n Victor Hugo - Le Miserable'

        cy.get('.shorthandContainer').should('have.length', 2);
        cy.get('.addButtonContainer').find('button').click();

        cy.get('.formContainer').within((element) => {
            cy.get(element).find('h3.noteTitle').should('have.text', 'Give this thought a title..');
            cy.get(element).find('input[name=title]').type('Wishlist').should('have.value', 'Wishlist');
            cy.get(element).find('textarea[name=content]').type(favBooks).should('have.value', favBooks);
            
            cy.intercept('POST', '/notes', {
                statusCode: 200,
                body: {
                    "id": "99",
                    "title": "Wishlist",
                    "content": favBooks
                }            
            });

            cy.get(element).find('.saveButtonContainer > .saveButton > button').click({force: true});
        });

        cy.wait(1000)
        cy.get('.shorthandContainer').should('have.length', 3);
    });

    it('Should edit a note', () => {
        const content = "Clean the house\nWater the plants\nStudy French\nWrite some tests";
        const title = "TODO'S"
        
        cy.intercept('PUT', '/notes/1', {
            statusCode: 200,
            body: {
                "id": "1",
                "title": "TODO'S",
                "content": content
            }            
        });

        cy.get('.shorthandContainer').eq(0).click();

        cy.get('.formContainer').within((element) => {
            cy.get(element).find('h3.noteTitle').should('not.exist');
            cy.get(element).find('input[name=title]')
                .clear()
                .type(title)
                .should('have.value', title);

            cy.get(element).find('textarea[name=content]')
                .clear()
                .type(content)
                .should('have.value', content);
        });

        cy.wait(1000);

        cy.get('.shorthandContent').within((element) => {
            cy.get(element)
            .eq(0)
            .find('.text')
            .should('have.text', title);

            cy.get(element)
            .eq(0)
            .find('.subtext')
            .should('have.text', content);
        });
    });

    it('Should delete a note', () => {
        cy.intercept('PUT', '/notes/1', {
            statusCode: 200,
            body: {
                "id": "1",
                "title": "",
                "content": ""
            }            
        });

        cy.intercept('DELETE', '/notes/1', {
            statusCode: 200,
            body: {
                "id": "1",          
            }            
        });

        cy.get('.shorthandContainer').eq(0).click();

        cy.get('.formContainer').within((element) => {
            cy.get(element).find('h3.noteTitle').should('not.exist');
            cy.get(element).find('input[name=title]').clear().should('be.empty');
            cy.get(element).find('textarea[name=content]').clear().should('be.empty');
        });

        cy.wait(1000);
        cy.get('.shorthandContainer').eq(0).click();

        cy.wait(1000);
        cy.get('.shorthandContainer').should('have.length', 1);
    });
});