let call = 0;

function deon360Viewer(id, n, p, t, playable, autoPlay, draggable, mouseMove) {
    // console.log(`${call}-${id}-${playable ? 'playable ' : ''}${autoPlay ? 'autoPlay ' : ''}${draggable ? 'draggable ' : ''}${mouseMove ? 'mouseMove ' : ''}`);
    call++;
    loaderNone(id);
    let i = 1, j = 0, move = [],
        mainDiv = document.querySelector(`#${id}`);
    mainDiv.className = 'viewer';
    mainDiv.innerHTML += `<img class="${id} ${playable ? 'playable ' : ''}${autoPlay ? 'autoPlay ' : ''}${draggable ? 'draggable ' : ''}${mouseMove ? 'mouseMove ' : ''}"draggable="false" src='${p}${i}.${t}'>`;
    
    if (call == 1)
        for (let k = 1; k <= n; k++) {
            document.getElementById('dummy').innerHTML += `<img src='${p}${k}.${t}'>`;
        }

    let img = document.querySelector(`#${id} .${id}`);

    if (!playable && !autoPlay) {
        let touch = false;
        (window.matchMedia("screen and (max-width: 992px)").matches) ? touchFun() : nonTouch();

        //For Touch Devices
        window.addEventListener('touchstart', function () {
            touchFun();
        });

        function touchFun() {
            touch = true;
            img.removeAttribute('draggable');
            img.addEventListener('touchmove', function (e) {
                logic(this, e);
            });
            img.addEventListener('touchend', function () {
                move = [];
            });
        }
        //For Non-Touch Devices
        function nonTouch() {
            touch = false;
            if (draggable) {
                var drag = false;
                img.addEventListener('mousedown', function (e) {
                    drag = true;
                    logic(this, e);
                });
                img.addEventListener('mouseup', function () {
                    drag = false;
                    move = [];
                });
                img.addEventListener('dblclick', function () {
                    magniy(3);
                });
                mouseEvent();
            }

            if (mouseMove) {
                drag = true;
                mouseEvent();
            }
            function mouseEvent() {
                img.addEventListener('mousemove', function (e) {
                    (drag) ? logic(this, e) : null;
                });
                img.addEventListener('mouseleave', function () {
                    move = [];
                });
                img.addEventListener('contextmenu', nonmenu => nonmenu.preventDefault());
            }

        }

        function logic(el, e) {
            j++;
            let x = touch ? e.touches[0].clientX : e.clientX;
            let coord = (x - img.offsetLeft);
            move.push(coord);

            let l = move.length,
                oldMove = move[l - 2],
                newMove = move[l - 1];
            let thresh = touch ? true : !(j % 0.5);
            if (thresh) {
                if (newMove > oldMove)
                    nxt(el);
                else if (newMove < oldMove)
                    prev(el);
            }
        }
        
    }

    function prev(e) {
        if (i <= 1) {
            i = n;
            e.src = `${p}${--i}.${t}`;
            nxt(e);
        } else
            e.src = `${p}${--i}.${t}`;
    }
    function nxt(e) {
        if (i >= n) {
            i = 1;
            e.src = `${p}${++i}.${t}`;
            prev(e);
        } else
            e.src = `${p}${++i}.${t}`;
    }
    function loaderNone(id) {
        window.addEventListener('load',function(){
            document.querySelector(`#${id} .loader`);
            if (autoPlay) {
                pause = false;
                play();
            }
        });
    }
    
    function magniy(zoom) {
        let glass, result, w, h, bw;
        /*create magnifier glass:*/
        glass = document.createElement("DIV");
        glass.setAttribute("class", "img-magnifier-glass");
        /*insert magnifier glass:*/
        img.parentElement.insertBefore(glass, img);
        /*set background properties for the magnifier glass:*/
        glass.style.backgroundImage = "url('" + img.src + "')";
        glass.style.backgroundRepeat = "no-repeat";
        glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
        w = glass.offsetWidth / 2;
        h = glass.offsetHeight / 2;
        /*execute a function when someone moves the magnifier glass over the image:*/
        glass.addEventListener("mousemove", moveMagnifier);
        img.addEventListener("mousemove", moveMagnifier);
        glass.addEventListener('contextmenu', nonmenu => nonmenu.preventDefault());
        img.addEventListener('contextmenu', nonmenu => nonmenu.preventDefault());
        glass.ondblclick = function(){
            tag = this.parentElement;
            tag.removeChild(this);
        }
        /*and also for touch screens:*/
        glass.addEventListener("touchmove", moveMagnifier);
        img.addEventListener("touchmove", moveMagnifier);
        function moveMagnifier(e) {
            let pos, x, y;
            /*prevent any other actions that may occur when moving over the image*/
            e.preventDefault();
            /*get the cursor's x and y positions:*/
            pos = getCursorPos(e);
            x = pos.x;
            y = pos.y;
            bw = 3;
            /*prevent the magnifier glass from being positioned outside the image:*/
            if (x > img.width - (w / zoom)) {x = img.width - (w / zoom);}
            if (x < w / zoom) {x = w / zoom;}
            if (y > img.height - (h / zoom)) {y = img.height - (h / zoom);}
            if (y < h / zoom) {y = h / zoom;}
            /*set the position of the magnifier glass:*/
            glass.style.left = (x - w) + "px";
            glass.style.top = (y - h) + "px";
            /*display what the magnifier glass "sees":*/
            glass.style.backgroundPosition = "-" + ((x * zoom) - w) + "px -" + ((y * zoom) - h) + "px";
        }
        function getCursorPos(e) {
            let a, x = 0, y = 0;
            e = e || window.event;
            /*get the x and y positions of the image:*/
            a = img.getBoundingClientRect();
            /*calculate the cursor's x and y coordinates, relative to the image:*/
            x = e.pageX - a.left;
            y = e.pageY - a.top;
            /*consider any page scrolling:*/
            x = x - window.pageXOffset;
            y = y - window.pageYOffset;
            return {x : x, y : y};
        }
                
    }

}

