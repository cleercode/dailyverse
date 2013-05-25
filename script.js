var colors = [
  ['#2ecc71', '#229552'],
  ['#d96256', '#c0392b'],
  ['#e95d43', '#d03518'],
  ['#9daa38', '#6e7727'],
  ['#3bb183', '#2a7e5d'],
  ['#ef853f', '#d86112'],
  ['#13d6e8', '#0e9ca9'],
  ['#76307e', '#481d4d']
];
var defaultVersion = 47;

function pickColor() {
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function write(json) {
  var votd = json.votd;
  document.getElementById('verse').innerHTML = votd.text.replace('&ldquo;', ''). replace('&rdquo;', '');
  document.getElementById('ref').href = votd.permalink;
  document.getElementById('ref').innerHTML = votd.reference;
  document.title = votd.reference;
};

function loadScript() {
  var version = localStorage.version || defaultVersion,
      script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://www.biblegateway.com/votd/get/?format=json&version=' + version + '&callback=write';
  document.body.appendChild(script);
}

function restoreVersion() {
  var version = localStorage.version || defaultVersion;

  var select = document.getElementById('version');
  for (var i = 0; i < select.children.length; i++) {
    var child = select.children[i];
    if (child.value == version) {
      child.selected = 'true';
      break;
    }
  }
}

function setVersion() {
  var version = this.children[this.selectedIndex].value;
  localStorage.version = version;
  loadScript();
}

window.onload = function() {
  var color = pickColor();
  document.body.style.color = color[0];
  document.body.style.backgroundColor = color[1];
  restoreVersion();
  loadScript();
  document.getElementById('version').onchange = setVersion;
};