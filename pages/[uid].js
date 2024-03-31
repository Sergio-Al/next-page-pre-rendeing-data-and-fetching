function UserIdPage(props) {
  return <h1>{props.id}</h1>;
}

export default UserIdPage;

// There is not pre-generated page for getServerSideProps 
// because it is called on every incoming request
export async function getServerSideProps(context) {
  const { params } = context;

  const userId = params.uid;

  return {
    props: {
      id: "user-id-" + userId,
    },
  };
}
