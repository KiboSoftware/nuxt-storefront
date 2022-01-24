export const getSearchSuggestions = /* GraphQL */`
query getSearchSuggestions($query:String!){
    suggestionSearch(query:$query, groups:"pages,categories"){
      suggestionGroups{
        name
        suggestions {
          suggestion
        }
      }
    }
}`
