import Head from "next/head";
import Header from "../src/components/Header";
import Banner from "../src/components/Banner";
import ProductFeed from "../src/components/ProductFeed";

export default function Home({ products }) {
  // const [product, setProduct] = useState();

  // //TODO: Implement useQuery
  // useEffect(() => {
  //   let isSubscribed = true;

  //   // declare the async data fetching function
  //   const fetchData = async () => {
  //     // get the data from the api
  //     const data = await fetch("https://fakestoreapi.com/products");
  //     // convert the data to json
  //     const json = await data.json();

  //     // set state with the result if `isSubscribed` is true
  //     if (isSubscribed) {
  //       setProduct(json);
  //     }
  //   };

  //   // call the function
  //   fetchData()
  //     // make sure to catch any error
  //     .catch(console.error);

  //   // cancel any future `setData`
  //   return () => (isSubscribed = false);
  // }, []);

  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amajon</title>
      </Head>

      {/* Header */}
      <Header />

      {/* Main */}
      <main className="max-w-screen-xl mx-auto">
        <Banner />
        <ProductFeed products={products} />
      </main>
    </div>
  );
}

// Fetching data from fakestoreapi.com
// export const getServerSideProps = async () => {
//   const res = await fetch("https://fakestoreapi.com/products");
//   const products = await res.json();

//   return {
//     props: {
//       products,
//     },
//   };
// };

// This gets called on every request
export async function getServerSideProps(context) {
  const products = await fetch("https://fakestoreapi.com/products").then(
    (res) => res.json()
  );

  // Pass data to the page via props
  return {
    props: {
      products,
    },
  };
}
