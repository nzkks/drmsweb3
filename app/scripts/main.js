$( document ).ready(function(){
  $(".button-collapse").sideNav();
  $('#accordionSlider').raccordion({
    speed: 1000,
    sliderWidth: 1200,
    sliderHeight: 243,
    autoCollapse: true
  });
  $(window).resize(function(){
    if ($(window).width() <= 320){
      $(".bio .card").removeClass("horizontal");
    } else {
      $(".bio .card").addClass("horizontal");
    }
  });
});
