import { getCartProducts } from "../../../api"
import { useAppInfo } from "../../components/Context-Provaiders/AppProvider"
import CartList from "../../components/Marketplace/CartList"

export const dynamic = 'force-dynamic'

export default async function page() {
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
  // console.log(selectedProducts)
  return (
    <div className="grid grid-rows-1 row-span-9">
      <CartList selectedProducts={selectedProducts} cartProducts={cartProducts}/>
    </div>
  )
}
