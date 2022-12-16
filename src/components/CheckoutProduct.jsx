import Image from "next/image";
import {
  StarIcon,
  MinusSmallIcon,
  PlusSmallIcon,
} from "@heroicons/react/24/solid";
import Currency from "react-currency-formatter";
import { useDispatch, useSelector } from "react-redux";
import { addToBasket, removeFromBasket,selectItems } from "../slices/basketSlice";

function CheckoutProduct(props) {
  const dispatch = useDispatch();
  const items = useSelector(selectItems);

  const id = props.id;
  const title = props.title;
  const rating = props.rating;
  const price = props.price;
  const description = props.description;
  const category = props.category;
  const image = props.image;
  const hasPrime = props.hasPrime;
  const quantity = props.quantity;

  const addItemToBasket = () => {
    const product = {
      id,
      title,
      price,
      rating,
      description,
      category,
      image,
      hasPrime,
    };

    dispatch(addToBasket(product));
  };

  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ id }));
  };

  return (
    <div className="grid grid-cols-5">
      <Image src={image} height={200} width={200} alt="" />

      {/* Middle */}
      <div className="col-span-3 mx-5">
        <p>{title}</p>
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500" />
            ))}
        </div>

        <p className="text-xs my-2 line-clamp-3">{description}</p>
        <Currency quantity={price} currency="MYR" />

        {hasPrime && (
          <div className="flex items-center space-x-2">
            <img
              loading="lazy"
              className="w-12"
              src="https://whitebox.com/wp-content/uploads/2020/05/Prime-tag-.png"
            />
            <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
          </div>
        )}
      </div>

      {/* Right add/remove buttons */}
      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <div className="flex justify-between xs:justify-start">
          <button className="button sm:p-1" onClick={removeItemFromBasket}>
            <MinusSmallIcon className="h-5 text-black" />
          </button>

          <div className="p-2 whitespace-normal sm:p-1 sm:whitespace-nowrap">
            Quantity: <span className="font-bold">{items.length}</span>
          </div>

          <button className="button sm:p-1" onClick={addItemToBasket}>
            <PlusSmallIcon className="h-5 text-black" />
          </button>
        </div>

        {/* <button className="button" onClick={removeGroupFromBasket}>
          Remove from Basket
        </button> */}

        {/* <button onClick={addItemToBasket} className="button mt-auto">
          Add to Basket
        </button>
        <button onClick={removeItemFromBasket} className="button mt-auto">
          Remove from Basket
        </button> */}
      </div>
    </div>
  );
}

export default CheckoutProduct;
