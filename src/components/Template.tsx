import React from "react";
import styled, { StyledComponent } from "styled-components";

interface Props {
  children: JSX.Element[];
}

const TemplateBlock = styled.div`
  width: 600px;
  height: 700px;
  background: green;
  margin-left: auto;
  margin-right: auto;
  margin-top: 6rem;
`;

function Template({ children }: Props) {
  return <TemplateBlock>{children}</TemplateBlock>;
}

export default Template;
