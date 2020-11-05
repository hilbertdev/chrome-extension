$(".custom-control-input").on('click', function (){
    if($(this).hasClass("on")){
        $(this).removeClass("on");
        $('.status').text("The extension has been switched off, reload to see results");
        chrome.runtime.sendMessage({status: false}, function(response) {
            console.log(response.status);
          });
    }
    else{
        $(this).addClass("on");
        $('.status').text("The extension has been switched on, reload to see results");
        chrome.runtime.sendMessage({status: true}, function(response) {
            console.log(response.status);
          });
    }
})
chrome.storage.sync.get("imageCount", function (result) {
    $(".summary").text(`Total Images Blocked: ${result.imageCount} \n` + ` Data Saved: 100KB`);
  })