showmap("big-map", 1000, 800);
$('.form_date').datetimepicker({
        language:  'fr',
        weekStart: 1,
        todayBtn:  1,
		autoclose: true,
		todayHighlight: 1,
		startView: 2,
		minView: 2,
		forceParse: 0,
		keyboardNavigation:true
 });
function showmap(container_id, width, height) {
	// body...

	var projection = d3.geoMercator()
						.center([107, 31])
						.scale(800)
						.translate([width/2+60, height/2+60]);
	var path = d3.geoPath().projection(projection);

	var svg = d3.select("body")
				.select("#" + container_id)
				.append("svg")
				.attr("width", width)
				.attr("height", height);

	var tooltip = d3.select("body")
					.append("div")
					.attr("class", "tooltips")
					.attr("opacity", 0.0);

	d3.json("http://localhost:8080/VisTaskData/json/china.geo.json").then(function (res) {
		// body...
		var map = svg.append("g").attr("transform", "translate(0,0)");
		map.selectAll("path")
			.data(res.features)
			.enter()
			.append("path")
			.attr("stroke", "rgb(111, 111, 111)")
			.attr("stroke-width", 1)
			.attr("fill","#5D6165")
			.attr("id", function (data) {
				// body...
				return data.properties.id;
			})
			.attr("d", path)
			.on("mouseover", function () {
				// body...
				d3.select(this).attr("fill","#52585F");
			})
			.on("mouseout", function() {
				// body...
				d3.select(this).attr("fill", "#5D6165");
			})
			.on("click", function (d) {
				// body...
			});
		var text = svg.append("g").attr("transform", "translate(0, 0)");
		text.selectAll("text")
			.data(res.features)
			.enter()
			.append("text")
			.attr("transform", function(d) {
				// body...
				return "translate("+projection(d.properties.cp)+")";
			})
			.attr("text-anchor", "middle")
			.attr("font-size", "8pt")
			.attr("fill", "rgb(130, 130, 130)")
			.text(function (d) {
				// body...
				return d.properties.name;
			});
		var point = svg.append("g").attr("transform", "translate(0, 0)");
		d3.csv("http://localhost:8080/VisTaskData/csv/WaterBase.csv").then(function (res) {	
				// body...
			point.selectAll("circle")
					.data(res)
					.enter()
					.append("circle")
					.attr("r", 3)
					.attr("transform", function(d, i){
						return "translate("+projection([d.lon, d.lat])+")";
					})	
					.attr("id", function(d) {
						return d.code+"map";
					})
					.attr("fill", "red")
					.on("click", function (res) {
						// body...
					})
					.on("mouseover", function (d, i) {
						// body...
						tooltip.html("名称： "+ d.name+"<br/>"
									+"描述： "+ d.description +"<br/>")
								.style("left", (d3.event.pageX)+"px")
								.style("top", (d3.event.pageY+20)+"px")
								.style("opacity", 1.0);
						document.getElementById(d.code+"map").setAttribute("r","8");
						
					})
					.on("mousemove", function(d) {
						tooltip.style("left", (d3.event.pageX))
								.style("top", (d3.event.pageY+20));
					})
					.on("mouseout", function(d, i) {
						document.getElementById(d.code+"map").setAttribute("r","3");
						tooltip.style("opacity", 0.0);
					});
			getMonthChart("small-view1", 330, 240, 103, "16:00:00", res);
		});

	})
}