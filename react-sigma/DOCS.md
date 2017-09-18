<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

# Usage

## Install

    yarn add react-sigma

Any of the following components can be imported

    import {Sigma, EdgeShapes, NodeShapes, LoadJSON, LoadGEXF, Filter, ForceAtlas2,
            RelativeSize, NOverlap, NeoCypher, NeoGraphItemsProducers,
            RandomizeNodePositions, SigmaEnableWebGL} from 'react-sigma'

Dagre and ForceLink are not included intentionally in the default distribution
should be imported explicitly:

    import ForceLink from 'react-sigma/lib/ForceLink'
    import Dagre from 'react-sigma/lib/Dagre'

## Minimizing bundle

### webpack1

Minimized sigma with minimum required functionality is 76kb, more when plugins added.
Minimized bundle with all components (except Dagre, SVG and ForceLink) is 196kb.
Webpack1 does not support tree shaking and require explicit submodules import
to bundle only what's been used, e.g.:

    import Sigma from 'react-sigma/lib/Sigma'
    import LoadJSON from 'react-sigma/lib/LoadJSON'

### webpack2

Using webpack2

    import { Sigma, LoadJSON } from 'react-sigma'

unused components won't be included in the resulting bundle.

# Components

# Sigma

[src/Sigma.js:87-180](https://github.com/dunnock/react-sigma/blob/22ffeb743b9893354171f025edc217e4241ca70c/src/Sigma.js#L87-L180 "Source code on GitHub")

**Extends React.PureComponent**

Sigma - React.JS flow-typed interface for Sigma js library - fastest opensource rendering engine for network graphs.
Sigma makes it easy to publish networks on Web pages, and allows developers to integrate network exploration in
rich Web applications.

Parameter types

    type Sigma$Graph$Data = {
      nodes: [Sigma$Node],
      edges: [Sigma$Edge]
    };

    type Sigma$Node = {
      id: string,
      label?: string,
      x?: number,
      y?: number,
      size?: number,
      color?: color
    };

    type Sigma$Edge = {
      id: string,
      source: string,
      target: string,
      label?: string,
      color?: color
    };

**Parameters**

-   `style` **[CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)** CSS style description for main div holding graph, should be specified in React format
-   `settings` **Sigma$Settings** js object with sigma initialization options, for full list see [sigma settings page](https://github.com/jacomyal/sigma.js/wiki/Settings)
-   `renderer` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** can be "webgl" or "canvas"
-   `graph` **Sigma$Graph$Data** js object with array of nodes and edges used to initialize sigma
-   `onClickNode` **Sigma$EventHandler** set sigma callback for "clickNode" event (see below)
-   `onOverNode` **Sigma$EventHandler** set sigma callback for "overNode" event
-   `onOutNode` **Sigma$EventHandler** set sigma callback for "outNode" event
-   `onClickEdge` **Sigma$EventHandler** set sigma callback for "clickEdge" event
-   `onOverEdge` **Sigma$EventHandler** set sigma callback for "overEdge" event
-   `onOutEdge` **Sigma$EventHandler** set sigma callback for "outEdge" event

**Examples**

```javascript
Can be composed with sigma sub-components using JSX syntax
<Sigma renderer="webgl" style={{maxWidth:"inherit", height:"400px"}}
       settings={{drawEdges:false}}
       onOverNode={e => console.log("Mouse over node: " + e.data.node.label)}>
       graph={{nodes:["id0", "id1"], edges:[{id:"e0",source:"id0",target:"id1"}]}}>
  <RelativeSize initialSize={8}/>
</Sigma>
```

## bindHandlers

[src/Sigma.js:171-179](https://github.com/dunnock/react-sigma/blob/22ffeb743b9893354171f025edc217e4241ca70c/src/Sigma.js#L171-L179 "Source code on GitHub")

Initialize event handlers with sigma.

Event handler function receives [Sigma Event](https://github.com/jacomyal/sigma.js/wiki/Events-API)
with the structure of following type:

    type Sigma$Event = {
    data: {
    node?: Neo4j$Node, //for node events is sigma node data
    edge?: Neo4j$Edge, //for edge events is sigma edge data
    captor: {   // information about event handler, for instance position on the page {clientX, clientY}
    clientX: number,
    clientY: number
    }}}

    type Sigma$EventHandler = (node:Sigma$Event) => void

**Parameters**

-   `handlers`  
-   `sigma`  

# Rendering

# SigmaEnableWebGL

[src/SigmaEnableWebGL.js:7-7](https://github.com/dunnock/react-sigma/blob/22ffeb743b9893354171f025edc217e4241ca70c/src/SigmaEnableWebGL.js#L7-L7 "Source code on GitHub")

Component enables WebGL renderer, setting it as default renderer if WebGL is supported by browser.

# EdgeShapes

[src/EdgeShapes.js:40-50](https://github.com/dunnock/react-sigma/blob/22ffeb743b9893354171f025edc217e4241ca70c/src/EdgeShapes.js#L40-L50 "Source code on GitHub")

**Extends React.Component**

EdgeShapes component, interface for customEdgeShapes sigma plugin.
It supposes that sigma graph is already in place, therefore component should not be 
mounted until graph is available. It can be used within Sigma component if graph is
preloaded, or within loader component, like LoadJSON.

Note! this Component requires "canvas" renderer to work.

To assign a shape renderer to an edge, simply set edge.type='shape-name' e.g. edge.type='dotted'. 

    <Sigma renderer="canvas" graph={{nodes:["id0", "id1"], edges:[{id:"e0",source:"id0",target:"id1"}]}}>
    <EdgeShapes default="dotted"/>
    </Sigma>

Supported shapes

    type Sigma$Edge$Shapes = "line" | "arrow" | "curve" | "curvedArrow" | "dashed" | "dotted" | "parallel" | "tapered";

See [plugin page](https://github.com/jacomyal/sigma.js/tree/master/plugins/sigma.renderers.customEdgeShapes)
for more datails on implementation.

**Parameters**

-   `default` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** set default sigma edge to be applied to edges where type is not set

# NodeShapes

[src/NodeShapes.js:48-58](https://github.com/dunnock/react-sigma/blob/22ffeb743b9893354171f025edc217e4241ca70c/src/NodeShapes.js#L48-L58 "Source code on GitHub")

**Extends React.Component**

NodeShapes component, interface for customShapes sigma plugin.
It supposes that sigma graph is already in place, therefore component should not be 
mounted until graph is available. It can be used within Sigma component if graph is
preloaded, or within loader component, like LoadJSON.

Note! this Component requires "canvas" renderer to work.

Extra node properties:

-   node.type='shape-name' - node shape renderer e.g. node.type='cross'.
-   node.borderColor - e.g. node.borderColor='#FF3333'
    Details on shapes configuration and possibility to apply images to nodes, please refer to
    [plugin page](https://github.com/jacomyal/sigma.js/tree/master/plugins/sigma.renderers.customShapes#images).

See [plugin page](https://github.com/jacomyal/sigma.js/tree/master/plugins/sigma.renderers.customEdgeShapes)
for more datails on implementation.

**Parameters**

-   `default` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** set default sigma node renderer to be applied to nodes where type is not set

**Examples**

````javascript
    ```
    <Sigma renderer="canvas" graph={{nodes:["id0", "id1"], edges:[{id:"e0",source:"id0",target:"id1"}]}}>
    <NodeShapes default="star"/>
    </Sigma>
    ```
````

````javascript
    Supported shapes
    ```
    type Sigma$Node$Shapes = "def" | "pacman" | "star" | "equilateral" | "cross" | "diamond" | "circle" | "square";
    ```
````

# Loading graph data

# LoadJSON

[src/LoadJSON.js:35-80](https://github.com/dunnock/react-sigma/blob/22ffeb743b9893354171f025edc217e4241ca70c/src/LoadJSON.js#L35-L80 "Source code on GitHub")

**Extends React.PureComponent**

LoadJSON component, interface for parsers.json sigma plugin. Can be used within Sigma component.
Can be composed with other plugins: on load it mounts all child components (e.g. other sigma plugins).
Child's componentWillMount should be used to enable plugins on loaded graph.

**Parameters**

-   `path` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** path to the JSON file
-   `onGraphLoaded` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Optional callback for graph update[see sigma plugin page for more details](https://github.com/jacomyal/sigma.js/tree/master/plugins/sigma.neo4j.cypher)

# LoadGEXF

[src/LoadGEXF.js:33-79](https://github.com/dunnock/react-sigma/blob/22ffeb743b9893354171f025edc217e4241ca70c/src/LoadGEXF.js#L33-L79 "Source code on GitHub")

**Extends React.PureComponent**

LoadGEXF component, interface for parsers.json sigma plugin. Can be used within Sigma component.
Can be composed with other plugins: on load it mounts all child components (e.g. other sigma plugins). 
Child's componentWillMount should be used to enable plugins on loaded graph.

**Parameters**

-   `path` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** path to the GEXF file
-   `onGraphLoaded` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Optional callback for graph update[see sigma plugin page for more details](https://github.com/jacomyal/sigma.js/tree/master/plugins/sigma.neo4j.cypher)

# NeoCypher

[src/NeoCypher.js:47-100](https://github.com/dunnock/react-sigma/blob/22ffeb743b9893354171f025edc217e4241ca70c/src/NeoCypher.js#L47-L100 "Source code on GitHub")

**Extends React.PureComponent**

NeoCypher component, interface for neo4j.cypher sigma plugin. Can be used within Sigma component.
Can be composed with other plugins: on load it mounts all child components (e.g. other sigma plugins). 
Child's componentWillMount should be used to enable plugins on loaded graph.

**Parameters**

-   `url` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Neo4j instance REST API URL
-   `user` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Neo4j instance REST API user
-   `password` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Neo4j instance REST API password
-   `query` **[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** Neo4j cypher query
-   `producers` **NeoGraphItemsProducers** Optional transformer for creating Sigma nodes and edges, 
    instance compatible with NeoGraphItemsProducers
-   `onGraphLoaded` **[Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** Optional callback for graph update[see sigma plugin page for more details](https://github.com/jacomyal/sigma.js/tree/master/plugins/sigma.neo4j.cypher)

# Nodes distribution

# ForceLink

[src/ForceLink.js:88-158](https://github.com/dunnock/react-sigma/blob/22ffeb743b9893354171f025edc217e4241ca70c/src/ForceLink.js#L88-L158 "Source code on GitHub")

**Extends React.Component**

ForceLink component, starts Force Atlas2 algorythm once component is mounted,
it is advanced version of ForceAtlas2 plugin, but it is not included in the main
distribution script react-sigma.min.js , rather should be imported explicitly:

    import ForceLink from 'react-sigma/lib/ForceLink'

It accepts all the parameters of ForceLink described on its github page:

**Parameters**

-   `barnesHutOptimize` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Use the algorithm's Barnes-Hut to improve repulsion's scalability
    This is useful for large graph but harmful to small ones.
-   `barnesHutTheta` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `adjustSizes` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 
-   `iterationsPerRender` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `linLogMode` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)?**  (optional, default `true`)
-   `outboundAttractionDistribution` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 
-   `edgeWeightInfluence` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `scalingRatio` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `strongGravityMode` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 
-   `gravity` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `alignNodeSiblings` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 
-   `nodeSiblingsScale` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `nodeSiblingsAngleMin` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `worker` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)?** Use a web worker to run calculations in separate thread (optional, default `true`)
-   `background` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 
-   `easing` **Sigma$Easing** Easing mode
-   `randomize` **(`"globally"` \| `"locally"`)** Randomize node positions before start
-   `slowDown` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `timeout` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** how long algorythm should run. default=graph.nodes().length \* 10[see sigma plugin page for more details](https://github.com/Linkurious/linkurious.js/tree/develop/plugins/sigma.layouts.forceLink)

**Examples**

```javascript
import ForceLink from 'react-sigma/lib/ForceLink'
...
<Sigma>
<LoadJSON path="/public/graph.json">
<RelativeSize initialSize={8}/>
<ForceLink background easing="cubicInOut"/>
</LoadJSON>
</Sigma>
```

# ForceAtlas2

[src/ForceAtlas2.js:63-119](https://github.com/dunnock/react-sigma/blob/22ffeb743b9893354171f025edc217e4241ca70c/src/ForceAtlas2.js#L63-L119 "Source code on GitHub")

**Extends React.Component**

ForceAtlas2 component, starts ForceAtlas2 sigma plugin once component is mounted.
It supposes that sigma graph is already in place, therefore component should not be
mounted while graph is unavailable. It can be used within Sigma component if graph is
preloaded, or within loader component, like NeoCypher.

It accepts all the parameters of ForceAtlas2 described on its github page:

**Parameters**

-   `worker` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)?** Use a web worker to run calculations in separate thread (optional, default `true`)
-   `barnesHutOptimize` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** Use the algorithm's Barnes-Hut to improve repulsion's scalability
    This is useful for large graph but harmful to small ones.
-   `barnesHutTheta` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `adjustSizes` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 
-   `iterationsPerRender` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `linLogMode` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)?**  (optional, default `true`)
-   `outboundAttractionDistribution` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 
-   `edgeWeightInfluence` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `scalingRatio` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `strongGravityMode` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 
-   `gravity` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `slowDown` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 
-   `timeout` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** how long algorythm should run. default=graph.nodes().length \* 10[see sigma plugin page for more details](https://github.com/jacomyal/sigma.js/tree/master/plugins/sigma.layout.forceAtlas2)

# NOverlap

[src/NOverlap.js:53-98](https://github.com/dunnock/react-sigma/blob/22ffeb743b9893354171f025edc217e4241ca70c/src/NOverlap.js#L53-L98 "Source code on GitHub")

**Extends React.Component**

NOverlap component, starts noverlap sigma plugin once component is mounted.
It supposes that sigma graph is already in place, therefore component should not be
mounted while graph is unavailable. It can be used within Sigma component if graph is
preloaded, or within loader component, like LoadJSON.

**Parameters**

-   `nodeMargin` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)?** additional minimum space to apply around each and every node (optional, default `5`)
-   `scaleNodes` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)?** multiplier,  larger nodes will have more space around (optional, default `1.2`)
-   `gridSize` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)?** number of rows and columns to use when dividing the nodes up into cell (optional, default `20`)
-   `permittedExpansion` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)?** maximum ratio to apply to the bounding box (optional, default `1.1`)
-   `speed` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** larger value increases the speed at the cost of precision
-   `maxIterations` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** iterations to run the algorithm for before stopping it
-   `easing` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** camera easing type for camera transition
-   `duration` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** duration of the transition for the easing methodIt accepts all the parameters of sigma.layout.noverlap plugin described on its github page:
    [see sigma plugin page for more details](https://github.com/jacomyal/sigma.js/tree/master/plugins/sigma.layout.noverlap)

**Examples**

```javascript
<Sigma graph={data}>
<NOverlap gridSize={10} maxIterations={100}/>
</Sigma>
```

# RandomizeNodePositions

[src/RandomizeNodePositions.js:21-43](https://github.com/dunnock/react-sigma/blob/22ffeb743b9893354171f025edc217e4241ca70c/src/RandomizeNodePositions.js#L21-L43 "Source code on GitHub")

**Extends React.PureComponent**

RandomizeNodePositions component, sets random positions to all nodes.
Can be used within Sigma component with predefined graph or within graph loader component.

# RelativeSize

[src/RelativeSize.js:25-34](https://github.com/dunnock/react-sigma/blob/22ffeb743b9893354171f025edc217e4241ca70c/src/RelativeSize.js#L25-L34 "Source code on GitHub")

**Extends React.Component**

RelativeSize component, interface for RelativeSize sigma plugin.
It supposes that sigma graph is already in place, therefore component should not be 
mounted until graph is available. It can be used within Sigma component if graph is
preloaded, or within loader component, like NeoCypher.

Sets nodes sizes corresponding its degree.

**Parameters**

-   `initialSize` **[number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** start size for every node, will be multiplied by Math.sqrt(node.degree)

# Dagre

[src/Dagre.js:42-46](https://github.com/dunnock/react-sigma/blob/22ffeb743b9893354171f025edc217e4241ca70c/src/Dagre.js#L42-L46 "Source code on GitHub")

Dagre layout algorythm.
It supposes that sigma graph is already in place, therefore component should not be
mounted while graph is unavailable. It can be used within Sigma component if graph is
preloaded, or within loader component, like NeoCypher.

It accepts all the parameters of Dagre described on its github page:

**Parameters**

-   `directed` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** ?
-   `multigraph` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** ?
-   `compound` **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** ?
-   `rankDir` **(`"TB"` \| `"BT"` \| `"RL"` \| `"LR"`)** ?
-   `easing` **Sigma$Easing** Easing mode[see sigma plugin page for more details](https://github.com/Linkurious/linkurious.js/tree/develop/plugins/sigma.layouts.dagre)
-   `props` **Props** 

# ReactSigmaLayoutPlugin

[src/ReactSigmaLayoutPlugin.js:36-84](https://github.com/dunnock/react-sigma/blob/22ffeb743b9893354171f025edc217e4241ca70c/src/ReactSigmaLayoutPlugin.js#L36-L84 "Source code on GitHub")

**Extends React.Component**

ReactSigmaLayoutPlugin is a base class for sigma plugins.

Usage

    const Dagre = (props) =>
    <ReactSigmaLayoutPlugin
    start={sigma.layouts.dagre.start}
    config={sigma.layouts.dagre.configure}
    stop={() => console.warn("dagre stop not implemented")} />
    ...
    <Dagre/>

# Filter

[src/Filter.js:30-60](https://github.com/dunnock/react-sigma/blob/22ffeb743b9893354171f025edc217e4241ca70c/src/Filter.js#L30-L60 "Source code on GitHub")

**Extends React.Component**

Filter component, interface for filter sigma plugin.
It supposes that sigma graph is already in place, therefore component should not be
mounted until graph is available. It can be used within Sigma component if graph is
preloaded, or within loader component, like NeoCypher.

Filter is hiding all nodes which do not apply to the provided nodesBy criteria.

**Parameters**

-   `nodesBy` **Nodes$Filter** will hide nodes where filter returns falsetype Nodes$Filter = (node: Sigma$Node) => boolean;