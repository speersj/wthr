import React from "react";
import { Link } from "rebass";
import styled from "styled-components";

const StyledLink = styled(Link)`
  text-decoration: none;

  :hover {
    color: black;
    background-color: yellow;
  }
`;

const DarkSkyLink = (props: any) => {
  return (
    <StyledLink
      {...props}
      href="https://darksky.net/poweredby/"
      m={1}
      p={2}
      target="_blank"
      rel="noopener noreferrer"
    >
      Powered by Dark Sky
    </StyledLink>
  );
};

export default DarkSkyLink;
