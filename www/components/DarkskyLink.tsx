import React, { RefObject } from "react";
import { Link, LinkProps } from "rebass";
import styled from "styled-components";

const StyledLink = styled(Link)`
  text-decoration: none;

  :hover {
    color: black;
    background-color: yellow;
  }
`;

const DarkSkyLink = (props: RefObject<LinkProps>) => {
  return (
    <StyledLink
      m={1}
      p={2}
      {...props}
      target="_blank"
      href="https://darksky.net/poweredby/"
      rel="noopener noreferrer"
    >
      Powered by Dark Sky
    </StyledLink>
  );
};

export default DarkSkyLink;
