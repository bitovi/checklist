var _ = require('underscore');
var fs = require('fs');
var path = require('path');

var questions = require(path.join(__dirname, '..', 'questions.json'));
var converters = {
  default: function(current) {
    var markdown = '__' + current.label + '__\n';
    if(current.help) {
      markdown += '> ' + current.help + '\n';
    }
    return markdown + '\n';
  },
  section: function(current, depth) {
    depth = depth || 0;

    var headers = _.times(depth + 1, function() {
      return '#';
    }).join('');
    var markdown = headers +  ' ' + current.label + '\n\n';
    if(current.help) {
      markdown += '> ' + current.help + '\n';
    }
    current.questions.forEach(function(question) {
      markdown += convert(question, depth + 1);
    });
    return markdown + '\n';
  },
  single: function(current) {
    var markdown = converters.default(current) + '\n';
    current.values.forEach(function(value) {
      markdown += '- ' + value + '\n';
    });
    return markdown + '\n';
  },
  multi: function(current) {
    var markdown = converters.default(current) + '\n';
    current.values.forEach(function(value) {
      markdown += '- [ ] ' + value + '\n';
    });
    return markdown + '\n';
  }
};
var convert = function(data, depth) {
  var converter = converters[data.type];
  converter = converter || converters.default;
  return converter(data, depth);
};

fs.readFile(path.join(__dirname, 'readme.md.tpl'), function(error, markdown) {
  var render = _.template(markdown.toString());
  var data = {
    heading: questions.heading,
    questions: questions.questions.map(function(q) {
      return convert(q, 2);
    }).join('\n')
  };

  console.log(render(data));
});

