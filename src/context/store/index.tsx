import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  Children,
} from "react";
import { api } from "../../services/api";
import { AxiosResponse } from "axios";
interface product {
  id?: number;
  userId?: number;
  productId: number;
  name: string;
  category: string;
  price: number;
  img: string;
}

interface ProductsContextData {
  products: product[];
  cart: product[];
  getProducts: () => Promise<void>;
  getFilteredProducts: (category: string) => Promise<void>;
}

interface ProductProviderProps {
  children: ReactNode;
}
const ProductsContext = createContext<ProductsContextData>(
  {} as ProductsContextData
);

const useProductsAndCart = () => {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error(
      "useProductsAndCart  must be used within an ProductsProvider"
    );
  }
  return context;
};

const ProductProvider = ({ children }: ProductProviderProps) => {
  const [products, setProducts] = useState<product[]>([]);
  const [cart, setCart] = useState<product[]>([]);

  const getProducts = useCallback(async () => {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const getFilteredProducts = useCallback(async (category: string) => {
    try {
      const response = await api.get("/products");
      setProducts(response.data);
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <ProductsContext.Provider
      value={{
        getFilteredProducts,
        getProducts,
        products,
        cart,
      }}
    >
      {Children}
    </ProductsContext.Provider>
  );
};

// export { useProductsAndCart, ProductProvider };

// const getFilteredProducts = useCallback(async (category: string) => {
// if (!category) {
//   const response = await api.get("/products");
//   setProducs(response);
// }

//   }, []);
// return (
//   <ProductsContext.Provider value={{}}>{Children}</ProductsContext.Provider>
// );
