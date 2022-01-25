export const getDocumentsQuery = /* GraphQL */ `
  query getDocuments($documentListName: String!, $filter: String) {
    documentListDocuments(documentListName: $documentListName, filter: $filter) {
      startIndex
      totalCount
      items {
        name
        properties
      }
    }
  }
`
