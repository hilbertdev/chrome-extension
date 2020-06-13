chrome.webRequest.onBeforeRequest.addListener(
    function cancelImageRequest(details){
    var urls = [];
    
   //the function checks if the url has any image extensions
    function removeImages(url) {
    var imageExtensions = 'jpeg,jpg,image,png,gif,mp4,mov,mkv,flv,f4v,flash,avi,avchd,wmv,webm,webp,svg,ico'.split(',');
    var hasImage = false;
    imageExtensions.forEach((extension)=> {
         if(url.includes(extension)){
             hasImage = true;
         }
    })
    return hasImage;
   }
/*    function getUrls(requestObject) {
       var imageUrl = requestObject.url;
       console.log(imageUrl);
       urls.push(imageUrl);
       chrome.tabs.executeScrpit(tabId, {
        file: "content.js"
    }, function(){
         chrome.tabs.sendMessage(tabId, {parameter: details.url});
    });
   } */
    
    if (details.type === "image"){
        return {cancel: true};  
        }
   else {
       var cancelRequest = removeImages(details.url);
       return {cancel: cancelRequest };
       }
       },
       {types: ["sub_frame", "script", "image", "xmlhttprequest", "other"],
        urls: ["<all_urls>"]
       },
       ["blocking"]
   );

   