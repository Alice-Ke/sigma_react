var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import React from 'react';
import '../sigma/plugins.animate';
import '../sigma/layout.noverlap';
import ReactSigmaLayoutPlugin from './ReactSigmaLayoutPlugin';

/**

NOverlap component, starts noverlap sigma plugin once component is mounted.
It supposes that sigma graph is already in place, therefore component should not be
mounted while graph is unavailable. It can be used within Sigma component if graph is
preloaded, or within loader component, like LoadJSON.

@param {number} [nodeMargin=5]    additional minimum space to apply around each and every node
@param {number} [scaleNodes=1.2]  multiplier,  larger nodes will have more space around
@param {number} [gridSize=20]   number of rows and columns to use when dividing the nodes up into cell
@param {number} [permittedExpansion=1.1]  maximum ratio to apply to the bounding box
@param {number} speed     larger value increases the speed at the cost of precision
@param {number} maxIterations  iterations to run the algorithm for before stopping it
@param {number} easing     camera easing type for camera transition
@param {number} duration     duration of the transition for the easing method

It accepts all the parameters of sigma.layout.noverlap plugin described on its github page:
[see sigma plugin page for more details](https://github.com/jacomyal/sigma.js/tree/master/plugins/sigma.layout.noverlap)

@example
<Sigma graph={data}>
 <NOverlap gridSize={10} maxIterations={100}/>
</Sigma>

**/

const NOverlap = props => {
	const s = props.sigma;
	if (s) return React.createElement(ReactSigmaLayoutPlugin, _extends({
		start: () => s.startNoverlap(),
		config: options => s.configNoverlap(options),
		stop: () => s.stopNoverlap() }, props));
	return null;
};

NOverlap.propTypes = {
	nodes: require('prop-types').arrayOf(typeof Sigma$Node === 'function' ? require('prop-types').instanceOf(Sigma$Node) : require('prop-types').any),
	nodeMargin: require('prop-types').number,
	scaleNodes: require('prop-types').number,
	gridSize: require('prop-types').number,
	permittedExpansion: require('prop-types').number,
	speed: require('prop-types').number,
	maxIterations: require('prop-types').number,
	easing: typeof Sigma$Easing === 'function' ? require('prop-types').instanceOf(Sigma$Easing) : require('prop-types').any,
	duration: require('prop-types').number,
	sigma: typeof sigma === 'function' ? require('prop-types').instanceOf(sigma) : require('prop-types').any
};
export default NOverlap;