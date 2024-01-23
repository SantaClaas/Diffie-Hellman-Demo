/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";

import "./index.css";
import Complete from "./Complete";
import Simple from "./Simple";
import Rsa from "./Rsa";

render(
  () => (
    <Router>
      <Route path="/" component={Simple} />
      <Route path="/rsa" component={Rsa} />
      <Route path="/complete" component={Complete} />
      <Route path="/simple" component={Simple} />
    </Router>
  ),
  document.body
);
