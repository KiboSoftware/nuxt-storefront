import { searchResults } from "../fragments"

export const searchProductsQuery = `
query ProductSearch($query:String, $startIndex:Int,
    $pageSize:Int, $sortBy:String, $filter:String,$facetTemplate:String,$facetValueFilter:String ) {
       products:productSearch (
            query:$query,
            startIndex: $startIndex,
            pageSize:$pageSize,
            sortBy: $sortBy,
            filter:$filter,
            facetTemplate:$facetTemplate, 
            facetValueFilter:$facetValueFilter
          ) {
            ...searchResults
        }
    }
    ${searchResults}
`
