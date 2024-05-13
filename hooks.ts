export function useLocalStorage(){
    function updateItems(products: any){
        window.localStorage.setItem('products',JSON.stringify(products))
    }


    function resetItems(){
        window.localStorage.removeItem('products')
    }

    return [updateItems,resetItems]

}

