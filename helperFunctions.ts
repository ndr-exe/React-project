export function calculateProductsCountInCart(obj: CartProducts):number{
    // if(Object.keys(obj).length === 0) return 0
    // // const count = arr.reduce((acc: number, curr: CartProduct)=>{
    // //     return acc + curr.productCount
    // // },0)
    // // return count
        const arr = Object.values(obj)
        const productCount = arr.reduce((acc:number,curr:number)=>{
            return acc + curr
        },0)
        return productCount


}