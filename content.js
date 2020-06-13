function addDisabler() {
var blockedImages = $('img');  
var blockedUrls = [];
/* add sources or urls to the list */
for(var i = 0; i < blockedImages.length; i++) {
   blockedUrls.push(blockedImages[i].src)
   console.log(blockedImages[i]);
 // blockedImages[i].html(blockedImages[i].src);
} 
console.log(blockedUrls); 
/* End */

}
$(window).ready(addDisabler());
$(window).on("scroll", addDisabler());

