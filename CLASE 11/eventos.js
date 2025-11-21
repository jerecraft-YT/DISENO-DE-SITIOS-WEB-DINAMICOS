document.addEventListener('DOMContentLoaded', function() {
});

window.addEventListener('scroll', function() {
    const scrollY = window.scrollY;
    
    console.log(`Posición de desplazamiento (Scroll): ${scrollY}px`);

    if (scrollY > 200) {
        document.body.style.backgroundColor = 'green';
    } else {
        document.body.style.backgroundColor = 'white';
    }
});