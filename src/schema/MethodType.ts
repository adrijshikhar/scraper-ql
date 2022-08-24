import { GraphQLEnumType } from "graphql";

const MethodType = new GraphQLEnumType({
  name   : 'Method',
  values : {
    GET  : { value: "GET" },
    POST : { value: "POST" },
    PUT  : { value: "PUT" },
  }
});

export default MethodType;