import React, { ReactNode } from "react";
import styled from "styled-components";

const StyledDiv = styled.div`
  padding-bottom: 4rem;
`;

export default function ContentLayout({ children }: { children: ReactNode }) {
  return <StyledDiv>{children}</StyledDiv>;
}
