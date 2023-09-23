import axios from 'axios';

function About({ data }) {
  console.log('posts2', data?.data?.attributes)
  return (
    <div>
      <h1>Lista postówhfdd</h1>
      <h2>{data?.data?.attributes?.title}</h2>
      <ul>
        {data?.data?.attributes?.images?.data?.map((post) => (
          <li key={post.id}>{post.attributes?.url}</li>
        ))}
      </ul>
      {data?.data?.attributes?.images?.data?.map((post) => (
       <> <p>{`https://strapi-147044-0.cloudclusters.net/api${post.attributes?.url}`}</p>
          <img width='300' key={post.id} src={`https://strapi-147044-0.cloudclusters.net${post.attributes?.url}`}/></>
        ))}
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const response = await axios.get('https://strapi-147044-0.cloudclusters.net/api/gallery?populate=*');
    const data = response.data;

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    console.error('Błąd podczas pobierania danych z API Strapi:', error);
    return {
      props: {
        posts: [],
      },
    };
  }
}

export default About;
