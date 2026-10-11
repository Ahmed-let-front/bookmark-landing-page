const elements = {
  headOfWeb: document.getElementById('headOfWeb'),
  scrollTrigger: document.getElementById('scroll-trigger'),
  allBeforeObserver: document.querySelectorAll('.before-observer-up'),
};
const addObserverINEls = () => {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.3,
  };
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-observer-up');
        observer.unobserve(entry.target);
      }
    });
  }, options);
  elements.allBeforeObserver.forEach(el => observer.observe(el));
};
const addShadowInHeader = () => {
  const options = {
    root: null,
    threshold: 0,
  };
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) elements.headOfWeb.classList.add('shadow-xl');
      else elements.headOfWeb.classList.remove('shadow-xl');
    });
  }, options);
  observer.observe(elements.scrollTrigger);
};

const init = () => {
  addObserverINEls();
  addShadowInHeader();
};
init();
