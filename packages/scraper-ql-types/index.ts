import { GraphQLEnumType } from "graphql";

export interface RootSource {
    url: string;
    authorization?: string;
    method?: GraphQLEnumType;
}

export interface Args {
    filter?: string;
}
