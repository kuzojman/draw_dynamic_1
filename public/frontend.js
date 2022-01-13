const canvas = new fabric.Canvas(document.getElementById('canvasId'));
const socket = io();

canvas.isDrawingMode = true;
canvas.freeDrawingBrush.width = 5;
canvas.freeDrawingBrush.color = '#00aeff';




socket.on( 'connect', function()
{
    let isDrawing = false

    canvas.on('mouse:down', e => {
      isDrawing = true;
      socket.emit('mouse:down', e)
    })
    canvas.on('mouse:up', e => {
      isDrawing = false;
    })
    canvas.on('mouse:move', function (e)
    {
      if (isDrawing) {
        //console.log(canvas.freeDrawingBrush._points);
        socket.emit('mouse:move', canvas.freeDrawingBrush._points);
        
      }
    })

    socket.on('mouse:move', function(e)
    {
      canvas.freeDrawingBrush._points = e.map(item => {
        return new fabric.Point(item.x, item.y)
      })
      canvas._onMouseUpInDrawingMode({target: canvas.upperCanvasEl}) 

      console.log('recieved',  canvas.freeDrawingBrush._points.length)
    });
});



/*
canvas.on('path:created', function(e) {
    e.path.set();
    canvas.renderAll();
    socket.emit('json_to_board', JSON.stringify(canvas));
});

socket.on('json_to_board', function(data) {
    canvas.loadFromJSON(data);
});
*/












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