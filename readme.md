# MongoOverflow
A lightweight version of stackoverflow built with node.js

Built with these awesome tools:

* [Node.js](http://nodejs.org/)
* [Express](http://expressjs.com/)
* [Socket.IO](http://socket.io/)
* [Angular.js](https://angularjs.org/)
* [Semantic UI](http://semantic-ui.com/)

Running End To End Tests
========================

Install Protractor globally:

```bash
$ npm install -g protractor
```

Now start up a server with:

```bash
$ webdriver-manager start
```

Run Test:

```bash
protractor client/test/e2e/conf.js
```

License
=======
MongoOverflow is released under the [**MIT License**](http://www.opensource.org/licenses/MIT).