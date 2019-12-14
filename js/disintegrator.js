$(document).ready(function(){
  $("input.nosepicker").spectrum({
    color: '#ff7f00',
    preferredFormat: "hex",
    showInitial: true,
    showInput: true,
    allowEmpty: true,
    palette: ["#ff7f00","#7f00ff"],
    showButtons: false
  });
  // Populate cards with initial color info
  $("input.nosepicker").each(function() {
    //$(this).spectrum("set","#007fff");
    switch( $(this).attr("data-color")){
      case "#color1":
        $(this).spectrum("set","#007fff");
        break;
      case "#color2":
        $(this).spectrum("set","#00ff7f");
        break;
      case "#color3":
        $(this).spectrum("set","#7fff00");
        break;
      case "#color4":
        $(this).spectrum("set","#ff7f00");
        break;
      case "#color5":
        $(this).spectrum("set","#ff007f");
        break;
      case "#color6":
        $(this).spectrum("set","#7f00ff");
        break;
    }
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
    color.toName(),
    color.toRgb()
  ];
  var deltas = calcDifference("#color1", targetid);
  $("div"+targetid+" .card-image .img-responsive").css('background',coloroutput[0]);
  $("div"+targetid+" .card-title").text(coloroutput[0].toUpperCase());
  if (targetid == "#color1") {
    $("#color1 td.rValue").text(coloroutput[7]["r"]);
    $("#color1 td.gValue").text(coloroutput[7]["g"]);
    $("#color1 td.bValue").text(coloroutput[7]["b"]);
    $("#color1 td.hsvHValue").text((coloroutput[3]["h"]).toFixed(0));
    $("#color1 td.hsvSValue").text((coloroutput[3]["s"]*100).toFixed(0));
    $("#color1 td.hsvVValue").text((coloroutput[3]["v"]*100).toFixed(0));
    $("#color1 td.hslHValue").text((coloroutput[5]["h"]).toFixed(0));
    $("#color1 td.hslSValue").text((coloroutput[5]["s"]*100).toFixed(0));
    $("#color1 td.hslLValue").text((coloroutput[5]["l"]*100).toFixed(0));
  } else {
    $("div"+targetid+" td.rValue").text(coloroutput[7]["r"]);
    $("div"+targetid+" td.gValue").text(coloroutput[7]["g"]);
    $("div"+targetid+" td.bValue").text(coloroutput[7]["b"]);
    $("div"+targetid+" td.hsvHValue").text((coloroutput[3]["h"]).toFixed(0));
    $("div"+targetid+" td.hsvSValue").text((coloroutput[3]["s"]*100).toFixed(0));
    $("div"+targetid+" td.hsvVValue").text((coloroutput[3]["v"]*100).toFixed(0));
    $("div"+targetid+" td.hslHValue").text((coloroutput[5]["h"]).toFixed(0));
    $("div"+targetid+" td.hslSValue").text((coloroutput[5]["s"]*100).toFixed(0));
    $("div"+targetid+" td.hslLValue").text((coloroutput[5]["l"]*100).toFixed(0));
    $("div"+targetid+" td.rDelta").text(deltas["rgb"]["r"]);
    $("div"+targetid+" td.gDelta").text(deltas["rgb"]["g"]);
    $("div"+targetid+" td.bDelta").text(deltas["rgb"]["b"]);
    $("div"+targetid+" td.hsvHDelta").text(deltas["hsv"]["h"]);
    $("div"+targetid+" td.hsvSDelta").text(deltas["hsv"]["s"]);
    $("div"+targetid+" td.hsvVDelta").text(deltas["hsv"]["v"]);
    $("div"+targetid+" td.hslHDelta").text(deltas["hsl"]["h"]);
    $("div"+targetid+" td.hslSDelta").text(deltas["hsl"]["s"]);
    $("div"+targetid+" td.hslLDelta").text(deltas["hsl"]["l"]);
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
  deltas["rgb"]["r"] = (color2["rgb"]["r"] - color1["rgb"]["r"]).toFixed(0);
  deltas["rgb"]["g"] = (color2["rgb"]["g"] - color1["rgb"]["g"]).toFixed(0);
  deltas["rgb"]["b"] = (color2["rgb"]["b"] - color1["rgb"]["b"]).toFixed(0);
  deltas["hsv"]["h"] = (color2["hsv"]["h"] - color1["hsv"]["h"]);
  deltas["hsv"]["s"] = (color2["hsv"]["s"] - color1["hsv"]["s"]);
  deltas["hsv"]["v"] = (color2["hsv"]["v"] - color1["hsv"]["v"]);
  deltas["hsl"]["h"] = (color2["hsl"]["h"] - color1["hsl"]["h"]);
  deltas["hsl"]["s"] = (color2["hsl"]["s"] - color1["hsl"]["s"]);
  deltas["hsl"]["l"] = (color2["hsl"]["l"] - color1["hsl"]["l"]);
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

