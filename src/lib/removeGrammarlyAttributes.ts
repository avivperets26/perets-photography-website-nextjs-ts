const removeGrammarlyAttributes = () => {
    const body = document.body;
    const html = document.documentElement;

    body.removeAttribute('data-new-gr-c-s-check-loaded');
    body.removeAttribute('data-gr-ext-installed');
    html.removeAttribute('data-new-gr-c-s-check-loaded');
    html.removeAttribute('data-gr-ext-installed');
};