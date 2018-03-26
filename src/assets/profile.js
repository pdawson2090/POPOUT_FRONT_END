// dropdown function
$('.profile__toggle').click(function() {
  $('.profile__drop', this).slideToggle(200);
});

$('.drop').click(function() {
  $('.drop__menu', this).slideToggle(200);
});



// add / remove class from friend, like, and view btn
$('.header__wrap li, .add__icon').click(function() {
  $(this).toggleClass('active__icon');
});

$('.switch input').change(function() {
  if ($('.switch input').is(':checked')) {
    $('.wrapper').addClass('window');
    $('.wrapper').removeClass('phone');
  } else {
    $('.wrapper').addClass('phone');
    $('.wrapper').removeClass('window');
  }
});


//toggle chat
$('.open__chat').click(function() {
  $('.send__action').slideToggle(200);
  $(this).toggleClass('disable');
  $('.send__chat').removeClass('disable');
});
$('.send__chat').click(function() {
  $('.send__action').slideToggle(200);
  $(this).toggleClass('disable');
  $('.open__chat').removeClass('disable');
});


// slick.js (phone swipe slider)
// $('.slides').slick({
//   infinite: true,
//   slidesToShow: 3,
//   slidesToScroll: 3,
//   dots: false,
//   prevArrow: false,
//   nextArrow: false,
//
//   centerMode: true,
//   centerPadding: 50,
//   slidesToShow: 3
// });
$('.slides').on('swipe', function(event, slick, direction) {});
