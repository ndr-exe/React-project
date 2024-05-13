import dynamic from "next/dynamic";
import Checkout from "../components/Marketplace/Checkout";
const NoSSR = dynamic(() => import('../components/Marketplace/Checkout'), { ssr: false })

export default function page() {
  return (
    <NoSSR/>
  )
}
