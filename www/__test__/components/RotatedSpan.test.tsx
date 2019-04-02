import React from "react";
import { render, cleanup } from "react-testing-library";
import "jest-dom/extend-expect";
import RotatedSpan from "../../components/RotatedSpan";

afterEach(cleanup);

describe("RotatedSpan", () => {
  it("renders a span that is rotated", () => {
    const { getByTestId } = render(<RotatedSpan angle={180}>!</RotatedSpan>);
    const { outerHTML } = getByTestId("rotated-span-180");
    expect(outerHTML).toContain("transform: rotate(180deg);");
  });

  it("outputs correct html", () => {
    const { container } = render(<RotatedSpan angle={45}>🎉</RotatedSpan>);
    expect(container.firstChild).toMatchInlineSnapshot(`
<span
  data-testid="rotated-span-45"
  style="display: inline-block; transform: rotate(45deg);"
>
  🎉
</span>
`);
  });
});
