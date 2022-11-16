interface slickDataType {
  id?: number;
  rewievs: string;
  title: string;
  category: string;
  imageUrl: string;
  avatarUrl: string;
  price: { actually: string; old: string };
  raiting: string;
}

interface nativeDataType {
  bgColor?: string;
  id?: number;
  title: string;
  url: string;
}

interface customerDataType {
  id?: number;
  firstParagraph: string;
  secondParagraph: string;
  author: string;
  imageUrl: string;
  bgColor: string;
  quoteColor: string;
}

interface paginatorDataType {
  id?: number;
  title: string;
  imageUrl: string;
  avatarUrl: string;
  category: string;
  linkText: string;
}

interface validateMessagesType {
  "form-name": string;
  "form-phone": string;
  "form-email": string;
}

interface formDataType {
  name?: string;
  phone?: string;
  email?: string;
}

interface ISlider {
  initSlider(): void;
}

export {
  slickDataType,
  customerDataType,
  paginatorDataType,
  nativeDataType,
  validateMessagesType,
  formDataType,
  ISlider,
};
