const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;
const SHOPIFY_GRAPHQL_URL = `https://${domain}/api/2024-10/graphql.json`;
const SHOPIFY_STOREFRONT_TOKEN = storefrontToken as string;

export interface ShopifyImage {
  url: string;
  altText: string | null;
  width: number | null;
  height: number | null;
}

export interface ShopifyPrice {
  amount: string;
  currencyCode: string;
}

export interface ShopifySelectedOption {
  name: string;
  value: string;
}

export interface ShopifyProductVariant {
  id: string;
  title: string;
  price: ShopifyPrice;
  availableForSale: boolean;
  image: ShopifyImage | null;
  selectedOptions: ShopifySelectedOption[];
}

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  images: { edges: { node: ShopifyImage }[] };
  priceRange: {
    minVariantPrice: ShopifyPrice;
    maxVariantPrice: ShopifyPrice;
  };
  variants: { edges: { node: ShopifyProductVariant }[] };
  tags: string[];
  productType: string;
  availableForSale: boolean;
}

export interface ShopifyCollection {
  id: string;
  title: string;
  handle: string;
  description: string;
  image: ShopifyImage | null;
  products: { edges: { node: ShopifyProduct }[] };
}

type ShopifyCheckoutUserError = {
  code?: string;
  field?: string[];
  message: string;
};

type ShopifyResponse<T> = {
  data?: T;
  errors?: { message?: string }[];
};

type ShopifyAjaxVariant = {
  id: number;
  title: string;
  price: string;
  available: boolean;
  option1: string | null;
  option2: string | null;
  option3: string | null;
  featured_image?: {
    src: string;
    alt?: string | null;
    width?: number;
    height?: number;
  } | null;
};

type ShopifyAjaxProduct = {
  id: number;
  title: string;
  handle: string;
  body_html: string;
  tags: string | string[];
  product_type: string;
  options: { name: string }[];
  variants: ShopifyAjaxVariant[];
  images: {
    src: string;
    alt?: string | null;
    width?: number;
    height?: number;
  }[];
};

function isAuthError(error: unknown) {
  if (!(error instanceof Error)) return false;
  return (
    error.message.includes("401") ||
    error.message.toLowerCase().includes("unauthorized") ||
    error.message.toLowerCase().includes("graphql error")
  );
}

async function shopifyFetch<T>({
  query,
  variables,
}: {
  query: string;
  variables?: Record<string, unknown>;
}): Promise<T> {
  if (!domain || !storefrontToken) {
    throw new Error("Missing Shopify environment variables");
  }

  const response = await fetch(SHOPIFY_GRAPHQL_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 120 },
  });

  if (!response.ok) {
    throw new Error(`Shopify API error: ${response.status}`);
  }

  const json = (await response.json()) as ShopifyResponse<T>;

  if (json.errors?.length) {
    throw new Error(json.errors[0]?.message || "Shopify GraphQL Error");
  }

  if (!json.data) {
    throw new Error("Shopify GraphQL returned no data");
  }

  return json.data;
}

function formatOptionValue(value: string | null | undefined) {
  return value || "Default";
}

function transformAjaxProduct(raw: ShopifyAjaxProduct): ShopifyProduct {
  const currencyCode = "EUR";
  const variantPrices = raw.variants.map((variant) => Number(variant.price || "0"));
  const minPrice = variantPrices.length ? Math.min(...variantPrices) : 0;
  const maxPrice = variantPrices.length ? Math.max(...variantPrices) : 0;

  const images = raw.images.map((image) => ({
    node: {
      url: image.src,
      altText: image.alt || null,
      width: image.width ?? null,
      height: image.height ?? null,
    },
  }));

  const variants = raw.variants.map((variant) => ({
    node: {
      id: String(variant.id),
      title: variant.title,
      price: { amount: variant.price || "0", currencyCode },
      availableForSale: variant.available,
      image: variant.featured_image
        ? {
            url: variant.featured_image.src,
            altText: variant.featured_image.alt || null,
            width: variant.featured_image.width ?? null,
            height: variant.featured_image.height ?? null,
          }
        : null,
      selectedOptions: raw.options
        .map((option, index) => {
          const optionValue = [variant.option1, variant.option2, variant.option3][index];
          if (!option.name || !optionValue) return null;
          return { name: option.name, value: formatOptionValue(optionValue) };
        })
        .filter((entry): entry is ShopifySelectedOption => entry !== null),
    },
  }));

  const normalizedTags = Array.isArray(raw.tags)
    ? raw.tags.map((tag) => String(tag).trim())
    : String(raw.tags || "")
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean);

  return {
    id: String(raw.id),
    title: raw.title,
    handle: raw.handle,
    description: raw.body_html.replace(/<[^>]+>/g, " ").trim(),
    descriptionHtml: raw.body_html || "",
    images: { edges: images },
    priceRange: {
      minVariantPrice: { amount: minPrice.toFixed(2), currencyCode },
      maxVariantPrice: { amount: maxPrice.toFixed(2), currencyCode },
    },
    variants: { edges: variants },
    tags: normalizedTags,
    productType: raw.product_type || "Product",
    availableForSale: raw.variants.some((variant) => variant.available),
  };
}

async function fetchPublicProducts(limit = 250) {
  if (!domain) {
    throw new Error("Missing Shopify store domain");
  }

  const response = await fetch(`https://${domain}/products.json?limit=${limit}`, {
    next: { revalidate: 120 },
  });

  if (!response.ok) {
    throw new Error(`Shopify public products error: ${response.status}`);
  }

  const data = (await response.json()) as { products: ShopifyAjaxProduct[] };
  return data.products.map(transformAjaxProduct);
}

const PRODUCTS_QUERY = `
  query Products($first: Int!) {
    products(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          descriptionHtml
          availableForSale
          productType
          tags
          priceRange {
            minVariantPrice { amount currencyCode }
            maxVariantPrice { amount currencyCode }
          }
          images(first: 5) {
            edges { node { url altText width height } }
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                price { amount currencyCode }
                availableForSale
                image { url altText width height }
                selectedOptions { name value }
              }
            }
          }
        }
      }
    }
  }
`;

const PRODUCT_BY_HANDLE_QUERY = `
  query ProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      handle
      description
      descriptionHtml
      availableForSale
      productType
      tags
      priceRange {
        minVariantPrice { amount currencyCode }
        maxVariantPrice { amount currencyCode }
      }
      images(first: 10) {
        edges { node { url altText width height } }
      }
      variants(first: 20) {
        edges {
          node {
            id
            title
            price { amount currencyCode }
            availableForSale
            image { url altText width height }
            selectedOptions { name value }
          }
        }
      }
    }
  }
`;

const COLLECTIONS_QUERY = `
  query Collections($first: Int!) {
    collections(first: $first) {
      edges {
        node {
          id
          title
          handle
          description
          image { url altText width height }
          products(first: 20) {
            edges {
              node {
                id
                title
                handle
                description
                descriptionHtml
                availableForSale
                productType
                tags
                priceRange {
                  minVariantPrice { amount currencyCode }
                  maxVariantPrice { amount currencyCode }
                }
                images(first: 5) {
                  edges { node { url altText width height } }
                }
                variants(first: 10) {
                  edges {
                    node {
                      id
                      title
                      price { amount currencyCode }
                      availableForSale
                      image { url altText width height }
                      selectedOptions { name value }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const COLLECTION_BY_HANDLE_QUERY = `
  query CollectionByHandle($handle: String!) {
    collectionByHandle(handle: $handle) {
      id
      title
      handle
      description
      image { url altText width height }
      products(first: 50) {
        edges {
          node {
            id
            title
            handle
            description
            descriptionHtml
            availableForSale
            productType
            tags
            priceRange {
              minVariantPrice { amount currencyCode }
              maxVariantPrice { amount currencyCode }
            }
            images(first: 5) {
              edges { node { url altText width height } }
            }
            variants(first: 10) {
              edges {
                node {
                  id
                  title
                  price { amount currencyCode }
                  availableForSale
                  image { url altText width height }
                  selectedOptions { name value }
                }
              }
            }
          }
        }
      }
    }
  }
`;

const CREATE_CHECKOUT_QUERY = `
  mutation CreateCheckout($input: CheckoutCreateInput!) {
    checkoutCreate(input: $input) {
      checkout {
        id
        webUrl
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`;

const ADD_TO_CHECKOUT_QUERY = `
  mutation AddToCheckout($checkoutId: ID!, $lineItems: [CheckoutLineItemInput!]!) {
    checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
      checkout {
        id
        webUrl
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`;

function throwOnCheckoutErrors(errors: ShopifyCheckoutUserError[] | undefined) {
  if (errors?.length) {
    throw new Error(errors[0]?.message || "Shopify checkout error");
  }
}

export async function getAllProducts(first = 50) {
  try {
    const data = await shopifyFetch<{ products: { edges: { node: ShopifyProduct }[] } }>({
      query: PRODUCTS_QUERY,
      variables: { first },
    });
    return data.products.edges.map(({ node }) => node);
  } catch (error) {
    if (!isAuthError(error)) {
      throw error;
    }
    const products = await fetchPublicProducts(Math.max(first, 50));
    return products.slice(0, first);
  }
}

export async function getProductByHandle(handle: string) {
  try {
    const data = await shopifyFetch<{ productByHandle: ShopifyProduct | null }>({
      query: PRODUCT_BY_HANDLE_QUERY,
      variables: { handle },
    });
    return data.productByHandle;
  } catch (error) {
    if (!isAuthError(error)) {
      throw error;
    }
    const products = await fetchPublicProducts(250);
    return products.find((product) => product.handle === handle) || null;
  }
}

export async function getCollections(first = 10) {
  try {
    const data = await shopifyFetch<{ collections: { edges: { node: ShopifyCollection }[] } }>({
      query: COLLECTIONS_QUERY,
      variables: { first },
    });
    return data.collections.edges.map(({ node }) => node);
  } catch (error) {
    if (!isAuthError(error)) {
      throw error;
    }
    const products = await fetchPublicProducts(250);
    const byType = new Map<string, ShopifyProduct[]>();
    products.forEach((product) => {
      const type = product.productType || "Product";
      if (!byType.has(type)) byType.set(type, []);
      byType.get(type)?.push(product);
    });

    return Array.from(byType.entries())
      .slice(0, first)
      .map(([type, typeProducts]) => {
        const handle = type.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        return {
          id: `fallback-${handle}`,
          title: type,
          handle,
          description: `${type} collection`,
          image: getFirstImage(typeProducts[0]),
          products: { edges: typeProducts.map((node) => ({ node })) },
        };
      });
  }
}

export async function getCollectionByHandle(handle: string): Promise<ShopifyCollection | null> {
  try {
    const data = await shopifyFetch<{ collectionByHandle: ShopifyCollection | null }>({
      query: COLLECTION_BY_HANDLE_QUERY,
      variables: { handle },
    });
    return data.collectionByHandle;
  } catch (error) {
    if (!isAuthError(error)) {
      throw error;
    }
    // Fallback: filter products by type matching the handle
    const products = await fetchPublicProducts(250);
    const filtered = products.filter(
      (p) => p.productType.toLowerCase().replace(/[^a-z0-9]+/g, "-") === handle ||
             p.tags.some((t) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-") === handle)
    );
    if (filtered.length === 0) return null;
    return {
      id: `fallback-${handle}`,
      title: handle.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      handle,
      description: "",
      image: getFirstImage(filtered[0]),
      products: { edges: filtered.map((node) => ({ node })) },
    };
  }
}

export async function createCheckout(variantId: string, quantity = 1) {
  const data = await shopifyFetch<{
    checkoutCreate: {
      checkout: { id: string; webUrl: string } | null;
      checkoutUserErrors?: ShopifyCheckoutUserError[];
    };
  }>({
    query: CREATE_CHECKOUT_QUERY,
    variables: {
      input: {
        lineItems: [{ variantId, quantity }],
      },
    },
  });

  throwOnCheckoutErrors(data.checkoutCreate.checkoutUserErrors);

  if (!data.checkoutCreate.checkout) {
    throw new Error("Checkout creation failed");
  }

  return data.checkoutCreate.checkout;
}

export async function addToCheckout(checkoutId: string, variantId: string, quantity = 1) {
  const data = await shopifyFetch<{
    checkoutLineItemsAdd: {
      checkout: { id: string; webUrl: string } | null;
      checkoutUserErrors?: ShopifyCheckoutUserError[];
    };
  }>({
    query: ADD_TO_CHECKOUT_QUERY,
    variables: {
      checkoutId,
      lineItems: [{ variantId, quantity }],
    },
  });

  throwOnCheckoutErrors(data.checkoutLineItemsAdd.checkoutUserErrors);

  if (!data.checkoutLineItemsAdd.checkout) {
    throw new Error("Adding to checkout failed");
  }

  return data.checkoutLineItemsAdd.checkout;
}

export function formatPrice(amount: string, currencyCode = "EUR") {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: currencyCode,
  }).format(parseFloat(amount));
}

export function getFirstImage(product: ShopifyProduct): ShopifyImage | null {
  return product.images.edges[0]?.node || null;
}
