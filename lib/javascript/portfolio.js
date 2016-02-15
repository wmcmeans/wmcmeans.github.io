var COOKBOOK = {
  img: "",
  description: "Cookbook is an app for delicious recipes inspired by cooking.nytimes.com.",
  features: [
    "Encourages users to sign up and save recipes to their accounts.",
    "Implements continuously updated search queries to return results in real time.",
    "Protects user privacy through private note options and anonymous metadata.",
    "Dynamically displays header content to update as the user scrolls."
  ],
  links: {
    Live: "http://www.thymes-cookbook.com",
    GitHub: "https://github.com/wmcmeans/cookbook"
  }
};

var SPOTS = {
  img: "",
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
                "<img class='macbook' src='lib/images/macbook-pro.png' alt='' />" +
                "<div class='img-placeholder'></div>" +
              "</div>" +
              "<p>" +
                project.description +
                "<ul>" +
                  "Features:";
      project.features.forEach(function (feature) {
        html += "<li>" + feature + "</li>";
      });
      html +=   "</ul>" +
              "</p>" +
              "<div class='project-links'>";
      for (var key in project.links) {
        html += "<a target='_blank' href='" + project.links[key] + "'>" + key + "</a>";
      }
      html += "</div>";

  return html;
}

$(function () {
  $('a.profile-link').click(toggleProfileView);
  $('div.overlay').click(toggleProjectView);

  createProjectHTML("Cookbook");
  $('li.project-link').click(function (e) {
    $('li.project-link').removeClass('active');
    $(e.target).addClass('active');

    var html = createProjectHTML(e.target.innerHTML);

    $('article.project-description').hide().html(html).fadeIn(500);
  });

  function toggleProfileView(e) {
    e.preventDefault();

    $('div.overlay').removeClass('inactive');
    $('section.profile').removeClass('inactive');

    $('main').animate({
      left: '-65%'
    }, 1000, "linear", function (e) {
      $('section.projects').addClass('inactive');
    });
  }

  function toggleProjectView(e) {
    e.preventDefault();
    $("html, body").animate({
        scrollTop: 0
    }, 600, shiftLeft);

    function shiftLeft() {
      $('section.projects').removeClass('inactive');

      $('main').animate({
        left: '0'
      }, 1000, "linear", function (e) {
        $('div.overlay').addClass('inactive');
        $('section.profile').addClass('inactive');
      });
    }
  }
});
