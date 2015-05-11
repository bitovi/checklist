$(function() {
  var getLabel = function(current) {
    return current.help ? current.label + ' <br><small>' + current.help + '</small>' :
      current.label;
  };
  var optionList = function(name) {
    return function(current, depth) {
      var dform = {
        caption: getLabel(current),
        type: name,
        options: {},
        name: current.label
      };
      $.each(current.values, function(index, value) {
        dform.options[value] = value;
      });
      return dform;
    }
  };
  var converters = {
    default: function(current, depth) {
      return {
        type: 'div',
        class: 'form-group',
        html: {
          caption: getLabel(current),
          type: current.type,
          class: 'form-control'
        }
      };
    },
    section: function(current, depth) {
      var dform = {
        caption: getLabel(current),
        type: 'fieldset',
        id: current.id,
        html: []
      };
      $.each(current.questions || [], function(index, question) {
        dform.html.push(convert(question, depth + 1));
      });

      return dform;
    },
    single: optionList('radiobuttons'),
    multi: optionList('checkboxes')
  };

  var convert = function(data, depth) {
    var converter = converters[data.type];
    converter = converter || converters.default;
    return converter(data, depth ? depth + 1 : 0);
  };

  $.getJSON('questions.json').then(function(data) {
    var questions = data.questions;

    $('#heading').append(data.heading);

    $.each(questions, function(index, question) {
      $('#checklist').dform(convert(question));
    });

    $('[type="checkbox"]').each(function() {
      $(this).next().prepend($(this)).wrap('<div class="checkbox">');
    });

    $('[type="radio"]').each(function() {
      $(this).next().prepend($(this)).wrap('<div class="radio">');
    });
  });
});
