$(document).ready(function(){
  $("input.nosepicker").spectrum({
    color: '#bada55',
    preferredFormat: "hex",
    showInitial: true,
    showInput: true,
    allowEmpty: true,
    palette: ["#ff9900","#bada55"],
    showButtons: false
  });
  // Populate cards with initial color info
  $("input.nosepicker").each(function() {
    $(this).spectrum("set","#bada55");
    $(this).spectrum("show");
    $(this).spectrum("hide");
  });
});

// Called whenever color picker opens, RGB hex changes, or picker moved
function colorChange(targetid, color){
  var coloroutput = [
    color.toHexString(),
    color.toRgbString(),
    color.toHsvString(),
    color.toHsv(),
    color.toHslString(),
    color.toHsl(),
    color.toName()
  ];
  var deltas = calcDifference("#color1", targetid);
  $("div"+targetid+" .card-image .img-responsive").css('background',coloroutput[0]);
  $("div"+targetid+" .card-title").text(coloroutput[0].toUpperCase());
  if (targetid == "#color1") {
    $("div"+targetid+" .card-header .card-subtitle")
      .html(
        //coloroutput[1]+"<span class=\"text-warning\">"+deltas["r"]+"</span><br>"+
        coloroutput[1]+"<br>"+
        coloroutput[3]["h"]+"<br>"+
        coloroutput[4]+"<br>"
      );
  } else {
  $("div"+targetid+" .card-header .card-subtitle")
      .html(
        //coloroutput[1]+"<span class=\"text-warning\">"+deltas["r"]+"</span><br>"+
        coloroutput[1]+"\t"+JSON.stringify(deltas["rgb"])+"<br>"+
        coloroutput[2]+"\t"+JSON.stringify(deltas["hsv"])+"<br>"+
        coloroutput[4]+"\t"+JSON.stringify(deltas["hsl"])
      );
  }
  $("h1").css('color',coloroutput[0]);
  return coloroutput;
}

// Used by calcDifference() to get all RGB/HSV/HSL values for a tiny color
// Outputs a hash/dict
function getColorValues(tinycolor){
  outputvalues = {rgb:{},hsv:{},hsl:{}};
  hsvValues = tinycolor.toHsv();
  hslValues = tinycolor.toHsl();
  outputvalues["rgb"]["r"] = tinycolor["_r"];
  outputvalues["rgb"]["g"] = tinycolor["_g"];
  outputvalues["rgb"]["b"] = tinycolor["_b"];
  outputvalues["hsv"]["h"] = hsvValues["h"].toFixed(0);
  outputvalues["hsv"]["s"] = (hsvValues["s"]*100).toFixed(0);
  outputvalues["hsv"]["v"] = (hsvValues["v"]*100).toFixed(0);
  outputvalues["hsl"]["h"] = hslValues["h"].toFixed(0);
  outputvalues["hsl"]["s"] = (hslValues["s"]*100).toFixed(0);
  outputvalues["hsl"]["l"] = (hslValues["l"]*100).toFixed(0);
  return outputvalues;
}

// Calculating color differences
// Fixed calculation - need to make dynamic based on parameters
function calcDifference(id1, id2){
  //Calculating deltas for numeric RGB using tinycolor objects
  var string1 = 'input[data-color="' + id1 + '"]';
  var string2 = 'input[data-color="' + id2 + '"]';
  var rgb1 = $(string1).spectrum("get");
  var rgb2 = $(string2).spectrum("get");
  var color1 = getColorValues(rgb1);
  var color2 = getColorValues(rgb2);
  var deltas = {rgb:{},hsv:{},hsl:{}};
  deltas["rgb"]["r"] = (color1["rgb"]["r"] - color2["rgb"]["r"]).toFixed(0);
  deltas["rgb"]["g"] = (color1["rgb"]["g"] - color2["rgb"]["g"]).toFixed(0);
  deltas["rgb"]["b"] = (color1["rgb"]["b"] - color2["rgb"]["b"]).toFixed(0);
  deltas["hsv"]["h"] = (color1["hsv"]["h"] - color2["hsv"]["h"]);
  deltas["hsv"]["s"] = (color1["hsv"]["s"] - color2["hsv"]["s"]);
  deltas["hsv"]["v"] = (color1["hsv"]["v"] - color2["hsv"]["v"]);
  deltas["hsl"]["h"] = (color1["hsl"]["h"] - color2["hsl"]["h"]);
  deltas["hsl"]["s"] = (color1["hsl"]["s"] - color2["hsl"]["s"]);
  deltas["hsl"]["l"] = (color1["hsl"]["l"] - color2["hsl"]["l"]);
  return deltas;
}

$("button#calctest").click(function(){
  calcDifference("#color1", "#color2");
});

//Trigger events to show color pickers
//$("div.card-image .img-responsive").click(function(){
//    var whichitem = $(this).attr("data-color");
//    $("input[data-color*='color1']").spectrum("show");
//    $("input.nosepicker[data-color=\""+whichitem+"\"]").spectrum("show");
//});
$("input.nosepicker").on('move.spectrum', function(e, color){
  var thisitem = e.target;
  var whichitem = $(thisitem).attr("data-color");
  colorChange(whichitem, color);
});
$("input.nosepicker").on('change.spectrum', function(e, color){
  var thisitem = e.target;
  var whichitem = $(thisitem).attr("data-color");
  colorChange(whichitem, color);
});
$("input.nosepicker").on('show.spectrum', function(e, color){
  var thisitem = e.target;
  var whichitem = $(thisitem).attr("data-color");
  colorChange(whichitem, color);
});

