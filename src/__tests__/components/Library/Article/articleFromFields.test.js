import { render, screen } from '@testing-library/react';

// articleFromFields
import ArticleFromFields from "components/Library/Atomic/articles/ArticleFromFields";

const testProps = {
    valid: {
        article: {
            id: 91,
            title: 'i am a heading',
            body: 'body foo',
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
        const { valid,
            valid: {
                heading, content, footer
            }
        } = testProps;
        render(<ArticleFromFields {...valid} />);

        const headingContent = screen.getByText(testProps.valid.article.title).text;
        const bodyContent = screen.getByText(testProps.valid.article.body).text;
        const footerContent = screen.getByRole('contentinfo').text;

        expect(headingContent).toEqual(heading);
        expect(bodyContent).toEqual(content);
        expect(footerContent).toEqual(footer);
    });

});