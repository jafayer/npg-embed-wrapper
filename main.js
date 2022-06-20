import './style.css';

import { prepForm } from './src/form-logic/prepForm';
import { createAtScript } from './src/form-logic/createAtScript';
import { createStyles } from './src/export-logic/createStyles';
import { getValues, setOnChanges, setFormUrl } from './src/options';

const prepFormPromise = new Promise((resolve, reject) => {
  prepForm();
  resolve();
});

prepFormPromise.then(async() => {
  await createAtScript();
  await setOnChanges();
  
  const form_url = document.getElementById('form_url');
  form_url.onchange = setFormUrl;

  return getValues();
})
.then(values => {
  createStyles(values);
})
.catch(err => {
  console.log(err);
});

prepForm();