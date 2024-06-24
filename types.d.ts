type DictType = {
  [key: string]: { [key: string]: string };
};

type LocalDict = {
  [key: string]: string;
};

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

interface Item {
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

//BLOG

type BlogpostHydrated = {
  id: number;
  author_id: string;
  author_username: string;
  author_avatar: string;
  title: string;
  blogpost: { text: string };
  thumbnail: string;
  created_at: string;
  likes: number;
  dislikes: number;
  userLiked?: boolean;
  reactionID?: number;
};

type Blogpost = {
  id: number;
  author_id: string;
  author_username: string;
  author_avatar: string;
  title: string;
  blogpost: { text: string };
  thumbnail: string;
  created_at: string;
};

type Reaction = {
  id: number;
  user_auth_id: string;
  blogpost_id: number;
  liked: boolean | null;
};

//ORDERS
type OrderInfo = {
  userID: string | undefined;
  orderInfo: {
    total: number | null;
    address: Stripe.Address | null | undefined;
    userMail: string | null;
    items: {
      itemName: string;
      itemPrice: string;
      itemCount: number | null;
      itemThumbnail: string | undefined;
    }[];
  };
};
