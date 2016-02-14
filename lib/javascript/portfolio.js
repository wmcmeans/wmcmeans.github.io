$(function () {
  $('a.profile-link').click(function (e) {
    $('div.overlay').removeClass('inactive');
    $('main').animate({
      left: '-65%'
    }, 1000);

    $('div.overlay').click(function (e) {
      $('div.overlay').addClass('inactive');
      $('main').animate({
        left: '0'
      }, 1000);
    });
  });
});
