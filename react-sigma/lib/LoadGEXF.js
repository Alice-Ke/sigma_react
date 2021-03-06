'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('../sigma/parsers.gexf');

var _tools = require('./tools');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**

LoadGEXF component, interface for parsers.json sigma plugin. Can be used within Sigma component.
Can be composed with other plugins: on load it mounts all child components (e.g. other sigma plugins).
Child's componentWillMount should be used to enable plugins on loaded graph.

 @param {string} path   path to the GEXF file
 @param {Function} onGraphLoaded        Optional callback for graph update

[see sigma plugin page for more details](https://github.com/jacomyal/sigma.js/tree/master/plugins/sigma.neo4j.cypher)

**/

var LoadGEXF = function (_React$PureComponent) {
	_inherits(LoadGEXF, _React$PureComponent);

	function LoadGEXF(props) {
		_classCallCheck(this, LoadGEXF);

		var _this = _possibleConstructorReturn(this, (LoadGEXF.__proto__ || Object.getPrototypeOf(LoadGEXF)).call(this, props));

		_this.state = { loaded: false };
		_this.onLoad = _this._onLoad.bind(_this);
		return _this;
	}

	_createClass(LoadGEXF, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this._load(this.props.path);
		}
	}, {
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(props) {
			// reload only if path changes
			if (this.props.path !== props.path) {
				this.setState({ loaded: false });
				this._load(props.path);
			}
		}
	}, {
		key: 'render',
		value: function render() {
			if (!this.state.loaded) return null;
			return _react2.default.createElement(
				'div',
				null,
				(0, _tools.embedProps)(this.props.children, { sigma: this.props.sigma })
			);
		}
	}, {
		key: '_load',
		value: function _load(url) {
			sigma.parsers.gexf(this.props.path, this.props.sigma, this.onLoad);
		}
	}, {
		key: '_onLoad',
		value: function _onLoad() {
			if (this.props.sigma) this.props.sigma.refresh();
			this.setState({ loaded: true });
			if (this.props.onGraphLoaded) return this.props.onGraphLoaded();
		}
	}]);

	return LoadGEXF;
}(_react2.default.PureComponent);

LoadGEXF.propTypes = {
	path: require('prop-types').string.isRequired,
	onGraphLoaded: require('prop-types').func,
	children: require('prop-types').any,
	sigma: typeof Sigma === 'function' ? require('prop-types').instanceOf(Sigma) : require('prop-types').any
};
exports.default = LoadGEXF;