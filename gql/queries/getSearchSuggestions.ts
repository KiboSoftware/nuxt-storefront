export const getSearchSuggestions = `query getSearchSuggestions($query:String!){
    suggestionSearch(query:$query, groups:"pages,categories"){
      suggestionGroups{
        name
        suggestions {
          suggestion
        }
      }
    }
}`
