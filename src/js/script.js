const elements = {
  headOfWeb: document.getElementById('headOfWeb'),
  scrollTrigger: document.getElementById('scroll-trigger'),
  allBeforeObserver: document.querySelectorAll('.before-observer-up'),
  tablistFeatures: document.getElementById('tablistFeatures'),
  containerPanels: document.getElementById('containerPanels'),
  allTabBtns: document.querySelectorAll('.tab-btn'),
  frontendMentorNotice: document.getElementById('frontend-mentor-notice'),
  siteMenu: document.getElementById('site-menu'),
  btnOpenSiteMenu: document.getElementById('open-site-menu'),
  formContactUs: document.getElementById('formContactUs'),
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
  const observerUp = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-observer-up');
        observer.unobserve(entry.target);
      }
    });
  }, options);
  elements.allBeforeObserver.forEach(el => observerUp.observe(el));
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
const togglePanel = (panelNum = state.activeElNum) => {
  const template = document.getElementById(`template-panel-${panelNum}`);
  if (!template) return;
  const clone = template.content.cloneNode(true);
  const panelDiv = clone.querySelector('div');
  panelDiv.id = `panel-${panelNum}`;
  elements.containerPanels.innerHTML = '';
  elements.containerPanels.append(clone);
};
const moveTheEl = activeTab => {
  const tabRect = activeTab.getBoundingClientRect();
  const parentRect = elements.tablistFeatures.getBoundingClientRect();
  const leftPos = tabRect.left - parentRect.left;
  const width = tabRect.width;
  const rootStyle = document.documentElement.style;
  rootStyle.setProperty('--left-after-el', `${leftPos}px`);
  rootStyle.setProperty(`--width-after-el`, `${width}px`);
};
const selectTab = tab => {
  elements.allTabBtns.forEach(el =>
    el.setAttribute('aria-selected', String(el === tab)),
  );
};
const handleContactUs = () => {
  elements.formContactUs.addEventListener('submit', e => {
    e.preventDefault();
    const { email } = e.currentTarget.elements;
    console.log(email.checkValidity());
    if (!email.checkValidity()) {
      email.setAttribute('aria-invalid', 'true');
      email.setAttribute('aria-describedby', 'email-error');
      email.focus();
      return;
    }
    email.removeAttribute('aria-invalid');
    email.removeAttribute('aria-describedby');
    elements.frontendMentorNotice.showPopover();
  });
};
const handleTabedContainer = () => {
  elements.tablistFeatures.addEventListener('click', e => {
    const btn = e.target.closest('.tab-btn');
    if (!btn) return;
    const placeBtn = btn.id.split('-')[1];
    state.activeElNum = placeBtn;
    moveTheEl(btn);
    selectTab(btn);
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
const handleClickInSiteMenu = () => {
  elements.siteMenu.addEventListener('click', e => {
    const btn = e.target.closest('.nav-li');
    if (!btn) return;
    e.currentTarget.hidePopover();
  });
};
const init = () => {
  togglePanel();
  handleTabedContainer();
  handleOpenDemoNotice();
  handleClickInSiteMenu();
  handleContactUs();
  addObserverINEls();
  addShadowInHeader();
};
init();
