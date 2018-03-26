$(document).ready(function() {

  //loads the first slide
  $("#home").addClass("active-container");
  $("#home").animate({
    "top":"-100px"
  }, 500);

  //function to target the div's

  $('#menu').find('li a[href*=#]').click(function() {


    //Gives the button clicked on a class for style purposes
    if( $("#menu li a").hasClass("menu-item-active") ) {
      $("#menu li a").removeClass("menu-item-active");
    }
    $(this).addClass("menu-item-active");

    //checks if the links "href" contains any special characters and if the hostname is equal to the current
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {

      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');

      var currentTarget = $('.active-container');

      if (target.length) {

        //If the clicked link is already displayed, return false
        if(target.hasClass("active-container")) {
          return false;
        }

        //Removes current slide
        currentTarget.animate({
          "top":"200%"
        }, 500).removeClass("active-container");

        //Slides in the new slide
        target.addClass("active-container");
        $(target).delay(700).animate({
          "top":"-100px"
        }, 500);
        return false;
      }
    }
  });
});
