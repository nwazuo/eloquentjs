class Graph {
  constructor() {
    this.nodes = [];
    this.adjacencyList = {}
  }

  addNode(node) {
    this.push.nodes(node);
    this.adjacencyList[node] = [];
  }
  addEdge(node1, node2, weight) {
    this.adjacencyList[node1].push({ node: node2, weight: weight });
    this.adjacencyList[node2].push({ node: node1, weight: weight });
  }
  findPathWithDijkstra(startNode, endNode) {
    let times = {};
    let backtrace = {};
    let pq = new PriorityQueue();

    times[startNode] = 0;
    this.nodes.forEach(node => {
      if (node !== startNode) {
        times[node] = infinity;
      }
    })

    pq.enqueue([startNode, 0]);

    while (!pq.isEmpty()) {
      let shortestStep = pq.dequeue();
      let currentNode = shortestStep[0];

      this.adjacencyList.forEach(neighbor => {
        let time = times[currentNode] + neighbor.weight;

        if (time < times[neighbor.node]) {
          times[neighbor.node] = time;
          backtrace[neighbor.node] = currentNode;
          pq.enqueue([neighbor.node, time]);
        }
      });
    }
    let path = [endNode];
    let lastStep = endNode;

    while (lastStep !== startNode) {
      path.unshift(backtrace[lastStep])
      lastStep = backtrace[lastStep];
    }
    return `Path is ${path} and time is ${times[endNode]}`;
  }
}

class PriorityQueue {
  constructor() {
    this.collection = [];
  }

  enqueue(element) {
    if (this.isEmpty()) {
      this.collection.push(element);
    } else {
      let added = false;
      for (let i = 1; i <= this.collection.length; i++) {
        if (element[1] < this.collection[i - 1][1]) {
          this.collection.splice(i - 1, 0, element);
          added = true;
          break;
        }
      }
      if (!added) {//if a greater element is not found, it is moved to the last position in the queue
        this.collection.push(element);
      }
    }
  }
  dequeue() {
    let value = this.collection.shift();
    return value;
  }

  isEmpty() {
    return (this.collection.length === 0)
  }
}

let map = new Graph();
map.addNode('Fullstack');
map.addNode('Starbucks');
map.addNode('Insomnia Cookies');
map.addNode('Cafe Grumpy');
map.addNode('Dig Inn');
map.addNode('Dubliner');

map.addEdge("Fullstack", "Starbucks", 6);
map.addEdge("Fullstack", "Dig Inn", 7);
map.addEdge("Fullstack", "Dubliner", 2);
map.addEdge("Starbucks", "Dubliner", 3);
map.addEdge("Starbucks", "Insomnia Cookies", 6);
map.addEdge("Insomnia Cookies", "Cafe Grumpy", 5);
map.addEdge("Insomnia Cookies", "Dubliner", 7);
map.addEdge("Cafe Grumpy", "Dig Inn", 9);
map.addEdge("Dig Inn", "Dubliner", 4);