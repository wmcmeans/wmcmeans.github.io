$(function () {
  $('a.profile-link').click(function (e) {
    $('div.overlay').removeClass('inactive');
    $('section.profile').removeClass('inactive');
    $('main').animate({
      left: '-65%'
    }, 1000, "linear", function (e) {
      $('section.projects').addClass('inactive');
    });

    $('div.overlay').click(function (e) {
      $("html, body").animate({
            scrollTop: 0
        }, 350, toggleProjectView);
    });
  });

  function toggleProjectView(e) {
    $('section.projects').removeClass('inactive');
    $('div.overlay').addClass('inactive');
    $('main').animate({
      left: '0'
    }, 1000, function (e) {
      $('section.profile').addClass('inactive');
    });
  }
});
