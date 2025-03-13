import { useQuery, gql } from "@apollo/client";

const GET_IMAGES = gql`
  query GetImages {
    images {
      id
      url
      likes
      featured
    }
  }
`;

function App() {
  const { data, loading, error } = useQuery(GET_IMAGES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Images</h1>
      {data.images.map((img: any) => (
        <div key={img.id}>
          <img src={img.url} alt="img" width="100" />
          <p>Likes: {img.likes}</p>
          <p>Featured: {img.featured ? "Yes" : "No"}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
