import styled from "styled-components";

export const Paragraph = styled.p`
  letter-spacing: 0.1em;
  font-size: 12px;
  color: #a3a9ac;
  font-weight: ${props => props.bold ? "bold" : "500"};
`;