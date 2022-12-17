import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import CheckoutProduct from "../src/components/CheckoutProduct";
import Header from "../src/components/Header";
import { selectItems, selectTotal } from "../src/slices/basketSlice";
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/react";
import { groupBy } from "lodash";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
const stripePromise = loadStripe(process.env.stripe_public_key);

function Checkout() {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const { data: session, status } = useSession();
  const groupedItems = Object.values(groupBy(items, "id"));

console.log(groupedItems)

  const createCheckoutSession = async () => {
    const stripe = await stripePromise;

    const checkoutSession = await axios.post("/api/create-checkout-session", {
      items: items,
      email: session.user.email,
    });

    // Redirect user/customer to stripe checkout
    const result = await stripe.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    });

    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <div className="bg-gray-100">
      <Header />

      <main className="lg:flex max-w-screen-xl mx-auto">
        {/* Left  */}
        <div className=" m-5 shadow-sm">
          <Image
            src="https://www.junglescout.com/wp-content/uploads/2020/05/Prime-day-banner.png"
            height={200}
            width={1020}
          />

          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0 ? "Basket is empty" : "Shopping Basket"}
            </h1>

            {groupedItems.map((item, i) => (
              <CheckoutProduct
                //TODO: Maybe need to change the key props
                key={i}
                id={item[0].id}
                title={item[0].title}
                price={item[0].price}
                rating={item[0].rating}
                description={item[0].description}
                category={item[0].category}
                image={item[0].image}
                hasPrime={item[0].hasPrime}
                quantity={item.length}
              />
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-col bg-white p-10 shadow-md">
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal ({items.length} items):
                <span className="font-bold">
                  <Currency quantity={total} currency="MYR" />
                </span>
              </h2>

              <button
                role="link"
                onClick={createCheckoutSession}
                disabled={!session}
                className={`button mt-2 ${
                  !session &&
                  "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
                }`}
              >
                {!session ? "Sign in to checkout" : "Proceed to checkout"}
              </button>
            </>
          )}
        </div>
      </main>
      <div className="h-44 bg-red-500 ">
        <h1>test</h1>
      </div>
    </div>
  );
}

export default Checkout;
