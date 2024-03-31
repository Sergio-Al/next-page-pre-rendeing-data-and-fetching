function UserProfilePage(props) {
  return <h1>{props.username}</h1>;
}

export default UserProfilePage;

// this function is called at build time
// getServerSideProps is used to fetch data on every incoming request
// context contains various properties, such as the route (params) and preview (preview)
export async function getServerSideProps(context) {
  // context contains the request object and the response object from the server
  // remember that those are from node
  const { params, req, res } = context;

  console.log(req);
  console.log(res);

  return {
    props: {
      username: "Sergio",
    },
  };
}
