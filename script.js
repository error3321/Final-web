window.onload = function () {
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const nextButton = document.querySelector('.carousel-button.right');
  const prevButton = document.querySelector('.carousel-button.left');
  const nav = document.querySelector('.carousel-nav');
  const indicators = Array.from(nav.children);

  // Ajuste a largura dos slides com base no tamanho da tela
  let slideWidth = slides[0].getBoundingClientRect().width;

  // Função para mover o carrossel para um slide específico
  function moveToSlide(track, currentSlide, targetSlide) {
    const targetIndex = slides.indexOf(targetSlide);
    track.style.transform = `translateX(-${targetIndex * slideWidth}px)`; // Mover para o slide correto
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
  }

  // Função para atualizar os indicadores de navegação
  function updateIndicators(currentIndicator, targetIndicator) {
    currentIndicator.classList.remove('current-slide');
    targetIndicator.classList.add('current-slide');
  }

  // Quando o botão 'next' for clicado
  nextButton.addEventListener('click', () => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling || slides[0];
    const currentIndicator = nav.querySelector('.current-slide');
    const nextIndicator = currentIndicator.nextElementSibling || indicators[0];

    moveToSlide(track, currentSlide, nextSlide);
    updateIndicators(currentIndicator, nextIndicator);
  });

  // Quando o botão 'prev' for clicado
  prevButton.addEventListener('click', () => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling || slides[slides.length - 1];
    const currentIndicator = nav.querySelector('.current-slide');
    const prevIndicator = currentIndicator.previousElementSibling || indicators[indicators.length - 1];

    moveToSlide(track, currentSlide, prevSlide);
    updateIndicators(currentIndicator, prevIndicator);
  });

  // Quando um indicador for clicado
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

// Auto slide (mover para o próximo slide automaticamente a cada 5 segundos)
  let autoSlide = null;
  let isAutoSlideRunning = false;

  function startAutoSlide() {
    if (!isAutoSlideRunning) {
      autoSlide = setInterval(() => nextButton.click(), 5000);
      isAutoSlideRunning = true;
    }
  }

  function stopAutoSlide() {
    clearInterval(autoSlide);
    isAutoSlideRunning = false;
  }

  // Iniciar auto-slide depois de tudo carregar
  startAutoSlide();

  // Pausar ao passar o mouse sobre o carrossel
  const carousel = document.querySelector('.carousel');
  carousel.addEventListener('mouseenter', stopAutoSlide);
  carousel.addEventListener('mouseleave', startAutoSlide);
}