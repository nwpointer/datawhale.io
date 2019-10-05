---
title: "On learning new languages"
date: "2019-08-19"
---

When I first got started with development I primarily focused on javascript. I was exposed to other languages such as php, python, java, c, and haskell in school but whenever I had the chance I'd use javascript. For me it made sense - I liked the syntax, I could run it basically anywhere I wanted and I could use almost any programming style I wanted. For a long time this worked really well - I was was able to explore new concepts in a familiar context and with the pace of evolution in the JS ecosystem there was always something new to learn. At a certain point however I think it becomes necessary to branch out and dig deeper into other languages, learn their histories, opinions and lower level constructs.

I've heard a lot of people say that once you lean one language or maybe at least one functional and one object oriented language that learning a new one is easy. To some extent thats true - learning new syntax is trivial but I think being able to express 'hello world' is a pretty far cry from being able to write performant, idiomatic code that fluently utilizes common libraries and language specific tooling.

Recently I've had the opportunity to write production code in a couple of new languages, namely Python and Java. Java in particular violated a lot of my expectations so I thought it might be useful to try and make a make a list of critical topics to investigate when learning a new language so that the next time I need to pick up a new language it really will be trivial.

To start with I'm going to just going to enumerate some broad topics but may break them down further is subsequent posts. Some topics maybe more specific to my experience and the problem domains I work in frequently but Im hoping it will be generally useful for others picking up a new language

- What are some common uses of this language and why do people like it?
- What broad programming paradigms are possible / common in this language?
- In memory management manual?
- Whats the type system like (static vs dynamic, inferred vs manifest etc)? Does it have any gotchas?
- Get your IDE setup for success
- How are project files structured / organized?
- Whats the preferred package manager?
- Is there a preferred build tool?
- Whats libraries are available for unit testing and how do I run them?
- Is there version manager(s) / virtual environment tooling available?
- What are some of the 'core data types' that get used heavily in idiomatic code
- Take note of the time complexity of common operations on these data types
- Are there performant immutable versions of these data types available?
- What abstractions are available for running asynchronous operations?
- What abstractions are available for handling concurrency?
- What abstractions are available for managing side effects?
- What are the core concepts necessary to understand that languages performance characteristics? ie is it garbage collected or are there concept's like the JS event-loop which need to be understood
- How would I make a micro service in this language?
- How would I make a UI in this language?
- How would this language change the way I implement basic algorithms (search, graph traversal etc)
- What are some common tools / clients for interacting with Databases from this language?
- What are some of the high profile open source projects / libraries?
- What are some good examples of 'expressive' code in that language
- What are some good examples of larger code-bases in that language and how are they structured.