import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// articleFromFields
import ArticleFromFields from "client/components/Library/Atomic/articles/ArticleFromFields";

const testProps = {
    valid: {
        article: {
            id: 91,
            title: 'i am a heading',
            body: 'body content goes in this container',
            footer: 'footer example text'
        },
        lookupList: {
            heading: 'title',
            content: 'body',
            footer: 'footer'
        }
    },
    invalid: {

    }
}


describe('components/Libary/Atomic/articles', () => {

    test('articleFromFields() should return null when no article or lookupList passed', () => {
        const { container } = render(<ArticleFromFields {...testProps.invalid} />);
        expect(container.innerHTML).toHaveLength(0);
    });

    test('articleFromFields() should return null when no article passed', () => {
        const { container } = render(<ArticleFromFields {...testProps.invalid} {...testProps.valid.article} />);
        expect(container.innerHTML).toHaveLength(0);
    });

    test('articleFromFields() should return markup when article is passed, AND lookupList values match', () => {
        const { valid } = testProps;
        const { title, body, footer } = valid.article;

        render(<ArticleFromFields {...valid} />);

        // Get the DOM elements first
        const headingElement = screen.getByText(testProps.valid.article.title);
        const bodyElement = screen.getByText(testProps.valid.article.body);
        const footerElement = screen.getByRole('contentinfo');

        // Use textContent property instead of .text which doesn't exist
        expect(headingElement.textContent).toEqual(title);
        expect(bodyElement.textContent).toEqual(body);
        expect(footerElement.textContent).toEqual(footer);
    });

});