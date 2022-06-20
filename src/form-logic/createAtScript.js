export async function createAtScript() {
    const newScript = document.createElement('script');
    newScript.classList.add('at-script');

    newScript.src = 'https://static.everyaction.com/ea-actiontag/at.js';
    document.querySelector('.ngp-area').appendChild(newScript);

    return newScript;
}