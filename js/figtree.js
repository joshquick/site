function createTree(svgId, legendId, newick, width, height, fontSize, clustering) {

    // default scheme to color by date    
    var coloring_scheme = d3.scale.category10();

    // this will be used to map bootstrap support values to edge thickness
    var bootstrap_scale = d3.scale.linear().domain([0, 0.5, 0.7, 0.9, 0.95, 1]).range([1, 2, 3, 4, 5, 6]).interpolate(d3.interpolateRound);

    function edgeStyler(dom_element, edge_object) {
        if ("bootstrap" in edge_object.target) {
            dom_element.style("stroke-width", bootstrap_scale(edge_object.target.bootstrap) + "pt");
        }
        dom_element.style("stroke", "cluster" in edge_object.target ? coloring_scheme(edge_object.target.cluster) : null);

    }

    function nodeStyler(dom_element, node_object) {
        // dom_element.append("text").classed("bootstrap", true).text("1.0").attr("dx", "-.3em").attr("dy", "-.3em").attr("text-anchor", "end").attr("alignment-baseline", "bottom");
        if ("name" in node_object && node_object.name == "root") {

        }
        if ("bootstrap" in node_object && node_object.bootstrap) {
            var label = dom_element.selectAll(".bootstrap");
            if (label.empty()) {
                dom_element.append("text").classed("bootstrap", true).text(node_object.bootstrap).attr("dx", "-.3em").attr("dy", "-.3em").attr("text-anchor", "end").attr("alignment-baseline", "bottom");
            }
        }
    }

    // global tree object
    var tree = d3.layout.phylotree()
        .svg(d3.select(svgId))
        .options({
            'left-right-spacing': 'fit-to-size',
            // fit to given size top-to-bottom
            'top-bottom-spacing': 'fit-to-size',
            // fit to given size left-to-right
            'selectable': false,
            // make nodes and branches not selectable
            'collapsible': false,
            // turn off the menu on internal nodes
            'transitions': false,
            // turn off d3 animations
            'reroot': false,
            'hide': false,
            'show-scale': false,
            'align-tips': false,
            'brush': false,
        })
        .size([height, width])
        .font_size(fontSize)
        .style_edges(edgeStyler)
        .style_nodes(nodeStyler)
    ;

    /* the next call creates the tree object, and tree nodes */
    tree(newick);

    // parse bootstrap support from internal node names
    _.each(tree.get_nodes(), function (node) {
        if (node.children) {
            node.bootstrap = parseFloat(node.name);
            console.log(node.name)
        }
    });

    // tree.spacing_x(50).spacing_y(100);

    tree.placenodes().layout();

    tree.options({
        'transitions': true
        // turn on d3 animations
    });

    if (clustering) {

        coloring_scheme.domain([]); // reset the coloring scheme
        if (tree) {
            // refresh cluster assignments for tips
            /*_.each (tree.get_nodes(), function (node) {
                if (node.name in clustering) {
                    node.cluster = clustering[node.name];
                } else {
                    delete node.cluster;
                }
            });*/

            tree.traverse_and_compute(function (node) {
                    if (node.name in clustering) {
                        node.cluster = clustering[node.name];
                    } else {
                        delete node.cluster;
                        var children_clusters = _.keys(_.countBy(node.children, function (d) {
                            return d.cluster;
                        }));
                        if (children_clusters.length == 1 && children_clusters[0]) {
                            node.cluster = children_clusters[0];
                        }
                    }
                },
                "post-order");

            tree.update();

            // update the legend

            d3.select(legendId).selectAll(".row").remove();
            var cluster_colors = d3.select(legendId).selectAll(".row").data(coloring_scheme.domain().sort().map(function (d) {
                return [d];
            }));
            cluster_colors.enter().append("div").classed("row", true);
            cluster_colors.exit().remove();
            cluster_colors = cluster_colors.selectAll("span").data(function (d) {
                return d
            });
            cluster_colors.enter().append("span").classed("cluster-text", true);

            cluster_colors.each(function (d) {
                d3.select(this).style("color", coloring_scheme(d), "important").classed("cluster-text", true).text("Cluster " + d);
            });

        }
    }
}

