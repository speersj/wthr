import React from "react";
import { render } from "react-testing-library";
import Icon from "../../components/Icon";

describe("Icon", () => {
  it("renders the title attribute", () => {
    render(<Icon name="test" />).getByTitle("test");
  });

  it("renders an <i> tag", () => {
    const el = render(<Icon name="test" />).getByTitle("test");
    expect(el.tagName).toEqual("I");
  });

  it("renders with the correct role (img)", () => {
    render(<Icon name="test" />).getByRole("img");
  });

  it("renders the correct classnames", () => {
    const el = render(<Icon name="test" />).getByTitle("test");
    expect(el.className).toEqual("wi wi-test");
  });

  it("outputs correct html", () => {
    expect(render(<Icon name="test" />).getByTitle("test")).toMatchSnapshot();
  });
});
