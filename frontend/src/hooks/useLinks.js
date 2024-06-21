import useUserInfo from "./useUserInfo";
import {
  Category,
  CurrencyExchange,
  History,
  Person,
  ProductionQuantityLimits,
  Satellite,
} from "@mui/icons-material";

export const links = [
  {
    link: "/products",
    name: "منتجات",
    icon: ProductionQuantityLimits,
    isEmployeeVisible: true,
  },
  {
    link: "/categories",
    name: "الآصناف",
    icon: Category,
    isEmployeeVisible: true,
  },
  {
    link: "/sales",
    name: "مبيعات",
    icon: Satellite,
  },

  {
    link: "transactions",
    name: "المعاملات",
    icon: CurrencyExchange,
    isEmployeeVisible: true,
  },

  {
    link: "actions",
    name: "أجراءات",
    icon: History,
    isEmployeeVisible: true,
  },
  {
    link: "users",
    name: "المستخدمين",
    icon: Person,
    isEmployeeVisible: false,
  },
];

const useLinks = () => {
  const { isEmployee } = useUserInfo();
  return {
    links: links.filter(
      (l) => (l.isEmployeeVisible && isEmployee) || !isEmployee
    ),
  };
};

export default useLinks;
