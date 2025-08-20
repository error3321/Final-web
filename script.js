const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel-button.right');
const prevButton = document.querySelector('.carousel-button.left');
const nav = document.querySelector('.carousel-nav');
const indicators = Array.from(nav.children);

let slideWidth = slides[0].getBoundingClientRect().width;

// Posiciona os slides lado a lado
const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
};
slides.forEach(setSlidePosition);

// Move para o slide alvo
function moveToSlide(track, currentSlide, targetSlide) {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}

// Atualiza os indicadores
function updateIndicators(currentIndicator, targetIndicator) {
    currentIndicator.classList.remove('current-slide');
    targetIndicator.classList.add('current-slide');
}

// Navegação manual
nextButton.addEventListener('click', () => {
    const currentSlide = track.querySelector('.current-slide');
    let nextSlide = currentSlide.nextElementSibling || slides[0];
    const currentIndicator = nav.querySelector('.current-slide');
    let nextIndicator = currentIndicator.nextElementSibling || indicators[0];

    moveToSlide(track, currentSlide, nextSlide);
    updateIndicators(currentIndicator, nextIndicator);
});

prevButton.addEventListener('click', () => {
    const currentSlide = track.querySelector('.current-slide');
    let prevSlide = currentSlide.previousElementSibling || slides[slides.length - 1];
    const currentIndicator = nav.querySelector('.current-slide');
    let prevIndicator = currentIndicator.previousElementSibling || indicators[indicators.length - 1];

    moveToSlide(track, currentSlide, prevSlide);
    updateIndicators(currentIndicator, prevIndicator);
});

// Clique nos indicadores
nav.addEventListener('click', e => {
    if (!e.target.matches('button')) return;

    const targetIndex = indicators.findIndex(ind => ind === e.target);
    const currentSlide = track.querySelector('.current-slide');
    const currentIndicator = nav.querySelector('.current-slide');
    const targetSlide = slides[targetIndex];
    const targetIndicator = indicators[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateIndicators(currentIndicator, targetIndicator);
});

// Troca automática
let autoSlide = setInterval(() => nextButton.click(), 5000); // a cada 5 segundos

// Pausar no hover
const carousel = document.querySelector('.carousel');
carousel.addEventListener('mouseover', () => clearInterval(autoSlide));
carousel.addEventListener('mouseout', () => {
    autoSlide = setInterval(() => nextButton.click(), 4000);
});
