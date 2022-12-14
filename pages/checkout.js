import Image from "next/image";
import React from "react";
import { useSelector } from "react-redux";
import Header from "../src/components/Header";
import { selectItems } from "../src/slices/basketSlice";

function Checkout() {
const items = useSelector(selectItems)

  return (
    <div className="bg-gray-100">
      <Header />

      <main className="lg:flex max-w-screen-xl mx-auto">
        {/* Left  */}
        <div className="grow m-5 shadow-sm">
          <Image
            src="https://www.junglescout.com/wp-content/uploads/2020/05/Prime-day-banner.png"
            height={200}
            width={1020}
          />

          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
           {items? "Your Shopping Basket" : "Your Shopping i"} 
            </h1>
          </div>
        </div>

        {/* Right */}
        <div></div>
      </main>
    </div>
  );
}

export default Checkout;
