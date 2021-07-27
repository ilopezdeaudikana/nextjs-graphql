import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 5rem;
  color: #444;
`;

export const Section = styled.div`
  max-width: ${(props) => props.max};
  > * {
    margin: 1rem 0;
  }
`;
