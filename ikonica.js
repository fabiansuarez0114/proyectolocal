document.addEventListener("DOMContentLoaded", () => {
    const nextDom = document.getElementById('next');
    const prevDom = document.getElementById('prev');
    const carouselDom = document.querySelector('.carousel');
    const listItemDom = document.querySelector('.carousel .list');
    const thumbnailDom = document.querySelector('.carousel .thumbnail');
    const itemSlider = document.querySelectorAll('.carousel .list .item');
    const itemThumbnail = document.querySelectorAll('.carousel .thumbnail .item');
    const menu = document.querySelector(".menu");
    const navegacion = document.querySelector(".navegacion");
    const enlaces = document.querySelectorAll(".navegacion a");

    let currentIndex = 0; // Índice del elemento actual en el carrusel
    const timeRunning = 3000;
    const timeAutonext = 3000;
    let runTimeOut;
    let runAutoRun;

    function showSlider(type) {
        // Clona el elemento actual y lo mueve al final o al principio según el tipo
        const currentItem = itemSlider[currentIndex].cloneNode(true);
        const currentThumbnail = itemThumbnail[currentIndex].cloneNode(true);

        if (type === 'next') {
            // Mueve al siguiente elemento
            currentIndex = (currentIndex + 1) % itemSlider.length;
            listItemDom.appendChild(currentItem);
            thumbnailDom.appendChild(currentThumbnail);
            carouselDom.classList.add('next');
        } else if (type === 'prev') {
            // Mueve al elemento anterior
            currentIndex = (currentIndex - 1 + itemSlider.length) % itemSlider.length;
            listItemDom.prepend(currentItem);
            thumbnailDom.prepend(currentThumbnail);
            carouselDom.classList.add('prev');
        }

        // Limpia las clases de transición después de un tiempo
        clearTimeout(runTimeOut);
        runTimeOut = setTimeout(() => {
            carouselDom.classList.remove('next');
            carouselDom.classList.remove('prev');

            // Elimina el elemento original después de la transición
            setTimeout(() => {
                if (type === 'next') {
                    listItemDom.removeChild(listItemDom.firstChild);
                    thumbnailDom.removeChild(thumbnailDom.firstChild);
                } else if (type === 'prev') {
                    listItemDom.removeChild(listItemDom.lastChild);
                    thumbnailDom.removeChild(thumbnailDom.lastChild);
                }
            }, 500); // Ajusta el tiempo según la duración de la transición en CSS
        }, timeRunning);

        // Reinicia el avance automático del carrusel
        clearTimeout(runAutoRun);
        runAutoRun = setTimeout(() => {
            nextDom.click();
        }, timeAutonext);
    }

    nextDom.addEventListener('click', () => {
        showSlider('next');
    });
    prevDom.addEventListener('click', () => {
        showSlider('prev');
    });

    function mostrarmenu() {
        menu.addEventListener("click", () => {
            navegacion.classList.toggle("ocultar");
        });
    }

    function cerrarmenu() {
        enlaces.forEach(enlace => {
            enlace.addEventListener("click", (e) => {
                if (e.target.tagName === "A") {
                    navegacion.classList.add("ocultar");
                }
            });
        });
    }

    mostrarmenu();
    cerrarmenu();

    // Inicializa el avance automático del carrusel
    runAutoRun = setTimeout(() => {
        nextDom.click();
    }, timeAutonext);
});
