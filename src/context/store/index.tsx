import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { api } from "../../services/api";
import { useAuth } from "../auth";
import { toast } from "react-hot-toast";
interface product {
  id: number;
  userId?: number;
  name: string;
  category: string;
  price: number;
  img: string;
  quantity: number;
}

interface ProductsContextData {
  products: product[];
  filteredProducts: product[];
  cart: product[];
  filterProducts: (text: string) => void;
  addToCart: (product: product) => void;
  removeFromCart: (id: number) => void;
  changeNumberOfProducts: (product: product) => void;
  removeOneProduct: (product: product) => void;
  addOneProduct: (product: product) => void;
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
    const names = cart.map((product) => product.name);
    if (!names.includes(product.name)) {
      api
        .post("/cart", product, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((_) => {
          toast.success("Adicionado ao carrinho");
          getCart();
        })
        .catch((_) =>
          toast.error("Erro ao adicionar. Tente novamente ou volte mais tarde")
        );
    } else {
      toast.error(
        "Já adicionado! Ajuste as unidades que deseja do produto no carrinho"
      );
    }
  };

  const changeNumberOfProducts = (product: product) => {
    api
      .patch(`/cart/${product.id}`, product, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        getCart();
      })
      .catch((error) => console.log(error));
  };

  const removeFromCart = (productId: number) => {
    api
      .delete(`/cart/${productId}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then(() => {
        getCart();
        toast.success("Produto removido do carrinho");
      })
      .catch((error) => console.log(error));
  };

  const addOneProduct = (product: product) => {
    product.quantity += 1;
    changeNumberOfProducts(product);
  };

  const removeOneProduct = (product: product) => {
    if (product.quantity === 1) {
      removeFromCart(product.id);
    } else {
      product.quantity -= 1;
      changeNumberOfProducts(product);
    }
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
        changeNumberOfProducts,
        removeOneProduct,
        addOneProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export { useProductsAndCart, ProductProvider };
