export interface Posts {
  _id: string;
  title: string;
  mainImage: object;
  slug: {
    current: string;
  };
  author: {
    image: {};
    name: string;
  };
}
