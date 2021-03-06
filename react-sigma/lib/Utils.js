"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.propsChanged = propsChanged;
exports.sigmaGraphMerge = sigmaGraphMerge;
function propsChanged(prev, next) {
	for (var key in prev) {
		if (prev[key] !== next[key]) return true;
	}return false;
}

function sigmaGraphMerge(graph) {
	var _this = this;

	graph.nodes.forEach(function (node) {
		if (!_this.nodesIndex[node.id]) _this.addNode(node);
	});
	graph.edges.forEach(function (edge) {
		if (!_this.edgesIndex[edge.id]) _this.addEdge(edge);
	});
}