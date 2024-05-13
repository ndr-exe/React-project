export interface ProductPayload  {
    title: string, 
    price: string, 
    brand: string, 
    thumbnail: string,
    id: string,
    // count?: number
}

export interface InitialProducts extends ProductPayload {
    count: number
}

export function checkLocalStorage(){
    if(typeof window === 'undefined') return []
    if(!window.localStorage.getItem('products')) return []
    const products = JSON.parse(window.localStorage.getItem('products')as string)
    return products
}

export const initialState: InitialProducts[] = checkLocalStorage()

export const enum REDUCER_ACTION_TYPE {
    INCREMENT,
    DECREMENT,
    RESET
}
export type ReducerAction = {
    type: REDUCER_ACTION_TYPE
    payload: ProductPayload
}

export const reducer = (state: InitialProducts[], action: ReducerAction): typeof initialState => {
    const productIdx = state.findIndex(p => p.id === action.payload.id )
    switch(action.type){
        case REDUCER_ACTION_TYPE.INCREMENT: {
            if(productIdx === -1) return [...state,{...action.payload, count: 1}]
            const stateCopy=[...state]
            const productCopy={...action.payload, count: stateCopy[productIdx].count + 1}
            stateCopy.splice(productIdx,1,productCopy)
            return stateCopy
        }
                            
        case REDUCER_ACTION_TYPE.DECREMENT:{
            const stateCopy=[...state]
            const productCopy={...action.payload, count: stateCopy[productIdx].count - 1}
            if(productCopy.count === 0){
                stateCopy.splice(productIdx,1)
                return stateCopy
            } 
            stateCopy.splice(productIdx,1,productCopy)
            return stateCopy
        }
        case REDUCER_ACTION_TYPE.RESET:
            return []
        default:
            return[]
    }
}