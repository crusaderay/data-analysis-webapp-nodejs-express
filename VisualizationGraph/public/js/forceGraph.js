var graph={};
var nodes=[];
var links =[];
var width = 960;
var height = 500;

var svg = d3.select('body').append('svg')
			.attr('width',width)
			.attr('height',height);

var force = d3.layout.force()
			.gravity(.05)
			.distance(100)
			.charge(-100)
			.size([width, height]);


d3.csv('../data/reason.csv', function(err, data){
	if(!err) {
		for(var i=0;i<data.length;i++) {
			var nodeObj ={};
			nodeObj.reason = +data[i].reason;
			nodeObj.frequency = +data[i].frequency;
			nodes.push(nodeObj);
		}
		graph.nodes = nodes;
		d3.csv('../data/link.csv', function(err2, data2){
			if(! err2) {
				for(var i=0;i<data2.length;i++) {
					var linkObj={};
					linkObj.source = +data2[i].source;
					linkObj.target = +data2[i].target;
					linkObj.value = +data2[i].value;
					links.push(linkObj);
				}
				graph.links = links;

				force
					.nodes(graph.nodes)
					.links(graph.links)
					.start();

				var link = svg.selectAll('.link')
							.data(graph.links)
							.enter().append('line')
							.attr('class','link')
							.style("stroke-width", function(d) { return Math.sqrt(d.value); });

				var node = svg.selectAll('.node')
							.data(graph.nodes)
							.enter().append('g')
							.attr('class','node')
      						.call(force.drag);

      			node.append("circle")
      				.attr("r", function(d){ return Math.sqrt(d.frequency); })

				node.append('text')
					.attr('dx',20)
					.attr('dy','.35em')
					.text(function(d) {return d.reason});

				force.on('tick', function(){
					link.attr('x1', function(d) {return d.source.x;})
						.attr('y1', function(d){ return d.source.y;})
						.attr('x2', function(d){return d.target.x;})
						.attr('y2', function(d){d.target.y;});

					node.attr('transform', function(d) {return "translate(" + d.x + "," + d.y + ")";});
				});


			} else {
				console.log(err2);
			}
		});
	} else {
		console.log(err);
	}
});