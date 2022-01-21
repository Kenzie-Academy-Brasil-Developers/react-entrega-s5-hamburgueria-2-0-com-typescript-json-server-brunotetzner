import { Switch, Route } from "react-router-dom";
import { Login } from "../pages/login";
import { Signup } from "../pages/SignUp";
import { Store } from "../pages/Store";

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/store" component={Store} />
    </Switch>
  );
};
