import React from "react";

import { render, cleanup } from "@testing-library/react";

import Appointment from '../Ap'

afterEach(cleanup);

it("renders without crashing", () => {
  render(<Application />);
});


