const queryEl = selector => (document.querySelector(selector));
const queryElAll = selector => (document.querySelectorAll(selector));

const ACTIVE = 'active';
const INACTIVE = 'inactive';
const STICKY = 'sticky';
const VISIBLE = 'visible';
const ANIMATION_COMPLETE = 'animation-complete';

let main;
let profileSection;
let profileInner;
let projectSection;
let overlay;
let projectLinks;
let projectScreenshots;
let projectDescriptions;
let resumeLinkContainer;

let screenshotAnimationTimer;
let animationCompletionTimer;

function animateScreenshot() {
  if (animationCompletionTimer) {
    window.clearTimeout(animationCompletionTimer);
  }

  const screenshot = queryEl('.project-screenshot.active');

  const containerHeight = queryEl('.screenshot-inner-container').offsetHeight;
  const { height: ssHeight } = screenshot.getBoundingClientRect();
  const top = `${-(ssHeight - containerHeight)}px`;

  const duration = 1500;
  screenshot.animate(
    [{ top: 0, easing: 'ease-in' },
    { top, easing: 'ease-out' }],
    duration,
  );

  animationCompletionTimer = window.setTimeout(() =>
    (screenshot.classList.add(ANIMATION_COMPLETE)),
  duration);
}

function toggleProject(project) {
  if (screenshotAnimationTimer) {
    window.clearTimeout(screenshotAnimationTimer);
  }

  const newActiveProjectScreenshot = queryEl(`#${project}-screenshot`);
  const newActiveProjectDescription = queryEl(`#${project}-description`);

  projectScreenshots.forEach((el) => {
    el.classList.remove(ACTIVE);
    el.classList.remove(ANIMATION_COMPLETE);
    el.removeAttribute('style');
  });
  projectDescriptions.forEach(el => el.classList.remove(ACTIVE));

  newActiveProjectScreenshot.classList.add(ACTIVE);
  newActiveProjectDescription.classList.add(ACTIVE);

  screenshotAnimationTimer = window.setTimeout(animateScreenshot, 2600);
}

function toggleOverlay(fadeIn = true) {
  if (fadeIn) {
    overlay.classList.add(VISIBLE);
    setTimeout(() => (overlay.classList.remove(INACTIVE)), 0);
  } else {
    overlay.classList.add(INACTIVE);
    setTimeout(() => (overlay.classList.remove(VISIBLE)), 300);
  }
}

function toggleProfileView(event) {
  event.preventDefault();

  toggleOverlay();
  profileSection.classList.remove(INACTIVE);
  main.classList.add(INACTIVE);

  setTimeout(() => {
    projectSection.classList.add(INACTIVE);
    resumeLinkContainer.classList.add(STICKY);
  }, 1000);
}

function toggleProjectView(event) {
  event.preventDefault();

  resumeLinkContainer.classList.remove(STICKY);
  projectSection.classList.remove(INACTIVE);
  main.classList.remove(INACTIVE);
  toggleOverlay(false);

  setTimeout(() => {
    profileInner.scrollTop = 0;
    profileSection.classList.add(INACTIVE);
  }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
  function switchProjectView(event) {
    event.preventDefault();
    const { target } = event;
    const projectDetails = queryEl('.project-details');

    if (target === queryEl('.project-link.active')) return;
    projectDetails.classList.remove(VISIBLE);

    projectLinks.forEach(el => el.classList.remove(ACTIVE));
    target.classList.add(ACTIVE);

    window.setTimeout(() => {
      toggleProject(target.id.split('-')[0]);
      projectDetails.classList.add(VISIBLE);
    }, 200);
  }

  main = queryEl('main');
  profileSection = queryEl('.profile');
  profileInner = queryEl('.profile-inner');
  projectSection = queryEl('.projects');
  overlay = queryEl('.overlay');
  projectLinks = queryElAll('.project-link');
  projectScreenshots = queryElAll('.project-screenshot');
  projectDescriptions = queryElAll('.project-description');
  resumeLinkContainer = queryEl('.resume-link-container');

  queryEl('.profile-link').addEventListener('click', toggleProfileView);
  overlay.addEventListener('click', toggleProjectView);

  projectLinks.forEach(el => el.addEventListener('click', switchProjectView));
  screenshotAnimationTimer = window.setTimeout(animateScreenshot, 2600);
});
