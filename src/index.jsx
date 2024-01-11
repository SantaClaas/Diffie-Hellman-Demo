/* @refresh reload */
import { render } from "solid-js/web";
import { Router, Route } from "@solidjs/router";

import "./index.css";
import Complete from "./Complete";

render(
  () => (
    <Router>
      <Route path="/" component={Complete} />
    </Router>
  ),
  document.body
);
