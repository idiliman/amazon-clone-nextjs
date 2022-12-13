import Product from "./Product";

export default function ProductFeed({ products }) {
  return (
    // grid-flow-row-dense (Populate all grid space)
    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 ">
      {products
        ?.slice(0, 4)
        .map(({ id, title, price, description, category, image }) => {
          return (
            <Product
              key={id}
              id={id}
              title={title}
              price={price}
              description={description}
              category={category}
              image={image}
            />
          );
        })}

      <img
        className="md:col-span-full content-evenly"
        src="https://images-eu.ssl-images-amazon.com/images/G/02/SBP/2018/gateway/1110572_smb_gw_desktop_1500x300_lavolio_1x_uk._CB484123630_.jpg"
        alt=""
      />

      <div className="md:col-span-2">
        {products
          ?.slice(4, 5)
          .map(({ id, title, price, description, category, image }) => {
            return (
              <Product
                key={id}
                id={id}
                title={title}
                price={price}
                description={description}
                category={category}
                image={image}
              />
            );
          })}
      </div>

      {products
        ?.slice(5, products.length)
        .map(({ id, title, price, description, category, image }) => {
          return (
            <Product
              key={id}
              id={id}
              title={title}
              price={price}
              description={description}
              category={category}
              image={image}
            />
          );
        })}
    </div>
  );
}
