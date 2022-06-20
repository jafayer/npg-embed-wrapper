import { createStyles } from "./export-logic/createStyles";
import { blinkForm } from "./blinkForm";
export async function getValues() {
    const inputs = Array.from(document.querySelectorAll('.options .option input'));

    // create an object that groups inputs by name
    const inputsByName = inputs.reduce((accumulator, input) => {
        const name = input.name;
        if(!accumulator[name]) {
            accumulator = {...accumulator, [name]: input};
        } else {
            accumulator = {...accumulator, [name]: [accumulator[name], input]};
        }

        return accumulator;
    }, {});

    // create an object that grabs the value of each input name
    // if typeof is array
        // if input types are radio, grab the value of the checked radio
        // if input types are checkbox, grab the value of the checked checkbox
    // if typeof is input
        // if input type is checkbox, grab whether it's checked
        // else, grab the value of the input
    const inputsByNameValues = {};
    Object.keys(inputsByName).forEach(name => {
        const input = inputsByName[name];
        if(Array.isArray(input)) {
            const checkedInput = input.find(input => input.checked);
            if(checkedInput) {
                inputsByNameValues[name] = checkedInput.value;
            }
        } else {
            if(input.type === 'checkbox') {
                inputsByNameValues[name] = input.checked;
            } else {
                inputsByNameValues[name] = input.value;
            }
        }
    });

    return inputsByNameValues;
}

export async function setOnChanges() {
    const inputs = Array.from(document.querySelectorAll('.options .option input'));

    // onchange should trigger createStyles with new values
    function onChange(e) {
        const values = getValues();
        createStyles(values);
    }

    inputs.forEach(input => {
        input.onchange = onChange;
    });
}

export async function setFormUrl(e) {
    console.log('setFormUrl', e.target.value);
    const form = document.querySelector('.ngp-form');
    form.setAttribute('data-form-url', e.target.value);
    
    await blinkForm();
    
    // sleep for 2 seconds
    await new Promise(resolve => setTimeout(resolve, 1000));
    const at_form = document.querySelector('.at-form');
    if(!at_form || at_form.innerHTML === "") {
        at_form.innerHTML = `<p style="text-align: center; font-weight: bold;">Form not found. Please check the URL.</p>`;
    }
}
