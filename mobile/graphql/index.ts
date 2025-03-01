import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Color: { input: string; output: string; }
  DateTime: { input: string; output: string; }
  Email: { input: string; output: string; }
  JSON: { input: object; output: object; }
  Password: { input: string; output: string; }
  PhoneNumber: { input: string; output: string; }
  Time: { input: string; output: string; }
}

export interface BooleanFilter {
  equals?: InputMaybe<Scalars['Boolean']['input']>;
  isEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  isNotEmpty?: InputMaybe<Scalars['Boolean']['input']>;
}

export interface ConfirmSignUpInput {
  code: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
}

export interface CreateSudokuGameInput {
  difficulty: Scalars['Int']['input'];
}

export interface CreateUserInput {
  email: Scalars['Email']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['Password']['input'];
  phoneNumber: Scalars['PhoneNumber']['input'];
}

export interface DateFilter {
  equals?: InputMaybe<Scalars['DateTime']['input']>;
  gt?: InputMaybe<Scalars['DateTime']['input']>;
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  isEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  isNotEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
}

export interface Error {
  __typename?: 'Error';
  code: Scalars['String']['output'];
  message: Scalars['String']['output'];
}

export interface FloatFilter {
  equals?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  isEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  isNotEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
}

export interface IntFilter {
  equals?: InputMaybe<Scalars['Int']['input']>;
  gt?: InputMaybe<Scalars['Int']['input']>;
  gte?: InputMaybe<Scalars['Int']['input']>;
  isEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  isNotEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  lt?: InputMaybe<Scalars['Int']['input']>;
  lte?: InputMaybe<Scalars['Int']['input']>;
}

export interface ListSudokuGamesInput {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
}

export interface ListSudokuGamesResult {
  __typename?: 'ListSudokuGamesResult';
  items: Array<SudokuGame>;
  nextToken?: Maybe<Scalars['String']['output']>;
}

export interface ListUsersInput {
  limit?: InputMaybe<Scalars['Int']['input']>;
  nextToken?: InputMaybe<Scalars['String']['input']>;
}

export interface ListUsersResult {
  __typename?: 'ListUsersResult';
  items: Array<User>;
  nextToken?: Maybe<Scalars['String']['output']>;
}

export interface MakeSudokuGameMoveInput {
  gameId: Scalars['ID']['input'];
  number: Scalars['Int']['input'];
  type: SudokuSudokuGameMoveType;
  x: Scalars['Int']['input'];
  y: Scalars['Int']['input'];
}

export interface Mutation {
  __typename?: 'Mutation';
  confirmSignUp: Scalars['Boolean']['output'];
  createSudokuGame: SudokuGame;
  createUser: User;
  deleteSudokuGame: Scalars['Boolean']['output'];
  deleteUser: Scalars['Boolean']['output'];
  makeSudokuGameMove: SudokuGame;
  pong?: Maybe<Scalars['Boolean']['output']>;
  signUp: User;
  updateUser: User;
}


export interface MutationConfirmSignUpArgs {
  input: ConfirmSignUpInput;
}


export interface MutationCreateSudokuGameArgs {
  input: CreateSudokuGameInput;
}


export interface MutationCreateUserArgs {
  input: CreateUserInput;
}


export interface MutationDeleteSudokuGameArgs {
  id: Scalars['ID']['input'];
}


export interface MutationDeleteUserArgs {
  id: Scalars['ID']['input'];
}


export interface MutationMakeSudokuGameMoveArgs {
  input: MakeSudokuGameMoveInput;
}


export interface MutationSignUpArgs {
  input: SignUpInput;
}


export interface MutationUpdateUserArgs {
  input: UpdateUserInput;
}

export interface PageInfo {
  __typename?: 'PageInfo';
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
}

export interface PaginationInput {
  page?: InputMaybe<Scalars['Int']['input']>;
  perPage?: InputMaybe<Scalars['Int']['input']>;
}

export interface Query {
  __typename?: 'Query';
  getSudokuGame: SudokuGame;
  getUser: User;
  listSudokuGames: ListSudokuGamesResult;
  listUsers: ListUsersResult;
  me: User;
  ping?: Maybe<Scalars['Boolean']['output']>;
}


export interface QueryGetSudokuGameArgs {
  id: Scalars['ID']['input'];
}


export interface QueryGetUserArgs {
  id: Scalars['ID']['input'];
}


export interface QueryListSudokuGamesArgs {
  input?: InputMaybe<ListSudokuGamesInput>;
}


export interface QueryListUsersArgs {
  input?: InputMaybe<ListUsersInput>;
}

export interface SignUpInput {
  email: Scalars['Email']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['Password']['input'];
  phoneNumber: Scalars['PhoneNumber']['input'];
}

export interface SortInput {
  field: Scalars['String']['input'];
  order: SortOrder;
}

export type SortOrder =
  | 'ASC'
  | 'DESC';

export interface StringFilter {
  contains?: InputMaybe<Scalars['String']['input']>;
  endsWith?: InputMaybe<Scalars['String']['input']>;
  equals?: InputMaybe<Scalars['String']['input']>;
  isAnyOf?: InputMaybe<Array<Scalars['String']['input']>>;
  isEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  isNotEmpty?: InputMaybe<Scalars['Boolean']['input']>;
  startsWith?: InputMaybe<Scalars['String']['input']>;
}

export interface SudokuGame {
  __typename?: 'SudokuGame';
  board: Array<Array<SudokuGameCell>>;
  createdAt: Scalars['DateTime']['output'];
  difficulty: Scalars['Int']['output'];
  finishedAt?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['ID']['output'];
  moves: Array<SudokuGameMove>;
  updatedAt: Scalars['DateTime']['output'];
  user: User;
  userId: Scalars['String']['output'];
}

export interface SudokuGameCell {
  __typename?: 'SudokuGameCell';
  isCorrect?: Maybe<Scalars['Boolean']['output']>;
  isFixed: Scalars['Boolean']['output'];
  notes: Array<Scalars['Int']['output']>;
  number?: Maybe<Scalars['Int']['output']>;
  x: Scalars['Int']['output'];
  y: Scalars['Int']['output'];
}

export interface SudokuGameMove {
  __typename?: 'SudokuGameMove';
  number: Scalars['Int']['output'];
  timestamp: Scalars['DateTime']['output'];
  type: SudokuSudokuGameMoveType;
  x: Scalars['Int']['output'];
  y: Scalars['Int']['output'];
}

export type SudokuSudokuGameMoveType =
  | 'ADD_NOTE'
  | 'REMOVE_NOTE'
  | 'REMOVE_NUMBER'
  | 'SET_NUMBER';

export interface UpdateUserInput {
  firstName: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  lastName: Scalars['String']['input'];
  password?: InputMaybe<Scalars['Password']['input']>;
  phoneNumber: Scalars['PhoneNumber']['input'];
}

export interface User {
  __typename?: 'User';
  createdAt: Scalars['String']['output'];
  currentSudokuGame?: Maybe<SudokuGame>;
  currentSudokuGameId?: Maybe<Scalars['String']['output']>;
  email: Scalars['Email']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  phoneNumber: Scalars['PhoneNumber']['output'];
  updatedAt: Scalars['String']['output'];
}

export type SignUpMutationVariables = Exact<{
  input: SignUpInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string, phoneNumber: string, currentSudokuGameId?: string | null, createdAt: string, updatedAt: string } };

export type ConfirmSignUpMutationVariables = Exact<{
  input: ConfirmSignUpInput;
}>;


export type ConfirmSignUpMutation = { __typename?: 'Mutation', confirmSignUp: boolean };

export type SudokuGameCellFragment = { __typename?: 'SudokuGameCell', x: number, y: number, number?: number | null, isFixed: boolean, notes: Array<number>, isCorrect?: boolean | null };

export type SudokuGameFragment = { __typename?: 'SudokuGame', id: string, userId: string, difficulty: number, finishedAt?: string | null, createdAt: string, updatedAt: string, board: Array<Array<{ __typename?: 'SudokuGameCell', x: number, y: number, number?: number | null, isFixed: boolean, notes: Array<number>, isCorrect?: boolean | null }>>, moves: Array<{ __typename?: 'SudokuGameMove', x: number, y: number, number: number, type: SudokuSudokuGameMoveType, timestamp: string }> };

export type GetSudokuGameQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetSudokuGameQuery = { __typename?: 'Query', getSudokuGame: { __typename?: 'SudokuGame', id: string, userId: string, difficulty: number, finishedAt?: string | null, createdAt: string, updatedAt: string, board: Array<Array<{ __typename?: 'SudokuGameCell', x: number, y: number, number?: number | null, isFixed: boolean, notes: Array<number>, isCorrect?: boolean | null }>>, moves: Array<{ __typename?: 'SudokuGameMove', x: number, y: number, number: number, type: SudokuSudokuGameMoveType, timestamp: string }> } };

export type ListSudokuGamesQueryVariables = Exact<{
  input?: InputMaybe<ListSudokuGamesInput>;
}>;


export type ListSudokuGamesQuery = { __typename?: 'Query', listSudokuGames: { __typename?: 'ListSudokuGamesResult', nextToken?: string | null, items: Array<{ __typename?: 'SudokuGame', id: string, userId: string, difficulty: number, finishedAt?: string | null, createdAt: string, updatedAt: string, board: Array<Array<{ __typename?: 'SudokuGameCell', x: number, y: number, number?: number | null, isFixed: boolean, notes: Array<number>, isCorrect?: boolean | null }>>, moves: Array<{ __typename?: 'SudokuGameMove', x: number, y: number, number: number, type: SudokuSudokuGameMoveType, timestamp: string }> }> } };

export type CreateSudokuGameMutationVariables = Exact<{
  input: CreateSudokuGameInput;
}>;


export type CreateSudokuGameMutation = { __typename?: 'Mutation', createSudokuGame: { __typename?: 'SudokuGame', id: string, userId: string, difficulty: number, finishedAt?: string | null, createdAt: string, updatedAt: string, board: Array<Array<{ __typename?: 'SudokuGameCell', x: number, y: number, number?: number | null, isFixed: boolean, notes: Array<number>, isCorrect?: boolean | null }>>, moves: Array<{ __typename?: 'SudokuGameMove', x: number, y: number, number: number, type: SudokuSudokuGameMoveType, timestamp: string }> } };

export type MakeSudokuGameMoveMutationVariables = Exact<{
  input: MakeSudokuGameMoveInput;
}>;


export type MakeSudokuGameMoveMutation = { __typename?: 'Mutation', makeSudokuGameMove: { __typename?: 'SudokuGame', id: string, userId: string, difficulty: number, finishedAt?: string | null, createdAt: string, updatedAt: string, board: Array<Array<{ __typename?: 'SudokuGameCell', x: number, y: number, number?: number | null, isFixed: boolean, notes: Array<number>, isCorrect?: boolean | null }>>, moves: Array<{ __typename?: 'SudokuGameMove', x: number, y: number, number: number, type: SudokuSudokuGameMoveType, timestamp: string }> } };

export type DeleteSudokuGameMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteSudokuGameMutation = { __typename?: 'Mutation', deleteSudokuGame: boolean };

export type UserFragment = { __typename?: 'User', id: string, firstName: string, lastName: string, email: string, phoneNumber: string, currentSudokuGameId?: string | null, createdAt: string, updatedAt: string };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string, phoneNumber: string, currentSudokuGameId?: string | null, createdAt: string, updatedAt: string, currentSudokuGame?: { __typename?: 'SudokuGame', id: string, userId: string, difficulty: number, finishedAt?: string | null, createdAt: string, updatedAt: string, board: Array<Array<{ __typename?: 'SudokuGameCell', x: number, y: number, number?: number | null, isFixed: boolean, notes: Array<number>, isCorrect?: boolean | null }>>, moves: Array<{ __typename?: 'SudokuGameMove', x: number, y: number, number: number, type: SudokuSudokuGameMoveType, timestamp: string }> } | null } };

export type GetUserQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetUserQuery = { __typename?: 'Query', getUser: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string, phoneNumber: string, currentSudokuGameId?: string | null, createdAt: string, updatedAt: string } };

export type ListUsersQueryVariables = Exact<{
  input?: InputMaybe<ListUsersInput>;
}>;


export type ListUsersQuery = { __typename?: 'Query', listUsers: { __typename?: 'ListUsersResult', nextToken?: string | null, items: Array<{ __typename?: 'User', id: string, firstName: string, lastName: string, email: string, phoneNumber: string, currentSudokuGameId?: string | null, createdAt: string, updatedAt: string }> } };

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string, phoneNumber: string, currentSudokuGameId?: string | null, createdAt: string, updatedAt: string } };

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, firstName: string, lastName: string, email: string, phoneNumber: string, currentSudokuGameId?: string | null, createdAt: string, updatedAt: string } };

export type DeleteUserMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type DeleteUserMutation = { __typename?: 'Mutation', deleteUser: boolean };

export const SudokuGameCellFragmentDoc = gql`
    fragment SudokuGameCell on SudokuGameCell {
  x
  y
  number
  isFixed
  notes
  isCorrect
}
    `;
export const SudokuGameFragmentDoc = gql`
    fragment SudokuGame on SudokuGame {
  id
  userId
  board {
    ...SudokuGameCell
  }
  moves {
    x
    y
    number
    type
    timestamp
  }
  difficulty
  finishedAt
  createdAt
  updatedAt
}
    ${SudokuGameCellFragmentDoc}`;
export const UserFragmentDoc = gql`
    fragment User on User {
  id
  firstName
  lastName
  email
  phoneNumber
  currentSudokuGameId
  createdAt
  updatedAt
}
    `;
export const SignUpDocument = gql`
    mutation SignUp($input: SignUpInput!) {
  signUp(input: $input) {
    ...User
  }
}
    ${UserFragmentDoc}`;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const ConfirmSignUpDocument = gql`
    mutation ConfirmSignUp($input: ConfirmSignUpInput!) {
  confirmSignUp(input: $input)
}
    `;
export type ConfirmSignUpMutationFn = Apollo.MutationFunction<ConfirmSignUpMutation, ConfirmSignUpMutationVariables>;

/**
 * __useConfirmSignUpMutation__
 *
 * To run a mutation, you first call `useConfirmSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmSignUpMutation, { data, loading, error }] = useConfirmSignUpMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useConfirmSignUpMutation(baseOptions?: Apollo.MutationHookOptions<ConfirmSignUpMutation, ConfirmSignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ConfirmSignUpMutation, ConfirmSignUpMutationVariables>(ConfirmSignUpDocument, options);
      }
export type ConfirmSignUpMutationHookResult = ReturnType<typeof useConfirmSignUpMutation>;
export type ConfirmSignUpMutationResult = Apollo.MutationResult<ConfirmSignUpMutation>;
export type ConfirmSignUpMutationOptions = Apollo.BaseMutationOptions<ConfirmSignUpMutation, ConfirmSignUpMutationVariables>;
export const GetSudokuGameDocument = gql`
    query GetSudokuGame($id: ID!) {
  getSudokuGame(id: $id) {
    ...SudokuGame
  }
}
    ${SudokuGameFragmentDoc}`;

/**
 * __useGetSudokuGameQuery__
 *
 * To run a query within a React component, call `useGetSudokuGameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSudokuGameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSudokuGameQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetSudokuGameQuery(baseOptions: Apollo.QueryHookOptions<GetSudokuGameQuery, GetSudokuGameQueryVariables> & ({ variables: GetSudokuGameQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSudokuGameQuery, GetSudokuGameQueryVariables>(GetSudokuGameDocument, options);
      }
export function useGetSudokuGameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSudokuGameQuery, GetSudokuGameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSudokuGameQuery, GetSudokuGameQueryVariables>(GetSudokuGameDocument, options);
        }
export function useGetSudokuGameSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetSudokuGameQuery, GetSudokuGameQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetSudokuGameQuery, GetSudokuGameQueryVariables>(GetSudokuGameDocument, options);
        }
export type GetSudokuGameQueryHookResult = ReturnType<typeof useGetSudokuGameQuery>;
export type GetSudokuGameLazyQueryHookResult = ReturnType<typeof useGetSudokuGameLazyQuery>;
export type GetSudokuGameSuspenseQueryHookResult = ReturnType<typeof useGetSudokuGameSuspenseQuery>;
export type GetSudokuGameQueryResult = Apollo.QueryResult<GetSudokuGameQuery, GetSudokuGameQueryVariables>;
export const ListSudokuGamesDocument = gql`
    query ListSudokuGames($input: ListSudokuGamesInput) {
  listSudokuGames(input: $input) {
    items {
      ...SudokuGame
    }
    nextToken
  }
}
    ${SudokuGameFragmentDoc}`;

/**
 * __useListSudokuGamesQuery__
 *
 * To run a query within a React component, call `useListSudokuGamesQuery` and pass it any options that fit your needs.
 * When your component renders, `useListSudokuGamesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListSudokuGamesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useListSudokuGamesQuery(baseOptions?: Apollo.QueryHookOptions<ListSudokuGamesQuery, ListSudokuGamesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListSudokuGamesQuery, ListSudokuGamesQueryVariables>(ListSudokuGamesDocument, options);
      }
export function useListSudokuGamesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListSudokuGamesQuery, ListSudokuGamesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListSudokuGamesQuery, ListSudokuGamesQueryVariables>(ListSudokuGamesDocument, options);
        }
export function useListSudokuGamesSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListSudokuGamesQuery, ListSudokuGamesQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListSudokuGamesQuery, ListSudokuGamesQueryVariables>(ListSudokuGamesDocument, options);
        }
export type ListSudokuGamesQueryHookResult = ReturnType<typeof useListSudokuGamesQuery>;
export type ListSudokuGamesLazyQueryHookResult = ReturnType<typeof useListSudokuGamesLazyQuery>;
export type ListSudokuGamesSuspenseQueryHookResult = ReturnType<typeof useListSudokuGamesSuspenseQuery>;
export type ListSudokuGamesQueryResult = Apollo.QueryResult<ListSudokuGamesQuery, ListSudokuGamesQueryVariables>;
export const CreateSudokuGameDocument = gql`
    mutation CreateSudokuGame($input: CreateSudokuGameInput!) {
  createSudokuGame(input: $input) {
    ...SudokuGame
  }
}
    ${SudokuGameFragmentDoc}`;
export type CreateSudokuGameMutationFn = Apollo.MutationFunction<CreateSudokuGameMutation, CreateSudokuGameMutationVariables>;

/**
 * __useCreateSudokuGameMutation__
 *
 * To run a mutation, you first call `useCreateSudokuGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSudokuGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSudokuGameMutation, { data, loading, error }] = useCreateSudokuGameMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateSudokuGameMutation(baseOptions?: Apollo.MutationHookOptions<CreateSudokuGameMutation, CreateSudokuGameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSudokuGameMutation, CreateSudokuGameMutationVariables>(CreateSudokuGameDocument, options);
      }
export type CreateSudokuGameMutationHookResult = ReturnType<typeof useCreateSudokuGameMutation>;
export type CreateSudokuGameMutationResult = Apollo.MutationResult<CreateSudokuGameMutation>;
export type CreateSudokuGameMutationOptions = Apollo.BaseMutationOptions<CreateSudokuGameMutation, CreateSudokuGameMutationVariables>;
export const MakeSudokuGameMoveDocument = gql`
    mutation MakeSudokuGameMove($input: MakeSudokuGameMoveInput!) {
  makeSudokuGameMove(input: $input) {
    ...SudokuGame
  }
}
    ${SudokuGameFragmentDoc}`;
export type MakeSudokuGameMoveMutationFn = Apollo.MutationFunction<MakeSudokuGameMoveMutation, MakeSudokuGameMoveMutationVariables>;

/**
 * __useMakeSudokuGameMoveMutation__
 *
 * To run a mutation, you first call `useMakeSudokuGameMoveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMakeSudokuGameMoveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [makeSudokuGameMoveMutation, { data, loading, error }] = useMakeSudokuGameMoveMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMakeSudokuGameMoveMutation(baseOptions?: Apollo.MutationHookOptions<MakeSudokuGameMoveMutation, MakeSudokuGameMoveMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MakeSudokuGameMoveMutation, MakeSudokuGameMoveMutationVariables>(MakeSudokuGameMoveDocument, options);
      }
export type MakeSudokuGameMoveMutationHookResult = ReturnType<typeof useMakeSudokuGameMoveMutation>;
export type MakeSudokuGameMoveMutationResult = Apollo.MutationResult<MakeSudokuGameMoveMutation>;
export type MakeSudokuGameMoveMutationOptions = Apollo.BaseMutationOptions<MakeSudokuGameMoveMutation, MakeSudokuGameMoveMutationVariables>;
export const DeleteSudokuGameDocument = gql`
    mutation DeleteSudokuGame($id: ID!) {
  deleteSudokuGame(id: $id)
}
    `;
export type DeleteSudokuGameMutationFn = Apollo.MutationFunction<DeleteSudokuGameMutation, DeleteSudokuGameMutationVariables>;

/**
 * __useDeleteSudokuGameMutation__
 *
 * To run a mutation, you first call `useDeleteSudokuGameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSudokuGameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSudokuGameMutation, { data, loading, error }] = useDeleteSudokuGameMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteSudokuGameMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSudokuGameMutation, DeleteSudokuGameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteSudokuGameMutation, DeleteSudokuGameMutationVariables>(DeleteSudokuGameDocument, options);
      }
export type DeleteSudokuGameMutationHookResult = ReturnType<typeof useDeleteSudokuGameMutation>;
export type DeleteSudokuGameMutationResult = Apollo.MutationResult<DeleteSudokuGameMutation>;
export type DeleteSudokuGameMutationOptions = Apollo.BaseMutationOptions<DeleteSudokuGameMutation, DeleteSudokuGameMutationVariables>;
export const GetMeDocument = gql`
    query GetMe {
  me {
    ...User
    currentSudokuGame {
      ...SudokuGame
    }
  }
}
    ${UserFragmentDoc}
${SudokuGameFragmentDoc}`;

/**
 * __useGetMeQuery__
 *
 * To run a query within a React component, call `useGetMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeQuery(baseOptions?: Apollo.QueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
      }
export function useGetMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
        }
export function useGetMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
        }
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>;
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>;
export type GetMeSuspenseQueryHookResult = ReturnType<typeof useGetMeSuspenseQuery>;
export type GetMeQueryResult = Apollo.QueryResult<GetMeQuery, GetMeQueryVariables>;
export const GetUserDocument = gql`
    query GetUser($id: ID!) {
  getUser(id: $id) {
    ...User
  }
}
    ${UserFragmentDoc}`;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserQuery(baseOptions: Apollo.QueryHookOptions<GetUserQuery, GetUserQueryVariables> & ({ variables: GetUserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export function useGetUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserQuery, GetUserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserQuery, GetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserSuspenseQueryHookResult = ReturnType<typeof useGetUserSuspenseQuery>;
export type GetUserQueryResult = Apollo.QueryResult<GetUserQuery, GetUserQueryVariables>;
export const ListUsersDocument = gql`
    query ListUsers($input: ListUsersInput) {
  listUsers(input: $input) {
    items {
      ...User
    }
    nextToken
  }
}
    ${UserFragmentDoc}`;

/**
 * __useListUsersQuery__
 *
 * To run a query within a React component, call `useListUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useListUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListUsersQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useListUsersQuery(baseOptions?: Apollo.QueryHookOptions<ListUsersQuery, ListUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListUsersQuery, ListUsersQueryVariables>(ListUsersDocument, options);
      }
export function useListUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListUsersQuery, ListUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListUsersQuery, ListUsersQueryVariables>(ListUsersDocument, options);
        }
export function useListUsersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListUsersQuery, ListUsersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListUsersQuery, ListUsersQueryVariables>(ListUsersDocument, options);
        }
export type ListUsersQueryHookResult = ReturnType<typeof useListUsersQuery>;
export type ListUsersLazyQueryHookResult = ReturnType<typeof useListUsersLazyQuery>;
export type ListUsersSuspenseQueryHookResult = ReturnType<typeof useListUsersSuspenseQuery>;
export type ListUsersQueryResult = Apollo.QueryResult<ListUsersQuery, ListUsersQueryVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    ...User
  }
}
    ${UserFragmentDoc}`;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    ...User
  }
}
    ${UserFragmentDoc}`;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser($id: ID!) {
  deleteUser(id: $id)
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, options);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;