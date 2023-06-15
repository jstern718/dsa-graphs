/** Node class for graph. */

class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}


/** Graph class. */

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  /** add Node instance and add it to nodes property on graph. */
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  /** add array of new Node instances and adds to them to nodes property. */
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.addVertex(vertex);
    }
  }

  /** add edge between vertices v1,v2 */
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  /** remove edge between vertices v1,v2 */
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  /** remove vertex from graph:
   *
   * - remove it from nodes property of graph
   * - update any adjacency lists using that vertex
   */
  removeVertex(vertex) {
    let adjacent = vertex.adjacent;
    adjacent.forEach(neighbor => neighbor.adjacent.delete(vertex));

    this.nodes.delete(vertex);
  }

  /** traverse graph with DFS and returns array of Node values */
  depthFirstSearch(start) {
    let toVisitStack = [start];
    let seen = new Set(toVisitStack);

    while (toVisitStack.length) {
      let curr = toVisitStack.pop();

      for (let neighbor of curr.adjacent) {
        if (!seen.has(neighbor)) {
          toVisitStack.push(neighbor);
          seen.add(neighbor);
        }
      }
    }

    return seen;
  }

  /** traverse graph with BDS and returns array of Node values */
  breadthFirstSearch(start) {
    let toVisitStack = [start];
    let seen = new Array(start.value);

    while (toVisitStack.length) {
      let curr = toVisitStack.shift();

      for (let neighbor of curr.adjacent) {
        if (!seen.includes(neighbor.value)) {
          toVisitStack.push(neighbor);
          seen.push(neighbor.value);
        }
      }
    }
    console.log("seen from fn =", seen);
    return seen;
  }

  /** find the distance of the shortest path from the start vertex to the end vertex */
  distanceOfShortestPath(start, end, seen = new Set([start]), stepsTaken = 0, stepsOfAllRoutes = []) {
    // nodes to visit
    // nodes seen
    // current node is first node in nodes to visit
      // start is current node
      // add start to nodes seen
      // look at curr node's neighbors
      // go down each path, add to "step count", call fn again
    if (start === end){
      stepsOfAllRoutes.push(stepsTaken);
      return;
    }


    for (let neighbor of start.adjacent) {
      if (!seen.has(neighbor)) {
        debugger;
        seen.add(neighbor);
        this.distanceOfShortestPath(neighbor, end, seen, stepsTaken + 1, stepsOfAllRoutes);
        console.log("stepsOfAllRoutes", stepsOfAllRoutes)
        return Math.min(stepsOfAllRoutes);
      }
    }

    return undefined
  }
}

let graph = new Graph();

    let r = new Node("R");
    let i = new Node("I");
    let t = new Node("T");
    let h = new Node("H");
    let m = new Node("M");

    graph.addVertices([r, i, t, h, m]);

    graph.addEdge(r, i);
    graph.addEdge(r, t);
    graph.addEdge(r, h);
    graph.addEdge(i, t);
    graph.addEdge(t, h);
    graph.addEdge(h, m);
    graph.distanceOfShortestPath(r, m);

module.exports = { Graph, Node };
