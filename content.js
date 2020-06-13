function addDisabler() {
  var allImages = $("img, svg");
  $.each(allImages, function(idx,ele) {
    $(ele).addClass("disableImage");
    var alt = $(ele).attr("alt");
    var href = $(ele).attr("href");
    if(alt){
     // console.log(alt);
      $(ele).html(href);
    }
    else {
      console.log($(ele));
      $(ele).html("Image Blocked!");
      $(ele).html(href);
    }
  })

}
$(window).ready(addDisabler());
$(window).on("scroll", addDisabler());

