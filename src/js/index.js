import $ from 'jquery';
import 'jquery-ui';

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
                  <div class="project-links">
                  ${Object.entries(project.links).map(([name, link]) => (
                      `<a target="_blank" href="${link}">${name}</a>`
                    )).join('\n')}
                  </div>
                </section>`;
  return html;
}

function animateScreenshot() {
  const screenshot = $('img.project-screenshot');
  const containerHeight = $('div.screenshot-inner-container').height();
  const ssHeight = screenshot.height();
  screenshot.animate({ top: `-${ssHeight - containerHeight}` }, {
    duration: 1500,
    specialEasing: {
      bottom: 'easeInOutQuad',
    },
    complete() {
      screenshot.css({ bottom: 0, top: '' });
    },
  });
}

function toggleProfileView(e) {
  e.preventDefault();

  $('div.overlay').removeClass('inactive');
  $('section.profile').removeClass('inactive');

  $('main').animate({ left: '-65%' }, {
    duration: 1000,
    specialEasing: {
      left: 'easeInOutQuad',
    },
    always() {
      $('section.projects').addClass('inactive');
      $('div.resume-link-container').addClass('sticky');
    },
  });
}

function toggleProjectView(e) {
  function shiftLeft() {
    $('div.resume-link-container').removeClass('sticky');
    $('section.projects').removeClass('inactive');

    $('main').animate({ left: 0 }, {
      duration: 1000,
      specialEasing: {
        left: 'easeInOutQuad',
      },
      always() {
        $('div.overlay').addClass('inactive');
        $('section.profile').addClass('inactive');
      },
    });
  }

  e.preventDefault();
  $('html, body').animate({
    scrollTop: 0,
  }, 600, shiftLeft);
}

$(() => {
  function switchProjectView(e) {
    if (e.target === $('li.project-link.active')[0]) return;

    const target = e.target || $('li.project-link.cookbook')[0];
    window.clearTimeout(window.animateSS);

    $('li.project-link').removeClass('active');
    $(target).addClass('active');

    const html = createProjectHTML(target.innerHTML);

    $('img.project-screenshot').css('bottom', 0);
    $('article.project-details').hide().html(html).fadeIn(500);

    window.animateSS = window.setTimeout(animateScreenshot, 2600);
  }

  $('a.profile-link').click(toggleProfileView);
  $('div.overlay').click(toggleProjectView);

  switchProjectView('');
  $('li.project-link').click(switchProjectView);
});
