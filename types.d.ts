type DictType = {
  [key: string]: { [key: string]: string };
};

interface ProductType {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

interface CartProductType extends ProductType {
  count: number;
}

type CartProducts = {
  [key: string]: number;
};

type ItemPorpsType = {
  title: string;
  description: string;
  price: string;
  brand: string;
  category: string;
  thumbnail: string;
  id: string;
  dict: DictType;
  handleClick: (number) => void;
};

interface RawBlogType {
  id: number;
  title: string;
  body: string;
  userId: number;
  tags: string[];
  reactions: number;
}

interface EditedBlogType extends RawBlogType {
  important: boolean;
  image: string;
  uploadDate: string;
}

interface Item {
  id: number;
  title: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  caliber: string;
  action: string;
  thumbnail: string;
  images: string[];
  one_star: number;
  two_star: number;
  three_star: number;
  four_star: number;
  five_star: number;
  rating: number;
  reviews: any;
  created_at: string;
}
interface CartItem extends Item {
  count: number;
}

interface ItemsRaw {
  [key: string]: number;
}
