import { groupBy } from "lodash";
const path = require("path");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  const { items, email } = req.body;

  const groupedItems = Object.values(groupBy(items, "id"));

  const transformedItems = groupedItems.map((item) => ({
    price_data: {
      currency: "MYR",
      product_data: {
        name: item[0].title,
        description: item[0].description,
        images: [item[0].image],
      },
      unit_amount: item[0].price * 100,
    },
    quantity: item.length,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],

    shipping_address_collection: {
      allowed_countries: ["GB", "US", "CA"],
    },
    line_items: transformedItems,
    mode: "payment",
    success_url: `${process.env.HOST}/success`,
    cancel_url: `${process.env.HOST}/checkout`,
    metadata: {
      email,
      images: JSON.stringify(items.map((item) => item.image)),
    },
  });

  res.status(200).json({ id: session.id });
};
