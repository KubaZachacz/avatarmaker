import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { InfoButton, LightModeButton, LanguageSelect } from "./TopMenu";

const outlinedIconPrefix = "far";
const filledIconPrefix = "fas";

const dataPrefix = "data-prefix";

test("InfoButton toggles icon on click", () => {
  let isInfo = false;
  const onOpenInfo = () => (isInfo = true);

  const { container } = render(<InfoButton {...{ isInfo }} />);
  const svg = container.querySelector("svg");

  expect(svg.getAttribute(dataPrefix)).toBe(outlinedIconPrefix);

  const button = container.querySelector("button");

  fireEvent.click(button);

  expect(svg.getAttribute(dataPrefix)).toBe(filledIconPrefix);
});
