var colors = [
  '#424851',
  '#733933',
  '#575a41',
  '#34584a',
  '#a75924',
  '#32575b',
  '#443146',
];
var defaultVersion = 47;

function getRandomColor() {
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function write(json) {
  var votd = json.votd;
  document.getElementById('verse').innerHTML = votd.text.replace('&ldquo;', ''). replace('&rdquo;', '');
  document.getElementById('ref').href = votd.permalink;
  document.getElementById('ref').innerHTML = votd.reference;
  document.body.setAttribute('class', '');
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
  document.body.setAttribute('class', 'loading');
  document.body.style.backgroundColor = getRandomColor();
  restoreVersion();
  loadScript();
  document.getElementById('version').onchange = setVersion;
};
