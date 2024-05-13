type DictType = {
        [key: string]: {[key: string]: string}
}

type ProductType = {
    id:                 number,
    title:              string,
    description:        string,
    price:              number,
    discountPercentage: number,
    rating:             number,
    stock:              number,
    brand:              string,
    category:           string,
    thumbnail:          string,
    images:             string[],
}

type ItemPorpsType = {
    title: string,
    description: string,
    price: string,
    brand: string,
    category: string,
    thumbnail: string,
    id: string,
    dict: DictType,
    handleClick: Function
}

interface RawBlogType {
    id: number,
    title: string,
    body: string,
    userId: number,
    tags: string[],
    reactions: number,
  }
  

interface EditedBlogType extends RawBlogType {
    important: boolean,
    image: string,
    uploadDate: string
}