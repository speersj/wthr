import React, { FunctionComponent, ReactNode } from "react";
import { Box } from "rebass";

interface Props {
  children: ReactNode;
}

const Footer: FunctionComponent<Props> = ({ children }) => (
  <Box
    width={1}
    css={{
      bottom: 0,
      height: "4rem",
      padding: "1rem",
      position: "absolute",
      textAlign: "center",
    }}
  >
    {children}
  </Box>
);

export default Footer;
