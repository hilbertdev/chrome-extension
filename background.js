var allowMedia = []
var extState;
var blockedMedia = 0;
chrome.storage.sync.set({ "extState": true }, function () {
})
var totalImages = 0
chrome.webRequest.onBeforeSendHeaders.addListener(
  function cancelImageRequest (details) {
    /* The function below checks if the url strings contains any of the extensions stored in the variable 'imageExtensions'. 
       If the URL contains the file extension, it returns true, else it returns false   
    */
    function removeImages (url) {
      var imageExtensions = 'jpeg,jpg,image,png,gif,mp4,mov,mkv,flv,f4v,avi,avchd,wmv,webm,webp'.split(
        ','
      )
      var hasImage = false
      imageExtensions.forEach(extension => {
        if (url.includes(extension)) {
          hasImage = true
        }
      })
      return hasImage
    }
    var cancelRequest = removeImages(details.url)
    if (extState == false) {
      return { cancel: false }
    } else {
      /* If the browser has added more parameters, a new string that excludes those parameters is created, else the string is used as it is */
      if(details.url.indexOf('?') > 0){
        var newUrl = details.url.substring(0, details.url.indexOf('?'));
        if (allowMedia.indexOf(newUrl) == -1) {
          if (details.type == 'image') {
            blockedMedia++;
            return { cancel: true }
          }
          else{
            if(cancelRequest){
              blockedMedia++;
            }
            return {cancel: cancelRequest}
          }
       
        } else if (allowMedia.indexOf(newUrl) > -1) {
          return { cancel: false }
        }
      }
      else {
        if (allowMedia.indexOf(details.url) == -1) {
          if (details.type == 'image') {
            blockedMedia++;
            return { cancel: true }
          }
          else{
            if(cancelRequest){
              blockedMedia++;
            }
            return {cancel: cancelRequest}
          }
        } else if (allowMedia.indexOf(details.url) > -1) {
          return { cancel: false }
        }  
      }
    }
  },
  {
    types: ['sub_frame', 'script', 'image', 'xmlhttprequest', 'other'],
    urls: ['<all_urls>']
  },
  ['blocking', 'requestHeaders']
)
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  var url = request.urlMessage
  var index = allowMedia.indexOf(url)
  if (index > -1) {
    sendResponse({ urlStatus: 'Url has already been added' })
  } else {
    if(url.indexOf('?') > 0){
      var newUrl = url.substring(0, url.indexOf('?'));
      allowMedia.push(newUrl);
      $.ajax({
        url: url,
        type: 'GET',
        success: function(response){
            console.log(response);
        }
     });
    }
    else {
      allowMedia.push(url);
      $.ajax({
        url: url,
        type: 'GET',
        success: function(response){
            console.log(response);
        }
     });
    }
    sendResponse({ urlStatus: 'Url Added!' })
  }
  return true
})
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  var checkState
  chrome.storage.sync.get("extState", function (result) {
    checkState = result.extState
  });
  chrome.storage.sync.set({ "extState": request.status }, function (result) {
    sendResponse({ status: `Extension status: ${checkState}` });
  });
  return true;
});
chrome.webRequest.onHeadersReceived.addListener(function(response){
  var corsHeader = {
    name:"Access-Control-Allow-Origin",
    value: "*"
  }
  response.responseHeaders.push(corsHeader);
},  
{
  types: [ 'xmlhttprequest'],
  urls: ['<all_urls>']
},
['responseHeaders'])