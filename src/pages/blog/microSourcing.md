---
date: "2017-04-30"
title: The 'Hello world' of Microservices and Eventsourcing
---

Microservices are by now a well accepted architectural pattern. I had the opportunity to attend the O'Reilly conference in New York this year and at the conference talk moved from why you should build microservices to potential challenges that many microservice oriented architectures are likely to encounter in their lifetime. In this article I'd like to describe a specific architecture discussed in multiple talks this year. After watching architectural talks I'm often left feeling I won't fully understand the pros and cons of the design until I try it out myself so I'll also walk through a hello-world style implementation so you can see in more concrete terms what we're talking about.

One of the first conveniences lost in a micro service is a single persistence layer. If micro services share the same database then they can interfere with each other and can not be scaled independently. Consideration must be given to how services communicate to avoid coupling them. If one service depends directly on a specific data representation returned by another service then they must change together - this is not ideal and should be minimized. This may indicate you may need to redraw the boundaries between your services and/or create a new ones. As more requirements are added to the system these dependencies become more likely and harder to avoid.

We're going to avoid these direct dependencies by indirectly depending on a new entity - the central event log. At the cost of some setup we're gonna get back some of the nice properties of a shared persistence layer without sacrificing the architectural integrity of our system. This architecture is not a magic bullet and as always has its pros and cons but none the less I think at the very least interesting and worth discussing.

The proposed solution involves both CQRS and Event sourcing. If you are unfamiliar with these concepts they may sound complicated but stay with me, they are not complicated they are just different.

**Event sourcing** is a persistence strategy where system state is built up from a series of events. If you've ever used Redux or are familiar with how accounting works you are familiar with event sourcing as they operate on the same principles. Data is never updated or deleted in a event log - to change state additional events are generated. Event sourcing has a number of nice properties but right now we're most interested in how a single event log can be reduced into any number of valid states - this will give each service flexibility to 'view' the state of the system however they like.

**CQRS** stands for command query responsibility segregation takes a traditional CRUD data store and separates the model used for reading information and the model used for updating information. This works really well in systems with unbalanced read to write ratios as they can be scaled separately and develops naturally in an event sourced system.


###Design
![Awesome image](/es.png)

Many of the talks discussed the advantages of using kafka as the event log as it's fairly easy to use, remains performant event with large number of events and can persist them indefinitely. For our hello world example I opted to keep things simple and implemented a poor-man’s event log using express.

Our hello-world will consist of three main parts, our event log service and two super micro services. Our first service will have the monumental responsibility of summing a stream of integers and the second will reduce the same stream to its product. Events are almost always more complicated than just a stream of integers but it will show off how multiple 'services' can built up their state independently from a single event log.

Most of the code we write will describe a simple message passing format that will allow the services to communicate - in a real app the code responsible for reducing or generating events would constitute a much larger portion of the code base, it's only because our services are so simple that this is the case.

To avoid some of the complexities of inter service communication, each service will run locally on the same machine on a different port. The add and multiply service will register the port they are running on with the event log so that it knows where to push events out to. The event store will make available a /push endpoint that will record events and send them out to the other two services. The other services will recieve messages on a /receive endpoint.


### Implementation
If you want to follow along I've provided the walk-through below but you can also skip ahead to the usage section and download the code here: https://github.com/npointercbt/microsource to see it in action

##### Step zero: in a new directory run

These are our only dependencies but make sure you are using the latest version of node:



```sh
npm init -f
npm install --save express
npm install --save superagent
npm install --save body-parser 
```

##### Step one: service factory

Since we're going to be making 3 services I opted to write a small factory function that will return a simple express app with some default settings pre-applied. I placed this code in a file called service.js


```javascript
var express = require('express');
var bodyParser = require('body-parser');

module.exports = function(){
    var app = express();
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    return app;
}
```

##### Step two: Event log
```javascript
// First we’ll use our service factory and pull in super agent:
var request = require('superagent');
var eventStore = require('./service.js')();

// here we've set up an in memory array to serve as our event log. 
// In a real app you would want to persist these events. 
var log = [1,1,1,1,2];

// we're going to use a super simple port based service registration. 
// I've opted to use a set to guarantee we avoid pushing events to a service multiple times.
var listeners = new Set([]);

// Routes
eventStore.get('/log', (req, res) => res.send(log));

// Routes
eventStore.get('/subscribers', (req, res) => {
    listenersList = [...listeners];
    res.send([...listeners])
});

// this allows services to register themselves with our event store
eventStore.post('/subscribe/:port', (req, res) => {
    listenersList = [...listeners];
    listeners.add(req.params.port);
    res.send([...listeners])
});

// this iterates through each of our services and notifies them of the new event 
eventStore.post('/push', (req, res) => {
    // grab the event off the request body
    event = req.body.event;
    // add it to our event log
    log.push(event);
    // create an array from our es6 set so we can map over it
    listenersList = [...listeners];
    // push event to each of our services by triggering the agreed upon endpoint.
    listenersList.map(port=>{
        request.post(`localhost:${port}/receive`)
            .send({event})
            .end();
    })
    // return the updated log to confirm it was received correctly - would not do
    // in real app for performance reasons.
    res.send(log)
})

module.exports = eventStore;
```

##### Step three: Service registration
Next we'll create a index.js file that will startup our eventStore and eventually register our other two services.

```javascript   
var eventStore = require('./eventstore.js');
var add = require('./add.js');
var mult = require('./multiply.js');

eventStore.listen(3000, ()=>console.log('es started on port 3000'));
add.listen(3001, ()=>console.log('add started on port 3001'));
mult.listen(3002, ()=>console.log('mult started on port 3002'));
```

##### Step four: Add service
```javascript
// initialize express and dependencies
var request = require('superagent')
var add = require('./service.js')()

// we'll start our initial state at zero
var state = 0

// ... and build up our current state from the event log every time the service starts up
// in a real app we would store these 'snapshots' and apply an auditing strategy to maintain performance 
// and correctness.
request.get('localhost:3000/log').then(res=>{
    res.body.map(reducer)
})

// reducers
// this is the world's simplest reducer - more complicated app states can be built up with nested reducers 
// controlling branches of a state tree - this is the more 'reduxy' strategy but other methods could 
// conceivably be used.
function reducer(message){
    state += message
}

// Routes
// these routes are required to satisfy our communication protocol and are almost identical between 
// add.js and multiply.js
add.post('/receive', (req, res) => {
    console.log('add received:', req.body)
    reducer(req.body.event)
});

add.get('/state', (req, res) => {
    res.send(`\nadder state: ${state}\n`)
})

module.exports = add;
```

##### Step five: Multiply service

Almost identical except we set our initial state to 1 to avoid always returning 0 (because anything*0 is 0) and our reducer is modified to perform multiplication instead of addition.

### Usage

Startup our services and subscriptions:
```bash
node index.js
curl -X "POST" localhost:3000/subscribe/3001
curl -X "POST" localhost:3000/subscribe/3002
```

Note current state of both services:
```bash 
curl localhost:3001/state
curl localhost:3002/state
```

Push an event to the log:
```bash
Push an event to the log:
```

Note how the state of both has automatically updated:
```bash
curl localhost:3001/state
curl localhost:3002/state
```

### Takeaways
Hopefully by this point we've gotten a clearer picture of what an event-sourced application looks like. We have a naive working example that showcases some of the potential benefits and also the implementation challenges. As always thanks for reading and if you have any questions or suggestions let me know.