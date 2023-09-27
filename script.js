colorArray = ["#caf0f8", "#ade8f4", "#90e0ef", "#48cae4", "#00b4d8", "#0096c7"];

var JoiningYearChart = dc.pieChart("#JoiningYear");
var educationChart = dc.pieChart("#education");
var xpChart = dc.pieChart("#xp");
var genderChart = dc.pieChart("#gender");
var ageChart = dc.barChart("#age");
var cityChart = dc.rowChart("#city");

// d3.csv("data.csv", function (err, data) {
d3.json("./data/data.json").then(function (data) {
  if (!data) throw new Error("Error loading data");

  // if (err) throw err;

  console.log(data);

  var ndx = crossfilter(data);
  var all = ndx.groupAll();

  var JoiningYearDim = ndx.dimension(function (d) {
    return d["JoiningYear"];
  });
  var educationDim = ndx.dimension(function (d) {
    return d["Education"];
  });
  var xpDim = ndx.dimension(function (d) {
    return d["ExperienceInCurrentDomain"];
  });
  var genderDim = ndx.dimension(function (d) {
    return d["Gender"];
  });
  var ageDim = ndx.dimension(function (d) {
    return d["Age"];
  });
  var cityDim = ndx.dimension(function (d) {
    return d["City"];
  });

  var JoiningYearGroup = JoiningYearDim.group();
  var educationGroup = educationDim.group();
  var xpGroup = xpDim.group();
  var genderGroup = genderDim.group();
  var ageGroup = ageDim.group();
  var cityGroup = cityDim.group();

  cityChart
    .dimension(cityDim)
    .group(cityGroup)
    .width(300)
    .height(100)
    .colors(d3.scaleOrdinal().range(colorArray));

  ageChart
    .dimension(ageDim)
    .group(ageGroup)
    .height(230)
    .width(600)
    .x(d3.scaleBand())
    .xUnits(dc.units.ordinal)
    .elasticY(true)
    .height(115)
    .width(400)
    .title(function (d) {
      return `AGE: ${d.key}`;
    })
    .colors(colorArray);

  JoiningYearChart.dimension(JoiningYearDim)
    .group(JoiningYearGroup)
    .width(180)
    .height(180)
    .innerRadius(45)
    .title(function (d) {
      return `JoiningYear: ${d.key}`;
    })
    .colors(d3.scaleOrdinal().range(colorArray));

  educationChart
    .dimension(educationDim)
    .group(educationGroup)
    .width(180)
    .height(180)
    .innerRadius(45)
    .title(function (d) {
      return `EDUCATION: ${d.key}`;
    })
    .colors(d3.scaleOrdinal().range(colorArray));

  xpChart
    .dimension(xpDim)
    .group(xpGroup)
    .width(180)
    .height(180)
    .innerRadius(45)
    .title(function (d) {
      return `xp: ${d.key}`;
    })
    .colors(d3.scaleOrdinal().range(colorArray));

  genderChart
    .dimension(genderDim)
    .group(genderGroup)
    .width(180)
    .height(180)
    .innerRadius(45)
    .title(function (d) {
      return `GENDER: ${d.key}`;
    })
    .colors(d3.scaleOrdinal().range(colorArray));

  dc.renderAll();
});
