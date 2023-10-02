import styled from 'styled-components';

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;

  
  button {
    height: 30px;
    margin-block: 20px;
    border-radius: 6px;
    border: none;
    font-size: 18px;
    font-weight: 700;
   

    &:hover,
    &:focus {
      background-color: gray;
    }
  }
`;