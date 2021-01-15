/**
 * Created by ceseas1 on 2018-12-27.
 */
// target elements with the "draggable" class
interact('.draggable')
    .draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        restrict: {
            restriction: "parent",
            endOnly: true,
            elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        },
        // enable autoScroll
        autoScroll: true,

        // call this function on every dragmove event
        onmove: dragMoveListener,
        // call this function on every dragend event
        onend: function (event) {
            // var textEl = event.target.querySelector('p');
            //
            // textEl && (textEl.textContent =
            //   'moved a distance of '
            //   + (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
            //                Math.pow(event.pageY - event.y0, 2) | 0))
            //       .toFixed(2) + 'px');
        }
    });

    interact('.resize-drag-arrow')
    .draggable({
        
        // enable inertial throwing
        inertia: true,

        // keep the element within the area of it's parent
        restrict: {
            restriction: "parent",
            endOnly: true,
            elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        },

        // enable autoScroll
        autoScroll: true,

        // call this function on every dragmove event
        onmove: dragMoveListener,
        // call this function on every dragend event
    });

interact('.resize-drag')
    .draggable({
        onmove: window.dragMoveListener,
        restrict: {
            restriction: 'parent',
            elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        },
    })
    .resizable({
        // resize from all edges and corners
        edges: { left: true, right: true, bottom: true, top: true },

        listeners: {
            move (event) {
                var target = event.target
                var x = (parseFloat(target.getAttribute('data-x')) || 0)
                var y = (parseFloat(target.getAttribute('data-y')) || 0)

                // update the element's style
                target.style.width = event.rect.width + 'px'
                target.style.height = event.rect.height + 'px'
                
              // translate when resizing from top or left edges
                x += event.deltaRect.left
                y += event.deltaRect.top
                
                target.style.webkitTransform = target.style.transform =
                'translate(' + x + 'px,' + y + 'px)'
                
                target.setAttribute('data-x', x)
                target.setAttribute('data-y', y)
                target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height)
            }
        },

        /*modifiers: [
            // keep the edges inside the parent
            interact.modifiers.restrictEdges({
              outer: 'parent'
            }),
      
            // minimum size
            interact.modifiers.restrictSize({
              min: { width: 100, height: 50 },             
              max: { width:  400, height:  400 },
            })
          ],
      
          inertia: true*/

        // keep the edges inside the parent
        restrictEdges: {
            outer: 'parent',
        },

        // minimum size
        restrictSize: {
            min: { width: 100, height: 100 },
            max: { width:  350, height:  350 },
        },

        inertia: true,
    })
    .on('resizemove', function (event) {
        let target = event.target,
            x = (parseFloat(target.getAttribute('data-x')) || 0),
            y = (parseFloat(target.getAttribute('data-y')) || 0);

        // update the element's style
        target.style.width  = event.rect.width + 'px';
        target.style.height = event.rect.height + 'px';

        // translate when resizing from top or left edges
        x += event.deltaRect.left;
        y += event.deltaRect.top;

        target.style.webkitTransform = target.style.transform =
            'translate(' + x + 'px,' + y + 'px)';

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
        //target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height);
    });

interact('.resize-drag-line-v')
    .draggable({
        onmove: window.dragMoveListener,
        restrict: {
            restriction: 'parent',
            elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        },
    })
    .resizable({
        // resize from all edges and corners
        edges: { left: false, right: false, bottom: true, top: true },

        listeners: {
            move (event) {
                var target = event.target
                var x = (parseFloat(target.getAttribute('data-x')) || 0)
                var y = (parseFloat(target.getAttribute('data-y')) || 0)

                // update the element's style
                target.style.width = event.rect.width + 'px'
                target.style.height = event.rect.height + 'px'
                
              // translate when resizing from top or left edges
                x += event.deltaRect.left
                y += event.deltaRect.top
                
                target.style.webkitTransform = target.style.transform =
                'translate(' + x + 'px,' + y + 'px)'
                
                target.setAttribute('data-x', x)
                target.setAttribute('data-y', y)
                target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height)
            }
        },

        // keep the edges inside the parent
        restrictEdges: {
            outer: 'parent',
        },

        // minimum size
        restrictSize: {
            min: { width: 100, height: 100 },
            max: { width:  400, height:  400 },
        },

        inertia: true,
    })
    .on('resizemove', function (event) {
        let target = event.target,
            x = (parseFloat(target.getAttribute('data-x')) || 0),
            y = (parseFloat(target.getAttribute('data-y')) || 0);

        // update the element's style
        target.style.width  = event.rect.width + 'px';
        target.style.height = event.rect.height + 'px';

        // translate when resizing from top or left edges
        x += event.deltaRect.left;
        y += event.deltaRect.top;

        target.style.webkitTransform = target.style.transform =
            'translate(' + x + 'px,' + y + 'px)';

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
        //target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height);
    });

interact('.resize-drag-line-h')
    .draggable({
        onmove: window.dragMoveListener,
        restrict: {
            restriction: 'parent',
            elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        },
    })
    .resizable({
        // resize from all edges and corners
        edges: { left: true, right: true, bottom: false, top: false },

        listeners: {
            move (event) {
                var target = event.target
                var x = (parseFloat(target.getAttribute('data-x')) || 0)
                var y = (parseFloat(target.getAttribute('data-y')) || 0)

                // update the element's style
                target.style.width = event.rect.width + 'px'
                target.style.height = event.rect.height + 'px'
                
              // translate when resizing from top or left edges
                x += event.deltaRect.left
                y += event.deltaRect.top
                
                target.style.webkitTransform = target.style.transform =
                'translate(' + x + 'px,' + y + 'px)'
                
                target.setAttribute('data-x', x)
                target.setAttribute('data-y', y)
                target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height)
            }
        },

        // keep the edges inside the parent
        restrictEdges: {
            outer: 'parent',
        },

        // minimum size
        restrictSize: {
            min: { width: 100, height: 100 },
            max: { width:  400, height:  400 },
        },

        inertia: true,
    })
    .on('resizemove', function (event) {
        let target = event.target,
            x = (parseFloat(target.getAttribute('data-x')) || 0),
            y = (parseFloat(target.getAttribute('data-y')) || 0);

        // update the element's style
        target.style.width  = event.rect.width + 'px';
        target.style.height = event.rect.height + 'px';

        // translate when resizing from top or left edges
        x += event.deltaRect.left;
        y += event.deltaRect.top;

        target.style.webkitTransform = target.style.transform =
            'translate(' + x + 'px,' + y + 'px)';

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
        //target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height);
    });

/*interact('.resize-drag-arrow')
    .draggable({
        onmove: window.dragMoveListener,
        restrict: {
            restriction: 'parent',
            elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
        },
    })
    /*.resizable({
        // resize from all edges and corners
        edges: { left: false, right: false, bottom: true, top: true },

        listeners: {
            move (event) {
                var target = event.target
                var x = (parseFloat(target.getAttribute('data-x')) || 0)
                var y = (parseFloat(target.getAttribute('data-y')) || 0)

                // update the element's style
                target.style.width = event.rect.width + 'px'
                target.style.height = event.rect.height + 'px'
                
              // translate when resizing from top or left edges
                x += event.deltaRect.left
                y += event.deltaRect.top
                
                target.style.webkitTransform = target.style.transform =
                'translate(' + x + 'px,' + y + 'px)'
                
                target.setAttribute('data-x', x)
                target.setAttribute('data-y', y)
                target.textContent = Math.round(event.rect.width) + '\u00D7' + Math.round(event.rect.height)
            }
        },

        // keep the edges inside the parent
        restrictEdges: {
            outer: 'parent',
        },

        // minimum size
        restrictSize: {
            min: { width: 100, height: 120 },
            max: { width:  300, height:  300 },
        },

        inertia: true,
    })
    .on('resizemove', function (event) {
        let target = event.target,
            x = (parseFloat(target.getAttribute('data-x')) || 0),
            y = (parseFloat(target.getAttribute('data-y')) || 0);

        // update the element's style
        //target.style.width  = event.rect.width + 'px';
        target.style.height = event.rect.height + 'px';

        // translate when resizing from top or left edges
        x += event.deltaRect.left;
        y += event.deltaRect.top;

        let rotateDeg = target.classList.contains('drag-arrow') ? target?.getAttribute('data-rotate') : target.children[0]?.getAttribute('data-rotate');

        target.style.webkitTransform = target.style.transform =
            'translate(' + x + 'px,' + y + 'px)';

        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
        
        if(rotateDeg){    
            let rotate = rotateDeg ? ' rotate(' + rotateDeg + 'deg)' : '';
            
            let object = target.classList.contains('drag-arrow') ? target : target.children[0];
    
            let transitionTransform = object.style.webkitTransform || object.style.transform;
    
            object.style.webkitTransform = object.style.transform = transitionTransform + ' ' + rotate;
    
            object.setAttribute('data-rotate', rotateDeg);
        }
    });*/


function dragMoveListener (event) {
    let target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
        
    let rotateDeg = target.classList.contains('drag-arrow') ? target?.getAttribute('data-rotate') : target.children[0]?.getAttribute('data-rotate');

    // translate the element
    target.style.webkitTransform =
        target.style.transform =
            'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);

    if(rotateDeg){    
        let rotate = rotateDeg ? ' rotate(' + rotateDeg + 'deg)' : '';
        
        //let object = target.classList.contains('drag-arrow') ? target : target.children[0];
        let object = target.children[0];

        let transitionTransform = object.style.webkitTransform || object.style.transform;

        object.style.webkitTransform = object.style.transform = transitionTransform + ' ' + rotate;

        object.setAttribute('data-rotate', rotateDeg);
    }
}

// this is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;