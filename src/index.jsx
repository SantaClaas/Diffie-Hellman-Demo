/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";

import "./index.css";
import Complete from "./Complete";
import Test from "./Test";

render(
  () => (
    <Router>
      <Route path="/" component={Complete} />
      <Route path="/test" component={Test} />
    </Router>
  ),
  document.body
);
