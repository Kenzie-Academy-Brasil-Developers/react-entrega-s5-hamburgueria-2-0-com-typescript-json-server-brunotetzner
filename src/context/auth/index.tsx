import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { api } from "../../services/api";
import { useHistory } from "react-router";

interface User {
  name: string;
  id: number;
  email: string;
}

interface AuthContextData {
  user: User;
  accessToken: string;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signUp: (credintials: SignUpCredentials) => Promise<void>;
  logOut: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}
interface AuthState {
  accessToken: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface SignUpCredentials {
  email: string;
  password: string;
  name: string;
}
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider ");
  }

  return context;
};

const AuthProvider = ({ children }: AuthProviderProps) => {
  const history = useHistory();
  const [data, setData] = useState<AuthState>(() => {
    const accessToken = localStorage.getItem("@Hamburgueria:accessToken");
    const user = localStorage.getItem("@Hamburgueria:user");

    if (accessToken && user) {
      return { accessToken, user: JSON.parse(user) };
    }
    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    const response = await api.post("/login", { email, password });

    const { accessToken, user } = response.data;

    localStorage.setItem("@Hamburgueria:accessToken", accessToken);
    localStorage.setItem("@Hamburgueria:user", JSON.stringify(user));
    setData({ accessToken, user });
    history.push("/store");
  }, []);

  const signUp = useCallback(
    async ({ email, password, name }: SignUpCredentials) => {
      const responses = await api.post("/register", { email, password, name });

      const { accessToken, user } = responses.data;

      localStorage.setItem("@Hamburgueria:accessToken", accessToken);
      localStorage.setItem("@Hamburgueria:user", JSON.stringify(user));
      setData({ accessToken, user });
      history.push("/store");
    },
    []
  );

  const logOut = () => {
    localStorage.removeItem("@Hamburgueria:accessToken");
    localStorage.removeItem("@Hamburgueria:user");
    setData({} as AuthState);
    history.push("/");
  };
  return (
    <AuthContext.Provider
      value={{
        signIn,
        signUp,
        accessToken: data.accessToken,
        user: data.user,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, useAuth };
