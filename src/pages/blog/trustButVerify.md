---
title: "Trust but verify: A strategy for safely increaing api flexibility"
date: "2017-05-04"
---

I’ve recently been thinking a lot about increasing the api flexibility. At my current workplace CBT Nuggets we’ve been experimenting with two new technologies that have dramatically increased the flexibility of our API. The first is Graphql which has made working with interconnected data easier and more efficient - if you haven’t had a chance to play around with graphql yet I highly recommend it it’s a lot of fun. The second was an internal project we dubbed NQL (nugget query language) which is a convenient, url safe syntax that let us be even more specific about what data we want returned.

#### Benefits of flexibility:

With both these techniques we have gained the ability to add filtering, sorting, projection, paging, relational traversal to our API endpoints with very little effort and in a standardized fashion. In some ways our api now resemble a networked ORM much more than traditional REST API. We’ve gained several benefits from this approach, namely insulation from changing frontend querying requirements, reduced startup cost associated with spinning up new micro-services, and increased API consistency (ie happy api consumers).

#### Risks of flexibility:

Before the devious among you rush off to overload our api with complex filters and relational queries I’ll note that we’ve added these features to our private internally available API only. This means only trusted actors like other services or internal business tools have access to these features. This allows us to keep any joe-shmo with an api token from overloading our servers but it also limits the extent that we can realize the benefits of these tools. Although implementation would be non trivial I believe I have a potential solution that would allow for flexible api to be safely exposed publicly.

### A Potential Solution

Imagine for a moment we had a whitelist of all safe queries that can be made against our new flexible api. We could allow all safe queries to run and block all queries we know we’ll be unable or unwilling to service. Our problem is solved - only safe queries are possible!

Returning to reality, manually creating this whitelist would be tedious and require a priori knowledge of how our api will be used in the future. This whitelisting naive strategy seems untenable. To solve this problem we’ll create our our whitelist dynamically at build time.

Most Front-end javascript clients these days make use of build-tools to compile their code. As part of this build step it should be possible to statically analyse all api request made by the code. Once we have a list of queries made by a client we dynamically add them to our trusted whitelist. During code review we can verify that these queries are indeed safe or request modifications to the client, the service or our requirements in order to insure no unsafe queries make it into production.

Notably, this system would benefit from query level monitoring - ie a tool like apollo for GQL based systems or optionally a custom system that provided time and computation resources consumed on a per query basis so that problem queries can be isolated and removed from the whitelist. Optionally this process of blacklisting or throttling problem queries could be automated to protect against attacks from bad actors or poorly optimized queries.

### Conclusion

This pattern is significantly more complicated in some ways than standard REST API so I wouldn't recommend applying unless there is a strong need for above average api flexibility. Its also important to note that the use of Graphql as a additional layer of indirection here is critical to long term viability of this pattern - it gives us the option to change our query resolution implementation without changing our api. Conceivably other tools could used to avoid this problem but we get it 'for free' when including graphql in our stack.

In this way we can trust all api requests but maintain control by verifying their effect on production systems - trust but verify.