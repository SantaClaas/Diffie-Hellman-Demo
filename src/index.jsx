/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";

import "./index.css";
import Complete from "./Complete";
import Simple from "./Simple";

render(
  () => (
    <Router>
      <Route path="/complete" component={Complete} />
      <Route path="/simple" component={Simple} />
    </Router>
  ),
  document.body
);
