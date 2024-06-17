type DictType = {
  [key: string]: { [key: string]: string };
};

type LocalDict = {
  [key: string]: string;
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

type ItemWithoutReviews = {
  id: number;
  title: string;
  description: { text: string };
  price: number;
  brand: string;
  category: string;
  caliber: string;
  action: string;
  thumbnail: string;
  images: string[];
  created_at: string;
};

interface ItemWithReviews extends ItemWithoutReviews {
  reviews: number;
  stars: number;
}

interface CartItem extends Item {
  count: number;
}

interface ItemsRaw {
  [key: string]: number;
}

// USERS

type User = {
  userInfo: {
    created_at: string;
    email: string;
    email_verified: boolean;
    family_name: string;
    given_name: string;
    identities: [[Object]];
    idp_tenant_domain: string;
    name: string;
    nickname: string;
    username?: string;
    picture: string;
    updated_at: string;
    user_id: string;
    last_ip: string;
    last_login: string;
    logins_count: number;
    user_metadata?: {
      username?: string;
      firstName?: string;
      familyName?: string;
      picture?: string;
    };
  };
  userRoles: [
    {
      id: string;
      name: string;
      description: string;
    }
  ];
};

//ITEMS

type Review = {
  id: number;
  product_id: number;
  author_id: string;
  author_username: string;
  author_avatar: string;
  review: { text: string } | null;
  star: number;
  created_at: string;
};

type ItemsWithReview = {
  [key: number]: {
    id: number;
    title: string;
    description: { text: string };
    price: number;
    brand: string;
    category: string;
    caliber: string;
    action: string;
    thumbnail: string;
    images: string[];
    created_at: string;
    reviews: number;
    stars: number;
  };
};
