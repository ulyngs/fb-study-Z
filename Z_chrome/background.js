const witToken = 'OGOKTADYKRSNC4X2EOU3NY5AXDPWGB4I'
var _randomId = null

chrome.storage.sync.get({
  randomId: null,
}, function(items) {
  if (items.randomId) {
    _randomId = items.randomId  
  } else {
    _randomId = guid()
    chrome.storage.sync.set({
      randomId: _randomId,
    });
  }
})

function sendMessageToWit(message) {
  $.ajax({
    url: 'https://api.wit.ai/message',
    data: {
      'q': message,
      'access_token' : witToken,
      'thread_id': _randomId,
    },
    dataType: 'jsonp',
    method: 'GET',
    success: function(response) {
        console.log("success!", response);
    },
    error: function(error) {
        console.log("error!", error);
    }
  })
  return true
}


function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
}
chrome.runtime.onMessage.addListener(sendMessageToWit);
