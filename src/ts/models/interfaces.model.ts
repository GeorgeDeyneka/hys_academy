interface SlickDataType {
  id?: number;
  rewievs: string;
  title: string;
  category: string;
  imageUrl: string;
  avatarUrl: string;
  price: { actually: string; old: string };
  raiting: string;
}

interface NativeDataType {
  bgColor?: string;
  id?: number;
  title: string;
  url: string;
}

interface CustomerDataType {
  id?: number;
  firstParagraph: string;
  secondParagraph: string;
  author: string;
  imageUrl: string;
  bgColor: string;
  quoteColor: string;
}

interface PaginatorDataType {
  id?: number;
  title: string;
  imageUrl: string;
  avatarUrl: string;
  category: string;
  linkText: string;
}

interface ValidateMessagesType {
  "form-name": string;
  "form-phone": string;
  "form-email": string;
}

interface FormDataType {
  name?: string;
  phone?: string;
  email?: string;
}

interface ISlider {
  initSlider(): void;
}

export {
  SlickDataType,
  CustomerDataType,
  PaginatorDataType,
  NativeDataType,
  ValidateMessagesType,
  FormDataType,
  ISlider,
};
