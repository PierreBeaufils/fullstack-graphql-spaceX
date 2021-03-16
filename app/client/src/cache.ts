import { InMemoryCache, Reference } from '@apollo/client';

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
          }
        }
      }
    }
  });
