import { GraphQLFieldResolver } from 'graphql';
import { Args, RootSource } from '../types';
export declare const getImgsForUrl: (url: string) => Promise<string[]>;
declare const imageResolver: GraphQLFieldResolver<RootSource, Args>;
export default imageResolver;
