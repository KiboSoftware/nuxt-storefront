import { searchResults } from "@/gql/fragments"

export const searchProductsQuery = `
query ProductSearch($query:String, $startIndex:Int,
    $pageSize:Int, $sortBy:String, $facetHierValue:String,$facetTemplate:String,$facetValueFilter:String ) {
       products:productSearch (
            query:$query,
            startIndex: $startIndex,
            pageSize:$pageSize,
            sortBy: $sortBy,
            facetHierValue:$facetHierValue,
            facetTemplate:$facetTemplate, 
            facetValueFilter:$facetValueFilter
          ) {
            ...searchResults
        }
    }
    ${searchResults}
`
