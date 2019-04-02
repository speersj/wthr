import React, { ReactNode } from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  position: relative;
  min-height: 100vh;
`;

export default function PageLayout({ children }: { children: ReactNode }) {
  return <StyledDiv>{children}</StyledDiv>;
}
