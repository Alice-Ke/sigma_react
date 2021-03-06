'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _tools = require('./tools');

require('../sigma/main');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 *
 * Sigma - React.JS flow-typed interface for Sigma js library - fastest opensource rendering engine for network graphs.
 * Sigma makes it easy to publish networks on Web pages, and allows developers to integrate network exploration in
 * rich Web applications.
 *
 * Parameter types
 * ```
 * type Sigma$Graph$Data = {
 *   nodes: [Sigma$Node],
 *   edges: [Sigma$Edge]
 * };
 *
 * type Sigma$Node = {
 *   id: string,
 *   label?: string,
 *   x?: number,
 *   y?: number,
 *   size?: number,
 *   color?: color
 * };
 *
 * type Sigma$Edge = {
 *   id: string,
 *   source: string,
 *   target: string,
 *   label?: string,
 *   color?: color
 * };
 * ```
 *
 *
 * @signature `<Sigma graph={graph} settings={settings} onClickNode={func}.../>`
 *
 * @param {CSS} style   CSS style description for main div holding graph, should be specified in React format
 * @param {Sigma$Settings} settings     js object with sigma initialization options, for full list see [sigma settings page](https://github.com/jacomyal/sigma.js/wiki/Settings)
 * @param {string} renderer     can be "webgl" or "canvas"
 * @param {Sigma$Graph$Data} graph   js object with array of nodes and edges used to initialize sigma
 * @param {Sigma$ErrorHandler} onSigmaException      set sigma callback for sigma exceptions / errors
 * @param {Sigma$EventHandler} onClickNode      set sigma callback for "clickNode" event (see below)
 * @param {Sigma$EventHandler} onOverNode      set sigma callback for "overNode" event
 * @param {Sigma$EventHandler} onOutNode      set sigma callback for "outNode" event
 * @param {Sigma$EventHandler} onClickEdge     set sigma callback for "clickEdge" event
 * @param {Sigma$EventHandler} onOverEdge      set sigma callback for "overEdge" event
 * @param {Sigma$EventHandler} onOutEdge      set sigma callback for "outEdge" event
 *
 * @example
 * Can be composed with sigma sub-components using JSX syntax
 * <Sigma renderer="webgl" style={{maxWidth:"inherit", height:"400px"}}
 *        settings={{drawEdges:false}}
 *        onOverNode={e => console.log("Mouse over node: " + e.data.node.label)}>
 *        graph={{nodes:["id0", "id1"], edges:[{id:"e0",source:"id0",target:"id1"}]}}>
 *   <RelativeSize initialSize={8}/>
 * </Sigma>
 *
 */

var Sigma = function (_React$PureComponent) {
  _inherits(Sigma, _React$PureComponent);

  function Sigma(props) {
    _classCallCheck(this, Sigma);

    var _this = _possibleConstructorReturn(this, (Sigma.__proto__ || Object.getPrototypeOf(Sigma)).call(this, props));

    _this.state = { renderer: false };
    var settings = _this.props.settings ? _this.props.settings : {};
    _this.sigma = new sigma({ settings: settings });
    _this.initRenderer = _this.initRenderer.bind(_this);
    Sigma.bindHandlers(_this.props, _this.sigma);
    if (_this.props.graph) {
      try {
        _this.sigma.graph.read(_this.props.graph);
      } catch (e) {
        if (_this.props.onSigmaException) _this.props.onSigmaException(e);
      }
    }
    return _this;
  }

  _createClass(Sigma, [{
    key: 'initRenderer',
    value: function initRenderer(container) {
      if (container) {
        var options = { container: container };
        if (this.props.renderer) options.type = this.props.renderer;
        this.sigmaRenderer = this.sigma.addRenderer(options);
        this.sigma.refresh();
        this.setState({ renderer: true });
      } else if (this.sigmaRenderer) {
        this.sigma.killRenderer(this.sigmaRenderer);
        this.sigmaRenderer = null;
        this.setState({ renderer: false });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.sigma.kill();
      this.sigmaRenderer = null;
    }
  }, {
    key: 'render',
    value: function render() {
      var children = this.state.renderer ? (0, _tools.embedProps)(this.props.children, { sigma: this.sigma }) : null;
      return _react2.default.createElement(
        'div',
        { ref: this.initRenderer, style: this.props.style },
        children
      );
    }

    /**
    Initialize event handlers with sigma.
    
    Event handler function receives [Sigma Event](https://github.com/jacomyal/sigma.js/wiki/Events-API)
    with the structure of following type:
    ```
    type Sigma$Event = {
      data: {
        node?: Neo4j$Node, //for node events is sigma node data
        edge?: Neo4j$Edge, //for edge events is sigma edge data
        captor: {   // information about event handler, for instance position on the page {clientX, clientY}
          clientX: number,
          clientY: number
    }}}
    
    type Sigma$EventHandler = (node:Sigma$Event) => void
    
    ```
    **/

  }], [{
    key: 'bindHandlers',
    value: function bindHandlers(handlers, sigma) {
      ["clickNode", "overNode", "outNode", "clickEdge", "overEdge", "outEdge", "clickStage"].forEach(function (event) {
        var handler = "on" + event[0].toUpperCase() + event.substr(1);
        if (handlers[handler]) {
          sigma.bind(event, handlers[handler]);
        }
      });
    }
  }]);

  return Sigma;
}(_react2.default.PureComponent);

Sigma.defaultProps = {
  settings: {
    defaultNodeColor: "#3388AA",
    defaultLabelSize: 8,
    defaultLabelColor: "#777",
    labelThreshold: 12,
    hoverFontStyle: "text-size: 11",
    batchEdgesDrawing: true,
    drawEdges: true,
    drawEdgeLabels: false
  },
  style: {
    maxWidth: "inherit",
    height: "400px"
  }
};
Sigma.propTypes = {
  settings: typeof Sigma$Settings === 'function' ? require('prop-types').instanceOf(Sigma$Settings).isRequired : require('prop-types').any.isRequired,
  renderer: require('prop-types').oneOf(['webgl', 'canvas', 'svg']),
  style: require('prop-types').object,
  children: require('prop-types').any,
  graph: typeof Sigma$Graph$Data === 'function' ? require('prop-types').instanceOf(Sigma$Graph$Data) : require('prop-types').any,
  onSigmaException: require('prop-types').func,
  onClickNode: require('prop-types').func,
  onClickEdge: require('prop-types').func,
  onOverNode: require('prop-types').func,
  onOutNode: require('prop-types').func,
  onOverEdge: require('prop-types').func,
  onOutEdge: require('prop-types').func,
  onClickStage: require('prop-types').func
};
exports.default = Sigma;