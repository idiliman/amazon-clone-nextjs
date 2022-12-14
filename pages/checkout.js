import Image from "next/image";
import React from "react";
import Header from "../src/components/Header";

function Checkout() {
  return (
    <div className="bg-gray-100">
      <Header />

      <main className="lg:flex max-w-screen-2xl mx-auto">
        {/* Left  */}
        <div>
          <Image
            src="https://www.junglescout.com/wp-content/uploads/2020/05/Prime-day-banner.png"
            height={200}
            width={1020}
          />
        </div>

        {/* Right */}
        <div></div>
      </main>
    </div>
  );
}

export default Checkout;
