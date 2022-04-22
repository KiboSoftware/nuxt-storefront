import type { FacetValue } from '@/server/types/GraphQL';

const getName = (facetValue: FacetValue) => facetValue?.label
const getCount = (facetValue: FacetValue) => facetValue?.count
const getFilter = (facetValue: FacetValue) => facetValue?.filterValue
const getChildren = (facetValue: FacetValue) => facetValue?.childrenFacetValues
const getIsApplied = (facetValue: FacetValue) => facetValue?.isApplied || false
const getIsDisplayed = (facetValue: FacetValue) => facetValue?.isDisplayed

export const facetValueGetters = {
    getName,
    getCount,
    getFilter,
    getChildren,
    getIsApplied,
    getIsDisplayed
}