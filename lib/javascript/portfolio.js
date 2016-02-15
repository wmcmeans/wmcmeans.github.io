var COOKBOOK = {
  img: "cookbook-screenshot-resized.jpg",
  description: "Cookbook is an app for discovering, searching, and saving delicious recipes, inspired by cooking.nytimes.com.",
  features: [
    "Recipe box encourages users to sign up and save recipes to their accounts.",
    "Dynamic search continuously updates queries to return results in real time.",
    "Protects user privacy through private note options and anonymous metadata.",
    "Dynamically displays header content to update as the user scrolls."
  ],
  links: {
    Live: "http://www.thymes-cookbook.com",
    GitHub: "https://github.com/wmcmeans/cookbook"
  }
};

var SPOTS = {
  img: "spots-screenshot.jpg",
  description: "Spots is a connect-the-dot browser game based on the popular mobile app.",
  features: [
    "Responds to user interaction using jQuery and CSS hoverstates.",
    "Calculates node entry/exit points with custom algorithms to create desired interactions.",
    "Changes game state behind the scenes with JavaScript to update visual representation."
  ],
  links: {
    Live: "spots/game.html",
    GitHub: "https://github.com/wmcmeans/spots"
  }
};

var RAILSLITE = {
  img: "",
  description: "Rails Lite is a web framework based inspired by Ruby on Rails.",
  features: [
    "Routes requests to the appropriate controllers using the Rake router.",
    "Executes actions and renders content through controller methods."
  ],
  links: {
    GitHub: "https://github.com/wmcmeans/rails-lite"
  }
};


function createProjectHTML(projectName) {
  var project;
  switch (projectName) {
    case "Cookbook":
      project = COOKBOOK;
      break;
    case "Spots":
      project = SPOTS;
      break;
    case "Rails Lite":
      project = RAILSLITE;
      break;
    }
  var html =  "<div class='main-img-container'>" +
                "<!-- IMAGE PLACEHOLDER -->" +
                "<img class='macbook' src='lib/images/macbook-retina.png' alt='' />" +
                "<div class='screenshot-outer-container'>" +
                  "<div class='screenshot-inner-container'>" +
                    "<img class='project-screenshot' src='lib/images/" + project.img + "' />" +
                  "</div>" +
                "</div>" +
              "</div>" +
              "<section class='project-description'>" +
                project.description +
                "<ul>" +
                  "Features:";
      project.features.forEach(function (feature) {
        html += "<li>" + feature + "</li>";
      });
      html +=   "</ul>" +
              "<div class='project-links'>";
      for (var key in project.links) {
        html += "<a target='_blank' href='" + project.links[key] + "'>" + key + "</a>";
      }
      html += "</div>" +
      "</section>";

  return html;
}

$(function () {
  $('a.profile-link').click(toggleProfileView);
  $('div.overlay').click(toggleProjectView);

  switchProjectView('');
  $('li.project-link').click(switchProjectView);

  function switchProjectView(e) {
    if (e.target == $('li.project-link.active')[0]) {
      return;
    }

    var target = e.target || $('li.project-link.cookbook')[0];
    window.clearTimeout(this.animateSS);

    $('li.project-link').removeClass('active');
    $(target).addClass('active');

    var html = createProjectHTML(target.innerHTML);

    $('img.project-screenshot').css('bottom', 0);
    $('article.project-details').hide().html(html).fadeIn(500);

    this.animateSS = window.setTimeout(animateScreenshot, 1500);
  }
});


function toggleProfileView(e) {
  e.preventDefault();

  $('div.overlay').removeClass('inactive');
  $('section.profile').removeClass('inactive');

  $('main').animate({ left: '-65%'}, {
    duration: 1000,
    specialEasing: {
      left: "easeInOutQuad"
    },
    always: function (e) {
      $('section.projects').addClass('inactive');
      $('div.resume-link-container').addClass('sticky');
    }
  });
}

function toggleProjectView(e) {
  e.preventDefault();
  $("html, body").animate({
      scrollTop: 0
  }, 600, shiftLeft);

  function shiftLeft() {
    $('div.resume-link-container').removeClass('sticky');
    $('section.projects').removeClass('inactive');

    $('main').animate({ left: 0 }, {
      duration: 1000,
      specialEasing: {
        left: "easeInOutQuad"
      },
      always: function (e) {
        $('div.overlay').addClass('inactive');
        $('section.profile').addClass('inactive');
      }
    });
  }
}

function animateScreenshot() {
  var screenshot = $('img.project-screenshot');
  var containerHeight = $('div.screenshot-inner-container').height();
  var ssHeight = screenshot.height();
  screenshot.animate({ top: "-" + (ssHeight - containerHeight) }, {
    duration: 1500,
    specialEasing: {
      bottom: "easeInOutQuad"
    }, complete: function () {
      screenshot.css({"bottom": 0, "top": ""});
    }
  });
}
