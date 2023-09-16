import styled from 'styled-components';

export const Container = styled.div<{$active: boolean}>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({$active}) => $active ? '#fff' : '#1E4147'};
  transition: all 0.5s ease;
`;

export const Button = styled.button<{$active: boolean}>`
  background: transparent;
  border-radius: 3px;
  border: 2px solid ${({$active}) => $active ? '#1E4147' : '#fff'};
  color: ${({$active}) => $active ? '#1E4147' : '#fff'};
  margin: 0 1em;
  padding: 0.25em 1em;
  transition: all 0.5s ease;
  width: 10rem;
  min-width: 5rem;
  &:hover {
    cursor: pointer;
  }
`;