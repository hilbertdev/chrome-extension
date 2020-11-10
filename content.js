var totalImages = $('img').length;
function walkTheDom(node, depth, startNode){
  while(node[0]){
    if(depth == 0){
      return startNode;
    }
    if(node[0].nodeName == 'HEAD'){
      return startNode;
    }
    if(node[0].nodeName == 'A'){
      return node;
    }else{
      depth = depth - 1;
      node = node.parent();
      walkTheDom(node);
    } 
  }
  return node;
}
function countImages(){
  var images =  $('img');
for(var i = 0; i < images.length; i++){
   $(images[i]).addClass('blocked');

}
var blockedImages = $('.blocked');
chrome.storage.sync.set({ "imageCount": blockedImages.length}, function () {
  console.log(`Number of Images: ${blockedImages.length}`);
})
  }
function addCss(){
  var imagesBlocked = $(".blocked");
  for(var i = 0; i < imagesBlocked.length; i++){
    var url = imagesBlocked[i].src;
    var otherImages = imagesBlocked[i].srcset;
    var srcSet = imagesBlocked[i].dataset.srcset;
    var downloadButton = document.createElement("button");
    downloadButton.innerHTML = "Download Image"
    downloadButton.id = $(imagesBlocked[i]).id;
    downloadButton.className = "downloadButton";
    var imageLink = document.createElement("a");
    if(url.includes("data:")){

    imageLink.href = imagesBlocked[i].dataset.srcMedium;
    }
    else {
      imageLink.href = url;
    }
    if(typeof srcSet != "undefined" || otherImages.length > 0){
      if(typeof srcSet == "undefined"){
        imageLink.id = otherImages;
      }
      else{
        imageLink.dataset.srcset = srcSet;
      }
     
    }
    downloadButton.appendChild(imageLink);
    var link = walkTheDom($(imagesBlocked[i]), 10,$(imagesBlocked[i]));
    link.parent().parent().append(downloadButton);  
  }
}
function openTab(src){
  const image_window = window.open("", "_blank")
  image_window.document.write(`
        <html>
          <head>
          </head>
          <body>
            <img src=${src} alt="Example" height="50%" width="50%">
          </body>
        </html>
  `);
 }
function addButton () {
  countImages();
  addCss();
     $('.downloadButton,img').on('click', function () {
       var tagName = $(this)[0].tagName;
       if(tagName == 'BUTTON'){
        var button = $(this)[0];
        var image = $(button).children('a');
        var img = $(image)[0];
        if(typeof img.dataset.srcset != "undefined"){
          var dataset = img.dataset.srcset.split(',');
          dataset.forEach(src => {
            chrome.runtime.sendMessage({urlMessage: src}, function(response) {
              console.log(response.urlStatus);
            });
          });
          
        }
        else if(img.id.length != 0) {
          var srcset = img.id.split(',');
          srcset.forEach(src => {
            chrome.runtime.sendMessage({urlMessage: src}, function(response) {
              console.log(response.urlStatus);
            });
          })
        }
        chrome.runtime.sendMessage({urlMessage: img.href}, function(response) {
          console.log(response.urlStatus);
          img.load(img.href);
        });
       openTab(img.href);
       }
       else {
        var img = $(this)[0];
        chrome.runtime.sendMessage({urlMessage: img.src}, function(response) {
          console.log(response.urlStatus);
          img.load(img.src);
        });
       openTab(img.src);
       }
 
     });
}

$(window).ready(addButton())
