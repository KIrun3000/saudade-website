# Vercel Environment Variables

Gehe zu [Vercel Project Settings](https://vercel.com/kirun3000s-projects/saudade-website/settings/environment-variables)
und füge diese Variablen hinzu:

- `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` = `saudade-voces.myshopify.com`
- `NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN` = `[Token hier einfügen]`

Danach neu deployen:

```bash
npx vercel --prod
```
