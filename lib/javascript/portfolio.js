$(function () {
  $('a.profile-link').click(toggleProfileView);
  $('div.overlay').click(toggleProjectView);

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
