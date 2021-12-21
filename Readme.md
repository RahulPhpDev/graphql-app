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


### Passing a variable

query 
    ```
    query findUser($userid_1:Int!, $userid_2: Int! = 3) {
  User3: findUser(id:$userid_1) {
   ...userField,
    email
  }
  
  User1: findUser(id:$userid_2) {
    ...userField
  }
}

```

##Pass a variable 
```
{
  "userid_1": 1
}
```