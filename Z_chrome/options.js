// Saves options to chrome.storage
function save_options() {
  var safemode = document.getElementById('safemode').checked;
  var disableGifs = document.getElementById('disableGifs').checked;

  chrome.storage.sync.set({
    safemode: safemode,
    disableGifs: disableGifs,
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    safemode: true,
    disableGifs: true
  }, function(items) {
    document.getElementById('safemode').checked = items.safemode;
    document.getElementById('disableGifs').checked = items.disableGifs;

  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);