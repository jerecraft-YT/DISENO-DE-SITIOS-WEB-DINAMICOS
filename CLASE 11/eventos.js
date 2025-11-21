document.addEventListener('DOMContentLoaded', function() {
});

window.addEventListener('scroll', function() {
    const scrollY = window.scrollY;
    
    console.log(`Posición de desplazamiento (Scroll): ${scrollY}px`);

    if (scrollY > 200) {
        document.body.style.backgroundColor = 'rgba(211, 157, 96, 1)';
    } else {
        document.body.style.backgroundColor = 'rgba(0, 195, 255, 0)';
    }
});