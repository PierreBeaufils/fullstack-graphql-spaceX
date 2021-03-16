import { InMemoryCache, Reference, makeVar } from '@apollo/client';

/*
Apollo Client stores your query results in its in-memory cache, initialized by:
export const cache: InMemoryCache = new InMemoryCache({})
The merge function takes our existing cached launches and the incoming launches and combines them into a single list,
which it then returns. The cache stores this combined list and returns it to all queries that use the launches field.
This allows to display more results within the pagination when click on button "load more".
*/
export const cache: InMemoryCache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          launches: {
            keyArgs: false,
            merge(existing, incoming) {
              let launches: Reference[] = [];
              if (existing && existing.launches) {
                launches = launches.concat(existing.launches);
              }
              if (incoming && incoming.launches) {
                launches = launches.concat(incoming.launches);
              }
              return {
                ...incoming,
                launches,
              };
            }
          },
          cartItems: {
            read() {
              return cartItemsVar();
            }
          },
          isLoggedIn: {
            read() {
              return isLoggedInVar();
            }
          }
        }
      }
    }
  });

// Initializes to true if localStorage includes a 'token' key,
// false otherwise
export const isLoggedInVar = makeVar<boolean>(!!localStorage.getItem('token'));

// Initializes to an empty array
export const cartItemsVar = makeVar<string[]>([]);

/*
If you call a reactive variable function with zero arguments (e.g., isLoggedInVar()),
it returns the variable's current value.

If you call the function with one argument (e.g., isLoggedInVar(false)),
it replaces the variable's current value with the provided value.
*/
