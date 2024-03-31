import fs from "fs/promises";
import path from "path";

function HomePage(props) {
  return (
    <ul>
      {props.products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
}

// This function gets called at build time
export async function getStaticProps() {
  // process cwd is the current working directory, which is the root of the project
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  // By returning { props: products }, the HomePage component
  // will receive `products` as a prop at build time
  return {
    props: {
      products: data.products,
    },
  };
}

export default HomePage;
