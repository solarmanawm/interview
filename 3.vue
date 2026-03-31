<template>
  .carousel(ref="carouselElement")
    .slide(v-for="slide of slides")
      concrete-slide-component(:slide="slide")
</template>

<script setup>
  import ConcreteSlideComponent from './ConcreteSlideComponent.vue';
  import createCarousel from './createCarousel'; // Функция создания карусели

  const slides = ref([...]); // Массив каких-то слайдов
  const selectedIndex = ref(0);
  const canScrollNext = ref(false);
  const canScrollPrev = ref(false);

  const onSelect = (carousel) => {
    canScrollPrev.value = carousel.canScrollPrev();
    canScrollNext.value = carousel.canScrollNext();
    selectedIndex.value = carousel.selectedScrollSnap();
  };

  let carousel;
  const scrollTo = index => carousel?.scrollTo(index);

  function handleIntersection(entries, observer) {
    const filter = entries.filter(e => e.isIntersecting);
    const visibleSlides = filter.map(e => slides.value.find(i => String(i.id) === e.target.dataset.id));

    console.log(visibleSlides);
  }

  let observer;
  const carouselElement = ref(null);

  onMounted(() => {
    carousel = createCarousel();

    observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 0.3,
    });

    const targets = carouselElement.value.querySelectorAll('img[data-src]');

    targets.forEach(img => observer.observe(img));

    carousel.on('reInit', _carousel => onSelect(_carousel));
    carousel.on('select', _carousel => onSelect(_carousel));
  });

  onUnmounted(() => {
      if (carousel) {
          carousel.destroy();
          carousel = undefined;
      }
  
      if (observer) {
          observer.disconnect();
      }
  });

  const prev = () => carousel?.scrollPrev();
  const next = () => carousel?.scrollNext();
  const stop = () => carousel?.stop();
  const play = () => carousel?.play();
</script>
