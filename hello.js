var { graphql, buildSchema } = require("graphql");

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`

  type Person {
    name: String,
    email: String
  }

  type Query{
    users: [Person]
  }
`);

// The root provides a resolver function for each API endpoint
var root = {
  users: () => {
    return [{
      name: "rahul",
      email: 'a'
    },
  
  ]
  } 
};

// Run the GraphQL query '{ hello }' and print out the response
graphql(schema, "{ hello }", root).then((response) => {
  console.log(response);
});
