
/**
 * Client
**/

import * as runtime from '@prisma/client/runtime/index';
declare const prisma: unique symbol
export type PrismaPromise<A> = Promise<A> & {[prisma]: true}
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};


/**
 * Model users
 * 
 */
export type users = {
  id: string
  address: string | null
  name: string | null
  nonce: string | null
  status: UserStatus
  role: Role[]
  settings: Prisma.JsonValue | null
  created_at: Date
  updated_at: Date | null
  deleted_at: Date | null
}

/**
 * Model whitelists
 * 
 */
export type whitelists = {
  id: number
  address: string | null
  created_at: Date
  updated_at: Date | null
}

/**
 * Model favs
 * 
 */
export type favs = {
  id: string
  user_id: string
  created_at: Date
  updated_at: Date | null
  project_id: number
  project_type: number | null
}

/**
 * Model visit_histories
 * 
 */
export type visit_histories = {
  id: string
  user_id: string
  project_id: number
  project_type: number | null
  created_at: Date
  updated_at: Date | null
}

/**
 * Model alarms
 * 
 */
export type alarms = {
  id: string
  user_id: string
  alarm_at: Date
  desc: string
  created_at: Date
  updated_at: Date | null
  color: string | null
  url: string | null
}

/**
 * Model reports
 * The underlying table does not contain a valid unique identifier and can therefore currently not be handled by the Prisma Client.
 */
export type reports = {
  id: string
  user_id: string | null
  url: string | null
  project_type: string | null
  project_name: string | null
  created_at: Date
  updated_at: Date | null
  is_scam: boolean | null
}

/**
 * Model dapps
 * 
 */
export type dapps = {
  id: string
  title: string
  url: string
  logo: string | null
  desc: string | null
  created_at: Date
  updated_at: Date | null
  visit_count: number
  install_count: number
  visible: boolean
  is_good: boolean
  add_by_admin: boolean
}

/**
 * Model dapp_categories
 * 
 */
export type dapp_categories = {
  id: string
  title: string
  desc: string | null
  sort: number
  is_deleted: boolean
}

/**
 * Model dapp_categories_relations
 * 
 */
export type dapp_categories_relations = {
  id: number
  website_category_id: string
  subcategory_id: string | null
  dapp_id: string
  created_at: Date
  updated_at: Date | null
}

/**
 * Model user_dapps
 * 
 */
export type user_dapps = {
  id: string
  user_id: string
  dapp_id: string
  created_at: Date
  updated_at: Date | null
  user_dapps_catogories_id: string | null
}

/**
 * Model user_dapps_catogories
 * 
 */
export type user_dapps_catogories = {
  id: string
  title: string
  desc: string | null
  sort: number
  created_at: Date
  updated_at: Date | null
  user_id: string
}

/**
 * Model stories
 * 
 */
export type stories = {
  id: string
  title: string
  cover: string | null
  desc: string | null
  url: string | null
  created_at: Date
  updated_at: Date | null
  visible: boolean
  sort: number
  is_deleted: boolean
  visit_count: number
}

/**
 * Model story_categories
 * 
 */
export type story_categories = {
  id: string
  title: string
  desc: string | null
  sort: number
  is_deleted: boolean
  created_at: Date
  updated_at: Date | null
}

/**
 * Model story_categories_relations
 * 
 */
export type story_categories_relations = {
  id: number
  story_category_id: string
  story_id: string
  created_at: Date
  updated_at: Date | null
}

/**
 * Model story_dapps_relations
 * 
 */
export type story_dapps_relations = {
  id: number
  story_id: string
  dapp_id: string
  created_at: Date
  updated_at: Date | null
}

/**
 * Model tokens
 * 
 */
export type tokens = {
  id: string
  name: string
  symbol: string
  slug: string
  cmcRank: number | null
  marketPairCount: number | null
  circulatingSupply: number | null
  selfReportedCirculatingSupply: number | null
  totalSupply: number | null
  maxSupply: number | null
  ath: number | null
  atl: number | null
  high24h: number | null
  low24h: number | null
  isActive: number | null
  lastUpdated: Date | null
  dateAdded: Date | null
  created_at: Date
  updated_at: Date | null
  isAudited: boolean
}


/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export const UserStatus: {
  VALID: 'VALID',
  INVALID: 'INVALID'
};

export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus]


export const Role: {
  USER: 'USER',
  ADMIN: 'ADMIN'
};

export type Role = (typeof Role)[keyof typeof Role]


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.users.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
      /**
       * @private
       */
      private fetcher;
      /**
       * @private
       */
      private readonly dmmf;
      /**
       * @private
       */
      private connectionPromise?;
      /**
       * @private
       */
      private disconnectionPromise?;
      /**
       * @private
       */
      private readonly engineConfig;
      /**
       * @private
       */
      private readonly measurePerformance;

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.users.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends PrismaPromise<any>[]>(arg: [...P]): Promise<UnwrapTuple<P>>;

      /**
   * `prisma.users`: Exposes CRUD operations for the **users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.users.findMany()
    * ```
    */
  get users(): Prisma.usersDelegate<GlobalReject>;

  /**
   * `prisma.whitelists`: Exposes CRUD operations for the **whitelists** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Whitelists
    * const whitelists = await prisma.whitelists.findMany()
    * ```
    */
  get whitelists(): Prisma.whitelistsDelegate<GlobalReject>;

  /**
   * `prisma.favs`: Exposes CRUD operations for the **favs** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Favs
    * const favs = await prisma.favs.findMany()
    * ```
    */
  get favs(): Prisma.favsDelegate<GlobalReject>;

  /**
   * `prisma.visit_histories`: Exposes CRUD operations for the **visit_histories** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Visit_histories
    * const visit_histories = await prisma.visit_histories.findMany()
    * ```
    */
  get visit_histories(): Prisma.visit_historiesDelegate<GlobalReject>;

  /**
   * `prisma.alarms`: Exposes CRUD operations for the **alarms** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Alarms
    * const alarms = await prisma.alarms.findMany()
    * ```
    */
  get alarms(): Prisma.alarmsDelegate<GlobalReject>;

  /**
   * `prisma.reports`: Exposes CRUD operations for the **reports** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reports
    * const reports = await prisma.reports.findMany()
    * ```
    */
  get reports(): Prisma.reportsDelegate<GlobalReject>;

  /**
   * `prisma.dapps`: Exposes CRUD operations for the **dapps** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Dapps
    * const dapps = await prisma.dapps.findMany()
    * ```
    */
  get dapps(): Prisma.dappsDelegate<GlobalReject>;

  /**
   * `prisma.dapp_categories`: Exposes CRUD operations for the **dapp_categories** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Dapp_categories
    * const dapp_categories = await prisma.dapp_categories.findMany()
    * ```
    */
  get dapp_categories(): Prisma.dapp_categoriesDelegate<GlobalReject>;

  /**
   * `prisma.dapp_categories_relations`: Exposes CRUD operations for the **dapp_categories_relations** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Dapp_categories_relations
    * const dapp_categories_relations = await prisma.dapp_categories_relations.findMany()
    * ```
    */
  get dapp_categories_relations(): Prisma.dapp_categories_relationsDelegate<GlobalReject>;

  /**
   * `prisma.user_dapps`: Exposes CRUD operations for the **user_dapps** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more User_dapps
    * const user_dapps = await prisma.user_dapps.findMany()
    * ```
    */
  get user_dapps(): Prisma.user_dappsDelegate<GlobalReject>;

  /**
   * `prisma.user_dapps_catogories`: Exposes CRUD operations for the **user_dapps_catogories** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more User_dapps_catogories
    * const user_dapps_catogories = await prisma.user_dapps_catogories.findMany()
    * ```
    */
  get user_dapps_catogories(): Prisma.user_dapps_catogoriesDelegate<GlobalReject>;

  /**
   * `prisma.stories`: Exposes CRUD operations for the **stories** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Stories
    * const stories = await prisma.stories.findMany()
    * ```
    */
  get stories(): Prisma.storiesDelegate<GlobalReject>;

  /**
   * `prisma.story_categories`: Exposes CRUD operations for the **story_categories** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Story_categories
    * const story_categories = await prisma.story_categories.findMany()
    * ```
    */
  get story_categories(): Prisma.story_categoriesDelegate<GlobalReject>;

  /**
   * `prisma.story_categories_relations`: Exposes CRUD operations for the **story_categories_relations** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Story_categories_relations
    * const story_categories_relations = await prisma.story_categories_relations.findMany()
    * ```
    */
  get story_categories_relations(): Prisma.story_categories_relationsDelegate<GlobalReject>;

  /**
   * `prisma.story_dapps_relations`: Exposes CRUD operations for the **story_dapps_relations** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Story_dapps_relations
    * const story_dapps_relations = await prisma.story_dapps_relations.findMany()
    * ```
    */
  get story_dapps_relations(): Prisma.story_dapps_relationsDelegate<GlobalReject>;

  /**
   * `prisma.tokens`: Exposes CRUD operations for the **tokens** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tokens
    * const tokens = await prisma.tokens.findMany()
    * ```
    */
  get tokens(): Prisma.tokensDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Prisma Client JS version: 3.15.2
   * Query Engine version: 461d6a05159055555eb7dfb337c9fb271cbd4d7e
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: 'DbNull'

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: 'JsonNull'

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: 'AnyNull'

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = {
    [key in keyof T]: T[key] extends false | undefined | null ? never : key
  }[keyof T]

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Buffer
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Exact<A, W = unknown> = 
  W extends unknown ? A extends Narrowable ? Cast<A, W> : Cast<
  {[K in keyof A]: K extends keyof W ? Exact<A[K], W[K]> : never},
  {[K in keyof W]: K extends keyof A ? Exact<A[K], W[K]> : W[K]}>
  : never;

  type Narrowable = string | number | boolean | bigint;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: Exact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  export const ModelName: {
    users: 'users',
    whitelists: 'whitelists',
    favs: 'favs',
    visit_histories: 'visit_histories',
    alarms: 'alarms',
    reports: 'reports',
    dapps: 'dapps',
    dapp_categories: 'dapp_categories',
    dapp_categories_relations: 'dapp_categories_relations',
    user_dapps: 'user_dapps',
    user_dapps_catogories: 'user_dapps_catogories',
    stories: 'stories',
    story_categories: 'story_categories',
    story_categories_relations: 'story_categories_relations',
    story_dapps_relations: 'story_dapps_relations',
    tokens: 'tokens'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     *  * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your prisma.schema file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  export type Hooks = {
    beforeRequest?: (options: { query: string, path: string[], rootField?: string, typeName?: string, document: any }) => any
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed in to the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UsersCountOutputType
   */


  export type UsersCountOutputType = {
    user_dapps: number
    user_dapps_catogories: number
  }

  export type UsersCountOutputTypeSelect = {
    user_dapps?: boolean
    user_dapps_catogories?: boolean
  }

  export type UsersCountOutputTypeGetPayload<
    S extends boolean | null | undefined | UsersCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? UsersCountOutputType
    : S extends undefined
    ? never
    : S extends UsersCountOutputTypeArgs
    ?'include' extends U
    ? UsersCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof UsersCountOutputType ? UsersCountOutputType[P] : never
  } 
    : UsersCountOutputType
  : UsersCountOutputType




  // Custom InputTypes

  /**
   * UsersCountOutputType without action
   */
  export type UsersCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the UsersCountOutputType
     * 
    **/
    select?: UsersCountOutputTypeSelect | null
  }



  /**
   * Count Type DappsCountOutputType
   */


  export type DappsCountOutputType = {
    dapp_categories_relations: number
    story_dapps_relations: number
    user_dapps: number
  }

  export type DappsCountOutputTypeSelect = {
    dapp_categories_relations?: boolean
    story_dapps_relations?: boolean
    user_dapps?: boolean
  }

  export type DappsCountOutputTypeGetPayload<
    S extends boolean | null | undefined | DappsCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? DappsCountOutputType
    : S extends undefined
    ? never
    : S extends DappsCountOutputTypeArgs
    ?'include' extends U
    ? DappsCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof DappsCountOutputType ? DappsCountOutputType[P] : never
  } 
    : DappsCountOutputType
  : DappsCountOutputType




  // Custom InputTypes

  /**
   * DappsCountOutputType without action
   */
  export type DappsCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the DappsCountOutputType
     * 
    **/
    select?: DappsCountOutputTypeSelect | null
  }



  /**
   * Count Type Dapp_categoriesCountOutputType
   */


  export type Dapp_categoriesCountOutputType = {
    dapp_categories_relations: number
  }

  export type Dapp_categoriesCountOutputTypeSelect = {
    dapp_categories_relations?: boolean
  }

  export type Dapp_categoriesCountOutputTypeGetPayload<
    S extends boolean | null | undefined | Dapp_categoriesCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? Dapp_categoriesCountOutputType
    : S extends undefined
    ? never
    : S extends Dapp_categoriesCountOutputTypeArgs
    ?'include' extends U
    ? Dapp_categoriesCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof Dapp_categoriesCountOutputType ? Dapp_categoriesCountOutputType[P] : never
  } 
    : Dapp_categoriesCountOutputType
  : Dapp_categoriesCountOutputType




  // Custom InputTypes

  /**
   * Dapp_categoriesCountOutputType without action
   */
  export type Dapp_categoriesCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the Dapp_categoriesCountOutputType
     * 
    **/
    select?: Dapp_categoriesCountOutputTypeSelect | null
  }



  /**
   * Count Type User_dapps_catogoriesCountOutputType
   */


  export type User_dapps_catogoriesCountOutputType = {
    user_dapps: number
  }

  export type User_dapps_catogoriesCountOutputTypeSelect = {
    user_dapps?: boolean
  }

  export type User_dapps_catogoriesCountOutputTypeGetPayload<
    S extends boolean | null | undefined | User_dapps_catogoriesCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? User_dapps_catogoriesCountOutputType
    : S extends undefined
    ? never
    : S extends User_dapps_catogoriesCountOutputTypeArgs
    ?'include' extends U
    ? User_dapps_catogoriesCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof User_dapps_catogoriesCountOutputType ? User_dapps_catogoriesCountOutputType[P] : never
  } 
    : User_dapps_catogoriesCountOutputType
  : User_dapps_catogoriesCountOutputType




  // Custom InputTypes

  /**
   * User_dapps_catogoriesCountOutputType without action
   */
  export type User_dapps_catogoriesCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the User_dapps_catogoriesCountOutputType
     * 
    **/
    select?: User_dapps_catogoriesCountOutputTypeSelect | null
  }



  /**
   * Count Type StoriesCountOutputType
   */


  export type StoriesCountOutputType = {
    story_categories_relations: number
    story_dapps_relations: number
  }

  export type StoriesCountOutputTypeSelect = {
    story_categories_relations?: boolean
    story_dapps_relations?: boolean
  }

  export type StoriesCountOutputTypeGetPayload<
    S extends boolean | null | undefined | StoriesCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? StoriesCountOutputType
    : S extends undefined
    ? never
    : S extends StoriesCountOutputTypeArgs
    ?'include' extends U
    ? StoriesCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof StoriesCountOutputType ? StoriesCountOutputType[P] : never
  } 
    : StoriesCountOutputType
  : StoriesCountOutputType




  // Custom InputTypes

  /**
   * StoriesCountOutputType without action
   */
  export type StoriesCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the StoriesCountOutputType
     * 
    **/
    select?: StoriesCountOutputTypeSelect | null
  }



  /**
   * Count Type Story_categoriesCountOutputType
   */


  export type Story_categoriesCountOutputType = {
    story_categories_relations: number
  }

  export type Story_categoriesCountOutputTypeSelect = {
    story_categories_relations?: boolean
  }

  export type Story_categoriesCountOutputTypeGetPayload<
    S extends boolean | null | undefined | Story_categoriesCountOutputTypeArgs,
    U = keyof S
      > = S extends true
        ? Story_categoriesCountOutputType
    : S extends undefined
    ? never
    : S extends Story_categoriesCountOutputTypeArgs
    ?'include' extends U
    ? Story_categoriesCountOutputType 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof Story_categoriesCountOutputType ? Story_categoriesCountOutputType[P] : never
  } 
    : Story_categoriesCountOutputType
  : Story_categoriesCountOutputType




  // Custom InputTypes

  /**
   * Story_categoriesCountOutputType without action
   */
  export type Story_categoriesCountOutputTypeArgs = {
    /**
     * Select specific fields to fetch from the Story_categoriesCountOutputType
     * 
    **/
    select?: Story_categoriesCountOutputTypeSelect | null
  }



  /**
   * Models
   */

  /**
   * Model users
   */


  export type AggregateUsers = {
    _count: UsersCountAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  export type UsersMinAggregateOutputType = {
    id: string | null
    address: string | null
    name: string | null
    nonce: string | null
    status: UserStatus | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
  }

  export type UsersMaxAggregateOutputType = {
    id: string | null
    address: string | null
    name: string | null
    nonce: string | null
    status: UserStatus | null
    created_at: Date | null
    updated_at: Date | null
    deleted_at: Date | null
  }

  export type UsersCountAggregateOutputType = {
    id: number
    address: number
    name: number
    nonce: number
    status: number
    role: number
    settings: number
    created_at: number
    updated_at: number
    deleted_at: number
    _all: number
  }


  export type UsersMinAggregateInputType = {
    id?: true
    address?: true
    name?: true
    nonce?: true
    status?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
  }

  export type UsersMaxAggregateInputType = {
    id?: true
    address?: true
    name?: true
    nonce?: true
    status?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
  }

  export type UsersCountAggregateInputType = {
    id?: true
    address?: true
    name?: true
    nonce?: true
    status?: true
    role?: true
    settings?: true
    created_at?: true
    updated_at?: true
    deleted_at?: true
    _all?: true
  }

  export type UsersAggregateArgs = {
    /**
     * Filter which users to aggregate.
     * 
    **/
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     * 
    **/
    orderBy?: Enumerable<usersOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UsersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsersMaxAggregateInputType
  }

  export type GetUsersAggregateType<T extends UsersAggregateArgs> = {
        [P in keyof T & keyof AggregateUsers]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsers[P]>
      : GetScalarType<T[P], AggregateUsers[P]>
  }




  export type UsersGroupByArgs = {
    where?: usersWhereInput
    orderBy?: Enumerable<usersOrderByWithAggregationInput>
    by: Array<UsersScalarFieldEnum>
    having?: usersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsersCountAggregateInputType | true
    _min?: UsersMinAggregateInputType
    _max?: UsersMaxAggregateInputType
  }


  export type UsersGroupByOutputType = {
    id: string
    address: string | null
    name: string | null
    nonce: string | null
    status: UserStatus
    role: Role[]
    settings: JsonValue | null
    created_at: Date
    updated_at: Date | null
    deleted_at: Date | null
    _count: UsersCountAggregateOutputType | null
    _min: UsersMinAggregateOutputType | null
    _max: UsersMaxAggregateOutputType | null
  }

  type GetUsersGroupByPayload<T extends UsersGroupByArgs> = PrismaPromise<
    Array<
      PickArray<UsersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsersGroupByOutputType[P]>
            : GetScalarType<T[P], UsersGroupByOutputType[P]>
        }
      >
    >


  export type usersSelect = {
    id?: boolean
    address?: boolean
    name?: boolean
    nonce?: boolean
    status?: boolean
    role?: boolean
    settings?: boolean
    created_at?: boolean
    updated_at?: boolean
    deleted_at?: boolean
    user_dapps?: boolean | user_dappsFindManyArgs
    user_dapps_catogories?: boolean | user_dapps_catogoriesFindManyArgs
    _count?: boolean | UsersCountOutputTypeArgs
  }

  export type usersInclude = {
    user_dapps?: boolean | user_dappsFindManyArgs
    user_dapps_catogories?: boolean | user_dapps_catogoriesFindManyArgs
    _count?: boolean | UsersCountOutputTypeArgs
  }

  export type usersGetPayload<
    S extends boolean | null | undefined | usersArgs,
    U = keyof S
      > = S extends true
        ? users
    : S extends undefined
    ? never
    : S extends usersArgs | usersFindManyArgs
    ?'include' extends U
    ? users  & {
    [P in TrueKeys<S['include']>]:
        P extends 'user_dapps' ? Array < user_dappsGetPayload<S['include'][P]>>  :
        P extends 'user_dapps_catogories' ? Array < user_dapps_catogoriesGetPayload<S['include'][P]>>  :
        P extends '_count' ? UsersCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'user_dapps' ? Array < user_dappsGetPayload<S['select'][P]>>  :
        P extends 'user_dapps_catogories' ? Array < user_dapps_catogoriesGetPayload<S['select'][P]>>  :
        P extends '_count' ? UsersCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof users ? users[P] : never
  } 
    : users
  : users


  type usersCountArgs = Merge<
    Omit<usersFindManyArgs, 'select' | 'include'> & {
      select?: UsersCountAggregateInputType | true
    }
  >

  export interface usersDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Users that matches the filter.
     * @param {usersFindUniqueArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends usersFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, usersFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'users'> extends True ? CheckSelect<T, Prisma__usersClient<users>, Prisma__usersClient<usersGetPayload<T>>> : CheckSelect<T, Prisma__usersClient<users | null >, Prisma__usersClient<usersGetPayload<T> | null >>

    /**
     * Find the first Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindFirstArgs} args - Arguments to find a Users
     * @example
     * // Get one Users
     * const users = await prisma.users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends usersFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, usersFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'users'> extends True ? CheckSelect<T, Prisma__usersClient<users>, Prisma__usersClient<usersGetPayload<T>>> : CheckSelect<T, Prisma__usersClient<users | null >, Prisma__usersClient<usersGetPayload<T> | null >>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.users.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.users.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usersWithIdOnly = await prisma.users.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends usersFindManyArgs>(
      args?: SelectSubset<T, usersFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<users>>, PrismaPromise<Array<usersGetPayload<T>>>>

    /**
     * Create a Users.
     * @param {usersCreateArgs} args - Arguments to create a Users.
     * @example
     * // Create one Users
     * const Users = await prisma.users.create({
     *   data: {
     *     // ... data to create a Users
     *   }
     * })
     * 
    **/
    create<T extends usersCreateArgs>(
      args: SelectSubset<T, usersCreateArgs>
    ): CheckSelect<T, Prisma__usersClient<users>, Prisma__usersClient<usersGetPayload<T>>>

    /**
     * Create many Users.
     *     @param {usersCreateManyArgs} args - Arguments to create many Users.
     *     @example
     *     // Create many Users
     *     const users = await prisma.users.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends usersCreateManyArgs>(
      args?: SelectSubset<T, usersCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Users.
     * @param {usersDeleteArgs} args - Arguments to delete one Users.
     * @example
     * // Delete one Users
     * const Users = await prisma.users.delete({
     *   where: {
     *     // ... filter to delete one Users
     *   }
     * })
     * 
    **/
    delete<T extends usersDeleteArgs>(
      args: SelectSubset<T, usersDeleteArgs>
    ): CheckSelect<T, Prisma__usersClient<users>, Prisma__usersClient<usersGetPayload<T>>>

    /**
     * Update one Users.
     * @param {usersUpdateArgs} args - Arguments to update one Users.
     * @example
     * // Update one Users
     * const users = await prisma.users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends usersUpdateArgs>(
      args: SelectSubset<T, usersUpdateArgs>
    ): CheckSelect<T, Prisma__usersClient<users>, Prisma__usersClient<usersGetPayload<T>>>

    /**
     * Delete zero or more Users.
     * @param {usersDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends usersDeleteManyArgs>(
      args?: SelectSubset<T, usersDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const users = await prisma.users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends usersUpdateManyArgs>(
      args: SelectSubset<T, usersUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Users.
     * @param {usersUpsertArgs} args - Arguments to update or create a Users.
     * @example
     * // Update or create a Users
     * const users = await prisma.users.upsert({
     *   create: {
     *     // ... data to create a Users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Users we want to update
     *   }
     * })
    **/
    upsert<T extends usersUpsertArgs>(
      args: SelectSubset<T, usersUpsertArgs>
    ): CheckSelect<T, Prisma__usersClient<users>, Prisma__usersClient<usersGetPayload<T>>>

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {usersCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.users.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends usersCountArgs>(
      args?: Subset<T, usersCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsersAggregateArgs>(args: Subset<T, UsersAggregateArgs>): PrismaPromise<GetUsersAggregateType<T>>

    /**
     * Group by Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UsersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsersGroupByArgs['orderBy'] }
        : { orderBy?: UsersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UsersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsersGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__usersClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    user_dapps<T extends user_dappsFindManyArgs = {}>(args?: Subset<T, user_dappsFindManyArgs>): CheckSelect<T, PrismaPromise<Array<user_dapps>>, PrismaPromise<Array<user_dappsGetPayload<T>>>>;

    user_dapps_catogories<T extends user_dapps_catogoriesFindManyArgs = {}>(args?: Subset<T, user_dapps_catogoriesFindManyArgs>): CheckSelect<T, PrismaPromise<Array<user_dapps_catogories>>, PrismaPromise<Array<user_dapps_catogoriesGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * users findUnique
   */
  export type usersFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the users
     * 
    **/
    select?: usersSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: usersInclude | null
    /**
     * Throw an Error if a users can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which users to fetch.
     * 
    **/
    where: usersWhereUniqueInput
  }


  /**
   * users findFirst
   */
  export type usersFindFirstArgs = {
    /**
     * Select specific fields to fetch from the users
     * 
    **/
    select?: usersSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: usersInclude | null
    /**
     * Throw an Error if a users can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which users to fetch.
     * 
    **/
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     * 
    **/
    orderBy?: Enumerable<usersOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     * 
    **/
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     * 
    **/
    distinct?: Enumerable<UsersScalarFieldEnum>
  }


  /**
   * users findMany
   */
  export type usersFindManyArgs = {
    /**
     * Select specific fields to fetch from the users
     * 
    **/
    select?: usersSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: usersInclude | null
    /**
     * Filter, which users to fetch.
     * 
    **/
    where?: usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     * 
    **/
    orderBy?: Enumerable<usersOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     * 
    **/
    cursor?: usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     * 
    **/
    skip?: number
    distinct?: Enumerable<UsersScalarFieldEnum>
  }


  /**
   * users create
   */
  export type usersCreateArgs = {
    /**
     * Select specific fields to fetch from the users
     * 
    **/
    select?: usersSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: usersInclude | null
    /**
     * The data needed to create a users.
     * 
    **/
    data: XOR<usersCreateInput, usersUncheckedCreateInput>
  }


  /**
   * users createMany
   */
  export type usersCreateManyArgs = {
    /**
     * The data used to create many users.
     * 
    **/
    data: Enumerable<usersCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * users update
   */
  export type usersUpdateArgs = {
    /**
     * Select specific fields to fetch from the users
     * 
    **/
    select?: usersSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: usersInclude | null
    /**
     * The data needed to update a users.
     * 
    **/
    data: XOR<usersUpdateInput, usersUncheckedUpdateInput>
    /**
     * Choose, which users to update.
     * 
    **/
    where: usersWhereUniqueInput
  }


  /**
   * users updateMany
   */
  export type usersUpdateManyArgs = {
    /**
     * The data used to update users.
     * 
    **/
    data: XOR<usersUpdateManyMutationInput, usersUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     * 
    **/
    where?: usersWhereInput
  }


  /**
   * users upsert
   */
  export type usersUpsertArgs = {
    /**
     * Select specific fields to fetch from the users
     * 
    **/
    select?: usersSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: usersInclude | null
    /**
     * The filter to search for the users to update in case it exists.
     * 
    **/
    where: usersWhereUniqueInput
    /**
     * In case the users found by the `where` argument doesn't exist, create a new users with this data.
     * 
    **/
    create: XOR<usersCreateInput, usersUncheckedCreateInput>
    /**
     * In case the users was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<usersUpdateInput, usersUncheckedUpdateInput>
  }


  /**
   * users delete
   */
  export type usersDeleteArgs = {
    /**
     * Select specific fields to fetch from the users
     * 
    **/
    select?: usersSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: usersInclude | null
    /**
     * Filter which users to delete.
     * 
    **/
    where: usersWhereUniqueInput
  }


  /**
   * users deleteMany
   */
  export type usersDeleteManyArgs = {
    /**
     * Filter which users to delete
     * 
    **/
    where?: usersWhereInput
  }


  /**
   * users without action
   */
  export type usersArgs = {
    /**
     * Select specific fields to fetch from the users
     * 
    **/
    select?: usersSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: usersInclude | null
  }



  /**
   * Model whitelists
   */


  export type AggregateWhitelists = {
    _count: WhitelistsCountAggregateOutputType | null
    _avg: WhitelistsAvgAggregateOutputType | null
    _sum: WhitelistsSumAggregateOutputType | null
    _min: WhitelistsMinAggregateOutputType | null
    _max: WhitelistsMaxAggregateOutputType | null
  }

  export type WhitelistsAvgAggregateOutputType = {
    id: number | null
  }

  export type WhitelistsSumAggregateOutputType = {
    id: number | null
  }

  export type WhitelistsMinAggregateOutputType = {
    id: number | null
    address: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type WhitelistsMaxAggregateOutputType = {
    id: number | null
    address: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type WhitelistsCountAggregateOutputType = {
    id: number
    address: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type WhitelistsAvgAggregateInputType = {
    id?: true
  }

  export type WhitelistsSumAggregateInputType = {
    id?: true
  }

  export type WhitelistsMinAggregateInputType = {
    id?: true
    address?: true
    created_at?: true
    updated_at?: true
  }

  export type WhitelistsMaxAggregateInputType = {
    id?: true
    address?: true
    created_at?: true
    updated_at?: true
  }

  export type WhitelistsCountAggregateInputType = {
    id?: true
    address?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type WhitelistsAggregateArgs = {
    /**
     * Filter which whitelists to aggregate.
     * 
    **/
    where?: whitelistsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of whitelists to fetch.
     * 
    **/
    orderBy?: Enumerable<whitelistsOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: whitelistsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` whitelists from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` whitelists.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned whitelists
    **/
    _count?: true | WhitelistsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WhitelistsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WhitelistsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WhitelistsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WhitelistsMaxAggregateInputType
  }

  export type GetWhitelistsAggregateType<T extends WhitelistsAggregateArgs> = {
        [P in keyof T & keyof AggregateWhitelists]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWhitelists[P]>
      : GetScalarType<T[P], AggregateWhitelists[P]>
  }




  export type WhitelistsGroupByArgs = {
    where?: whitelistsWhereInput
    orderBy?: Enumerable<whitelistsOrderByWithAggregationInput>
    by: Array<WhitelistsScalarFieldEnum>
    having?: whitelistsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WhitelistsCountAggregateInputType | true
    _avg?: WhitelistsAvgAggregateInputType
    _sum?: WhitelistsSumAggregateInputType
    _min?: WhitelistsMinAggregateInputType
    _max?: WhitelistsMaxAggregateInputType
  }


  export type WhitelistsGroupByOutputType = {
    id: number
    address: string | null
    created_at: Date
    updated_at: Date | null
    _count: WhitelistsCountAggregateOutputType | null
    _avg: WhitelistsAvgAggregateOutputType | null
    _sum: WhitelistsSumAggregateOutputType | null
    _min: WhitelistsMinAggregateOutputType | null
    _max: WhitelistsMaxAggregateOutputType | null
  }

  type GetWhitelistsGroupByPayload<T extends WhitelistsGroupByArgs> = PrismaPromise<
    Array<
      PickArray<WhitelistsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WhitelistsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WhitelistsGroupByOutputType[P]>
            : GetScalarType<T[P], WhitelistsGroupByOutputType[P]>
        }
      >
    >


  export type whitelistsSelect = {
    id?: boolean
    address?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type whitelistsGetPayload<
    S extends boolean | null | undefined | whitelistsArgs,
    U = keyof S
      > = S extends true
        ? whitelists
    : S extends undefined
    ? never
    : S extends whitelistsArgs | whitelistsFindManyArgs
    ?'include' extends U
    ? whitelists 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof whitelists ? whitelists[P] : never
  } 
    : whitelists
  : whitelists


  type whitelistsCountArgs = Merge<
    Omit<whitelistsFindManyArgs, 'select' | 'include'> & {
      select?: WhitelistsCountAggregateInputType | true
    }
  >

  export interface whitelistsDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Whitelists that matches the filter.
     * @param {whitelistsFindUniqueArgs} args - Arguments to find a Whitelists
     * @example
     * // Get one Whitelists
     * const whitelists = await prisma.whitelists.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends whitelistsFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, whitelistsFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'whitelists'> extends True ? CheckSelect<T, Prisma__whitelistsClient<whitelists>, Prisma__whitelistsClient<whitelistsGetPayload<T>>> : CheckSelect<T, Prisma__whitelistsClient<whitelists | null >, Prisma__whitelistsClient<whitelistsGetPayload<T> | null >>

    /**
     * Find the first Whitelists that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {whitelistsFindFirstArgs} args - Arguments to find a Whitelists
     * @example
     * // Get one Whitelists
     * const whitelists = await prisma.whitelists.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends whitelistsFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, whitelistsFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'whitelists'> extends True ? CheckSelect<T, Prisma__whitelistsClient<whitelists>, Prisma__whitelistsClient<whitelistsGetPayload<T>>> : CheckSelect<T, Prisma__whitelistsClient<whitelists | null >, Prisma__whitelistsClient<whitelistsGetPayload<T> | null >>

    /**
     * Find zero or more Whitelists that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {whitelistsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Whitelists
     * const whitelists = await prisma.whitelists.findMany()
     * 
     * // Get first 10 Whitelists
     * const whitelists = await prisma.whitelists.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const whitelistsWithIdOnly = await prisma.whitelists.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends whitelistsFindManyArgs>(
      args?: SelectSubset<T, whitelistsFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<whitelists>>, PrismaPromise<Array<whitelistsGetPayload<T>>>>

    /**
     * Create a Whitelists.
     * @param {whitelistsCreateArgs} args - Arguments to create a Whitelists.
     * @example
     * // Create one Whitelists
     * const Whitelists = await prisma.whitelists.create({
     *   data: {
     *     // ... data to create a Whitelists
     *   }
     * })
     * 
    **/
    create<T extends whitelistsCreateArgs>(
      args: SelectSubset<T, whitelistsCreateArgs>
    ): CheckSelect<T, Prisma__whitelistsClient<whitelists>, Prisma__whitelistsClient<whitelistsGetPayload<T>>>

    /**
     * Create many Whitelists.
     *     @param {whitelistsCreateManyArgs} args - Arguments to create many Whitelists.
     *     @example
     *     // Create many Whitelists
     *     const whitelists = await prisma.whitelists.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends whitelistsCreateManyArgs>(
      args?: SelectSubset<T, whitelistsCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Whitelists.
     * @param {whitelistsDeleteArgs} args - Arguments to delete one Whitelists.
     * @example
     * // Delete one Whitelists
     * const Whitelists = await prisma.whitelists.delete({
     *   where: {
     *     // ... filter to delete one Whitelists
     *   }
     * })
     * 
    **/
    delete<T extends whitelistsDeleteArgs>(
      args: SelectSubset<T, whitelistsDeleteArgs>
    ): CheckSelect<T, Prisma__whitelistsClient<whitelists>, Prisma__whitelistsClient<whitelistsGetPayload<T>>>

    /**
     * Update one Whitelists.
     * @param {whitelistsUpdateArgs} args - Arguments to update one Whitelists.
     * @example
     * // Update one Whitelists
     * const whitelists = await prisma.whitelists.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends whitelistsUpdateArgs>(
      args: SelectSubset<T, whitelistsUpdateArgs>
    ): CheckSelect<T, Prisma__whitelistsClient<whitelists>, Prisma__whitelistsClient<whitelistsGetPayload<T>>>

    /**
     * Delete zero or more Whitelists.
     * @param {whitelistsDeleteManyArgs} args - Arguments to filter Whitelists to delete.
     * @example
     * // Delete a few Whitelists
     * const { count } = await prisma.whitelists.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends whitelistsDeleteManyArgs>(
      args?: SelectSubset<T, whitelistsDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Whitelists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {whitelistsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Whitelists
     * const whitelists = await prisma.whitelists.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends whitelistsUpdateManyArgs>(
      args: SelectSubset<T, whitelistsUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Whitelists.
     * @param {whitelistsUpsertArgs} args - Arguments to update or create a Whitelists.
     * @example
     * // Update or create a Whitelists
     * const whitelists = await prisma.whitelists.upsert({
     *   create: {
     *     // ... data to create a Whitelists
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Whitelists we want to update
     *   }
     * })
    **/
    upsert<T extends whitelistsUpsertArgs>(
      args: SelectSubset<T, whitelistsUpsertArgs>
    ): CheckSelect<T, Prisma__whitelistsClient<whitelists>, Prisma__whitelistsClient<whitelistsGetPayload<T>>>

    /**
     * Count the number of Whitelists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {whitelistsCountArgs} args - Arguments to filter Whitelists to count.
     * @example
     * // Count the number of Whitelists
     * const count = await prisma.whitelists.count({
     *   where: {
     *     // ... the filter for the Whitelists we want to count
     *   }
     * })
    **/
    count<T extends whitelistsCountArgs>(
      args?: Subset<T, whitelistsCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WhitelistsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Whitelists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WhitelistsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WhitelistsAggregateArgs>(args: Subset<T, WhitelistsAggregateArgs>): PrismaPromise<GetWhitelistsAggregateType<T>>

    /**
     * Group by Whitelists.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WhitelistsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WhitelistsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WhitelistsGroupByArgs['orderBy'] }
        : { orderBy?: WhitelistsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WhitelistsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWhitelistsGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for whitelists.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__whitelistsClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * whitelists findUnique
   */
  export type whitelistsFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the whitelists
     * 
    **/
    select?: whitelistsSelect | null
    /**
     * Throw an Error if a whitelists can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which whitelists to fetch.
     * 
    **/
    where: whitelistsWhereUniqueInput
  }


  /**
   * whitelists findFirst
   */
  export type whitelistsFindFirstArgs = {
    /**
     * Select specific fields to fetch from the whitelists
     * 
    **/
    select?: whitelistsSelect | null
    /**
     * Throw an Error if a whitelists can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which whitelists to fetch.
     * 
    **/
    where?: whitelistsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of whitelists to fetch.
     * 
    **/
    orderBy?: Enumerable<whitelistsOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for whitelists.
     * 
    **/
    cursor?: whitelistsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` whitelists from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` whitelists.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of whitelists.
     * 
    **/
    distinct?: Enumerable<WhitelistsScalarFieldEnum>
  }


  /**
   * whitelists findMany
   */
  export type whitelistsFindManyArgs = {
    /**
     * Select specific fields to fetch from the whitelists
     * 
    **/
    select?: whitelistsSelect | null
    /**
     * Filter, which whitelists to fetch.
     * 
    **/
    where?: whitelistsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of whitelists to fetch.
     * 
    **/
    orderBy?: Enumerable<whitelistsOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing whitelists.
     * 
    **/
    cursor?: whitelistsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` whitelists from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` whitelists.
     * 
    **/
    skip?: number
    distinct?: Enumerable<WhitelistsScalarFieldEnum>
  }


  /**
   * whitelists create
   */
  export type whitelistsCreateArgs = {
    /**
     * Select specific fields to fetch from the whitelists
     * 
    **/
    select?: whitelistsSelect | null
    /**
     * The data needed to create a whitelists.
     * 
    **/
    data: XOR<whitelistsCreateInput, whitelistsUncheckedCreateInput>
  }


  /**
   * whitelists createMany
   */
  export type whitelistsCreateManyArgs = {
    /**
     * The data used to create many whitelists.
     * 
    **/
    data: Enumerable<whitelistsCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * whitelists update
   */
  export type whitelistsUpdateArgs = {
    /**
     * Select specific fields to fetch from the whitelists
     * 
    **/
    select?: whitelistsSelect | null
    /**
     * The data needed to update a whitelists.
     * 
    **/
    data: XOR<whitelistsUpdateInput, whitelistsUncheckedUpdateInput>
    /**
     * Choose, which whitelists to update.
     * 
    **/
    where: whitelistsWhereUniqueInput
  }


  /**
   * whitelists updateMany
   */
  export type whitelistsUpdateManyArgs = {
    /**
     * The data used to update whitelists.
     * 
    **/
    data: XOR<whitelistsUpdateManyMutationInput, whitelistsUncheckedUpdateManyInput>
    /**
     * Filter which whitelists to update
     * 
    **/
    where?: whitelistsWhereInput
  }


  /**
   * whitelists upsert
   */
  export type whitelistsUpsertArgs = {
    /**
     * Select specific fields to fetch from the whitelists
     * 
    **/
    select?: whitelistsSelect | null
    /**
     * The filter to search for the whitelists to update in case it exists.
     * 
    **/
    where: whitelistsWhereUniqueInput
    /**
     * In case the whitelists found by the `where` argument doesn't exist, create a new whitelists with this data.
     * 
    **/
    create: XOR<whitelistsCreateInput, whitelistsUncheckedCreateInput>
    /**
     * In case the whitelists was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<whitelistsUpdateInput, whitelistsUncheckedUpdateInput>
  }


  /**
   * whitelists delete
   */
  export type whitelistsDeleteArgs = {
    /**
     * Select specific fields to fetch from the whitelists
     * 
    **/
    select?: whitelistsSelect | null
    /**
     * Filter which whitelists to delete.
     * 
    **/
    where: whitelistsWhereUniqueInput
  }


  /**
   * whitelists deleteMany
   */
  export type whitelistsDeleteManyArgs = {
    /**
     * Filter which whitelists to delete
     * 
    **/
    where?: whitelistsWhereInput
  }


  /**
   * whitelists without action
   */
  export type whitelistsArgs = {
    /**
     * Select specific fields to fetch from the whitelists
     * 
    **/
    select?: whitelistsSelect | null
  }



  /**
   * Model favs
   */


  export type AggregateFavs = {
    _count: FavsCountAggregateOutputType | null
    _avg: FavsAvgAggregateOutputType | null
    _sum: FavsSumAggregateOutputType | null
    _min: FavsMinAggregateOutputType | null
    _max: FavsMaxAggregateOutputType | null
  }

  export type FavsAvgAggregateOutputType = {
    project_id: number | null
    project_type: number | null
  }

  export type FavsSumAggregateOutputType = {
    project_id: number | null
    project_type: number | null
  }

  export type FavsMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    created_at: Date | null
    updated_at: Date | null
    project_id: number | null
    project_type: number | null
  }

  export type FavsMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    created_at: Date | null
    updated_at: Date | null
    project_id: number | null
    project_type: number | null
  }

  export type FavsCountAggregateOutputType = {
    id: number
    user_id: number
    created_at: number
    updated_at: number
    project_id: number
    project_type: number
    _all: number
  }


  export type FavsAvgAggregateInputType = {
    project_id?: true
    project_type?: true
  }

  export type FavsSumAggregateInputType = {
    project_id?: true
    project_type?: true
  }

  export type FavsMinAggregateInputType = {
    id?: true
    user_id?: true
    created_at?: true
    updated_at?: true
    project_id?: true
    project_type?: true
  }

  export type FavsMaxAggregateInputType = {
    id?: true
    user_id?: true
    created_at?: true
    updated_at?: true
    project_id?: true
    project_type?: true
  }

  export type FavsCountAggregateInputType = {
    id?: true
    user_id?: true
    created_at?: true
    updated_at?: true
    project_id?: true
    project_type?: true
    _all?: true
  }

  export type FavsAggregateArgs = {
    /**
     * Filter which favs to aggregate.
     * 
    **/
    where?: favsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of favs to fetch.
     * 
    **/
    orderBy?: Enumerable<favsOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: favsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` favs from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` favs.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned favs
    **/
    _count?: true | FavsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FavsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FavsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FavsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FavsMaxAggregateInputType
  }

  export type GetFavsAggregateType<T extends FavsAggregateArgs> = {
        [P in keyof T & keyof AggregateFavs]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFavs[P]>
      : GetScalarType<T[P], AggregateFavs[P]>
  }




  export type FavsGroupByArgs = {
    where?: favsWhereInput
    orderBy?: Enumerable<favsOrderByWithAggregationInput>
    by: Array<FavsScalarFieldEnum>
    having?: favsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FavsCountAggregateInputType | true
    _avg?: FavsAvgAggregateInputType
    _sum?: FavsSumAggregateInputType
    _min?: FavsMinAggregateInputType
    _max?: FavsMaxAggregateInputType
  }


  export type FavsGroupByOutputType = {
    id: string
    user_id: string
    created_at: Date
    updated_at: Date | null
    project_id: number
    project_type: number | null
    _count: FavsCountAggregateOutputType | null
    _avg: FavsAvgAggregateOutputType | null
    _sum: FavsSumAggregateOutputType | null
    _min: FavsMinAggregateOutputType | null
    _max: FavsMaxAggregateOutputType | null
  }

  type GetFavsGroupByPayload<T extends FavsGroupByArgs> = PrismaPromise<
    Array<
      PickArray<FavsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FavsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FavsGroupByOutputType[P]>
            : GetScalarType<T[P], FavsGroupByOutputType[P]>
        }
      >
    >


  export type favsSelect = {
    id?: boolean
    user_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    project_id?: boolean
    project_type?: boolean
  }

  export type favsGetPayload<
    S extends boolean | null | undefined | favsArgs,
    U = keyof S
      > = S extends true
        ? favs
    : S extends undefined
    ? never
    : S extends favsArgs | favsFindManyArgs
    ?'include' extends U
    ? favs 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof favs ? favs[P] : never
  } 
    : favs
  : favs


  type favsCountArgs = Merge<
    Omit<favsFindManyArgs, 'select' | 'include'> & {
      select?: FavsCountAggregateInputType | true
    }
  >

  export interface favsDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Favs that matches the filter.
     * @param {favsFindUniqueArgs} args - Arguments to find a Favs
     * @example
     * // Get one Favs
     * const favs = await prisma.favs.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends favsFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, favsFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'favs'> extends True ? CheckSelect<T, Prisma__favsClient<favs>, Prisma__favsClient<favsGetPayload<T>>> : CheckSelect<T, Prisma__favsClient<favs | null >, Prisma__favsClient<favsGetPayload<T> | null >>

    /**
     * Find the first Favs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {favsFindFirstArgs} args - Arguments to find a Favs
     * @example
     * // Get one Favs
     * const favs = await prisma.favs.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends favsFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, favsFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'favs'> extends True ? CheckSelect<T, Prisma__favsClient<favs>, Prisma__favsClient<favsGetPayload<T>>> : CheckSelect<T, Prisma__favsClient<favs | null >, Prisma__favsClient<favsGetPayload<T> | null >>

    /**
     * Find zero or more Favs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {favsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Favs
     * const favs = await prisma.favs.findMany()
     * 
     * // Get first 10 Favs
     * const favs = await prisma.favs.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const favsWithIdOnly = await prisma.favs.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends favsFindManyArgs>(
      args?: SelectSubset<T, favsFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<favs>>, PrismaPromise<Array<favsGetPayload<T>>>>

    /**
     * Create a Favs.
     * @param {favsCreateArgs} args - Arguments to create a Favs.
     * @example
     * // Create one Favs
     * const Favs = await prisma.favs.create({
     *   data: {
     *     // ... data to create a Favs
     *   }
     * })
     * 
    **/
    create<T extends favsCreateArgs>(
      args: SelectSubset<T, favsCreateArgs>
    ): CheckSelect<T, Prisma__favsClient<favs>, Prisma__favsClient<favsGetPayload<T>>>

    /**
     * Create many Favs.
     *     @param {favsCreateManyArgs} args - Arguments to create many Favs.
     *     @example
     *     // Create many Favs
     *     const favs = await prisma.favs.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends favsCreateManyArgs>(
      args?: SelectSubset<T, favsCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Favs.
     * @param {favsDeleteArgs} args - Arguments to delete one Favs.
     * @example
     * // Delete one Favs
     * const Favs = await prisma.favs.delete({
     *   where: {
     *     // ... filter to delete one Favs
     *   }
     * })
     * 
    **/
    delete<T extends favsDeleteArgs>(
      args: SelectSubset<T, favsDeleteArgs>
    ): CheckSelect<T, Prisma__favsClient<favs>, Prisma__favsClient<favsGetPayload<T>>>

    /**
     * Update one Favs.
     * @param {favsUpdateArgs} args - Arguments to update one Favs.
     * @example
     * // Update one Favs
     * const favs = await prisma.favs.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends favsUpdateArgs>(
      args: SelectSubset<T, favsUpdateArgs>
    ): CheckSelect<T, Prisma__favsClient<favs>, Prisma__favsClient<favsGetPayload<T>>>

    /**
     * Delete zero or more Favs.
     * @param {favsDeleteManyArgs} args - Arguments to filter Favs to delete.
     * @example
     * // Delete a few Favs
     * const { count } = await prisma.favs.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends favsDeleteManyArgs>(
      args?: SelectSubset<T, favsDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Favs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {favsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Favs
     * const favs = await prisma.favs.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends favsUpdateManyArgs>(
      args: SelectSubset<T, favsUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Favs.
     * @param {favsUpsertArgs} args - Arguments to update or create a Favs.
     * @example
     * // Update or create a Favs
     * const favs = await prisma.favs.upsert({
     *   create: {
     *     // ... data to create a Favs
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Favs we want to update
     *   }
     * })
    **/
    upsert<T extends favsUpsertArgs>(
      args: SelectSubset<T, favsUpsertArgs>
    ): CheckSelect<T, Prisma__favsClient<favs>, Prisma__favsClient<favsGetPayload<T>>>

    /**
     * Count the number of Favs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {favsCountArgs} args - Arguments to filter Favs to count.
     * @example
     * // Count the number of Favs
     * const count = await prisma.favs.count({
     *   where: {
     *     // ... the filter for the Favs we want to count
     *   }
     * })
    **/
    count<T extends favsCountArgs>(
      args?: Subset<T, favsCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FavsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Favs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FavsAggregateArgs>(args: Subset<T, FavsAggregateArgs>): PrismaPromise<GetFavsAggregateType<T>>

    /**
     * Group by Favs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FavsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FavsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FavsGroupByArgs['orderBy'] }
        : { orderBy?: FavsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FavsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFavsGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for favs.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__favsClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * favs findUnique
   */
  export type favsFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the favs
     * 
    **/
    select?: favsSelect | null
    /**
     * Throw an Error if a favs can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which favs to fetch.
     * 
    **/
    where: favsWhereUniqueInput
  }


  /**
   * favs findFirst
   */
  export type favsFindFirstArgs = {
    /**
     * Select specific fields to fetch from the favs
     * 
    **/
    select?: favsSelect | null
    /**
     * Throw an Error if a favs can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which favs to fetch.
     * 
    **/
    where?: favsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of favs to fetch.
     * 
    **/
    orderBy?: Enumerable<favsOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for favs.
     * 
    **/
    cursor?: favsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` favs from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` favs.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of favs.
     * 
    **/
    distinct?: Enumerable<FavsScalarFieldEnum>
  }


  /**
   * favs findMany
   */
  export type favsFindManyArgs = {
    /**
     * Select specific fields to fetch from the favs
     * 
    **/
    select?: favsSelect | null
    /**
     * Filter, which favs to fetch.
     * 
    **/
    where?: favsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of favs to fetch.
     * 
    **/
    orderBy?: Enumerable<favsOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing favs.
     * 
    **/
    cursor?: favsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` favs from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` favs.
     * 
    **/
    skip?: number
    distinct?: Enumerable<FavsScalarFieldEnum>
  }


  /**
   * favs create
   */
  export type favsCreateArgs = {
    /**
     * Select specific fields to fetch from the favs
     * 
    **/
    select?: favsSelect | null
    /**
     * The data needed to create a favs.
     * 
    **/
    data: XOR<favsCreateInput, favsUncheckedCreateInput>
  }


  /**
   * favs createMany
   */
  export type favsCreateManyArgs = {
    /**
     * The data used to create many favs.
     * 
    **/
    data: Enumerable<favsCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * favs update
   */
  export type favsUpdateArgs = {
    /**
     * Select specific fields to fetch from the favs
     * 
    **/
    select?: favsSelect | null
    /**
     * The data needed to update a favs.
     * 
    **/
    data: XOR<favsUpdateInput, favsUncheckedUpdateInput>
    /**
     * Choose, which favs to update.
     * 
    **/
    where: favsWhereUniqueInput
  }


  /**
   * favs updateMany
   */
  export type favsUpdateManyArgs = {
    /**
     * The data used to update favs.
     * 
    **/
    data: XOR<favsUpdateManyMutationInput, favsUncheckedUpdateManyInput>
    /**
     * Filter which favs to update
     * 
    **/
    where?: favsWhereInput
  }


  /**
   * favs upsert
   */
  export type favsUpsertArgs = {
    /**
     * Select specific fields to fetch from the favs
     * 
    **/
    select?: favsSelect | null
    /**
     * The filter to search for the favs to update in case it exists.
     * 
    **/
    where: favsWhereUniqueInput
    /**
     * In case the favs found by the `where` argument doesn't exist, create a new favs with this data.
     * 
    **/
    create: XOR<favsCreateInput, favsUncheckedCreateInput>
    /**
     * In case the favs was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<favsUpdateInput, favsUncheckedUpdateInput>
  }


  /**
   * favs delete
   */
  export type favsDeleteArgs = {
    /**
     * Select specific fields to fetch from the favs
     * 
    **/
    select?: favsSelect | null
    /**
     * Filter which favs to delete.
     * 
    **/
    where: favsWhereUniqueInput
  }


  /**
   * favs deleteMany
   */
  export type favsDeleteManyArgs = {
    /**
     * Filter which favs to delete
     * 
    **/
    where?: favsWhereInput
  }


  /**
   * favs without action
   */
  export type favsArgs = {
    /**
     * Select specific fields to fetch from the favs
     * 
    **/
    select?: favsSelect | null
  }



  /**
   * Model visit_histories
   */


  export type AggregateVisit_histories = {
    _count: Visit_historiesCountAggregateOutputType | null
    _avg: Visit_historiesAvgAggregateOutputType | null
    _sum: Visit_historiesSumAggregateOutputType | null
    _min: Visit_historiesMinAggregateOutputType | null
    _max: Visit_historiesMaxAggregateOutputType | null
  }

  export type Visit_historiesAvgAggregateOutputType = {
    project_id: number | null
    project_type: number | null
  }

  export type Visit_historiesSumAggregateOutputType = {
    project_id: number | null
    project_type: number | null
  }

  export type Visit_historiesMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    project_id: number | null
    project_type: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Visit_historiesMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    project_id: number | null
    project_type: number | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Visit_historiesCountAggregateOutputType = {
    id: number
    user_id: number
    project_id: number
    project_type: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type Visit_historiesAvgAggregateInputType = {
    project_id?: true
    project_type?: true
  }

  export type Visit_historiesSumAggregateInputType = {
    project_id?: true
    project_type?: true
  }

  export type Visit_historiesMinAggregateInputType = {
    id?: true
    user_id?: true
    project_id?: true
    project_type?: true
    created_at?: true
    updated_at?: true
  }

  export type Visit_historiesMaxAggregateInputType = {
    id?: true
    user_id?: true
    project_id?: true
    project_type?: true
    created_at?: true
    updated_at?: true
  }

  export type Visit_historiesCountAggregateInputType = {
    id?: true
    user_id?: true
    project_id?: true
    project_type?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type Visit_historiesAggregateArgs = {
    /**
     * Filter which visit_histories to aggregate.
     * 
    **/
    where?: visit_historiesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of visit_histories to fetch.
     * 
    **/
    orderBy?: Enumerable<visit_historiesOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: visit_historiesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` visit_histories from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` visit_histories.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned visit_histories
    **/
    _count?: true | Visit_historiesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Visit_historiesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Visit_historiesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Visit_historiesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Visit_historiesMaxAggregateInputType
  }

  export type GetVisit_historiesAggregateType<T extends Visit_historiesAggregateArgs> = {
        [P in keyof T & keyof AggregateVisit_histories]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVisit_histories[P]>
      : GetScalarType<T[P], AggregateVisit_histories[P]>
  }




  export type Visit_historiesGroupByArgs = {
    where?: visit_historiesWhereInput
    orderBy?: Enumerable<visit_historiesOrderByWithAggregationInput>
    by: Array<Visit_historiesScalarFieldEnum>
    having?: visit_historiesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Visit_historiesCountAggregateInputType | true
    _avg?: Visit_historiesAvgAggregateInputType
    _sum?: Visit_historiesSumAggregateInputType
    _min?: Visit_historiesMinAggregateInputType
    _max?: Visit_historiesMaxAggregateInputType
  }


  export type Visit_historiesGroupByOutputType = {
    id: string
    user_id: string
    project_id: number
    project_type: number | null
    created_at: Date
    updated_at: Date | null
    _count: Visit_historiesCountAggregateOutputType | null
    _avg: Visit_historiesAvgAggregateOutputType | null
    _sum: Visit_historiesSumAggregateOutputType | null
    _min: Visit_historiesMinAggregateOutputType | null
    _max: Visit_historiesMaxAggregateOutputType | null
  }

  type GetVisit_historiesGroupByPayload<T extends Visit_historiesGroupByArgs> = PrismaPromise<
    Array<
      PickArray<Visit_historiesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Visit_historiesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Visit_historiesGroupByOutputType[P]>
            : GetScalarType<T[P], Visit_historiesGroupByOutputType[P]>
        }
      >
    >


  export type visit_historiesSelect = {
    id?: boolean
    user_id?: boolean
    project_id?: boolean
    project_type?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type visit_historiesGetPayload<
    S extends boolean | null | undefined | visit_historiesArgs,
    U = keyof S
      > = S extends true
        ? visit_histories
    : S extends undefined
    ? never
    : S extends visit_historiesArgs | visit_historiesFindManyArgs
    ?'include' extends U
    ? visit_histories 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof visit_histories ? visit_histories[P] : never
  } 
    : visit_histories
  : visit_histories


  type visit_historiesCountArgs = Merge<
    Omit<visit_historiesFindManyArgs, 'select' | 'include'> & {
      select?: Visit_historiesCountAggregateInputType | true
    }
  >

  export interface visit_historiesDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Visit_histories that matches the filter.
     * @param {visit_historiesFindUniqueArgs} args - Arguments to find a Visit_histories
     * @example
     * // Get one Visit_histories
     * const visit_histories = await prisma.visit_histories.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends visit_historiesFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, visit_historiesFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'visit_histories'> extends True ? CheckSelect<T, Prisma__visit_historiesClient<visit_histories>, Prisma__visit_historiesClient<visit_historiesGetPayload<T>>> : CheckSelect<T, Prisma__visit_historiesClient<visit_histories | null >, Prisma__visit_historiesClient<visit_historiesGetPayload<T> | null >>

    /**
     * Find the first Visit_histories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {visit_historiesFindFirstArgs} args - Arguments to find a Visit_histories
     * @example
     * // Get one Visit_histories
     * const visit_histories = await prisma.visit_histories.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends visit_historiesFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, visit_historiesFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'visit_histories'> extends True ? CheckSelect<T, Prisma__visit_historiesClient<visit_histories>, Prisma__visit_historiesClient<visit_historiesGetPayload<T>>> : CheckSelect<T, Prisma__visit_historiesClient<visit_histories | null >, Prisma__visit_historiesClient<visit_historiesGetPayload<T> | null >>

    /**
     * Find zero or more Visit_histories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {visit_historiesFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Visit_histories
     * const visit_histories = await prisma.visit_histories.findMany()
     * 
     * // Get first 10 Visit_histories
     * const visit_histories = await prisma.visit_histories.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const visit_historiesWithIdOnly = await prisma.visit_histories.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends visit_historiesFindManyArgs>(
      args?: SelectSubset<T, visit_historiesFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<visit_histories>>, PrismaPromise<Array<visit_historiesGetPayload<T>>>>

    /**
     * Create a Visit_histories.
     * @param {visit_historiesCreateArgs} args - Arguments to create a Visit_histories.
     * @example
     * // Create one Visit_histories
     * const Visit_histories = await prisma.visit_histories.create({
     *   data: {
     *     // ... data to create a Visit_histories
     *   }
     * })
     * 
    **/
    create<T extends visit_historiesCreateArgs>(
      args: SelectSubset<T, visit_historiesCreateArgs>
    ): CheckSelect<T, Prisma__visit_historiesClient<visit_histories>, Prisma__visit_historiesClient<visit_historiesGetPayload<T>>>

    /**
     * Create many Visit_histories.
     *     @param {visit_historiesCreateManyArgs} args - Arguments to create many Visit_histories.
     *     @example
     *     // Create many Visit_histories
     *     const visit_histories = await prisma.visit_histories.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends visit_historiesCreateManyArgs>(
      args?: SelectSubset<T, visit_historiesCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Visit_histories.
     * @param {visit_historiesDeleteArgs} args - Arguments to delete one Visit_histories.
     * @example
     * // Delete one Visit_histories
     * const Visit_histories = await prisma.visit_histories.delete({
     *   where: {
     *     // ... filter to delete one Visit_histories
     *   }
     * })
     * 
    **/
    delete<T extends visit_historiesDeleteArgs>(
      args: SelectSubset<T, visit_historiesDeleteArgs>
    ): CheckSelect<T, Prisma__visit_historiesClient<visit_histories>, Prisma__visit_historiesClient<visit_historiesGetPayload<T>>>

    /**
     * Update one Visit_histories.
     * @param {visit_historiesUpdateArgs} args - Arguments to update one Visit_histories.
     * @example
     * // Update one Visit_histories
     * const visit_histories = await prisma.visit_histories.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends visit_historiesUpdateArgs>(
      args: SelectSubset<T, visit_historiesUpdateArgs>
    ): CheckSelect<T, Prisma__visit_historiesClient<visit_histories>, Prisma__visit_historiesClient<visit_historiesGetPayload<T>>>

    /**
     * Delete zero or more Visit_histories.
     * @param {visit_historiesDeleteManyArgs} args - Arguments to filter Visit_histories to delete.
     * @example
     * // Delete a few Visit_histories
     * const { count } = await prisma.visit_histories.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends visit_historiesDeleteManyArgs>(
      args?: SelectSubset<T, visit_historiesDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Visit_histories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {visit_historiesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Visit_histories
     * const visit_histories = await prisma.visit_histories.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends visit_historiesUpdateManyArgs>(
      args: SelectSubset<T, visit_historiesUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Visit_histories.
     * @param {visit_historiesUpsertArgs} args - Arguments to update or create a Visit_histories.
     * @example
     * // Update or create a Visit_histories
     * const visit_histories = await prisma.visit_histories.upsert({
     *   create: {
     *     // ... data to create a Visit_histories
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Visit_histories we want to update
     *   }
     * })
    **/
    upsert<T extends visit_historiesUpsertArgs>(
      args: SelectSubset<T, visit_historiesUpsertArgs>
    ): CheckSelect<T, Prisma__visit_historiesClient<visit_histories>, Prisma__visit_historiesClient<visit_historiesGetPayload<T>>>

    /**
     * Count the number of Visit_histories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {visit_historiesCountArgs} args - Arguments to filter Visit_histories to count.
     * @example
     * // Count the number of Visit_histories
     * const count = await prisma.visit_histories.count({
     *   where: {
     *     // ... the filter for the Visit_histories we want to count
     *   }
     * })
    **/
    count<T extends visit_historiesCountArgs>(
      args?: Subset<T, visit_historiesCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Visit_historiesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Visit_histories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Visit_historiesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Visit_historiesAggregateArgs>(args: Subset<T, Visit_historiesAggregateArgs>): PrismaPromise<GetVisit_historiesAggregateType<T>>

    /**
     * Group by Visit_histories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Visit_historiesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends Visit_historiesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Visit_historiesGroupByArgs['orderBy'] }
        : { orderBy?: Visit_historiesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, Visit_historiesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVisit_historiesGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for visit_histories.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__visit_historiesClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * visit_histories findUnique
   */
  export type visit_historiesFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the visit_histories
     * 
    **/
    select?: visit_historiesSelect | null
    /**
     * Throw an Error if a visit_histories can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which visit_histories to fetch.
     * 
    **/
    where: visit_historiesWhereUniqueInput
  }


  /**
   * visit_histories findFirst
   */
  export type visit_historiesFindFirstArgs = {
    /**
     * Select specific fields to fetch from the visit_histories
     * 
    **/
    select?: visit_historiesSelect | null
    /**
     * Throw an Error if a visit_histories can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which visit_histories to fetch.
     * 
    **/
    where?: visit_historiesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of visit_histories to fetch.
     * 
    **/
    orderBy?: Enumerable<visit_historiesOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for visit_histories.
     * 
    **/
    cursor?: visit_historiesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` visit_histories from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` visit_histories.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of visit_histories.
     * 
    **/
    distinct?: Enumerable<Visit_historiesScalarFieldEnum>
  }


  /**
   * visit_histories findMany
   */
  export type visit_historiesFindManyArgs = {
    /**
     * Select specific fields to fetch from the visit_histories
     * 
    **/
    select?: visit_historiesSelect | null
    /**
     * Filter, which visit_histories to fetch.
     * 
    **/
    where?: visit_historiesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of visit_histories to fetch.
     * 
    **/
    orderBy?: Enumerable<visit_historiesOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing visit_histories.
     * 
    **/
    cursor?: visit_historiesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` visit_histories from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` visit_histories.
     * 
    **/
    skip?: number
    distinct?: Enumerable<Visit_historiesScalarFieldEnum>
  }


  /**
   * visit_histories create
   */
  export type visit_historiesCreateArgs = {
    /**
     * Select specific fields to fetch from the visit_histories
     * 
    **/
    select?: visit_historiesSelect | null
    /**
     * The data needed to create a visit_histories.
     * 
    **/
    data: XOR<visit_historiesCreateInput, visit_historiesUncheckedCreateInput>
  }


  /**
   * visit_histories createMany
   */
  export type visit_historiesCreateManyArgs = {
    /**
     * The data used to create many visit_histories.
     * 
    **/
    data: Enumerable<visit_historiesCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * visit_histories update
   */
  export type visit_historiesUpdateArgs = {
    /**
     * Select specific fields to fetch from the visit_histories
     * 
    **/
    select?: visit_historiesSelect | null
    /**
     * The data needed to update a visit_histories.
     * 
    **/
    data: XOR<visit_historiesUpdateInput, visit_historiesUncheckedUpdateInput>
    /**
     * Choose, which visit_histories to update.
     * 
    **/
    where: visit_historiesWhereUniqueInput
  }


  /**
   * visit_histories updateMany
   */
  export type visit_historiesUpdateManyArgs = {
    /**
     * The data used to update visit_histories.
     * 
    **/
    data: XOR<visit_historiesUpdateManyMutationInput, visit_historiesUncheckedUpdateManyInput>
    /**
     * Filter which visit_histories to update
     * 
    **/
    where?: visit_historiesWhereInput
  }


  /**
   * visit_histories upsert
   */
  export type visit_historiesUpsertArgs = {
    /**
     * Select specific fields to fetch from the visit_histories
     * 
    **/
    select?: visit_historiesSelect | null
    /**
     * The filter to search for the visit_histories to update in case it exists.
     * 
    **/
    where: visit_historiesWhereUniqueInput
    /**
     * In case the visit_histories found by the `where` argument doesn't exist, create a new visit_histories with this data.
     * 
    **/
    create: XOR<visit_historiesCreateInput, visit_historiesUncheckedCreateInput>
    /**
     * In case the visit_histories was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<visit_historiesUpdateInput, visit_historiesUncheckedUpdateInput>
  }


  /**
   * visit_histories delete
   */
  export type visit_historiesDeleteArgs = {
    /**
     * Select specific fields to fetch from the visit_histories
     * 
    **/
    select?: visit_historiesSelect | null
    /**
     * Filter which visit_histories to delete.
     * 
    **/
    where: visit_historiesWhereUniqueInput
  }


  /**
   * visit_histories deleteMany
   */
  export type visit_historiesDeleteManyArgs = {
    /**
     * Filter which visit_histories to delete
     * 
    **/
    where?: visit_historiesWhereInput
  }


  /**
   * visit_histories without action
   */
  export type visit_historiesArgs = {
    /**
     * Select specific fields to fetch from the visit_histories
     * 
    **/
    select?: visit_historiesSelect | null
  }



  /**
   * Model alarms
   */


  export type AggregateAlarms = {
    _count: AlarmsCountAggregateOutputType | null
    _min: AlarmsMinAggregateOutputType | null
    _max: AlarmsMaxAggregateOutputType | null
  }

  export type AlarmsMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    alarm_at: Date | null
    desc: string | null
    created_at: Date | null
    updated_at: Date | null
    color: string | null
    url: string | null
  }

  export type AlarmsMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    alarm_at: Date | null
    desc: string | null
    created_at: Date | null
    updated_at: Date | null
    color: string | null
    url: string | null
  }

  export type AlarmsCountAggregateOutputType = {
    id: number
    user_id: number
    alarm_at: number
    desc: number
    created_at: number
    updated_at: number
    color: number
    url: number
    _all: number
  }


  export type AlarmsMinAggregateInputType = {
    id?: true
    user_id?: true
    alarm_at?: true
    desc?: true
    created_at?: true
    updated_at?: true
    color?: true
    url?: true
  }

  export type AlarmsMaxAggregateInputType = {
    id?: true
    user_id?: true
    alarm_at?: true
    desc?: true
    created_at?: true
    updated_at?: true
    color?: true
    url?: true
  }

  export type AlarmsCountAggregateInputType = {
    id?: true
    user_id?: true
    alarm_at?: true
    desc?: true
    created_at?: true
    updated_at?: true
    color?: true
    url?: true
    _all?: true
  }

  export type AlarmsAggregateArgs = {
    /**
     * Filter which alarms to aggregate.
     * 
    **/
    where?: alarmsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of alarms to fetch.
     * 
    **/
    orderBy?: Enumerable<alarmsOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: alarmsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` alarms from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` alarms.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned alarms
    **/
    _count?: true | AlarmsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AlarmsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AlarmsMaxAggregateInputType
  }

  export type GetAlarmsAggregateType<T extends AlarmsAggregateArgs> = {
        [P in keyof T & keyof AggregateAlarms]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAlarms[P]>
      : GetScalarType<T[P], AggregateAlarms[P]>
  }




  export type AlarmsGroupByArgs = {
    where?: alarmsWhereInput
    orderBy?: Enumerable<alarmsOrderByWithAggregationInput>
    by: Array<AlarmsScalarFieldEnum>
    having?: alarmsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AlarmsCountAggregateInputType | true
    _min?: AlarmsMinAggregateInputType
    _max?: AlarmsMaxAggregateInputType
  }


  export type AlarmsGroupByOutputType = {
    id: string
    user_id: string
    alarm_at: Date
    desc: string
    created_at: Date
    updated_at: Date | null
    color: string | null
    url: string | null
    _count: AlarmsCountAggregateOutputType | null
    _min: AlarmsMinAggregateOutputType | null
    _max: AlarmsMaxAggregateOutputType | null
  }

  type GetAlarmsGroupByPayload<T extends AlarmsGroupByArgs> = PrismaPromise<
    Array<
      PickArray<AlarmsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AlarmsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AlarmsGroupByOutputType[P]>
            : GetScalarType<T[P], AlarmsGroupByOutputType[P]>
        }
      >
    >


  export type alarmsSelect = {
    id?: boolean
    user_id?: boolean
    alarm_at?: boolean
    desc?: boolean
    created_at?: boolean
    updated_at?: boolean
    color?: boolean
    url?: boolean
  }

  export type alarmsGetPayload<
    S extends boolean | null | undefined | alarmsArgs,
    U = keyof S
      > = S extends true
        ? alarms
    : S extends undefined
    ? never
    : S extends alarmsArgs | alarmsFindManyArgs
    ?'include' extends U
    ? alarms 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof alarms ? alarms[P] : never
  } 
    : alarms
  : alarms


  type alarmsCountArgs = Merge<
    Omit<alarmsFindManyArgs, 'select' | 'include'> & {
      select?: AlarmsCountAggregateInputType | true
    }
  >

  export interface alarmsDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Alarms that matches the filter.
     * @param {alarmsFindUniqueArgs} args - Arguments to find a Alarms
     * @example
     * // Get one Alarms
     * const alarms = await prisma.alarms.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends alarmsFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, alarmsFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'alarms'> extends True ? CheckSelect<T, Prisma__alarmsClient<alarms>, Prisma__alarmsClient<alarmsGetPayload<T>>> : CheckSelect<T, Prisma__alarmsClient<alarms | null >, Prisma__alarmsClient<alarmsGetPayload<T> | null >>

    /**
     * Find the first Alarms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {alarmsFindFirstArgs} args - Arguments to find a Alarms
     * @example
     * // Get one Alarms
     * const alarms = await prisma.alarms.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends alarmsFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, alarmsFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'alarms'> extends True ? CheckSelect<T, Prisma__alarmsClient<alarms>, Prisma__alarmsClient<alarmsGetPayload<T>>> : CheckSelect<T, Prisma__alarmsClient<alarms | null >, Prisma__alarmsClient<alarmsGetPayload<T> | null >>

    /**
     * Find zero or more Alarms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {alarmsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Alarms
     * const alarms = await prisma.alarms.findMany()
     * 
     * // Get first 10 Alarms
     * const alarms = await prisma.alarms.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const alarmsWithIdOnly = await prisma.alarms.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends alarmsFindManyArgs>(
      args?: SelectSubset<T, alarmsFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<alarms>>, PrismaPromise<Array<alarmsGetPayload<T>>>>

    /**
     * Create a Alarms.
     * @param {alarmsCreateArgs} args - Arguments to create a Alarms.
     * @example
     * // Create one Alarms
     * const Alarms = await prisma.alarms.create({
     *   data: {
     *     // ... data to create a Alarms
     *   }
     * })
     * 
    **/
    create<T extends alarmsCreateArgs>(
      args: SelectSubset<T, alarmsCreateArgs>
    ): CheckSelect<T, Prisma__alarmsClient<alarms>, Prisma__alarmsClient<alarmsGetPayload<T>>>

    /**
     * Create many Alarms.
     *     @param {alarmsCreateManyArgs} args - Arguments to create many Alarms.
     *     @example
     *     // Create many Alarms
     *     const alarms = await prisma.alarms.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends alarmsCreateManyArgs>(
      args?: SelectSubset<T, alarmsCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Alarms.
     * @param {alarmsDeleteArgs} args - Arguments to delete one Alarms.
     * @example
     * // Delete one Alarms
     * const Alarms = await prisma.alarms.delete({
     *   where: {
     *     // ... filter to delete one Alarms
     *   }
     * })
     * 
    **/
    delete<T extends alarmsDeleteArgs>(
      args: SelectSubset<T, alarmsDeleteArgs>
    ): CheckSelect<T, Prisma__alarmsClient<alarms>, Prisma__alarmsClient<alarmsGetPayload<T>>>

    /**
     * Update one Alarms.
     * @param {alarmsUpdateArgs} args - Arguments to update one Alarms.
     * @example
     * // Update one Alarms
     * const alarms = await prisma.alarms.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends alarmsUpdateArgs>(
      args: SelectSubset<T, alarmsUpdateArgs>
    ): CheckSelect<T, Prisma__alarmsClient<alarms>, Prisma__alarmsClient<alarmsGetPayload<T>>>

    /**
     * Delete zero or more Alarms.
     * @param {alarmsDeleteManyArgs} args - Arguments to filter Alarms to delete.
     * @example
     * // Delete a few Alarms
     * const { count } = await prisma.alarms.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends alarmsDeleteManyArgs>(
      args?: SelectSubset<T, alarmsDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Alarms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {alarmsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Alarms
     * const alarms = await prisma.alarms.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends alarmsUpdateManyArgs>(
      args: SelectSubset<T, alarmsUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Alarms.
     * @param {alarmsUpsertArgs} args - Arguments to update or create a Alarms.
     * @example
     * // Update or create a Alarms
     * const alarms = await prisma.alarms.upsert({
     *   create: {
     *     // ... data to create a Alarms
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Alarms we want to update
     *   }
     * })
    **/
    upsert<T extends alarmsUpsertArgs>(
      args: SelectSubset<T, alarmsUpsertArgs>
    ): CheckSelect<T, Prisma__alarmsClient<alarms>, Prisma__alarmsClient<alarmsGetPayload<T>>>

    /**
     * Count the number of Alarms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {alarmsCountArgs} args - Arguments to filter Alarms to count.
     * @example
     * // Count the number of Alarms
     * const count = await prisma.alarms.count({
     *   where: {
     *     // ... the filter for the Alarms we want to count
     *   }
     * })
    **/
    count<T extends alarmsCountArgs>(
      args?: Subset<T, alarmsCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AlarmsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Alarms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlarmsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AlarmsAggregateArgs>(args: Subset<T, AlarmsAggregateArgs>): PrismaPromise<GetAlarmsAggregateType<T>>

    /**
     * Group by Alarms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AlarmsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AlarmsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AlarmsGroupByArgs['orderBy'] }
        : { orderBy?: AlarmsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AlarmsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAlarmsGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for alarms.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__alarmsClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * alarms findUnique
   */
  export type alarmsFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the alarms
     * 
    **/
    select?: alarmsSelect | null
    /**
     * Throw an Error if a alarms can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which alarms to fetch.
     * 
    **/
    where: alarmsWhereUniqueInput
  }


  /**
   * alarms findFirst
   */
  export type alarmsFindFirstArgs = {
    /**
     * Select specific fields to fetch from the alarms
     * 
    **/
    select?: alarmsSelect | null
    /**
     * Throw an Error if a alarms can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which alarms to fetch.
     * 
    **/
    where?: alarmsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of alarms to fetch.
     * 
    **/
    orderBy?: Enumerable<alarmsOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for alarms.
     * 
    **/
    cursor?: alarmsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` alarms from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` alarms.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of alarms.
     * 
    **/
    distinct?: Enumerable<AlarmsScalarFieldEnum>
  }


  /**
   * alarms findMany
   */
  export type alarmsFindManyArgs = {
    /**
     * Select specific fields to fetch from the alarms
     * 
    **/
    select?: alarmsSelect | null
    /**
     * Filter, which alarms to fetch.
     * 
    **/
    where?: alarmsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of alarms to fetch.
     * 
    **/
    orderBy?: Enumerable<alarmsOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing alarms.
     * 
    **/
    cursor?: alarmsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` alarms from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` alarms.
     * 
    **/
    skip?: number
    distinct?: Enumerable<AlarmsScalarFieldEnum>
  }


  /**
   * alarms create
   */
  export type alarmsCreateArgs = {
    /**
     * Select specific fields to fetch from the alarms
     * 
    **/
    select?: alarmsSelect | null
    /**
     * The data needed to create a alarms.
     * 
    **/
    data: XOR<alarmsCreateInput, alarmsUncheckedCreateInput>
  }


  /**
   * alarms createMany
   */
  export type alarmsCreateManyArgs = {
    /**
     * The data used to create many alarms.
     * 
    **/
    data: Enumerable<alarmsCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * alarms update
   */
  export type alarmsUpdateArgs = {
    /**
     * Select specific fields to fetch from the alarms
     * 
    **/
    select?: alarmsSelect | null
    /**
     * The data needed to update a alarms.
     * 
    **/
    data: XOR<alarmsUpdateInput, alarmsUncheckedUpdateInput>
    /**
     * Choose, which alarms to update.
     * 
    **/
    where: alarmsWhereUniqueInput
  }


  /**
   * alarms updateMany
   */
  export type alarmsUpdateManyArgs = {
    /**
     * The data used to update alarms.
     * 
    **/
    data: XOR<alarmsUpdateManyMutationInput, alarmsUncheckedUpdateManyInput>
    /**
     * Filter which alarms to update
     * 
    **/
    where?: alarmsWhereInput
  }


  /**
   * alarms upsert
   */
  export type alarmsUpsertArgs = {
    /**
     * Select specific fields to fetch from the alarms
     * 
    **/
    select?: alarmsSelect | null
    /**
     * The filter to search for the alarms to update in case it exists.
     * 
    **/
    where: alarmsWhereUniqueInput
    /**
     * In case the alarms found by the `where` argument doesn't exist, create a new alarms with this data.
     * 
    **/
    create: XOR<alarmsCreateInput, alarmsUncheckedCreateInput>
    /**
     * In case the alarms was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<alarmsUpdateInput, alarmsUncheckedUpdateInput>
  }


  /**
   * alarms delete
   */
  export type alarmsDeleteArgs = {
    /**
     * Select specific fields to fetch from the alarms
     * 
    **/
    select?: alarmsSelect | null
    /**
     * Filter which alarms to delete.
     * 
    **/
    where: alarmsWhereUniqueInput
  }


  /**
   * alarms deleteMany
   */
  export type alarmsDeleteManyArgs = {
    /**
     * Filter which alarms to delete
     * 
    **/
    where?: alarmsWhereInput
  }


  /**
   * alarms without action
   */
  export type alarmsArgs = {
    /**
     * Select specific fields to fetch from the alarms
     * 
    **/
    select?: alarmsSelect | null
  }



  /**
   * Model reports
   */


  export type AggregateReports = {
    _count: ReportsCountAggregateOutputType | null
    _min: ReportsMinAggregateOutputType | null
    _max: ReportsMaxAggregateOutputType | null
  }

  export type ReportsMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    url: string | null
    project_type: string | null
    project_name: string | null
    created_at: Date | null
    updated_at: Date | null
    is_scam: boolean | null
  }

  export type ReportsMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    url: string | null
    project_type: string | null
    project_name: string | null
    created_at: Date | null
    updated_at: Date | null
    is_scam: boolean | null
  }

  export type ReportsCountAggregateOutputType = {
    id: number
    user_id: number
    url: number
    project_type: number
    project_name: number
    created_at: number
    updated_at: number
    is_scam: number
    _all: number
  }


  export type ReportsMinAggregateInputType = {
    id?: true
    user_id?: true
    url?: true
    project_type?: true
    project_name?: true
    created_at?: true
    updated_at?: true
    is_scam?: true
  }

  export type ReportsMaxAggregateInputType = {
    id?: true
    user_id?: true
    url?: true
    project_type?: true
    project_name?: true
    created_at?: true
    updated_at?: true
    is_scam?: true
  }

  export type ReportsCountAggregateInputType = {
    id?: true
    user_id?: true
    url?: true
    project_type?: true
    project_name?: true
    created_at?: true
    updated_at?: true
    is_scam?: true
    _all?: true
  }

  export type ReportsAggregateArgs = {
    /**
     * Filter which reports to aggregate.
     * 
    **/
    where?: reportsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of reports to fetch.
     * 
    **/
    orderBy?: Enumerable<reportsOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: reportsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` reports from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` reports.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned reports
    **/
    _count?: true | ReportsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReportsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReportsMaxAggregateInputType
  }

  export type GetReportsAggregateType<T extends ReportsAggregateArgs> = {
        [P in keyof T & keyof AggregateReports]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReports[P]>
      : GetScalarType<T[P], AggregateReports[P]>
  }




  export type ReportsGroupByArgs = {
    where?: reportsWhereInput
    orderBy?: Enumerable<reportsOrderByWithAggregationInput>
    by: Array<ReportsScalarFieldEnum>
    having?: reportsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReportsCountAggregateInputType | true
    _min?: ReportsMinAggregateInputType
    _max?: ReportsMaxAggregateInputType
  }


  export type ReportsGroupByOutputType = {
    id: string
    user_id: string | null
    url: string | null
    project_type: string | null
    project_name: string | null
    created_at: Date
    updated_at: Date | null
    is_scam: boolean | null
    _count: ReportsCountAggregateOutputType | null
    _min: ReportsMinAggregateOutputType | null
    _max: ReportsMaxAggregateOutputType | null
  }

  type GetReportsGroupByPayload<T extends ReportsGroupByArgs> = PrismaPromise<
    Array<
      PickArray<ReportsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReportsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReportsGroupByOutputType[P]>
            : GetScalarType<T[P], ReportsGroupByOutputType[P]>
        }
      >
    >


  export type reportsSelect = {
    id?: boolean
    user_id?: boolean
    url?: boolean
    project_type?: boolean
    project_name?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_scam?: boolean
  }

  export type reportsGetPayload<
    S extends boolean | null | undefined | reportsArgs,
    U = keyof S
      > = S extends true
        ? reports
    : S extends undefined
    ? never
    : S extends reportsArgs | reportsFindManyArgs
    ?'include' extends U
    ? reports 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof reports ? reports[P] : never
  } 
    : reports
  : reports


  type reportsCountArgs = Merge<
    Omit<reportsFindManyArgs, 'select' | 'include'> & {
      select?: ReportsCountAggregateInputType | true
    }
  >

  export interface reportsDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Reports that matches the filter.
     * @param {reportsFindUniqueArgs} args - Arguments to find a Reports
     * @example
     * // Get one Reports
     * const reports = await prisma.reports.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends reportsFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, reportsFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'reports'> extends True ? CheckSelect<T, Prisma__reportsClient<reports>, Prisma__reportsClient<reportsGetPayload<T>>> : CheckSelect<T, Prisma__reportsClient<reports | null >, Prisma__reportsClient<reportsGetPayload<T> | null >>

    /**
     * Find the first Reports that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reportsFindFirstArgs} args - Arguments to find a Reports
     * @example
     * // Get one Reports
     * const reports = await prisma.reports.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends reportsFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, reportsFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'reports'> extends True ? CheckSelect<T, Prisma__reportsClient<reports>, Prisma__reportsClient<reportsGetPayload<T>>> : CheckSelect<T, Prisma__reportsClient<reports | null >, Prisma__reportsClient<reportsGetPayload<T> | null >>

    /**
     * Find zero or more Reports that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reportsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reports
     * const reports = await prisma.reports.findMany()
     * 
     * // Get first 10 Reports
     * const reports = await prisma.reports.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const reportsWithIdOnly = await prisma.reports.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends reportsFindManyArgs>(
      args?: SelectSubset<T, reportsFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<reports>>, PrismaPromise<Array<reportsGetPayload<T>>>>

    /**
     * Create a Reports.
     * @param {reportsCreateArgs} args - Arguments to create a Reports.
     * @example
     * // Create one Reports
     * const Reports = await prisma.reports.create({
     *   data: {
     *     // ... data to create a Reports
     *   }
     * })
     * 
    **/
    create<T extends reportsCreateArgs>(
      args: SelectSubset<T, reportsCreateArgs>
    ): CheckSelect<T, Prisma__reportsClient<reports>, Prisma__reportsClient<reportsGetPayload<T>>>

    /**
     * Create many Reports.
     *     @param {reportsCreateManyArgs} args - Arguments to create many Reports.
     *     @example
     *     // Create many Reports
     *     const reports = await prisma.reports.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends reportsCreateManyArgs>(
      args?: SelectSubset<T, reportsCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Reports.
     * @param {reportsDeleteArgs} args - Arguments to delete one Reports.
     * @example
     * // Delete one Reports
     * const Reports = await prisma.reports.delete({
     *   where: {
     *     // ... filter to delete one Reports
     *   }
     * })
     * 
    **/
    delete<T extends reportsDeleteArgs>(
      args: SelectSubset<T, reportsDeleteArgs>
    ): CheckSelect<T, Prisma__reportsClient<reports>, Prisma__reportsClient<reportsGetPayload<T>>>

    /**
     * Update one Reports.
     * @param {reportsUpdateArgs} args - Arguments to update one Reports.
     * @example
     * // Update one Reports
     * const reports = await prisma.reports.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends reportsUpdateArgs>(
      args: SelectSubset<T, reportsUpdateArgs>
    ): CheckSelect<T, Prisma__reportsClient<reports>, Prisma__reportsClient<reportsGetPayload<T>>>

    /**
     * Delete zero or more Reports.
     * @param {reportsDeleteManyArgs} args - Arguments to filter Reports to delete.
     * @example
     * // Delete a few Reports
     * const { count } = await prisma.reports.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends reportsDeleteManyArgs>(
      args?: SelectSubset<T, reportsDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reportsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reports
     * const reports = await prisma.reports.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends reportsUpdateManyArgs>(
      args: SelectSubset<T, reportsUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Reports.
     * @param {reportsUpsertArgs} args - Arguments to update or create a Reports.
     * @example
     * // Update or create a Reports
     * const reports = await prisma.reports.upsert({
     *   create: {
     *     // ... data to create a Reports
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Reports we want to update
     *   }
     * })
    **/
    upsert<T extends reportsUpsertArgs>(
      args: SelectSubset<T, reportsUpsertArgs>
    ): CheckSelect<T, Prisma__reportsClient<reports>, Prisma__reportsClient<reportsGetPayload<T>>>

    /**
     * Count the number of Reports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {reportsCountArgs} args - Arguments to filter Reports to count.
     * @example
     * // Count the number of Reports
     * const count = await prisma.reports.count({
     *   where: {
     *     // ... the filter for the Reports we want to count
     *   }
     * })
    **/
    count<T extends reportsCountArgs>(
      args?: Subset<T, reportsCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReportsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Reports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReportsAggregateArgs>(args: Subset<T, ReportsAggregateArgs>): PrismaPromise<GetReportsAggregateType<T>>

    /**
     * Group by Reports.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReportsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReportsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReportsGroupByArgs['orderBy'] }
        : { orderBy?: ReportsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReportsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReportsGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for reports.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__reportsClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * reports findUnique
   */
  export type reportsFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the reports
     * 
    **/
    select?: reportsSelect | null
    /**
     * Throw an Error if a reports can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which reports to fetch.
     * 
    **/
    where: reportsWhereUniqueInput
  }


  /**
   * reports findFirst
   */
  export type reportsFindFirstArgs = {
    /**
     * Select specific fields to fetch from the reports
     * 
    **/
    select?: reportsSelect | null
    /**
     * Throw an Error if a reports can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which reports to fetch.
     * 
    **/
    where?: reportsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of reports to fetch.
     * 
    **/
    orderBy?: Enumerable<reportsOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for reports.
     * 
    **/
    cursor?: reportsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` reports from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` reports.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of reports.
     * 
    **/
    distinct?: Enumerable<ReportsScalarFieldEnum>
  }


  /**
   * reports findMany
   */
  export type reportsFindManyArgs = {
    /**
     * Select specific fields to fetch from the reports
     * 
    **/
    select?: reportsSelect | null
    /**
     * Filter, which reports to fetch.
     * 
    **/
    where?: reportsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of reports to fetch.
     * 
    **/
    orderBy?: Enumerable<reportsOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing reports.
     * 
    **/
    cursor?: reportsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` reports from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` reports.
     * 
    **/
    skip?: number
    distinct?: Enumerable<ReportsScalarFieldEnum>
  }


  /**
   * reports create
   */
  export type reportsCreateArgs = {
    /**
     * Select specific fields to fetch from the reports
     * 
    **/
    select?: reportsSelect | null
    /**
     * The data needed to create a reports.
     * 
    **/
    data: XOR<reportsCreateInput, reportsUncheckedCreateInput>
  }


  /**
   * reports createMany
   */
  export type reportsCreateManyArgs = {
    /**
     * The data used to create many reports.
     * 
    **/
    data: Enumerable<reportsCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * reports update
   */
  export type reportsUpdateArgs = {
    /**
     * Select specific fields to fetch from the reports
     * 
    **/
    select?: reportsSelect | null
    /**
     * The data needed to update a reports.
     * 
    **/
    data: XOR<reportsUpdateInput, reportsUncheckedUpdateInput>
    /**
     * Choose, which reports to update.
     * 
    **/
    where: reportsWhereUniqueInput
  }


  /**
   * reports updateMany
   */
  export type reportsUpdateManyArgs = {
    /**
     * The data used to update reports.
     * 
    **/
    data: XOR<reportsUpdateManyMutationInput, reportsUncheckedUpdateManyInput>
    /**
     * Filter which reports to update
     * 
    **/
    where?: reportsWhereInput
  }


  /**
   * reports upsert
   */
  export type reportsUpsertArgs = {
    /**
     * Select specific fields to fetch from the reports
     * 
    **/
    select?: reportsSelect | null
    /**
     * The filter to search for the reports to update in case it exists.
     * 
    **/
    where: reportsWhereUniqueInput
    /**
     * In case the reports found by the `where` argument doesn't exist, create a new reports with this data.
     * 
    **/
    create: XOR<reportsCreateInput, reportsUncheckedCreateInput>
    /**
     * In case the reports was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<reportsUpdateInput, reportsUncheckedUpdateInput>
  }


  /**
   * reports delete
   */
  export type reportsDeleteArgs = {
    /**
     * Select specific fields to fetch from the reports
     * 
    **/
    select?: reportsSelect | null
    /**
     * Filter which reports to delete.
     * 
    **/
    where: reportsWhereUniqueInput
  }


  /**
   * reports deleteMany
   */
  export type reportsDeleteManyArgs = {
    /**
     * Filter which reports to delete
     * 
    **/
    where?: reportsWhereInput
  }


  /**
   * reports without action
   */
  export type reportsArgs = {
    /**
     * Select specific fields to fetch from the reports
     * 
    **/
    select?: reportsSelect | null
  }



  /**
   * Model dapps
   */


  export type AggregateDapps = {
    _count: DappsCountAggregateOutputType | null
    _avg: DappsAvgAggregateOutputType | null
    _sum: DappsSumAggregateOutputType | null
    _min: DappsMinAggregateOutputType | null
    _max: DappsMaxAggregateOutputType | null
  }

  export type DappsAvgAggregateOutputType = {
    visit_count: number | null
    install_count: number | null
  }

  export type DappsSumAggregateOutputType = {
    visit_count: number | null
    install_count: number | null
  }

  export type DappsMinAggregateOutputType = {
    id: string | null
    title: string | null
    url: string | null
    logo: string | null
    desc: string | null
    created_at: Date | null
    updated_at: Date | null
    visit_count: number | null
    install_count: number | null
    visible: boolean | null
    is_good: boolean | null
    add_by_admin: boolean | null
  }

  export type DappsMaxAggregateOutputType = {
    id: string | null
    title: string | null
    url: string | null
    logo: string | null
    desc: string | null
    created_at: Date | null
    updated_at: Date | null
    visit_count: number | null
    install_count: number | null
    visible: boolean | null
    is_good: boolean | null
    add_by_admin: boolean | null
  }

  export type DappsCountAggregateOutputType = {
    id: number
    title: number
    url: number
    logo: number
    desc: number
    created_at: number
    updated_at: number
    visit_count: number
    install_count: number
    visible: number
    is_good: number
    add_by_admin: number
    _all: number
  }


  export type DappsAvgAggregateInputType = {
    visit_count?: true
    install_count?: true
  }

  export type DappsSumAggregateInputType = {
    visit_count?: true
    install_count?: true
  }

  export type DappsMinAggregateInputType = {
    id?: true
    title?: true
    url?: true
    logo?: true
    desc?: true
    created_at?: true
    updated_at?: true
    visit_count?: true
    install_count?: true
    visible?: true
    is_good?: true
    add_by_admin?: true
  }

  export type DappsMaxAggregateInputType = {
    id?: true
    title?: true
    url?: true
    logo?: true
    desc?: true
    created_at?: true
    updated_at?: true
    visit_count?: true
    install_count?: true
    visible?: true
    is_good?: true
    add_by_admin?: true
  }

  export type DappsCountAggregateInputType = {
    id?: true
    title?: true
    url?: true
    logo?: true
    desc?: true
    created_at?: true
    updated_at?: true
    visit_count?: true
    install_count?: true
    visible?: true
    is_good?: true
    add_by_admin?: true
    _all?: true
  }

  export type DappsAggregateArgs = {
    /**
     * Filter which dapps to aggregate.
     * 
    **/
    where?: dappsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of dapps to fetch.
     * 
    **/
    orderBy?: Enumerable<dappsOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: dappsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` dapps from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` dapps.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned dapps
    **/
    _count?: true | DappsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DappsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DappsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DappsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DappsMaxAggregateInputType
  }

  export type GetDappsAggregateType<T extends DappsAggregateArgs> = {
        [P in keyof T & keyof AggregateDapps]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDapps[P]>
      : GetScalarType<T[P], AggregateDapps[P]>
  }




  export type DappsGroupByArgs = {
    where?: dappsWhereInput
    orderBy?: Enumerable<dappsOrderByWithAggregationInput>
    by: Array<DappsScalarFieldEnum>
    having?: dappsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DappsCountAggregateInputType | true
    _avg?: DappsAvgAggregateInputType
    _sum?: DappsSumAggregateInputType
    _min?: DappsMinAggregateInputType
    _max?: DappsMaxAggregateInputType
  }


  export type DappsGroupByOutputType = {
    id: string
    title: string
    url: string
    logo: string | null
    desc: string | null
    created_at: Date
    updated_at: Date | null
    visit_count: number
    install_count: number
    visible: boolean
    is_good: boolean
    add_by_admin: boolean
    _count: DappsCountAggregateOutputType | null
    _avg: DappsAvgAggregateOutputType | null
    _sum: DappsSumAggregateOutputType | null
    _min: DappsMinAggregateOutputType | null
    _max: DappsMaxAggregateOutputType | null
  }

  type GetDappsGroupByPayload<T extends DappsGroupByArgs> = PrismaPromise<
    Array<
      PickArray<DappsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DappsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DappsGroupByOutputType[P]>
            : GetScalarType<T[P], DappsGroupByOutputType[P]>
        }
      >
    >


  export type dappsSelect = {
    id?: boolean
    title?: boolean
    url?: boolean
    logo?: boolean
    desc?: boolean
    created_at?: boolean
    updated_at?: boolean
    visit_count?: boolean
    install_count?: boolean
    visible?: boolean
    is_good?: boolean
    add_by_admin?: boolean
    dapp_categories_relations?: boolean | dapp_categories_relationsFindManyArgs
    story_dapps_relations?: boolean | story_dapps_relationsFindManyArgs
    user_dapps?: boolean | user_dappsFindManyArgs
    _count?: boolean | DappsCountOutputTypeArgs
  }

  export type dappsInclude = {
    dapp_categories_relations?: boolean | dapp_categories_relationsFindManyArgs
    story_dapps_relations?: boolean | story_dapps_relationsFindManyArgs
    user_dapps?: boolean | user_dappsFindManyArgs
    _count?: boolean | DappsCountOutputTypeArgs
  }

  export type dappsGetPayload<
    S extends boolean | null | undefined | dappsArgs,
    U = keyof S
      > = S extends true
        ? dapps
    : S extends undefined
    ? never
    : S extends dappsArgs | dappsFindManyArgs
    ?'include' extends U
    ? dapps  & {
    [P in TrueKeys<S['include']>]:
        P extends 'dapp_categories_relations' ? Array < dapp_categories_relationsGetPayload<S['include'][P]>>  :
        P extends 'story_dapps_relations' ? Array < story_dapps_relationsGetPayload<S['include'][P]>>  :
        P extends 'user_dapps' ? Array < user_dappsGetPayload<S['include'][P]>>  :
        P extends '_count' ? DappsCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'dapp_categories_relations' ? Array < dapp_categories_relationsGetPayload<S['select'][P]>>  :
        P extends 'story_dapps_relations' ? Array < story_dapps_relationsGetPayload<S['select'][P]>>  :
        P extends 'user_dapps' ? Array < user_dappsGetPayload<S['select'][P]>>  :
        P extends '_count' ? DappsCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof dapps ? dapps[P] : never
  } 
    : dapps
  : dapps


  type dappsCountArgs = Merge<
    Omit<dappsFindManyArgs, 'select' | 'include'> & {
      select?: DappsCountAggregateInputType | true
    }
  >

  export interface dappsDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Dapps that matches the filter.
     * @param {dappsFindUniqueArgs} args - Arguments to find a Dapps
     * @example
     * // Get one Dapps
     * const dapps = await prisma.dapps.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends dappsFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, dappsFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'dapps'> extends True ? CheckSelect<T, Prisma__dappsClient<dapps>, Prisma__dappsClient<dappsGetPayload<T>>> : CheckSelect<T, Prisma__dappsClient<dapps | null >, Prisma__dappsClient<dappsGetPayload<T> | null >>

    /**
     * Find the first Dapps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {dappsFindFirstArgs} args - Arguments to find a Dapps
     * @example
     * // Get one Dapps
     * const dapps = await prisma.dapps.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends dappsFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, dappsFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'dapps'> extends True ? CheckSelect<T, Prisma__dappsClient<dapps>, Prisma__dappsClient<dappsGetPayload<T>>> : CheckSelect<T, Prisma__dappsClient<dapps | null >, Prisma__dappsClient<dappsGetPayload<T> | null >>

    /**
     * Find zero or more Dapps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {dappsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Dapps
     * const dapps = await prisma.dapps.findMany()
     * 
     * // Get first 10 Dapps
     * const dapps = await prisma.dapps.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dappsWithIdOnly = await prisma.dapps.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends dappsFindManyArgs>(
      args?: SelectSubset<T, dappsFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<dapps>>, PrismaPromise<Array<dappsGetPayload<T>>>>

    /**
     * Create a Dapps.
     * @param {dappsCreateArgs} args - Arguments to create a Dapps.
     * @example
     * // Create one Dapps
     * const Dapps = await prisma.dapps.create({
     *   data: {
     *     // ... data to create a Dapps
     *   }
     * })
     * 
    **/
    create<T extends dappsCreateArgs>(
      args: SelectSubset<T, dappsCreateArgs>
    ): CheckSelect<T, Prisma__dappsClient<dapps>, Prisma__dappsClient<dappsGetPayload<T>>>

    /**
     * Create many Dapps.
     *     @param {dappsCreateManyArgs} args - Arguments to create many Dapps.
     *     @example
     *     // Create many Dapps
     *     const dapps = await prisma.dapps.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends dappsCreateManyArgs>(
      args?: SelectSubset<T, dappsCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Dapps.
     * @param {dappsDeleteArgs} args - Arguments to delete one Dapps.
     * @example
     * // Delete one Dapps
     * const Dapps = await prisma.dapps.delete({
     *   where: {
     *     // ... filter to delete one Dapps
     *   }
     * })
     * 
    **/
    delete<T extends dappsDeleteArgs>(
      args: SelectSubset<T, dappsDeleteArgs>
    ): CheckSelect<T, Prisma__dappsClient<dapps>, Prisma__dappsClient<dappsGetPayload<T>>>

    /**
     * Update one Dapps.
     * @param {dappsUpdateArgs} args - Arguments to update one Dapps.
     * @example
     * // Update one Dapps
     * const dapps = await prisma.dapps.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends dappsUpdateArgs>(
      args: SelectSubset<T, dappsUpdateArgs>
    ): CheckSelect<T, Prisma__dappsClient<dapps>, Prisma__dappsClient<dappsGetPayload<T>>>

    /**
     * Delete zero or more Dapps.
     * @param {dappsDeleteManyArgs} args - Arguments to filter Dapps to delete.
     * @example
     * // Delete a few Dapps
     * const { count } = await prisma.dapps.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends dappsDeleteManyArgs>(
      args?: SelectSubset<T, dappsDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Dapps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {dappsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Dapps
     * const dapps = await prisma.dapps.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends dappsUpdateManyArgs>(
      args: SelectSubset<T, dappsUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Dapps.
     * @param {dappsUpsertArgs} args - Arguments to update or create a Dapps.
     * @example
     * // Update or create a Dapps
     * const dapps = await prisma.dapps.upsert({
     *   create: {
     *     // ... data to create a Dapps
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Dapps we want to update
     *   }
     * })
    **/
    upsert<T extends dappsUpsertArgs>(
      args: SelectSubset<T, dappsUpsertArgs>
    ): CheckSelect<T, Prisma__dappsClient<dapps>, Prisma__dappsClient<dappsGetPayload<T>>>

    /**
     * Count the number of Dapps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {dappsCountArgs} args - Arguments to filter Dapps to count.
     * @example
     * // Count the number of Dapps
     * const count = await prisma.dapps.count({
     *   where: {
     *     // ... the filter for the Dapps we want to count
     *   }
     * })
    **/
    count<T extends dappsCountArgs>(
      args?: Subset<T, dappsCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DappsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Dapps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DappsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends DappsAggregateArgs>(args: Subset<T, DappsAggregateArgs>): PrismaPromise<GetDappsAggregateType<T>>

    /**
     * Group by Dapps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DappsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends DappsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DappsGroupByArgs['orderBy'] }
        : { orderBy?: DappsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DappsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDappsGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for dapps.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__dappsClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    dapp_categories_relations<T extends dapp_categories_relationsFindManyArgs = {}>(args?: Subset<T, dapp_categories_relationsFindManyArgs>): CheckSelect<T, PrismaPromise<Array<dapp_categories_relations>>, PrismaPromise<Array<dapp_categories_relationsGetPayload<T>>>>;

    story_dapps_relations<T extends story_dapps_relationsFindManyArgs = {}>(args?: Subset<T, story_dapps_relationsFindManyArgs>): CheckSelect<T, PrismaPromise<Array<story_dapps_relations>>, PrismaPromise<Array<story_dapps_relationsGetPayload<T>>>>;

    user_dapps<T extends user_dappsFindManyArgs = {}>(args?: Subset<T, user_dappsFindManyArgs>): CheckSelect<T, PrismaPromise<Array<user_dapps>>, PrismaPromise<Array<user_dappsGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * dapps findUnique
   */
  export type dappsFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the dapps
     * 
    **/
    select?: dappsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: dappsInclude | null
    /**
     * Throw an Error if a dapps can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which dapps to fetch.
     * 
    **/
    where: dappsWhereUniqueInput
  }


  /**
   * dapps findFirst
   */
  export type dappsFindFirstArgs = {
    /**
     * Select specific fields to fetch from the dapps
     * 
    **/
    select?: dappsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: dappsInclude | null
    /**
     * Throw an Error if a dapps can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which dapps to fetch.
     * 
    **/
    where?: dappsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of dapps to fetch.
     * 
    **/
    orderBy?: Enumerable<dappsOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for dapps.
     * 
    **/
    cursor?: dappsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` dapps from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` dapps.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of dapps.
     * 
    **/
    distinct?: Enumerable<DappsScalarFieldEnum>
  }


  /**
   * dapps findMany
   */
  export type dappsFindManyArgs = {
    /**
     * Select specific fields to fetch from the dapps
     * 
    **/
    select?: dappsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: dappsInclude | null
    /**
     * Filter, which dapps to fetch.
     * 
    **/
    where?: dappsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of dapps to fetch.
     * 
    **/
    orderBy?: Enumerable<dappsOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing dapps.
     * 
    **/
    cursor?: dappsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` dapps from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` dapps.
     * 
    **/
    skip?: number
    distinct?: Enumerable<DappsScalarFieldEnum>
  }


  /**
   * dapps create
   */
  export type dappsCreateArgs = {
    /**
     * Select specific fields to fetch from the dapps
     * 
    **/
    select?: dappsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: dappsInclude | null
    /**
     * The data needed to create a dapps.
     * 
    **/
    data: XOR<dappsCreateInput, dappsUncheckedCreateInput>
  }


  /**
   * dapps createMany
   */
  export type dappsCreateManyArgs = {
    /**
     * The data used to create many dapps.
     * 
    **/
    data: Enumerable<dappsCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * dapps update
   */
  export type dappsUpdateArgs = {
    /**
     * Select specific fields to fetch from the dapps
     * 
    **/
    select?: dappsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: dappsInclude | null
    /**
     * The data needed to update a dapps.
     * 
    **/
    data: XOR<dappsUpdateInput, dappsUncheckedUpdateInput>
    /**
     * Choose, which dapps to update.
     * 
    **/
    where: dappsWhereUniqueInput
  }


  /**
   * dapps updateMany
   */
  export type dappsUpdateManyArgs = {
    /**
     * The data used to update dapps.
     * 
    **/
    data: XOR<dappsUpdateManyMutationInput, dappsUncheckedUpdateManyInput>
    /**
     * Filter which dapps to update
     * 
    **/
    where?: dappsWhereInput
  }


  /**
   * dapps upsert
   */
  export type dappsUpsertArgs = {
    /**
     * Select specific fields to fetch from the dapps
     * 
    **/
    select?: dappsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: dappsInclude | null
    /**
     * The filter to search for the dapps to update in case it exists.
     * 
    **/
    where: dappsWhereUniqueInput
    /**
     * In case the dapps found by the `where` argument doesn't exist, create a new dapps with this data.
     * 
    **/
    create: XOR<dappsCreateInput, dappsUncheckedCreateInput>
    /**
     * In case the dapps was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<dappsUpdateInput, dappsUncheckedUpdateInput>
  }


  /**
   * dapps delete
   */
  export type dappsDeleteArgs = {
    /**
     * Select specific fields to fetch from the dapps
     * 
    **/
    select?: dappsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: dappsInclude | null
    /**
     * Filter which dapps to delete.
     * 
    **/
    where: dappsWhereUniqueInput
  }


  /**
   * dapps deleteMany
   */
  export type dappsDeleteManyArgs = {
    /**
     * Filter which dapps to delete
     * 
    **/
    where?: dappsWhereInput
  }


  /**
   * dapps without action
   */
  export type dappsArgs = {
    /**
     * Select specific fields to fetch from the dapps
     * 
    **/
    select?: dappsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: dappsInclude | null
  }



  /**
   * Model dapp_categories
   */


  export type AggregateDapp_categories = {
    _count: Dapp_categoriesCountAggregateOutputType | null
    _avg: Dapp_categoriesAvgAggregateOutputType | null
    _sum: Dapp_categoriesSumAggregateOutputType | null
    _min: Dapp_categoriesMinAggregateOutputType | null
    _max: Dapp_categoriesMaxAggregateOutputType | null
  }

  export type Dapp_categoriesAvgAggregateOutputType = {
    sort: number | null
  }

  export type Dapp_categoriesSumAggregateOutputType = {
    sort: number | null
  }

  export type Dapp_categoriesMinAggregateOutputType = {
    id: string | null
    title: string | null
    desc: string | null
    sort: number | null
    is_deleted: boolean | null
  }

  export type Dapp_categoriesMaxAggregateOutputType = {
    id: string | null
    title: string | null
    desc: string | null
    sort: number | null
    is_deleted: boolean | null
  }

  export type Dapp_categoriesCountAggregateOutputType = {
    id: number
    title: number
    desc: number
    sort: number
    is_deleted: number
    _all: number
  }


  export type Dapp_categoriesAvgAggregateInputType = {
    sort?: true
  }

  export type Dapp_categoriesSumAggregateInputType = {
    sort?: true
  }

  export type Dapp_categoriesMinAggregateInputType = {
    id?: true
    title?: true
    desc?: true
    sort?: true
    is_deleted?: true
  }

  export type Dapp_categoriesMaxAggregateInputType = {
    id?: true
    title?: true
    desc?: true
    sort?: true
    is_deleted?: true
  }

  export type Dapp_categoriesCountAggregateInputType = {
    id?: true
    title?: true
    desc?: true
    sort?: true
    is_deleted?: true
    _all?: true
  }

  export type Dapp_categoriesAggregateArgs = {
    /**
     * Filter which dapp_categories to aggregate.
     * 
    **/
    where?: dapp_categoriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of dapp_categories to fetch.
     * 
    **/
    orderBy?: Enumerable<dapp_categoriesOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: dapp_categoriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` dapp_categories from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` dapp_categories.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned dapp_categories
    **/
    _count?: true | Dapp_categoriesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Dapp_categoriesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Dapp_categoriesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Dapp_categoriesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Dapp_categoriesMaxAggregateInputType
  }

  export type GetDapp_categoriesAggregateType<T extends Dapp_categoriesAggregateArgs> = {
        [P in keyof T & keyof AggregateDapp_categories]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDapp_categories[P]>
      : GetScalarType<T[P], AggregateDapp_categories[P]>
  }




  export type Dapp_categoriesGroupByArgs = {
    where?: dapp_categoriesWhereInput
    orderBy?: Enumerable<dapp_categoriesOrderByWithAggregationInput>
    by: Array<Dapp_categoriesScalarFieldEnum>
    having?: dapp_categoriesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Dapp_categoriesCountAggregateInputType | true
    _avg?: Dapp_categoriesAvgAggregateInputType
    _sum?: Dapp_categoriesSumAggregateInputType
    _min?: Dapp_categoriesMinAggregateInputType
    _max?: Dapp_categoriesMaxAggregateInputType
  }


  export type Dapp_categoriesGroupByOutputType = {
    id: string
    title: string
    desc: string | null
    sort: number
    is_deleted: boolean
    _count: Dapp_categoriesCountAggregateOutputType | null
    _avg: Dapp_categoriesAvgAggregateOutputType | null
    _sum: Dapp_categoriesSumAggregateOutputType | null
    _min: Dapp_categoriesMinAggregateOutputType | null
    _max: Dapp_categoriesMaxAggregateOutputType | null
  }

  type GetDapp_categoriesGroupByPayload<T extends Dapp_categoriesGroupByArgs> = PrismaPromise<
    Array<
      PickArray<Dapp_categoriesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Dapp_categoriesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Dapp_categoriesGroupByOutputType[P]>
            : GetScalarType<T[P], Dapp_categoriesGroupByOutputType[P]>
        }
      >
    >


  export type dapp_categoriesSelect = {
    id?: boolean
    title?: boolean
    desc?: boolean
    sort?: boolean
    is_deleted?: boolean
    dapp_categories_relations?: boolean | dapp_categories_relationsFindManyArgs
    _count?: boolean | Dapp_categoriesCountOutputTypeArgs
  }

  export type dapp_categoriesInclude = {
    dapp_categories_relations?: boolean | dapp_categories_relationsFindManyArgs
    _count?: boolean | Dapp_categoriesCountOutputTypeArgs
  }

  export type dapp_categoriesGetPayload<
    S extends boolean | null | undefined | dapp_categoriesArgs,
    U = keyof S
      > = S extends true
        ? dapp_categories
    : S extends undefined
    ? never
    : S extends dapp_categoriesArgs | dapp_categoriesFindManyArgs
    ?'include' extends U
    ? dapp_categories  & {
    [P in TrueKeys<S['include']>]:
        P extends 'dapp_categories_relations' ? Array < dapp_categories_relationsGetPayload<S['include'][P]>>  :
        P extends '_count' ? Dapp_categoriesCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'dapp_categories_relations' ? Array < dapp_categories_relationsGetPayload<S['select'][P]>>  :
        P extends '_count' ? Dapp_categoriesCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof dapp_categories ? dapp_categories[P] : never
  } 
    : dapp_categories
  : dapp_categories


  type dapp_categoriesCountArgs = Merge<
    Omit<dapp_categoriesFindManyArgs, 'select' | 'include'> & {
      select?: Dapp_categoriesCountAggregateInputType | true
    }
  >

  export interface dapp_categoriesDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Dapp_categories that matches the filter.
     * @param {dapp_categoriesFindUniqueArgs} args - Arguments to find a Dapp_categories
     * @example
     * // Get one Dapp_categories
     * const dapp_categories = await prisma.dapp_categories.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends dapp_categoriesFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, dapp_categoriesFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'dapp_categories'> extends True ? CheckSelect<T, Prisma__dapp_categoriesClient<dapp_categories>, Prisma__dapp_categoriesClient<dapp_categoriesGetPayload<T>>> : CheckSelect<T, Prisma__dapp_categoriesClient<dapp_categories | null >, Prisma__dapp_categoriesClient<dapp_categoriesGetPayload<T> | null >>

    /**
     * Find the first Dapp_categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {dapp_categoriesFindFirstArgs} args - Arguments to find a Dapp_categories
     * @example
     * // Get one Dapp_categories
     * const dapp_categories = await prisma.dapp_categories.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends dapp_categoriesFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, dapp_categoriesFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'dapp_categories'> extends True ? CheckSelect<T, Prisma__dapp_categoriesClient<dapp_categories>, Prisma__dapp_categoriesClient<dapp_categoriesGetPayload<T>>> : CheckSelect<T, Prisma__dapp_categoriesClient<dapp_categories | null >, Prisma__dapp_categoriesClient<dapp_categoriesGetPayload<T> | null >>

    /**
     * Find zero or more Dapp_categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {dapp_categoriesFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Dapp_categories
     * const dapp_categories = await prisma.dapp_categories.findMany()
     * 
     * // Get first 10 Dapp_categories
     * const dapp_categories = await prisma.dapp_categories.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dapp_categoriesWithIdOnly = await prisma.dapp_categories.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends dapp_categoriesFindManyArgs>(
      args?: SelectSubset<T, dapp_categoriesFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<dapp_categories>>, PrismaPromise<Array<dapp_categoriesGetPayload<T>>>>

    /**
     * Create a Dapp_categories.
     * @param {dapp_categoriesCreateArgs} args - Arguments to create a Dapp_categories.
     * @example
     * // Create one Dapp_categories
     * const Dapp_categories = await prisma.dapp_categories.create({
     *   data: {
     *     // ... data to create a Dapp_categories
     *   }
     * })
     * 
    **/
    create<T extends dapp_categoriesCreateArgs>(
      args: SelectSubset<T, dapp_categoriesCreateArgs>
    ): CheckSelect<T, Prisma__dapp_categoriesClient<dapp_categories>, Prisma__dapp_categoriesClient<dapp_categoriesGetPayload<T>>>

    /**
     * Create many Dapp_categories.
     *     @param {dapp_categoriesCreateManyArgs} args - Arguments to create many Dapp_categories.
     *     @example
     *     // Create many Dapp_categories
     *     const dapp_categories = await prisma.dapp_categories.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends dapp_categoriesCreateManyArgs>(
      args?: SelectSubset<T, dapp_categoriesCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Dapp_categories.
     * @param {dapp_categoriesDeleteArgs} args - Arguments to delete one Dapp_categories.
     * @example
     * // Delete one Dapp_categories
     * const Dapp_categories = await prisma.dapp_categories.delete({
     *   where: {
     *     // ... filter to delete one Dapp_categories
     *   }
     * })
     * 
    **/
    delete<T extends dapp_categoriesDeleteArgs>(
      args: SelectSubset<T, dapp_categoriesDeleteArgs>
    ): CheckSelect<T, Prisma__dapp_categoriesClient<dapp_categories>, Prisma__dapp_categoriesClient<dapp_categoriesGetPayload<T>>>

    /**
     * Update one Dapp_categories.
     * @param {dapp_categoriesUpdateArgs} args - Arguments to update one Dapp_categories.
     * @example
     * // Update one Dapp_categories
     * const dapp_categories = await prisma.dapp_categories.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends dapp_categoriesUpdateArgs>(
      args: SelectSubset<T, dapp_categoriesUpdateArgs>
    ): CheckSelect<T, Prisma__dapp_categoriesClient<dapp_categories>, Prisma__dapp_categoriesClient<dapp_categoriesGetPayload<T>>>

    /**
     * Delete zero or more Dapp_categories.
     * @param {dapp_categoriesDeleteManyArgs} args - Arguments to filter Dapp_categories to delete.
     * @example
     * // Delete a few Dapp_categories
     * const { count } = await prisma.dapp_categories.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends dapp_categoriesDeleteManyArgs>(
      args?: SelectSubset<T, dapp_categoriesDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Dapp_categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {dapp_categoriesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Dapp_categories
     * const dapp_categories = await prisma.dapp_categories.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends dapp_categoriesUpdateManyArgs>(
      args: SelectSubset<T, dapp_categoriesUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Dapp_categories.
     * @param {dapp_categoriesUpsertArgs} args - Arguments to update or create a Dapp_categories.
     * @example
     * // Update or create a Dapp_categories
     * const dapp_categories = await prisma.dapp_categories.upsert({
     *   create: {
     *     // ... data to create a Dapp_categories
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Dapp_categories we want to update
     *   }
     * })
    **/
    upsert<T extends dapp_categoriesUpsertArgs>(
      args: SelectSubset<T, dapp_categoriesUpsertArgs>
    ): CheckSelect<T, Prisma__dapp_categoriesClient<dapp_categories>, Prisma__dapp_categoriesClient<dapp_categoriesGetPayload<T>>>

    /**
     * Count the number of Dapp_categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {dapp_categoriesCountArgs} args - Arguments to filter Dapp_categories to count.
     * @example
     * // Count the number of Dapp_categories
     * const count = await prisma.dapp_categories.count({
     *   where: {
     *     // ... the filter for the Dapp_categories we want to count
     *   }
     * })
    **/
    count<T extends dapp_categoriesCountArgs>(
      args?: Subset<T, dapp_categoriesCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Dapp_categoriesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Dapp_categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Dapp_categoriesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Dapp_categoriesAggregateArgs>(args: Subset<T, Dapp_categoriesAggregateArgs>): PrismaPromise<GetDapp_categoriesAggregateType<T>>

    /**
     * Group by Dapp_categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Dapp_categoriesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends Dapp_categoriesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Dapp_categoriesGroupByArgs['orderBy'] }
        : { orderBy?: Dapp_categoriesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, Dapp_categoriesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDapp_categoriesGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for dapp_categories.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__dapp_categoriesClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    dapp_categories_relations<T extends dapp_categories_relationsFindManyArgs = {}>(args?: Subset<T, dapp_categories_relationsFindManyArgs>): CheckSelect<T, PrismaPromise<Array<dapp_categories_relations>>, PrismaPromise<Array<dapp_categories_relationsGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * dapp_categories findUnique
   */
  export type dapp_categoriesFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the dapp_categories
     * 
    **/
    select?: dapp_categoriesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: dapp_categoriesInclude | null
    /**
     * Throw an Error if a dapp_categories can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which dapp_categories to fetch.
     * 
    **/
    where: dapp_categoriesWhereUniqueInput
  }


  /**
   * dapp_categories findFirst
   */
  export type dapp_categoriesFindFirstArgs = {
    /**
     * Select specific fields to fetch from the dapp_categories
     * 
    **/
    select?: dapp_categoriesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: dapp_categoriesInclude | null
    /**
     * Throw an Error if a dapp_categories can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which dapp_categories to fetch.
     * 
    **/
    where?: dapp_categoriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of dapp_categories to fetch.
     * 
    **/
    orderBy?: Enumerable<dapp_categoriesOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for dapp_categories.
     * 
    **/
    cursor?: dapp_categoriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` dapp_categories from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` dapp_categories.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of dapp_categories.
     * 
    **/
    distinct?: Enumerable<Dapp_categoriesScalarFieldEnum>
  }


  /**
   * dapp_categories findMany
   */
  export type dapp_categoriesFindManyArgs = {
    /**
     * Select specific fields to fetch from the dapp_categories
     * 
    **/
    select?: dapp_categoriesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: dapp_categoriesInclude | null
    /**
     * Filter, which dapp_categories to fetch.
     * 
    **/
    where?: dapp_categoriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of dapp_categories to fetch.
     * 
    **/
    orderBy?: Enumerable<dapp_categoriesOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing dapp_categories.
     * 
    **/
    cursor?: dapp_categoriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` dapp_categories from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` dapp_categories.
     * 
    **/
    skip?: number
    distinct?: Enumerable<Dapp_categoriesScalarFieldEnum>
  }


  /**
   * dapp_categories create
   */
  export type dapp_categoriesCreateArgs = {
    /**
     * Select specific fields to fetch from the dapp_categories
     * 
    **/
    select?: dapp_categoriesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: dapp_categoriesInclude | null
    /**
     * The data needed to create a dapp_categories.
     * 
    **/
    data: XOR<dapp_categoriesCreateInput, dapp_categoriesUncheckedCreateInput>
  }


  /**
   * dapp_categories createMany
   */
  export type dapp_categoriesCreateManyArgs = {
    /**
     * The data used to create many dapp_categories.
     * 
    **/
    data: Enumerable<dapp_categoriesCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * dapp_categories update
   */
  export type dapp_categoriesUpdateArgs = {
    /**
     * Select specific fields to fetch from the dapp_categories
     * 
    **/
    select?: dapp_categoriesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: dapp_categoriesInclude | null
    /**
     * The data needed to update a dapp_categories.
     * 
    **/
    data: XOR<dapp_categoriesUpdateInput, dapp_categoriesUncheckedUpdateInput>
    /**
     * Choose, which dapp_categories to update.
     * 
    **/
    where: dapp_categoriesWhereUniqueInput
  }


  /**
   * dapp_categories updateMany
   */
  export type dapp_categoriesUpdateManyArgs = {
    /**
     * The data used to update dapp_categories.
     * 
    **/
    data: XOR<dapp_categoriesUpdateManyMutationInput, dapp_categoriesUncheckedUpdateManyInput>
    /**
     * Filter which dapp_categories to update
     * 
    **/
    where?: dapp_categoriesWhereInput
  }


  /**
   * dapp_categories upsert
   */
  export type dapp_categoriesUpsertArgs = {
    /**
     * Select specific fields to fetch from the dapp_categories
     * 
    **/
    select?: dapp_categoriesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: dapp_categoriesInclude | null
    /**
     * The filter to search for the dapp_categories to update in case it exists.
     * 
    **/
    where: dapp_categoriesWhereUniqueInput
    /**
     * In case the dapp_categories found by the `where` argument doesn't exist, create a new dapp_categories with this data.
     * 
    **/
    create: XOR<dapp_categoriesCreateInput, dapp_categoriesUncheckedCreateInput>
    /**
     * In case the dapp_categories was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<dapp_categoriesUpdateInput, dapp_categoriesUncheckedUpdateInput>
  }


  /**
   * dapp_categories delete
   */
  export type dapp_categoriesDeleteArgs = {
    /**
     * Select specific fields to fetch from the dapp_categories
     * 
    **/
    select?: dapp_categoriesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: dapp_categoriesInclude | null
    /**
     * Filter which dapp_categories to delete.
     * 
    **/
    where: dapp_categoriesWhereUniqueInput
  }


  /**
   * dapp_categories deleteMany
   */
  export type dapp_categoriesDeleteManyArgs = {
    /**
     * Filter which dapp_categories to delete
     * 
    **/
    where?: dapp_categoriesWhereInput
  }


  /**
   * dapp_categories without action
   */
  export type dapp_categoriesArgs = {
    /**
     * Select specific fields to fetch from the dapp_categories
     * 
    **/
    select?: dapp_categoriesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: dapp_categoriesInclude | null
  }



  /**
   * Model dapp_categories_relations
   */


  export type AggregateDapp_categories_relations = {
    _count: Dapp_categories_relationsCountAggregateOutputType | null
    _avg: Dapp_categories_relationsAvgAggregateOutputType | null
    _sum: Dapp_categories_relationsSumAggregateOutputType | null
    _min: Dapp_categories_relationsMinAggregateOutputType | null
    _max: Dapp_categories_relationsMaxAggregateOutputType | null
  }

  export type Dapp_categories_relationsAvgAggregateOutputType = {
    id: number | null
  }

  export type Dapp_categories_relationsSumAggregateOutputType = {
    id: number | null
  }

  export type Dapp_categories_relationsMinAggregateOutputType = {
    id: number | null
    website_category_id: string | null
    subcategory_id: string | null
    dapp_id: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Dapp_categories_relationsMaxAggregateOutputType = {
    id: number | null
    website_category_id: string | null
    subcategory_id: string | null
    dapp_id: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Dapp_categories_relationsCountAggregateOutputType = {
    id: number
    website_category_id: number
    subcategory_id: number
    dapp_id: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type Dapp_categories_relationsAvgAggregateInputType = {
    id?: true
  }

  export type Dapp_categories_relationsSumAggregateInputType = {
    id?: true
  }

  export type Dapp_categories_relationsMinAggregateInputType = {
    id?: true
    website_category_id?: true
    subcategory_id?: true
    dapp_id?: true
    created_at?: true
    updated_at?: true
  }

  export type Dapp_categories_relationsMaxAggregateInputType = {
    id?: true
    website_category_id?: true
    subcategory_id?: true
    dapp_id?: true
    created_at?: true
    updated_at?: true
  }

  export type Dapp_categories_relationsCountAggregateInputType = {
    id?: true
    website_category_id?: true
    subcategory_id?: true
    dapp_id?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type Dapp_categories_relationsAggregateArgs = {
    /**
     * Filter which dapp_categories_relations to aggregate.
     * 
    **/
    where?: dapp_categories_relationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of dapp_categories_relations to fetch.
     * 
    **/
    orderBy?: Enumerable<dapp_categories_relationsOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: dapp_categories_relationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` dapp_categories_relations from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` dapp_categories_relations.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned dapp_categories_relations
    **/
    _count?: true | Dapp_categories_relationsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Dapp_categories_relationsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Dapp_categories_relationsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Dapp_categories_relationsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Dapp_categories_relationsMaxAggregateInputType
  }

  export type GetDapp_categories_relationsAggregateType<T extends Dapp_categories_relationsAggregateArgs> = {
        [P in keyof T & keyof AggregateDapp_categories_relations]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDapp_categories_relations[P]>
      : GetScalarType<T[P], AggregateDapp_categories_relations[P]>
  }




  export type Dapp_categories_relationsGroupByArgs = {
    where?: dapp_categories_relationsWhereInput
    orderBy?: Enumerable<dapp_categories_relationsOrderByWithAggregationInput>
    by: Array<Dapp_categories_relationsScalarFieldEnum>
    having?: dapp_categories_relationsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Dapp_categories_relationsCountAggregateInputType | true
    _avg?: Dapp_categories_relationsAvgAggregateInputType
    _sum?: Dapp_categories_relationsSumAggregateInputType
    _min?: Dapp_categories_relationsMinAggregateInputType
    _max?: Dapp_categories_relationsMaxAggregateInputType
  }


  export type Dapp_categories_relationsGroupByOutputType = {
    id: number
    website_category_id: string
    subcategory_id: string | null
    dapp_id: string
    created_at: Date
    updated_at: Date | null
    _count: Dapp_categories_relationsCountAggregateOutputType | null
    _avg: Dapp_categories_relationsAvgAggregateOutputType | null
    _sum: Dapp_categories_relationsSumAggregateOutputType | null
    _min: Dapp_categories_relationsMinAggregateOutputType | null
    _max: Dapp_categories_relationsMaxAggregateOutputType | null
  }

  type GetDapp_categories_relationsGroupByPayload<T extends Dapp_categories_relationsGroupByArgs> = PrismaPromise<
    Array<
      PickArray<Dapp_categories_relationsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Dapp_categories_relationsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Dapp_categories_relationsGroupByOutputType[P]>
            : GetScalarType<T[P], Dapp_categories_relationsGroupByOutputType[P]>
        }
      >
    >


  export type dapp_categories_relationsSelect = {
    id?: boolean
    dapp_categories?: boolean | dapp_categoriesArgs
    website_category_id?: boolean
    subcategory_id?: boolean
    dapp?: boolean | dappsArgs
    dapp_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type dapp_categories_relationsInclude = {
    dapp_categories?: boolean | dapp_categoriesArgs
    dapp?: boolean | dappsArgs
  }

  export type dapp_categories_relationsGetPayload<
    S extends boolean | null | undefined | dapp_categories_relationsArgs,
    U = keyof S
      > = S extends true
        ? dapp_categories_relations
    : S extends undefined
    ? never
    : S extends dapp_categories_relationsArgs | dapp_categories_relationsFindManyArgs
    ?'include' extends U
    ? dapp_categories_relations  & {
    [P in TrueKeys<S['include']>]:
        P extends 'dapp_categories' ? dapp_categoriesGetPayload<S['include'][P]> :
        P extends 'dapp' ? dappsGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'dapp_categories' ? dapp_categoriesGetPayload<S['select'][P]> :
        P extends 'dapp' ? dappsGetPayload<S['select'][P]> :  P extends keyof dapp_categories_relations ? dapp_categories_relations[P] : never
  } 
    : dapp_categories_relations
  : dapp_categories_relations


  type dapp_categories_relationsCountArgs = Merge<
    Omit<dapp_categories_relationsFindManyArgs, 'select' | 'include'> & {
      select?: Dapp_categories_relationsCountAggregateInputType | true
    }
  >

  export interface dapp_categories_relationsDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Dapp_categories_relations that matches the filter.
     * @param {dapp_categories_relationsFindUniqueArgs} args - Arguments to find a Dapp_categories_relations
     * @example
     * // Get one Dapp_categories_relations
     * const dapp_categories_relations = await prisma.dapp_categories_relations.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends dapp_categories_relationsFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, dapp_categories_relationsFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'dapp_categories_relations'> extends True ? CheckSelect<T, Prisma__dapp_categories_relationsClient<dapp_categories_relations>, Prisma__dapp_categories_relationsClient<dapp_categories_relationsGetPayload<T>>> : CheckSelect<T, Prisma__dapp_categories_relationsClient<dapp_categories_relations | null >, Prisma__dapp_categories_relationsClient<dapp_categories_relationsGetPayload<T> | null >>

    /**
     * Find the first Dapp_categories_relations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {dapp_categories_relationsFindFirstArgs} args - Arguments to find a Dapp_categories_relations
     * @example
     * // Get one Dapp_categories_relations
     * const dapp_categories_relations = await prisma.dapp_categories_relations.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends dapp_categories_relationsFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, dapp_categories_relationsFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'dapp_categories_relations'> extends True ? CheckSelect<T, Prisma__dapp_categories_relationsClient<dapp_categories_relations>, Prisma__dapp_categories_relationsClient<dapp_categories_relationsGetPayload<T>>> : CheckSelect<T, Prisma__dapp_categories_relationsClient<dapp_categories_relations | null >, Prisma__dapp_categories_relationsClient<dapp_categories_relationsGetPayload<T> | null >>

    /**
     * Find zero or more Dapp_categories_relations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {dapp_categories_relationsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Dapp_categories_relations
     * const dapp_categories_relations = await prisma.dapp_categories_relations.findMany()
     * 
     * // Get first 10 Dapp_categories_relations
     * const dapp_categories_relations = await prisma.dapp_categories_relations.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dapp_categories_relationsWithIdOnly = await prisma.dapp_categories_relations.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends dapp_categories_relationsFindManyArgs>(
      args?: SelectSubset<T, dapp_categories_relationsFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<dapp_categories_relations>>, PrismaPromise<Array<dapp_categories_relationsGetPayload<T>>>>

    /**
     * Create a Dapp_categories_relations.
     * @param {dapp_categories_relationsCreateArgs} args - Arguments to create a Dapp_categories_relations.
     * @example
     * // Create one Dapp_categories_relations
     * const Dapp_categories_relations = await prisma.dapp_categories_relations.create({
     *   data: {
     *     // ... data to create a Dapp_categories_relations
     *   }
     * })
     * 
    **/
    create<T extends dapp_categories_relationsCreateArgs>(
      args: SelectSubset<T, dapp_categories_relationsCreateArgs>
    ): CheckSelect<T, Prisma__dapp_categories_relationsClient<dapp_categories_relations>, Prisma__dapp_categories_relationsClient<dapp_categories_relationsGetPayload<T>>>

    /**
     * Create many Dapp_categories_relations.
     *     @param {dapp_categories_relationsCreateManyArgs} args - Arguments to create many Dapp_categories_relations.
     *     @example
     *     // Create many Dapp_categories_relations
     *     const dapp_categories_relations = await prisma.dapp_categories_relations.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends dapp_categories_relationsCreateManyArgs>(
      args?: SelectSubset<T, dapp_categories_relationsCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Dapp_categories_relations.
     * @param {dapp_categories_relationsDeleteArgs} args - Arguments to delete one Dapp_categories_relations.
     * @example
     * // Delete one Dapp_categories_relations
     * const Dapp_categories_relations = await prisma.dapp_categories_relations.delete({
     *   where: {
     *     // ... filter to delete one Dapp_categories_relations
     *   }
     * })
     * 
    **/
    delete<T extends dapp_categories_relationsDeleteArgs>(
      args: SelectSubset<T, dapp_categories_relationsDeleteArgs>
    ): CheckSelect<T, Prisma__dapp_categories_relationsClient<dapp_categories_relations>, Prisma__dapp_categories_relationsClient<dapp_categories_relationsGetPayload<T>>>

    /**
     * Update one Dapp_categories_relations.
     * @param {dapp_categories_relationsUpdateArgs} args - Arguments to update one Dapp_categories_relations.
     * @example
     * // Update one Dapp_categories_relations
     * const dapp_categories_relations = await prisma.dapp_categories_relations.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends dapp_categories_relationsUpdateArgs>(
      args: SelectSubset<T, dapp_categories_relationsUpdateArgs>
    ): CheckSelect<T, Prisma__dapp_categories_relationsClient<dapp_categories_relations>, Prisma__dapp_categories_relationsClient<dapp_categories_relationsGetPayload<T>>>

    /**
     * Delete zero or more Dapp_categories_relations.
     * @param {dapp_categories_relationsDeleteManyArgs} args - Arguments to filter Dapp_categories_relations to delete.
     * @example
     * // Delete a few Dapp_categories_relations
     * const { count } = await prisma.dapp_categories_relations.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends dapp_categories_relationsDeleteManyArgs>(
      args?: SelectSubset<T, dapp_categories_relationsDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Dapp_categories_relations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {dapp_categories_relationsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Dapp_categories_relations
     * const dapp_categories_relations = await prisma.dapp_categories_relations.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends dapp_categories_relationsUpdateManyArgs>(
      args: SelectSubset<T, dapp_categories_relationsUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Dapp_categories_relations.
     * @param {dapp_categories_relationsUpsertArgs} args - Arguments to update or create a Dapp_categories_relations.
     * @example
     * // Update or create a Dapp_categories_relations
     * const dapp_categories_relations = await prisma.dapp_categories_relations.upsert({
     *   create: {
     *     // ... data to create a Dapp_categories_relations
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Dapp_categories_relations we want to update
     *   }
     * })
    **/
    upsert<T extends dapp_categories_relationsUpsertArgs>(
      args: SelectSubset<T, dapp_categories_relationsUpsertArgs>
    ): CheckSelect<T, Prisma__dapp_categories_relationsClient<dapp_categories_relations>, Prisma__dapp_categories_relationsClient<dapp_categories_relationsGetPayload<T>>>

    /**
     * Count the number of Dapp_categories_relations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {dapp_categories_relationsCountArgs} args - Arguments to filter Dapp_categories_relations to count.
     * @example
     * // Count the number of Dapp_categories_relations
     * const count = await prisma.dapp_categories_relations.count({
     *   where: {
     *     // ... the filter for the Dapp_categories_relations we want to count
     *   }
     * })
    **/
    count<T extends dapp_categories_relationsCountArgs>(
      args?: Subset<T, dapp_categories_relationsCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Dapp_categories_relationsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Dapp_categories_relations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Dapp_categories_relationsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Dapp_categories_relationsAggregateArgs>(args: Subset<T, Dapp_categories_relationsAggregateArgs>): PrismaPromise<GetDapp_categories_relationsAggregateType<T>>

    /**
     * Group by Dapp_categories_relations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Dapp_categories_relationsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends Dapp_categories_relationsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Dapp_categories_relationsGroupByArgs['orderBy'] }
        : { orderBy?: Dapp_categories_relationsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, Dapp_categories_relationsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDapp_categories_relationsGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for dapp_categories_relations.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__dapp_categories_relationsClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    dapp_categories<T extends dapp_categoriesArgs = {}>(args?: Subset<T, dapp_categoriesArgs>): CheckSelect<T, Prisma__dapp_categoriesClient<dapp_categories | null >, Prisma__dapp_categoriesClient<dapp_categoriesGetPayload<T> | null >>;

    dapp<T extends dappsArgs = {}>(args?: Subset<T, dappsArgs>): CheckSelect<T, Prisma__dappsClient<dapps | null >, Prisma__dappsClient<dappsGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * dapp_categories_relations findUnique
   */
  export type dapp_categories_relationsFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the dapp_categories_relations
     * 
    **/
    select?: dapp_categories_relationsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: dapp_categories_relationsInclude | null
    /**
     * Throw an Error if a dapp_categories_relations can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which dapp_categories_relations to fetch.
     * 
    **/
    where: dapp_categories_relationsWhereUniqueInput
  }


  /**
   * dapp_categories_relations findFirst
   */
  export type dapp_categories_relationsFindFirstArgs = {
    /**
     * Select specific fields to fetch from the dapp_categories_relations
     * 
    **/
    select?: dapp_categories_relationsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: dapp_categories_relationsInclude | null
    /**
     * Throw an Error if a dapp_categories_relations can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which dapp_categories_relations to fetch.
     * 
    **/
    where?: dapp_categories_relationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of dapp_categories_relations to fetch.
     * 
    **/
    orderBy?: Enumerable<dapp_categories_relationsOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for dapp_categories_relations.
     * 
    **/
    cursor?: dapp_categories_relationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` dapp_categories_relations from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` dapp_categories_relations.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of dapp_categories_relations.
     * 
    **/
    distinct?: Enumerable<Dapp_categories_relationsScalarFieldEnum>
  }


  /**
   * dapp_categories_relations findMany
   */
  export type dapp_categories_relationsFindManyArgs = {
    /**
     * Select specific fields to fetch from the dapp_categories_relations
     * 
    **/
    select?: dapp_categories_relationsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: dapp_categories_relationsInclude | null
    /**
     * Filter, which dapp_categories_relations to fetch.
     * 
    **/
    where?: dapp_categories_relationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of dapp_categories_relations to fetch.
     * 
    **/
    orderBy?: Enumerable<dapp_categories_relationsOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing dapp_categories_relations.
     * 
    **/
    cursor?: dapp_categories_relationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` dapp_categories_relations from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` dapp_categories_relations.
     * 
    **/
    skip?: number
    distinct?: Enumerable<Dapp_categories_relationsScalarFieldEnum>
  }


  /**
   * dapp_categories_relations create
   */
  export type dapp_categories_relationsCreateArgs = {
    /**
     * Select specific fields to fetch from the dapp_categories_relations
     * 
    **/
    select?: dapp_categories_relationsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: dapp_categories_relationsInclude | null
    /**
     * The data needed to create a dapp_categories_relations.
     * 
    **/
    data: XOR<dapp_categories_relationsCreateInput, dapp_categories_relationsUncheckedCreateInput>
  }


  /**
   * dapp_categories_relations createMany
   */
  export type dapp_categories_relationsCreateManyArgs = {
    /**
     * The data used to create many dapp_categories_relations.
     * 
    **/
    data: Enumerable<dapp_categories_relationsCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * dapp_categories_relations update
   */
  export type dapp_categories_relationsUpdateArgs = {
    /**
     * Select specific fields to fetch from the dapp_categories_relations
     * 
    **/
    select?: dapp_categories_relationsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: dapp_categories_relationsInclude | null
    /**
     * The data needed to update a dapp_categories_relations.
     * 
    **/
    data: XOR<dapp_categories_relationsUpdateInput, dapp_categories_relationsUncheckedUpdateInput>
    /**
     * Choose, which dapp_categories_relations to update.
     * 
    **/
    where: dapp_categories_relationsWhereUniqueInput
  }


  /**
   * dapp_categories_relations updateMany
   */
  export type dapp_categories_relationsUpdateManyArgs = {
    /**
     * The data used to update dapp_categories_relations.
     * 
    **/
    data: XOR<dapp_categories_relationsUpdateManyMutationInput, dapp_categories_relationsUncheckedUpdateManyInput>
    /**
     * Filter which dapp_categories_relations to update
     * 
    **/
    where?: dapp_categories_relationsWhereInput
  }


  /**
   * dapp_categories_relations upsert
   */
  export type dapp_categories_relationsUpsertArgs = {
    /**
     * Select specific fields to fetch from the dapp_categories_relations
     * 
    **/
    select?: dapp_categories_relationsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: dapp_categories_relationsInclude | null
    /**
     * The filter to search for the dapp_categories_relations to update in case it exists.
     * 
    **/
    where: dapp_categories_relationsWhereUniqueInput
    /**
     * In case the dapp_categories_relations found by the `where` argument doesn't exist, create a new dapp_categories_relations with this data.
     * 
    **/
    create: XOR<dapp_categories_relationsCreateInput, dapp_categories_relationsUncheckedCreateInput>
    /**
     * In case the dapp_categories_relations was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<dapp_categories_relationsUpdateInput, dapp_categories_relationsUncheckedUpdateInput>
  }


  /**
   * dapp_categories_relations delete
   */
  export type dapp_categories_relationsDeleteArgs = {
    /**
     * Select specific fields to fetch from the dapp_categories_relations
     * 
    **/
    select?: dapp_categories_relationsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: dapp_categories_relationsInclude | null
    /**
     * Filter which dapp_categories_relations to delete.
     * 
    **/
    where: dapp_categories_relationsWhereUniqueInput
  }


  /**
   * dapp_categories_relations deleteMany
   */
  export type dapp_categories_relationsDeleteManyArgs = {
    /**
     * Filter which dapp_categories_relations to delete
     * 
    **/
    where?: dapp_categories_relationsWhereInput
  }


  /**
   * dapp_categories_relations without action
   */
  export type dapp_categories_relationsArgs = {
    /**
     * Select specific fields to fetch from the dapp_categories_relations
     * 
    **/
    select?: dapp_categories_relationsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: dapp_categories_relationsInclude | null
  }



  /**
   * Model user_dapps
   */


  export type AggregateUser_dapps = {
    _count: User_dappsCountAggregateOutputType | null
    _min: User_dappsMinAggregateOutputType | null
    _max: User_dappsMaxAggregateOutputType | null
  }

  export type User_dappsMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    dapp_id: string | null
    created_at: Date | null
    updated_at: Date | null
    user_dapps_catogories_id: string | null
  }

  export type User_dappsMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    dapp_id: string | null
    created_at: Date | null
    updated_at: Date | null
    user_dapps_catogories_id: string | null
  }

  export type User_dappsCountAggregateOutputType = {
    id: number
    user_id: number
    dapp_id: number
    created_at: number
    updated_at: number
    user_dapps_catogories_id: number
    _all: number
  }


  export type User_dappsMinAggregateInputType = {
    id?: true
    user_id?: true
    dapp_id?: true
    created_at?: true
    updated_at?: true
    user_dapps_catogories_id?: true
  }

  export type User_dappsMaxAggregateInputType = {
    id?: true
    user_id?: true
    dapp_id?: true
    created_at?: true
    updated_at?: true
    user_dapps_catogories_id?: true
  }

  export type User_dappsCountAggregateInputType = {
    id?: true
    user_id?: true
    dapp_id?: true
    created_at?: true
    updated_at?: true
    user_dapps_catogories_id?: true
    _all?: true
  }

  export type User_dappsAggregateArgs = {
    /**
     * Filter which user_dapps to aggregate.
     * 
    **/
    where?: user_dappsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_dapps to fetch.
     * 
    **/
    orderBy?: Enumerable<user_dappsOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: user_dappsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_dapps from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_dapps.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned user_dapps
    **/
    _count?: true | User_dappsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: User_dappsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: User_dappsMaxAggregateInputType
  }

  export type GetUser_dappsAggregateType<T extends User_dappsAggregateArgs> = {
        [P in keyof T & keyof AggregateUser_dapps]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser_dapps[P]>
      : GetScalarType<T[P], AggregateUser_dapps[P]>
  }




  export type User_dappsGroupByArgs = {
    where?: user_dappsWhereInput
    orderBy?: Enumerable<user_dappsOrderByWithAggregationInput>
    by: Array<User_dappsScalarFieldEnum>
    having?: user_dappsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: User_dappsCountAggregateInputType | true
    _min?: User_dappsMinAggregateInputType
    _max?: User_dappsMaxAggregateInputType
  }


  export type User_dappsGroupByOutputType = {
    id: string
    user_id: string
    dapp_id: string
    created_at: Date
    updated_at: Date | null
    user_dapps_catogories_id: string | null
    _count: User_dappsCountAggregateOutputType | null
    _min: User_dappsMinAggregateOutputType | null
    _max: User_dappsMaxAggregateOutputType | null
  }

  type GetUser_dappsGroupByPayload<T extends User_dappsGroupByArgs> = PrismaPromise<
    Array<
      PickArray<User_dappsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof User_dappsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], User_dappsGroupByOutputType[P]>
            : GetScalarType<T[P], User_dappsGroupByOutputType[P]>
        }
      >
    >


  export type user_dappsSelect = {
    id?: boolean
    user_id?: boolean
    dapp_id?: boolean
    dapp?: boolean | dappsArgs
    user?: boolean | usersArgs
    created_at?: boolean
    updated_at?: boolean
    user_dapps_catogories_id?: boolean
    user_dapps_catogories?: boolean | user_dapps_catogoriesArgs
  }

  export type user_dappsInclude = {
    dapp?: boolean | dappsArgs
    user?: boolean | usersArgs
    user_dapps_catogories?: boolean | user_dapps_catogoriesArgs
  }

  export type user_dappsGetPayload<
    S extends boolean | null | undefined | user_dappsArgs,
    U = keyof S
      > = S extends true
        ? user_dapps
    : S extends undefined
    ? never
    : S extends user_dappsArgs | user_dappsFindManyArgs
    ?'include' extends U
    ? user_dapps  & {
    [P in TrueKeys<S['include']>]:
        P extends 'dapp' ? dappsGetPayload<S['include'][P]> :
        P extends 'user' ? usersGetPayload<S['include'][P]> :
        P extends 'user_dapps_catogories' ? user_dapps_catogoriesGetPayload<S['include'][P]> | null :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'dapp' ? dappsGetPayload<S['select'][P]> :
        P extends 'user' ? usersGetPayload<S['select'][P]> :
        P extends 'user_dapps_catogories' ? user_dapps_catogoriesGetPayload<S['select'][P]> | null :  P extends keyof user_dapps ? user_dapps[P] : never
  } 
    : user_dapps
  : user_dapps


  type user_dappsCountArgs = Merge<
    Omit<user_dappsFindManyArgs, 'select' | 'include'> & {
      select?: User_dappsCountAggregateInputType | true
    }
  >

  export interface user_dappsDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one User_dapps that matches the filter.
     * @param {user_dappsFindUniqueArgs} args - Arguments to find a User_dapps
     * @example
     * // Get one User_dapps
     * const user_dapps = await prisma.user_dapps.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends user_dappsFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, user_dappsFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'user_dapps'> extends True ? CheckSelect<T, Prisma__user_dappsClient<user_dapps>, Prisma__user_dappsClient<user_dappsGetPayload<T>>> : CheckSelect<T, Prisma__user_dappsClient<user_dapps | null >, Prisma__user_dappsClient<user_dappsGetPayload<T> | null >>

    /**
     * Find the first User_dapps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_dappsFindFirstArgs} args - Arguments to find a User_dapps
     * @example
     * // Get one User_dapps
     * const user_dapps = await prisma.user_dapps.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends user_dappsFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, user_dappsFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'user_dapps'> extends True ? CheckSelect<T, Prisma__user_dappsClient<user_dapps>, Prisma__user_dappsClient<user_dappsGetPayload<T>>> : CheckSelect<T, Prisma__user_dappsClient<user_dapps | null >, Prisma__user_dappsClient<user_dappsGetPayload<T> | null >>

    /**
     * Find zero or more User_dapps that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_dappsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all User_dapps
     * const user_dapps = await prisma.user_dapps.findMany()
     * 
     * // Get first 10 User_dapps
     * const user_dapps = await prisma.user_dapps.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const user_dappsWithIdOnly = await prisma.user_dapps.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends user_dappsFindManyArgs>(
      args?: SelectSubset<T, user_dappsFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<user_dapps>>, PrismaPromise<Array<user_dappsGetPayload<T>>>>

    /**
     * Create a User_dapps.
     * @param {user_dappsCreateArgs} args - Arguments to create a User_dapps.
     * @example
     * // Create one User_dapps
     * const User_dapps = await prisma.user_dapps.create({
     *   data: {
     *     // ... data to create a User_dapps
     *   }
     * })
     * 
    **/
    create<T extends user_dappsCreateArgs>(
      args: SelectSubset<T, user_dappsCreateArgs>
    ): CheckSelect<T, Prisma__user_dappsClient<user_dapps>, Prisma__user_dappsClient<user_dappsGetPayload<T>>>

    /**
     * Create many User_dapps.
     *     @param {user_dappsCreateManyArgs} args - Arguments to create many User_dapps.
     *     @example
     *     // Create many User_dapps
     *     const user_dapps = await prisma.user_dapps.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends user_dappsCreateManyArgs>(
      args?: SelectSubset<T, user_dappsCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a User_dapps.
     * @param {user_dappsDeleteArgs} args - Arguments to delete one User_dapps.
     * @example
     * // Delete one User_dapps
     * const User_dapps = await prisma.user_dapps.delete({
     *   where: {
     *     // ... filter to delete one User_dapps
     *   }
     * })
     * 
    **/
    delete<T extends user_dappsDeleteArgs>(
      args: SelectSubset<T, user_dappsDeleteArgs>
    ): CheckSelect<T, Prisma__user_dappsClient<user_dapps>, Prisma__user_dappsClient<user_dappsGetPayload<T>>>

    /**
     * Update one User_dapps.
     * @param {user_dappsUpdateArgs} args - Arguments to update one User_dapps.
     * @example
     * // Update one User_dapps
     * const user_dapps = await prisma.user_dapps.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends user_dappsUpdateArgs>(
      args: SelectSubset<T, user_dappsUpdateArgs>
    ): CheckSelect<T, Prisma__user_dappsClient<user_dapps>, Prisma__user_dappsClient<user_dappsGetPayload<T>>>

    /**
     * Delete zero or more User_dapps.
     * @param {user_dappsDeleteManyArgs} args - Arguments to filter User_dapps to delete.
     * @example
     * // Delete a few User_dapps
     * const { count } = await prisma.user_dapps.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends user_dappsDeleteManyArgs>(
      args?: SelectSubset<T, user_dappsDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more User_dapps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_dappsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many User_dapps
     * const user_dapps = await prisma.user_dapps.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends user_dappsUpdateManyArgs>(
      args: SelectSubset<T, user_dappsUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one User_dapps.
     * @param {user_dappsUpsertArgs} args - Arguments to update or create a User_dapps.
     * @example
     * // Update or create a User_dapps
     * const user_dapps = await prisma.user_dapps.upsert({
     *   create: {
     *     // ... data to create a User_dapps
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User_dapps we want to update
     *   }
     * })
    **/
    upsert<T extends user_dappsUpsertArgs>(
      args: SelectSubset<T, user_dappsUpsertArgs>
    ): CheckSelect<T, Prisma__user_dappsClient<user_dapps>, Prisma__user_dappsClient<user_dappsGetPayload<T>>>

    /**
     * Count the number of User_dapps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_dappsCountArgs} args - Arguments to filter User_dapps to count.
     * @example
     * // Count the number of User_dapps
     * const count = await prisma.user_dapps.count({
     *   where: {
     *     // ... the filter for the User_dapps we want to count
     *   }
     * })
    **/
    count<T extends user_dappsCountArgs>(
      args?: Subset<T, user_dappsCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], User_dappsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User_dapps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {User_dappsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends User_dappsAggregateArgs>(args: Subset<T, User_dappsAggregateArgs>): PrismaPromise<GetUser_dappsAggregateType<T>>

    /**
     * Group by User_dapps.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {User_dappsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends User_dappsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: User_dappsGroupByArgs['orderBy'] }
        : { orderBy?: User_dappsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, User_dappsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUser_dappsGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for user_dapps.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__user_dappsClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    dapp<T extends dappsArgs = {}>(args?: Subset<T, dappsArgs>): CheckSelect<T, Prisma__dappsClient<dapps | null >, Prisma__dappsClient<dappsGetPayload<T> | null >>;

    user<T extends usersArgs = {}>(args?: Subset<T, usersArgs>): CheckSelect<T, Prisma__usersClient<users | null >, Prisma__usersClient<usersGetPayload<T> | null >>;

    user_dapps_catogories<T extends user_dapps_catogoriesArgs = {}>(args?: Subset<T, user_dapps_catogoriesArgs>): CheckSelect<T, Prisma__user_dapps_catogoriesClient<user_dapps_catogories | null >, Prisma__user_dapps_catogoriesClient<user_dapps_catogoriesGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * user_dapps findUnique
   */
  export type user_dappsFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the user_dapps
     * 
    **/
    select?: user_dappsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: user_dappsInclude | null
    /**
     * Throw an Error if a user_dapps can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which user_dapps to fetch.
     * 
    **/
    where: user_dappsWhereUniqueInput
  }


  /**
   * user_dapps findFirst
   */
  export type user_dappsFindFirstArgs = {
    /**
     * Select specific fields to fetch from the user_dapps
     * 
    **/
    select?: user_dappsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: user_dappsInclude | null
    /**
     * Throw an Error if a user_dapps can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which user_dapps to fetch.
     * 
    **/
    where?: user_dappsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_dapps to fetch.
     * 
    **/
    orderBy?: Enumerable<user_dappsOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for user_dapps.
     * 
    **/
    cursor?: user_dappsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_dapps from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_dapps.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of user_dapps.
     * 
    **/
    distinct?: Enumerable<User_dappsScalarFieldEnum>
  }


  /**
   * user_dapps findMany
   */
  export type user_dappsFindManyArgs = {
    /**
     * Select specific fields to fetch from the user_dapps
     * 
    **/
    select?: user_dappsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: user_dappsInclude | null
    /**
     * Filter, which user_dapps to fetch.
     * 
    **/
    where?: user_dappsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_dapps to fetch.
     * 
    **/
    orderBy?: Enumerable<user_dappsOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing user_dapps.
     * 
    **/
    cursor?: user_dappsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_dapps from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_dapps.
     * 
    **/
    skip?: number
    distinct?: Enumerable<User_dappsScalarFieldEnum>
  }


  /**
   * user_dapps create
   */
  export type user_dappsCreateArgs = {
    /**
     * Select specific fields to fetch from the user_dapps
     * 
    **/
    select?: user_dappsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: user_dappsInclude | null
    /**
     * The data needed to create a user_dapps.
     * 
    **/
    data: XOR<user_dappsCreateInput, user_dappsUncheckedCreateInput>
  }


  /**
   * user_dapps createMany
   */
  export type user_dappsCreateManyArgs = {
    /**
     * The data used to create many user_dapps.
     * 
    **/
    data: Enumerable<user_dappsCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * user_dapps update
   */
  export type user_dappsUpdateArgs = {
    /**
     * Select specific fields to fetch from the user_dapps
     * 
    **/
    select?: user_dappsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: user_dappsInclude | null
    /**
     * The data needed to update a user_dapps.
     * 
    **/
    data: XOR<user_dappsUpdateInput, user_dappsUncheckedUpdateInput>
    /**
     * Choose, which user_dapps to update.
     * 
    **/
    where: user_dappsWhereUniqueInput
  }


  /**
   * user_dapps updateMany
   */
  export type user_dappsUpdateManyArgs = {
    /**
     * The data used to update user_dapps.
     * 
    **/
    data: XOR<user_dappsUpdateManyMutationInput, user_dappsUncheckedUpdateManyInput>
    /**
     * Filter which user_dapps to update
     * 
    **/
    where?: user_dappsWhereInput
  }


  /**
   * user_dapps upsert
   */
  export type user_dappsUpsertArgs = {
    /**
     * Select specific fields to fetch from the user_dapps
     * 
    **/
    select?: user_dappsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: user_dappsInclude | null
    /**
     * The filter to search for the user_dapps to update in case it exists.
     * 
    **/
    where: user_dappsWhereUniqueInput
    /**
     * In case the user_dapps found by the `where` argument doesn't exist, create a new user_dapps with this data.
     * 
    **/
    create: XOR<user_dappsCreateInput, user_dappsUncheckedCreateInput>
    /**
     * In case the user_dapps was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<user_dappsUpdateInput, user_dappsUncheckedUpdateInput>
  }


  /**
   * user_dapps delete
   */
  export type user_dappsDeleteArgs = {
    /**
     * Select specific fields to fetch from the user_dapps
     * 
    **/
    select?: user_dappsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: user_dappsInclude | null
    /**
     * Filter which user_dapps to delete.
     * 
    **/
    where: user_dappsWhereUniqueInput
  }


  /**
   * user_dapps deleteMany
   */
  export type user_dappsDeleteManyArgs = {
    /**
     * Filter which user_dapps to delete
     * 
    **/
    where?: user_dappsWhereInput
  }


  /**
   * user_dapps without action
   */
  export type user_dappsArgs = {
    /**
     * Select specific fields to fetch from the user_dapps
     * 
    **/
    select?: user_dappsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: user_dappsInclude | null
  }



  /**
   * Model user_dapps_catogories
   */


  export type AggregateUser_dapps_catogories = {
    _count: User_dapps_catogoriesCountAggregateOutputType | null
    _avg: User_dapps_catogoriesAvgAggregateOutputType | null
    _sum: User_dapps_catogoriesSumAggregateOutputType | null
    _min: User_dapps_catogoriesMinAggregateOutputType | null
    _max: User_dapps_catogoriesMaxAggregateOutputType | null
  }

  export type User_dapps_catogoriesAvgAggregateOutputType = {
    sort: number | null
  }

  export type User_dapps_catogoriesSumAggregateOutputType = {
    sort: number | null
  }

  export type User_dapps_catogoriesMinAggregateOutputType = {
    id: string | null
    title: string | null
    desc: string | null
    sort: number | null
    created_at: Date | null
    updated_at: Date | null
    user_id: string | null
  }

  export type User_dapps_catogoriesMaxAggregateOutputType = {
    id: string | null
    title: string | null
    desc: string | null
    sort: number | null
    created_at: Date | null
    updated_at: Date | null
    user_id: string | null
  }

  export type User_dapps_catogoriesCountAggregateOutputType = {
    id: number
    title: number
    desc: number
    sort: number
    created_at: number
    updated_at: number
    user_id: number
    _all: number
  }


  export type User_dapps_catogoriesAvgAggregateInputType = {
    sort?: true
  }

  export type User_dapps_catogoriesSumAggregateInputType = {
    sort?: true
  }

  export type User_dapps_catogoriesMinAggregateInputType = {
    id?: true
    title?: true
    desc?: true
    sort?: true
    created_at?: true
    updated_at?: true
    user_id?: true
  }

  export type User_dapps_catogoriesMaxAggregateInputType = {
    id?: true
    title?: true
    desc?: true
    sort?: true
    created_at?: true
    updated_at?: true
    user_id?: true
  }

  export type User_dapps_catogoriesCountAggregateInputType = {
    id?: true
    title?: true
    desc?: true
    sort?: true
    created_at?: true
    updated_at?: true
    user_id?: true
    _all?: true
  }

  export type User_dapps_catogoriesAggregateArgs = {
    /**
     * Filter which user_dapps_catogories to aggregate.
     * 
    **/
    where?: user_dapps_catogoriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_dapps_catogories to fetch.
     * 
    **/
    orderBy?: Enumerable<user_dapps_catogoriesOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: user_dapps_catogoriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_dapps_catogories from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_dapps_catogories.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned user_dapps_catogories
    **/
    _count?: true | User_dapps_catogoriesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: User_dapps_catogoriesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: User_dapps_catogoriesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: User_dapps_catogoriesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: User_dapps_catogoriesMaxAggregateInputType
  }

  export type GetUser_dapps_catogoriesAggregateType<T extends User_dapps_catogoriesAggregateArgs> = {
        [P in keyof T & keyof AggregateUser_dapps_catogories]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser_dapps_catogories[P]>
      : GetScalarType<T[P], AggregateUser_dapps_catogories[P]>
  }




  export type User_dapps_catogoriesGroupByArgs = {
    where?: user_dapps_catogoriesWhereInput
    orderBy?: Enumerable<user_dapps_catogoriesOrderByWithAggregationInput>
    by: Array<User_dapps_catogoriesScalarFieldEnum>
    having?: user_dapps_catogoriesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: User_dapps_catogoriesCountAggregateInputType | true
    _avg?: User_dapps_catogoriesAvgAggregateInputType
    _sum?: User_dapps_catogoriesSumAggregateInputType
    _min?: User_dapps_catogoriesMinAggregateInputType
    _max?: User_dapps_catogoriesMaxAggregateInputType
  }


  export type User_dapps_catogoriesGroupByOutputType = {
    id: string
    title: string
    desc: string | null
    sort: number
    created_at: Date
    updated_at: Date | null
    user_id: string
    _count: User_dapps_catogoriesCountAggregateOutputType | null
    _avg: User_dapps_catogoriesAvgAggregateOutputType | null
    _sum: User_dapps_catogoriesSumAggregateOutputType | null
    _min: User_dapps_catogoriesMinAggregateOutputType | null
    _max: User_dapps_catogoriesMaxAggregateOutputType | null
  }

  type GetUser_dapps_catogoriesGroupByPayload<T extends User_dapps_catogoriesGroupByArgs> = PrismaPromise<
    Array<
      PickArray<User_dapps_catogoriesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof User_dapps_catogoriesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], User_dapps_catogoriesGroupByOutputType[P]>
            : GetScalarType<T[P], User_dapps_catogoriesGroupByOutputType[P]>
        }
      >
    >


  export type user_dapps_catogoriesSelect = {
    id?: boolean
    title?: boolean
    desc?: boolean
    sort?: boolean
    created_at?: boolean
    updated_at?: boolean
    user_id?: boolean
    user?: boolean | usersArgs
    user_dapps?: boolean | user_dappsFindManyArgs
    _count?: boolean | User_dapps_catogoriesCountOutputTypeArgs
  }

  export type user_dapps_catogoriesInclude = {
    user?: boolean | usersArgs
    user_dapps?: boolean | user_dappsFindManyArgs
    _count?: boolean | User_dapps_catogoriesCountOutputTypeArgs
  }

  export type user_dapps_catogoriesGetPayload<
    S extends boolean | null | undefined | user_dapps_catogoriesArgs,
    U = keyof S
      > = S extends true
        ? user_dapps_catogories
    : S extends undefined
    ? never
    : S extends user_dapps_catogoriesArgs | user_dapps_catogoriesFindManyArgs
    ?'include' extends U
    ? user_dapps_catogories  & {
    [P in TrueKeys<S['include']>]:
        P extends 'user' ? usersGetPayload<S['include'][P]> :
        P extends 'user_dapps' ? Array < user_dappsGetPayload<S['include'][P]>>  :
        P extends '_count' ? User_dapps_catogoriesCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'user' ? usersGetPayload<S['select'][P]> :
        P extends 'user_dapps' ? Array < user_dappsGetPayload<S['select'][P]>>  :
        P extends '_count' ? User_dapps_catogoriesCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof user_dapps_catogories ? user_dapps_catogories[P] : never
  } 
    : user_dapps_catogories
  : user_dapps_catogories


  type user_dapps_catogoriesCountArgs = Merge<
    Omit<user_dapps_catogoriesFindManyArgs, 'select' | 'include'> & {
      select?: User_dapps_catogoriesCountAggregateInputType | true
    }
  >

  export interface user_dapps_catogoriesDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one User_dapps_catogories that matches the filter.
     * @param {user_dapps_catogoriesFindUniqueArgs} args - Arguments to find a User_dapps_catogories
     * @example
     * // Get one User_dapps_catogories
     * const user_dapps_catogories = await prisma.user_dapps_catogories.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends user_dapps_catogoriesFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, user_dapps_catogoriesFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'user_dapps_catogories'> extends True ? CheckSelect<T, Prisma__user_dapps_catogoriesClient<user_dapps_catogories>, Prisma__user_dapps_catogoriesClient<user_dapps_catogoriesGetPayload<T>>> : CheckSelect<T, Prisma__user_dapps_catogoriesClient<user_dapps_catogories | null >, Prisma__user_dapps_catogoriesClient<user_dapps_catogoriesGetPayload<T> | null >>

    /**
     * Find the first User_dapps_catogories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_dapps_catogoriesFindFirstArgs} args - Arguments to find a User_dapps_catogories
     * @example
     * // Get one User_dapps_catogories
     * const user_dapps_catogories = await prisma.user_dapps_catogories.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends user_dapps_catogoriesFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, user_dapps_catogoriesFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'user_dapps_catogories'> extends True ? CheckSelect<T, Prisma__user_dapps_catogoriesClient<user_dapps_catogories>, Prisma__user_dapps_catogoriesClient<user_dapps_catogoriesGetPayload<T>>> : CheckSelect<T, Prisma__user_dapps_catogoriesClient<user_dapps_catogories | null >, Prisma__user_dapps_catogoriesClient<user_dapps_catogoriesGetPayload<T> | null >>

    /**
     * Find zero or more User_dapps_catogories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_dapps_catogoriesFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all User_dapps_catogories
     * const user_dapps_catogories = await prisma.user_dapps_catogories.findMany()
     * 
     * // Get first 10 User_dapps_catogories
     * const user_dapps_catogories = await prisma.user_dapps_catogories.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const user_dapps_catogoriesWithIdOnly = await prisma.user_dapps_catogories.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends user_dapps_catogoriesFindManyArgs>(
      args?: SelectSubset<T, user_dapps_catogoriesFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<user_dapps_catogories>>, PrismaPromise<Array<user_dapps_catogoriesGetPayload<T>>>>

    /**
     * Create a User_dapps_catogories.
     * @param {user_dapps_catogoriesCreateArgs} args - Arguments to create a User_dapps_catogories.
     * @example
     * // Create one User_dapps_catogories
     * const User_dapps_catogories = await prisma.user_dapps_catogories.create({
     *   data: {
     *     // ... data to create a User_dapps_catogories
     *   }
     * })
     * 
    **/
    create<T extends user_dapps_catogoriesCreateArgs>(
      args: SelectSubset<T, user_dapps_catogoriesCreateArgs>
    ): CheckSelect<T, Prisma__user_dapps_catogoriesClient<user_dapps_catogories>, Prisma__user_dapps_catogoriesClient<user_dapps_catogoriesGetPayload<T>>>

    /**
     * Create many User_dapps_catogories.
     *     @param {user_dapps_catogoriesCreateManyArgs} args - Arguments to create many User_dapps_catogories.
     *     @example
     *     // Create many User_dapps_catogories
     *     const user_dapps_catogories = await prisma.user_dapps_catogories.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends user_dapps_catogoriesCreateManyArgs>(
      args?: SelectSubset<T, user_dapps_catogoriesCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a User_dapps_catogories.
     * @param {user_dapps_catogoriesDeleteArgs} args - Arguments to delete one User_dapps_catogories.
     * @example
     * // Delete one User_dapps_catogories
     * const User_dapps_catogories = await prisma.user_dapps_catogories.delete({
     *   where: {
     *     // ... filter to delete one User_dapps_catogories
     *   }
     * })
     * 
    **/
    delete<T extends user_dapps_catogoriesDeleteArgs>(
      args: SelectSubset<T, user_dapps_catogoriesDeleteArgs>
    ): CheckSelect<T, Prisma__user_dapps_catogoriesClient<user_dapps_catogories>, Prisma__user_dapps_catogoriesClient<user_dapps_catogoriesGetPayload<T>>>

    /**
     * Update one User_dapps_catogories.
     * @param {user_dapps_catogoriesUpdateArgs} args - Arguments to update one User_dapps_catogories.
     * @example
     * // Update one User_dapps_catogories
     * const user_dapps_catogories = await prisma.user_dapps_catogories.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends user_dapps_catogoriesUpdateArgs>(
      args: SelectSubset<T, user_dapps_catogoriesUpdateArgs>
    ): CheckSelect<T, Prisma__user_dapps_catogoriesClient<user_dapps_catogories>, Prisma__user_dapps_catogoriesClient<user_dapps_catogoriesGetPayload<T>>>

    /**
     * Delete zero or more User_dapps_catogories.
     * @param {user_dapps_catogoriesDeleteManyArgs} args - Arguments to filter User_dapps_catogories to delete.
     * @example
     * // Delete a few User_dapps_catogories
     * const { count } = await prisma.user_dapps_catogories.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends user_dapps_catogoriesDeleteManyArgs>(
      args?: SelectSubset<T, user_dapps_catogoriesDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more User_dapps_catogories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_dapps_catogoriesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many User_dapps_catogories
     * const user_dapps_catogories = await prisma.user_dapps_catogories.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends user_dapps_catogoriesUpdateManyArgs>(
      args: SelectSubset<T, user_dapps_catogoriesUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one User_dapps_catogories.
     * @param {user_dapps_catogoriesUpsertArgs} args - Arguments to update or create a User_dapps_catogories.
     * @example
     * // Update or create a User_dapps_catogories
     * const user_dapps_catogories = await prisma.user_dapps_catogories.upsert({
     *   create: {
     *     // ... data to create a User_dapps_catogories
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User_dapps_catogories we want to update
     *   }
     * })
    **/
    upsert<T extends user_dapps_catogoriesUpsertArgs>(
      args: SelectSubset<T, user_dapps_catogoriesUpsertArgs>
    ): CheckSelect<T, Prisma__user_dapps_catogoriesClient<user_dapps_catogories>, Prisma__user_dapps_catogoriesClient<user_dapps_catogoriesGetPayload<T>>>

    /**
     * Count the number of User_dapps_catogories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {user_dapps_catogoriesCountArgs} args - Arguments to filter User_dapps_catogories to count.
     * @example
     * // Count the number of User_dapps_catogories
     * const count = await prisma.user_dapps_catogories.count({
     *   where: {
     *     // ... the filter for the User_dapps_catogories we want to count
     *   }
     * })
    **/
    count<T extends user_dapps_catogoriesCountArgs>(
      args?: Subset<T, user_dapps_catogoriesCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], User_dapps_catogoriesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User_dapps_catogories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {User_dapps_catogoriesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends User_dapps_catogoriesAggregateArgs>(args: Subset<T, User_dapps_catogoriesAggregateArgs>): PrismaPromise<GetUser_dapps_catogoriesAggregateType<T>>

    /**
     * Group by User_dapps_catogories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {User_dapps_catogoriesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends User_dapps_catogoriesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: User_dapps_catogoriesGroupByArgs['orderBy'] }
        : { orderBy?: User_dapps_catogoriesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, User_dapps_catogoriesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUser_dapps_catogoriesGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for user_dapps_catogories.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__user_dapps_catogoriesClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    user<T extends usersArgs = {}>(args?: Subset<T, usersArgs>): CheckSelect<T, Prisma__usersClient<users | null >, Prisma__usersClient<usersGetPayload<T> | null >>;

    user_dapps<T extends user_dappsFindManyArgs = {}>(args?: Subset<T, user_dappsFindManyArgs>): CheckSelect<T, PrismaPromise<Array<user_dapps>>, PrismaPromise<Array<user_dappsGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * user_dapps_catogories findUnique
   */
  export type user_dapps_catogoriesFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the user_dapps_catogories
     * 
    **/
    select?: user_dapps_catogoriesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: user_dapps_catogoriesInclude | null
    /**
     * Throw an Error if a user_dapps_catogories can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which user_dapps_catogories to fetch.
     * 
    **/
    where: user_dapps_catogoriesWhereUniqueInput
  }


  /**
   * user_dapps_catogories findFirst
   */
  export type user_dapps_catogoriesFindFirstArgs = {
    /**
     * Select specific fields to fetch from the user_dapps_catogories
     * 
    **/
    select?: user_dapps_catogoriesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: user_dapps_catogoriesInclude | null
    /**
     * Throw an Error if a user_dapps_catogories can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which user_dapps_catogories to fetch.
     * 
    **/
    where?: user_dapps_catogoriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_dapps_catogories to fetch.
     * 
    **/
    orderBy?: Enumerable<user_dapps_catogoriesOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for user_dapps_catogories.
     * 
    **/
    cursor?: user_dapps_catogoriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_dapps_catogories from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_dapps_catogories.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of user_dapps_catogories.
     * 
    **/
    distinct?: Enumerable<User_dapps_catogoriesScalarFieldEnum>
  }


  /**
   * user_dapps_catogories findMany
   */
  export type user_dapps_catogoriesFindManyArgs = {
    /**
     * Select specific fields to fetch from the user_dapps_catogories
     * 
    **/
    select?: user_dapps_catogoriesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: user_dapps_catogoriesInclude | null
    /**
     * Filter, which user_dapps_catogories to fetch.
     * 
    **/
    where?: user_dapps_catogoriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of user_dapps_catogories to fetch.
     * 
    **/
    orderBy?: Enumerable<user_dapps_catogoriesOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing user_dapps_catogories.
     * 
    **/
    cursor?: user_dapps_catogoriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` user_dapps_catogories from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` user_dapps_catogories.
     * 
    **/
    skip?: number
    distinct?: Enumerable<User_dapps_catogoriesScalarFieldEnum>
  }


  /**
   * user_dapps_catogories create
   */
  export type user_dapps_catogoriesCreateArgs = {
    /**
     * Select specific fields to fetch from the user_dapps_catogories
     * 
    **/
    select?: user_dapps_catogoriesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: user_dapps_catogoriesInclude | null
    /**
     * The data needed to create a user_dapps_catogories.
     * 
    **/
    data: XOR<user_dapps_catogoriesCreateInput, user_dapps_catogoriesUncheckedCreateInput>
  }


  /**
   * user_dapps_catogories createMany
   */
  export type user_dapps_catogoriesCreateManyArgs = {
    /**
     * The data used to create many user_dapps_catogories.
     * 
    **/
    data: Enumerable<user_dapps_catogoriesCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * user_dapps_catogories update
   */
  export type user_dapps_catogoriesUpdateArgs = {
    /**
     * Select specific fields to fetch from the user_dapps_catogories
     * 
    **/
    select?: user_dapps_catogoriesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: user_dapps_catogoriesInclude | null
    /**
     * The data needed to update a user_dapps_catogories.
     * 
    **/
    data: XOR<user_dapps_catogoriesUpdateInput, user_dapps_catogoriesUncheckedUpdateInput>
    /**
     * Choose, which user_dapps_catogories to update.
     * 
    **/
    where: user_dapps_catogoriesWhereUniqueInput
  }


  /**
   * user_dapps_catogories updateMany
   */
  export type user_dapps_catogoriesUpdateManyArgs = {
    /**
     * The data used to update user_dapps_catogories.
     * 
    **/
    data: XOR<user_dapps_catogoriesUpdateManyMutationInput, user_dapps_catogoriesUncheckedUpdateManyInput>
    /**
     * Filter which user_dapps_catogories to update
     * 
    **/
    where?: user_dapps_catogoriesWhereInput
  }


  /**
   * user_dapps_catogories upsert
   */
  export type user_dapps_catogoriesUpsertArgs = {
    /**
     * Select specific fields to fetch from the user_dapps_catogories
     * 
    **/
    select?: user_dapps_catogoriesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: user_dapps_catogoriesInclude | null
    /**
     * The filter to search for the user_dapps_catogories to update in case it exists.
     * 
    **/
    where: user_dapps_catogoriesWhereUniqueInput
    /**
     * In case the user_dapps_catogories found by the `where` argument doesn't exist, create a new user_dapps_catogories with this data.
     * 
    **/
    create: XOR<user_dapps_catogoriesCreateInput, user_dapps_catogoriesUncheckedCreateInput>
    /**
     * In case the user_dapps_catogories was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<user_dapps_catogoriesUpdateInput, user_dapps_catogoriesUncheckedUpdateInput>
  }


  /**
   * user_dapps_catogories delete
   */
  export type user_dapps_catogoriesDeleteArgs = {
    /**
     * Select specific fields to fetch from the user_dapps_catogories
     * 
    **/
    select?: user_dapps_catogoriesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: user_dapps_catogoriesInclude | null
    /**
     * Filter which user_dapps_catogories to delete.
     * 
    **/
    where: user_dapps_catogoriesWhereUniqueInput
  }


  /**
   * user_dapps_catogories deleteMany
   */
  export type user_dapps_catogoriesDeleteManyArgs = {
    /**
     * Filter which user_dapps_catogories to delete
     * 
    **/
    where?: user_dapps_catogoriesWhereInput
  }


  /**
   * user_dapps_catogories without action
   */
  export type user_dapps_catogoriesArgs = {
    /**
     * Select specific fields to fetch from the user_dapps_catogories
     * 
    **/
    select?: user_dapps_catogoriesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: user_dapps_catogoriesInclude | null
  }



  /**
   * Model stories
   */


  export type AggregateStories = {
    _count: StoriesCountAggregateOutputType | null
    _avg: StoriesAvgAggregateOutputType | null
    _sum: StoriesSumAggregateOutputType | null
    _min: StoriesMinAggregateOutputType | null
    _max: StoriesMaxAggregateOutputType | null
  }

  export type StoriesAvgAggregateOutputType = {
    sort: number | null
    visit_count: number | null
  }

  export type StoriesSumAggregateOutputType = {
    sort: number | null
    visit_count: number | null
  }

  export type StoriesMinAggregateOutputType = {
    id: string | null
    title: string | null
    cover: string | null
    desc: string | null
    url: string | null
    created_at: Date | null
    updated_at: Date | null
    visible: boolean | null
    sort: number | null
    is_deleted: boolean | null
    visit_count: number | null
  }

  export type StoriesMaxAggregateOutputType = {
    id: string | null
    title: string | null
    cover: string | null
    desc: string | null
    url: string | null
    created_at: Date | null
    updated_at: Date | null
    visible: boolean | null
    sort: number | null
    is_deleted: boolean | null
    visit_count: number | null
  }

  export type StoriesCountAggregateOutputType = {
    id: number
    title: number
    cover: number
    desc: number
    url: number
    created_at: number
    updated_at: number
    visible: number
    sort: number
    is_deleted: number
    visit_count: number
    _all: number
  }


  export type StoriesAvgAggregateInputType = {
    sort?: true
    visit_count?: true
  }

  export type StoriesSumAggregateInputType = {
    sort?: true
    visit_count?: true
  }

  export type StoriesMinAggregateInputType = {
    id?: true
    title?: true
    cover?: true
    desc?: true
    url?: true
    created_at?: true
    updated_at?: true
    visible?: true
    sort?: true
    is_deleted?: true
    visit_count?: true
  }

  export type StoriesMaxAggregateInputType = {
    id?: true
    title?: true
    cover?: true
    desc?: true
    url?: true
    created_at?: true
    updated_at?: true
    visible?: true
    sort?: true
    is_deleted?: true
    visit_count?: true
  }

  export type StoriesCountAggregateInputType = {
    id?: true
    title?: true
    cover?: true
    desc?: true
    url?: true
    created_at?: true
    updated_at?: true
    visible?: true
    sort?: true
    is_deleted?: true
    visit_count?: true
    _all?: true
  }

  export type StoriesAggregateArgs = {
    /**
     * Filter which stories to aggregate.
     * 
    **/
    where?: storiesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of stories to fetch.
     * 
    **/
    orderBy?: Enumerable<storiesOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: storiesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` stories from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` stories.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned stories
    **/
    _count?: true | StoriesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: StoriesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: StoriesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: StoriesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: StoriesMaxAggregateInputType
  }

  export type GetStoriesAggregateType<T extends StoriesAggregateArgs> = {
        [P in keyof T & keyof AggregateStories]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStories[P]>
      : GetScalarType<T[P], AggregateStories[P]>
  }




  export type StoriesGroupByArgs = {
    where?: storiesWhereInput
    orderBy?: Enumerable<storiesOrderByWithAggregationInput>
    by: Array<StoriesScalarFieldEnum>
    having?: storiesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: StoriesCountAggregateInputType | true
    _avg?: StoriesAvgAggregateInputType
    _sum?: StoriesSumAggregateInputType
    _min?: StoriesMinAggregateInputType
    _max?: StoriesMaxAggregateInputType
  }


  export type StoriesGroupByOutputType = {
    id: string
    title: string
    cover: string | null
    desc: string | null
    url: string | null
    created_at: Date
    updated_at: Date | null
    visible: boolean
    sort: number
    is_deleted: boolean
    visit_count: number
    _count: StoriesCountAggregateOutputType | null
    _avg: StoriesAvgAggregateOutputType | null
    _sum: StoriesSumAggregateOutputType | null
    _min: StoriesMinAggregateOutputType | null
    _max: StoriesMaxAggregateOutputType | null
  }

  type GetStoriesGroupByPayload<T extends StoriesGroupByArgs> = PrismaPromise<
    Array<
      PickArray<StoriesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof StoriesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], StoriesGroupByOutputType[P]>
            : GetScalarType<T[P], StoriesGroupByOutputType[P]>
        }
      >
    >


  export type storiesSelect = {
    id?: boolean
    title?: boolean
    cover?: boolean
    desc?: boolean
    url?: boolean
    created_at?: boolean
    updated_at?: boolean
    visible?: boolean
    sort?: boolean
    is_deleted?: boolean
    visit_count?: boolean
    story_categories_relations?: boolean | story_categories_relationsFindManyArgs
    story_dapps_relations?: boolean | story_dapps_relationsFindManyArgs
    _count?: boolean | StoriesCountOutputTypeArgs
  }

  export type storiesInclude = {
    story_categories_relations?: boolean | story_categories_relationsFindManyArgs
    story_dapps_relations?: boolean | story_dapps_relationsFindManyArgs
    _count?: boolean | StoriesCountOutputTypeArgs
  }

  export type storiesGetPayload<
    S extends boolean | null | undefined | storiesArgs,
    U = keyof S
      > = S extends true
        ? stories
    : S extends undefined
    ? never
    : S extends storiesArgs | storiesFindManyArgs
    ?'include' extends U
    ? stories  & {
    [P in TrueKeys<S['include']>]:
        P extends 'story_categories_relations' ? Array < story_categories_relationsGetPayload<S['include'][P]>>  :
        P extends 'story_dapps_relations' ? Array < story_dapps_relationsGetPayload<S['include'][P]>>  :
        P extends '_count' ? StoriesCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'story_categories_relations' ? Array < story_categories_relationsGetPayload<S['select'][P]>>  :
        P extends 'story_dapps_relations' ? Array < story_dapps_relationsGetPayload<S['select'][P]>>  :
        P extends '_count' ? StoriesCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof stories ? stories[P] : never
  } 
    : stories
  : stories


  type storiesCountArgs = Merge<
    Omit<storiesFindManyArgs, 'select' | 'include'> & {
      select?: StoriesCountAggregateInputType | true
    }
  >

  export interface storiesDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Stories that matches the filter.
     * @param {storiesFindUniqueArgs} args - Arguments to find a Stories
     * @example
     * // Get one Stories
     * const stories = await prisma.stories.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends storiesFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, storiesFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'stories'> extends True ? CheckSelect<T, Prisma__storiesClient<stories>, Prisma__storiesClient<storiesGetPayload<T>>> : CheckSelect<T, Prisma__storiesClient<stories | null >, Prisma__storiesClient<storiesGetPayload<T> | null >>

    /**
     * Find the first Stories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {storiesFindFirstArgs} args - Arguments to find a Stories
     * @example
     * // Get one Stories
     * const stories = await prisma.stories.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends storiesFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, storiesFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'stories'> extends True ? CheckSelect<T, Prisma__storiesClient<stories>, Prisma__storiesClient<storiesGetPayload<T>>> : CheckSelect<T, Prisma__storiesClient<stories | null >, Prisma__storiesClient<storiesGetPayload<T> | null >>

    /**
     * Find zero or more Stories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {storiesFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Stories
     * const stories = await prisma.stories.findMany()
     * 
     * // Get first 10 Stories
     * const stories = await prisma.stories.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const storiesWithIdOnly = await prisma.stories.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends storiesFindManyArgs>(
      args?: SelectSubset<T, storiesFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<stories>>, PrismaPromise<Array<storiesGetPayload<T>>>>

    /**
     * Create a Stories.
     * @param {storiesCreateArgs} args - Arguments to create a Stories.
     * @example
     * // Create one Stories
     * const Stories = await prisma.stories.create({
     *   data: {
     *     // ... data to create a Stories
     *   }
     * })
     * 
    **/
    create<T extends storiesCreateArgs>(
      args: SelectSubset<T, storiesCreateArgs>
    ): CheckSelect<T, Prisma__storiesClient<stories>, Prisma__storiesClient<storiesGetPayload<T>>>

    /**
     * Create many Stories.
     *     @param {storiesCreateManyArgs} args - Arguments to create many Stories.
     *     @example
     *     // Create many Stories
     *     const stories = await prisma.stories.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends storiesCreateManyArgs>(
      args?: SelectSubset<T, storiesCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Stories.
     * @param {storiesDeleteArgs} args - Arguments to delete one Stories.
     * @example
     * // Delete one Stories
     * const Stories = await prisma.stories.delete({
     *   where: {
     *     // ... filter to delete one Stories
     *   }
     * })
     * 
    **/
    delete<T extends storiesDeleteArgs>(
      args: SelectSubset<T, storiesDeleteArgs>
    ): CheckSelect<T, Prisma__storiesClient<stories>, Prisma__storiesClient<storiesGetPayload<T>>>

    /**
     * Update one Stories.
     * @param {storiesUpdateArgs} args - Arguments to update one Stories.
     * @example
     * // Update one Stories
     * const stories = await prisma.stories.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends storiesUpdateArgs>(
      args: SelectSubset<T, storiesUpdateArgs>
    ): CheckSelect<T, Prisma__storiesClient<stories>, Prisma__storiesClient<storiesGetPayload<T>>>

    /**
     * Delete zero or more Stories.
     * @param {storiesDeleteManyArgs} args - Arguments to filter Stories to delete.
     * @example
     * // Delete a few Stories
     * const { count } = await prisma.stories.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends storiesDeleteManyArgs>(
      args?: SelectSubset<T, storiesDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Stories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {storiesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Stories
     * const stories = await prisma.stories.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends storiesUpdateManyArgs>(
      args: SelectSubset<T, storiesUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Stories.
     * @param {storiesUpsertArgs} args - Arguments to update or create a Stories.
     * @example
     * // Update or create a Stories
     * const stories = await prisma.stories.upsert({
     *   create: {
     *     // ... data to create a Stories
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Stories we want to update
     *   }
     * })
    **/
    upsert<T extends storiesUpsertArgs>(
      args: SelectSubset<T, storiesUpsertArgs>
    ): CheckSelect<T, Prisma__storiesClient<stories>, Prisma__storiesClient<storiesGetPayload<T>>>

    /**
     * Count the number of Stories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {storiesCountArgs} args - Arguments to filter Stories to count.
     * @example
     * // Count the number of Stories
     * const count = await prisma.stories.count({
     *   where: {
     *     // ... the filter for the Stories we want to count
     *   }
     * })
    **/
    count<T extends storiesCountArgs>(
      args?: Subset<T, storiesCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], StoriesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Stories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoriesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends StoriesAggregateArgs>(args: Subset<T, StoriesAggregateArgs>): PrismaPromise<GetStoriesAggregateType<T>>

    /**
     * Group by Stories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {StoriesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends StoriesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: StoriesGroupByArgs['orderBy'] }
        : { orderBy?: StoriesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, StoriesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStoriesGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for stories.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__storiesClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    story_categories_relations<T extends story_categories_relationsFindManyArgs = {}>(args?: Subset<T, story_categories_relationsFindManyArgs>): CheckSelect<T, PrismaPromise<Array<story_categories_relations>>, PrismaPromise<Array<story_categories_relationsGetPayload<T>>>>;

    story_dapps_relations<T extends story_dapps_relationsFindManyArgs = {}>(args?: Subset<T, story_dapps_relationsFindManyArgs>): CheckSelect<T, PrismaPromise<Array<story_dapps_relations>>, PrismaPromise<Array<story_dapps_relationsGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * stories findUnique
   */
  export type storiesFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the stories
     * 
    **/
    select?: storiesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: storiesInclude | null
    /**
     * Throw an Error if a stories can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which stories to fetch.
     * 
    **/
    where: storiesWhereUniqueInput
  }


  /**
   * stories findFirst
   */
  export type storiesFindFirstArgs = {
    /**
     * Select specific fields to fetch from the stories
     * 
    **/
    select?: storiesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: storiesInclude | null
    /**
     * Throw an Error if a stories can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which stories to fetch.
     * 
    **/
    where?: storiesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of stories to fetch.
     * 
    **/
    orderBy?: Enumerable<storiesOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for stories.
     * 
    **/
    cursor?: storiesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` stories from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` stories.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of stories.
     * 
    **/
    distinct?: Enumerable<StoriesScalarFieldEnum>
  }


  /**
   * stories findMany
   */
  export type storiesFindManyArgs = {
    /**
     * Select specific fields to fetch from the stories
     * 
    **/
    select?: storiesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: storiesInclude | null
    /**
     * Filter, which stories to fetch.
     * 
    **/
    where?: storiesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of stories to fetch.
     * 
    **/
    orderBy?: Enumerable<storiesOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing stories.
     * 
    **/
    cursor?: storiesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` stories from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` stories.
     * 
    **/
    skip?: number
    distinct?: Enumerable<StoriesScalarFieldEnum>
  }


  /**
   * stories create
   */
  export type storiesCreateArgs = {
    /**
     * Select specific fields to fetch from the stories
     * 
    **/
    select?: storiesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: storiesInclude | null
    /**
     * The data needed to create a stories.
     * 
    **/
    data: XOR<storiesCreateInput, storiesUncheckedCreateInput>
  }


  /**
   * stories createMany
   */
  export type storiesCreateManyArgs = {
    /**
     * The data used to create many stories.
     * 
    **/
    data: Enumerable<storiesCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * stories update
   */
  export type storiesUpdateArgs = {
    /**
     * Select specific fields to fetch from the stories
     * 
    **/
    select?: storiesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: storiesInclude | null
    /**
     * The data needed to update a stories.
     * 
    **/
    data: XOR<storiesUpdateInput, storiesUncheckedUpdateInput>
    /**
     * Choose, which stories to update.
     * 
    **/
    where: storiesWhereUniqueInput
  }


  /**
   * stories updateMany
   */
  export type storiesUpdateManyArgs = {
    /**
     * The data used to update stories.
     * 
    **/
    data: XOR<storiesUpdateManyMutationInput, storiesUncheckedUpdateManyInput>
    /**
     * Filter which stories to update
     * 
    **/
    where?: storiesWhereInput
  }


  /**
   * stories upsert
   */
  export type storiesUpsertArgs = {
    /**
     * Select specific fields to fetch from the stories
     * 
    **/
    select?: storiesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: storiesInclude | null
    /**
     * The filter to search for the stories to update in case it exists.
     * 
    **/
    where: storiesWhereUniqueInput
    /**
     * In case the stories found by the `where` argument doesn't exist, create a new stories with this data.
     * 
    **/
    create: XOR<storiesCreateInput, storiesUncheckedCreateInput>
    /**
     * In case the stories was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<storiesUpdateInput, storiesUncheckedUpdateInput>
  }


  /**
   * stories delete
   */
  export type storiesDeleteArgs = {
    /**
     * Select specific fields to fetch from the stories
     * 
    **/
    select?: storiesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: storiesInclude | null
    /**
     * Filter which stories to delete.
     * 
    **/
    where: storiesWhereUniqueInput
  }


  /**
   * stories deleteMany
   */
  export type storiesDeleteManyArgs = {
    /**
     * Filter which stories to delete
     * 
    **/
    where?: storiesWhereInput
  }


  /**
   * stories without action
   */
  export type storiesArgs = {
    /**
     * Select specific fields to fetch from the stories
     * 
    **/
    select?: storiesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: storiesInclude | null
  }



  /**
   * Model story_categories
   */


  export type AggregateStory_categories = {
    _count: Story_categoriesCountAggregateOutputType | null
    _avg: Story_categoriesAvgAggregateOutputType | null
    _sum: Story_categoriesSumAggregateOutputType | null
    _min: Story_categoriesMinAggregateOutputType | null
    _max: Story_categoriesMaxAggregateOutputType | null
  }

  export type Story_categoriesAvgAggregateOutputType = {
    sort: number | null
  }

  export type Story_categoriesSumAggregateOutputType = {
    sort: number | null
  }

  export type Story_categoriesMinAggregateOutputType = {
    id: string | null
    title: string | null
    desc: string | null
    sort: number | null
    is_deleted: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Story_categoriesMaxAggregateOutputType = {
    id: string | null
    title: string | null
    desc: string | null
    sort: number | null
    is_deleted: boolean | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Story_categoriesCountAggregateOutputType = {
    id: number
    title: number
    desc: number
    sort: number
    is_deleted: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type Story_categoriesAvgAggregateInputType = {
    sort?: true
  }

  export type Story_categoriesSumAggregateInputType = {
    sort?: true
  }

  export type Story_categoriesMinAggregateInputType = {
    id?: true
    title?: true
    desc?: true
    sort?: true
    is_deleted?: true
    created_at?: true
    updated_at?: true
  }

  export type Story_categoriesMaxAggregateInputType = {
    id?: true
    title?: true
    desc?: true
    sort?: true
    is_deleted?: true
    created_at?: true
    updated_at?: true
  }

  export type Story_categoriesCountAggregateInputType = {
    id?: true
    title?: true
    desc?: true
    sort?: true
    is_deleted?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type Story_categoriesAggregateArgs = {
    /**
     * Filter which story_categories to aggregate.
     * 
    **/
    where?: story_categoriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of story_categories to fetch.
     * 
    **/
    orderBy?: Enumerable<story_categoriesOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: story_categoriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` story_categories from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` story_categories.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned story_categories
    **/
    _count?: true | Story_categoriesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Story_categoriesAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Story_categoriesSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Story_categoriesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Story_categoriesMaxAggregateInputType
  }

  export type GetStory_categoriesAggregateType<T extends Story_categoriesAggregateArgs> = {
        [P in keyof T & keyof AggregateStory_categories]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStory_categories[P]>
      : GetScalarType<T[P], AggregateStory_categories[P]>
  }




  export type Story_categoriesGroupByArgs = {
    where?: story_categoriesWhereInput
    orderBy?: Enumerable<story_categoriesOrderByWithAggregationInput>
    by: Array<Story_categoriesScalarFieldEnum>
    having?: story_categoriesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Story_categoriesCountAggregateInputType | true
    _avg?: Story_categoriesAvgAggregateInputType
    _sum?: Story_categoriesSumAggregateInputType
    _min?: Story_categoriesMinAggregateInputType
    _max?: Story_categoriesMaxAggregateInputType
  }


  export type Story_categoriesGroupByOutputType = {
    id: string
    title: string
    desc: string | null
    sort: number
    is_deleted: boolean
    created_at: Date
    updated_at: Date | null
    _count: Story_categoriesCountAggregateOutputType | null
    _avg: Story_categoriesAvgAggregateOutputType | null
    _sum: Story_categoriesSumAggregateOutputType | null
    _min: Story_categoriesMinAggregateOutputType | null
    _max: Story_categoriesMaxAggregateOutputType | null
  }

  type GetStory_categoriesGroupByPayload<T extends Story_categoriesGroupByArgs> = PrismaPromise<
    Array<
      PickArray<Story_categoriesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Story_categoriesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Story_categoriesGroupByOutputType[P]>
            : GetScalarType<T[P], Story_categoriesGroupByOutputType[P]>
        }
      >
    >


  export type story_categoriesSelect = {
    id?: boolean
    title?: boolean
    desc?: boolean
    sort?: boolean
    is_deleted?: boolean
    created_at?: boolean
    updated_at?: boolean
    story_categories_relations?: boolean | story_categories_relationsFindManyArgs
    _count?: boolean | Story_categoriesCountOutputTypeArgs
  }

  export type story_categoriesInclude = {
    story_categories_relations?: boolean | story_categories_relationsFindManyArgs
    _count?: boolean | Story_categoriesCountOutputTypeArgs
  }

  export type story_categoriesGetPayload<
    S extends boolean | null | undefined | story_categoriesArgs,
    U = keyof S
      > = S extends true
        ? story_categories
    : S extends undefined
    ? never
    : S extends story_categoriesArgs | story_categoriesFindManyArgs
    ?'include' extends U
    ? story_categories  & {
    [P in TrueKeys<S['include']>]:
        P extends 'story_categories_relations' ? Array < story_categories_relationsGetPayload<S['include'][P]>>  :
        P extends '_count' ? Story_categoriesCountOutputTypeGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'story_categories_relations' ? Array < story_categories_relationsGetPayload<S['select'][P]>>  :
        P extends '_count' ? Story_categoriesCountOutputTypeGetPayload<S['select'][P]> :  P extends keyof story_categories ? story_categories[P] : never
  } 
    : story_categories
  : story_categories


  type story_categoriesCountArgs = Merge<
    Omit<story_categoriesFindManyArgs, 'select' | 'include'> & {
      select?: Story_categoriesCountAggregateInputType | true
    }
  >

  export interface story_categoriesDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Story_categories that matches the filter.
     * @param {story_categoriesFindUniqueArgs} args - Arguments to find a Story_categories
     * @example
     * // Get one Story_categories
     * const story_categories = await prisma.story_categories.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends story_categoriesFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, story_categoriesFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'story_categories'> extends True ? CheckSelect<T, Prisma__story_categoriesClient<story_categories>, Prisma__story_categoriesClient<story_categoriesGetPayload<T>>> : CheckSelect<T, Prisma__story_categoriesClient<story_categories | null >, Prisma__story_categoriesClient<story_categoriesGetPayload<T> | null >>

    /**
     * Find the first Story_categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {story_categoriesFindFirstArgs} args - Arguments to find a Story_categories
     * @example
     * // Get one Story_categories
     * const story_categories = await prisma.story_categories.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends story_categoriesFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, story_categoriesFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'story_categories'> extends True ? CheckSelect<T, Prisma__story_categoriesClient<story_categories>, Prisma__story_categoriesClient<story_categoriesGetPayload<T>>> : CheckSelect<T, Prisma__story_categoriesClient<story_categories | null >, Prisma__story_categoriesClient<story_categoriesGetPayload<T> | null >>

    /**
     * Find zero or more Story_categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {story_categoriesFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Story_categories
     * const story_categories = await prisma.story_categories.findMany()
     * 
     * // Get first 10 Story_categories
     * const story_categories = await prisma.story_categories.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const story_categoriesWithIdOnly = await prisma.story_categories.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends story_categoriesFindManyArgs>(
      args?: SelectSubset<T, story_categoriesFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<story_categories>>, PrismaPromise<Array<story_categoriesGetPayload<T>>>>

    /**
     * Create a Story_categories.
     * @param {story_categoriesCreateArgs} args - Arguments to create a Story_categories.
     * @example
     * // Create one Story_categories
     * const Story_categories = await prisma.story_categories.create({
     *   data: {
     *     // ... data to create a Story_categories
     *   }
     * })
     * 
    **/
    create<T extends story_categoriesCreateArgs>(
      args: SelectSubset<T, story_categoriesCreateArgs>
    ): CheckSelect<T, Prisma__story_categoriesClient<story_categories>, Prisma__story_categoriesClient<story_categoriesGetPayload<T>>>

    /**
     * Create many Story_categories.
     *     @param {story_categoriesCreateManyArgs} args - Arguments to create many Story_categories.
     *     @example
     *     // Create many Story_categories
     *     const story_categories = await prisma.story_categories.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends story_categoriesCreateManyArgs>(
      args?: SelectSubset<T, story_categoriesCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Story_categories.
     * @param {story_categoriesDeleteArgs} args - Arguments to delete one Story_categories.
     * @example
     * // Delete one Story_categories
     * const Story_categories = await prisma.story_categories.delete({
     *   where: {
     *     // ... filter to delete one Story_categories
     *   }
     * })
     * 
    **/
    delete<T extends story_categoriesDeleteArgs>(
      args: SelectSubset<T, story_categoriesDeleteArgs>
    ): CheckSelect<T, Prisma__story_categoriesClient<story_categories>, Prisma__story_categoriesClient<story_categoriesGetPayload<T>>>

    /**
     * Update one Story_categories.
     * @param {story_categoriesUpdateArgs} args - Arguments to update one Story_categories.
     * @example
     * // Update one Story_categories
     * const story_categories = await prisma.story_categories.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends story_categoriesUpdateArgs>(
      args: SelectSubset<T, story_categoriesUpdateArgs>
    ): CheckSelect<T, Prisma__story_categoriesClient<story_categories>, Prisma__story_categoriesClient<story_categoriesGetPayload<T>>>

    /**
     * Delete zero or more Story_categories.
     * @param {story_categoriesDeleteManyArgs} args - Arguments to filter Story_categories to delete.
     * @example
     * // Delete a few Story_categories
     * const { count } = await prisma.story_categories.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends story_categoriesDeleteManyArgs>(
      args?: SelectSubset<T, story_categoriesDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Story_categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {story_categoriesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Story_categories
     * const story_categories = await prisma.story_categories.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends story_categoriesUpdateManyArgs>(
      args: SelectSubset<T, story_categoriesUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Story_categories.
     * @param {story_categoriesUpsertArgs} args - Arguments to update or create a Story_categories.
     * @example
     * // Update or create a Story_categories
     * const story_categories = await prisma.story_categories.upsert({
     *   create: {
     *     // ... data to create a Story_categories
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Story_categories we want to update
     *   }
     * })
    **/
    upsert<T extends story_categoriesUpsertArgs>(
      args: SelectSubset<T, story_categoriesUpsertArgs>
    ): CheckSelect<T, Prisma__story_categoriesClient<story_categories>, Prisma__story_categoriesClient<story_categoriesGetPayload<T>>>

    /**
     * Count the number of Story_categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {story_categoriesCountArgs} args - Arguments to filter Story_categories to count.
     * @example
     * // Count the number of Story_categories
     * const count = await prisma.story_categories.count({
     *   where: {
     *     // ... the filter for the Story_categories we want to count
     *   }
     * })
    **/
    count<T extends story_categoriesCountArgs>(
      args?: Subset<T, story_categoriesCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Story_categoriesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Story_categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Story_categoriesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Story_categoriesAggregateArgs>(args: Subset<T, Story_categoriesAggregateArgs>): PrismaPromise<GetStory_categoriesAggregateType<T>>

    /**
     * Group by Story_categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Story_categoriesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends Story_categoriesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Story_categoriesGroupByArgs['orderBy'] }
        : { orderBy?: Story_categoriesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, Story_categoriesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStory_categoriesGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for story_categories.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__story_categoriesClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    story_categories_relations<T extends story_categories_relationsFindManyArgs = {}>(args?: Subset<T, story_categories_relationsFindManyArgs>): CheckSelect<T, PrismaPromise<Array<story_categories_relations>>, PrismaPromise<Array<story_categories_relationsGetPayload<T>>>>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * story_categories findUnique
   */
  export type story_categoriesFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the story_categories
     * 
    **/
    select?: story_categoriesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: story_categoriesInclude | null
    /**
     * Throw an Error if a story_categories can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which story_categories to fetch.
     * 
    **/
    where: story_categoriesWhereUniqueInput
  }


  /**
   * story_categories findFirst
   */
  export type story_categoriesFindFirstArgs = {
    /**
     * Select specific fields to fetch from the story_categories
     * 
    **/
    select?: story_categoriesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: story_categoriesInclude | null
    /**
     * Throw an Error if a story_categories can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which story_categories to fetch.
     * 
    **/
    where?: story_categoriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of story_categories to fetch.
     * 
    **/
    orderBy?: Enumerable<story_categoriesOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for story_categories.
     * 
    **/
    cursor?: story_categoriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` story_categories from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` story_categories.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of story_categories.
     * 
    **/
    distinct?: Enumerable<Story_categoriesScalarFieldEnum>
  }


  /**
   * story_categories findMany
   */
  export type story_categoriesFindManyArgs = {
    /**
     * Select specific fields to fetch from the story_categories
     * 
    **/
    select?: story_categoriesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: story_categoriesInclude | null
    /**
     * Filter, which story_categories to fetch.
     * 
    **/
    where?: story_categoriesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of story_categories to fetch.
     * 
    **/
    orderBy?: Enumerable<story_categoriesOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing story_categories.
     * 
    **/
    cursor?: story_categoriesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` story_categories from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` story_categories.
     * 
    **/
    skip?: number
    distinct?: Enumerable<Story_categoriesScalarFieldEnum>
  }


  /**
   * story_categories create
   */
  export type story_categoriesCreateArgs = {
    /**
     * Select specific fields to fetch from the story_categories
     * 
    **/
    select?: story_categoriesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: story_categoriesInclude | null
    /**
     * The data needed to create a story_categories.
     * 
    **/
    data: XOR<story_categoriesCreateInput, story_categoriesUncheckedCreateInput>
  }


  /**
   * story_categories createMany
   */
  export type story_categoriesCreateManyArgs = {
    /**
     * The data used to create many story_categories.
     * 
    **/
    data: Enumerable<story_categoriesCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * story_categories update
   */
  export type story_categoriesUpdateArgs = {
    /**
     * Select specific fields to fetch from the story_categories
     * 
    **/
    select?: story_categoriesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: story_categoriesInclude | null
    /**
     * The data needed to update a story_categories.
     * 
    **/
    data: XOR<story_categoriesUpdateInput, story_categoriesUncheckedUpdateInput>
    /**
     * Choose, which story_categories to update.
     * 
    **/
    where: story_categoriesWhereUniqueInput
  }


  /**
   * story_categories updateMany
   */
  export type story_categoriesUpdateManyArgs = {
    /**
     * The data used to update story_categories.
     * 
    **/
    data: XOR<story_categoriesUpdateManyMutationInput, story_categoriesUncheckedUpdateManyInput>
    /**
     * Filter which story_categories to update
     * 
    **/
    where?: story_categoriesWhereInput
  }


  /**
   * story_categories upsert
   */
  export type story_categoriesUpsertArgs = {
    /**
     * Select specific fields to fetch from the story_categories
     * 
    **/
    select?: story_categoriesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: story_categoriesInclude | null
    /**
     * The filter to search for the story_categories to update in case it exists.
     * 
    **/
    where: story_categoriesWhereUniqueInput
    /**
     * In case the story_categories found by the `where` argument doesn't exist, create a new story_categories with this data.
     * 
    **/
    create: XOR<story_categoriesCreateInput, story_categoriesUncheckedCreateInput>
    /**
     * In case the story_categories was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<story_categoriesUpdateInput, story_categoriesUncheckedUpdateInput>
  }


  /**
   * story_categories delete
   */
  export type story_categoriesDeleteArgs = {
    /**
     * Select specific fields to fetch from the story_categories
     * 
    **/
    select?: story_categoriesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: story_categoriesInclude | null
    /**
     * Filter which story_categories to delete.
     * 
    **/
    where: story_categoriesWhereUniqueInput
  }


  /**
   * story_categories deleteMany
   */
  export type story_categoriesDeleteManyArgs = {
    /**
     * Filter which story_categories to delete
     * 
    **/
    where?: story_categoriesWhereInput
  }


  /**
   * story_categories without action
   */
  export type story_categoriesArgs = {
    /**
     * Select specific fields to fetch from the story_categories
     * 
    **/
    select?: story_categoriesSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: story_categoriesInclude | null
  }



  /**
   * Model story_categories_relations
   */


  export type AggregateStory_categories_relations = {
    _count: Story_categories_relationsCountAggregateOutputType | null
    _avg: Story_categories_relationsAvgAggregateOutputType | null
    _sum: Story_categories_relationsSumAggregateOutputType | null
    _min: Story_categories_relationsMinAggregateOutputType | null
    _max: Story_categories_relationsMaxAggregateOutputType | null
  }

  export type Story_categories_relationsAvgAggregateOutputType = {
    id: number | null
  }

  export type Story_categories_relationsSumAggregateOutputType = {
    id: number | null
  }

  export type Story_categories_relationsMinAggregateOutputType = {
    id: number | null
    story_category_id: string | null
    story_id: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Story_categories_relationsMaxAggregateOutputType = {
    id: number | null
    story_category_id: string | null
    story_id: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Story_categories_relationsCountAggregateOutputType = {
    id: number
    story_category_id: number
    story_id: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type Story_categories_relationsAvgAggregateInputType = {
    id?: true
  }

  export type Story_categories_relationsSumAggregateInputType = {
    id?: true
  }

  export type Story_categories_relationsMinAggregateInputType = {
    id?: true
    story_category_id?: true
    story_id?: true
    created_at?: true
    updated_at?: true
  }

  export type Story_categories_relationsMaxAggregateInputType = {
    id?: true
    story_category_id?: true
    story_id?: true
    created_at?: true
    updated_at?: true
  }

  export type Story_categories_relationsCountAggregateInputType = {
    id?: true
    story_category_id?: true
    story_id?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type Story_categories_relationsAggregateArgs = {
    /**
     * Filter which story_categories_relations to aggregate.
     * 
    **/
    where?: story_categories_relationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of story_categories_relations to fetch.
     * 
    **/
    orderBy?: Enumerable<story_categories_relationsOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: story_categories_relationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` story_categories_relations from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` story_categories_relations.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned story_categories_relations
    **/
    _count?: true | Story_categories_relationsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Story_categories_relationsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Story_categories_relationsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Story_categories_relationsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Story_categories_relationsMaxAggregateInputType
  }

  export type GetStory_categories_relationsAggregateType<T extends Story_categories_relationsAggregateArgs> = {
        [P in keyof T & keyof AggregateStory_categories_relations]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStory_categories_relations[P]>
      : GetScalarType<T[P], AggregateStory_categories_relations[P]>
  }




  export type Story_categories_relationsGroupByArgs = {
    where?: story_categories_relationsWhereInput
    orderBy?: Enumerable<story_categories_relationsOrderByWithAggregationInput>
    by: Array<Story_categories_relationsScalarFieldEnum>
    having?: story_categories_relationsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Story_categories_relationsCountAggregateInputType | true
    _avg?: Story_categories_relationsAvgAggregateInputType
    _sum?: Story_categories_relationsSumAggregateInputType
    _min?: Story_categories_relationsMinAggregateInputType
    _max?: Story_categories_relationsMaxAggregateInputType
  }


  export type Story_categories_relationsGroupByOutputType = {
    id: number
    story_category_id: string
    story_id: string
    created_at: Date
    updated_at: Date | null
    _count: Story_categories_relationsCountAggregateOutputType | null
    _avg: Story_categories_relationsAvgAggregateOutputType | null
    _sum: Story_categories_relationsSumAggregateOutputType | null
    _min: Story_categories_relationsMinAggregateOutputType | null
    _max: Story_categories_relationsMaxAggregateOutputType | null
  }

  type GetStory_categories_relationsGroupByPayload<T extends Story_categories_relationsGroupByArgs> = PrismaPromise<
    Array<
      PickArray<Story_categories_relationsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Story_categories_relationsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Story_categories_relationsGroupByOutputType[P]>
            : GetScalarType<T[P], Story_categories_relationsGroupByOutputType[P]>
        }
      >
    >


  export type story_categories_relationsSelect = {
    id?: boolean
    story_categories?: boolean | story_categoriesArgs
    story_category_id?: boolean
    story?: boolean | storiesArgs
    story_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type story_categories_relationsInclude = {
    story_categories?: boolean | story_categoriesArgs
    story?: boolean | storiesArgs
  }

  export type story_categories_relationsGetPayload<
    S extends boolean | null | undefined | story_categories_relationsArgs,
    U = keyof S
      > = S extends true
        ? story_categories_relations
    : S extends undefined
    ? never
    : S extends story_categories_relationsArgs | story_categories_relationsFindManyArgs
    ?'include' extends U
    ? story_categories_relations  & {
    [P in TrueKeys<S['include']>]:
        P extends 'story_categories' ? story_categoriesGetPayload<S['include'][P]> :
        P extends 'story' ? storiesGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'story_categories' ? story_categoriesGetPayload<S['select'][P]> :
        P extends 'story' ? storiesGetPayload<S['select'][P]> :  P extends keyof story_categories_relations ? story_categories_relations[P] : never
  } 
    : story_categories_relations
  : story_categories_relations


  type story_categories_relationsCountArgs = Merge<
    Omit<story_categories_relationsFindManyArgs, 'select' | 'include'> & {
      select?: Story_categories_relationsCountAggregateInputType | true
    }
  >

  export interface story_categories_relationsDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Story_categories_relations that matches the filter.
     * @param {story_categories_relationsFindUniqueArgs} args - Arguments to find a Story_categories_relations
     * @example
     * // Get one Story_categories_relations
     * const story_categories_relations = await prisma.story_categories_relations.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends story_categories_relationsFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, story_categories_relationsFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'story_categories_relations'> extends True ? CheckSelect<T, Prisma__story_categories_relationsClient<story_categories_relations>, Prisma__story_categories_relationsClient<story_categories_relationsGetPayload<T>>> : CheckSelect<T, Prisma__story_categories_relationsClient<story_categories_relations | null >, Prisma__story_categories_relationsClient<story_categories_relationsGetPayload<T> | null >>

    /**
     * Find the first Story_categories_relations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {story_categories_relationsFindFirstArgs} args - Arguments to find a Story_categories_relations
     * @example
     * // Get one Story_categories_relations
     * const story_categories_relations = await prisma.story_categories_relations.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends story_categories_relationsFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, story_categories_relationsFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'story_categories_relations'> extends True ? CheckSelect<T, Prisma__story_categories_relationsClient<story_categories_relations>, Prisma__story_categories_relationsClient<story_categories_relationsGetPayload<T>>> : CheckSelect<T, Prisma__story_categories_relationsClient<story_categories_relations | null >, Prisma__story_categories_relationsClient<story_categories_relationsGetPayload<T> | null >>

    /**
     * Find zero or more Story_categories_relations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {story_categories_relationsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Story_categories_relations
     * const story_categories_relations = await prisma.story_categories_relations.findMany()
     * 
     * // Get first 10 Story_categories_relations
     * const story_categories_relations = await prisma.story_categories_relations.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const story_categories_relationsWithIdOnly = await prisma.story_categories_relations.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends story_categories_relationsFindManyArgs>(
      args?: SelectSubset<T, story_categories_relationsFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<story_categories_relations>>, PrismaPromise<Array<story_categories_relationsGetPayload<T>>>>

    /**
     * Create a Story_categories_relations.
     * @param {story_categories_relationsCreateArgs} args - Arguments to create a Story_categories_relations.
     * @example
     * // Create one Story_categories_relations
     * const Story_categories_relations = await prisma.story_categories_relations.create({
     *   data: {
     *     // ... data to create a Story_categories_relations
     *   }
     * })
     * 
    **/
    create<T extends story_categories_relationsCreateArgs>(
      args: SelectSubset<T, story_categories_relationsCreateArgs>
    ): CheckSelect<T, Prisma__story_categories_relationsClient<story_categories_relations>, Prisma__story_categories_relationsClient<story_categories_relationsGetPayload<T>>>

    /**
     * Create many Story_categories_relations.
     *     @param {story_categories_relationsCreateManyArgs} args - Arguments to create many Story_categories_relations.
     *     @example
     *     // Create many Story_categories_relations
     *     const story_categories_relations = await prisma.story_categories_relations.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends story_categories_relationsCreateManyArgs>(
      args?: SelectSubset<T, story_categories_relationsCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Story_categories_relations.
     * @param {story_categories_relationsDeleteArgs} args - Arguments to delete one Story_categories_relations.
     * @example
     * // Delete one Story_categories_relations
     * const Story_categories_relations = await prisma.story_categories_relations.delete({
     *   where: {
     *     // ... filter to delete one Story_categories_relations
     *   }
     * })
     * 
    **/
    delete<T extends story_categories_relationsDeleteArgs>(
      args: SelectSubset<T, story_categories_relationsDeleteArgs>
    ): CheckSelect<T, Prisma__story_categories_relationsClient<story_categories_relations>, Prisma__story_categories_relationsClient<story_categories_relationsGetPayload<T>>>

    /**
     * Update one Story_categories_relations.
     * @param {story_categories_relationsUpdateArgs} args - Arguments to update one Story_categories_relations.
     * @example
     * // Update one Story_categories_relations
     * const story_categories_relations = await prisma.story_categories_relations.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends story_categories_relationsUpdateArgs>(
      args: SelectSubset<T, story_categories_relationsUpdateArgs>
    ): CheckSelect<T, Prisma__story_categories_relationsClient<story_categories_relations>, Prisma__story_categories_relationsClient<story_categories_relationsGetPayload<T>>>

    /**
     * Delete zero or more Story_categories_relations.
     * @param {story_categories_relationsDeleteManyArgs} args - Arguments to filter Story_categories_relations to delete.
     * @example
     * // Delete a few Story_categories_relations
     * const { count } = await prisma.story_categories_relations.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends story_categories_relationsDeleteManyArgs>(
      args?: SelectSubset<T, story_categories_relationsDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Story_categories_relations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {story_categories_relationsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Story_categories_relations
     * const story_categories_relations = await prisma.story_categories_relations.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends story_categories_relationsUpdateManyArgs>(
      args: SelectSubset<T, story_categories_relationsUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Story_categories_relations.
     * @param {story_categories_relationsUpsertArgs} args - Arguments to update or create a Story_categories_relations.
     * @example
     * // Update or create a Story_categories_relations
     * const story_categories_relations = await prisma.story_categories_relations.upsert({
     *   create: {
     *     // ... data to create a Story_categories_relations
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Story_categories_relations we want to update
     *   }
     * })
    **/
    upsert<T extends story_categories_relationsUpsertArgs>(
      args: SelectSubset<T, story_categories_relationsUpsertArgs>
    ): CheckSelect<T, Prisma__story_categories_relationsClient<story_categories_relations>, Prisma__story_categories_relationsClient<story_categories_relationsGetPayload<T>>>

    /**
     * Count the number of Story_categories_relations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {story_categories_relationsCountArgs} args - Arguments to filter Story_categories_relations to count.
     * @example
     * // Count the number of Story_categories_relations
     * const count = await prisma.story_categories_relations.count({
     *   where: {
     *     // ... the filter for the Story_categories_relations we want to count
     *   }
     * })
    **/
    count<T extends story_categories_relationsCountArgs>(
      args?: Subset<T, story_categories_relationsCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Story_categories_relationsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Story_categories_relations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Story_categories_relationsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Story_categories_relationsAggregateArgs>(args: Subset<T, Story_categories_relationsAggregateArgs>): PrismaPromise<GetStory_categories_relationsAggregateType<T>>

    /**
     * Group by Story_categories_relations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Story_categories_relationsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends Story_categories_relationsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Story_categories_relationsGroupByArgs['orderBy'] }
        : { orderBy?: Story_categories_relationsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, Story_categories_relationsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStory_categories_relationsGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for story_categories_relations.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__story_categories_relationsClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    story_categories<T extends story_categoriesArgs = {}>(args?: Subset<T, story_categoriesArgs>): CheckSelect<T, Prisma__story_categoriesClient<story_categories | null >, Prisma__story_categoriesClient<story_categoriesGetPayload<T> | null >>;

    story<T extends storiesArgs = {}>(args?: Subset<T, storiesArgs>): CheckSelect<T, Prisma__storiesClient<stories | null >, Prisma__storiesClient<storiesGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * story_categories_relations findUnique
   */
  export type story_categories_relationsFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the story_categories_relations
     * 
    **/
    select?: story_categories_relationsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: story_categories_relationsInclude | null
    /**
     * Throw an Error if a story_categories_relations can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which story_categories_relations to fetch.
     * 
    **/
    where: story_categories_relationsWhereUniqueInput
  }


  /**
   * story_categories_relations findFirst
   */
  export type story_categories_relationsFindFirstArgs = {
    /**
     * Select specific fields to fetch from the story_categories_relations
     * 
    **/
    select?: story_categories_relationsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: story_categories_relationsInclude | null
    /**
     * Throw an Error if a story_categories_relations can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which story_categories_relations to fetch.
     * 
    **/
    where?: story_categories_relationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of story_categories_relations to fetch.
     * 
    **/
    orderBy?: Enumerable<story_categories_relationsOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for story_categories_relations.
     * 
    **/
    cursor?: story_categories_relationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` story_categories_relations from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` story_categories_relations.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of story_categories_relations.
     * 
    **/
    distinct?: Enumerable<Story_categories_relationsScalarFieldEnum>
  }


  /**
   * story_categories_relations findMany
   */
  export type story_categories_relationsFindManyArgs = {
    /**
     * Select specific fields to fetch from the story_categories_relations
     * 
    **/
    select?: story_categories_relationsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: story_categories_relationsInclude | null
    /**
     * Filter, which story_categories_relations to fetch.
     * 
    **/
    where?: story_categories_relationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of story_categories_relations to fetch.
     * 
    **/
    orderBy?: Enumerable<story_categories_relationsOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing story_categories_relations.
     * 
    **/
    cursor?: story_categories_relationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` story_categories_relations from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` story_categories_relations.
     * 
    **/
    skip?: number
    distinct?: Enumerable<Story_categories_relationsScalarFieldEnum>
  }


  /**
   * story_categories_relations create
   */
  export type story_categories_relationsCreateArgs = {
    /**
     * Select specific fields to fetch from the story_categories_relations
     * 
    **/
    select?: story_categories_relationsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: story_categories_relationsInclude | null
    /**
     * The data needed to create a story_categories_relations.
     * 
    **/
    data: XOR<story_categories_relationsCreateInput, story_categories_relationsUncheckedCreateInput>
  }


  /**
   * story_categories_relations createMany
   */
  export type story_categories_relationsCreateManyArgs = {
    /**
     * The data used to create many story_categories_relations.
     * 
    **/
    data: Enumerable<story_categories_relationsCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * story_categories_relations update
   */
  export type story_categories_relationsUpdateArgs = {
    /**
     * Select specific fields to fetch from the story_categories_relations
     * 
    **/
    select?: story_categories_relationsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: story_categories_relationsInclude | null
    /**
     * The data needed to update a story_categories_relations.
     * 
    **/
    data: XOR<story_categories_relationsUpdateInput, story_categories_relationsUncheckedUpdateInput>
    /**
     * Choose, which story_categories_relations to update.
     * 
    **/
    where: story_categories_relationsWhereUniqueInput
  }


  /**
   * story_categories_relations updateMany
   */
  export type story_categories_relationsUpdateManyArgs = {
    /**
     * The data used to update story_categories_relations.
     * 
    **/
    data: XOR<story_categories_relationsUpdateManyMutationInput, story_categories_relationsUncheckedUpdateManyInput>
    /**
     * Filter which story_categories_relations to update
     * 
    **/
    where?: story_categories_relationsWhereInput
  }


  /**
   * story_categories_relations upsert
   */
  export type story_categories_relationsUpsertArgs = {
    /**
     * Select specific fields to fetch from the story_categories_relations
     * 
    **/
    select?: story_categories_relationsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: story_categories_relationsInclude | null
    /**
     * The filter to search for the story_categories_relations to update in case it exists.
     * 
    **/
    where: story_categories_relationsWhereUniqueInput
    /**
     * In case the story_categories_relations found by the `where` argument doesn't exist, create a new story_categories_relations with this data.
     * 
    **/
    create: XOR<story_categories_relationsCreateInput, story_categories_relationsUncheckedCreateInput>
    /**
     * In case the story_categories_relations was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<story_categories_relationsUpdateInput, story_categories_relationsUncheckedUpdateInput>
  }


  /**
   * story_categories_relations delete
   */
  export type story_categories_relationsDeleteArgs = {
    /**
     * Select specific fields to fetch from the story_categories_relations
     * 
    **/
    select?: story_categories_relationsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: story_categories_relationsInclude | null
    /**
     * Filter which story_categories_relations to delete.
     * 
    **/
    where: story_categories_relationsWhereUniqueInput
  }


  /**
   * story_categories_relations deleteMany
   */
  export type story_categories_relationsDeleteManyArgs = {
    /**
     * Filter which story_categories_relations to delete
     * 
    **/
    where?: story_categories_relationsWhereInput
  }


  /**
   * story_categories_relations without action
   */
  export type story_categories_relationsArgs = {
    /**
     * Select specific fields to fetch from the story_categories_relations
     * 
    **/
    select?: story_categories_relationsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: story_categories_relationsInclude | null
  }



  /**
   * Model story_dapps_relations
   */


  export type AggregateStory_dapps_relations = {
    _count: Story_dapps_relationsCountAggregateOutputType | null
    _avg: Story_dapps_relationsAvgAggregateOutputType | null
    _sum: Story_dapps_relationsSumAggregateOutputType | null
    _min: Story_dapps_relationsMinAggregateOutputType | null
    _max: Story_dapps_relationsMaxAggregateOutputType | null
  }

  export type Story_dapps_relationsAvgAggregateOutputType = {
    id: number | null
  }

  export type Story_dapps_relationsSumAggregateOutputType = {
    id: number | null
  }

  export type Story_dapps_relationsMinAggregateOutputType = {
    id: number | null
    story_id: string | null
    dapp_id: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Story_dapps_relationsMaxAggregateOutputType = {
    id: number | null
    story_id: string | null
    dapp_id: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Story_dapps_relationsCountAggregateOutputType = {
    id: number
    story_id: number
    dapp_id: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type Story_dapps_relationsAvgAggregateInputType = {
    id?: true
  }

  export type Story_dapps_relationsSumAggregateInputType = {
    id?: true
  }

  export type Story_dapps_relationsMinAggregateInputType = {
    id?: true
    story_id?: true
    dapp_id?: true
    created_at?: true
    updated_at?: true
  }

  export type Story_dapps_relationsMaxAggregateInputType = {
    id?: true
    story_id?: true
    dapp_id?: true
    created_at?: true
    updated_at?: true
  }

  export type Story_dapps_relationsCountAggregateInputType = {
    id?: true
    story_id?: true
    dapp_id?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type Story_dapps_relationsAggregateArgs = {
    /**
     * Filter which story_dapps_relations to aggregate.
     * 
    **/
    where?: story_dapps_relationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of story_dapps_relations to fetch.
     * 
    **/
    orderBy?: Enumerable<story_dapps_relationsOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: story_dapps_relationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` story_dapps_relations from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` story_dapps_relations.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned story_dapps_relations
    **/
    _count?: true | Story_dapps_relationsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Story_dapps_relationsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Story_dapps_relationsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Story_dapps_relationsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Story_dapps_relationsMaxAggregateInputType
  }

  export type GetStory_dapps_relationsAggregateType<T extends Story_dapps_relationsAggregateArgs> = {
        [P in keyof T & keyof AggregateStory_dapps_relations]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateStory_dapps_relations[P]>
      : GetScalarType<T[P], AggregateStory_dapps_relations[P]>
  }




  export type Story_dapps_relationsGroupByArgs = {
    where?: story_dapps_relationsWhereInput
    orderBy?: Enumerable<story_dapps_relationsOrderByWithAggregationInput>
    by: Array<Story_dapps_relationsScalarFieldEnum>
    having?: story_dapps_relationsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Story_dapps_relationsCountAggregateInputType | true
    _avg?: Story_dapps_relationsAvgAggregateInputType
    _sum?: Story_dapps_relationsSumAggregateInputType
    _min?: Story_dapps_relationsMinAggregateInputType
    _max?: Story_dapps_relationsMaxAggregateInputType
  }


  export type Story_dapps_relationsGroupByOutputType = {
    id: number
    story_id: string
    dapp_id: string
    created_at: Date
    updated_at: Date | null
    _count: Story_dapps_relationsCountAggregateOutputType | null
    _avg: Story_dapps_relationsAvgAggregateOutputType | null
    _sum: Story_dapps_relationsSumAggregateOutputType | null
    _min: Story_dapps_relationsMinAggregateOutputType | null
    _max: Story_dapps_relationsMaxAggregateOutputType | null
  }

  type GetStory_dapps_relationsGroupByPayload<T extends Story_dapps_relationsGroupByArgs> = PrismaPromise<
    Array<
      PickArray<Story_dapps_relationsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Story_dapps_relationsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Story_dapps_relationsGroupByOutputType[P]>
            : GetScalarType<T[P], Story_dapps_relationsGroupByOutputType[P]>
        }
      >
    >


  export type story_dapps_relationsSelect = {
    id?: boolean
    story?: boolean | storiesArgs
    story_id?: boolean
    dapp?: boolean | dappsArgs
    dapp_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type story_dapps_relationsInclude = {
    story?: boolean | storiesArgs
    dapp?: boolean | dappsArgs
  }

  export type story_dapps_relationsGetPayload<
    S extends boolean | null | undefined | story_dapps_relationsArgs,
    U = keyof S
      > = S extends true
        ? story_dapps_relations
    : S extends undefined
    ? never
    : S extends story_dapps_relationsArgs | story_dapps_relationsFindManyArgs
    ?'include' extends U
    ? story_dapps_relations  & {
    [P in TrueKeys<S['include']>]:
        P extends 'story' ? storiesGetPayload<S['include'][P]> :
        P extends 'dapp' ? dappsGetPayload<S['include'][P]> :  never
  } 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
        P extends 'story' ? storiesGetPayload<S['select'][P]> :
        P extends 'dapp' ? dappsGetPayload<S['select'][P]> :  P extends keyof story_dapps_relations ? story_dapps_relations[P] : never
  } 
    : story_dapps_relations
  : story_dapps_relations


  type story_dapps_relationsCountArgs = Merge<
    Omit<story_dapps_relationsFindManyArgs, 'select' | 'include'> & {
      select?: Story_dapps_relationsCountAggregateInputType | true
    }
  >

  export interface story_dapps_relationsDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Story_dapps_relations that matches the filter.
     * @param {story_dapps_relationsFindUniqueArgs} args - Arguments to find a Story_dapps_relations
     * @example
     * // Get one Story_dapps_relations
     * const story_dapps_relations = await prisma.story_dapps_relations.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends story_dapps_relationsFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, story_dapps_relationsFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'story_dapps_relations'> extends True ? CheckSelect<T, Prisma__story_dapps_relationsClient<story_dapps_relations>, Prisma__story_dapps_relationsClient<story_dapps_relationsGetPayload<T>>> : CheckSelect<T, Prisma__story_dapps_relationsClient<story_dapps_relations | null >, Prisma__story_dapps_relationsClient<story_dapps_relationsGetPayload<T> | null >>

    /**
     * Find the first Story_dapps_relations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {story_dapps_relationsFindFirstArgs} args - Arguments to find a Story_dapps_relations
     * @example
     * // Get one Story_dapps_relations
     * const story_dapps_relations = await prisma.story_dapps_relations.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends story_dapps_relationsFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, story_dapps_relationsFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'story_dapps_relations'> extends True ? CheckSelect<T, Prisma__story_dapps_relationsClient<story_dapps_relations>, Prisma__story_dapps_relationsClient<story_dapps_relationsGetPayload<T>>> : CheckSelect<T, Prisma__story_dapps_relationsClient<story_dapps_relations | null >, Prisma__story_dapps_relationsClient<story_dapps_relationsGetPayload<T> | null >>

    /**
     * Find zero or more Story_dapps_relations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {story_dapps_relationsFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Story_dapps_relations
     * const story_dapps_relations = await prisma.story_dapps_relations.findMany()
     * 
     * // Get first 10 Story_dapps_relations
     * const story_dapps_relations = await prisma.story_dapps_relations.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const story_dapps_relationsWithIdOnly = await prisma.story_dapps_relations.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends story_dapps_relationsFindManyArgs>(
      args?: SelectSubset<T, story_dapps_relationsFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<story_dapps_relations>>, PrismaPromise<Array<story_dapps_relationsGetPayload<T>>>>

    /**
     * Create a Story_dapps_relations.
     * @param {story_dapps_relationsCreateArgs} args - Arguments to create a Story_dapps_relations.
     * @example
     * // Create one Story_dapps_relations
     * const Story_dapps_relations = await prisma.story_dapps_relations.create({
     *   data: {
     *     // ... data to create a Story_dapps_relations
     *   }
     * })
     * 
    **/
    create<T extends story_dapps_relationsCreateArgs>(
      args: SelectSubset<T, story_dapps_relationsCreateArgs>
    ): CheckSelect<T, Prisma__story_dapps_relationsClient<story_dapps_relations>, Prisma__story_dapps_relationsClient<story_dapps_relationsGetPayload<T>>>

    /**
     * Create many Story_dapps_relations.
     *     @param {story_dapps_relationsCreateManyArgs} args - Arguments to create many Story_dapps_relations.
     *     @example
     *     // Create many Story_dapps_relations
     *     const story_dapps_relations = await prisma.story_dapps_relations.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends story_dapps_relationsCreateManyArgs>(
      args?: SelectSubset<T, story_dapps_relationsCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Story_dapps_relations.
     * @param {story_dapps_relationsDeleteArgs} args - Arguments to delete one Story_dapps_relations.
     * @example
     * // Delete one Story_dapps_relations
     * const Story_dapps_relations = await prisma.story_dapps_relations.delete({
     *   where: {
     *     // ... filter to delete one Story_dapps_relations
     *   }
     * })
     * 
    **/
    delete<T extends story_dapps_relationsDeleteArgs>(
      args: SelectSubset<T, story_dapps_relationsDeleteArgs>
    ): CheckSelect<T, Prisma__story_dapps_relationsClient<story_dapps_relations>, Prisma__story_dapps_relationsClient<story_dapps_relationsGetPayload<T>>>

    /**
     * Update one Story_dapps_relations.
     * @param {story_dapps_relationsUpdateArgs} args - Arguments to update one Story_dapps_relations.
     * @example
     * // Update one Story_dapps_relations
     * const story_dapps_relations = await prisma.story_dapps_relations.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends story_dapps_relationsUpdateArgs>(
      args: SelectSubset<T, story_dapps_relationsUpdateArgs>
    ): CheckSelect<T, Prisma__story_dapps_relationsClient<story_dapps_relations>, Prisma__story_dapps_relationsClient<story_dapps_relationsGetPayload<T>>>

    /**
     * Delete zero or more Story_dapps_relations.
     * @param {story_dapps_relationsDeleteManyArgs} args - Arguments to filter Story_dapps_relations to delete.
     * @example
     * // Delete a few Story_dapps_relations
     * const { count } = await prisma.story_dapps_relations.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends story_dapps_relationsDeleteManyArgs>(
      args?: SelectSubset<T, story_dapps_relationsDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Story_dapps_relations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {story_dapps_relationsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Story_dapps_relations
     * const story_dapps_relations = await prisma.story_dapps_relations.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends story_dapps_relationsUpdateManyArgs>(
      args: SelectSubset<T, story_dapps_relationsUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Story_dapps_relations.
     * @param {story_dapps_relationsUpsertArgs} args - Arguments to update or create a Story_dapps_relations.
     * @example
     * // Update or create a Story_dapps_relations
     * const story_dapps_relations = await prisma.story_dapps_relations.upsert({
     *   create: {
     *     // ... data to create a Story_dapps_relations
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Story_dapps_relations we want to update
     *   }
     * })
    **/
    upsert<T extends story_dapps_relationsUpsertArgs>(
      args: SelectSubset<T, story_dapps_relationsUpsertArgs>
    ): CheckSelect<T, Prisma__story_dapps_relationsClient<story_dapps_relations>, Prisma__story_dapps_relationsClient<story_dapps_relationsGetPayload<T>>>

    /**
     * Count the number of Story_dapps_relations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {story_dapps_relationsCountArgs} args - Arguments to filter Story_dapps_relations to count.
     * @example
     * // Count the number of Story_dapps_relations
     * const count = await prisma.story_dapps_relations.count({
     *   where: {
     *     // ... the filter for the Story_dapps_relations we want to count
     *   }
     * })
    **/
    count<T extends story_dapps_relationsCountArgs>(
      args?: Subset<T, story_dapps_relationsCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Story_dapps_relationsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Story_dapps_relations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Story_dapps_relationsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Story_dapps_relationsAggregateArgs>(args: Subset<T, Story_dapps_relationsAggregateArgs>): PrismaPromise<GetStory_dapps_relationsAggregateType<T>>

    /**
     * Group by Story_dapps_relations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Story_dapps_relationsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends Story_dapps_relationsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Story_dapps_relationsGroupByArgs['orderBy'] }
        : { orderBy?: Story_dapps_relationsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, Story_dapps_relationsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetStory_dapps_relationsGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for story_dapps_relations.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__story_dapps_relationsClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';

    story<T extends storiesArgs = {}>(args?: Subset<T, storiesArgs>): CheckSelect<T, Prisma__storiesClient<stories | null >, Prisma__storiesClient<storiesGetPayload<T> | null >>;

    dapp<T extends dappsArgs = {}>(args?: Subset<T, dappsArgs>): CheckSelect<T, Prisma__dappsClient<dapps | null >, Prisma__dappsClient<dappsGetPayload<T> | null >>;

    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * story_dapps_relations findUnique
   */
  export type story_dapps_relationsFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the story_dapps_relations
     * 
    **/
    select?: story_dapps_relationsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: story_dapps_relationsInclude | null
    /**
     * Throw an Error if a story_dapps_relations can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which story_dapps_relations to fetch.
     * 
    **/
    where: story_dapps_relationsWhereUniqueInput
  }


  /**
   * story_dapps_relations findFirst
   */
  export type story_dapps_relationsFindFirstArgs = {
    /**
     * Select specific fields to fetch from the story_dapps_relations
     * 
    **/
    select?: story_dapps_relationsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: story_dapps_relationsInclude | null
    /**
     * Throw an Error if a story_dapps_relations can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which story_dapps_relations to fetch.
     * 
    **/
    where?: story_dapps_relationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of story_dapps_relations to fetch.
     * 
    **/
    orderBy?: Enumerable<story_dapps_relationsOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for story_dapps_relations.
     * 
    **/
    cursor?: story_dapps_relationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` story_dapps_relations from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` story_dapps_relations.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of story_dapps_relations.
     * 
    **/
    distinct?: Enumerable<Story_dapps_relationsScalarFieldEnum>
  }


  /**
   * story_dapps_relations findMany
   */
  export type story_dapps_relationsFindManyArgs = {
    /**
     * Select specific fields to fetch from the story_dapps_relations
     * 
    **/
    select?: story_dapps_relationsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: story_dapps_relationsInclude | null
    /**
     * Filter, which story_dapps_relations to fetch.
     * 
    **/
    where?: story_dapps_relationsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of story_dapps_relations to fetch.
     * 
    **/
    orderBy?: Enumerable<story_dapps_relationsOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing story_dapps_relations.
     * 
    **/
    cursor?: story_dapps_relationsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` story_dapps_relations from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` story_dapps_relations.
     * 
    **/
    skip?: number
    distinct?: Enumerable<Story_dapps_relationsScalarFieldEnum>
  }


  /**
   * story_dapps_relations create
   */
  export type story_dapps_relationsCreateArgs = {
    /**
     * Select specific fields to fetch from the story_dapps_relations
     * 
    **/
    select?: story_dapps_relationsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: story_dapps_relationsInclude | null
    /**
     * The data needed to create a story_dapps_relations.
     * 
    **/
    data: XOR<story_dapps_relationsCreateInput, story_dapps_relationsUncheckedCreateInput>
  }


  /**
   * story_dapps_relations createMany
   */
  export type story_dapps_relationsCreateManyArgs = {
    /**
     * The data used to create many story_dapps_relations.
     * 
    **/
    data: Enumerable<story_dapps_relationsCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * story_dapps_relations update
   */
  export type story_dapps_relationsUpdateArgs = {
    /**
     * Select specific fields to fetch from the story_dapps_relations
     * 
    **/
    select?: story_dapps_relationsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: story_dapps_relationsInclude | null
    /**
     * The data needed to update a story_dapps_relations.
     * 
    **/
    data: XOR<story_dapps_relationsUpdateInput, story_dapps_relationsUncheckedUpdateInput>
    /**
     * Choose, which story_dapps_relations to update.
     * 
    **/
    where: story_dapps_relationsWhereUniqueInput
  }


  /**
   * story_dapps_relations updateMany
   */
  export type story_dapps_relationsUpdateManyArgs = {
    /**
     * The data used to update story_dapps_relations.
     * 
    **/
    data: XOR<story_dapps_relationsUpdateManyMutationInput, story_dapps_relationsUncheckedUpdateManyInput>
    /**
     * Filter which story_dapps_relations to update
     * 
    **/
    where?: story_dapps_relationsWhereInput
  }


  /**
   * story_dapps_relations upsert
   */
  export type story_dapps_relationsUpsertArgs = {
    /**
     * Select specific fields to fetch from the story_dapps_relations
     * 
    **/
    select?: story_dapps_relationsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: story_dapps_relationsInclude | null
    /**
     * The filter to search for the story_dapps_relations to update in case it exists.
     * 
    **/
    where: story_dapps_relationsWhereUniqueInput
    /**
     * In case the story_dapps_relations found by the `where` argument doesn't exist, create a new story_dapps_relations with this data.
     * 
    **/
    create: XOR<story_dapps_relationsCreateInput, story_dapps_relationsUncheckedCreateInput>
    /**
     * In case the story_dapps_relations was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<story_dapps_relationsUpdateInput, story_dapps_relationsUncheckedUpdateInput>
  }


  /**
   * story_dapps_relations delete
   */
  export type story_dapps_relationsDeleteArgs = {
    /**
     * Select specific fields to fetch from the story_dapps_relations
     * 
    **/
    select?: story_dapps_relationsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: story_dapps_relationsInclude | null
    /**
     * Filter which story_dapps_relations to delete.
     * 
    **/
    where: story_dapps_relationsWhereUniqueInput
  }


  /**
   * story_dapps_relations deleteMany
   */
  export type story_dapps_relationsDeleteManyArgs = {
    /**
     * Filter which story_dapps_relations to delete
     * 
    **/
    where?: story_dapps_relationsWhereInput
  }


  /**
   * story_dapps_relations without action
   */
  export type story_dapps_relationsArgs = {
    /**
     * Select specific fields to fetch from the story_dapps_relations
     * 
    **/
    select?: story_dapps_relationsSelect | null
    /**
     * Choose, which related nodes to fetch as well.
     * 
    **/
    include?: story_dapps_relationsInclude | null
  }



  /**
   * Model tokens
   */


  export type AggregateTokens = {
    _count: TokensCountAggregateOutputType | null
    _avg: TokensAvgAggregateOutputType | null
    _sum: TokensSumAggregateOutputType | null
    _min: TokensMinAggregateOutputType | null
    _max: TokensMaxAggregateOutputType | null
  }

  export type TokensAvgAggregateOutputType = {
    cmcRank: number | null
    marketPairCount: number | null
    circulatingSupply: number | null
    selfReportedCirculatingSupply: number | null
    totalSupply: number | null
    maxSupply: number | null
    ath: number | null
    atl: number | null
    high24h: number | null
    low24h: number | null
    isActive: number | null
  }

  export type TokensSumAggregateOutputType = {
    cmcRank: number | null
    marketPairCount: number | null
    circulatingSupply: number | null
    selfReportedCirculatingSupply: number | null
    totalSupply: number | null
    maxSupply: number | null
    ath: number | null
    atl: number | null
    high24h: number | null
    low24h: number | null
    isActive: number | null
  }

  export type TokensMinAggregateOutputType = {
    id: string | null
    name: string | null
    symbol: string | null
    slug: string | null
    cmcRank: number | null
    marketPairCount: number | null
    circulatingSupply: number | null
    selfReportedCirculatingSupply: number | null
    totalSupply: number | null
    maxSupply: number | null
    ath: number | null
    atl: number | null
    high24h: number | null
    low24h: number | null
    isActive: number | null
    lastUpdated: Date | null
    dateAdded: Date | null
    created_at: Date | null
    updated_at: Date | null
    isAudited: boolean | null
  }

  export type TokensMaxAggregateOutputType = {
    id: string | null
    name: string | null
    symbol: string | null
    slug: string | null
    cmcRank: number | null
    marketPairCount: number | null
    circulatingSupply: number | null
    selfReportedCirculatingSupply: number | null
    totalSupply: number | null
    maxSupply: number | null
    ath: number | null
    atl: number | null
    high24h: number | null
    low24h: number | null
    isActive: number | null
    lastUpdated: Date | null
    dateAdded: Date | null
    created_at: Date | null
    updated_at: Date | null
    isAudited: boolean | null
  }

  export type TokensCountAggregateOutputType = {
    id: number
    name: number
    symbol: number
    slug: number
    cmcRank: number
    marketPairCount: number
    circulatingSupply: number
    selfReportedCirculatingSupply: number
    totalSupply: number
    maxSupply: number
    ath: number
    atl: number
    high24h: number
    low24h: number
    isActive: number
    lastUpdated: number
    dateAdded: number
    created_at: number
    updated_at: number
    isAudited: number
    _all: number
  }


  export type TokensAvgAggregateInputType = {
    cmcRank?: true
    marketPairCount?: true
    circulatingSupply?: true
    selfReportedCirculatingSupply?: true
    totalSupply?: true
    maxSupply?: true
    ath?: true
    atl?: true
    high24h?: true
    low24h?: true
    isActive?: true
  }

  export type TokensSumAggregateInputType = {
    cmcRank?: true
    marketPairCount?: true
    circulatingSupply?: true
    selfReportedCirculatingSupply?: true
    totalSupply?: true
    maxSupply?: true
    ath?: true
    atl?: true
    high24h?: true
    low24h?: true
    isActive?: true
  }

  export type TokensMinAggregateInputType = {
    id?: true
    name?: true
    symbol?: true
    slug?: true
    cmcRank?: true
    marketPairCount?: true
    circulatingSupply?: true
    selfReportedCirculatingSupply?: true
    totalSupply?: true
    maxSupply?: true
    ath?: true
    atl?: true
    high24h?: true
    low24h?: true
    isActive?: true
    lastUpdated?: true
    dateAdded?: true
    created_at?: true
    updated_at?: true
    isAudited?: true
  }

  export type TokensMaxAggregateInputType = {
    id?: true
    name?: true
    symbol?: true
    slug?: true
    cmcRank?: true
    marketPairCount?: true
    circulatingSupply?: true
    selfReportedCirculatingSupply?: true
    totalSupply?: true
    maxSupply?: true
    ath?: true
    atl?: true
    high24h?: true
    low24h?: true
    isActive?: true
    lastUpdated?: true
    dateAdded?: true
    created_at?: true
    updated_at?: true
    isAudited?: true
  }

  export type TokensCountAggregateInputType = {
    id?: true
    name?: true
    symbol?: true
    slug?: true
    cmcRank?: true
    marketPairCount?: true
    circulatingSupply?: true
    selfReportedCirculatingSupply?: true
    totalSupply?: true
    maxSupply?: true
    ath?: true
    atl?: true
    high24h?: true
    low24h?: true
    isActive?: true
    lastUpdated?: true
    dateAdded?: true
    created_at?: true
    updated_at?: true
    isAudited?: true
    _all?: true
  }

  export type TokensAggregateArgs = {
    /**
     * Filter which tokens to aggregate.
     * 
    **/
    where?: tokensWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tokens to fetch.
     * 
    **/
    orderBy?: Enumerable<tokensOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: tokensWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tokens from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tokens.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned tokens
    **/
    _count?: true | TokensCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TokensAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TokensSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TokensMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TokensMaxAggregateInputType
  }

  export type GetTokensAggregateType<T extends TokensAggregateArgs> = {
        [P in keyof T & keyof AggregateTokens]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTokens[P]>
      : GetScalarType<T[P], AggregateTokens[P]>
  }




  export type TokensGroupByArgs = {
    where?: tokensWhereInput
    orderBy?: Enumerable<tokensOrderByWithAggregationInput>
    by: Array<TokensScalarFieldEnum>
    having?: tokensScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TokensCountAggregateInputType | true
    _avg?: TokensAvgAggregateInputType
    _sum?: TokensSumAggregateInputType
    _min?: TokensMinAggregateInputType
    _max?: TokensMaxAggregateInputType
  }


  export type TokensGroupByOutputType = {
    id: string
    name: string
    symbol: string
    slug: string
    cmcRank: number | null
    marketPairCount: number | null
    circulatingSupply: number | null
    selfReportedCirculatingSupply: number | null
    totalSupply: number | null
    maxSupply: number | null
    ath: number | null
    atl: number | null
    high24h: number | null
    low24h: number | null
    isActive: number | null
    lastUpdated: Date | null
    dateAdded: Date | null
    created_at: Date
    updated_at: Date | null
    isAudited: boolean
    _count: TokensCountAggregateOutputType | null
    _avg: TokensAvgAggregateOutputType | null
    _sum: TokensSumAggregateOutputType | null
    _min: TokensMinAggregateOutputType | null
    _max: TokensMaxAggregateOutputType | null
  }

  type GetTokensGroupByPayload<T extends TokensGroupByArgs> = PrismaPromise<
    Array<
      PickArray<TokensGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TokensGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TokensGroupByOutputType[P]>
            : GetScalarType<T[P], TokensGroupByOutputType[P]>
        }
      >
    >


  export type tokensSelect = {
    id?: boolean
    name?: boolean
    symbol?: boolean
    slug?: boolean
    cmcRank?: boolean
    marketPairCount?: boolean
    circulatingSupply?: boolean
    selfReportedCirculatingSupply?: boolean
    totalSupply?: boolean
    maxSupply?: boolean
    ath?: boolean
    atl?: boolean
    high24h?: boolean
    low24h?: boolean
    isActive?: boolean
    lastUpdated?: boolean
    dateAdded?: boolean
    created_at?: boolean
    updated_at?: boolean
    isAudited?: boolean
  }

  export type tokensGetPayload<
    S extends boolean | null | undefined | tokensArgs,
    U = keyof S
      > = S extends true
        ? tokens
    : S extends undefined
    ? never
    : S extends tokensArgs | tokensFindManyArgs
    ?'include' extends U
    ? tokens 
    : 'select' extends U
    ? {
    [P in TrueKeys<S['select']>]:
    P extends keyof tokens ? tokens[P] : never
  } 
    : tokens
  : tokens


  type tokensCountArgs = Merge<
    Omit<tokensFindManyArgs, 'select' | 'include'> & {
      select?: TokensCountAggregateInputType | true
    }
  >

  export interface tokensDelegate<GlobalRejectSettings> {
    /**
     * Find zero or one Tokens that matches the filter.
     * @param {tokensFindUniqueArgs} args - Arguments to find a Tokens
     * @example
     * // Get one Tokens
     * const tokens = await prisma.tokens.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends tokensFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, tokensFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'tokens'> extends True ? CheckSelect<T, Prisma__tokensClient<tokens>, Prisma__tokensClient<tokensGetPayload<T>>> : CheckSelect<T, Prisma__tokensClient<tokens | null >, Prisma__tokensClient<tokensGetPayload<T> | null >>

    /**
     * Find the first Tokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tokensFindFirstArgs} args - Arguments to find a Tokens
     * @example
     * // Get one Tokens
     * const tokens = await prisma.tokens.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends tokensFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, tokensFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'tokens'> extends True ? CheckSelect<T, Prisma__tokensClient<tokens>, Prisma__tokensClient<tokensGetPayload<T>>> : CheckSelect<T, Prisma__tokensClient<tokens | null >, Prisma__tokensClient<tokensGetPayload<T> | null >>

    /**
     * Find zero or more Tokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tokensFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tokens
     * const tokens = await prisma.tokens.findMany()
     * 
     * // Get first 10 Tokens
     * const tokens = await prisma.tokens.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tokensWithIdOnly = await prisma.tokens.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends tokensFindManyArgs>(
      args?: SelectSubset<T, tokensFindManyArgs>
    ): CheckSelect<T, PrismaPromise<Array<tokens>>, PrismaPromise<Array<tokensGetPayload<T>>>>

    /**
     * Create a Tokens.
     * @param {tokensCreateArgs} args - Arguments to create a Tokens.
     * @example
     * // Create one Tokens
     * const Tokens = await prisma.tokens.create({
     *   data: {
     *     // ... data to create a Tokens
     *   }
     * })
     * 
    **/
    create<T extends tokensCreateArgs>(
      args: SelectSubset<T, tokensCreateArgs>
    ): CheckSelect<T, Prisma__tokensClient<tokens>, Prisma__tokensClient<tokensGetPayload<T>>>

    /**
     * Create many Tokens.
     *     @param {tokensCreateManyArgs} args - Arguments to create many Tokens.
     *     @example
     *     // Create many Tokens
     *     const tokens = await prisma.tokens.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends tokensCreateManyArgs>(
      args?: SelectSubset<T, tokensCreateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Delete a Tokens.
     * @param {tokensDeleteArgs} args - Arguments to delete one Tokens.
     * @example
     * // Delete one Tokens
     * const Tokens = await prisma.tokens.delete({
     *   where: {
     *     // ... filter to delete one Tokens
     *   }
     * })
     * 
    **/
    delete<T extends tokensDeleteArgs>(
      args: SelectSubset<T, tokensDeleteArgs>
    ): CheckSelect<T, Prisma__tokensClient<tokens>, Prisma__tokensClient<tokensGetPayload<T>>>

    /**
     * Update one Tokens.
     * @param {tokensUpdateArgs} args - Arguments to update one Tokens.
     * @example
     * // Update one Tokens
     * const tokens = await prisma.tokens.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends tokensUpdateArgs>(
      args: SelectSubset<T, tokensUpdateArgs>
    ): CheckSelect<T, Prisma__tokensClient<tokens>, Prisma__tokensClient<tokensGetPayload<T>>>

    /**
     * Delete zero or more Tokens.
     * @param {tokensDeleteManyArgs} args - Arguments to filter Tokens to delete.
     * @example
     * // Delete a few Tokens
     * const { count } = await prisma.tokens.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends tokensDeleteManyArgs>(
      args?: SelectSubset<T, tokensDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tokensUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tokens
     * const tokens = await prisma.tokens.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends tokensUpdateManyArgs>(
      args: SelectSubset<T, tokensUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one Tokens.
     * @param {tokensUpsertArgs} args - Arguments to update or create a Tokens.
     * @example
     * // Update or create a Tokens
     * const tokens = await prisma.tokens.upsert({
     *   create: {
     *     // ... data to create a Tokens
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tokens we want to update
     *   }
     * })
    **/
    upsert<T extends tokensUpsertArgs>(
      args: SelectSubset<T, tokensUpsertArgs>
    ): CheckSelect<T, Prisma__tokensClient<tokens>, Prisma__tokensClient<tokensGetPayload<T>>>

    /**
     * Count the number of Tokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tokensCountArgs} args - Arguments to filter Tokens to count.
     * @example
     * // Count the number of Tokens
     * const count = await prisma.tokens.count({
     *   where: {
     *     // ... the filter for the Tokens we want to count
     *   }
     * })
    **/
    count<T extends tokensCountArgs>(
      args?: Subset<T, tokensCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TokensCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokensAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TokensAggregateArgs>(args: Subset<T, TokensAggregateArgs>): PrismaPromise<GetTokensAggregateType<T>>

    /**
     * Group by Tokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TokensGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TokensGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TokensGroupByArgs['orderBy'] }
        : { orderBy?: TokensGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TokensGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTokensGroupByPayload<T> : PrismaPromise<InputErrors>
  }

  /**
   * The delegate class that acts as a "Promise-like" for tokens.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__tokensClient<T> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }

  // Custom InputTypes

  /**
   * tokens findUnique
   */
  export type tokensFindUniqueArgs = {
    /**
     * Select specific fields to fetch from the tokens
     * 
    **/
    select?: tokensSelect | null
    /**
     * Throw an Error if a tokens can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which tokens to fetch.
     * 
    **/
    where: tokensWhereUniqueInput
  }


  /**
   * tokens findFirst
   */
  export type tokensFindFirstArgs = {
    /**
     * Select specific fields to fetch from the tokens
     * 
    **/
    select?: tokensSelect | null
    /**
     * Throw an Error if a tokens can't be found
     * 
    **/
    rejectOnNotFound?: RejectOnNotFound
    /**
     * Filter, which tokens to fetch.
     * 
    **/
    where?: tokensWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tokens to fetch.
     * 
    **/
    orderBy?: Enumerable<tokensOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tokens.
     * 
    **/
    cursor?: tokensWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tokens from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tokens.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tokens.
     * 
    **/
    distinct?: Enumerable<TokensScalarFieldEnum>
  }


  /**
   * tokens findMany
   */
  export type tokensFindManyArgs = {
    /**
     * Select specific fields to fetch from the tokens
     * 
    **/
    select?: tokensSelect | null
    /**
     * Filter, which tokens to fetch.
     * 
    **/
    where?: tokensWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tokens to fetch.
     * 
    **/
    orderBy?: Enumerable<tokensOrderByWithRelationAndSearchRelevanceInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing tokens.
     * 
    **/
    cursor?: tokensWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tokens from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tokens.
     * 
    **/
    skip?: number
    distinct?: Enumerable<TokensScalarFieldEnum>
  }


  /**
   * tokens create
   */
  export type tokensCreateArgs = {
    /**
     * Select specific fields to fetch from the tokens
     * 
    **/
    select?: tokensSelect | null
    /**
     * The data needed to create a tokens.
     * 
    **/
    data: XOR<tokensCreateInput, tokensUncheckedCreateInput>
  }


  /**
   * tokens createMany
   */
  export type tokensCreateManyArgs = {
    /**
     * The data used to create many tokens.
     * 
    **/
    data: Enumerable<tokensCreateManyInput>
    skipDuplicates?: boolean
  }


  /**
   * tokens update
   */
  export type tokensUpdateArgs = {
    /**
     * Select specific fields to fetch from the tokens
     * 
    **/
    select?: tokensSelect | null
    /**
     * The data needed to update a tokens.
     * 
    **/
    data: XOR<tokensUpdateInput, tokensUncheckedUpdateInput>
    /**
     * Choose, which tokens to update.
     * 
    **/
    where: tokensWhereUniqueInput
  }


  /**
   * tokens updateMany
   */
  export type tokensUpdateManyArgs = {
    /**
     * The data used to update tokens.
     * 
    **/
    data: XOR<tokensUpdateManyMutationInput, tokensUncheckedUpdateManyInput>
    /**
     * Filter which tokens to update
     * 
    **/
    where?: tokensWhereInput
  }


  /**
   * tokens upsert
   */
  export type tokensUpsertArgs = {
    /**
     * Select specific fields to fetch from the tokens
     * 
    **/
    select?: tokensSelect | null
    /**
     * The filter to search for the tokens to update in case it exists.
     * 
    **/
    where: tokensWhereUniqueInput
    /**
     * In case the tokens found by the `where` argument doesn't exist, create a new tokens with this data.
     * 
    **/
    create: XOR<tokensCreateInput, tokensUncheckedCreateInput>
    /**
     * In case the tokens was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<tokensUpdateInput, tokensUncheckedUpdateInput>
  }


  /**
   * tokens delete
   */
  export type tokensDeleteArgs = {
    /**
     * Select specific fields to fetch from the tokens
     * 
    **/
    select?: tokensSelect | null
    /**
     * Filter which tokens to delete.
     * 
    **/
    where: tokensWhereUniqueInput
  }


  /**
   * tokens deleteMany
   */
  export type tokensDeleteManyArgs = {
    /**
     * Filter which tokens to delete
     * 
    **/
    where?: tokensWhereInput
  }


  /**
   * tokens without action
   */
  export type tokensArgs = {
    /**
     * Select specific fields to fetch from the tokens
     * 
    **/
    select?: tokensSelect | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const UsersScalarFieldEnum: {
    id: 'id',
    address: 'address',
    name: 'name',
    nonce: 'nonce',
    status: 'status',
    role: 'role',
    settings: 'settings',
    created_at: 'created_at',
    updated_at: 'updated_at',
    deleted_at: 'deleted_at'
  };

  export type UsersScalarFieldEnum = (typeof UsersScalarFieldEnum)[keyof typeof UsersScalarFieldEnum]


  export const WhitelistsScalarFieldEnum: {
    id: 'id',
    address: 'address',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type WhitelistsScalarFieldEnum = (typeof WhitelistsScalarFieldEnum)[keyof typeof WhitelistsScalarFieldEnum]


  export const FavsScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    created_at: 'created_at',
    updated_at: 'updated_at',
    project_id: 'project_id',
    project_type: 'project_type'
  };

  export type FavsScalarFieldEnum = (typeof FavsScalarFieldEnum)[keyof typeof FavsScalarFieldEnum]


  export const Visit_historiesScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    project_id: 'project_id',
    project_type: 'project_type',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type Visit_historiesScalarFieldEnum = (typeof Visit_historiesScalarFieldEnum)[keyof typeof Visit_historiesScalarFieldEnum]


  export const AlarmsScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    alarm_at: 'alarm_at',
    desc: 'desc',
    created_at: 'created_at',
    updated_at: 'updated_at',
    color: 'color',
    url: 'url'
  };

  export type AlarmsScalarFieldEnum = (typeof AlarmsScalarFieldEnum)[keyof typeof AlarmsScalarFieldEnum]


  export const ReportsScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    url: 'url',
    project_type: 'project_type',
    project_name: 'project_name',
    created_at: 'created_at',
    updated_at: 'updated_at',
    is_scam: 'is_scam'
  };

  export type ReportsScalarFieldEnum = (typeof ReportsScalarFieldEnum)[keyof typeof ReportsScalarFieldEnum]


  export const DappsScalarFieldEnum: {
    id: 'id',
    title: 'title',
    url: 'url',
    logo: 'logo',
    desc: 'desc',
    created_at: 'created_at',
    updated_at: 'updated_at',
    visit_count: 'visit_count',
    install_count: 'install_count',
    visible: 'visible',
    is_good: 'is_good',
    add_by_admin: 'add_by_admin'
  };

  export type DappsScalarFieldEnum = (typeof DappsScalarFieldEnum)[keyof typeof DappsScalarFieldEnum]


  export const Dapp_categoriesScalarFieldEnum: {
    id: 'id',
    title: 'title',
    desc: 'desc',
    sort: 'sort',
    is_deleted: 'is_deleted'
  };

  export type Dapp_categoriesScalarFieldEnum = (typeof Dapp_categoriesScalarFieldEnum)[keyof typeof Dapp_categoriesScalarFieldEnum]


  export const Dapp_categories_relationsScalarFieldEnum: {
    id: 'id',
    website_category_id: 'website_category_id',
    subcategory_id: 'subcategory_id',
    dapp_id: 'dapp_id',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type Dapp_categories_relationsScalarFieldEnum = (typeof Dapp_categories_relationsScalarFieldEnum)[keyof typeof Dapp_categories_relationsScalarFieldEnum]


  export const User_dappsScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    dapp_id: 'dapp_id',
    created_at: 'created_at',
    updated_at: 'updated_at',
    user_dapps_catogories_id: 'user_dapps_catogories_id'
  };

  export type User_dappsScalarFieldEnum = (typeof User_dappsScalarFieldEnum)[keyof typeof User_dappsScalarFieldEnum]


  export const User_dapps_catogoriesScalarFieldEnum: {
    id: 'id',
    title: 'title',
    desc: 'desc',
    sort: 'sort',
    created_at: 'created_at',
    updated_at: 'updated_at',
    user_id: 'user_id'
  };

  export type User_dapps_catogoriesScalarFieldEnum = (typeof User_dapps_catogoriesScalarFieldEnum)[keyof typeof User_dapps_catogoriesScalarFieldEnum]


  export const StoriesScalarFieldEnum: {
    id: 'id',
    title: 'title',
    cover: 'cover',
    desc: 'desc',
    url: 'url',
    created_at: 'created_at',
    updated_at: 'updated_at',
    visible: 'visible',
    sort: 'sort',
    is_deleted: 'is_deleted',
    visit_count: 'visit_count'
  };

  export type StoriesScalarFieldEnum = (typeof StoriesScalarFieldEnum)[keyof typeof StoriesScalarFieldEnum]


  export const Story_categoriesScalarFieldEnum: {
    id: 'id',
    title: 'title',
    desc: 'desc',
    sort: 'sort',
    is_deleted: 'is_deleted',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type Story_categoriesScalarFieldEnum = (typeof Story_categoriesScalarFieldEnum)[keyof typeof Story_categoriesScalarFieldEnum]


  export const Story_categories_relationsScalarFieldEnum: {
    id: 'id',
    story_category_id: 'story_category_id',
    story_id: 'story_id',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type Story_categories_relationsScalarFieldEnum = (typeof Story_categories_relationsScalarFieldEnum)[keyof typeof Story_categories_relationsScalarFieldEnum]


  export const Story_dapps_relationsScalarFieldEnum: {
    id: 'id',
    story_id: 'story_id',
    dapp_id: 'dapp_id',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type Story_dapps_relationsScalarFieldEnum = (typeof Story_dapps_relationsScalarFieldEnum)[keyof typeof Story_dapps_relationsScalarFieldEnum]


  export const TokensScalarFieldEnum: {
    id: 'id',
    name: 'name',
    symbol: 'symbol',
    slug: 'slug',
    cmcRank: 'cmcRank',
    marketPairCount: 'marketPairCount',
    circulatingSupply: 'circulatingSupply',
    selfReportedCirculatingSupply: 'selfReportedCirculatingSupply',
    totalSupply: 'totalSupply',
    maxSupply: 'maxSupply',
    ath: 'ath',
    atl: 'atl',
    high24h: 'high24h',
    low24h: 'low24h',
    isActive: 'isActive',
    lastUpdated: 'lastUpdated',
    dateAdded: 'dateAdded',
    created_at: 'created_at',
    updated_at: 'updated_at',
    isAudited: 'isAudited'
  };

  export type TokensScalarFieldEnum = (typeof TokensScalarFieldEnum)[keyof typeof TokensScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: 'DbNull',
    JsonNull: 'JsonNull'
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: 'DbNull',
    JsonNull: 'JsonNull',
    AnyNull: 'AnyNull'
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const usersOrderByRelevanceFieldEnum: {
    id: 'id',
    address: 'address',
    name: 'name',
    nonce: 'nonce'
  };

  export type usersOrderByRelevanceFieldEnum = (typeof usersOrderByRelevanceFieldEnum)[keyof typeof usersOrderByRelevanceFieldEnum]


  export const whitelistsOrderByRelevanceFieldEnum: {
    address: 'address'
  };

  export type whitelistsOrderByRelevanceFieldEnum = (typeof whitelistsOrderByRelevanceFieldEnum)[keyof typeof whitelistsOrderByRelevanceFieldEnum]


  export const favsOrderByRelevanceFieldEnum: {
    id: 'id',
    user_id: 'user_id'
  };

  export type favsOrderByRelevanceFieldEnum = (typeof favsOrderByRelevanceFieldEnum)[keyof typeof favsOrderByRelevanceFieldEnum]


  export const visit_historiesOrderByRelevanceFieldEnum: {
    id: 'id',
    user_id: 'user_id'
  };

  export type visit_historiesOrderByRelevanceFieldEnum = (typeof visit_historiesOrderByRelevanceFieldEnum)[keyof typeof visit_historiesOrderByRelevanceFieldEnum]


  export const alarmsOrderByRelevanceFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    desc: 'desc',
    color: 'color',
    url: 'url'
  };

  export type alarmsOrderByRelevanceFieldEnum = (typeof alarmsOrderByRelevanceFieldEnum)[keyof typeof alarmsOrderByRelevanceFieldEnum]


  export const reportsOrderByRelevanceFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    url: 'url',
    project_type: 'project_type',
    project_name: 'project_name'
  };

  export type reportsOrderByRelevanceFieldEnum = (typeof reportsOrderByRelevanceFieldEnum)[keyof typeof reportsOrderByRelevanceFieldEnum]


  export const dappsOrderByRelevanceFieldEnum: {
    id: 'id',
    title: 'title',
    url: 'url',
    logo: 'logo',
    desc: 'desc'
  };

  export type dappsOrderByRelevanceFieldEnum = (typeof dappsOrderByRelevanceFieldEnum)[keyof typeof dappsOrderByRelevanceFieldEnum]


  export const dapp_categoriesOrderByRelevanceFieldEnum: {
    id: 'id',
    title: 'title',
    desc: 'desc'
  };

  export type dapp_categoriesOrderByRelevanceFieldEnum = (typeof dapp_categoriesOrderByRelevanceFieldEnum)[keyof typeof dapp_categoriesOrderByRelevanceFieldEnum]


  export const dapp_categories_relationsOrderByRelevanceFieldEnum: {
    website_category_id: 'website_category_id',
    subcategory_id: 'subcategory_id',
    dapp_id: 'dapp_id'
  };

  export type dapp_categories_relationsOrderByRelevanceFieldEnum = (typeof dapp_categories_relationsOrderByRelevanceFieldEnum)[keyof typeof dapp_categories_relationsOrderByRelevanceFieldEnum]


  export const user_dappsOrderByRelevanceFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    dapp_id: 'dapp_id',
    user_dapps_catogories_id: 'user_dapps_catogories_id'
  };

  export type user_dappsOrderByRelevanceFieldEnum = (typeof user_dappsOrderByRelevanceFieldEnum)[keyof typeof user_dappsOrderByRelevanceFieldEnum]


  export const user_dapps_catogoriesOrderByRelevanceFieldEnum: {
    id: 'id',
    title: 'title',
    desc: 'desc',
    user_id: 'user_id'
  };

  export type user_dapps_catogoriesOrderByRelevanceFieldEnum = (typeof user_dapps_catogoriesOrderByRelevanceFieldEnum)[keyof typeof user_dapps_catogoriesOrderByRelevanceFieldEnum]


  export const storiesOrderByRelevanceFieldEnum: {
    id: 'id',
    title: 'title',
    cover: 'cover',
    desc: 'desc',
    url: 'url'
  };

  export type storiesOrderByRelevanceFieldEnum = (typeof storiesOrderByRelevanceFieldEnum)[keyof typeof storiesOrderByRelevanceFieldEnum]


  export const story_categoriesOrderByRelevanceFieldEnum: {
    id: 'id',
    title: 'title',
    desc: 'desc'
  };

  export type story_categoriesOrderByRelevanceFieldEnum = (typeof story_categoriesOrderByRelevanceFieldEnum)[keyof typeof story_categoriesOrderByRelevanceFieldEnum]


  export const story_categories_relationsOrderByRelevanceFieldEnum: {
    story_category_id: 'story_category_id',
    story_id: 'story_id'
  };

  export type story_categories_relationsOrderByRelevanceFieldEnum = (typeof story_categories_relationsOrderByRelevanceFieldEnum)[keyof typeof story_categories_relationsOrderByRelevanceFieldEnum]


  export const story_dapps_relationsOrderByRelevanceFieldEnum: {
    story_id: 'story_id',
    dapp_id: 'dapp_id'
  };

  export type story_dapps_relationsOrderByRelevanceFieldEnum = (typeof story_dapps_relationsOrderByRelevanceFieldEnum)[keyof typeof story_dapps_relationsOrderByRelevanceFieldEnum]


  export const tokensOrderByRelevanceFieldEnum: {
    id: 'id',
    name: 'name',
    symbol: 'symbol',
    slug: 'slug'
  };

  export type tokensOrderByRelevanceFieldEnum = (typeof tokensOrderByRelevanceFieldEnum)[keyof typeof tokensOrderByRelevanceFieldEnum]


  /**
   * Deep Input Types
   */


  export type usersWhereInput = {
    AND?: Enumerable<usersWhereInput>
    OR?: Enumerable<usersWhereInput>
    NOT?: Enumerable<usersWhereInput>
    id?: StringFilter | string
    address?: StringNullableFilter | string | null
    name?: StringNullableFilter | string | null
    nonce?: StringNullableFilter | string | null
    status?: EnumUserStatusFilter | UserStatus
    role?: EnumRoleNullableListFilter
    settings?: JsonNullableFilter
    created_at?: DateTimeFilter | Date | string
    updated_at?: DateTimeNullableFilter | Date | string | null
    deleted_at?: DateTimeNullableFilter | Date | string | null
    user_dapps?: User_dappsListRelationFilter
    user_dapps_catogories?: User_dapps_catogoriesListRelationFilter
  }

  export type usersOrderByWithRelationAndSearchRelevanceInput = {
    id?: SortOrder
    address?: SortOrder
    name?: SortOrder
    nonce?: SortOrder
    status?: SortOrder
    role?: SortOrder
    settings?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
    user_dapps?: user_dappsOrderByRelationAggregateInput
    user_dapps_catogories?: user_dapps_catogoriesOrderByRelationAggregateInput
    _relevance?: usersOrderByRelevanceInput
  }

  export type usersWhereUniqueInput = {
    id?: string
    address?: string
  }

  export type usersOrderByWithAggregationInput = {
    id?: SortOrder
    address?: SortOrder
    name?: SortOrder
    nonce?: SortOrder
    status?: SortOrder
    role?: SortOrder
    settings?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
    _count?: usersCountOrderByAggregateInput
    _max?: usersMaxOrderByAggregateInput
    _min?: usersMinOrderByAggregateInput
  }

  export type usersScalarWhereWithAggregatesInput = {
    AND?: Enumerable<usersScalarWhereWithAggregatesInput>
    OR?: Enumerable<usersScalarWhereWithAggregatesInput>
    NOT?: Enumerable<usersScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    address?: StringNullableWithAggregatesFilter | string | null
    name?: StringNullableWithAggregatesFilter | string | null
    nonce?: StringNullableWithAggregatesFilter | string | null
    status?: EnumUserStatusWithAggregatesFilter | UserStatus
    role?: EnumRoleNullableListFilter
    settings?: JsonNullableWithAggregatesFilter
    created_at?: DateTimeWithAggregatesFilter | Date | string
    updated_at?: DateTimeNullableWithAggregatesFilter | Date | string | null
    deleted_at?: DateTimeNullableWithAggregatesFilter | Date | string | null
  }

  export type whitelistsWhereInput = {
    AND?: Enumerable<whitelistsWhereInput>
    OR?: Enumerable<whitelistsWhereInput>
    NOT?: Enumerable<whitelistsWhereInput>
    id?: IntFilter | number
    address?: StringNullableFilter | string | null
    created_at?: DateTimeFilter | Date | string
    updated_at?: DateTimeNullableFilter | Date | string | null
  }

  export type whitelistsOrderByWithRelationAndSearchRelevanceInput = {
    id?: SortOrder
    address?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _relevance?: whitelistsOrderByRelevanceInput
  }

  export type whitelistsWhereUniqueInput = {
    id?: number
  }

  export type whitelistsOrderByWithAggregationInput = {
    id?: SortOrder
    address?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: whitelistsCountOrderByAggregateInput
    _avg?: whitelistsAvgOrderByAggregateInput
    _max?: whitelistsMaxOrderByAggregateInput
    _min?: whitelistsMinOrderByAggregateInput
    _sum?: whitelistsSumOrderByAggregateInput
  }

  export type whitelistsScalarWhereWithAggregatesInput = {
    AND?: Enumerable<whitelistsScalarWhereWithAggregatesInput>
    OR?: Enumerable<whitelistsScalarWhereWithAggregatesInput>
    NOT?: Enumerable<whitelistsScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    address?: StringNullableWithAggregatesFilter | string | null
    created_at?: DateTimeWithAggregatesFilter | Date | string
    updated_at?: DateTimeNullableWithAggregatesFilter | Date | string | null
  }

  export type favsWhereInput = {
    AND?: Enumerable<favsWhereInput>
    OR?: Enumerable<favsWhereInput>
    NOT?: Enumerable<favsWhereInput>
    id?: StringFilter | string
    user_id?: StringFilter | string
    created_at?: DateTimeFilter | Date | string
    updated_at?: DateTimeNullableFilter | Date | string | null
    project_id?: IntFilter | number
    project_type?: IntNullableFilter | number | null
  }

  export type favsOrderByWithRelationAndSearchRelevanceInput = {
    id?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    project_id?: SortOrder
    project_type?: SortOrder
    _relevance?: favsOrderByRelevanceInput
  }

  export type favsWhereUniqueInput = {
    id?: string
    user_id_project_id?: favsUser_idProject_idCompoundUniqueInput
  }

  export type favsOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    project_id?: SortOrder
    project_type?: SortOrder
    _count?: favsCountOrderByAggregateInput
    _avg?: favsAvgOrderByAggregateInput
    _max?: favsMaxOrderByAggregateInput
    _min?: favsMinOrderByAggregateInput
    _sum?: favsSumOrderByAggregateInput
  }

  export type favsScalarWhereWithAggregatesInput = {
    AND?: Enumerable<favsScalarWhereWithAggregatesInput>
    OR?: Enumerable<favsScalarWhereWithAggregatesInput>
    NOT?: Enumerable<favsScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    user_id?: StringWithAggregatesFilter | string
    created_at?: DateTimeWithAggregatesFilter | Date | string
    updated_at?: DateTimeNullableWithAggregatesFilter | Date | string | null
    project_id?: IntWithAggregatesFilter | number
    project_type?: IntNullableWithAggregatesFilter | number | null
  }

  export type visit_historiesWhereInput = {
    AND?: Enumerable<visit_historiesWhereInput>
    OR?: Enumerable<visit_historiesWhereInput>
    NOT?: Enumerable<visit_historiesWhereInput>
    id?: StringFilter | string
    user_id?: StringFilter | string
    project_id?: IntFilter | number
    project_type?: IntNullableFilter | number | null
    created_at?: DateTimeFilter | Date | string
    updated_at?: DateTimeNullableFilter | Date | string | null
  }

  export type visit_historiesOrderByWithRelationAndSearchRelevanceInput = {
    id?: SortOrder
    user_id?: SortOrder
    project_id?: SortOrder
    project_type?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _relevance?: visit_historiesOrderByRelevanceInput
  }

  export type visit_historiesWhereUniqueInput = {
    id?: string
  }

  export type visit_historiesOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    project_id?: SortOrder
    project_type?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: visit_historiesCountOrderByAggregateInput
    _avg?: visit_historiesAvgOrderByAggregateInput
    _max?: visit_historiesMaxOrderByAggregateInput
    _min?: visit_historiesMinOrderByAggregateInput
    _sum?: visit_historiesSumOrderByAggregateInput
  }

  export type visit_historiesScalarWhereWithAggregatesInput = {
    AND?: Enumerable<visit_historiesScalarWhereWithAggregatesInput>
    OR?: Enumerable<visit_historiesScalarWhereWithAggregatesInput>
    NOT?: Enumerable<visit_historiesScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    user_id?: StringWithAggregatesFilter | string
    project_id?: IntWithAggregatesFilter | number
    project_type?: IntNullableWithAggregatesFilter | number | null
    created_at?: DateTimeWithAggregatesFilter | Date | string
    updated_at?: DateTimeNullableWithAggregatesFilter | Date | string | null
  }

  export type alarmsWhereInput = {
    AND?: Enumerable<alarmsWhereInput>
    OR?: Enumerable<alarmsWhereInput>
    NOT?: Enumerable<alarmsWhereInput>
    id?: StringFilter | string
    user_id?: StringFilter | string
    alarm_at?: DateTimeFilter | Date | string
    desc?: StringFilter | string
    created_at?: DateTimeFilter | Date | string
    updated_at?: DateTimeNullableFilter | Date | string | null
    color?: StringNullableFilter | string | null
    url?: StringNullableFilter | string | null
  }

  export type alarmsOrderByWithRelationAndSearchRelevanceInput = {
    id?: SortOrder
    user_id?: SortOrder
    alarm_at?: SortOrder
    desc?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    color?: SortOrder
    url?: SortOrder
    _relevance?: alarmsOrderByRelevanceInput
  }

  export type alarmsWhereUniqueInput = {
    id?: string
  }

  export type alarmsOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    alarm_at?: SortOrder
    desc?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    color?: SortOrder
    url?: SortOrder
    _count?: alarmsCountOrderByAggregateInput
    _max?: alarmsMaxOrderByAggregateInput
    _min?: alarmsMinOrderByAggregateInput
  }

  export type alarmsScalarWhereWithAggregatesInput = {
    AND?: Enumerable<alarmsScalarWhereWithAggregatesInput>
    OR?: Enumerable<alarmsScalarWhereWithAggregatesInput>
    NOT?: Enumerable<alarmsScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    user_id?: StringWithAggregatesFilter | string
    alarm_at?: DateTimeWithAggregatesFilter | Date | string
    desc?: StringWithAggregatesFilter | string
    created_at?: DateTimeWithAggregatesFilter | Date | string
    updated_at?: DateTimeNullableWithAggregatesFilter | Date | string | null
    color?: StringNullableWithAggregatesFilter | string | null
    url?: StringNullableWithAggregatesFilter | string | null
  }

  export type reportsWhereInput = {
    AND?: Enumerable<reportsWhereInput>
    OR?: Enumerable<reportsWhereInput>
    NOT?: Enumerable<reportsWhereInput>
    id?: StringFilter | string
    user_id?: StringNullableFilter | string | null
    url?: StringNullableFilter | string | null
    project_type?: StringNullableFilter | string | null
    project_name?: StringNullableFilter | string | null
    created_at?: DateTimeFilter | Date | string
    updated_at?: DateTimeNullableFilter | Date | string | null
    is_scam?: BoolNullableFilter | boolean | null
  }

  export type reportsOrderByWithRelationAndSearchRelevanceInput = {
    id?: SortOrder
    user_id?: SortOrder
    url?: SortOrder
    project_type?: SortOrder
    project_name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_scam?: SortOrder
    _relevance?: reportsOrderByRelevanceInput
  }

  export type reportsWhereUniqueInput = {
    id?: string
  }

  export type reportsOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    url?: SortOrder
    project_type?: SortOrder
    project_name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_scam?: SortOrder
    _count?: reportsCountOrderByAggregateInput
    _max?: reportsMaxOrderByAggregateInput
    _min?: reportsMinOrderByAggregateInput
  }

  export type reportsScalarWhereWithAggregatesInput = {
    AND?: Enumerable<reportsScalarWhereWithAggregatesInput>
    OR?: Enumerable<reportsScalarWhereWithAggregatesInput>
    NOT?: Enumerable<reportsScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    user_id?: StringNullableWithAggregatesFilter | string | null
    url?: StringNullableWithAggregatesFilter | string | null
    project_type?: StringNullableWithAggregatesFilter | string | null
    project_name?: StringNullableWithAggregatesFilter | string | null
    created_at?: DateTimeWithAggregatesFilter | Date | string
    updated_at?: DateTimeNullableWithAggregatesFilter | Date | string | null
    is_scam?: BoolNullableWithAggregatesFilter | boolean | null
  }

  export type dappsWhereInput = {
    AND?: Enumerable<dappsWhereInput>
    OR?: Enumerable<dappsWhereInput>
    NOT?: Enumerable<dappsWhereInput>
    id?: StringFilter | string
    title?: StringFilter | string
    url?: StringFilter | string
    logo?: StringNullableFilter | string | null
    desc?: StringNullableFilter | string | null
    created_at?: DateTimeFilter | Date | string
    updated_at?: DateTimeNullableFilter | Date | string | null
    visit_count?: IntFilter | number
    install_count?: IntFilter | number
    visible?: BoolFilter | boolean
    is_good?: BoolFilter | boolean
    add_by_admin?: BoolFilter | boolean
    dapp_categories_relations?: Dapp_categories_relationsListRelationFilter
    story_dapps_relations?: Story_dapps_relationsListRelationFilter
    user_dapps?: User_dappsListRelationFilter
  }

  export type dappsOrderByWithRelationAndSearchRelevanceInput = {
    id?: SortOrder
    title?: SortOrder
    url?: SortOrder
    logo?: SortOrder
    desc?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    visit_count?: SortOrder
    install_count?: SortOrder
    visible?: SortOrder
    is_good?: SortOrder
    add_by_admin?: SortOrder
    dapp_categories_relations?: dapp_categories_relationsOrderByRelationAggregateInput
    story_dapps_relations?: story_dapps_relationsOrderByRelationAggregateInput
    user_dapps?: user_dappsOrderByRelationAggregateInput
    _relevance?: dappsOrderByRelevanceInput
  }

  export type dappsWhereUniqueInput = {
    id?: string
  }

  export type dappsOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    url?: SortOrder
    logo?: SortOrder
    desc?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    visit_count?: SortOrder
    install_count?: SortOrder
    visible?: SortOrder
    is_good?: SortOrder
    add_by_admin?: SortOrder
    _count?: dappsCountOrderByAggregateInput
    _avg?: dappsAvgOrderByAggregateInput
    _max?: dappsMaxOrderByAggregateInput
    _min?: dappsMinOrderByAggregateInput
    _sum?: dappsSumOrderByAggregateInput
  }

  export type dappsScalarWhereWithAggregatesInput = {
    AND?: Enumerable<dappsScalarWhereWithAggregatesInput>
    OR?: Enumerable<dappsScalarWhereWithAggregatesInput>
    NOT?: Enumerable<dappsScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    title?: StringWithAggregatesFilter | string
    url?: StringWithAggregatesFilter | string
    logo?: StringNullableWithAggregatesFilter | string | null
    desc?: StringNullableWithAggregatesFilter | string | null
    created_at?: DateTimeWithAggregatesFilter | Date | string
    updated_at?: DateTimeNullableWithAggregatesFilter | Date | string | null
    visit_count?: IntWithAggregatesFilter | number
    install_count?: IntWithAggregatesFilter | number
    visible?: BoolWithAggregatesFilter | boolean
    is_good?: BoolWithAggregatesFilter | boolean
    add_by_admin?: BoolWithAggregatesFilter | boolean
  }

  export type dapp_categoriesWhereInput = {
    AND?: Enumerable<dapp_categoriesWhereInput>
    OR?: Enumerable<dapp_categoriesWhereInput>
    NOT?: Enumerable<dapp_categoriesWhereInput>
    id?: StringFilter | string
    title?: StringFilter | string
    desc?: StringNullableFilter | string | null
    sort?: IntFilter | number
    is_deleted?: BoolFilter | boolean
    dapp_categories_relations?: Dapp_categories_relationsListRelationFilter
  }

  export type dapp_categoriesOrderByWithRelationAndSearchRelevanceInput = {
    id?: SortOrder
    title?: SortOrder
    desc?: SortOrder
    sort?: SortOrder
    is_deleted?: SortOrder
    dapp_categories_relations?: dapp_categories_relationsOrderByRelationAggregateInput
    _relevance?: dapp_categoriesOrderByRelevanceInput
  }

  export type dapp_categoriesWhereUniqueInput = {
    id?: string
  }

  export type dapp_categoriesOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    desc?: SortOrder
    sort?: SortOrder
    is_deleted?: SortOrder
    _count?: dapp_categoriesCountOrderByAggregateInput
    _avg?: dapp_categoriesAvgOrderByAggregateInput
    _max?: dapp_categoriesMaxOrderByAggregateInput
    _min?: dapp_categoriesMinOrderByAggregateInput
    _sum?: dapp_categoriesSumOrderByAggregateInput
  }

  export type dapp_categoriesScalarWhereWithAggregatesInput = {
    AND?: Enumerable<dapp_categoriesScalarWhereWithAggregatesInput>
    OR?: Enumerable<dapp_categoriesScalarWhereWithAggregatesInput>
    NOT?: Enumerable<dapp_categoriesScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    title?: StringWithAggregatesFilter | string
    desc?: StringNullableWithAggregatesFilter | string | null
    sort?: IntWithAggregatesFilter | number
    is_deleted?: BoolWithAggregatesFilter | boolean
  }

  export type dapp_categories_relationsWhereInput = {
    AND?: Enumerable<dapp_categories_relationsWhereInput>
    OR?: Enumerable<dapp_categories_relationsWhereInput>
    NOT?: Enumerable<dapp_categories_relationsWhereInput>
    id?: IntFilter | number
    dapp_categories?: XOR<Dapp_categoriesRelationFilter, dapp_categoriesWhereInput>
    website_category_id?: StringFilter | string
    subcategory_id?: StringNullableFilter | string | null
    dapp?: XOR<DappsRelationFilter, dappsWhereInput>
    dapp_id?: StringFilter | string
    created_at?: DateTimeFilter | Date | string
    updated_at?: DateTimeNullableFilter | Date | string | null
  }

  export type dapp_categories_relationsOrderByWithRelationAndSearchRelevanceInput = {
    id?: SortOrder
    dapp_categories?: dapp_categoriesOrderByWithRelationAndSearchRelevanceInput
    website_category_id?: SortOrder
    subcategory_id?: SortOrder
    dapp?: dappsOrderByWithRelationAndSearchRelevanceInput
    dapp_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _relevance?: dapp_categories_relationsOrderByRelevanceInput
  }

  export type dapp_categories_relationsWhereUniqueInput = {
    id?: number
  }

  export type dapp_categories_relationsOrderByWithAggregationInput = {
    id?: SortOrder
    website_category_id?: SortOrder
    subcategory_id?: SortOrder
    dapp_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: dapp_categories_relationsCountOrderByAggregateInput
    _avg?: dapp_categories_relationsAvgOrderByAggregateInput
    _max?: dapp_categories_relationsMaxOrderByAggregateInput
    _min?: dapp_categories_relationsMinOrderByAggregateInput
    _sum?: dapp_categories_relationsSumOrderByAggregateInput
  }

  export type dapp_categories_relationsScalarWhereWithAggregatesInput = {
    AND?: Enumerable<dapp_categories_relationsScalarWhereWithAggregatesInput>
    OR?: Enumerable<dapp_categories_relationsScalarWhereWithAggregatesInput>
    NOT?: Enumerable<dapp_categories_relationsScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    website_category_id?: StringWithAggregatesFilter | string
    subcategory_id?: StringNullableWithAggregatesFilter | string | null
    dapp_id?: StringWithAggregatesFilter | string
    created_at?: DateTimeWithAggregatesFilter | Date | string
    updated_at?: DateTimeNullableWithAggregatesFilter | Date | string | null
  }

  export type user_dappsWhereInput = {
    AND?: Enumerable<user_dappsWhereInput>
    OR?: Enumerable<user_dappsWhereInput>
    NOT?: Enumerable<user_dappsWhereInput>
    id?: StringFilter | string
    user_id?: StringFilter | string
    dapp_id?: StringFilter | string
    dapp?: XOR<DappsRelationFilter, dappsWhereInput>
    user?: XOR<UsersRelationFilter, usersWhereInput>
    created_at?: DateTimeFilter | Date | string
    updated_at?: DateTimeNullableFilter | Date | string | null
    user_dapps_catogories_id?: StringNullableFilter | string | null
    user_dapps_catogories?: XOR<User_dapps_catogoriesRelationFilter, user_dapps_catogoriesWhereInput> | null
  }

  export type user_dappsOrderByWithRelationAndSearchRelevanceInput = {
    id?: SortOrder
    user_id?: SortOrder
    dapp_id?: SortOrder
    dapp?: dappsOrderByWithRelationAndSearchRelevanceInput
    user?: usersOrderByWithRelationAndSearchRelevanceInput
    created_at?: SortOrder
    updated_at?: SortOrder
    user_dapps_catogories_id?: SortOrder
    user_dapps_catogories?: user_dapps_catogoriesOrderByWithRelationAndSearchRelevanceInput
    _relevance?: user_dappsOrderByRelevanceInput
  }

  export type user_dappsWhereUniqueInput = {
    id?: string
    user_id_dapp_id?: user_dappsUser_idDapp_idCompoundUniqueInput
  }

  export type user_dappsOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    dapp_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user_dapps_catogories_id?: SortOrder
    _count?: user_dappsCountOrderByAggregateInput
    _max?: user_dappsMaxOrderByAggregateInput
    _min?: user_dappsMinOrderByAggregateInput
  }

  export type user_dappsScalarWhereWithAggregatesInput = {
    AND?: Enumerable<user_dappsScalarWhereWithAggregatesInput>
    OR?: Enumerable<user_dappsScalarWhereWithAggregatesInput>
    NOT?: Enumerable<user_dappsScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    user_id?: StringWithAggregatesFilter | string
    dapp_id?: StringWithAggregatesFilter | string
    created_at?: DateTimeWithAggregatesFilter | Date | string
    updated_at?: DateTimeNullableWithAggregatesFilter | Date | string | null
    user_dapps_catogories_id?: StringNullableWithAggregatesFilter | string | null
  }

  export type user_dapps_catogoriesWhereInput = {
    AND?: Enumerable<user_dapps_catogoriesWhereInput>
    OR?: Enumerable<user_dapps_catogoriesWhereInput>
    NOT?: Enumerable<user_dapps_catogoriesWhereInput>
    id?: StringFilter | string
    title?: StringFilter | string
    desc?: StringNullableFilter | string | null
    sort?: IntFilter | number
    created_at?: DateTimeFilter | Date | string
    updated_at?: DateTimeNullableFilter | Date | string | null
    user_id?: StringFilter | string
    user?: XOR<UsersRelationFilter, usersWhereInput>
    user_dapps?: User_dappsListRelationFilter
  }

  export type user_dapps_catogoriesOrderByWithRelationAndSearchRelevanceInput = {
    id?: SortOrder
    title?: SortOrder
    desc?: SortOrder
    sort?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user_id?: SortOrder
    user?: usersOrderByWithRelationAndSearchRelevanceInput
    user_dapps?: user_dappsOrderByRelationAggregateInput
    _relevance?: user_dapps_catogoriesOrderByRelevanceInput
  }

  export type user_dapps_catogoriesWhereUniqueInput = {
    id?: string
  }

  export type user_dapps_catogoriesOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    desc?: SortOrder
    sort?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user_id?: SortOrder
    _count?: user_dapps_catogoriesCountOrderByAggregateInput
    _avg?: user_dapps_catogoriesAvgOrderByAggregateInput
    _max?: user_dapps_catogoriesMaxOrderByAggregateInput
    _min?: user_dapps_catogoriesMinOrderByAggregateInput
    _sum?: user_dapps_catogoriesSumOrderByAggregateInput
  }

  export type user_dapps_catogoriesScalarWhereWithAggregatesInput = {
    AND?: Enumerable<user_dapps_catogoriesScalarWhereWithAggregatesInput>
    OR?: Enumerable<user_dapps_catogoriesScalarWhereWithAggregatesInput>
    NOT?: Enumerable<user_dapps_catogoriesScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    title?: StringWithAggregatesFilter | string
    desc?: StringNullableWithAggregatesFilter | string | null
    sort?: IntWithAggregatesFilter | number
    created_at?: DateTimeWithAggregatesFilter | Date | string
    updated_at?: DateTimeNullableWithAggregatesFilter | Date | string | null
    user_id?: StringWithAggregatesFilter | string
  }

  export type storiesWhereInput = {
    AND?: Enumerable<storiesWhereInput>
    OR?: Enumerable<storiesWhereInput>
    NOT?: Enumerable<storiesWhereInput>
    id?: StringFilter | string
    title?: StringFilter | string
    cover?: StringNullableFilter | string | null
    desc?: StringNullableFilter | string | null
    url?: StringNullableFilter | string | null
    created_at?: DateTimeFilter | Date | string
    updated_at?: DateTimeNullableFilter | Date | string | null
    visible?: BoolFilter | boolean
    sort?: IntFilter | number
    is_deleted?: BoolFilter | boolean
    visit_count?: IntFilter | number
    story_categories_relations?: Story_categories_relationsListRelationFilter
    story_dapps_relations?: Story_dapps_relationsListRelationFilter
  }

  export type storiesOrderByWithRelationAndSearchRelevanceInput = {
    id?: SortOrder
    title?: SortOrder
    cover?: SortOrder
    desc?: SortOrder
    url?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    visible?: SortOrder
    sort?: SortOrder
    is_deleted?: SortOrder
    visit_count?: SortOrder
    story_categories_relations?: story_categories_relationsOrderByRelationAggregateInput
    story_dapps_relations?: story_dapps_relationsOrderByRelationAggregateInput
    _relevance?: storiesOrderByRelevanceInput
  }

  export type storiesWhereUniqueInput = {
    id?: string
  }

  export type storiesOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    cover?: SortOrder
    desc?: SortOrder
    url?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    visible?: SortOrder
    sort?: SortOrder
    is_deleted?: SortOrder
    visit_count?: SortOrder
    _count?: storiesCountOrderByAggregateInput
    _avg?: storiesAvgOrderByAggregateInput
    _max?: storiesMaxOrderByAggregateInput
    _min?: storiesMinOrderByAggregateInput
    _sum?: storiesSumOrderByAggregateInput
  }

  export type storiesScalarWhereWithAggregatesInput = {
    AND?: Enumerable<storiesScalarWhereWithAggregatesInput>
    OR?: Enumerable<storiesScalarWhereWithAggregatesInput>
    NOT?: Enumerable<storiesScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    title?: StringWithAggregatesFilter | string
    cover?: StringNullableWithAggregatesFilter | string | null
    desc?: StringNullableWithAggregatesFilter | string | null
    url?: StringNullableWithAggregatesFilter | string | null
    created_at?: DateTimeWithAggregatesFilter | Date | string
    updated_at?: DateTimeNullableWithAggregatesFilter | Date | string | null
    visible?: BoolWithAggregatesFilter | boolean
    sort?: IntWithAggregatesFilter | number
    is_deleted?: BoolWithAggregatesFilter | boolean
    visit_count?: IntWithAggregatesFilter | number
  }

  export type story_categoriesWhereInput = {
    AND?: Enumerable<story_categoriesWhereInput>
    OR?: Enumerable<story_categoriesWhereInput>
    NOT?: Enumerable<story_categoriesWhereInput>
    id?: StringFilter | string
    title?: StringFilter | string
    desc?: StringNullableFilter | string | null
    sort?: IntFilter | number
    is_deleted?: BoolFilter | boolean
    created_at?: DateTimeFilter | Date | string
    updated_at?: DateTimeNullableFilter | Date | string | null
    story_categories_relations?: Story_categories_relationsListRelationFilter
  }

  export type story_categoriesOrderByWithRelationAndSearchRelevanceInput = {
    id?: SortOrder
    title?: SortOrder
    desc?: SortOrder
    sort?: SortOrder
    is_deleted?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    story_categories_relations?: story_categories_relationsOrderByRelationAggregateInput
    _relevance?: story_categoriesOrderByRelevanceInput
  }

  export type story_categoriesWhereUniqueInput = {
    id?: string
  }

  export type story_categoriesOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    desc?: SortOrder
    sort?: SortOrder
    is_deleted?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: story_categoriesCountOrderByAggregateInput
    _avg?: story_categoriesAvgOrderByAggregateInput
    _max?: story_categoriesMaxOrderByAggregateInput
    _min?: story_categoriesMinOrderByAggregateInput
    _sum?: story_categoriesSumOrderByAggregateInput
  }

  export type story_categoriesScalarWhereWithAggregatesInput = {
    AND?: Enumerable<story_categoriesScalarWhereWithAggregatesInput>
    OR?: Enumerable<story_categoriesScalarWhereWithAggregatesInput>
    NOT?: Enumerable<story_categoriesScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    title?: StringWithAggregatesFilter | string
    desc?: StringNullableWithAggregatesFilter | string | null
    sort?: IntWithAggregatesFilter | number
    is_deleted?: BoolWithAggregatesFilter | boolean
    created_at?: DateTimeWithAggregatesFilter | Date | string
    updated_at?: DateTimeNullableWithAggregatesFilter | Date | string | null
  }

  export type story_categories_relationsWhereInput = {
    AND?: Enumerable<story_categories_relationsWhereInput>
    OR?: Enumerable<story_categories_relationsWhereInput>
    NOT?: Enumerable<story_categories_relationsWhereInput>
    id?: IntFilter | number
    story_categories?: XOR<Story_categoriesRelationFilter, story_categoriesWhereInput>
    story_category_id?: StringFilter | string
    story?: XOR<StoriesRelationFilter, storiesWhereInput>
    story_id?: StringFilter | string
    created_at?: DateTimeFilter | Date | string
    updated_at?: DateTimeNullableFilter | Date | string | null
  }

  export type story_categories_relationsOrderByWithRelationAndSearchRelevanceInput = {
    id?: SortOrder
    story_categories?: story_categoriesOrderByWithRelationAndSearchRelevanceInput
    story_category_id?: SortOrder
    story?: storiesOrderByWithRelationAndSearchRelevanceInput
    story_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _relevance?: story_categories_relationsOrderByRelevanceInput
  }

  export type story_categories_relationsWhereUniqueInput = {
    id?: number
  }

  export type story_categories_relationsOrderByWithAggregationInput = {
    id?: SortOrder
    story_category_id?: SortOrder
    story_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: story_categories_relationsCountOrderByAggregateInput
    _avg?: story_categories_relationsAvgOrderByAggregateInput
    _max?: story_categories_relationsMaxOrderByAggregateInput
    _min?: story_categories_relationsMinOrderByAggregateInput
    _sum?: story_categories_relationsSumOrderByAggregateInput
  }

  export type story_categories_relationsScalarWhereWithAggregatesInput = {
    AND?: Enumerable<story_categories_relationsScalarWhereWithAggregatesInput>
    OR?: Enumerable<story_categories_relationsScalarWhereWithAggregatesInput>
    NOT?: Enumerable<story_categories_relationsScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    story_category_id?: StringWithAggregatesFilter | string
    story_id?: StringWithAggregatesFilter | string
    created_at?: DateTimeWithAggregatesFilter | Date | string
    updated_at?: DateTimeNullableWithAggregatesFilter | Date | string | null
  }

  export type story_dapps_relationsWhereInput = {
    AND?: Enumerable<story_dapps_relationsWhereInput>
    OR?: Enumerable<story_dapps_relationsWhereInput>
    NOT?: Enumerable<story_dapps_relationsWhereInput>
    id?: IntFilter | number
    story?: XOR<StoriesRelationFilter, storiesWhereInput>
    story_id?: StringFilter | string
    dapp?: XOR<DappsRelationFilter, dappsWhereInput>
    dapp_id?: StringFilter | string
    created_at?: DateTimeFilter | Date | string
    updated_at?: DateTimeNullableFilter | Date | string | null
  }

  export type story_dapps_relationsOrderByWithRelationAndSearchRelevanceInput = {
    id?: SortOrder
    story?: storiesOrderByWithRelationAndSearchRelevanceInput
    story_id?: SortOrder
    dapp?: dappsOrderByWithRelationAndSearchRelevanceInput
    dapp_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _relevance?: story_dapps_relationsOrderByRelevanceInput
  }

  export type story_dapps_relationsWhereUniqueInput = {
    id?: number
  }

  export type story_dapps_relationsOrderByWithAggregationInput = {
    id?: SortOrder
    story_id?: SortOrder
    dapp_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    _count?: story_dapps_relationsCountOrderByAggregateInput
    _avg?: story_dapps_relationsAvgOrderByAggregateInput
    _max?: story_dapps_relationsMaxOrderByAggregateInput
    _min?: story_dapps_relationsMinOrderByAggregateInput
    _sum?: story_dapps_relationsSumOrderByAggregateInput
  }

  export type story_dapps_relationsScalarWhereWithAggregatesInput = {
    AND?: Enumerable<story_dapps_relationsScalarWhereWithAggregatesInput>
    OR?: Enumerable<story_dapps_relationsScalarWhereWithAggregatesInput>
    NOT?: Enumerable<story_dapps_relationsScalarWhereWithAggregatesInput>
    id?: IntWithAggregatesFilter | number
    story_id?: StringWithAggregatesFilter | string
    dapp_id?: StringWithAggregatesFilter | string
    created_at?: DateTimeWithAggregatesFilter | Date | string
    updated_at?: DateTimeNullableWithAggregatesFilter | Date | string | null
  }

  export type tokensWhereInput = {
    AND?: Enumerable<tokensWhereInput>
    OR?: Enumerable<tokensWhereInput>
    NOT?: Enumerable<tokensWhereInput>
    id?: StringFilter | string
    name?: StringFilter | string
    symbol?: StringFilter | string
    slug?: StringFilter | string
    cmcRank?: FloatNullableFilter | number | null
    marketPairCount?: FloatNullableFilter | number | null
    circulatingSupply?: FloatNullableFilter | number | null
    selfReportedCirculatingSupply?: FloatNullableFilter | number | null
    totalSupply?: FloatNullableFilter | number | null
    maxSupply?: FloatNullableFilter | number | null
    ath?: FloatNullableFilter | number | null
    atl?: FloatNullableFilter | number | null
    high24h?: FloatNullableFilter | number | null
    low24h?: FloatNullableFilter | number | null
    isActive?: FloatNullableFilter | number | null
    lastUpdated?: DateTimeNullableFilter | Date | string | null
    dateAdded?: DateTimeNullableFilter | Date | string | null
    created_at?: DateTimeFilter | Date | string
    updated_at?: DateTimeNullableFilter | Date | string | null
    isAudited?: BoolFilter | boolean
  }

  export type tokensOrderByWithRelationAndSearchRelevanceInput = {
    id?: SortOrder
    name?: SortOrder
    symbol?: SortOrder
    slug?: SortOrder
    cmcRank?: SortOrder
    marketPairCount?: SortOrder
    circulatingSupply?: SortOrder
    selfReportedCirculatingSupply?: SortOrder
    totalSupply?: SortOrder
    maxSupply?: SortOrder
    ath?: SortOrder
    atl?: SortOrder
    high24h?: SortOrder
    low24h?: SortOrder
    isActive?: SortOrder
    lastUpdated?: SortOrder
    dateAdded?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    isAudited?: SortOrder
    _relevance?: tokensOrderByRelevanceInput
  }

  export type tokensWhereUniqueInput = {
    id?: string
  }

  export type tokensOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    symbol?: SortOrder
    slug?: SortOrder
    cmcRank?: SortOrder
    marketPairCount?: SortOrder
    circulatingSupply?: SortOrder
    selfReportedCirculatingSupply?: SortOrder
    totalSupply?: SortOrder
    maxSupply?: SortOrder
    ath?: SortOrder
    atl?: SortOrder
    high24h?: SortOrder
    low24h?: SortOrder
    isActive?: SortOrder
    lastUpdated?: SortOrder
    dateAdded?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    isAudited?: SortOrder
    _count?: tokensCountOrderByAggregateInput
    _avg?: tokensAvgOrderByAggregateInput
    _max?: tokensMaxOrderByAggregateInput
    _min?: tokensMinOrderByAggregateInput
    _sum?: tokensSumOrderByAggregateInput
  }

  export type tokensScalarWhereWithAggregatesInput = {
    AND?: Enumerable<tokensScalarWhereWithAggregatesInput>
    OR?: Enumerable<tokensScalarWhereWithAggregatesInput>
    NOT?: Enumerable<tokensScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    name?: StringWithAggregatesFilter | string
    symbol?: StringWithAggregatesFilter | string
    slug?: StringWithAggregatesFilter | string
    cmcRank?: FloatNullableWithAggregatesFilter | number | null
    marketPairCount?: FloatNullableWithAggregatesFilter | number | null
    circulatingSupply?: FloatNullableWithAggregatesFilter | number | null
    selfReportedCirculatingSupply?: FloatNullableWithAggregatesFilter | number | null
    totalSupply?: FloatNullableWithAggregatesFilter | number | null
    maxSupply?: FloatNullableWithAggregatesFilter | number | null
    ath?: FloatNullableWithAggregatesFilter | number | null
    atl?: FloatNullableWithAggregatesFilter | number | null
    high24h?: FloatNullableWithAggregatesFilter | number | null
    low24h?: FloatNullableWithAggregatesFilter | number | null
    isActive?: FloatNullableWithAggregatesFilter | number | null
    lastUpdated?: DateTimeNullableWithAggregatesFilter | Date | string | null
    dateAdded?: DateTimeNullableWithAggregatesFilter | Date | string | null
    created_at?: DateTimeWithAggregatesFilter | Date | string
    updated_at?: DateTimeNullableWithAggregatesFilter | Date | string | null
    isAudited?: BoolWithAggregatesFilter | boolean
  }

  export type usersCreateInput = {
    id?: string
    address?: string | null
    name?: string | null
    nonce?: string | null
    status?: UserStatus
    role?: usersCreateroleInput | Enumerable<Role>
    settings?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string | null
    deleted_at?: Date | string | null
    user_dapps?: user_dappsCreateNestedManyWithoutUserInput
    user_dapps_catogories?: user_dapps_catogoriesCreateNestedManyWithoutUserInput
  }

  export type usersUncheckedCreateInput = {
    id?: string
    address?: string | null
    name?: string | null
    nonce?: string | null
    status?: UserStatus
    role?: usersCreateroleInput | Enumerable<Role>
    settings?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string | null
    deleted_at?: Date | string | null
    user_dapps?: user_dappsUncheckedCreateNestedManyWithoutUserInput
    user_dapps_catogories?: user_dapps_catogoriesUncheckedCreateNestedManyWithoutUserInput
  }

  export type usersUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    nonce?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | UserStatus
    role?: usersUpdateroleInput | Enumerable<Role>
    settings?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user_dapps?: user_dappsUpdateManyWithoutUserInput
    user_dapps_catogories?: user_dapps_catogoriesUpdateManyWithoutUserInput
  }

  export type usersUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    nonce?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | UserStatus
    role?: usersUpdateroleInput | Enumerable<Role>
    settings?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user_dapps?: user_dappsUncheckedUpdateManyWithoutUserInput
    user_dapps_catogories?: user_dapps_catogoriesUncheckedUpdateManyWithoutUserInput
  }

  export type usersCreateManyInput = {
    id?: string
    address?: string | null
    name?: string | null
    nonce?: string | null
    status?: UserStatus
    role?: usersCreateroleInput | Enumerable<Role>
    settings?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string | null
    deleted_at?: Date | string | null
  }

  export type usersUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    nonce?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | UserStatus
    role?: usersUpdateroleInput | Enumerable<Role>
    settings?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type usersUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    nonce?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | UserStatus
    role?: usersUpdateroleInput | Enumerable<Role>
    settings?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type whitelistsCreateInput = {
    address?: string | null
    created_at?: Date | string
    updated_at?: Date | string | null
  }

  export type whitelistsUncheckedCreateInput = {
    id?: number
    address?: string | null
    created_at?: Date | string
    updated_at?: Date | string | null
  }

  export type whitelistsUpdateInput = {
    address?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type whitelistsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    address?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type whitelistsCreateManyInput = {
    id?: number
    address?: string | null
    created_at?: Date | string
    updated_at?: Date | string | null
  }

  export type whitelistsUpdateManyMutationInput = {
    address?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type whitelistsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    address?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type favsCreateInput = {
    id?: string
    user_id: string
    created_at?: Date | string
    updated_at?: Date | string | null
    project_id: number
    project_type?: number | null
  }

  export type favsUncheckedCreateInput = {
    id?: string
    user_id: string
    created_at?: Date | string
    updated_at?: Date | string | null
    project_id: number
    project_type?: number | null
  }

  export type favsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    project_id?: IntFieldUpdateOperationsInput | number
    project_type?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type favsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    project_id?: IntFieldUpdateOperationsInput | number
    project_type?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type favsCreateManyInput = {
    id?: string
    user_id: string
    created_at?: Date | string
    updated_at?: Date | string | null
    project_id: number
    project_type?: number | null
  }

  export type favsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    project_id?: IntFieldUpdateOperationsInput | number
    project_type?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type favsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    project_id?: IntFieldUpdateOperationsInput | number
    project_type?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type visit_historiesCreateInput = {
    id?: string
    user_id: string
    project_id: number
    project_type?: number | null
    created_at?: Date | string
    updated_at?: Date | string | null
  }

  export type visit_historiesUncheckedCreateInput = {
    id?: string
    user_id: string
    project_id: number
    project_type?: number | null
    created_at?: Date | string
    updated_at?: Date | string | null
  }

  export type visit_historiesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    project_id?: IntFieldUpdateOperationsInput | number
    project_type?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type visit_historiesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    project_id?: IntFieldUpdateOperationsInput | number
    project_type?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type visit_historiesCreateManyInput = {
    id?: string
    user_id: string
    project_id: number
    project_type?: number | null
    created_at?: Date | string
    updated_at?: Date | string | null
  }

  export type visit_historiesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    project_id?: IntFieldUpdateOperationsInput | number
    project_type?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type visit_historiesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    project_id?: IntFieldUpdateOperationsInput | number
    project_type?: NullableIntFieldUpdateOperationsInput | number | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type alarmsCreateInput = {
    id?: string
    user_id: string
    alarm_at: Date | string
    desc: string
    created_at?: Date | string
    updated_at?: Date | string | null
    color?: string | null
    url?: string | null
  }

  export type alarmsUncheckedCreateInput = {
    id?: string
    user_id: string
    alarm_at: Date | string
    desc: string
    created_at?: Date | string
    updated_at?: Date | string | null
    color?: string | null
    url?: string | null
  }

  export type alarmsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    alarm_at?: DateTimeFieldUpdateOperationsInput | Date | string
    desc?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type alarmsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    alarm_at?: DateTimeFieldUpdateOperationsInput | Date | string
    desc?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type alarmsCreateManyInput = {
    id?: string
    user_id: string
    alarm_at: Date | string
    desc: string
    created_at?: Date | string
    updated_at?: Date | string | null
    color?: string | null
    url?: string | null
  }

  export type alarmsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    alarm_at?: DateTimeFieldUpdateOperationsInput | Date | string
    desc?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type alarmsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    alarm_at?: DateTimeFieldUpdateOperationsInput | Date | string
    desc?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    color?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type reportsCreateInput = {
    id?: string
    user_id?: string | null
    url?: string | null
    project_type?: string | null
    project_name?: string | null
    created_at?: Date | string
    updated_at?: Date | string | null
    is_scam?: boolean | null
  }

  export type reportsUncheckedCreateInput = {
    id?: string
    user_id?: string | null
    url?: string | null
    project_type?: string | null
    project_name?: string | null
    created_at?: Date | string
    updated_at?: Date | string | null
    is_scam?: boolean | null
  }

  export type reportsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    project_type?: NullableStringFieldUpdateOperationsInput | string | null
    project_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_scam?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type reportsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    project_type?: NullableStringFieldUpdateOperationsInput | string | null
    project_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_scam?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type reportsCreateManyInput = {
    id?: string
    user_id?: string | null
    url?: string | null
    project_type?: string | null
    project_name?: string | null
    created_at?: Date | string
    updated_at?: Date | string | null
    is_scam?: boolean | null
  }

  export type reportsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    project_type?: NullableStringFieldUpdateOperationsInput | string | null
    project_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_scam?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type reportsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    project_type?: NullableStringFieldUpdateOperationsInput | string | null
    project_name?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_scam?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type dappsCreateInput = {
    id?: string
    title: string
    url: string
    logo?: string | null
    desc?: string | null
    created_at?: Date | string
    updated_at?: Date | string | null
    visit_count?: number
    install_count?: number
    visible?: boolean
    is_good?: boolean
    add_by_admin?: boolean
    dapp_categories_relations?: dapp_categories_relationsCreateNestedManyWithoutDappInput
    story_dapps_relations?: story_dapps_relationsCreateNestedManyWithoutDappInput
    user_dapps?: user_dappsCreateNestedManyWithoutDappInput
  }

  export type dappsUncheckedCreateInput = {
    id?: string
    title: string
    url: string
    logo?: string | null
    desc?: string | null
    created_at?: Date | string
    updated_at?: Date | string | null
    visit_count?: number
    install_count?: number
    visible?: boolean
    is_good?: boolean
    add_by_admin?: boolean
    dapp_categories_relations?: dapp_categories_relationsUncheckedCreateNestedManyWithoutDappInput
    story_dapps_relations?: story_dapps_relationsUncheckedCreateNestedManyWithoutDappInput
    user_dapps?: user_dappsUncheckedCreateNestedManyWithoutDappInput
  }

  export type dappsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    visit_count?: IntFieldUpdateOperationsInput | number
    install_count?: IntFieldUpdateOperationsInput | number
    visible?: BoolFieldUpdateOperationsInput | boolean
    is_good?: BoolFieldUpdateOperationsInput | boolean
    add_by_admin?: BoolFieldUpdateOperationsInput | boolean
    dapp_categories_relations?: dapp_categories_relationsUpdateManyWithoutDappInput
    story_dapps_relations?: story_dapps_relationsUpdateManyWithoutDappInput
    user_dapps?: user_dappsUpdateManyWithoutDappInput
  }

  export type dappsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    visit_count?: IntFieldUpdateOperationsInput | number
    install_count?: IntFieldUpdateOperationsInput | number
    visible?: BoolFieldUpdateOperationsInput | boolean
    is_good?: BoolFieldUpdateOperationsInput | boolean
    add_by_admin?: BoolFieldUpdateOperationsInput | boolean
    dapp_categories_relations?: dapp_categories_relationsUncheckedUpdateManyWithoutDappInput
    story_dapps_relations?: story_dapps_relationsUncheckedUpdateManyWithoutDappInput
    user_dapps?: user_dappsUncheckedUpdateManyWithoutDappInput
  }

  export type dappsCreateManyInput = {
    id?: string
    title: string
    url: string
    logo?: string | null
    desc?: string | null
    created_at?: Date | string
    updated_at?: Date | string | null
    visit_count?: number
    install_count?: number
    visible?: boolean
    is_good?: boolean
    add_by_admin?: boolean
  }

  export type dappsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    visit_count?: IntFieldUpdateOperationsInput | number
    install_count?: IntFieldUpdateOperationsInput | number
    visible?: BoolFieldUpdateOperationsInput | boolean
    is_good?: BoolFieldUpdateOperationsInput | boolean
    add_by_admin?: BoolFieldUpdateOperationsInput | boolean
  }

  export type dappsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    visit_count?: IntFieldUpdateOperationsInput | number
    install_count?: IntFieldUpdateOperationsInput | number
    visible?: BoolFieldUpdateOperationsInput | boolean
    is_good?: BoolFieldUpdateOperationsInput | boolean
    add_by_admin?: BoolFieldUpdateOperationsInput | boolean
  }

  export type dapp_categoriesCreateInput = {
    id?: string
    title: string
    desc?: string | null
    sort?: number
    is_deleted?: boolean
    dapp_categories_relations?: dapp_categories_relationsCreateNestedManyWithoutDapp_categoriesInput
  }

  export type dapp_categoriesUncheckedCreateInput = {
    id?: string
    title: string
    desc?: string | null
    sort?: number
    is_deleted?: boolean
    dapp_categories_relations?: dapp_categories_relationsUncheckedCreateNestedManyWithoutDapp_categoriesInput
  }

  export type dapp_categoriesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    sort?: IntFieldUpdateOperationsInput | number
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    dapp_categories_relations?: dapp_categories_relationsUpdateManyWithoutDapp_categoriesInput
  }

  export type dapp_categoriesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    sort?: IntFieldUpdateOperationsInput | number
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    dapp_categories_relations?: dapp_categories_relationsUncheckedUpdateManyWithoutDapp_categoriesInput
  }

  export type dapp_categoriesCreateManyInput = {
    id?: string
    title: string
    desc?: string | null
    sort?: number
    is_deleted?: boolean
  }

  export type dapp_categoriesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    sort?: IntFieldUpdateOperationsInput | number
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type dapp_categoriesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    sort?: IntFieldUpdateOperationsInput | number
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type dapp_categories_relationsCreateInput = {
    dapp_categories: dapp_categoriesCreateNestedOneWithoutDapp_categories_relationsInput
    subcategory_id?: string | null
    dapp: dappsCreateNestedOneWithoutDapp_categories_relationsInput
    created_at?: Date | string
    updated_at?: Date | string | null
  }

  export type dapp_categories_relationsUncheckedCreateInput = {
    id?: number
    website_category_id: string
    subcategory_id?: string | null
    dapp_id: string
    created_at?: Date | string
    updated_at?: Date | string | null
  }

  export type dapp_categories_relationsUpdateInput = {
    dapp_categories?: dapp_categoriesUpdateOneRequiredWithoutDapp_categories_relationsInput
    subcategory_id?: NullableStringFieldUpdateOperationsInput | string | null
    dapp?: dappsUpdateOneRequiredWithoutDapp_categories_relationsInput
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type dapp_categories_relationsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    website_category_id?: StringFieldUpdateOperationsInput | string
    subcategory_id?: NullableStringFieldUpdateOperationsInput | string | null
    dapp_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type dapp_categories_relationsCreateManyInput = {
    id?: number
    website_category_id: string
    subcategory_id?: string | null
    dapp_id: string
    created_at?: Date | string
    updated_at?: Date | string | null
  }

  export type dapp_categories_relationsUpdateManyMutationInput = {
    subcategory_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type dapp_categories_relationsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    website_category_id?: StringFieldUpdateOperationsInput | string
    subcategory_id?: NullableStringFieldUpdateOperationsInput | string | null
    dapp_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type user_dappsCreateInput = {
    id?: string
    dapp: dappsCreateNestedOneWithoutUser_dappsInput
    user: usersCreateNestedOneWithoutUser_dappsInput
    created_at?: Date | string
    updated_at?: Date | string | null
    user_dapps_catogories?: user_dapps_catogoriesCreateNestedOneWithoutUser_dappsInput
  }

  export type user_dappsUncheckedCreateInput = {
    id?: string
    user_id: string
    dapp_id: string
    created_at?: Date | string
    updated_at?: Date | string | null
    user_dapps_catogories_id?: string | null
  }

  export type user_dappsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    dapp?: dappsUpdateOneRequiredWithoutUser_dappsInput
    user?: usersUpdateOneRequiredWithoutUser_dappsInput
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user_dapps_catogories?: user_dapps_catogoriesUpdateOneWithoutUser_dappsInput
  }

  export type user_dappsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    dapp_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user_dapps_catogories_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type user_dappsCreateManyInput = {
    id?: string
    user_id: string
    dapp_id: string
    created_at?: Date | string
    updated_at?: Date | string | null
    user_dapps_catogories_id?: string | null
  }

  export type user_dappsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type user_dappsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    dapp_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user_dapps_catogories_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type user_dapps_catogoriesCreateInput = {
    id?: string
    title: string
    desc?: string | null
    sort?: number
    created_at?: Date | string
    updated_at?: Date | string | null
    user: usersCreateNestedOneWithoutUser_dapps_catogoriesInput
    user_dapps?: user_dappsCreateNestedManyWithoutUser_dapps_catogoriesInput
  }

  export type user_dapps_catogoriesUncheckedCreateInput = {
    id?: string
    title: string
    desc?: string | null
    sort?: number
    created_at?: Date | string
    updated_at?: Date | string | null
    user_id: string
    user_dapps?: user_dappsUncheckedCreateNestedManyWithoutUser_dapps_catogoriesInput
  }

  export type user_dapps_catogoriesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    sort?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: usersUpdateOneRequiredWithoutUser_dapps_catogoriesInput
    user_dapps?: user_dappsUpdateManyWithoutUser_dapps_catogoriesInput
  }

  export type user_dapps_catogoriesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    sort?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user_id?: StringFieldUpdateOperationsInput | string
    user_dapps?: user_dappsUncheckedUpdateManyWithoutUser_dapps_catogoriesInput
  }

  export type user_dapps_catogoriesCreateManyInput = {
    id?: string
    title: string
    desc?: string | null
    sort?: number
    created_at?: Date | string
    updated_at?: Date | string | null
    user_id: string
  }

  export type user_dapps_catogoriesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    sort?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type user_dapps_catogoriesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    sort?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user_id?: StringFieldUpdateOperationsInput | string
  }

  export type storiesCreateInput = {
    id?: string
    title: string
    cover?: string | null
    desc?: string | null
    url?: string | null
    created_at?: Date | string
    updated_at?: Date | string | null
    visible?: boolean
    sort?: number
    is_deleted?: boolean
    visit_count?: number
    story_categories_relations?: story_categories_relationsCreateNestedManyWithoutStoryInput
    story_dapps_relations?: story_dapps_relationsCreateNestedManyWithoutStoryInput
  }

  export type storiesUncheckedCreateInput = {
    id?: string
    title: string
    cover?: string | null
    desc?: string | null
    url?: string | null
    created_at?: Date | string
    updated_at?: Date | string | null
    visible?: boolean
    sort?: number
    is_deleted?: boolean
    visit_count?: number
    story_categories_relations?: story_categories_relationsUncheckedCreateNestedManyWithoutStoryInput
    story_dapps_relations?: story_dapps_relationsUncheckedCreateNestedManyWithoutStoryInput
  }

  export type storiesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    cover?: NullableStringFieldUpdateOperationsInput | string | null
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    visible?: BoolFieldUpdateOperationsInput | boolean
    sort?: IntFieldUpdateOperationsInput | number
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    visit_count?: IntFieldUpdateOperationsInput | number
    story_categories_relations?: story_categories_relationsUpdateManyWithoutStoryInput
    story_dapps_relations?: story_dapps_relationsUpdateManyWithoutStoryInput
  }

  export type storiesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    cover?: NullableStringFieldUpdateOperationsInput | string | null
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    visible?: BoolFieldUpdateOperationsInput | boolean
    sort?: IntFieldUpdateOperationsInput | number
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    visit_count?: IntFieldUpdateOperationsInput | number
    story_categories_relations?: story_categories_relationsUncheckedUpdateManyWithoutStoryInput
    story_dapps_relations?: story_dapps_relationsUncheckedUpdateManyWithoutStoryInput
  }

  export type storiesCreateManyInput = {
    id?: string
    title: string
    cover?: string | null
    desc?: string | null
    url?: string | null
    created_at?: Date | string
    updated_at?: Date | string | null
    visible?: boolean
    sort?: number
    is_deleted?: boolean
    visit_count?: number
  }

  export type storiesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    cover?: NullableStringFieldUpdateOperationsInput | string | null
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    visible?: BoolFieldUpdateOperationsInput | boolean
    sort?: IntFieldUpdateOperationsInput | number
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    visit_count?: IntFieldUpdateOperationsInput | number
  }

  export type storiesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    cover?: NullableStringFieldUpdateOperationsInput | string | null
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    visible?: BoolFieldUpdateOperationsInput | boolean
    sort?: IntFieldUpdateOperationsInput | number
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    visit_count?: IntFieldUpdateOperationsInput | number
  }

  export type story_categoriesCreateInput = {
    id?: string
    title: string
    desc?: string | null
    sort?: number
    is_deleted?: boolean
    created_at?: Date | string
    updated_at?: Date | string | null
    story_categories_relations?: story_categories_relationsCreateNestedManyWithoutStory_categoriesInput
  }

  export type story_categoriesUncheckedCreateInput = {
    id?: string
    title: string
    desc?: string | null
    sort?: number
    is_deleted?: boolean
    created_at?: Date | string
    updated_at?: Date | string | null
    story_categories_relations?: story_categories_relationsUncheckedCreateNestedManyWithoutStory_categoriesInput
  }

  export type story_categoriesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    sort?: IntFieldUpdateOperationsInput | number
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    story_categories_relations?: story_categories_relationsUpdateManyWithoutStory_categoriesInput
  }

  export type story_categoriesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    sort?: IntFieldUpdateOperationsInput | number
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    story_categories_relations?: story_categories_relationsUncheckedUpdateManyWithoutStory_categoriesInput
  }

  export type story_categoriesCreateManyInput = {
    id?: string
    title: string
    desc?: string | null
    sort?: number
    is_deleted?: boolean
    created_at?: Date | string
    updated_at?: Date | string | null
  }

  export type story_categoriesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    sort?: IntFieldUpdateOperationsInput | number
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type story_categoriesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    sort?: IntFieldUpdateOperationsInput | number
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type story_categories_relationsCreateInput = {
    story_categories: story_categoriesCreateNestedOneWithoutStory_categories_relationsInput
    story: storiesCreateNestedOneWithoutStory_categories_relationsInput
    created_at?: Date | string
    updated_at?: Date | string | null
  }

  export type story_categories_relationsUncheckedCreateInput = {
    id?: number
    story_category_id: string
    story_id: string
    created_at?: Date | string
    updated_at?: Date | string | null
  }

  export type story_categories_relationsUpdateInput = {
    story_categories?: story_categoriesUpdateOneRequiredWithoutStory_categories_relationsInput
    story?: storiesUpdateOneRequiredWithoutStory_categories_relationsInput
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type story_categories_relationsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    story_category_id?: StringFieldUpdateOperationsInput | string
    story_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type story_categories_relationsCreateManyInput = {
    id?: number
    story_category_id: string
    story_id: string
    created_at?: Date | string
    updated_at?: Date | string | null
  }

  export type story_categories_relationsUpdateManyMutationInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type story_categories_relationsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    story_category_id?: StringFieldUpdateOperationsInput | string
    story_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type story_dapps_relationsCreateInput = {
    story: storiesCreateNestedOneWithoutStory_dapps_relationsInput
    dapp: dappsCreateNestedOneWithoutStory_dapps_relationsInput
    created_at?: Date | string
    updated_at?: Date | string | null
  }

  export type story_dapps_relationsUncheckedCreateInput = {
    id?: number
    story_id: string
    dapp_id: string
    created_at?: Date | string
    updated_at?: Date | string | null
  }

  export type story_dapps_relationsUpdateInput = {
    story?: storiesUpdateOneRequiredWithoutStory_dapps_relationsInput
    dapp?: dappsUpdateOneRequiredWithoutStory_dapps_relationsInput
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type story_dapps_relationsUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    story_id?: StringFieldUpdateOperationsInput | string
    dapp_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type story_dapps_relationsCreateManyInput = {
    id?: number
    story_id: string
    dapp_id: string
    created_at?: Date | string
    updated_at?: Date | string | null
  }

  export type story_dapps_relationsUpdateManyMutationInput = {
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type story_dapps_relationsUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    story_id?: StringFieldUpdateOperationsInput | string
    dapp_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type tokensCreateInput = {
    id?: string
    name: string
    symbol: string
    slug: string
    cmcRank?: number | null
    marketPairCount?: number | null
    circulatingSupply?: number | null
    selfReportedCirculatingSupply?: number | null
    totalSupply?: number | null
    maxSupply?: number | null
    ath?: number | null
    atl?: number | null
    high24h?: number | null
    low24h?: number | null
    isActive?: number | null
    lastUpdated?: Date | string | null
    dateAdded?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string | null
    isAudited?: boolean
  }

  export type tokensUncheckedCreateInput = {
    id?: string
    name: string
    symbol: string
    slug: string
    cmcRank?: number | null
    marketPairCount?: number | null
    circulatingSupply?: number | null
    selfReportedCirculatingSupply?: number | null
    totalSupply?: number | null
    maxSupply?: number | null
    ath?: number | null
    atl?: number | null
    high24h?: number | null
    low24h?: number | null
    isActive?: number | null
    lastUpdated?: Date | string | null
    dateAdded?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string | null
    isAudited?: boolean
  }

  export type tokensUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    cmcRank?: NullableFloatFieldUpdateOperationsInput | number | null
    marketPairCount?: NullableFloatFieldUpdateOperationsInput | number | null
    circulatingSupply?: NullableFloatFieldUpdateOperationsInput | number | null
    selfReportedCirculatingSupply?: NullableFloatFieldUpdateOperationsInput | number | null
    totalSupply?: NullableFloatFieldUpdateOperationsInput | number | null
    maxSupply?: NullableFloatFieldUpdateOperationsInput | number | null
    ath?: NullableFloatFieldUpdateOperationsInput | number | null
    atl?: NullableFloatFieldUpdateOperationsInput | number | null
    high24h?: NullableFloatFieldUpdateOperationsInput | number | null
    low24h?: NullableFloatFieldUpdateOperationsInput | number | null
    isActive?: NullableFloatFieldUpdateOperationsInput | number | null
    lastUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateAdded?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isAudited?: BoolFieldUpdateOperationsInput | boolean
  }

  export type tokensUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    cmcRank?: NullableFloatFieldUpdateOperationsInput | number | null
    marketPairCount?: NullableFloatFieldUpdateOperationsInput | number | null
    circulatingSupply?: NullableFloatFieldUpdateOperationsInput | number | null
    selfReportedCirculatingSupply?: NullableFloatFieldUpdateOperationsInput | number | null
    totalSupply?: NullableFloatFieldUpdateOperationsInput | number | null
    maxSupply?: NullableFloatFieldUpdateOperationsInput | number | null
    ath?: NullableFloatFieldUpdateOperationsInput | number | null
    atl?: NullableFloatFieldUpdateOperationsInput | number | null
    high24h?: NullableFloatFieldUpdateOperationsInput | number | null
    low24h?: NullableFloatFieldUpdateOperationsInput | number | null
    isActive?: NullableFloatFieldUpdateOperationsInput | number | null
    lastUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateAdded?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isAudited?: BoolFieldUpdateOperationsInput | boolean
  }

  export type tokensCreateManyInput = {
    id?: string
    name: string
    symbol: string
    slug: string
    cmcRank?: number | null
    marketPairCount?: number | null
    circulatingSupply?: number | null
    selfReportedCirculatingSupply?: number | null
    totalSupply?: number | null
    maxSupply?: number | null
    ath?: number | null
    atl?: number | null
    high24h?: number | null
    low24h?: number | null
    isActive?: number | null
    lastUpdated?: Date | string | null
    dateAdded?: Date | string | null
    created_at?: Date | string
    updated_at?: Date | string | null
    isAudited?: boolean
  }

  export type tokensUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    cmcRank?: NullableFloatFieldUpdateOperationsInput | number | null
    marketPairCount?: NullableFloatFieldUpdateOperationsInput | number | null
    circulatingSupply?: NullableFloatFieldUpdateOperationsInput | number | null
    selfReportedCirculatingSupply?: NullableFloatFieldUpdateOperationsInput | number | null
    totalSupply?: NullableFloatFieldUpdateOperationsInput | number | null
    maxSupply?: NullableFloatFieldUpdateOperationsInput | number | null
    ath?: NullableFloatFieldUpdateOperationsInput | number | null
    atl?: NullableFloatFieldUpdateOperationsInput | number | null
    high24h?: NullableFloatFieldUpdateOperationsInput | number | null
    low24h?: NullableFloatFieldUpdateOperationsInput | number | null
    isActive?: NullableFloatFieldUpdateOperationsInput | number | null
    lastUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateAdded?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isAudited?: BoolFieldUpdateOperationsInput | boolean
  }

  export type tokensUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    symbol?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    cmcRank?: NullableFloatFieldUpdateOperationsInput | number | null
    marketPairCount?: NullableFloatFieldUpdateOperationsInput | number | null
    circulatingSupply?: NullableFloatFieldUpdateOperationsInput | number | null
    selfReportedCirculatingSupply?: NullableFloatFieldUpdateOperationsInput | number | null
    totalSupply?: NullableFloatFieldUpdateOperationsInput | number | null
    maxSupply?: NullableFloatFieldUpdateOperationsInput | number | null
    ath?: NullableFloatFieldUpdateOperationsInput | number | null
    atl?: NullableFloatFieldUpdateOperationsInput | number | null
    high24h?: NullableFloatFieldUpdateOperationsInput | number | null
    low24h?: NullableFloatFieldUpdateOperationsInput | number | null
    isActive?: NullableFloatFieldUpdateOperationsInput | number | null
    lastUpdated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    dateAdded?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    isAudited?: BoolFieldUpdateOperationsInput | boolean
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    search?: string
    mode?: QueryMode
    not?: NestedStringFilter | string
  }

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    search?: string
    mode?: QueryMode
    not?: NestedStringNullableFilter | string | null
  }

  export type EnumUserStatusFilter = {
    equals?: UserStatus
    in?: Enumerable<UserStatus>
    notIn?: Enumerable<UserStatus>
    not?: NestedEnumUserStatusFilter | UserStatus
  }

  export type EnumRoleNullableListFilter = {
    equals?: Enumerable<Role> | null
    has?: Role | null
    hasEvery?: Enumerable<Role>
    hasSome?: Enumerable<Role>
    isEmpty?: boolean
  }
  export type JsonNullableFilter = 
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase>, Exclude<keyof Required<JsonNullableFilterBase>, 'path'>>,
        Required<JsonNullableFilterBase>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase>, 'path'>>

  export type JsonNullableFilterBase = {
    equals?: JsonNullValueFilter | InputJsonValue
    not?: JsonNullValueFilter | InputJsonValue
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type DateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type User_dappsListRelationFilter = {
    every?: user_dappsWhereInput
    some?: user_dappsWhereInput
    none?: user_dappsWhereInput
  }

  export type User_dapps_catogoriesListRelationFilter = {
    every?: user_dapps_catogoriesWhereInput
    some?: user_dapps_catogoriesWhereInput
    none?: user_dapps_catogoriesWhereInput
  }

  export type user_dappsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type user_dapps_catogoriesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type usersOrderByRelevanceInput = {
    fields: Enumerable<usersOrderByRelevanceFieldEnum>
    sort: SortOrder
    search: string
  }

  export type usersCountOrderByAggregateInput = {
    id?: SortOrder
    address?: SortOrder
    name?: SortOrder
    nonce?: SortOrder
    status?: SortOrder
    role?: SortOrder
    settings?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type usersMaxOrderByAggregateInput = {
    id?: SortOrder
    address?: SortOrder
    name?: SortOrder
    nonce?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type usersMinOrderByAggregateInput = {
    id?: SortOrder
    address?: SortOrder
    name?: SortOrder
    nonce?: SortOrder
    status?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    deleted_at?: SortOrder
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    search?: string
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type StringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    search?: string
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type EnumUserStatusWithAggregatesFilter = {
    equals?: UserStatus
    in?: Enumerable<UserStatus>
    notIn?: Enumerable<UserStatus>
    not?: NestedEnumUserStatusWithAggregatesFilter | UserStatus
    _count?: NestedIntFilter
    _min?: NestedEnumUserStatusFilter
    _max?: NestedEnumUserStatusFilter
  }
  export type JsonNullableWithAggregatesFilter = 
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase = {
    equals?: JsonNullValueFilter | InputJsonValue
    not?: JsonNullValueFilter | InputJsonValue
    _count?: NestedIntNullableFilter
    _min?: NestedJsonNullableFilter
    _max?: NestedJsonNullableFilter
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type DateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type whitelistsOrderByRelevanceInput = {
    fields: Enumerable<whitelistsOrderByRelevanceFieldEnum>
    sort: SortOrder
    search: string
  }

  export type whitelistsCountOrderByAggregateInput = {
    id?: SortOrder
    address?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type whitelistsAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type whitelistsMaxOrderByAggregateInput = {
    id?: SortOrder
    address?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type whitelistsMinOrderByAggregateInput = {
    id?: SortOrder
    address?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type whitelistsSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type IntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type favsOrderByRelevanceInput = {
    fields: Enumerable<favsOrderByRelevanceFieldEnum>
    sort: SortOrder
    search: string
  }

  export type favsUser_idProject_idCompoundUniqueInput = {
    user_id: string
    project_id: number
  }

  export type favsCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    project_id?: SortOrder
    project_type?: SortOrder
  }

  export type favsAvgOrderByAggregateInput = {
    project_id?: SortOrder
    project_type?: SortOrder
  }

  export type favsMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    project_id?: SortOrder
    project_type?: SortOrder
  }

  export type favsMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    project_id?: SortOrder
    project_type?: SortOrder
  }

  export type favsSumOrderByAggregateInput = {
    project_id?: SortOrder
    project_type?: SortOrder
  }

  export type IntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
  }

  export type visit_historiesOrderByRelevanceInput = {
    fields: Enumerable<visit_historiesOrderByRelevanceFieldEnum>
    sort: SortOrder
    search: string
  }

  export type visit_historiesCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    project_id?: SortOrder
    project_type?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type visit_historiesAvgOrderByAggregateInput = {
    project_id?: SortOrder
    project_type?: SortOrder
  }

  export type visit_historiesMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    project_id?: SortOrder
    project_type?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type visit_historiesMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    project_id?: SortOrder
    project_type?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type visit_historiesSumOrderByAggregateInput = {
    project_id?: SortOrder
    project_type?: SortOrder
  }

  export type alarmsOrderByRelevanceInput = {
    fields: Enumerable<alarmsOrderByRelevanceFieldEnum>
    sort: SortOrder
    search: string
  }

  export type alarmsCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    alarm_at?: SortOrder
    desc?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    color?: SortOrder
    url?: SortOrder
  }

  export type alarmsMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    alarm_at?: SortOrder
    desc?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    color?: SortOrder
    url?: SortOrder
  }

  export type alarmsMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    alarm_at?: SortOrder
    desc?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    color?: SortOrder
    url?: SortOrder
  }

  export type BoolNullableFilter = {
    equals?: boolean | null
    not?: NestedBoolNullableFilter | boolean | null
  }

  export type reportsOrderByRelevanceInput = {
    fields: Enumerable<reportsOrderByRelevanceFieldEnum>
    sort: SortOrder
    search: string
  }

  export type reportsCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    url?: SortOrder
    project_type?: SortOrder
    project_name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_scam?: SortOrder
  }

  export type reportsMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    url?: SortOrder
    project_type?: SortOrder
    project_name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_scam?: SortOrder
  }

  export type reportsMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    url?: SortOrder
    project_type?: SortOrder
    project_name?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_scam?: SortOrder
  }

  export type BoolNullableWithAggregatesFilter = {
    equals?: boolean | null
    not?: NestedBoolNullableWithAggregatesFilter | boolean | null
    _count?: NestedIntNullableFilter
    _min?: NestedBoolNullableFilter
    _max?: NestedBoolNullableFilter
  }

  export type BoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type Dapp_categories_relationsListRelationFilter = {
    every?: dapp_categories_relationsWhereInput
    some?: dapp_categories_relationsWhereInput
    none?: dapp_categories_relationsWhereInput
  }

  export type Story_dapps_relationsListRelationFilter = {
    every?: story_dapps_relationsWhereInput
    some?: story_dapps_relationsWhereInput
    none?: story_dapps_relationsWhereInput
  }

  export type dapp_categories_relationsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type story_dapps_relationsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type dappsOrderByRelevanceInput = {
    fields: Enumerable<dappsOrderByRelevanceFieldEnum>
    sort: SortOrder
    search: string
  }

  export type dappsCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    url?: SortOrder
    logo?: SortOrder
    desc?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    visit_count?: SortOrder
    install_count?: SortOrder
    visible?: SortOrder
    is_good?: SortOrder
    add_by_admin?: SortOrder
  }

  export type dappsAvgOrderByAggregateInput = {
    visit_count?: SortOrder
    install_count?: SortOrder
  }

  export type dappsMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    url?: SortOrder
    logo?: SortOrder
    desc?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    visit_count?: SortOrder
    install_count?: SortOrder
    visible?: SortOrder
    is_good?: SortOrder
    add_by_admin?: SortOrder
  }

  export type dappsMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    url?: SortOrder
    logo?: SortOrder
    desc?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    visit_count?: SortOrder
    install_count?: SortOrder
    visible?: SortOrder
    is_good?: SortOrder
    add_by_admin?: SortOrder
  }

  export type dappsSumOrderByAggregateInput = {
    visit_count?: SortOrder
    install_count?: SortOrder
  }

  export type BoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type dapp_categoriesOrderByRelevanceInput = {
    fields: Enumerable<dapp_categoriesOrderByRelevanceFieldEnum>
    sort: SortOrder
    search: string
  }

  export type dapp_categoriesCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    desc?: SortOrder
    sort?: SortOrder
    is_deleted?: SortOrder
  }

  export type dapp_categoriesAvgOrderByAggregateInput = {
    sort?: SortOrder
  }

  export type dapp_categoriesMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    desc?: SortOrder
    sort?: SortOrder
    is_deleted?: SortOrder
  }

  export type dapp_categoriesMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    desc?: SortOrder
    sort?: SortOrder
    is_deleted?: SortOrder
  }

  export type dapp_categoriesSumOrderByAggregateInput = {
    sort?: SortOrder
  }

  export type Dapp_categoriesRelationFilter = {
    is?: dapp_categoriesWhereInput
    isNot?: dapp_categoriesWhereInput
  }

  export type DappsRelationFilter = {
    is?: dappsWhereInput
    isNot?: dappsWhereInput
  }

  export type dapp_categories_relationsOrderByRelevanceInput = {
    fields: Enumerable<dapp_categories_relationsOrderByRelevanceFieldEnum>
    sort: SortOrder
    search: string
  }

  export type dapp_categories_relationsCountOrderByAggregateInput = {
    id?: SortOrder
    website_category_id?: SortOrder
    subcategory_id?: SortOrder
    dapp_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type dapp_categories_relationsAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type dapp_categories_relationsMaxOrderByAggregateInput = {
    id?: SortOrder
    website_category_id?: SortOrder
    subcategory_id?: SortOrder
    dapp_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type dapp_categories_relationsMinOrderByAggregateInput = {
    id?: SortOrder
    website_category_id?: SortOrder
    subcategory_id?: SortOrder
    dapp_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type dapp_categories_relationsSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UsersRelationFilter = {
    is?: usersWhereInput
    isNot?: usersWhereInput
  }

  export type User_dapps_catogoriesRelationFilter = {
    is?: user_dapps_catogoriesWhereInput | null
    isNot?: user_dapps_catogoriesWhereInput | null
  }

  export type user_dappsOrderByRelevanceInput = {
    fields: Enumerable<user_dappsOrderByRelevanceFieldEnum>
    sort: SortOrder
    search: string
  }

  export type user_dappsUser_idDapp_idCompoundUniqueInput = {
    user_id: string
    dapp_id: string
  }

  export type user_dappsCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    dapp_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user_dapps_catogories_id?: SortOrder
  }

  export type user_dappsMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    dapp_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user_dapps_catogories_id?: SortOrder
  }

  export type user_dappsMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    dapp_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user_dapps_catogories_id?: SortOrder
  }

  export type user_dapps_catogoriesOrderByRelevanceInput = {
    fields: Enumerable<user_dapps_catogoriesOrderByRelevanceFieldEnum>
    sort: SortOrder
    search: string
  }

  export type user_dapps_catogoriesCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    desc?: SortOrder
    sort?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user_id?: SortOrder
  }

  export type user_dapps_catogoriesAvgOrderByAggregateInput = {
    sort?: SortOrder
  }

  export type user_dapps_catogoriesMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    desc?: SortOrder
    sort?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user_id?: SortOrder
  }

  export type user_dapps_catogoriesMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    desc?: SortOrder
    sort?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    user_id?: SortOrder
  }

  export type user_dapps_catogoriesSumOrderByAggregateInput = {
    sort?: SortOrder
  }

  export type Story_categories_relationsListRelationFilter = {
    every?: story_categories_relationsWhereInput
    some?: story_categories_relationsWhereInput
    none?: story_categories_relationsWhereInput
  }

  export type story_categories_relationsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type storiesOrderByRelevanceInput = {
    fields: Enumerable<storiesOrderByRelevanceFieldEnum>
    sort: SortOrder
    search: string
  }

  export type storiesCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    cover?: SortOrder
    desc?: SortOrder
    url?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    visible?: SortOrder
    sort?: SortOrder
    is_deleted?: SortOrder
    visit_count?: SortOrder
  }

  export type storiesAvgOrderByAggregateInput = {
    sort?: SortOrder
    visit_count?: SortOrder
  }

  export type storiesMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    cover?: SortOrder
    desc?: SortOrder
    url?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    visible?: SortOrder
    sort?: SortOrder
    is_deleted?: SortOrder
    visit_count?: SortOrder
  }

  export type storiesMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    cover?: SortOrder
    desc?: SortOrder
    url?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    visible?: SortOrder
    sort?: SortOrder
    is_deleted?: SortOrder
    visit_count?: SortOrder
  }

  export type storiesSumOrderByAggregateInput = {
    sort?: SortOrder
    visit_count?: SortOrder
  }

  export type story_categoriesOrderByRelevanceInput = {
    fields: Enumerable<story_categoriesOrderByRelevanceFieldEnum>
    sort: SortOrder
    search: string
  }

  export type story_categoriesCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    desc?: SortOrder
    sort?: SortOrder
    is_deleted?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type story_categoriesAvgOrderByAggregateInput = {
    sort?: SortOrder
  }

  export type story_categoriesMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    desc?: SortOrder
    sort?: SortOrder
    is_deleted?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type story_categoriesMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    desc?: SortOrder
    sort?: SortOrder
    is_deleted?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type story_categoriesSumOrderByAggregateInput = {
    sort?: SortOrder
  }

  export type Story_categoriesRelationFilter = {
    is?: story_categoriesWhereInput
    isNot?: story_categoriesWhereInput
  }

  export type StoriesRelationFilter = {
    is?: storiesWhereInput
    isNot?: storiesWhereInput
  }

  export type story_categories_relationsOrderByRelevanceInput = {
    fields: Enumerable<story_categories_relationsOrderByRelevanceFieldEnum>
    sort: SortOrder
    search: string
  }

  export type story_categories_relationsCountOrderByAggregateInput = {
    id?: SortOrder
    story_category_id?: SortOrder
    story_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type story_categories_relationsAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type story_categories_relationsMaxOrderByAggregateInput = {
    id?: SortOrder
    story_category_id?: SortOrder
    story_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type story_categories_relationsMinOrderByAggregateInput = {
    id?: SortOrder
    story_category_id?: SortOrder
    story_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type story_categories_relationsSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type story_dapps_relationsOrderByRelevanceInput = {
    fields: Enumerable<story_dapps_relationsOrderByRelevanceFieldEnum>
    sort: SortOrder
    search: string
  }

  export type story_dapps_relationsCountOrderByAggregateInput = {
    id?: SortOrder
    story_id?: SortOrder
    dapp_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type story_dapps_relationsAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type story_dapps_relationsMaxOrderByAggregateInput = {
    id?: SortOrder
    story_id?: SortOrder
    dapp_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type story_dapps_relationsMinOrderByAggregateInput = {
    id?: SortOrder
    story_id?: SortOrder
    dapp_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type story_dapps_relationsSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type FloatNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableFilter | number | null
  }

  export type tokensOrderByRelevanceInput = {
    fields: Enumerable<tokensOrderByRelevanceFieldEnum>
    sort: SortOrder
    search: string
  }

  export type tokensCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    symbol?: SortOrder
    slug?: SortOrder
    cmcRank?: SortOrder
    marketPairCount?: SortOrder
    circulatingSupply?: SortOrder
    selfReportedCirculatingSupply?: SortOrder
    totalSupply?: SortOrder
    maxSupply?: SortOrder
    ath?: SortOrder
    atl?: SortOrder
    high24h?: SortOrder
    low24h?: SortOrder
    isActive?: SortOrder
    lastUpdated?: SortOrder
    dateAdded?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    isAudited?: SortOrder
  }

  export type tokensAvgOrderByAggregateInput = {
    cmcRank?: SortOrder
    marketPairCount?: SortOrder
    circulatingSupply?: SortOrder
    selfReportedCirculatingSupply?: SortOrder
    totalSupply?: SortOrder
    maxSupply?: SortOrder
    ath?: SortOrder
    atl?: SortOrder
    high24h?: SortOrder
    low24h?: SortOrder
    isActive?: SortOrder
  }

  export type tokensMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    symbol?: SortOrder
    slug?: SortOrder
    cmcRank?: SortOrder
    marketPairCount?: SortOrder
    circulatingSupply?: SortOrder
    selfReportedCirculatingSupply?: SortOrder
    totalSupply?: SortOrder
    maxSupply?: SortOrder
    ath?: SortOrder
    atl?: SortOrder
    high24h?: SortOrder
    low24h?: SortOrder
    isActive?: SortOrder
    lastUpdated?: SortOrder
    dateAdded?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    isAudited?: SortOrder
  }

  export type tokensMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    symbol?: SortOrder
    slug?: SortOrder
    cmcRank?: SortOrder
    marketPairCount?: SortOrder
    circulatingSupply?: SortOrder
    selfReportedCirculatingSupply?: SortOrder
    totalSupply?: SortOrder
    maxSupply?: SortOrder
    ath?: SortOrder
    atl?: SortOrder
    high24h?: SortOrder
    low24h?: SortOrder
    isActive?: SortOrder
    lastUpdated?: SortOrder
    dateAdded?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    isAudited?: SortOrder
  }

  export type tokensSumOrderByAggregateInput = {
    cmcRank?: SortOrder
    marketPairCount?: SortOrder
    circulatingSupply?: SortOrder
    selfReportedCirculatingSupply?: SortOrder
    totalSupply?: SortOrder
    maxSupply?: SortOrder
    ath?: SortOrder
    atl?: SortOrder
    high24h?: SortOrder
    low24h?: SortOrder
    isActive?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedFloatNullableFilter
    _min?: NestedFloatNullableFilter
    _max?: NestedFloatNullableFilter
  }

  export type usersCreateroleInput = {
    set: Enumerable<Role>
  }

  export type user_dappsCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<user_dappsCreateWithoutUserInput>, Enumerable<user_dappsUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<user_dappsCreateOrConnectWithoutUserInput>
    createMany?: user_dappsCreateManyUserInputEnvelope
    connect?: Enumerable<user_dappsWhereUniqueInput>
  }

  export type user_dapps_catogoriesCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<user_dapps_catogoriesCreateWithoutUserInput>, Enumerable<user_dapps_catogoriesUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<user_dapps_catogoriesCreateOrConnectWithoutUserInput>
    createMany?: user_dapps_catogoriesCreateManyUserInputEnvelope
    connect?: Enumerable<user_dapps_catogoriesWhereUniqueInput>
  }

  export type user_dappsUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<user_dappsCreateWithoutUserInput>, Enumerable<user_dappsUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<user_dappsCreateOrConnectWithoutUserInput>
    createMany?: user_dappsCreateManyUserInputEnvelope
    connect?: Enumerable<user_dappsWhereUniqueInput>
  }

  export type user_dapps_catogoriesUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<Enumerable<user_dapps_catogoriesCreateWithoutUserInput>, Enumerable<user_dapps_catogoriesUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<user_dapps_catogoriesCreateOrConnectWithoutUserInput>
    createMany?: user_dapps_catogoriesCreateManyUserInputEnvelope
    connect?: Enumerable<user_dapps_catogoriesWhereUniqueInput>
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumUserStatusFieldUpdateOperationsInput = {
    set?: UserStatus
  }

  export type usersUpdateroleInput = {
    set?: Enumerable<Role>
    push?: Enumerable<Role>
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type user_dappsUpdateManyWithoutUserInput = {
    create?: XOR<Enumerable<user_dappsCreateWithoutUserInput>, Enumerable<user_dappsUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<user_dappsCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<user_dappsUpsertWithWhereUniqueWithoutUserInput>
    createMany?: user_dappsCreateManyUserInputEnvelope
    set?: Enumerable<user_dappsWhereUniqueInput>
    disconnect?: Enumerable<user_dappsWhereUniqueInput>
    delete?: Enumerable<user_dappsWhereUniqueInput>
    connect?: Enumerable<user_dappsWhereUniqueInput>
    update?: Enumerable<user_dappsUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<user_dappsUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<user_dappsScalarWhereInput>
  }

  export type user_dapps_catogoriesUpdateManyWithoutUserInput = {
    create?: XOR<Enumerable<user_dapps_catogoriesCreateWithoutUserInput>, Enumerable<user_dapps_catogoriesUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<user_dapps_catogoriesCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<user_dapps_catogoriesUpsertWithWhereUniqueWithoutUserInput>
    createMany?: user_dapps_catogoriesCreateManyUserInputEnvelope
    set?: Enumerable<user_dapps_catogoriesWhereUniqueInput>
    disconnect?: Enumerable<user_dapps_catogoriesWhereUniqueInput>
    delete?: Enumerable<user_dapps_catogoriesWhereUniqueInput>
    connect?: Enumerable<user_dapps_catogoriesWhereUniqueInput>
    update?: Enumerable<user_dapps_catogoriesUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<user_dapps_catogoriesUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<user_dapps_catogoriesScalarWhereInput>
  }

  export type user_dappsUncheckedUpdateManyWithoutUserInput = {
    create?: XOR<Enumerable<user_dappsCreateWithoutUserInput>, Enumerable<user_dappsUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<user_dappsCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<user_dappsUpsertWithWhereUniqueWithoutUserInput>
    createMany?: user_dappsCreateManyUserInputEnvelope
    set?: Enumerable<user_dappsWhereUniqueInput>
    disconnect?: Enumerable<user_dappsWhereUniqueInput>
    delete?: Enumerable<user_dappsWhereUniqueInput>
    connect?: Enumerable<user_dappsWhereUniqueInput>
    update?: Enumerable<user_dappsUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<user_dappsUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<user_dappsScalarWhereInput>
  }

  export type user_dapps_catogoriesUncheckedUpdateManyWithoutUserInput = {
    create?: XOR<Enumerable<user_dapps_catogoriesCreateWithoutUserInput>, Enumerable<user_dapps_catogoriesUncheckedCreateWithoutUserInput>>
    connectOrCreate?: Enumerable<user_dapps_catogoriesCreateOrConnectWithoutUserInput>
    upsert?: Enumerable<user_dapps_catogoriesUpsertWithWhereUniqueWithoutUserInput>
    createMany?: user_dapps_catogoriesCreateManyUserInputEnvelope
    set?: Enumerable<user_dapps_catogoriesWhereUniqueInput>
    disconnect?: Enumerable<user_dapps_catogoriesWhereUniqueInput>
    delete?: Enumerable<user_dapps_catogoriesWhereUniqueInput>
    connect?: Enumerable<user_dapps_catogoriesWhereUniqueInput>
    update?: Enumerable<user_dapps_catogoriesUpdateWithWhereUniqueWithoutUserInput>
    updateMany?: Enumerable<user_dapps_catogoriesUpdateManyWithWhereWithoutUserInput>
    deleteMany?: Enumerable<user_dapps_catogoriesScalarWhereInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type dapp_categories_relationsCreateNestedManyWithoutDappInput = {
    create?: XOR<Enumerable<dapp_categories_relationsCreateWithoutDappInput>, Enumerable<dapp_categories_relationsUncheckedCreateWithoutDappInput>>
    connectOrCreate?: Enumerable<dapp_categories_relationsCreateOrConnectWithoutDappInput>
    createMany?: dapp_categories_relationsCreateManyDappInputEnvelope
    connect?: Enumerable<dapp_categories_relationsWhereUniqueInput>
  }

  export type story_dapps_relationsCreateNestedManyWithoutDappInput = {
    create?: XOR<Enumerable<story_dapps_relationsCreateWithoutDappInput>, Enumerable<story_dapps_relationsUncheckedCreateWithoutDappInput>>
    connectOrCreate?: Enumerable<story_dapps_relationsCreateOrConnectWithoutDappInput>
    createMany?: story_dapps_relationsCreateManyDappInputEnvelope
    connect?: Enumerable<story_dapps_relationsWhereUniqueInput>
  }

  export type user_dappsCreateNestedManyWithoutDappInput = {
    create?: XOR<Enumerable<user_dappsCreateWithoutDappInput>, Enumerable<user_dappsUncheckedCreateWithoutDappInput>>
    connectOrCreate?: Enumerable<user_dappsCreateOrConnectWithoutDappInput>
    createMany?: user_dappsCreateManyDappInputEnvelope
    connect?: Enumerable<user_dappsWhereUniqueInput>
  }

  export type dapp_categories_relationsUncheckedCreateNestedManyWithoutDappInput = {
    create?: XOR<Enumerable<dapp_categories_relationsCreateWithoutDappInput>, Enumerable<dapp_categories_relationsUncheckedCreateWithoutDappInput>>
    connectOrCreate?: Enumerable<dapp_categories_relationsCreateOrConnectWithoutDappInput>
    createMany?: dapp_categories_relationsCreateManyDappInputEnvelope
    connect?: Enumerable<dapp_categories_relationsWhereUniqueInput>
  }

  export type story_dapps_relationsUncheckedCreateNestedManyWithoutDappInput = {
    create?: XOR<Enumerable<story_dapps_relationsCreateWithoutDappInput>, Enumerable<story_dapps_relationsUncheckedCreateWithoutDappInput>>
    connectOrCreate?: Enumerable<story_dapps_relationsCreateOrConnectWithoutDappInput>
    createMany?: story_dapps_relationsCreateManyDappInputEnvelope
    connect?: Enumerable<story_dapps_relationsWhereUniqueInput>
  }

  export type user_dappsUncheckedCreateNestedManyWithoutDappInput = {
    create?: XOR<Enumerable<user_dappsCreateWithoutDappInput>, Enumerable<user_dappsUncheckedCreateWithoutDappInput>>
    connectOrCreate?: Enumerable<user_dappsCreateOrConnectWithoutDappInput>
    createMany?: user_dappsCreateManyDappInputEnvelope
    connect?: Enumerable<user_dappsWhereUniqueInput>
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type dapp_categories_relationsUpdateManyWithoutDappInput = {
    create?: XOR<Enumerable<dapp_categories_relationsCreateWithoutDappInput>, Enumerable<dapp_categories_relationsUncheckedCreateWithoutDappInput>>
    connectOrCreate?: Enumerable<dapp_categories_relationsCreateOrConnectWithoutDappInput>
    upsert?: Enumerable<dapp_categories_relationsUpsertWithWhereUniqueWithoutDappInput>
    createMany?: dapp_categories_relationsCreateManyDappInputEnvelope
    set?: Enumerable<dapp_categories_relationsWhereUniqueInput>
    disconnect?: Enumerable<dapp_categories_relationsWhereUniqueInput>
    delete?: Enumerable<dapp_categories_relationsWhereUniqueInput>
    connect?: Enumerable<dapp_categories_relationsWhereUniqueInput>
    update?: Enumerable<dapp_categories_relationsUpdateWithWhereUniqueWithoutDappInput>
    updateMany?: Enumerable<dapp_categories_relationsUpdateManyWithWhereWithoutDappInput>
    deleteMany?: Enumerable<dapp_categories_relationsScalarWhereInput>
  }

  export type story_dapps_relationsUpdateManyWithoutDappInput = {
    create?: XOR<Enumerable<story_dapps_relationsCreateWithoutDappInput>, Enumerable<story_dapps_relationsUncheckedCreateWithoutDappInput>>
    connectOrCreate?: Enumerable<story_dapps_relationsCreateOrConnectWithoutDappInput>
    upsert?: Enumerable<story_dapps_relationsUpsertWithWhereUniqueWithoutDappInput>
    createMany?: story_dapps_relationsCreateManyDappInputEnvelope
    set?: Enumerable<story_dapps_relationsWhereUniqueInput>
    disconnect?: Enumerable<story_dapps_relationsWhereUniqueInput>
    delete?: Enumerable<story_dapps_relationsWhereUniqueInput>
    connect?: Enumerable<story_dapps_relationsWhereUniqueInput>
    update?: Enumerable<story_dapps_relationsUpdateWithWhereUniqueWithoutDappInput>
    updateMany?: Enumerable<story_dapps_relationsUpdateManyWithWhereWithoutDappInput>
    deleteMany?: Enumerable<story_dapps_relationsScalarWhereInput>
  }

  export type user_dappsUpdateManyWithoutDappInput = {
    create?: XOR<Enumerable<user_dappsCreateWithoutDappInput>, Enumerable<user_dappsUncheckedCreateWithoutDappInput>>
    connectOrCreate?: Enumerable<user_dappsCreateOrConnectWithoutDappInput>
    upsert?: Enumerable<user_dappsUpsertWithWhereUniqueWithoutDappInput>
    createMany?: user_dappsCreateManyDappInputEnvelope
    set?: Enumerable<user_dappsWhereUniqueInput>
    disconnect?: Enumerable<user_dappsWhereUniqueInput>
    delete?: Enumerable<user_dappsWhereUniqueInput>
    connect?: Enumerable<user_dappsWhereUniqueInput>
    update?: Enumerable<user_dappsUpdateWithWhereUniqueWithoutDappInput>
    updateMany?: Enumerable<user_dappsUpdateManyWithWhereWithoutDappInput>
    deleteMany?: Enumerable<user_dappsScalarWhereInput>
  }

  export type dapp_categories_relationsUncheckedUpdateManyWithoutDappInput = {
    create?: XOR<Enumerable<dapp_categories_relationsCreateWithoutDappInput>, Enumerable<dapp_categories_relationsUncheckedCreateWithoutDappInput>>
    connectOrCreate?: Enumerable<dapp_categories_relationsCreateOrConnectWithoutDappInput>
    upsert?: Enumerable<dapp_categories_relationsUpsertWithWhereUniqueWithoutDappInput>
    createMany?: dapp_categories_relationsCreateManyDappInputEnvelope
    set?: Enumerable<dapp_categories_relationsWhereUniqueInput>
    disconnect?: Enumerable<dapp_categories_relationsWhereUniqueInput>
    delete?: Enumerable<dapp_categories_relationsWhereUniqueInput>
    connect?: Enumerable<dapp_categories_relationsWhereUniqueInput>
    update?: Enumerable<dapp_categories_relationsUpdateWithWhereUniqueWithoutDappInput>
    updateMany?: Enumerable<dapp_categories_relationsUpdateManyWithWhereWithoutDappInput>
    deleteMany?: Enumerable<dapp_categories_relationsScalarWhereInput>
  }

  export type story_dapps_relationsUncheckedUpdateManyWithoutDappInput = {
    create?: XOR<Enumerable<story_dapps_relationsCreateWithoutDappInput>, Enumerable<story_dapps_relationsUncheckedCreateWithoutDappInput>>
    connectOrCreate?: Enumerable<story_dapps_relationsCreateOrConnectWithoutDappInput>
    upsert?: Enumerable<story_dapps_relationsUpsertWithWhereUniqueWithoutDappInput>
    createMany?: story_dapps_relationsCreateManyDappInputEnvelope
    set?: Enumerable<story_dapps_relationsWhereUniqueInput>
    disconnect?: Enumerable<story_dapps_relationsWhereUniqueInput>
    delete?: Enumerable<story_dapps_relationsWhereUniqueInput>
    connect?: Enumerable<story_dapps_relationsWhereUniqueInput>
    update?: Enumerable<story_dapps_relationsUpdateWithWhereUniqueWithoutDappInput>
    updateMany?: Enumerable<story_dapps_relationsUpdateManyWithWhereWithoutDappInput>
    deleteMany?: Enumerable<story_dapps_relationsScalarWhereInput>
  }

  export type user_dappsUncheckedUpdateManyWithoutDappInput = {
    create?: XOR<Enumerable<user_dappsCreateWithoutDappInput>, Enumerable<user_dappsUncheckedCreateWithoutDappInput>>
    connectOrCreate?: Enumerable<user_dappsCreateOrConnectWithoutDappInput>
    upsert?: Enumerable<user_dappsUpsertWithWhereUniqueWithoutDappInput>
    createMany?: user_dappsCreateManyDappInputEnvelope
    set?: Enumerable<user_dappsWhereUniqueInput>
    disconnect?: Enumerable<user_dappsWhereUniqueInput>
    delete?: Enumerable<user_dappsWhereUniqueInput>
    connect?: Enumerable<user_dappsWhereUniqueInput>
    update?: Enumerable<user_dappsUpdateWithWhereUniqueWithoutDappInput>
    updateMany?: Enumerable<user_dappsUpdateManyWithWhereWithoutDappInput>
    deleteMany?: Enumerable<user_dappsScalarWhereInput>
  }

  export type dapp_categories_relationsCreateNestedManyWithoutDapp_categoriesInput = {
    create?: XOR<Enumerable<dapp_categories_relationsCreateWithoutDapp_categoriesInput>, Enumerable<dapp_categories_relationsUncheckedCreateWithoutDapp_categoriesInput>>
    connectOrCreate?: Enumerable<dapp_categories_relationsCreateOrConnectWithoutDapp_categoriesInput>
    createMany?: dapp_categories_relationsCreateManyDapp_categoriesInputEnvelope
    connect?: Enumerable<dapp_categories_relationsWhereUniqueInput>
  }

  export type dapp_categories_relationsUncheckedCreateNestedManyWithoutDapp_categoriesInput = {
    create?: XOR<Enumerable<dapp_categories_relationsCreateWithoutDapp_categoriesInput>, Enumerable<dapp_categories_relationsUncheckedCreateWithoutDapp_categoriesInput>>
    connectOrCreate?: Enumerable<dapp_categories_relationsCreateOrConnectWithoutDapp_categoriesInput>
    createMany?: dapp_categories_relationsCreateManyDapp_categoriesInputEnvelope
    connect?: Enumerable<dapp_categories_relationsWhereUniqueInput>
  }

  export type dapp_categories_relationsUpdateManyWithoutDapp_categoriesInput = {
    create?: XOR<Enumerable<dapp_categories_relationsCreateWithoutDapp_categoriesInput>, Enumerable<dapp_categories_relationsUncheckedCreateWithoutDapp_categoriesInput>>
    connectOrCreate?: Enumerable<dapp_categories_relationsCreateOrConnectWithoutDapp_categoriesInput>
    upsert?: Enumerable<dapp_categories_relationsUpsertWithWhereUniqueWithoutDapp_categoriesInput>
    createMany?: dapp_categories_relationsCreateManyDapp_categoriesInputEnvelope
    set?: Enumerable<dapp_categories_relationsWhereUniqueInput>
    disconnect?: Enumerable<dapp_categories_relationsWhereUniqueInput>
    delete?: Enumerable<dapp_categories_relationsWhereUniqueInput>
    connect?: Enumerable<dapp_categories_relationsWhereUniqueInput>
    update?: Enumerable<dapp_categories_relationsUpdateWithWhereUniqueWithoutDapp_categoriesInput>
    updateMany?: Enumerable<dapp_categories_relationsUpdateManyWithWhereWithoutDapp_categoriesInput>
    deleteMany?: Enumerable<dapp_categories_relationsScalarWhereInput>
  }

  export type dapp_categories_relationsUncheckedUpdateManyWithoutDapp_categoriesInput = {
    create?: XOR<Enumerable<dapp_categories_relationsCreateWithoutDapp_categoriesInput>, Enumerable<dapp_categories_relationsUncheckedCreateWithoutDapp_categoriesInput>>
    connectOrCreate?: Enumerable<dapp_categories_relationsCreateOrConnectWithoutDapp_categoriesInput>
    upsert?: Enumerable<dapp_categories_relationsUpsertWithWhereUniqueWithoutDapp_categoriesInput>
    createMany?: dapp_categories_relationsCreateManyDapp_categoriesInputEnvelope
    set?: Enumerable<dapp_categories_relationsWhereUniqueInput>
    disconnect?: Enumerable<dapp_categories_relationsWhereUniqueInput>
    delete?: Enumerable<dapp_categories_relationsWhereUniqueInput>
    connect?: Enumerable<dapp_categories_relationsWhereUniqueInput>
    update?: Enumerable<dapp_categories_relationsUpdateWithWhereUniqueWithoutDapp_categoriesInput>
    updateMany?: Enumerable<dapp_categories_relationsUpdateManyWithWhereWithoutDapp_categoriesInput>
    deleteMany?: Enumerable<dapp_categories_relationsScalarWhereInput>
  }

  export type dapp_categoriesCreateNestedOneWithoutDapp_categories_relationsInput = {
    create?: XOR<dapp_categoriesCreateWithoutDapp_categories_relationsInput, dapp_categoriesUncheckedCreateWithoutDapp_categories_relationsInput>
    connectOrCreate?: dapp_categoriesCreateOrConnectWithoutDapp_categories_relationsInput
    connect?: dapp_categoriesWhereUniqueInput
  }

  export type dappsCreateNestedOneWithoutDapp_categories_relationsInput = {
    create?: XOR<dappsCreateWithoutDapp_categories_relationsInput, dappsUncheckedCreateWithoutDapp_categories_relationsInput>
    connectOrCreate?: dappsCreateOrConnectWithoutDapp_categories_relationsInput
    connect?: dappsWhereUniqueInput
  }

  export type dapp_categoriesUpdateOneRequiredWithoutDapp_categories_relationsInput = {
    create?: XOR<dapp_categoriesCreateWithoutDapp_categories_relationsInput, dapp_categoriesUncheckedCreateWithoutDapp_categories_relationsInput>
    connectOrCreate?: dapp_categoriesCreateOrConnectWithoutDapp_categories_relationsInput
    upsert?: dapp_categoriesUpsertWithoutDapp_categories_relationsInput
    connect?: dapp_categoriesWhereUniqueInput
    update?: XOR<dapp_categoriesUpdateWithoutDapp_categories_relationsInput, dapp_categoriesUncheckedUpdateWithoutDapp_categories_relationsInput>
  }

  export type dappsUpdateOneRequiredWithoutDapp_categories_relationsInput = {
    create?: XOR<dappsCreateWithoutDapp_categories_relationsInput, dappsUncheckedCreateWithoutDapp_categories_relationsInput>
    connectOrCreate?: dappsCreateOrConnectWithoutDapp_categories_relationsInput
    upsert?: dappsUpsertWithoutDapp_categories_relationsInput
    connect?: dappsWhereUniqueInput
    update?: XOR<dappsUpdateWithoutDapp_categories_relationsInput, dappsUncheckedUpdateWithoutDapp_categories_relationsInput>
  }

  export type dappsCreateNestedOneWithoutUser_dappsInput = {
    create?: XOR<dappsCreateWithoutUser_dappsInput, dappsUncheckedCreateWithoutUser_dappsInput>
    connectOrCreate?: dappsCreateOrConnectWithoutUser_dappsInput
    connect?: dappsWhereUniqueInput
  }

  export type usersCreateNestedOneWithoutUser_dappsInput = {
    create?: XOR<usersCreateWithoutUser_dappsInput, usersUncheckedCreateWithoutUser_dappsInput>
    connectOrCreate?: usersCreateOrConnectWithoutUser_dappsInput
    connect?: usersWhereUniqueInput
  }

  export type user_dapps_catogoriesCreateNestedOneWithoutUser_dappsInput = {
    create?: XOR<user_dapps_catogoriesCreateWithoutUser_dappsInput, user_dapps_catogoriesUncheckedCreateWithoutUser_dappsInput>
    connectOrCreate?: user_dapps_catogoriesCreateOrConnectWithoutUser_dappsInput
    connect?: user_dapps_catogoriesWhereUniqueInput
  }

  export type dappsUpdateOneRequiredWithoutUser_dappsInput = {
    create?: XOR<dappsCreateWithoutUser_dappsInput, dappsUncheckedCreateWithoutUser_dappsInput>
    connectOrCreate?: dappsCreateOrConnectWithoutUser_dappsInput
    upsert?: dappsUpsertWithoutUser_dappsInput
    connect?: dappsWhereUniqueInput
    update?: XOR<dappsUpdateWithoutUser_dappsInput, dappsUncheckedUpdateWithoutUser_dappsInput>
  }

  export type usersUpdateOneRequiredWithoutUser_dappsInput = {
    create?: XOR<usersCreateWithoutUser_dappsInput, usersUncheckedCreateWithoutUser_dappsInput>
    connectOrCreate?: usersCreateOrConnectWithoutUser_dappsInput
    upsert?: usersUpsertWithoutUser_dappsInput
    connect?: usersWhereUniqueInput
    update?: XOR<usersUpdateWithoutUser_dappsInput, usersUncheckedUpdateWithoutUser_dappsInput>
  }

  export type user_dapps_catogoriesUpdateOneWithoutUser_dappsInput = {
    create?: XOR<user_dapps_catogoriesCreateWithoutUser_dappsInput, user_dapps_catogoriesUncheckedCreateWithoutUser_dappsInput>
    connectOrCreate?: user_dapps_catogoriesCreateOrConnectWithoutUser_dappsInput
    upsert?: user_dapps_catogoriesUpsertWithoutUser_dappsInput
    disconnect?: boolean
    delete?: boolean
    connect?: user_dapps_catogoriesWhereUniqueInput
    update?: XOR<user_dapps_catogoriesUpdateWithoutUser_dappsInput, user_dapps_catogoriesUncheckedUpdateWithoutUser_dappsInput>
  }

  export type usersCreateNestedOneWithoutUser_dapps_catogoriesInput = {
    create?: XOR<usersCreateWithoutUser_dapps_catogoriesInput, usersUncheckedCreateWithoutUser_dapps_catogoriesInput>
    connectOrCreate?: usersCreateOrConnectWithoutUser_dapps_catogoriesInput
    connect?: usersWhereUniqueInput
  }

  export type user_dappsCreateNestedManyWithoutUser_dapps_catogoriesInput = {
    create?: XOR<Enumerable<user_dappsCreateWithoutUser_dapps_catogoriesInput>, Enumerable<user_dappsUncheckedCreateWithoutUser_dapps_catogoriesInput>>
    connectOrCreate?: Enumerable<user_dappsCreateOrConnectWithoutUser_dapps_catogoriesInput>
    createMany?: user_dappsCreateManyUser_dapps_catogoriesInputEnvelope
    connect?: Enumerable<user_dappsWhereUniqueInput>
  }

  export type user_dappsUncheckedCreateNestedManyWithoutUser_dapps_catogoriesInput = {
    create?: XOR<Enumerable<user_dappsCreateWithoutUser_dapps_catogoriesInput>, Enumerable<user_dappsUncheckedCreateWithoutUser_dapps_catogoriesInput>>
    connectOrCreate?: Enumerable<user_dappsCreateOrConnectWithoutUser_dapps_catogoriesInput>
    createMany?: user_dappsCreateManyUser_dapps_catogoriesInputEnvelope
    connect?: Enumerable<user_dappsWhereUniqueInput>
  }

  export type usersUpdateOneRequiredWithoutUser_dapps_catogoriesInput = {
    create?: XOR<usersCreateWithoutUser_dapps_catogoriesInput, usersUncheckedCreateWithoutUser_dapps_catogoriesInput>
    connectOrCreate?: usersCreateOrConnectWithoutUser_dapps_catogoriesInput
    upsert?: usersUpsertWithoutUser_dapps_catogoriesInput
    connect?: usersWhereUniqueInput
    update?: XOR<usersUpdateWithoutUser_dapps_catogoriesInput, usersUncheckedUpdateWithoutUser_dapps_catogoriesInput>
  }

  export type user_dappsUpdateManyWithoutUser_dapps_catogoriesInput = {
    create?: XOR<Enumerable<user_dappsCreateWithoutUser_dapps_catogoriesInput>, Enumerable<user_dappsUncheckedCreateWithoutUser_dapps_catogoriesInput>>
    connectOrCreate?: Enumerable<user_dappsCreateOrConnectWithoutUser_dapps_catogoriesInput>
    upsert?: Enumerable<user_dappsUpsertWithWhereUniqueWithoutUser_dapps_catogoriesInput>
    createMany?: user_dappsCreateManyUser_dapps_catogoriesInputEnvelope
    set?: Enumerable<user_dappsWhereUniqueInput>
    disconnect?: Enumerable<user_dappsWhereUniqueInput>
    delete?: Enumerable<user_dappsWhereUniqueInput>
    connect?: Enumerable<user_dappsWhereUniqueInput>
    update?: Enumerable<user_dappsUpdateWithWhereUniqueWithoutUser_dapps_catogoriesInput>
    updateMany?: Enumerable<user_dappsUpdateManyWithWhereWithoutUser_dapps_catogoriesInput>
    deleteMany?: Enumerable<user_dappsScalarWhereInput>
  }

  export type user_dappsUncheckedUpdateManyWithoutUser_dapps_catogoriesInput = {
    create?: XOR<Enumerable<user_dappsCreateWithoutUser_dapps_catogoriesInput>, Enumerable<user_dappsUncheckedCreateWithoutUser_dapps_catogoriesInput>>
    connectOrCreate?: Enumerable<user_dappsCreateOrConnectWithoutUser_dapps_catogoriesInput>
    upsert?: Enumerable<user_dappsUpsertWithWhereUniqueWithoutUser_dapps_catogoriesInput>
    createMany?: user_dappsCreateManyUser_dapps_catogoriesInputEnvelope
    set?: Enumerable<user_dappsWhereUniqueInput>
    disconnect?: Enumerable<user_dappsWhereUniqueInput>
    delete?: Enumerable<user_dappsWhereUniqueInput>
    connect?: Enumerable<user_dappsWhereUniqueInput>
    update?: Enumerable<user_dappsUpdateWithWhereUniqueWithoutUser_dapps_catogoriesInput>
    updateMany?: Enumerable<user_dappsUpdateManyWithWhereWithoutUser_dapps_catogoriesInput>
    deleteMany?: Enumerable<user_dappsScalarWhereInput>
  }

  export type story_categories_relationsCreateNestedManyWithoutStoryInput = {
    create?: XOR<Enumerable<story_categories_relationsCreateWithoutStoryInput>, Enumerable<story_categories_relationsUncheckedCreateWithoutStoryInput>>
    connectOrCreate?: Enumerable<story_categories_relationsCreateOrConnectWithoutStoryInput>
    createMany?: story_categories_relationsCreateManyStoryInputEnvelope
    connect?: Enumerable<story_categories_relationsWhereUniqueInput>
  }

  export type story_dapps_relationsCreateNestedManyWithoutStoryInput = {
    create?: XOR<Enumerable<story_dapps_relationsCreateWithoutStoryInput>, Enumerable<story_dapps_relationsUncheckedCreateWithoutStoryInput>>
    connectOrCreate?: Enumerable<story_dapps_relationsCreateOrConnectWithoutStoryInput>
    createMany?: story_dapps_relationsCreateManyStoryInputEnvelope
    connect?: Enumerable<story_dapps_relationsWhereUniqueInput>
  }

  export type story_categories_relationsUncheckedCreateNestedManyWithoutStoryInput = {
    create?: XOR<Enumerable<story_categories_relationsCreateWithoutStoryInput>, Enumerable<story_categories_relationsUncheckedCreateWithoutStoryInput>>
    connectOrCreate?: Enumerable<story_categories_relationsCreateOrConnectWithoutStoryInput>
    createMany?: story_categories_relationsCreateManyStoryInputEnvelope
    connect?: Enumerable<story_categories_relationsWhereUniqueInput>
  }

  export type story_dapps_relationsUncheckedCreateNestedManyWithoutStoryInput = {
    create?: XOR<Enumerable<story_dapps_relationsCreateWithoutStoryInput>, Enumerable<story_dapps_relationsUncheckedCreateWithoutStoryInput>>
    connectOrCreate?: Enumerable<story_dapps_relationsCreateOrConnectWithoutStoryInput>
    createMany?: story_dapps_relationsCreateManyStoryInputEnvelope
    connect?: Enumerable<story_dapps_relationsWhereUniqueInput>
  }

  export type story_categories_relationsUpdateManyWithoutStoryInput = {
    create?: XOR<Enumerable<story_categories_relationsCreateWithoutStoryInput>, Enumerable<story_categories_relationsUncheckedCreateWithoutStoryInput>>
    connectOrCreate?: Enumerable<story_categories_relationsCreateOrConnectWithoutStoryInput>
    upsert?: Enumerable<story_categories_relationsUpsertWithWhereUniqueWithoutStoryInput>
    createMany?: story_categories_relationsCreateManyStoryInputEnvelope
    set?: Enumerable<story_categories_relationsWhereUniqueInput>
    disconnect?: Enumerable<story_categories_relationsWhereUniqueInput>
    delete?: Enumerable<story_categories_relationsWhereUniqueInput>
    connect?: Enumerable<story_categories_relationsWhereUniqueInput>
    update?: Enumerable<story_categories_relationsUpdateWithWhereUniqueWithoutStoryInput>
    updateMany?: Enumerable<story_categories_relationsUpdateManyWithWhereWithoutStoryInput>
    deleteMany?: Enumerable<story_categories_relationsScalarWhereInput>
  }

  export type story_dapps_relationsUpdateManyWithoutStoryInput = {
    create?: XOR<Enumerable<story_dapps_relationsCreateWithoutStoryInput>, Enumerable<story_dapps_relationsUncheckedCreateWithoutStoryInput>>
    connectOrCreate?: Enumerable<story_dapps_relationsCreateOrConnectWithoutStoryInput>
    upsert?: Enumerable<story_dapps_relationsUpsertWithWhereUniqueWithoutStoryInput>
    createMany?: story_dapps_relationsCreateManyStoryInputEnvelope
    set?: Enumerable<story_dapps_relationsWhereUniqueInput>
    disconnect?: Enumerable<story_dapps_relationsWhereUniqueInput>
    delete?: Enumerable<story_dapps_relationsWhereUniqueInput>
    connect?: Enumerable<story_dapps_relationsWhereUniqueInput>
    update?: Enumerable<story_dapps_relationsUpdateWithWhereUniqueWithoutStoryInput>
    updateMany?: Enumerable<story_dapps_relationsUpdateManyWithWhereWithoutStoryInput>
    deleteMany?: Enumerable<story_dapps_relationsScalarWhereInput>
  }

  export type story_categories_relationsUncheckedUpdateManyWithoutStoryInput = {
    create?: XOR<Enumerable<story_categories_relationsCreateWithoutStoryInput>, Enumerable<story_categories_relationsUncheckedCreateWithoutStoryInput>>
    connectOrCreate?: Enumerable<story_categories_relationsCreateOrConnectWithoutStoryInput>
    upsert?: Enumerable<story_categories_relationsUpsertWithWhereUniqueWithoutStoryInput>
    createMany?: story_categories_relationsCreateManyStoryInputEnvelope
    set?: Enumerable<story_categories_relationsWhereUniqueInput>
    disconnect?: Enumerable<story_categories_relationsWhereUniqueInput>
    delete?: Enumerable<story_categories_relationsWhereUniqueInput>
    connect?: Enumerable<story_categories_relationsWhereUniqueInput>
    update?: Enumerable<story_categories_relationsUpdateWithWhereUniqueWithoutStoryInput>
    updateMany?: Enumerable<story_categories_relationsUpdateManyWithWhereWithoutStoryInput>
    deleteMany?: Enumerable<story_categories_relationsScalarWhereInput>
  }

  export type story_dapps_relationsUncheckedUpdateManyWithoutStoryInput = {
    create?: XOR<Enumerable<story_dapps_relationsCreateWithoutStoryInput>, Enumerable<story_dapps_relationsUncheckedCreateWithoutStoryInput>>
    connectOrCreate?: Enumerable<story_dapps_relationsCreateOrConnectWithoutStoryInput>
    upsert?: Enumerable<story_dapps_relationsUpsertWithWhereUniqueWithoutStoryInput>
    createMany?: story_dapps_relationsCreateManyStoryInputEnvelope
    set?: Enumerable<story_dapps_relationsWhereUniqueInput>
    disconnect?: Enumerable<story_dapps_relationsWhereUniqueInput>
    delete?: Enumerable<story_dapps_relationsWhereUniqueInput>
    connect?: Enumerable<story_dapps_relationsWhereUniqueInput>
    update?: Enumerable<story_dapps_relationsUpdateWithWhereUniqueWithoutStoryInput>
    updateMany?: Enumerable<story_dapps_relationsUpdateManyWithWhereWithoutStoryInput>
    deleteMany?: Enumerable<story_dapps_relationsScalarWhereInput>
  }

  export type story_categories_relationsCreateNestedManyWithoutStory_categoriesInput = {
    create?: XOR<Enumerable<story_categories_relationsCreateWithoutStory_categoriesInput>, Enumerable<story_categories_relationsUncheckedCreateWithoutStory_categoriesInput>>
    connectOrCreate?: Enumerable<story_categories_relationsCreateOrConnectWithoutStory_categoriesInput>
    createMany?: story_categories_relationsCreateManyStory_categoriesInputEnvelope
    connect?: Enumerable<story_categories_relationsWhereUniqueInput>
  }

  export type story_categories_relationsUncheckedCreateNestedManyWithoutStory_categoriesInput = {
    create?: XOR<Enumerable<story_categories_relationsCreateWithoutStory_categoriesInput>, Enumerable<story_categories_relationsUncheckedCreateWithoutStory_categoriesInput>>
    connectOrCreate?: Enumerable<story_categories_relationsCreateOrConnectWithoutStory_categoriesInput>
    createMany?: story_categories_relationsCreateManyStory_categoriesInputEnvelope
    connect?: Enumerable<story_categories_relationsWhereUniqueInput>
  }

  export type story_categories_relationsUpdateManyWithoutStory_categoriesInput = {
    create?: XOR<Enumerable<story_categories_relationsCreateWithoutStory_categoriesInput>, Enumerable<story_categories_relationsUncheckedCreateWithoutStory_categoriesInput>>
    connectOrCreate?: Enumerable<story_categories_relationsCreateOrConnectWithoutStory_categoriesInput>
    upsert?: Enumerable<story_categories_relationsUpsertWithWhereUniqueWithoutStory_categoriesInput>
    createMany?: story_categories_relationsCreateManyStory_categoriesInputEnvelope
    set?: Enumerable<story_categories_relationsWhereUniqueInput>
    disconnect?: Enumerable<story_categories_relationsWhereUniqueInput>
    delete?: Enumerable<story_categories_relationsWhereUniqueInput>
    connect?: Enumerable<story_categories_relationsWhereUniqueInput>
    update?: Enumerable<story_categories_relationsUpdateWithWhereUniqueWithoutStory_categoriesInput>
    updateMany?: Enumerable<story_categories_relationsUpdateManyWithWhereWithoutStory_categoriesInput>
    deleteMany?: Enumerable<story_categories_relationsScalarWhereInput>
  }

  export type story_categories_relationsUncheckedUpdateManyWithoutStory_categoriesInput = {
    create?: XOR<Enumerable<story_categories_relationsCreateWithoutStory_categoriesInput>, Enumerable<story_categories_relationsUncheckedCreateWithoutStory_categoriesInput>>
    connectOrCreate?: Enumerable<story_categories_relationsCreateOrConnectWithoutStory_categoriesInput>
    upsert?: Enumerable<story_categories_relationsUpsertWithWhereUniqueWithoutStory_categoriesInput>
    createMany?: story_categories_relationsCreateManyStory_categoriesInputEnvelope
    set?: Enumerable<story_categories_relationsWhereUniqueInput>
    disconnect?: Enumerable<story_categories_relationsWhereUniqueInput>
    delete?: Enumerable<story_categories_relationsWhereUniqueInput>
    connect?: Enumerable<story_categories_relationsWhereUniqueInput>
    update?: Enumerable<story_categories_relationsUpdateWithWhereUniqueWithoutStory_categoriesInput>
    updateMany?: Enumerable<story_categories_relationsUpdateManyWithWhereWithoutStory_categoriesInput>
    deleteMany?: Enumerable<story_categories_relationsScalarWhereInput>
  }

  export type story_categoriesCreateNestedOneWithoutStory_categories_relationsInput = {
    create?: XOR<story_categoriesCreateWithoutStory_categories_relationsInput, story_categoriesUncheckedCreateWithoutStory_categories_relationsInput>
    connectOrCreate?: story_categoriesCreateOrConnectWithoutStory_categories_relationsInput
    connect?: story_categoriesWhereUniqueInput
  }

  export type storiesCreateNestedOneWithoutStory_categories_relationsInput = {
    create?: XOR<storiesCreateWithoutStory_categories_relationsInput, storiesUncheckedCreateWithoutStory_categories_relationsInput>
    connectOrCreate?: storiesCreateOrConnectWithoutStory_categories_relationsInput
    connect?: storiesWhereUniqueInput
  }

  export type story_categoriesUpdateOneRequiredWithoutStory_categories_relationsInput = {
    create?: XOR<story_categoriesCreateWithoutStory_categories_relationsInput, story_categoriesUncheckedCreateWithoutStory_categories_relationsInput>
    connectOrCreate?: story_categoriesCreateOrConnectWithoutStory_categories_relationsInput
    upsert?: story_categoriesUpsertWithoutStory_categories_relationsInput
    connect?: story_categoriesWhereUniqueInput
    update?: XOR<story_categoriesUpdateWithoutStory_categories_relationsInput, story_categoriesUncheckedUpdateWithoutStory_categories_relationsInput>
  }

  export type storiesUpdateOneRequiredWithoutStory_categories_relationsInput = {
    create?: XOR<storiesCreateWithoutStory_categories_relationsInput, storiesUncheckedCreateWithoutStory_categories_relationsInput>
    connectOrCreate?: storiesCreateOrConnectWithoutStory_categories_relationsInput
    upsert?: storiesUpsertWithoutStory_categories_relationsInput
    connect?: storiesWhereUniqueInput
    update?: XOR<storiesUpdateWithoutStory_categories_relationsInput, storiesUncheckedUpdateWithoutStory_categories_relationsInput>
  }

  export type storiesCreateNestedOneWithoutStory_dapps_relationsInput = {
    create?: XOR<storiesCreateWithoutStory_dapps_relationsInput, storiesUncheckedCreateWithoutStory_dapps_relationsInput>
    connectOrCreate?: storiesCreateOrConnectWithoutStory_dapps_relationsInput
    connect?: storiesWhereUniqueInput
  }

  export type dappsCreateNestedOneWithoutStory_dapps_relationsInput = {
    create?: XOR<dappsCreateWithoutStory_dapps_relationsInput, dappsUncheckedCreateWithoutStory_dapps_relationsInput>
    connectOrCreate?: dappsCreateOrConnectWithoutStory_dapps_relationsInput
    connect?: dappsWhereUniqueInput
  }

  export type storiesUpdateOneRequiredWithoutStory_dapps_relationsInput = {
    create?: XOR<storiesCreateWithoutStory_dapps_relationsInput, storiesUncheckedCreateWithoutStory_dapps_relationsInput>
    connectOrCreate?: storiesCreateOrConnectWithoutStory_dapps_relationsInput
    upsert?: storiesUpsertWithoutStory_dapps_relationsInput
    connect?: storiesWhereUniqueInput
    update?: XOR<storiesUpdateWithoutStory_dapps_relationsInput, storiesUncheckedUpdateWithoutStory_dapps_relationsInput>
  }

  export type dappsUpdateOneRequiredWithoutStory_dapps_relationsInput = {
    create?: XOR<dappsCreateWithoutStory_dapps_relationsInput, dappsUncheckedCreateWithoutStory_dapps_relationsInput>
    connectOrCreate?: dappsCreateOrConnectWithoutStory_dapps_relationsInput
    upsert?: dappsUpsertWithoutStory_dapps_relationsInput
    connect?: dappsWhereUniqueInput
    update?: XOR<dappsUpdateWithoutStory_dapps_relationsInput, dappsUncheckedUpdateWithoutStory_dapps_relationsInput>
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    search?: string
    not?: NestedStringFilter | string
  }

  export type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    search?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type NestedEnumUserStatusFilter = {
    equals?: UserStatus
    in?: Enumerable<UserStatus>
    notIn?: Enumerable<UserStatus>
    not?: NestedEnumUserStatusFilter | UserStatus
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedDateTimeNullableFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableFilter | Date | string | null
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    search?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    search?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type NestedEnumUserStatusWithAggregatesFilter = {
    equals?: UserStatus
    in?: Enumerable<UserStatus>
    notIn?: Enumerable<UserStatus>
    not?: NestedEnumUserStatusWithAggregatesFilter | UserStatus
    _count?: NestedIntFilter
    _min?: NestedEnumUserStatusFilter
    _max?: NestedEnumUserStatusFilter
  }
  export type NestedJsonNullableFilter = 
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase>, Exclude<keyof Required<NestedJsonNullableFilterBase>, 'path'>>,
        Required<NestedJsonNullableFilterBase>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase>, 'path'>>

  export type NestedJsonNullableFilterBase = {
    equals?: JsonNullValueFilter | InputJsonValue
    not?: JsonNullValueFilter | InputJsonValue
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type NestedDateTimeNullableWithAggregatesFilter = {
    equals?: Date | string | null
    in?: Enumerable<Date> | Enumerable<string> | null
    notIn?: Enumerable<Date> | Enumerable<string> | null
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeNullableWithAggregatesFilter | Date | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedDateTimeNullableFilter
    _max?: NestedDateTimeNullableFilter
  }

  export type NestedIntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type NestedIntNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedIntNullableFilter
    _min?: NestedIntNullableFilter
    _max?: NestedIntNullableFilter
  }

  export type NestedFloatNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableFilter | number | null
  }

  export type NestedBoolNullableFilter = {
    equals?: boolean | null
    not?: NestedBoolNullableFilter | boolean | null
  }

  export type NestedBoolNullableWithAggregatesFilter = {
    equals?: boolean | null
    not?: NestedBoolNullableWithAggregatesFilter | boolean | null
    _count?: NestedIntNullableFilter
    _min?: NestedBoolNullableFilter
    _max?: NestedBoolNullableFilter
  }

  export type NestedBoolFilter = {
    equals?: boolean
    not?: NestedBoolFilter | boolean
  }

  export type NestedBoolWithAggregatesFilter = {
    equals?: boolean
    not?: NestedBoolWithAggregatesFilter | boolean
    _count?: NestedIntFilter
    _min?: NestedBoolFilter
    _max?: NestedBoolFilter
  }

  export type NestedFloatNullableWithAggregatesFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatNullableWithAggregatesFilter | number | null
    _count?: NestedIntNullableFilter
    _avg?: NestedFloatNullableFilter
    _sum?: NestedFloatNullableFilter
    _min?: NestedFloatNullableFilter
    _max?: NestedFloatNullableFilter
  }

  export type user_dappsCreateWithoutUserInput = {
    id?: string
    dapp: dappsCreateNestedOneWithoutUser_dappsInput
    created_at?: Date | string
    updated_at?: Date | string | null
    user_dapps_catogories?: user_dapps_catogoriesCreateNestedOneWithoutUser_dappsInput
  }

  export type user_dappsUncheckedCreateWithoutUserInput = {
    id?: string
    dapp_id: string
    created_at?: Date | string
    updated_at?: Date | string | null
    user_dapps_catogories_id?: string | null
  }

  export type user_dappsCreateOrConnectWithoutUserInput = {
    where: user_dappsWhereUniqueInput
    create: XOR<user_dappsCreateWithoutUserInput, user_dappsUncheckedCreateWithoutUserInput>
  }

  export type user_dappsCreateManyUserInputEnvelope = {
    data: Enumerable<user_dappsCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type user_dapps_catogoriesCreateWithoutUserInput = {
    id?: string
    title: string
    desc?: string | null
    sort?: number
    created_at?: Date | string
    updated_at?: Date | string | null
    user_dapps?: user_dappsCreateNestedManyWithoutUser_dapps_catogoriesInput
  }

  export type user_dapps_catogoriesUncheckedCreateWithoutUserInput = {
    id?: string
    title: string
    desc?: string | null
    sort?: number
    created_at?: Date | string
    updated_at?: Date | string | null
    user_dapps?: user_dappsUncheckedCreateNestedManyWithoutUser_dapps_catogoriesInput
  }

  export type user_dapps_catogoriesCreateOrConnectWithoutUserInput = {
    where: user_dapps_catogoriesWhereUniqueInput
    create: XOR<user_dapps_catogoriesCreateWithoutUserInput, user_dapps_catogoriesUncheckedCreateWithoutUserInput>
  }

  export type user_dapps_catogoriesCreateManyUserInputEnvelope = {
    data: Enumerable<user_dapps_catogoriesCreateManyUserInput>
    skipDuplicates?: boolean
  }

  export type user_dappsUpsertWithWhereUniqueWithoutUserInput = {
    where: user_dappsWhereUniqueInput
    update: XOR<user_dappsUpdateWithoutUserInput, user_dappsUncheckedUpdateWithoutUserInput>
    create: XOR<user_dappsCreateWithoutUserInput, user_dappsUncheckedCreateWithoutUserInput>
  }

  export type user_dappsUpdateWithWhereUniqueWithoutUserInput = {
    where: user_dappsWhereUniqueInput
    data: XOR<user_dappsUpdateWithoutUserInput, user_dappsUncheckedUpdateWithoutUserInput>
  }

  export type user_dappsUpdateManyWithWhereWithoutUserInput = {
    where: user_dappsScalarWhereInput
    data: XOR<user_dappsUpdateManyMutationInput, user_dappsUncheckedUpdateManyWithoutUser_dappsInput>
  }

  export type user_dappsScalarWhereInput = {
    AND?: Enumerable<user_dappsScalarWhereInput>
    OR?: Enumerable<user_dappsScalarWhereInput>
    NOT?: Enumerable<user_dappsScalarWhereInput>
    id?: StringFilter | string
    user_id?: StringFilter | string
    dapp_id?: StringFilter | string
    created_at?: DateTimeFilter | Date | string
    updated_at?: DateTimeNullableFilter | Date | string | null
    user_dapps_catogories_id?: StringNullableFilter | string | null
  }

  export type user_dapps_catogoriesUpsertWithWhereUniqueWithoutUserInput = {
    where: user_dapps_catogoriesWhereUniqueInput
    update: XOR<user_dapps_catogoriesUpdateWithoutUserInput, user_dapps_catogoriesUncheckedUpdateWithoutUserInput>
    create: XOR<user_dapps_catogoriesCreateWithoutUserInput, user_dapps_catogoriesUncheckedCreateWithoutUserInput>
  }

  export type user_dapps_catogoriesUpdateWithWhereUniqueWithoutUserInput = {
    where: user_dapps_catogoriesWhereUniqueInput
    data: XOR<user_dapps_catogoriesUpdateWithoutUserInput, user_dapps_catogoriesUncheckedUpdateWithoutUserInput>
  }

  export type user_dapps_catogoriesUpdateManyWithWhereWithoutUserInput = {
    where: user_dapps_catogoriesScalarWhereInput
    data: XOR<user_dapps_catogoriesUpdateManyMutationInput, user_dapps_catogoriesUncheckedUpdateManyWithoutUser_dapps_catogoriesInput>
  }

  export type user_dapps_catogoriesScalarWhereInput = {
    AND?: Enumerable<user_dapps_catogoriesScalarWhereInput>
    OR?: Enumerable<user_dapps_catogoriesScalarWhereInput>
    NOT?: Enumerable<user_dapps_catogoriesScalarWhereInput>
    id?: StringFilter | string
    title?: StringFilter | string
    desc?: StringNullableFilter | string | null
    sort?: IntFilter | number
    created_at?: DateTimeFilter | Date | string
    updated_at?: DateTimeNullableFilter | Date | string | null
    user_id?: StringFilter | string
  }

  export type dapp_categories_relationsCreateWithoutDappInput = {
    dapp_categories: dapp_categoriesCreateNestedOneWithoutDapp_categories_relationsInput
    subcategory_id?: string | null
    created_at?: Date | string
    updated_at?: Date | string | null
  }

  export type dapp_categories_relationsUncheckedCreateWithoutDappInput = {
    id?: number
    website_category_id: string
    subcategory_id?: string | null
    created_at?: Date | string
    updated_at?: Date | string | null
  }

  export type dapp_categories_relationsCreateOrConnectWithoutDappInput = {
    where: dapp_categories_relationsWhereUniqueInput
    create: XOR<dapp_categories_relationsCreateWithoutDappInput, dapp_categories_relationsUncheckedCreateWithoutDappInput>
  }

  export type dapp_categories_relationsCreateManyDappInputEnvelope = {
    data: Enumerable<dapp_categories_relationsCreateManyDappInput>
    skipDuplicates?: boolean
  }

  export type story_dapps_relationsCreateWithoutDappInput = {
    story: storiesCreateNestedOneWithoutStory_dapps_relationsInput
    created_at?: Date | string
    updated_at?: Date | string | null
  }

  export type story_dapps_relationsUncheckedCreateWithoutDappInput = {
    id?: number
    story_id: string
    created_at?: Date | string
    updated_at?: Date | string | null
  }

  export type story_dapps_relationsCreateOrConnectWithoutDappInput = {
    where: story_dapps_relationsWhereUniqueInput
    create: XOR<story_dapps_relationsCreateWithoutDappInput, story_dapps_relationsUncheckedCreateWithoutDappInput>
  }

  export type story_dapps_relationsCreateManyDappInputEnvelope = {
    data: Enumerable<story_dapps_relationsCreateManyDappInput>
    skipDuplicates?: boolean
  }

  export type user_dappsCreateWithoutDappInput = {
    id?: string
    user: usersCreateNestedOneWithoutUser_dappsInput
    created_at?: Date | string
    updated_at?: Date | string | null
    user_dapps_catogories?: user_dapps_catogoriesCreateNestedOneWithoutUser_dappsInput
  }

  export type user_dappsUncheckedCreateWithoutDappInput = {
    id?: string
    user_id: string
    created_at?: Date | string
    updated_at?: Date | string | null
    user_dapps_catogories_id?: string | null
  }

  export type user_dappsCreateOrConnectWithoutDappInput = {
    where: user_dappsWhereUniqueInput
    create: XOR<user_dappsCreateWithoutDappInput, user_dappsUncheckedCreateWithoutDappInput>
  }

  export type user_dappsCreateManyDappInputEnvelope = {
    data: Enumerable<user_dappsCreateManyDappInput>
    skipDuplicates?: boolean
  }

  export type dapp_categories_relationsUpsertWithWhereUniqueWithoutDappInput = {
    where: dapp_categories_relationsWhereUniqueInput
    update: XOR<dapp_categories_relationsUpdateWithoutDappInput, dapp_categories_relationsUncheckedUpdateWithoutDappInput>
    create: XOR<dapp_categories_relationsCreateWithoutDappInput, dapp_categories_relationsUncheckedCreateWithoutDappInput>
  }

  export type dapp_categories_relationsUpdateWithWhereUniqueWithoutDappInput = {
    where: dapp_categories_relationsWhereUniqueInput
    data: XOR<dapp_categories_relationsUpdateWithoutDappInput, dapp_categories_relationsUncheckedUpdateWithoutDappInput>
  }

  export type dapp_categories_relationsUpdateManyWithWhereWithoutDappInput = {
    where: dapp_categories_relationsScalarWhereInput
    data: XOR<dapp_categories_relationsUpdateManyMutationInput, dapp_categories_relationsUncheckedUpdateManyWithoutDapp_categories_relationsInput>
  }

  export type dapp_categories_relationsScalarWhereInput = {
    AND?: Enumerable<dapp_categories_relationsScalarWhereInput>
    OR?: Enumerable<dapp_categories_relationsScalarWhereInput>
    NOT?: Enumerable<dapp_categories_relationsScalarWhereInput>
    id?: IntFilter | number
    website_category_id?: StringFilter | string
    subcategory_id?: StringNullableFilter | string | null
    dapp_id?: StringFilter | string
    created_at?: DateTimeFilter | Date | string
    updated_at?: DateTimeNullableFilter | Date | string | null
  }

  export type story_dapps_relationsUpsertWithWhereUniqueWithoutDappInput = {
    where: story_dapps_relationsWhereUniqueInput
    update: XOR<story_dapps_relationsUpdateWithoutDappInput, story_dapps_relationsUncheckedUpdateWithoutDappInput>
    create: XOR<story_dapps_relationsCreateWithoutDappInput, story_dapps_relationsUncheckedCreateWithoutDappInput>
  }

  export type story_dapps_relationsUpdateWithWhereUniqueWithoutDappInput = {
    where: story_dapps_relationsWhereUniqueInput
    data: XOR<story_dapps_relationsUpdateWithoutDappInput, story_dapps_relationsUncheckedUpdateWithoutDappInput>
  }

  export type story_dapps_relationsUpdateManyWithWhereWithoutDappInput = {
    where: story_dapps_relationsScalarWhereInput
    data: XOR<story_dapps_relationsUpdateManyMutationInput, story_dapps_relationsUncheckedUpdateManyWithoutStory_dapps_relationsInput>
  }

  export type story_dapps_relationsScalarWhereInput = {
    AND?: Enumerable<story_dapps_relationsScalarWhereInput>
    OR?: Enumerable<story_dapps_relationsScalarWhereInput>
    NOT?: Enumerable<story_dapps_relationsScalarWhereInput>
    id?: IntFilter | number
    story_id?: StringFilter | string
    dapp_id?: StringFilter | string
    created_at?: DateTimeFilter | Date | string
    updated_at?: DateTimeNullableFilter | Date | string | null
  }

  export type user_dappsUpsertWithWhereUniqueWithoutDappInput = {
    where: user_dappsWhereUniqueInput
    update: XOR<user_dappsUpdateWithoutDappInput, user_dappsUncheckedUpdateWithoutDappInput>
    create: XOR<user_dappsCreateWithoutDappInput, user_dappsUncheckedCreateWithoutDappInput>
  }

  export type user_dappsUpdateWithWhereUniqueWithoutDappInput = {
    where: user_dappsWhereUniqueInput
    data: XOR<user_dappsUpdateWithoutDappInput, user_dappsUncheckedUpdateWithoutDappInput>
  }

  export type user_dappsUpdateManyWithWhereWithoutDappInput = {
    where: user_dappsScalarWhereInput
    data: XOR<user_dappsUpdateManyMutationInput, user_dappsUncheckedUpdateManyWithoutUser_dappsInput>
  }

  export type dapp_categories_relationsCreateWithoutDapp_categoriesInput = {
    subcategory_id?: string | null
    dapp: dappsCreateNestedOneWithoutDapp_categories_relationsInput
    created_at?: Date | string
    updated_at?: Date | string | null
  }

  export type dapp_categories_relationsUncheckedCreateWithoutDapp_categoriesInput = {
    id?: number
    subcategory_id?: string | null
    dapp_id: string
    created_at?: Date | string
    updated_at?: Date | string | null
  }

  export type dapp_categories_relationsCreateOrConnectWithoutDapp_categoriesInput = {
    where: dapp_categories_relationsWhereUniqueInput
    create: XOR<dapp_categories_relationsCreateWithoutDapp_categoriesInput, dapp_categories_relationsUncheckedCreateWithoutDapp_categoriesInput>
  }

  export type dapp_categories_relationsCreateManyDapp_categoriesInputEnvelope = {
    data: Enumerable<dapp_categories_relationsCreateManyDapp_categoriesInput>
    skipDuplicates?: boolean
  }

  export type dapp_categories_relationsUpsertWithWhereUniqueWithoutDapp_categoriesInput = {
    where: dapp_categories_relationsWhereUniqueInput
    update: XOR<dapp_categories_relationsUpdateWithoutDapp_categoriesInput, dapp_categories_relationsUncheckedUpdateWithoutDapp_categoriesInput>
    create: XOR<dapp_categories_relationsCreateWithoutDapp_categoriesInput, dapp_categories_relationsUncheckedCreateWithoutDapp_categoriesInput>
  }

  export type dapp_categories_relationsUpdateWithWhereUniqueWithoutDapp_categoriesInput = {
    where: dapp_categories_relationsWhereUniqueInput
    data: XOR<dapp_categories_relationsUpdateWithoutDapp_categoriesInput, dapp_categories_relationsUncheckedUpdateWithoutDapp_categoriesInput>
  }

  export type dapp_categories_relationsUpdateManyWithWhereWithoutDapp_categoriesInput = {
    where: dapp_categories_relationsScalarWhereInput
    data: XOR<dapp_categories_relationsUpdateManyMutationInput, dapp_categories_relationsUncheckedUpdateManyWithoutDapp_categories_relationsInput>
  }

  export type dapp_categoriesCreateWithoutDapp_categories_relationsInput = {
    id?: string
    title: string
    desc?: string | null
    sort?: number
    is_deleted?: boolean
  }

  export type dapp_categoriesUncheckedCreateWithoutDapp_categories_relationsInput = {
    id?: string
    title: string
    desc?: string | null
    sort?: number
    is_deleted?: boolean
  }

  export type dapp_categoriesCreateOrConnectWithoutDapp_categories_relationsInput = {
    where: dapp_categoriesWhereUniqueInput
    create: XOR<dapp_categoriesCreateWithoutDapp_categories_relationsInput, dapp_categoriesUncheckedCreateWithoutDapp_categories_relationsInput>
  }

  export type dappsCreateWithoutDapp_categories_relationsInput = {
    id?: string
    title: string
    url: string
    logo?: string | null
    desc?: string | null
    created_at?: Date | string
    updated_at?: Date | string | null
    visit_count?: number
    install_count?: number
    visible?: boolean
    is_good?: boolean
    add_by_admin?: boolean
    story_dapps_relations?: story_dapps_relationsCreateNestedManyWithoutDappInput
    user_dapps?: user_dappsCreateNestedManyWithoutDappInput
  }

  export type dappsUncheckedCreateWithoutDapp_categories_relationsInput = {
    id?: string
    title: string
    url: string
    logo?: string | null
    desc?: string | null
    created_at?: Date | string
    updated_at?: Date | string | null
    visit_count?: number
    install_count?: number
    visible?: boolean
    is_good?: boolean
    add_by_admin?: boolean
    story_dapps_relations?: story_dapps_relationsUncheckedCreateNestedManyWithoutDappInput
    user_dapps?: user_dappsUncheckedCreateNestedManyWithoutDappInput
  }

  export type dappsCreateOrConnectWithoutDapp_categories_relationsInput = {
    where: dappsWhereUniqueInput
    create: XOR<dappsCreateWithoutDapp_categories_relationsInput, dappsUncheckedCreateWithoutDapp_categories_relationsInput>
  }

  export type dapp_categoriesUpsertWithoutDapp_categories_relationsInput = {
    update: XOR<dapp_categoriesUpdateWithoutDapp_categories_relationsInput, dapp_categoriesUncheckedUpdateWithoutDapp_categories_relationsInput>
    create: XOR<dapp_categoriesCreateWithoutDapp_categories_relationsInput, dapp_categoriesUncheckedCreateWithoutDapp_categories_relationsInput>
  }

  export type dapp_categoriesUpdateWithoutDapp_categories_relationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    sort?: IntFieldUpdateOperationsInput | number
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type dapp_categoriesUncheckedUpdateWithoutDapp_categories_relationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    sort?: IntFieldUpdateOperationsInput | number
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
  }

  export type dappsUpsertWithoutDapp_categories_relationsInput = {
    update: XOR<dappsUpdateWithoutDapp_categories_relationsInput, dappsUncheckedUpdateWithoutDapp_categories_relationsInput>
    create: XOR<dappsCreateWithoutDapp_categories_relationsInput, dappsUncheckedCreateWithoutDapp_categories_relationsInput>
  }

  export type dappsUpdateWithoutDapp_categories_relationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    visit_count?: IntFieldUpdateOperationsInput | number
    install_count?: IntFieldUpdateOperationsInput | number
    visible?: BoolFieldUpdateOperationsInput | boolean
    is_good?: BoolFieldUpdateOperationsInput | boolean
    add_by_admin?: BoolFieldUpdateOperationsInput | boolean
    story_dapps_relations?: story_dapps_relationsUpdateManyWithoutDappInput
    user_dapps?: user_dappsUpdateManyWithoutDappInput
  }

  export type dappsUncheckedUpdateWithoutDapp_categories_relationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    visit_count?: IntFieldUpdateOperationsInput | number
    install_count?: IntFieldUpdateOperationsInput | number
    visible?: BoolFieldUpdateOperationsInput | boolean
    is_good?: BoolFieldUpdateOperationsInput | boolean
    add_by_admin?: BoolFieldUpdateOperationsInput | boolean
    story_dapps_relations?: story_dapps_relationsUncheckedUpdateManyWithoutDappInput
    user_dapps?: user_dappsUncheckedUpdateManyWithoutDappInput
  }

  export type dappsCreateWithoutUser_dappsInput = {
    id?: string
    title: string
    url: string
    logo?: string | null
    desc?: string | null
    created_at?: Date | string
    updated_at?: Date | string | null
    visit_count?: number
    install_count?: number
    visible?: boolean
    is_good?: boolean
    add_by_admin?: boolean
    dapp_categories_relations?: dapp_categories_relationsCreateNestedManyWithoutDappInput
    story_dapps_relations?: story_dapps_relationsCreateNestedManyWithoutDappInput
  }

  export type dappsUncheckedCreateWithoutUser_dappsInput = {
    id?: string
    title: string
    url: string
    logo?: string | null
    desc?: string | null
    created_at?: Date | string
    updated_at?: Date | string | null
    visit_count?: number
    install_count?: number
    visible?: boolean
    is_good?: boolean
    add_by_admin?: boolean
    dapp_categories_relations?: dapp_categories_relationsUncheckedCreateNestedManyWithoutDappInput
    story_dapps_relations?: story_dapps_relationsUncheckedCreateNestedManyWithoutDappInput
  }

  export type dappsCreateOrConnectWithoutUser_dappsInput = {
    where: dappsWhereUniqueInput
    create: XOR<dappsCreateWithoutUser_dappsInput, dappsUncheckedCreateWithoutUser_dappsInput>
  }

  export type usersCreateWithoutUser_dappsInput = {
    id?: string
    address?: string | null
    name?: string | null
    nonce?: string | null
    status?: UserStatus
    role?: usersCreateroleInput | Enumerable<Role>
    settings?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string | null
    deleted_at?: Date | string | null
    user_dapps_catogories?: user_dapps_catogoriesCreateNestedManyWithoutUserInput
  }

  export type usersUncheckedCreateWithoutUser_dappsInput = {
    id?: string
    address?: string | null
    name?: string | null
    nonce?: string | null
    status?: UserStatus
    role?: usersCreateroleInput | Enumerable<Role>
    settings?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string | null
    deleted_at?: Date | string | null
    user_dapps_catogories?: user_dapps_catogoriesUncheckedCreateNestedManyWithoutUserInput
  }

  export type usersCreateOrConnectWithoutUser_dappsInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutUser_dappsInput, usersUncheckedCreateWithoutUser_dappsInput>
  }

  export type user_dapps_catogoriesCreateWithoutUser_dappsInput = {
    id?: string
    title: string
    desc?: string | null
    sort?: number
    created_at?: Date | string
    updated_at?: Date | string | null
    user: usersCreateNestedOneWithoutUser_dapps_catogoriesInput
  }

  export type user_dapps_catogoriesUncheckedCreateWithoutUser_dappsInput = {
    id?: string
    title: string
    desc?: string | null
    sort?: number
    created_at?: Date | string
    updated_at?: Date | string | null
    user_id: string
  }

  export type user_dapps_catogoriesCreateOrConnectWithoutUser_dappsInput = {
    where: user_dapps_catogoriesWhereUniqueInput
    create: XOR<user_dapps_catogoriesCreateWithoutUser_dappsInput, user_dapps_catogoriesUncheckedCreateWithoutUser_dappsInput>
  }

  export type dappsUpsertWithoutUser_dappsInput = {
    update: XOR<dappsUpdateWithoutUser_dappsInput, dappsUncheckedUpdateWithoutUser_dappsInput>
    create: XOR<dappsCreateWithoutUser_dappsInput, dappsUncheckedCreateWithoutUser_dappsInput>
  }

  export type dappsUpdateWithoutUser_dappsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    visit_count?: IntFieldUpdateOperationsInput | number
    install_count?: IntFieldUpdateOperationsInput | number
    visible?: BoolFieldUpdateOperationsInput | boolean
    is_good?: BoolFieldUpdateOperationsInput | boolean
    add_by_admin?: BoolFieldUpdateOperationsInput | boolean
    dapp_categories_relations?: dapp_categories_relationsUpdateManyWithoutDappInput
    story_dapps_relations?: story_dapps_relationsUpdateManyWithoutDappInput
  }

  export type dappsUncheckedUpdateWithoutUser_dappsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    visit_count?: IntFieldUpdateOperationsInput | number
    install_count?: IntFieldUpdateOperationsInput | number
    visible?: BoolFieldUpdateOperationsInput | boolean
    is_good?: BoolFieldUpdateOperationsInput | boolean
    add_by_admin?: BoolFieldUpdateOperationsInput | boolean
    dapp_categories_relations?: dapp_categories_relationsUncheckedUpdateManyWithoutDappInput
    story_dapps_relations?: story_dapps_relationsUncheckedUpdateManyWithoutDappInput
  }

  export type usersUpsertWithoutUser_dappsInput = {
    update: XOR<usersUpdateWithoutUser_dappsInput, usersUncheckedUpdateWithoutUser_dappsInput>
    create: XOR<usersCreateWithoutUser_dappsInput, usersUncheckedCreateWithoutUser_dappsInput>
  }

  export type usersUpdateWithoutUser_dappsInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    nonce?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | UserStatus
    role?: usersUpdateroleInput | Enumerable<Role>
    settings?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user_dapps_catogories?: user_dapps_catogoriesUpdateManyWithoutUserInput
  }

  export type usersUncheckedUpdateWithoutUser_dappsInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    nonce?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | UserStatus
    role?: usersUpdateroleInput | Enumerable<Role>
    settings?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user_dapps_catogories?: user_dapps_catogoriesUncheckedUpdateManyWithoutUserInput
  }

  export type user_dapps_catogoriesUpsertWithoutUser_dappsInput = {
    update: XOR<user_dapps_catogoriesUpdateWithoutUser_dappsInput, user_dapps_catogoriesUncheckedUpdateWithoutUser_dappsInput>
    create: XOR<user_dapps_catogoriesCreateWithoutUser_dappsInput, user_dapps_catogoriesUncheckedCreateWithoutUser_dappsInput>
  }

  export type user_dapps_catogoriesUpdateWithoutUser_dappsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    sort?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: usersUpdateOneRequiredWithoutUser_dapps_catogoriesInput
  }

  export type user_dapps_catogoriesUncheckedUpdateWithoutUser_dappsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    sort?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user_id?: StringFieldUpdateOperationsInput | string
  }

  export type usersCreateWithoutUser_dapps_catogoriesInput = {
    id?: string
    address?: string | null
    name?: string | null
    nonce?: string | null
    status?: UserStatus
    role?: usersCreateroleInput | Enumerable<Role>
    settings?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string | null
    deleted_at?: Date | string | null
    user_dapps?: user_dappsCreateNestedManyWithoutUserInput
  }

  export type usersUncheckedCreateWithoutUser_dapps_catogoriesInput = {
    id?: string
    address?: string | null
    name?: string | null
    nonce?: string | null
    status?: UserStatus
    role?: usersCreateroleInput | Enumerable<Role>
    settings?: NullableJsonNullValueInput | InputJsonValue
    created_at?: Date | string
    updated_at?: Date | string | null
    deleted_at?: Date | string | null
    user_dapps?: user_dappsUncheckedCreateNestedManyWithoutUserInput
  }

  export type usersCreateOrConnectWithoutUser_dapps_catogoriesInput = {
    where: usersWhereUniqueInput
    create: XOR<usersCreateWithoutUser_dapps_catogoriesInput, usersUncheckedCreateWithoutUser_dapps_catogoriesInput>
  }

  export type user_dappsCreateWithoutUser_dapps_catogoriesInput = {
    id?: string
    dapp: dappsCreateNestedOneWithoutUser_dappsInput
    user: usersCreateNestedOneWithoutUser_dappsInput
    created_at?: Date | string
    updated_at?: Date | string | null
  }

  export type user_dappsUncheckedCreateWithoutUser_dapps_catogoriesInput = {
    id?: string
    user_id: string
    dapp_id: string
    created_at?: Date | string
    updated_at?: Date | string | null
  }

  export type user_dappsCreateOrConnectWithoutUser_dapps_catogoriesInput = {
    where: user_dappsWhereUniqueInput
    create: XOR<user_dappsCreateWithoutUser_dapps_catogoriesInput, user_dappsUncheckedCreateWithoutUser_dapps_catogoriesInput>
  }

  export type user_dappsCreateManyUser_dapps_catogoriesInputEnvelope = {
    data: Enumerable<user_dappsCreateManyUser_dapps_catogoriesInput>
    skipDuplicates?: boolean
  }

  export type usersUpsertWithoutUser_dapps_catogoriesInput = {
    update: XOR<usersUpdateWithoutUser_dapps_catogoriesInput, usersUncheckedUpdateWithoutUser_dapps_catogoriesInput>
    create: XOR<usersCreateWithoutUser_dapps_catogoriesInput, usersUncheckedCreateWithoutUser_dapps_catogoriesInput>
  }

  export type usersUpdateWithoutUser_dapps_catogoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    nonce?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | UserStatus
    role?: usersUpdateroleInput | Enumerable<Role>
    settings?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user_dapps?: user_dappsUpdateManyWithoutUserInput
  }

  export type usersUncheckedUpdateWithoutUser_dapps_catogoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    nonce?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumUserStatusFieldUpdateOperationsInput | UserStatus
    role?: usersUpdateroleInput | Enumerable<Role>
    settings?: NullableJsonNullValueInput | InputJsonValue
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    deleted_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user_dapps?: user_dappsUncheckedUpdateManyWithoutUserInput
  }

  export type user_dappsUpsertWithWhereUniqueWithoutUser_dapps_catogoriesInput = {
    where: user_dappsWhereUniqueInput
    update: XOR<user_dappsUpdateWithoutUser_dapps_catogoriesInput, user_dappsUncheckedUpdateWithoutUser_dapps_catogoriesInput>
    create: XOR<user_dappsCreateWithoutUser_dapps_catogoriesInput, user_dappsUncheckedCreateWithoutUser_dapps_catogoriesInput>
  }

  export type user_dappsUpdateWithWhereUniqueWithoutUser_dapps_catogoriesInput = {
    where: user_dappsWhereUniqueInput
    data: XOR<user_dappsUpdateWithoutUser_dapps_catogoriesInput, user_dappsUncheckedUpdateWithoutUser_dapps_catogoriesInput>
  }

  export type user_dappsUpdateManyWithWhereWithoutUser_dapps_catogoriesInput = {
    where: user_dappsScalarWhereInput
    data: XOR<user_dappsUpdateManyMutationInput, user_dappsUncheckedUpdateManyWithoutUser_dappsInput>
  }

  export type story_categories_relationsCreateWithoutStoryInput = {
    story_categories: story_categoriesCreateNestedOneWithoutStory_categories_relationsInput
    created_at?: Date | string
    updated_at?: Date | string | null
  }

  export type story_categories_relationsUncheckedCreateWithoutStoryInput = {
    id?: number
    story_category_id: string
    created_at?: Date | string
    updated_at?: Date | string | null
  }

  export type story_categories_relationsCreateOrConnectWithoutStoryInput = {
    where: story_categories_relationsWhereUniqueInput
    create: XOR<story_categories_relationsCreateWithoutStoryInput, story_categories_relationsUncheckedCreateWithoutStoryInput>
  }

  export type story_categories_relationsCreateManyStoryInputEnvelope = {
    data: Enumerable<story_categories_relationsCreateManyStoryInput>
    skipDuplicates?: boolean
  }

  export type story_dapps_relationsCreateWithoutStoryInput = {
    dapp: dappsCreateNestedOneWithoutStory_dapps_relationsInput
    created_at?: Date | string
    updated_at?: Date | string | null
  }

  export type story_dapps_relationsUncheckedCreateWithoutStoryInput = {
    id?: number
    dapp_id: string
    created_at?: Date | string
    updated_at?: Date | string | null
  }

  export type story_dapps_relationsCreateOrConnectWithoutStoryInput = {
    where: story_dapps_relationsWhereUniqueInput
    create: XOR<story_dapps_relationsCreateWithoutStoryInput, story_dapps_relationsUncheckedCreateWithoutStoryInput>
  }

  export type story_dapps_relationsCreateManyStoryInputEnvelope = {
    data: Enumerable<story_dapps_relationsCreateManyStoryInput>
    skipDuplicates?: boolean
  }

  export type story_categories_relationsUpsertWithWhereUniqueWithoutStoryInput = {
    where: story_categories_relationsWhereUniqueInput
    update: XOR<story_categories_relationsUpdateWithoutStoryInput, story_categories_relationsUncheckedUpdateWithoutStoryInput>
    create: XOR<story_categories_relationsCreateWithoutStoryInput, story_categories_relationsUncheckedCreateWithoutStoryInput>
  }

  export type story_categories_relationsUpdateWithWhereUniqueWithoutStoryInput = {
    where: story_categories_relationsWhereUniqueInput
    data: XOR<story_categories_relationsUpdateWithoutStoryInput, story_categories_relationsUncheckedUpdateWithoutStoryInput>
  }

  export type story_categories_relationsUpdateManyWithWhereWithoutStoryInput = {
    where: story_categories_relationsScalarWhereInput
    data: XOR<story_categories_relationsUpdateManyMutationInput, story_categories_relationsUncheckedUpdateManyWithoutStory_categories_relationsInput>
  }

  export type story_categories_relationsScalarWhereInput = {
    AND?: Enumerable<story_categories_relationsScalarWhereInput>
    OR?: Enumerable<story_categories_relationsScalarWhereInput>
    NOT?: Enumerable<story_categories_relationsScalarWhereInput>
    id?: IntFilter | number
    story_category_id?: StringFilter | string
    story_id?: StringFilter | string
    created_at?: DateTimeFilter | Date | string
    updated_at?: DateTimeNullableFilter | Date | string | null
  }

  export type story_dapps_relationsUpsertWithWhereUniqueWithoutStoryInput = {
    where: story_dapps_relationsWhereUniqueInput
    update: XOR<story_dapps_relationsUpdateWithoutStoryInput, story_dapps_relationsUncheckedUpdateWithoutStoryInput>
    create: XOR<story_dapps_relationsCreateWithoutStoryInput, story_dapps_relationsUncheckedCreateWithoutStoryInput>
  }

  export type story_dapps_relationsUpdateWithWhereUniqueWithoutStoryInput = {
    where: story_dapps_relationsWhereUniqueInput
    data: XOR<story_dapps_relationsUpdateWithoutStoryInput, story_dapps_relationsUncheckedUpdateWithoutStoryInput>
  }

  export type story_dapps_relationsUpdateManyWithWhereWithoutStoryInput = {
    where: story_dapps_relationsScalarWhereInput
    data: XOR<story_dapps_relationsUpdateManyMutationInput, story_dapps_relationsUncheckedUpdateManyWithoutStory_dapps_relationsInput>
  }

  export type story_categories_relationsCreateWithoutStory_categoriesInput = {
    story: storiesCreateNestedOneWithoutStory_categories_relationsInput
    created_at?: Date | string
    updated_at?: Date | string | null
  }

  export type story_categories_relationsUncheckedCreateWithoutStory_categoriesInput = {
    id?: number
    story_id: string
    created_at?: Date | string
    updated_at?: Date | string | null
  }

  export type story_categories_relationsCreateOrConnectWithoutStory_categoriesInput = {
    where: story_categories_relationsWhereUniqueInput
    create: XOR<story_categories_relationsCreateWithoutStory_categoriesInput, story_categories_relationsUncheckedCreateWithoutStory_categoriesInput>
  }

  export type story_categories_relationsCreateManyStory_categoriesInputEnvelope = {
    data: Enumerable<story_categories_relationsCreateManyStory_categoriesInput>
    skipDuplicates?: boolean
  }

  export type story_categories_relationsUpsertWithWhereUniqueWithoutStory_categoriesInput = {
    where: story_categories_relationsWhereUniqueInput
    update: XOR<story_categories_relationsUpdateWithoutStory_categoriesInput, story_categories_relationsUncheckedUpdateWithoutStory_categoriesInput>
    create: XOR<story_categories_relationsCreateWithoutStory_categoriesInput, story_categories_relationsUncheckedCreateWithoutStory_categoriesInput>
  }

  export type story_categories_relationsUpdateWithWhereUniqueWithoutStory_categoriesInput = {
    where: story_categories_relationsWhereUniqueInput
    data: XOR<story_categories_relationsUpdateWithoutStory_categoriesInput, story_categories_relationsUncheckedUpdateWithoutStory_categoriesInput>
  }

  export type story_categories_relationsUpdateManyWithWhereWithoutStory_categoriesInput = {
    where: story_categories_relationsScalarWhereInput
    data: XOR<story_categories_relationsUpdateManyMutationInput, story_categories_relationsUncheckedUpdateManyWithoutStory_categories_relationsInput>
  }

  export type story_categoriesCreateWithoutStory_categories_relationsInput = {
    id?: string
    title: string
    desc?: string | null
    sort?: number
    is_deleted?: boolean
    created_at?: Date | string
    updated_at?: Date | string | null
  }

  export type story_categoriesUncheckedCreateWithoutStory_categories_relationsInput = {
    id?: string
    title: string
    desc?: string | null
    sort?: number
    is_deleted?: boolean
    created_at?: Date | string
    updated_at?: Date | string | null
  }

  export type story_categoriesCreateOrConnectWithoutStory_categories_relationsInput = {
    where: story_categoriesWhereUniqueInput
    create: XOR<story_categoriesCreateWithoutStory_categories_relationsInput, story_categoriesUncheckedCreateWithoutStory_categories_relationsInput>
  }

  export type storiesCreateWithoutStory_categories_relationsInput = {
    id?: string
    title: string
    cover?: string | null
    desc?: string | null
    url?: string | null
    created_at?: Date | string
    updated_at?: Date | string | null
    visible?: boolean
    sort?: number
    is_deleted?: boolean
    visit_count?: number
    story_dapps_relations?: story_dapps_relationsCreateNestedManyWithoutStoryInput
  }

  export type storiesUncheckedCreateWithoutStory_categories_relationsInput = {
    id?: string
    title: string
    cover?: string | null
    desc?: string | null
    url?: string | null
    created_at?: Date | string
    updated_at?: Date | string | null
    visible?: boolean
    sort?: number
    is_deleted?: boolean
    visit_count?: number
    story_dapps_relations?: story_dapps_relationsUncheckedCreateNestedManyWithoutStoryInput
  }

  export type storiesCreateOrConnectWithoutStory_categories_relationsInput = {
    where: storiesWhereUniqueInput
    create: XOR<storiesCreateWithoutStory_categories_relationsInput, storiesUncheckedCreateWithoutStory_categories_relationsInput>
  }

  export type story_categoriesUpsertWithoutStory_categories_relationsInput = {
    update: XOR<story_categoriesUpdateWithoutStory_categories_relationsInput, story_categoriesUncheckedUpdateWithoutStory_categories_relationsInput>
    create: XOR<story_categoriesCreateWithoutStory_categories_relationsInput, story_categoriesUncheckedCreateWithoutStory_categories_relationsInput>
  }

  export type story_categoriesUpdateWithoutStory_categories_relationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    sort?: IntFieldUpdateOperationsInput | number
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type story_categoriesUncheckedUpdateWithoutStory_categories_relationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    sort?: IntFieldUpdateOperationsInput | number
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type storiesUpsertWithoutStory_categories_relationsInput = {
    update: XOR<storiesUpdateWithoutStory_categories_relationsInput, storiesUncheckedUpdateWithoutStory_categories_relationsInput>
    create: XOR<storiesCreateWithoutStory_categories_relationsInput, storiesUncheckedCreateWithoutStory_categories_relationsInput>
  }

  export type storiesUpdateWithoutStory_categories_relationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    cover?: NullableStringFieldUpdateOperationsInput | string | null
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    visible?: BoolFieldUpdateOperationsInput | boolean
    sort?: IntFieldUpdateOperationsInput | number
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    visit_count?: IntFieldUpdateOperationsInput | number
    story_dapps_relations?: story_dapps_relationsUpdateManyWithoutStoryInput
  }

  export type storiesUncheckedUpdateWithoutStory_categories_relationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    cover?: NullableStringFieldUpdateOperationsInput | string | null
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    visible?: BoolFieldUpdateOperationsInput | boolean
    sort?: IntFieldUpdateOperationsInput | number
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    visit_count?: IntFieldUpdateOperationsInput | number
    story_dapps_relations?: story_dapps_relationsUncheckedUpdateManyWithoutStoryInput
  }

  export type storiesCreateWithoutStory_dapps_relationsInput = {
    id?: string
    title: string
    cover?: string | null
    desc?: string | null
    url?: string | null
    created_at?: Date | string
    updated_at?: Date | string | null
    visible?: boolean
    sort?: number
    is_deleted?: boolean
    visit_count?: number
    story_categories_relations?: story_categories_relationsCreateNestedManyWithoutStoryInput
  }

  export type storiesUncheckedCreateWithoutStory_dapps_relationsInput = {
    id?: string
    title: string
    cover?: string | null
    desc?: string | null
    url?: string | null
    created_at?: Date | string
    updated_at?: Date | string | null
    visible?: boolean
    sort?: number
    is_deleted?: boolean
    visit_count?: number
    story_categories_relations?: story_categories_relationsUncheckedCreateNestedManyWithoutStoryInput
  }

  export type storiesCreateOrConnectWithoutStory_dapps_relationsInput = {
    where: storiesWhereUniqueInput
    create: XOR<storiesCreateWithoutStory_dapps_relationsInput, storiesUncheckedCreateWithoutStory_dapps_relationsInput>
  }

  export type dappsCreateWithoutStory_dapps_relationsInput = {
    id?: string
    title: string
    url: string
    logo?: string | null
    desc?: string | null
    created_at?: Date | string
    updated_at?: Date | string | null
    visit_count?: number
    install_count?: number
    visible?: boolean
    is_good?: boolean
    add_by_admin?: boolean
    dapp_categories_relations?: dapp_categories_relationsCreateNestedManyWithoutDappInput
    user_dapps?: user_dappsCreateNestedManyWithoutDappInput
  }

  export type dappsUncheckedCreateWithoutStory_dapps_relationsInput = {
    id?: string
    title: string
    url: string
    logo?: string | null
    desc?: string | null
    created_at?: Date | string
    updated_at?: Date | string | null
    visit_count?: number
    install_count?: number
    visible?: boolean
    is_good?: boolean
    add_by_admin?: boolean
    dapp_categories_relations?: dapp_categories_relationsUncheckedCreateNestedManyWithoutDappInput
    user_dapps?: user_dappsUncheckedCreateNestedManyWithoutDappInput
  }

  export type dappsCreateOrConnectWithoutStory_dapps_relationsInput = {
    where: dappsWhereUniqueInput
    create: XOR<dappsCreateWithoutStory_dapps_relationsInput, dappsUncheckedCreateWithoutStory_dapps_relationsInput>
  }

  export type storiesUpsertWithoutStory_dapps_relationsInput = {
    update: XOR<storiesUpdateWithoutStory_dapps_relationsInput, storiesUncheckedUpdateWithoutStory_dapps_relationsInput>
    create: XOR<storiesCreateWithoutStory_dapps_relationsInput, storiesUncheckedCreateWithoutStory_dapps_relationsInput>
  }

  export type storiesUpdateWithoutStory_dapps_relationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    cover?: NullableStringFieldUpdateOperationsInput | string | null
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    visible?: BoolFieldUpdateOperationsInput | boolean
    sort?: IntFieldUpdateOperationsInput | number
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    visit_count?: IntFieldUpdateOperationsInput | number
    story_categories_relations?: story_categories_relationsUpdateManyWithoutStoryInput
  }

  export type storiesUncheckedUpdateWithoutStory_dapps_relationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    cover?: NullableStringFieldUpdateOperationsInput | string | null
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    url?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    visible?: BoolFieldUpdateOperationsInput | boolean
    sort?: IntFieldUpdateOperationsInput | number
    is_deleted?: BoolFieldUpdateOperationsInput | boolean
    visit_count?: IntFieldUpdateOperationsInput | number
    story_categories_relations?: story_categories_relationsUncheckedUpdateManyWithoutStoryInput
  }

  export type dappsUpsertWithoutStory_dapps_relationsInput = {
    update: XOR<dappsUpdateWithoutStory_dapps_relationsInput, dappsUncheckedUpdateWithoutStory_dapps_relationsInput>
    create: XOR<dappsCreateWithoutStory_dapps_relationsInput, dappsUncheckedCreateWithoutStory_dapps_relationsInput>
  }

  export type dappsUpdateWithoutStory_dapps_relationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    visit_count?: IntFieldUpdateOperationsInput | number
    install_count?: IntFieldUpdateOperationsInput | number
    visible?: BoolFieldUpdateOperationsInput | boolean
    is_good?: BoolFieldUpdateOperationsInput | boolean
    add_by_admin?: BoolFieldUpdateOperationsInput | boolean
    dapp_categories_relations?: dapp_categories_relationsUpdateManyWithoutDappInput
    user_dapps?: user_dappsUpdateManyWithoutDappInput
  }

  export type dappsUncheckedUpdateWithoutStory_dapps_relationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    logo?: NullableStringFieldUpdateOperationsInput | string | null
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    visit_count?: IntFieldUpdateOperationsInput | number
    install_count?: IntFieldUpdateOperationsInput | number
    visible?: BoolFieldUpdateOperationsInput | boolean
    is_good?: BoolFieldUpdateOperationsInput | boolean
    add_by_admin?: BoolFieldUpdateOperationsInput | boolean
    dapp_categories_relations?: dapp_categories_relationsUncheckedUpdateManyWithoutDappInput
    user_dapps?: user_dappsUncheckedUpdateManyWithoutDappInput
  }

  export type user_dappsCreateManyUserInput = {
    id?: string
    dapp_id: string
    created_at?: Date | string
    updated_at?: Date | string | null
    user_dapps_catogories_id?: string | null
  }

  export type user_dapps_catogoriesCreateManyUserInput = {
    id?: string
    title: string
    desc?: string | null
    sort?: number
    created_at?: Date | string
    updated_at?: Date | string | null
  }

  export type user_dappsUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    dapp?: dappsUpdateOneRequiredWithoutUser_dappsInput
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user_dapps_catogories?: user_dapps_catogoriesUpdateOneWithoutUser_dappsInput
  }

  export type user_dappsUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    dapp_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user_dapps_catogories_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type user_dappsUncheckedUpdateManyWithoutUser_dappsInput = {
    id?: StringFieldUpdateOperationsInput | string
    dapp_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user_dapps_catogories_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type user_dapps_catogoriesUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    sort?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user_dapps?: user_dappsUpdateManyWithoutUser_dapps_catogoriesInput
  }

  export type user_dapps_catogoriesUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    sort?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user_dapps?: user_dappsUncheckedUpdateManyWithoutUser_dapps_catogoriesInput
  }

  export type user_dapps_catogoriesUncheckedUpdateManyWithoutUser_dapps_catogoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    desc?: NullableStringFieldUpdateOperationsInput | string | null
    sort?: IntFieldUpdateOperationsInput | number
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type dapp_categories_relationsCreateManyDappInput = {
    id?: number
    website_category_id: string
    subcategory_id?: string | null
    created_at?: Date | string
    updated_at?: Date | string | null
  }

  export type story_dapps_relationsCreateManyDappInput = {
    id?: number
    story_id: string
    created_at?: Date | string
    updated_at?: Date | string | null
  }

  export type user_dappsCreateManyDappInput = {
    id?: string
    user_id: string
    created_at?: Date | string
    updated_at?: Date | string | null
    user_dapps_catogories_id?: string | null
  }

  export type dapp_categories_relationsUpdateWithoutDappInput = {
    dapp_categories?: dapp_categoriesUpdateOneRequiredWithoutDapp_categories_relationsInput
    subcategory_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type dapp_categories_relationsUncheckedUpdateWithoutDappInput = {
    id?: IntFieldUpdateOperationsInput | number
    website_category_id?: StringFieldUpdateOperationsInput | string
    subcategory_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type dapp_categories_relationsUncheckedUpdateManyWithoutDapp_categories_relationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    website_category_id?: StringFieldUpdateOperationsInput | string
    subcategory_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type story_dapps_relationsUpdateWithoutDappInput = {
    story?: storiesUpdateOneRequiredWithoutStory_dapps_relationsInput
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type story_dapps_relationsUncheckedUpdateWithoutDappInput = {
    id?: IntFieldUpdateOperationsInput | number
    story_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type story_dapps_relationsUncheckedUpdateManyWithoutStory_dapps_relationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    story_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type user_dappsUpdateWithoutDappInput = {
    id?: StringFieldUpdateOperationsInput | string
    user?: usersUpdateOneRequiredWithoutUser_dappsInput
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user_dapps_catogories?: user_dapps_catogoriesUpdateOneWithoutUser_dappsInput
  }

  export type user_dappsUncheckedUpdateWithoutDappInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user_dapps_catogories_id?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type dapp_categories_relationsCreateManyDapp_categoriesInput = {
    id?: number
    subcategory_id?: string | null
    dapp_id: string
    created_at?: Date | string
    updated_at?: Date | string | null
  }

  export type dapp_categories_relationsUpdateWithoutDapp_categoriesInput = {
    subcategory_id?: NullableStringFieldUpdateOperationsInput | string | null
    dapp?: dappsUpdateOneRequiredWithoutDapp_categories_relationsInput
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type dapp_categories_relationsUncheckedUpdateWithoutDapp_categoriesInput = {
    id?: IntFieldUpdateOperationsInput | number
    subcategory_id?: NullableStringFieldUpdateOperationsInput | string | null
    dapp_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type user_dappsCreateManyUser_dapps_catogoriesInput = {
    id?: string
    user_id: string
    dapp_id: string
    created_at?: Date | string
    updated_at?: Date | string | null
  }

  export type user_dappsUpdateWithoutUser_dapps_catogoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    dapp?: dappsUpdateOneRequiredWithoutUser_dappsInput
    user?: usersUpdateOneRequiredWithoutUser_dappsInput
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type user_dappsUncheckedUpdateWithoutUser_dapps_catogoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    dapp_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type story_categories_relationsCreateManyStoryInput = {
    id?: number
    story_category_id: string
    created_at?: Date | string
    updated_at?: Date | string | null
  }

  export type story_dapps_relationsCreateManyStoryInput = {
    id?: number
    dapp_id: string
    created_at?: Date | string
    updated_at?: Date | string | null
  }

  export type story_categories_relationsUpdateWithoutStoryInput = {
    story_categories?: story_categoriesUpdateOneRequiredWithoutStory_categories_relationsInput
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type story_categories_relationsUncheckedUpdateWithoutStoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    story_category_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type story_categories_relationsUncheckedUpdateManyWithoutStory_categories_relationsInput = {
    id?: IntFieldUpdateOperationsInput | number
    story_category_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type story_dapps_relationsUpdateWithoutStoryInput = {
    dapp?: dappsUpdateOneRequiredWithoutStory_dapps_relationsInput
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type story_dapps_relationsUncheckedUpdateWithoutStoryInput = {
    id?: IntFieldUpdateOperationsInput | number
    dapp_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type story_categories_relationsCreateManyStory_categoriesInput = {
    id?: number
    story_id: string
    created_at?: Date | string
    updated_at?: Date | string | null
  }

  export type story_categories_relationsUpdateWithoutStory_categoriesInput = {
    story?: storiesUpdateOneRequiredWithoutStory_categories_relationsInput
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type story_categories_relationsUncheckedUpdateWithoutStory_categoriesInput = {
    id?: IntFieldUpdateOperationsInput | number
    story_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.DMMF.Document;
}