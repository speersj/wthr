import React, { ReactNode } from "react";
import styled from "styled-components";
import { Flex } from "rebass";

const StyledFlex = styled(Flex)`
  width: 100%;
  min-height: 100vh;
`;

export default function SplashScreen({ children }: { children: ReactNode }) {
  return (
    <StyledFlex alignItems="center" justifyContent="center">
      {children}
    </StyledFlex>
  );
}
