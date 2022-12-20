import { buffer } from "micro";
import serviceAccount from "../../permissions.json";
import * as admin from "firebase-admin";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

// Establish connection to firebase
const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app();

// Establish connection to stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Webhook
const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

// Send data to databse
const fulfillOrder = async (session) => {
  console.log("Fulfilling order", session);

  return app
    .firestore()
    .collection("amazon_users")
    .doc(session.metadata.email)
    .collection("orders")
    .doc(session.id)
    .set({
      amount: session.amount_total / 100,
      // TODO: Make image link to not duplicate
      images: JSON.parse(session.metadata.images),
      timestamps: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log(`SUCCESS: Order ${session.id} has been added to DB`);
    });

  // const dataRef = db.collection("users");
  // return await dataRef
  //   .doc(session.metadata.email)
  //   // .collection("orders")
  //   // .doc(session.id)
  //   // .set({
  //   //   amount: session.amount_total / 100,
  //   //   // TODO: Make image link to not duplicate
  //   //   images: JSON.parse(session.metadata.images),
  //   //   timestamps: admin.firestore.FieldValue.serverTimestamp(),
  //   // })
  //   .then(() => {
  //     console.log(`SUCCESS: Order ${session.id} has been added to DB`);
  //   });
};

export default async (req, res) => {
  if (req.method === "POST") {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers["stripe-signature"];

    let event;

    // Verifying posted event came from stripe
    try {
      event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (error) {
      console.log("Error", error);
      return res.status(400).send(`Webhook error: ${error.message}`);
    }

    // Handle checkout.session.completed event from stripe & Push data to DB
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // Fulfill the order
      return fulfillOrder(session)
        .then(() => res.status(200))
        .catch((error) =>
          res.status(400).send(`Webhook Error: ${error.message}`)
        );
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
