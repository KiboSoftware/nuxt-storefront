import getProduct from '../../api/product';
import { productDetailQuery } from "../../queries"

jest.mock('@kibocommerce/graphql-client');

describe('getProduct API handler', () => {
    const searchParams = "productCode eq 123"
    const req = { 
        searchParams,
        _kiboClient: {
            query: ({query, variables}) => {
                expect(query).toEqual(productDetailQuery);
                expect(variables).toEqual(searchParams)
                return { data: "response" };
            }
        }
    }
    it('should get product', async () => {
        const response = await getProduct(req as any, null);
        expect(response).toEqual({ data: "response" })
    })
})
