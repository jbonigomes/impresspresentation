(function() {

  // Raphael clock
  window.onload = function () {
    var r = Raphael("holder", 600, 600),
        R = 200,
        init = true,
        param = {stroke: "#fff", "stroke-width": 30},
        hash = document.location.hash,
        marksAttr = {fill: hash || "#444", stroke: "none"};

    r.customAttributes.arc = function (value, total, R) {
      var alpha = 360 / total * value,
          a = (90 - alpha) * Math.PI / 180,
          x = 300 + R * Math.cos(a),
          y = 300 - R * Math.sin(a),
          color = "hsb(".concat(Math.round(R) / 200, ",", value / total, ", .75)"),
          path;

      if(total == value) {
        path = [["M", 300, 300 - R], ["A", R, R, 0, 1, 1, 299.99, 300 - R]];
      } else {
        path = [["M", 300, 300 - R], ["A", R, R, 0, +(alpha > 180), 1, x, y]];
      }

      return {path: path, stroke: color};
    };

    drawMarks(R, 60);
    var sec = r.path().attr(param).attr({arc: [0, 60, R]});
    R -= 40;
    drawMarks(R, 60);
    var min = r.path().attr(param).attr({arc: [0, 60, R]});
    R -= 40;
    drawMarks(R, 12);
    var hor = r.path().attr(param).attr({arc: [0, 12, R]});
    R -= 40;
    drawMarks(R, 31);
    var day = r.path().attr(param).attr({arc: [0, 31, R]});
    R -= 40;
    drawMarks(R, 12);
    var mon = r.path().attr(param).attr({arc: [0, 12, R]});
    var pm = r.circle(300, 300, 16).attr({stroke: "none", fill: Raphael.hsb2rgb(15 / 200, 1, .75).hex});

    function updateVal(value, total, R, hand, id) {
      if(total == 31) { // month
        var d = new Date;
            d.setDate(1);
            d.setMonth(d.getMonth() + 1);
            d.setDate(-1);
            total = d.getDate();
      }
      
      var color = "hsb(".concat(Math.round(R) / 200, ",", value / total, ", .75)");
      
      if(init) {
        hand.animate({arc: [value, total, R]}, 900, ">");
      } else {
        if(!value || value == total) {
          value = total;
          hand.animate({arc: [value, total, R]}, 750, "bounce", function () {
            hand.attr({arc: [0, total, R]});
          });
        } else {
          hand.animate({arc: [value, total, R]}, 750, "elastic");
        }
      }
    }

    function drawMarks(R, total) {
        if (total == 31) { // month
            var d = new Date;
            d.setDate(1);
            d.setMonth(d.getMonth() + 1);
            d.setDate(-1);
            total = d.getDate();
        }
        var color = "hsb(".concat(Math.round(R) / 200, ", 1, .75)"),
            out = r.set();
        for (var value = 0; value < total; value++) {
            var alpha = 360 / total * value,
                a = (90 - alpha) * Math.PI / 180,
                x = 300 + R * Math.cos(a),
                y = 300 - R * Math.sin(a);
            out.push(r.circle(x, y, 2).attr(marksAttr));
        }
        return out;
    }

    (function () {
      var d = new Date,
          am = (d.getHours() < 12),
          h = d.getHours() % 12 || 12;

      updateVal(d.getSeconds(), 60, 200, sec, 2);
      updateVal(d.getMinutes(), 60, 160, min, 1);
      updateVal(h, 12, 120, hor, 0);
      updateVal(d.getDate(), 31, 80, day, 3);
      updateVal(d.getMonth() + 1, 12, 40, mon, 4);
      pm[(am ? "hide" : "show")]();
      setTimeout(arguments.callee, 1000);
      init = false;
    })();
  };


  // Inits
  impress().init();


  // animate numbers
  function animateNumbers(el, start, end) {
    $({animValue: start}).animate({animValue: end}, {
      duration: 1000,
      easing:'swing',
      step: function() {
        el.text(Math.ceil(this.animValue));
      }
    });
  }


  // Steps
  function animateStep3() {
    var icons = $('#step-3 i');

    icons
      .removeClass('fadeOut animated')
      .addClass('fadeInLeftBig animated');
    
    icons
      .siblings('.content')
      .removeClass('fadeOut animated')
      .addClass('fadeInRightBig animated');

    setTimeout(function(){
      animateNumbers($('#step-3 .age'), 0, 31);
      animateNumbers($('#step-3 .foot'), 0, 5);
      animateNumbers($('#step-3 .inch'), 0, 9);
      animateNumbers($('#step-3 .salary'), 0, 22);
      animateNumbers($('#step-3 .invert'), 9, 0);
      animateNumbers($('#step-3 .month'), 0, 6);
      animateNumbers($('#step-3 .yearleft'), 0, 20);
      animateNumbers($('#step-3 .yearright'), 0, 13);
    }, 100);
  }

  function animateStep4() {
    var curStep = $('#step-4');

    setTimeout(function() {
      var curIcon = curStep.find('.fa-flag');

      curIcon
        .removeClass('fadeOutLeftBig animated')
        .addClass('fadeInLeftBig animated');

      curIcon
        .siblings('.content')
        .removeClass('fadeOutRightBig animated')
        .addClass('fadeInRightBig animated');
    }, 1);
  
    setTimeout(function() {
      var curIcon = curStep.find('.fa-desktop');

      curIcon
        .removeClass('fadeOutLeftBig animated')
        .addClass('fadeInLeftBig animated');

      curIcon
        .siblings('.content')
        .removeClass('fadeOutRightBig animated')
        .addClass('fadeInRightBig animated');
    }, 200);
  
    setTimeout(function() {
      var curIcon = curStep.find('.fa-eye');

      curIcon
        .removeClass('fadeOutLeftBig animated')
        .addClass('animated fadeInLeftBig');

      curIcon
        .siblings('.content')
        .removeClass('fadeOutRightBig animated')
        .addClass('fadeInRightBig animated');
    }, 400);
  
    setTimeout(function() {
      var curIcon = curStep.find('.fa-futbol-o');

      curIcon
        .removeClass('fadeOutLeftBig animated')
        .addClass('fadeInLeftBig animated');

      curIcon
        .siblings('.content')
        .removeClass('fadeOutRightBig animated')
        .addClass('fadeInRightBig animated');
    }, 600);
  }

  function animateStep6() {
    $('.house')
      .removeClass('animated fadeOut')
      .addClass('animated fadeIn');

    setTimeout(function() {
      $('.es-face')
        .removeClass('animated fadeOutLeftBig')
        .addClass('animated fadeInLeftBig');
    }, 1000);

    setTimeout(function() {
      $('.gf-face')
        .removeClass('animated fadeOutLeftBig')
        .addClass('animated fadeInLeftBig');
    }, 1200);

    setTimeout(function() {
      $('.snow')
        .removeClass('animated fadeOut')
        .addClass('animated fadeIn');

      $('.mills')
        .removeClass('animated fadeOut')
        .addClass('animated fadeIn');
    }, 1500);
  }

  function animateStep9() {
    setTimeout(function() {
      $('#step-9 i')
        .removeClass('animated fadeOut')
        .addClass('animated fadeIn');
    }, 1000);
  }


  // Events
  document.addEventListener('impress:stepleave', function(e) {
    switch(e.target.id) {
      case 'step-2':
        animateStep3();
        break;

      case 'step-3':
        animateStep4();
        break;

      case 'step-5':
        animateStep6();
        break;

      case 'step-8':
        animateStep9();
        break;
    }
  }, false);

})();
