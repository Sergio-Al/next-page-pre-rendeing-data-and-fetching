import { Fragment } from "react";
import fs from "fs/promises";
import path from "path";

function ProductDetailPage(props) {
  const { loadedProduct } = props;

  // This is not necessary because of the fallback: 'blocking' in getStaticPaths
  // if (!loadedProduct) {
  //   return <p>Loading...</p>;
  // }

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  // params contains the route parameters for pages using dynamic routes.
  const { params } = context;

  const productId = params.pid;

  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  const product = data.products.find((product) => product.id === productId);

  return {
    props: {
      loadedProduct: product,
    },
  };
}

// This function gets called at build time
// getStaticPaths is required for dynamic routes using getStaticProps
export async function getStaticPaths() {
  return {
    paths: [{ params: { pid: "p1" } }],
    // If fallback is false, then any paths not returned by getStaticPaths will result in a 404 page.
    // If fallback is true, then the behavior of getStaticProps changes:
    // - The paths returned from getStaticPaths will be rendered to HTML at build time.
    // - The paths that have not been generated at build time will not result in a 404 page.
    // - Instead, on the first request, Next.js will render the page on the server and return the generated HTML.
    // - When that's done, the browser receives the HTML for the generated page.
    // - From the user's perspective, the page will be accessible very quickly.
    // - At the same time, Next.js will keep track of these missing pages and, on the next request, attempt to generate them.
    // - If the missing page has been generated, the response will be served from the cache.
    // - If the missing page has not been generated, Next.js will attempt to generate it at the time of request.
    // - If that's successful, the response will be cached for future requests.
    // - If that's unsuccessful, a 404 page will be rendered.
    // 'blocking' allows the page to be generated at request time instead of build time.
    fallback: 'blocking',
  };
}

export default ProductDetailPage;
