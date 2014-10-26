(function() {

  // A few GloCals :D
  var clockTimeout;
  Chart.defaults.global.responsive = true;

  // Raphael clock
  function raphClock() {

    // Clear the html
    $('#holder').html('');

    // Start clock config
    var r = Raphael("holder", 600, 600),
        R = 80,
        param = {stroke: "#fff", "stroke-width": 30},
        hash = document.location.hash,
        marksAttr = {fill: hash || "#444", stroke: "none"};

    // Add some attributes
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

    // Set the arcs
    var secs = r.path().attr(param).attr({arc: [0, 60, 80]});
    var mins = r.path().attr(param).attr({arc: [0, 60, 40]});

    // Dot in the middle
    r.circle(300, 300, 16).attr({stroke: "none", fill:"#BF5600"});

    // The function that creates the ticking effect
    function updateVal(value, total, R, hand) {
      if(value == total) {
        hand.animate({arc: [value, total, R]}, 750, "bounce", function () {
          hand.attr({arc: [0, total, R]});
        });
      } else {
        hand.animate({arc: [value, total, R]}, 750, "elastic");
      }
    }

    // Set the defaults outside the recursive function
    seconds = 0;
    minutes = 0;

    // The recursive function
    (function () {

      if(seconds > 60) {
        seconds = 0;
        minutes = minutes + 20;
      }

      if(minutes > 60) {
        minutes = 0;
      }

      updateVal(seconds, 60, 80, secs);
      updateVal(minutes, 60, 40, mins);

      seconds = seconds + 1;

      clockTimeout = setTimeout(arguments.callee, 1000);

    })();

  }


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


  // pie chart data
  function pieInit() {
    var pieData = [
      {
        value: 55,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "Verizon",
        labelColor: "white",
        labelFontSize: "20"
      },
      {
        value: 45,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Vodafone",
        labelColor: "white",
        labelFontSize: "20"
      }
    ];

    var ctx = document.getElementById("phoneperc").getContext("2d");
    window.myPie = new Chart(ctx).Pie(pieData);
  }


  // Data pie init
  function dataPieInit() {
    var pieData = [
      {
        value: 98,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "Google, Microsoft & Yahoo",
        labelColor: "white",
        labelFontSize: "20"
      },
      {
        value: 2,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Other"
      }
    ];

    var ctx = document.getElementById("dataperc").getContext("2d");
    window.myPie = new Chart(ctx).Pie(pieData);
  }

  // Hero bar init
  function heroBarInit() {
    var barChartData = {
      labels : ["RT","Aljazeera","BBC","Sky News","ITV"],
      datasets : [
        {
          fillColor : "rgba(205,187,151,0.5)",
          strokeColor : "rgba(205,187,151,0.8)",
          highlightFill : "rgba(205,187,151,0.75)",
          highlightStroke : "rgba(205,187,151,1)",
          data : [100,100,10,10,10]
        },
        {
          fillColor : "rgba(151,187,205,0.5)",
          strokeColor : "rgba(151,187,205,0.8)",
          highlightFill : "rgba(151,187,205,0.75)",
          highlightStroke : "rgba(151,187,205,1)",
          data : [10,10,100,100,100]
        }
      ]
    }

    var ctx = document.getElementById("herobar").getContext("2d");
    window.myBar = new Chart(ctx).Bar(barChartData, {
      responsive : true
    });
  }


  function radarInit() {
    var radarChartData = {
      labels: ["Hero","Whistleblower","Citizen","Spied Upon","Theory","Unethical","Public","Vilan","Passive","Fugitive","Spy","Concrete","Ethical","Government"],
      datasets: [
        {
          label: "My Second dataset",
          fillColor: "rgba(151,187,205,0.2)",
          strokeColor: "rgba(151,187,205,1)",
          pointColor: "rgba(151,187,205,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: [50,100,50,50,50,50,100,50,0,50,50,50,50,0]
        }
      ]
    };

    window.myRadar = new Chart(document.getElementById("overviewRadar").getContext("2d")).Radar(radarChartData, {
      responsive: true
    });
  }

  // Start impress.js
  impress().init();


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
      case 'step-1':
        clearTimeout(clockTimeout);
        raphClock();
        break;

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

      case 'step-10':
        clearTimeout(clockTimeout);
        raphClock();
        break;

      case 'step-12':
        pieInit();
        dataPieInit();
        break;

      case 'step-14':
        heroBarInit();
        break;

      case 'step-15':
        clearTimeout(clockTimeout);
        raphClock();
        radarInit();
        break;
    }
  }, false);

})();
