import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { api } from "../../services/api";
import { useAuth } from "../auth";
interface product {
  id: number;
  userId?: number;
  name: string;
  category: string;
  price: number;
  img: string;
  quantity?: number;
}

interface ProductsContextData {
  products: product[];
  filteredProducts: product[];
  cart: product[];
  filterProducts: (text: string) => void;
  addToCart: (product: product) => void;
  removeFromCart: (id: number) => void;
  // changeNumberOfProducts:(product:product, add: boolean) => void
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
  const [filteredProducts, setFilteredProducts] = useState<product[]>([]);
  const [cart, setCart] = useState<product[]>([]);

  const { accessToken } = useAuth();
  useEffect(() => {
    api
      .get("/products")
      .then((response) => {
        setProducts(response.data);
        getCart();
      })
      .catch((err) => console.log(err));
  }, []);

  const filterProducts = (text: string) => {
    api
      .get(`/products/?category=${text}`)
      .then((response) => setFilteredProducts(response.data))
      .catch((err) => console.log(err));
  };

  const getCart = () => {
    api
      .get("/cart", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => setCart(response.data))
      .catch((error) => console.log(error));
  };

  const addToCart = (product: product) => {
    api
      .post("/cart", product, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        getCart();
      })
      .catch((error) => console.log(error));
  };

  // const changeNumberOfProducts = (product: product, add: boolean) => {
  //   if (add) {
  //     // const AddProduct = (product.quantity += 1);
  //     api.patch(`/cart/${product.id}`, product, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     })
  //     .then((response) => {
  //       getCart();
  //     })
  //     .catch((error) => console.log(error));

  //     {
  //       // const AddProduct = (product.quantity += 1);
  //     api.patch(`/cart/${product.id}`, product, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //       },
  //     })
  //     .then((response) => {
  //       getCart();
  //     })
  //     .catch((error) => console.log(error));
  //     }
  //   }

  const removeFromCart = (productId: number) => {
    api
      .delete(`/cart/${productId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(() => {
        getCart();
      })
      .catch((error) => console.log(error));
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        filteredProducts,
        cart,
        filterProducts,
        addToCart,
        removeFromCart,
        // changeNumberOfProducts
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export { useProductsAndCart, ProductProvider };
