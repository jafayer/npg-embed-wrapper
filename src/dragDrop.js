import { blinkForm } from "./blinkForm";

var list = document.getElementById('drag-drop-list');
var base, randomized, dragging, draggedOver;

export function createDraggableUL(text) {
    var li = document.createElement('li');
    li.innerHTML = text;
    li.className = 'draggable small-shadow';
    li.draggable = true;
    li.addEventListener('dragstart', dragStart);
    li.addEventListener('dragover', dragOver);
    li.addEventListener('drop', drop);
    list.appendChild(li);
}

export function dragStart(e) {
    dragging = e.target;
}

export function dragOver(e) {
    e.preventDefault();
    draggedOver = e.target;
}

export function drop() {
    const children = Array.from(list.children);
    const index1 = children.indexOf(dragging);
    const index2 = children.indexOf(draggedOver);
    
    list.innerHTML = '';
    children.splice(index1, 1);
    children.splice(index2, 0, dragging);
    children.forEach(child => list.appendChild(child));
    dragging = null;

    blinkForm();
}

export function getOrderOfDraggableElements() {
    const children = Array.from(list.children);
    const order = {};
    children.forEach(child => {
        order[child.innerText] = children.indexOf(child);
    });
    return order;
}