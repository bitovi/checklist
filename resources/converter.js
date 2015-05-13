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
          name: current.label,
          class: 'form-control'
        }
      };
    },
    section: function(current, depth) {
      var dform = {
        caption: getLabel(current),
        type: 'fieldset',
        name: current.label,
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
      $('#checklist').dform(convert(question))
    });

    $('[type="checkbox"]').each(function() {
      $(this).next().prepend($(this)).wrap('<div class="checkbox">');
    });

    $('[type="radio"]').each(function() {
      $(this).next().prepend($(this)).wrap('<div class="radio">');
    });

    $('#checklist').append("<div class='text-center'><input class='btn btn-lg btn-primary' type='submit' value='Submit' /></div>");
  });

  $('body').on('submit', 'form', function(ev){
    var data = $('form').formParams();
    ev.preventDefault();
    renderScore(data);
  })

  var answers = {
    "Do all employees go through a technical training?": 0.46,
    "What is the project\'s vision?": 0.45,
    "How long until something can be released?": 0.48,
    "Does the company have outings?": 0.45,
    "Is user testing done?": 0.45,
    "The following documents are created:": 0.44,
    "There are code reviews": 0.28,
    "Are there unit tests?": 0.2,
    "Is there documentation for the code?": 0.28,
    "Continuous integration": 0.2,
    "The following environments exist": 0.2
  }

  var getScore = function(data){
    var total = 0, count = 0;
    for (var key in answers){
      total += answers[key];
      count++;
    }
    var points = 0;
    for(var key in data) {
      if(answers[key] && data[key] !== "none" && data[key] !== "No"){
        points+=answers[key];
      }
    }
    return parseInt(points/total*100, 10);
  }

  var renderScore = function(data){
    var score = getScore(data);
    $(".links").remove();
    $('#checklist').html(can.view("resources/doughnut.mustache")({
        score: score
    }));
    $("#doughnutChart").drawDoughnutChart([
      { 
        title: "Yes, beyond your wildest dreams :)",
        value : score,  
        color: "#4BA658" 
      },
      { 
        title: "No, burning flames are in your future :(",
        value:  100-score,   
        color: "#D93B48" 
      }
    ], {

    });
    $('#checklist').append("<div class='answers'>"+JSON.stringify(data)+"</div>");
  }
});
