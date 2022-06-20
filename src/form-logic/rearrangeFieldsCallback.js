import { getOrderOfDraggableElements, createDraggableUL  } from "../dragDrop";



export function rearrangeFields(args) {
    const fieldsToIgnore = ['TrackingPixel', 'PersonalUrl', 'YesSignMeUpForUpdatesForBinder'];
    const order = getOrderOfDraggableElements(); // will return object of field name: index or empty object
    const placeholderFieldset = {
      name: 'Container',
      type: 'fieldset',
      children: []
    };

    var nameIndex = args.form_definition.form_elements.push(placeholderFieldset); // returns the length of the array after pushing a new index
    nameIndex--; // decrement to return the actual index of the placeholder fieldset
    args.form_definition.resources.title = ""; // remove title from placeholderFieldset

    args.form_definition.form_elements.forEach((child, childIndex) => {
      if(child.children) {
        const copy = child.children.slice();
        copy.forEach((grandchild, grandchildIndex) => {
          placeholderFieldset.children.splice(order[grandchild.name], 0, grandchild);
          child.children.splice(grandchildIndex,1);

          if(!fieldsToIgnore.includes(grandchild.name) && Object.keys(order).length == 0) {
            createDraggableUL(grandchild.name);
          }
        });
      }

      args.form_definition.form_elements.splice(childIndex,1);
    });

    return args;
}