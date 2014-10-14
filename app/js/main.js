// window.onload = function () {
//     var r = Raphael("holder", 600, 600),
//         R = 200,
//         init = true,
//         param = {stroke: "#fff", "stroke-width": 30},
//         hash = document.location.hash,
//         marksAttr = {fill: hash || "#444", stroke: "none"};

//     r.customAttributes.arc = function (value, total, R) {
//         var alpha = 360 / total * value,
//             a = (90 - alpha) * Math.PI / 180,
//             x = 300 + R * Math.cos(a),
//             y = 300 - R * Math.sin(a),
//             color = "hsb(".concat(Math.round(R) / 200, ",", value / total, ", .75)"),
//             path;
//         if (total == value) {
//             path = [["M", 300, 300 - R], ["A", R, R, 0, 1, 1, 299.99, 300 - R]];
//         } else {
//             path = [["M", 300, 300 - R], ["A", R, R, 0, +(alpha > 180), 1, x, y]];
//         }
//         return {path: path, stroke: color};
//     };

//     drawMarks(R, 60);
//     var sec = r.path().attr(param).attr({arc: [0, 60, R]});
//     R -= 40;
//     drawMarks(R, 60);
//     var min = r.path().attr(param).attr({arc: [0, 60, R]});
//     R -= 40;
//     drawMarks(R, 12);
//     var hor = r.path().attr(param).attr({arc: [0, 12, R]});
//     R -= 40;
//     drawMarks(R, 31);
//     var day = r.path().attr(param).attr({arc: [0, 31, R]});
//     R -= 40;
//     drawMarks(R, 12);
//     var mon = r.path().attr(param).attr({arc: [0, 12, R]});
//     var pm = r.circle(300, 300, 16).attr({stroke: "none", fill: Raphael.hsb2rgb(15 / 200, 1, .75).hex});

//     function updateVal(value, total, R, hand, id) {
//         if (total == 31) { // month
//             var d = new Date;
//             d.setDate(1);
//             d.setMonth(d.getMonth() + 1);
//             d.setDate(-1);
//             total = d.getDate();
//         }
//         var color = "hsb(".concat(Math.round(R) / 200, ",", value / total, ", .75)");
//         if (init) {
//             hand.animate({arc: [value, total, R]}, 900, ">");
//         } else {
//             if (!value || value == total) {
//                 value = total;
//                 hand.animate({arc: [value, total, R]}, 750, "bounce", function () {
//                     hand.attr({arc: [0, total, R]});
//                 });
//             } else {
//                 hand.animate({arc: [value, total, R]}, 750, "elastic");
//             }
//         }
//     }

//     function drawMarks(R, total) {
//         if (total == 31) { // month
//             var d = new Date;
//             d.setDate(1);
//             d.setMonth(d.getMonth() + 1);
//             d.setDate(-1);
//             total = d.getDate();
//         }
//         var color = "hsb(".concat(Math.round(R) / 200, ", 1, .75)"),
//             out = r.set();
//         for (var value = 0; value < total; value++) {
//             var alpha = 360 / total * value,
//                 a = (90 - alpha) * Math.PI / 180,
//                 x = 300 + R * Math.cos(a),
//                 y = 300 - R * Math.sin(a);
//             out.push(r.circle(x, y, 2).attr(marksAttr));
//         }
//         return out;
//     }

//     (function () {
//         var d = new Date,
//             am = (d.getHours() < 12),
//             h = d.getHours() % 12 || 12;

//         updateVal(d.getSeconds(), 60, 200, sec, 2);
//         updateVal(d.getMinutes(), 60, 160, min, 1);
//         updateVal(h, 12, 120, hor, 0);
//         updateVal(d.getDate(), 31, 80, day, 3);
//         updateVal(d.getMonth() + 1, 12, 40, mon, 4);
//         pm[(am ? "hide" : "show")]();
//         setTimeout(arguments.callee, 1000);
//         init = false;
//     })();
// };


$('document').ready(function() {
  impress().init();
});

