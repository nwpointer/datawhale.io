---
date: "2017-04-21"
title: "Meet Choo.js: a simple react + redux alternative"
---

As you may know, React and Redux have a beautiful mental model for building apps. React handles reactive updates that can be described conceptually using a simple function:
```
Component(State)->View
```

Redux similarly has a simple mental model:
```
Event -> Action -> Reducer -> State ...
```

Both projects are highly flexible - there's nothing keeping you from using each project independently in any number of contexts (command line interface, server, native app etc) - but this flexibility comes with a cost. It's become fashionable to make open source libraries as small and flexible as possible and for the most part this makes a lot of sense as it expands the market for each package and gives developers more control over their stack.

But like all things too much flexibility comes with trade-offs that will negatively affect other properties of the system if taken to extremes. If you already know the React/Redux mental model is what you want to use and you're ok committing to that choice, a system like Choo that makes this assumption comes with a lot of benefits.

### Zero Glue
Setting up a feature with React/Redux takes a lot of steps. First you have to define a constant for your action type, setup action creators, modify your reducers to merge data into the state tree, potentially update your initial state, modify your component to take the new data as a prop, utilize the prop and action creator in your component and finally make sure your components stay reactive with a custom “mergeStatetoprops” function.

And if you want to handle asynchronous events you have to download and understand Redux-thunks or a similar package (choo avoids this by making side-effects a core concept of choo).

##### Or you could use Choo:
```javascript
const choo = require('choo')
const html = require('choo/html')
const app = choo()

app.model({
    state: { title: 'Not quite set yet' },
    reducers: {
    update: (data, state) => ({ title: data })
    }
})
```

All Choo views are formated similarly to React pure render functions:
```javascript
const mainView = (state, prev, send) => html`
<main>
<h1>Title: ${state.title}</h1>
<input
  type="text"
  oninput=${(e) => send('update', e.target.value)}>
</main>
`
```

Oh and did I mention it comes with a router?
```javascript
app.router((route) => [
    route('/', mainView)
])

const tree = app.start()
document.body.appendChild(tree)
```

*Slap a compiled version of this script into a html page and thats literally all you need to do get a single page app up and running.*

I think thats pretty cool.

### Simpler build tools
Building Choo is also much simpler than the traditional babel/webpack setup. For example . . .

Example npm start:
```bash
budo client.js -p 8080 --open -- -t es2020
```

Example npm build:
```bash
mkdir -p 'dist/'
curl 'localhost:8080' > 'dist/index.html'
curl 'localhost:8080/client.js' > 'dist/client.js'
```

If you want to learn more about how to make Choo.js apps, I encourage you to check out their docs: https://github.com/yoshuawuyts/choo

### Where to use Choo
I think you should look before you leap into using Choo in production. I personally would want to do more performance and cross browser testing before advocating that. I'm also not really advocating you re-write a working app in Choo as many of costs of setting up a React/Redux stack have already been paid.

That said I think it's a great option for new projects such as MVPs or hackathon projects. Asking people to read 4+ docs before they can contribute is less than ideal and debugging build scripts on someone else's machine at 3am is not so much fun.

Because of Choo's small file size there is also some discussion on Github about how to use Choo to build self contained widgets (think youtube embedded player or stipe's simple checkout widget) that could be used on other pages where the weight of a full React/Redux build would be inappropriate. I find this use case particularly exciting as it's one that Choo is uniquely suited for.

### Conclusion
Flexibility has costs. Choo reimagines what redux/react would look like today if it was constructed as a unified whole as opposed to a network of libraries. This technique has advantages, namely in simplicity of api, page weight, and ttff: time to first feature. I encourage you to check it out and build your own projects with similar philosophies. React/Redux may be industry standards but that doesn't mean we should include them everywhere without being cognizant of their effects on the architecture of our systems. Choo makes a great alternative if you don't need all the bells and whistles that come with react/redux.