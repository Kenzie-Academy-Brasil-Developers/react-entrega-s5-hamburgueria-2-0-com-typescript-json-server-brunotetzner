import { Switch } from "react-router-dom";
import { Route } from "./route";
import { Login } from "../pages/login";
import { SignUp } from "../pages/SignUp";
import { Store } from "../pages/Store";

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route path="/store" component={Store} isPrivate />
    </Switch>
  );
};
