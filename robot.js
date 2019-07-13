const roads = [
    "Alice's House-Bob's House", "Alice's House-Cabin",
    "Alice's House-Post Office", "Bob's House-Town Hall",
    "Daria's House-Ernie's House", "Daria's House-Town Hall",
    "Ernie's House-Grete's House", "Grete's House-Farm",
    "Grete's House-Shop", "Marketplace-Farm",
    "Marketplace-Post Office", "Marketplace-Shop",
    "Marketplace-Town Hall", "Shop-Town Hall"
    ];

function buildGraph(edges) {
    let graph = Object.create(null); 
    function addEdge(from, to) {
        if(graph[from] == null) {
            graph[from] = [to];
        }
        else {
            graph[from].push(to);
        }
    }

    for (let [from, to] of edges.map(r => r.split('-'))) {
        addEdge(from, to);
        addEdge(to, from);//makes sure the nodes that have an edge going out and coming in are well implemented
    } 
    return graph;
}

const roadGraph = buildGraph(roads);

//The state of the village defined by two parameters 
class VillageState {
    constructor(place, parcels) {
        this.place = place;
        this.parcels = parcels;
    }

    move(destination) {
        if(!roadGraph[this.place].includes(destination)) {
            console.log('could not move');
            return this;
        } else {
            let parcels = this.parcels.map(p => {
                if (p.place != this.place) return p;
                return {place: destination, address: p.address};
            }).filter(p => p.place != p.address);
            return new VillageState(destination, parcels);
        }
    }
}

//function to run the robot
function runRobot(state, robot, memory) {
    for(let turn = 0;;turn++) {
        if(state.parcels.length == 0) {
            console.log(`Finished in ${turn} turns`);
            break;
        }
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
        console.log(`Moved to ${action.direction}`);
    }
}
function randomRobot(state) {
    return {direction: randomPick(roadGraph[state.place])};
}

function randomPick(array) {
    let pick = Math.floor(Math.random() * array.length);
    return array[pick];
}

VillageState.random = function(parcelCount = 5) {
    let parcels = [];
    for(let i = 0; i < parcelCount; i++) {
        let address = randomPick(Object.keys(roadGraph));
        let place;

        do {
            place = randomPick(Object.keys(roadGraph));
        } while(place == address)
        parcels.push({place, address});
    }
    return new VillageState("Post Office", parcels);
}

const mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
    ];

function routeRobot(state, memory) {
    if(memory.length == 0) {
        memory = mailRoute;
    }
    return {direction: memory[0], memory: memory.slice(1)};
}

function findRoute(graph, from, to) {
    let work = [{ at: from, route: [] }];
    for (let i = 0; i < work.length; i++) {
        let { at, route } = work[i];
        for (let place of graph[at]) {
            if (place == to) return route.concat(place);
            if (!work.some(w => w.at == place)) {
                work.push({ at: place, route: route.concat(place) });
            }
        }
    }
}

function goalOrientedRobot({place, parcels}, route) {
    if(route.length == 0) {
        let parcel = parcels[0];
        if(parcel.place != place) {
            route = findRoute(roadGraph, place, parcel.place)
        }
        else {
            route = findRoute(roadGraph, place, parcel.address)
        }
    }
    return {direction: route[0], memory: route.slice(1)}
}

// runRobot(VillageState.random(), goalOrientedRobot, mailRoute);

//excercise Compare Robots

function testRun(state, robot, memory) {
    let turns = 0;
    for(let turn = 0;;turn++) {
        if(state.parcels.length == 0) {
            turns = turn;
            break;
        }
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
    }
    return turns;
}

function compareRobots(robot1, robot2, startMemory) {
    let robot1turns = 0;
    let robot2turns = 0;
    for(let i = 0; i <= 100; i++) {
        robot1turns += testRun(VillageState.random(), robot1, startMemory);
        robot2turns += testRun(VillageState.random(), robot2, startMemory);
    }
    let robot1average = robot1turns / 100;
    let robot2average = robot2turns / 100;

    let robot1Id = {
        name: robot1.name,
        turns: robot1turns
    };
    let robot2Id = {
        name: robot2.name,
        turns: robot2turns
    };

    console.log(`${robot1Id.name} took a total of ${robot1turns} and an average of ${robot1average} turns`);
    console.log(`${robot2Id.name} took total of ${robot2turns} and an average of ${robot2average} turns`);

    let getFaster = [robot1Id, robot2Id].sort((a, b) => a.turns > b.turns ? 1:-1).reduce((a, b) => { return `${a.name} was ${Math.round(((b.turns - a.turns) / a.turns) * 100)}% faster than ${b.name}`});
    console.log(getFaster);
}

compareRobots(routeRobot, goalOrientedRobot, mailRoute);