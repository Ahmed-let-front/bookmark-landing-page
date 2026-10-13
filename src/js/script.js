const elements = {
  headOfWeb: document.getElementById('headOfWeb'),
  scrollTrigger: document.getElementById('scroll-trigger'),
  allBeforeObserver: document.querySelectorAll('.before-observer-up'),
  formContactUs: document.getElementById('formContactUs'),
  tablistFeatures: document.getElementById('tablistFeatures'),
  containerPanels: document.getElementById('containerPanels'),
  allTabBtns: document.querySelectorAll('.tab-btn'),
  frontendMentorNotice: document.getElementById('frontend-mentor-notice'),
};
const state = {
  activeElNum: 1,
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
const removeMovedClasses = () => {
  elements.tablistFeatures.className = elements.tablistFeatures.className
    .replace(/\bmoved\S*/g, '')
    .trim();
};
const togglePanel = (panelNum = state.activeElNum) => {
  const template = document.getElementById(`template-panel-${panelNum}`);
  if (!template) return;
  const clone = template.content.cloneNode(true);
  elements.containerPanels.innerHTML = '';
  elements.containerPanels.append(clone);
};
const moveTheEl = activeTab => {
  const tabRect = activeTab.getBoundingClientRect();
  const parentRect = elements.tablistFeatures.getBoundingClientRect();
  const leftPos = tabRect.left - parentRect.left;
  const width = tabRect.width;
  if (window.innerWidth > 768) {
    document.documentElement.style.setProperty(
      '--left-after-el',
      `${leftPos}px`,
    );
    document.documentElement.style.setProperty(
      `--width-after-el`,
      `${width}px`,
    );
  } else {
    elements.allTabBtns.forEach(el => {
      el.classList.remove('max-md:after:scale-100');
      el.classList.add('max-md:after:scale-0');
    });
    activeTab.classList.remove('max-md:after:scale-0');
    activeTab.classList.add('max-md:after:scale-100');
  }
};
const handleTabedContainer = () => {
  elements.tablistFeatures.addEventListener('click', e => {
    const btn = e.target.closest('.tab-btn');
    if (!btn) return;
    const placeBtn = btn.id.split('-')[1];
    state.activeElNum = placeBtn;
    moveTheEl(btn);
    togglePanel();
  });
};
const handleOpenDemoNotice = () => {
  document.addEventListener('click', e => {
    const btn = e.target.closest('.demo-btn');
    if (!btn) return;
    e.preventDefault();
    elements.frontendMentorNotice.showPopover();
  });
};
const init = () => {
  togglePanel();
  handleTabedContainer();
  handleOpenDemoNotice();
  addObserverINEls();
  addShadowInHeader();
};
init();
