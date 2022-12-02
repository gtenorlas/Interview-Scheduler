import React from "react";

import { render, cleanup, wait } from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

it("renders without crashing", () => {
  render(<Application />);
});
