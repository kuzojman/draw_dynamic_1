const canvas = new fabric.Canvas(document.getElementById('canvasId'));
const customCursor = document.querySelector('.customPointer');
const socket = io();

canvas.isDrawingMode = true;
canvas.freeDrawingBrush.width = 5;
canvas.freeDrawingBrush.color = '#00aeff';

const pointImageCoordinates = localStorage.getItem('point-image-coordinates');

if(!!pointImageCoordinates) {
    canvas.loadFromJSON(pointImageCoordinates);
}

canvas.on('path:created', function(e) {
    e.path.set();
    canvas.renderAll();
    socket.emit('json_to_board', JSON.stringify(canvas));
    localStorage.setItem('point-image-coordinates', JSON.stringify(canvas));
});

canvas.on('mouse:move', (event) => {
    const cursorCoordinates = canvas.getPointer(event.e);
    socket.emit('cursor_coordinates', cursorCoordinates);
});

socket.on('json_to_board', function(data) {
    canvas.loadFromJSON(data);
});

socket.on('cursor_coordinates', function(data) {
    let currentWidthCursor = parseInt(getComputedStyle(customCursor).width.match(/\d+/));
    let currentHeightCursor = parseInt(getComputedStyle(customCursor).height.match(/\d+/));

    customCursor.style.top = (data.y - currentHeightCursor / 2) + 'px';
    customCursor.style.left = (data.x - currentWidthCursor / 2) + 'px';
});













// const socket = io();

// const messages = document.getElementById('messages');
// const form = document.getElementById('form');
// const input = document.getElementById('input');
//
//     form.addEventListener('submit', function(e) {
//         e.preventDefault();
//         if (input.value) {
//             socket.emit('chat message', input.value);
//             input.value = '';
//     }
//     });
// socket.on('chat message', function(msg) {
//     const item = document.createElement('li');
//     item.textContent = msg;
//     messages.appendChild(item);
//     window.scrollTo(0, document.body.scrollHeight);
// });