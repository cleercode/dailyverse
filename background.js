
// Retrieve a previously saved copy, if available
var script = localStorage.getItem('script') || '';
var url = 'http://www.ourmanna.com/verses/api/js/';

var updateInterval = 2 * 60 * 60 * 1000; // Updates every 2 hours

function update() {
    var x = new XMLHttpRequest();
    x.onload = function() {
        if (x.status == 200) {
            console.log('Retrieved file. Size: ' + x.responseText.length);
            script = x.responseText;
            // Cache code
            localStorage.setItem('script', script);
        } else console.log('Error retrieving ga.js; Status code ' + x.status);
        if (updateInterval)  setTimeout(updateGA, updateInterval);
    };
    x.onerror = function() {
        console.log('Error retrieving ga.js');
        if (updateInterval)  setTimeout(updateGA, updateInterval);
    };
    x.open('GET', url);
    x.send();
}
// Trigger
update();

chrome.extension.onRequest.addListener(function(request, sender) {
    if (request === 'INJECT_GA' && sender.tab) {
        console.log('yo')
        chrome.tabs.executeScript(sender.tab.id, {file: ga_config_file});
        if (script) {
            chrome.tabs.executeScript(sender.tab.id, {code: ga_code});
        } else {
            chrome.tabs.executeScript(sender.tab.id, {file: ga_code_file});
        }
    }
});