import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { InfoButton, LightModeButton, LanguageSelect } from "./TopMenu";

const outlinedIconPrefix = "far";
const filledIconPrefix = "fas";

const dataPrefix = "data-prefix";

test("InfoButton toggles icon on click", () => {
  let isInfo = false;
  const onOpenInfo = () => (isInfo = true);

  const { container, rerender } = render(
    <InfoButton {...{ isInfo, onOpenInfo }} />
  );
  const svg = container.querySelector("svg");

  expect(svg.getAttribute(dataPrefix)).toBe(outlinedIconPrefix);

  const button = container.querySelector("button");

  fireEvent.click(button);

  rerender(<InfoButton {...{ isInfo, onOpenInfo }} />);

  expect(svg.getAttribute(dataPrefix)).toBe(filledIconPrefix);
});

test("LightModeButton toggles icon on click", () => {
  let isDarkMode = false;
  const onToggleDarkMode = () => (isDarkMode = true);

  const { container, rerender } = render(
    <LightModeButton {...{ onToggleDarkMode, isDarkMode }} />
  );
  const svg = container.querySelector("svg");

  expect(svg.getAttribute(dataPrefix)).toBe(outlinedIconPrefix);

  const button = container.querySelector("button");

  fireEvent.click(button);

  rerender(<LightModeButton {...{ onToggleDarkMode, isDarkMode }} />);

  expect(svg.getAttribute(dataPrefix)).toBe(filledIconPrefix);
});

test("LanguageSelect has matching language value", () => {
  let lang = "en";

  const { getByText, getAllByRole, getByTestId, container } = render(
    <LanguageSelect {...{ lang }} />
  );
  const selectNode = getByTestId("lang-select");
  const selectButton = getAllByRole("button")[0];
  expect(selectButton).not.toBeNull();
  expect(selectNode).not.toBeNull();

  const input = container.querySelector("input");
  expect(input.getAttribute("value")).toBe(lang);
});
