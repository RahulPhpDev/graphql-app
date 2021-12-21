var express = require("express");
var { graphqlHTTP } = require("express-graphql");
var { buildSchema } = require("graphql");

let fakeDb = {};
// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
type RandomDie {
    numSides: Int!,
    rollOnce: Int!,
    roll(numRolls:Int!): [Int]
}
type RandomGov {
    party: String
}
type Person {
  name: String,
  age: Int
}
type User {
  id: Int,
  name: String
}
  type Query {
    id: ID,
    hello: String,
    age: Int,
    getUserInfo(name: String, age: String): [String],
    rollDice(numDice: Int!, numSides: Int): [Int],
    Gov(party: String): RandomGov,
    getDie(numSides:Int): RandomDie,
    users: [Person],
    findUser(id: Int!) : User
  }
  type Mutation {
    addTechnology(msg:String): String
  }
`);

//let understand fragment and aliases in graphql

// The root provides a resolver function for each API endpoint
var root = {
  addTechnology: ({msg}) => {
    return fakeDb.msg = msg
  },
  findUser: (param) => {
    return userDetail.find( (user) => user.id == param.id);
  },
  users: () => {
    return [
      {
        name: "abv",
        age: 43
      },
      {
        name: "afs",
        age: 44
      }
    ]
  },
  Gov: ({ party }) => {
    return { party: "BIO", pm: "modi" };
  },
  getDie: ({ numSides }) => {
    return new RandomDie(numSides || 6);
  },
  hello: () => {
    return "Hello world ";
  },
  age: () => 17,
  id: () => 12,
  getUserInfo: ({ name, age }) => {
    console.log(name);
    return [name, age];
  },
  rollDice: ({ numDice, numSides }) => {
    var output = [];
    for (var i = 0; i < numDice; i++) {
      output.push(1 + Math.floor(Math.random() * (numSides || 6)));
    }
    return output;
  },
};

var app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");

class RandomDie {
  constructor(numSides) {
    this.numSides = numSides;
  }

  rollOnce() {
    return 1 + Math.floor(Math.random() * this.numSides);
  }

  roll({ numRolls }) {
    var output = [];
    for (var i = 0; i < numRolls; i++) {
      output.push(this.rollOnce());
    }
    return output;
  }
}

const userDetail = [ {
  id: 1,
  name:"abc"
},
{
  id: 2,
  name: "2nd"
},
{
  id: 3,
  name: "3nd"
},

]
