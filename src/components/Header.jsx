import {
  ShoppingCartIcon,
  MagnifyingGlassIcon,
  Bars4Icon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";
import { setUserEmail } from "../slices/emailSlice";
import { useEffect } from "react";

function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const items = useSelector(selectItems);
  const email = useSelector((state) => state.userEmail.email);
  const dispatch = useDispatch();
  

  useEffect(() => {
    let isSession = true;
    if (isSession) {
      dispatch(setUserEmail(session?.user.email));
    }

    return () => {
      let isSession = false;
    };
  }, [session]);

  return (
    <header>
      {/* Top nav */}
      <div className="flex items-center bg-amazon_blue p-6 grow py-2 space-x-3">
        {/* Logo */}
        <div className="mt-2 flex item-center grow sm:grow-0">
          <Image
            onClick={() => router.push("/")}
            src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
            width={150}
            height={40}
            alt={""}
            className="cursor-pointer"
          />
        </div>

        {/* Search bar */}
        <div className="hidden sm:flex items-center h-10 rounded-md grow cursor-pointer bg-yellow-400 hover:bg-yellow-500">
          {/* TODO:flex-shrink? */}
          <input
            className="p-2 h-full w-6 grow shrink rounded-l-md focus:outline-none"
            type="text"
          />
          <MagnifyingGlassIcon className="h-12 p-4" />
        </div>

        {/* Right item */}
        <div className=" text-white flex items-center text-xs space-x-6">
          <div onClick={!session ? signIn : signOut} className="link">
            {session ? `Hello, ${session.user.name}` : "Sign In"}
            <p className="font-extrabold md:text-sm">Account & Lists</p>
          </div>

          <div className="link">
            <p>Returns</p>
            <p className="font-extrabold md:text-sm">& Orders</p>
          </div>

          <div
            onClick={() => router.push("/checkout")}
            className="relative link flex items-center space-x-0.5"
          >
            <span className="absolute top-0 -right-2 md:right-10 h-4 w-4 bg-yellow-400 text-center rounded-lg text-black font-bold">
              {items.length}
            </span>
            <ShoppingCartIcon className="h-10" />
            <p className="hidden md:block font-extrabold md:text-sm mt-2">
              Basket
            </p>
          </div>
        </div>
      </div>

      {/* Bottom navi */}
      <div className="flex items-center space-x-3 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
        <p className="link flex items-center">
          <Bars4Icon className="h-6 mr-1" />
          All
        </p>
        {/* FIXME: Show hidden item in small screen / "View more:" */}
        <p className="link">Prime Video</p>
        <p className="link">Amazon Business</p>
        <p className="link">Today&apos;s Deals</p>
        <p className="link hidden lg:block">Electronics</p>
        <p className="link hidden lg:block">Food & Grocery</p>
        <p className="link hidden lg:block">Prime</p>
        <p className="link hidden lg:block">Buy Again</p>
        <p className="link hidden lg:block">Shopper & Toolkit</p>
        <p className="link hidden lg:block">Health & Personal Care</p>
      </div>
    </header>
  );
}

export default Header;
