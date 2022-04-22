# Kibo NuxtJS Storefront Starter

Headless storefront built using VueJS, on [NuxtJS 3 (bridge)](https://v3.nuxtjs.org/) using [StorefrontUI](https://www.storefrontui.io/) and custom components

Demo: [nuxt-storefront-iota.vercel.app](https://nuxt-storefront-iota.vercel.app/)

## Features

- Performant
- SEO Ready
- Internationalization
- Responsive
- UI Components
- Theming

#### Ecommerce Features

- Product
  - View and Configure Product Variants
  - Add to Cart
  - Add to wishlist
- Product Listing
  - Search Products by Category or Query
  - Search Faceting on Product Attributes
- User Account
  - Login, Register and manage Addresses
  - View Order History
- Cart
  - Get Cart
  - Add / Remove Cart Items
- Checkout
- Store Locations
  - Search for nearby Store locations
- CMS components

## Requirements:

- NodeJS v14 or later
- KiboCommerce Account

## Steps

1. [Fork](https://docs.github.com/en/get-started/quickstart/fork-a-repo) or clone the repo
   ```
   example:
   git clone https://github.com/KiboSoftware/nuxt-storefront
   cd nuxt-storefront
   ```
2. Checkout develop branch `git checkout develop`
3. Run `yarn` to install dependencies
4. Create a .env file from the .env.template file
   ```
   $ cp .env.template .env
   ```
5. The following data is required to configure the Kibo Nuxt Storefront.

- `KIBO_API_HOST` - Your Kibo Commerce API Host.
- `KIBO_AUTH_HOST` - Kibo Commerce Authentication Host Server. It is used to request an access token from Kibo Commerce OAuth 2.0 service. Production and Production sandbox, use `home.mozu.com`
- `KIBO_CLIENT_ID` - Unique Application (Client) ID of your Application
- `KIBO_SHARED_SECRET` - Secret API key used to authenticate application. Viewable from your [Kibo eCommerce Dev Center](https://mozu.com/login)
- `KIBO_PCI_HOST` - PCI payments host, For Production and Production sandbox, use `pmts.mozu.com`

```
    example:
    KIBO_AUTH_HOST=home.mozu.com
    KIBO_CLIENT_ID=i7d6294.HeadlessStorefront.1.0.0.Release
    KIBO_SHARED_SECRET=132213b896c3499592954ea6a92b6825
    KIBO_API_HOST=t26507-s41315.sandbox.mozu.com
    KIBO_PCI_HOST=pmts.mozu.com
```

Visit [Kibo documentation](https://docs.kibocommerce.com/221803/1108695-getting-started-headless) for more details on creating a clientId and sharedSecret

## Build Setup

```bash
# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

## Resources

[Kibo API Documentation](https://apidocs.kibocommerce.com/?spec=overview#overview)
[NuxtJS](https://v3.nuxtjs.org/)
[StorefrontUI](https://www.storefrontui.io/)

## Contributors

Contributions of all kind welcome!
