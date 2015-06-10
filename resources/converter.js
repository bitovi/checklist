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
        name: current.name ? current.name : current.label,
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
          name: current.name ? current.name : current.label,
          class: 'form-control'
        }
      };
    },
    section: function(current, depth) {
      var dform = {
        caption: getLabel(current),
        type: 'fieldset',
        name: current.name ? current.name : current.label,
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
  
  var PasteBucket = function () {
    var pasteBucket = {
      visible: false,
      toggle: function (force) {
        if (typeof force !== 'undefined') {
          this.visible = force;
        } else {
          this.visible = !this.visible;
        }
        
        if (this.visible) {
          $('.paste-tool').show();
        } else {
          $('.paste-tool').hide();
        }
      },
      processData: function () {
        var pasteData = $('.paste-tool .paste-bucket').val(),
            self = this;

        if (pasteData.length === 0) {
          $('.paste-bucket').parent('.form-group').addClass('has-error');
          return false;
        }
        self.loadDataFromString(pasteData);
        self.toggle();
      },
      checkParams: function () {
        
        var searchTerms = new can.List(window.location.search.replace('?','').split('&')),
          pastedLink;
        searchTerms.each(function (item) {
          var params = item.split('=');
          if (params[0] === 'checklist' && params[1]) {
            pastedLink = decodeURI(params[1]);
          }
        });
        
        if (pastedLink) {
          this.loadDataFromString(pastedLink);
        }
      },
      loadDataFromString: function (dataString) {
        var pasteDataMap = new can.Map(JSON.parse(dataString))
        pasteDataMap.each(function (val, key, item) {
            var $target = can.$('[name='+key+']');
            if ($target.eq(0).is('[type=checkbox]')) {
                val.each(function (chkboxVal) {
                    $target.filter('[value="'+chkboxVal+'"]').prop('checked', true);
                });
                
                return true;
            }
            if ($target.eq(0).is('[type=radio]')) {
                $target.filter('[value="'+val+'"]').prop('checked', true);
                return true;
            }
            $target.val(val);
            
        });
      }
    }
    return pasteBucket;
  }
  var pasteBucket = new PasteBucket();
    
  $('.paste-tool .btn-default').on('click', function () {
    pasteBucket.processData();
  });
  pasteBucket.toggle(false);//close the bucket
  $('.open-paste-tool-js').on('click', function () {
    pasteBucket.toggle();
  });

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
    
    //check if linking into results
    pasteBucket.checkParams();
  });

  $('body').on('submit', 'form', function(ev){
    var data = $('form').formParams();
    ev.preventDefault();
    renderScore(data);
  })

  var answers = {
    "do-all-employees-go-through-a-technical-": 0.46,//Do all employees go through a technical training?
    "what-is-the-projects-vision": 0.45,//What is the project\'s vision?
    "how-long-until-something-can-be-released": 0.48,//How long until something can be released?
    "does-the-company-have-outings": 0.45,//Does the company have outings?
    "is-user-testing-done": 0.45,//Is user testing done?
    "the-following-documents-are-created": 0.44,//The following documents are created:
    "there-are-code-reviews": 0.28,//There are code reviews
    "are-there-unit-tests": 0.2,//Are there unit tests?
    "is-there-documentation-for-the-code": 0.28,//Is there documentation for the code?
    "continuous-integration": 0.2,//Continuous integration
    "the-following-environments-exist": 0.2//The following environments exist
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
