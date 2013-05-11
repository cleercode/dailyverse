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

function pickColor() {
  var random = Math.floor(Math.random() * colors.length);
  return colors[random];
}

function write(json) {
  var votd = json.votd;
  document.write('<p class="verse">' + votd.text.replace('&ldquo;', ''). replace('&rdquo;', '') + '</p>');
  document.write('<a class="ref" href="' + votd.permalink +'">' + votd.reference + '</a>');
  document.title = votd.reference;
};

window.onload = function() {
  var color = pickColor();
  document.body.style.color = color[0];
  document.body.style.background = color[1];
};