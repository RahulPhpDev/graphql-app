###aliases

{
  User3: findUser(id:3) {
    id,
    name
  }
  
  User1: findUser(id:1) {
    id,
    name
  }
}

copying id,name and more field all time is very un usual

Framgment


{
  User3: findUser(id:3) {
   ...userField
  }
  
  User1: findUser(id:1) {
    ...userField
  }
}


fragment userField on User {
  id, name
}