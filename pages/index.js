import fs from "fs/promises";
import Link from "next/link";
import path from "path";

function HomePage(props) {
  return (
    <ul>
      {props.products.map((product) => (
        <li key={product.id}>
          <Link href={`/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

// This function gets called at build time
// context contains various properties, such as the route (params) and preview (preview)
export async function getStaticProps(context) {
  console.log("Re-generating...");
  // process cwd is the current working directory, which is the root of the project
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  if (!data) {
    return {
      // 302 is the default status code
      redirect: {
        // destination is the path to redirect to
        destination: "/no-data",
      },
    };
  }

  if (data.products.length === 0) {
    return {
      // notFound: true will cause a 404 page to be rendered
      notFound: true,
    };
  }

  // By returning { props: products }, the HomePage component
  // will receive `products` as a prop at build time
  return {
    props: {
      products: data.products,
    },
    // Re-generate the page at most once per second
    revalidate: 10,
  };
}

export default HomePage;
