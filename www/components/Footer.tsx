import React, { ReactNode } from "react";
import { Box } from "rebass";

const Footer = ({ children }: { children: ReactNode }) => (
  <Box
    width={1}
    bg="bg"
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
