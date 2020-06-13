function createLink(url){
    var link = $("<a> </a>").text("Download Image");
    link.attr({href : url})
    return link;
}

function addDisabler() {
var blockedImages = $('img');  
var blockedUrls = [];
/* add sources or urls to the list */
for(var i = 0; i < blockedImages.length; i++) {
  if(blockedUrls.indexOf(blockedImages[i].src) < 0){
    blockedUrls.push(blockedImages[i].src)
    var img = blockedImages[i];
    var imageLink = createLink(blockedImages[i].src);
    $(img).parent().append(imageLink);
  }
} 
/* End */

}
$(window).ready(addDisabler());
$(window).on("scroll", addDisabler());

