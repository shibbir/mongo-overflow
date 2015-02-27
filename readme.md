# MongoOverflow
A lightweight version of stackoverflow built with MEAN stack

Tools and Technology used in this project:

* [Node.js](http://nodejs.org/)
* [Express](http://expressjs.com/)
* [MongoDB](http://www.mongodb.org/)
* [Socket.IO](http://socket.io/)
* [Angular.js](https://angularjs.org/)
* [Semantic UI](http://semantic-ui.com/)

Running Unit Tests
====================

Install mocha globally:

```bash
$ npm install -g mocha
```

Then, Run Tests:

```bash
$ mocha
```

Running End To End Tests
====================

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