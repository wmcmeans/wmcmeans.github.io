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
let resumeLinkContainer;

const COOKBOOK = {
  img: 'cookbook-screenshot-resized.jpg',
  description: 'Cookbook is an app for discovering, searching, and saving delicious recipes inspired by cooking.nytimes.com. It was built using Ruby on Rails and React/Flux.',
  links: {
    Live: 'http://www.thymes-cookbook.com',
    GitHub: 'https://github.com/wmcmeans/cookbook',
  },
};

const SPOTS = {
  img: 'spots-screenshot.jpg',
  description: 'Spots is a connect-the-dot browser game based on the popular mobile app. It uses jQuery listeners and CSS hoverstates to respond to user interaction and manipulate game state.',
  links: {
    Live: 'spots/game.html',
    GitHub: 'https://github.com/wmcmeans/spots',
  },
};

const TRAILS = {
  img: 'trails-screenshot.jpg',
  description: 'Ruby on Trails is a MVC framework with a custom ORM system (Dynamic Archive) inspired by Ruby on Rails and Active Record. You\'re hiking Ruby on Trails!',
  links: {
    Live: 'http://www.ruby-on-trails.com/',
    GitHub: 'https://github.com/wmcmeans/trails',
    RubyGems: 'https://rubygems.org/gems/trails-mvc',
  },
};

function createProjectHTML(projectName) {
  let project;
  switch (projectName) {
    case 'spots-link':
      project = SPOTS;
      break;
    case 'trails-link':
      project = TRAILS;
      break;
    case 'cookbook-link':
    default:
      project = COOKBOOK;
      break;
  }
  const html = `<div class="main-img-container">
                  <!-- IMAGE PLACEHOLDER -->
                  <img class="macbook" src="dist/images/macbook-retina.png" alt="" />
                  <div class="screenshot-outer-container">
                    <div class="screenshot-inner-container">
                      <img class="project-screenshot" src="dist/images/${project.img}" />
                    </div>
                  </div>
                </div>
                <section class="project-description">
                  <p>${project.description}</p>
                  <div class="external-project-links">
                  ${Object.entries(project.links).map(([name, link]) => (
                      `<a target="_blank" href="${link}">${name}</a>`
                    )).join('\n')}
                  </div>
                </section>`;
  return html;
}

function animateScreenshot() {
  const screenshot = queryEl('.project-screenshot');
  screenshot.classList.remove(ANIMATION_COMPLETE);

  const containerHeight = queryEl('.screenshot-inner-container').offsetHeight;
  const { height: ssHeight } = screenshot.getBoundingClientRect();
  const top = `${-(ssHeight - containerHeight)}px`;

  const duration = 1500;
  screenshot.animate(
    [{ top: 0, easing: 'ease-in' },
    { top, easing: 'ease-out' }],
    duration,
  );

  setTimeout(() => screenshot.classList.add(ANIMATION_COMPLETE), duration);
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
    if (event.target === queryEl('.project-link.active')) return;

    const target = event.target || queryEl('#cookbook-link');
    window.clearTimeout(window.animateSS);

    projectLinks.forEach(el => el.classList.remove(ACTIVE));
    target.classList.add(ACTIVE);

    const projectHtml = createProjectHTML(target.id);

    const projectDetails = queryEl('.project-details');
    projectDetails.classList.remove(VISIBLE);
    window.setTimeout(() => {
      projectDetails.innerHTML = projectHtml;
      projectDetails.classList.add(VISIBLE);
    }, 200);

    window.animateSS = window.setTimeout(animateScreenshot, 2600);
  }

  main = queryEl('main');
  profileSection = queryEl('.profile');
  profileInner = queryEl('.profile-inner');
  projectSection = queryEl('.projects');
  overlay = queryEl('.overlay');
  projectLinks = queryElAll('.project-link');
  resumeLinkContainer = queryEl('.resume-link-container');

  queryEl('.profile-link').addEventListener('click', toggleProfileView);
  overlay.addEventListener('click', toggleProjectView);

  switchProjectView({ preventDefault: () => (null) });
  projectLinks.forEach(el => el.addEventListener('click', switchProjectView));
});
