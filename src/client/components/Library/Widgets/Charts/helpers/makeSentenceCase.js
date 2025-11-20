// REF SOURCE: https://www.30secondsofcode.org/js/s/string-case-conversion/#convert-any-case-to-sentence-case
export const makeSentenceCase = (str) => {
    if(!str) { 
        return '';
    }
    const s =
        str &&
        str.match(
                /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
            )
            .join(' ');
    return s.slice(0, 1).toUpperCase() + s.slice(1);
};
