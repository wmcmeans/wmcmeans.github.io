const queryEl = selector => (document.querySelector(selector));
const queryElAll = selector => (document.querySelectorAll(selector));
const ACTIVE = 'active';
const INACTIVE = 'inactive';
const STICKY = 'sticky';
const VISIBLE = 'visible';
const ANIMATION_COMPLETE = 'animation-complete';

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
    case 'Spots':
      project = SPOTS;
      break;
    case 'Trails':
      project = TRAILS;
      break;
    case 'Cookbook':
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

// TODO: Remove jQuery
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

function toggleProfileView(event) {
  event.preventDefault();

  queryEl('.overlay').classList.remove(INACTIVE);
  queryEl('.profile').classList.remove(INACTIVE);
  queryEl('main').classList.add(INACTIVE);

  setTimeout(() => {
    queryEl('.projects').classList.add(INACTIVE);
    queryEl('.resume-link-container').classList.add(STICKY);
  }, 1000);
}

function toggleProjectView(event) {
  event.preventDefault();

  queryEl('.resume-link-container').classList.remove(STICKY);
  queryEl('.projects').classList.remove(INACTIVE);
  queryEl('main').classList.remove(INACTIVE);
  queryEl('body').scrollTop = 0;

  setTimeout(() => {
    queryEl('.overlay').classList.add(INACTIVE);
    queryEl('.profile').classList.add(INACTIVE);
  }, 1000);

  // $('html, body').animate({
  //   scrollTop: 0,
  // }, 600, shiftLeft);
}

document.addEventListener('DOMContentLoaded', () => {
  function switchProjectView(event) {
    if (event.target === queryEl('.project-link.active')) return;

    const target = event.target || queryEl('.project-link.cookbook');
    window.clearTimeout(window.animateSS);

    const projectLinks = queryElAll('.project-link');
    projectLinks.forEach(el => el.classList.remove(ACTIVE));
    target.classList.add(ACTIVE);

    const projectHtml = createProjectHTML(target.innerHTML);

    const projectDetails = queryEl('.project-details');
    projectDetails.classList.remove(VISIBLE);
    window.setTimeout(() => {
      projectDetails.innerHTML = projectHtml;
      projectDetails.classList.add(VISIBLE);
    }, 200);

    window.animateSS = window.setTimeout(animateScreenshot, 2600);
  }

  queryEl('.profile-link').addEventListener('click', toggleProfileView);
  queryEl('.overlay').addEventListener('click', toggleProjectView);

  switchProjectView('');
  queryElAll('.project-link').forEach(el => el.addEventListener('click', switchProjectView));
});
