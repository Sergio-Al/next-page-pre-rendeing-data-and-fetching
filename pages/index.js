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
  // Call an external API endpoint to get products

  // By returning { props: products }, the HomePage component
  // will receive `products` as a prop at build time
  return {
    props: {
      products: [
        { id: "p1", title: "Product 1" },
        { id: "p2", title: "Product 2" },
        { id: "p3", title: "Product 3" },
      ],
    },
  };
}

export default HomePage;
