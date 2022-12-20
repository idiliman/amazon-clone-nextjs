import Header from "../src/components/Header";
import { getSession, useSession } from "next-auth/react";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import moment from "moment";
import { useSelector } from "react-redux";

function orders({ orders }) {
  const emailData = useSelector((state) => state.userEmail.email);
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const emails = emailData;
  console.log("from orders", emailData);
  console.log("from  useState", email);
  console.log("from  emails", emails);

  
  async function whatEver() {
    setEmail(session?.user.email)
    //     // const dataRef = db.collection("amazon_users");
    //     // await dataRef.doc('idil.iman1999@gmail.com').set({
    //     //   name: "SENTUL",
    //     //   state: "KUL",
    //     //   country: "USA",
    //     //   capital: false,
    //     //   population: 160000,
    //     // });
    // const cityCol = collection(
    //   db,
    //   "amazon_users",
    //   "idil.iman1999@gmail.com",
    //   "orders"
    // );
    // getDocs(cityCol).then((snapshot) => {
    //   const docs = snapshot.docs.map((doc) => doc.data());
    //   console.log(docs);
    // });
    // Working
    // const cityCol = collection(db,
    //   "amazon_users",
    //   'dasdadas',
    //   "orders"
    // );
    // getDocs(cityCol).then((snapshot) => {
    //   const docs = snapshot.docs.map((doc) => doc.data());
    //   console.log(docs);
    // });

    // Test
    const docReference = doc(
      db,
      "amazon_users",
      `${emails}`,
      "orders",
      "cs_test_a1nWuQtwTzv9o1alFJ41R6pxBQ2idfMz5J3YNjVHFZ9AVcUM041OVncubA"
    );
    const docSnapshot = await getDoc(docReference);
    const documentData = docSnapshot.data();
    console.log(documentData);

    //   // const snapshot = await db
    //   //   .collection("cities")
    //   //   .doc("MY")
    //   //   .get();
    //   // console.log(snapshot)
    //   // .onSnapshot((doc) => {
    //   //   console.log("notes", doc);
    //   // });
  }

  useEffect(() => {
    whatEver();
  }, []);

  return (
    <div>
      <Header />

      <main className="max-w-screen-lg mx-auto p-10">
        <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
          Your Orders
        </h1>

        {session ? (
          <h2>x Orders</h2>
        ) : (
          <h2>Please sign in to see your orders</h2>
        )}
        <div className="mt-5 space-y-4"></div>
      </main>
    </div>
  );
}

export default orders;

// export async function getServerSideProps(context) {
//   const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//   // Get users logged in credentials...
//   const session = await getSession(context);

//   if (!session) {
//     return {
//       props: {},
//     };
//   }

//   // Test firestore
//   // const userRef = await db.collection(db, 'orders')
//   // const doc = await userRef.get();
//   // if (!doc.exists) {
//   //   console.log("No such document!");
//   // } else {
//   //   console.log("Document data:", doc.data());
//   // }

//   // Firebase db
//   const stripeOrders = await db
//     .collection("users")
//     .doc('idil.iman1999@gmail.com')
//     .collection("orders")
//     .orderBy("timestamp", "desc")
//     .get();

//   // Stripe orders
//   const orders = await Promise.all(
//     stripeOrders.docs.map(async (order) => ({
//       id: order.id,
//       amount: order.data().amount,
//       images: order.data().images,
//       timestamp: moment(order.data().timestamp.toDate()).unix(),
//       items: (
//         await stripe.checkout.sessions.listLineItems(order.id, {
//           limit: 100,
//         })
//       ).data,
//     }))
//   );

//   return {
//     props: {
//       orders,
//     },
//   };
// }
