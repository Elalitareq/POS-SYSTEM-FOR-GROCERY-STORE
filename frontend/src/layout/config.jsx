import {
  Category,
  CurrencyExchange,
  History,
  Person,
  ProductionQuantityLimits,
} from "@mui/icons-material";

export const links = [
  {
    link: "/products",
    name: "منتجات",
    icon: ProductionQuantityLimits,
  },
  {
    link: "/categories",
    name: "فئات",
    icon: Category,
  },

  {
    link: "transactions",
    name: "المعاملات",
    icon: CurrencyExchange,
  },

  {
    link: "actions",
    name: "أجراءات",
    icon: History,
  },
  {
    link: "users",
    name: "المستخدمين",
    icon: Person,
  },
];
