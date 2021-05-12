import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  JSON: any;
  JSONObject: any;
};

export type AuthenticateResponse = {
  __typename?: 'AuthenticateResponse';
  name: Scalars['String'];
  token: Scalars['String'];
};

export type Creator = {
  __typename?: 'Creator';
  name?: Maybe<Scalars['String']>;
};

export type ForgotPasswordResponse = {
  __typename?: 'ForgotPasswordResponse';
  token: Scalars['String'];
  message: Scalars['String'];
};

export type Item = {
  __typename?: 'Item';
  id: Scalars['Int'];
  title: Scalars['String'];
  user_id: Scalars['Int'];
  createdAt: Scalars['String'];
  updateAt?: Maybe<Scalars['String']>;
};

export type ItemResponse = {
  __typename?: 'ItemResponse';
  id: Scalars['Int'];
  title: Scalars['String'];
  creator: Creator;
  createdAt: Scalars['String'];
};



export type Mutation = {
  __typename?: 'Mutation';
  _empty?: Maybe<Scalars['String']>;
  addItem: ItemResponse;
  forgotPassword: ForgotPasswordResponse;
  register: AuthenticateResponse;
  removeItem: RemoveItemResponse;
  resetPassword: ResetPasswordResponse;
};


export type MutationAddItemArgs = {
  title: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationRegisterArgs = {
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRemoveItemArgs = {
  itemId: Scalars['Int'];
};


export type MutationResetPasswordArgs = {
  resettoken: Scalars['Int'];
  password?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  _empty?: Maybe<Scalars['String']>;
  items: Array<Maybe<ItemResponse>>;
  login: AuthenticateResponse;
};


export type QueryLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type RemoveItemResponse = {
  __typename?: 'RemoveItemResponse';
  id: Scalars['Int'];
  title: Scalars['String'];
};

export type ResetPasswordResponse = {
  __typename?: 'ResetPasswordResponse';
  message: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  resettoken: Scalars['Int'];
  tokenexpiration: Scalars['Int'];
  createdAt: Scalars['String'];
  updateAt?: Maybe<Scalars['String']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AuthenticateResponse: ResolverTypeWrapper<AuthenticateResponse>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Creator: ResolverTypeWrapper<Creator>;
  ForgotPasswordResponse: ResolverTypeWrapper<ForgotPasswordResponse>;
  Item: ResolverTypeWrapper<Item>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  ItemResponse: ResolverTypeWrapper<ItemResponse>;
  JSON: ResolverTypeWrapper<Scalars['JSON']>;
  JSONObject: ResolverTypeWrapper<Scalars['JSONObject']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  RemoveItemResponse: ResolverTypeWrapper<RemoveItemResponse>;
  ResetPasswordResponse: ResolverTypeWrapper<ResetPasswordResponse>;
  User: ResolverTypeWrapper<User>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthenticateResponse: AuthenticateResponse;
  String: Scalars['String'];
  Creator: Creator;
  ForgotPasswordResponse: ForgotPasswordResponse;
  Item: Item;
  Int: Scalars['Int'];
  ItemResponse: ItemResponse;
  JSON: Scalars['JSON'];
  JSONObject: Scalars['JSONObject'];
  Mutation: {};
  Query: {};
  RemoveItemResponse: RemoveItemResponse;
  ResetPasswordResponse: ResetPasswordResponse;
  User: User;
  Boolean: Scalars['Boolean'];
};

export type AuthenticateResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthenticateResponse'] = ResolversParentTypes['AuthenticateResponse']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreatorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Creator'] = ResolversParentTypes['Creator']> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ForgotPasswordResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ForgotPasswordResponse'] = ResolversParentTypes['ForgotPasswordResponse']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['Item'] = ResolversParentTypes['Item']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user_id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updateAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItemResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ItemResponse'] = ResolversParentTypes['ItemResponse']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  creator?: Resolver<ResolversTypes['Creator'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export interface JsonObjectScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSONObject'], any> {
  name: 'JSONObject';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  addItem?: Resolver<ResolversTypes['ItemResponse'], ParentType, ContextType, RequireFields<MutationAddItemArgs, 'title'>>;
  forgotPassword?: Resolver<ResolversTypes['ForgotPasswordResponse'], ParentType, ContextType, RequireFields<MutationForgotPasswordArgs, 'email'>>;
  register?: Resolver<ResolversTypes['AuthenticateResponse'], ParentType, ContextType, RequireFields<MutationRegisterArgs, 'name' | 'email' | 'password'>>;
  removeItem?: Resolver<ResolversTypes['RemoveItemResponse'], ParentType, ContextType, RequireFields<MutationRemoveItemArgs, 'itemId'>>;
  resetPassword?: Resolver<ResolversTypes['ResetPasswordResponse'], ParentType, ContextType, RequireFields<MutationResetPasswordArgs, 'resettoken'>>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  _empty?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  items?: Resolver<Array<Maybe<ResolversTypes['ItemResponse']>>, ParentType, ContextType>;
  login?: Resolver<ResolversTypes['AuthenticateResponse'], ParentType, ContextType, RequireFields<QueryLoginArgs, 'email' | 'password'>>;
};

export type RemoveItemResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['RemoveItemResponse'] = ResolversParentTypes['RemoveItemResponse']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ResetPasswordResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResetPasswordResponse'] = ResolversParentTypes['ResetPasswordResponse']> = {
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  resettoken?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  tokenexpiration?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updateAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AuthenticateResponse?: AuthenticateResponseResolvers<ContextType>;
  Creator?: CreatorResolvers<ContextType>;
  ForgotPasswordResponse?: ForgotPasswordResponseResolvers<ContextType>;
  Item?: ItemResolvers<ContextType>;
  ItemResponse?: ItemResponseResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  JSONObject?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  RemoveItemResponse?: RemoveItemResponseResolvers<ContextType>;
  ResetPasswordResponse?: ResetPasswordResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
