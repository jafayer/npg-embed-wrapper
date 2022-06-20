import {createAtScript} from './form-logic/createAtScript';

export async function blinkForm() {
    document.querySelector('.at-form').remove(); // remove form inside ngp-embed
    const atScript = document.querySelector('.at-script');
    atScript.remove(); // remove script inside ngp-embed

    delete window.nvtag // delete nvtag from window

    await createAtScript();
    const at_form = document.querySelector('.at-form');
    return at_form;
}