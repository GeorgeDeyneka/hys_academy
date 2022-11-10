import {
  customerDataType,
  nativeDataType,
  paginatorDataType,
  slickDataType,
  validateMessagesType,
} from "./types/types";

const DATA_PAGINATOR: paginatorDataType[] = [
  {
    id: 1,
    title: "First: Registration",
    category: "DESIGN",
    linkText: "Read Now",
    avatarUrl: "./assets/images/teacher-one.png",
    imageUrl:
      "https://img.freepik.com/free-photo/group-people-working-out-business-plan-office_1303-15873.jpg?w=900&t=st=1665092868~exp=1665093468~hmac=b60492185f528b22656dad556ffcde3e90c7adeea094cb43476af4a961fa786e",
  },
  {
    id: 2,
    title: "Second: The Meeting with mentors",
    category: "DESIGN",
    linkText: "Read Now",
    avatarUrl: "./assets/images/teacher-two.png",
    imageUrl:
      "https://img.freepik.com/free-photo/two-businessmen-pointing-laptop-screen-while-discussing_158595-5324.jpg?w=900&t=st=1665093107~exp=1665093707~hmac=294dd6178a144ac531577b404e5d1e8c99cd56306209fb70f3faae378ce71b9a",
  },
  {
    id: 3,
    title: "Third: The Starting of courses",
    category: "DESIGN",
    linkText: "Read Now",
    avatarUrl: "./assets/images/teacher-three.png",
    imageUrl:
      "https://img.freepik.com/free-photo/close-up-male-hands-using-laptop-home_1150-790.jpg?t=st=1665091933~exp=1665092533~hmac=ef2ca3dd3c866bd0fb06ef7d4f1a34d952e2cada72eed4edd8a3327aeae8c822",
  },
  {
    id: 4,
    title: "Fourth: The Final project",
    category: "DESIGN",
    linkText: "Read Now",
    avatarUrl: "./assets/images/teacher-four.png",
    imageUrl:
      "https://img.freepik.com/free-photo/close-up-businessman-with-digital-tablet_1098-549.jpg?w=900&t=st=1665092658~exp=1665093258~hmac=2fd6d801df2befadb77c333436e2ca319bae5123d3a969bc2dc01fab6f8a0ea2",
  },
  {
    id: 5,
    title: "Fifth: The Interview",
    category: "DESIGN",
    linkText: "Read Now",
    avatarUrl: "./assets/images/teacher-five.png",
    imageUrl:
      "https://img.freepik.com/free-photo/close-up-two-business-people-shaking-hands-while-sitting-working-place_1150-1816.jpg?w=900&t=st=1665092777~exp=1665093377~hmac=6d6a8eb7c1a8eb4fd40cae9ae2a2a951088c34d8d9d50a9fcbdf1f6c1f034433",
  },
];

const DATA_SLICK_SLIDER: slickDataType[] = [
  {
    id: 1,
    title: "Learning Photoshop",
    category: "Design",
    avatarUrl: "./assets/images/teacher-one.png",
    imageUrl: "./assets/images/learning-photoshop.jpg",
    price: {
      actually: "$349",
      old: "$415",
    },
    rewievs: "(23)",
    raiting: "4.5",
  },
  {
    id: 2,
    title: "Learning HTML/CSS and JavaScript",
    category: "Development",
    avatarUrl: "./assets/images/teacher-four.png",
    imageUrl: "./assets/images/learning-html.jpg",
    price: {
      actually: "$319",
      old: "$390",
    },
    rewievs: "(28)",
    raiting: "4.7",
  },
  {
    id: 3,
    title: "3D Modeling",
    category: "Modeling",
    avatarUrl: "./assets/images/teacher-two.png",
    imageUrl: "./assets/images/modeling.jpg",
    price: {
      actually: "$459",
      old: "$630",
    },
    rewievs: "(9)",
    raiting: "4.2",
  },
  {
    id: 4,
    title: "Learning Graphic Design",
    category: "Design",
    avatarUrl: "./assets/images/teacher-one.png",
    imageUrl: "./assets/images/laptop-graphic.jpg",
    price: {
      actually: "$379",
      old: "$500",
    },
    rewievs: "(17)",
    raiting: "5",
  },
  {
    id: 5,
    title: "C++ Programming",
    category: "Development",
    avatarUrl: "./assets/images/teacher-four.png",
    imageUrl: "./assets/images/c-programming.jpg",
    price: {
      actually: "$429",
      old: "$580",
    },
    rewievs: "(14)",
    raiting: "4.0",
  },
  {
    id: 6,
    title: "Learning UI/UX",
    category: "Design",
    avatarUrl: "./assets/images/teacher-three.png",
    imageUrl: "./assets/images/two-girls-studying-customers.jpg",
    price: {
      actually: "$229",
      old: "$350",
    },
    rewievs: "(20)",
    raiting: "4.1",
  },
];

const DATA_NATIVE_SLIDER: nativeDataType[] = [
  {
    id: 1,
    title: "Graphic Design",
    bgColor: "var(--blue-study-bg)",
    url: "./assets/images/tablet-design.jpg",
  },
  {
    id: 2,
    title: "Web Design",
    bgColor: "var(--yellow-study-bg)",
    url: "./assets/images/laptop-graphic.jpg",
  },
  {
    id: 3,
    title: "Business marketing",
    bgColor: "var(--purple-study-bg)",
    url: "./assets/images/man-writing.jpg",
  },
  {
    id: 4,
    title: "Programming",
    bgColor: "var(--red-study-bg)",
    url: "./assets/images/men-make-a-list.jpg",
  },
  {
    id: 5,
    title: "Modeling",
    bgColor: "var(--lightgreen-btn-pressed)",
    url: "./assets/images/modeling.jpg",
  },
  {
    id: 6,
    title: "Engineering",
    bgColor: "var(--blue-point)",
    url: "./assets/images/c-programming.jpg",
  },
];

const DATA_CUSTOMERS_PAGINATOR: customerDataType[] = [
  {
    id: 1,
    firstParagraph:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque",
    secondParagraph:
      "Laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    author: "Stephanie Magion",
    imageUrl: "./assets/images/two-girls-studying-customers.jpg",
    bgColor: "var(--blue-customers-card)",
    quoteColor: "var(--purple-quote)",
  },
  {
    id: 2,
    firstParagraph:
      "- Give me the stone. - It's in the case. - What? - It's in the case!",
    secondParagraph:
      "- You put the stone in the case? Then open the case and give me the stone. - The only man who knew the combination you just shot.",
    author: "Boris Blade",
    imageUrl: "./assets/images/modeling.jpg",
    bgColor: "var(--gray-basic-text)",
    quoteColor: "var(--gray-basic-text)",
  },
  {
    id: 3,
    firstParagraph:
      " - We should have shotguns for this kind of deal. - How many up there?",

    secondParagraph:
      " - That's countin' our guy? - Not sure. - So that means there could be up to five guys up there? - It's possible. - We should have fuckin' shotguns.",
    author: "Vincent Vega",
    imageUrl: "./assets/images/learning-html.jpg",
    bgColor: "var(--darkpurple-customer-square)",
    quoteColor: "var(--darkpurple-customer-square)",
  },
  {
    id: 4,
    firstParagraph:
      " - I know why you're here, Neo. I know what you've been doing...",
    secondParagraph:
      " - Why you hardly sleep, why you live alone, and why night after night, you sit by your computer. You're looking for him.",
    author: "Neo from Matrix",
    imageUrl: "./assets/images/c-programming.jpg",
    bgColor: "var(--darkblue-customer-square)",
    quoteColor: "var(--darkblue-customer-square)",
  },
  {
    id: 5,
    firstParagraph:
      " - I've been a poor man and I've been a rich man... And I choose rich every time!",
    secondParagraph:
      " - Get Off The Phone, FBI! - Was all this legal? Absolutely not, but we were making more money than we knew what to do with.",
    author: "Jordan Belfort",
    imageUrl: "./assets/images/learning-photoshop.jpg",
    bgColor: "var(--black-customer-square)",
    quoteColor: "var(--black-customer-square)",
  },
];

const VALIDATE_MESSAGES: validateMessagesType = {
  "form-email":
    "Expected an your e-mail address (For example: user@gmail.com).",
  "form-phone":
    "Your number is too short or has letters. Please, correct this.",
  "form-name":
    "Your name is too short or has numbers or other symbols. Please, correct this.",
};

export {
  DATA_PAGINATOR,
  DATA_SLICK_SLIDER,
  DATA_NATIVE_SLIDER,
  DATA_CUSTOMERS_PAGINATOR,
  VALIDATE_MESSAGES,
};
