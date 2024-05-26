import { getCartProducts } from "../../../api"
import { useAppInfo } from "../../components/Context-Provaiders/AppProvider"
import CartList from "../../components/Marketplace/CartList"
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { NextPage } from "next";

export const dynamic = 'force-dynamic'

const page: NextPage = withPageAuthRequired(
  async () => {
  const cartProducts = await getCartProducts()
  const productIDArr = Object.keys(cartProducts)

  async function fetchProducts(){  
    async function fetchProduct(id: string){
      const response = await fetch(`https://dummyjson.com/products/${id}`,{cache: 'no-store'});
      const data = await response.json();

      return data;
    };

    const arr = [];

    for (let index = 0; index < productIDArr.length; index++) {
      const singleProduct = await fetchProduct(productIDArr[index]);
      arr.push({ ...singleProduct, count: cartProducts[productIDArr[index]] });
    }

    return arr;
  };

  const selectedProducts= await fetchProducts();
  return (
    <div className="grid grid-rows-1 row-span-9">
      <CartList selectedProducts={selectedProducts} cartProducts={cartProducts}/>
    </div>
  )
    
  },
  { returnTo: "/profile" },
);
export default page