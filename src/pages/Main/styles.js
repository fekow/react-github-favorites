import styled, { keyframes, css } from 'styled-components';

export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    border: 1px solid ${props => (!props.error ? '#eee' : '#ff6b6b')};
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;

    transition: border 0.25s ease-out;
  }
`;

const rotate = keyframes`
from {
  transform: rotate(0deg);
}
to{
  transform: rotate(360deg);
}
`; // cria um rotate basico usando outro module keyframes

export const SubmitButton = styled.button.attrs(props => ({
  type: 'submit', // manda atributos padrao pra esse componente
  disabled: props.loading, // tenho acesso as props fazendo uam funcao dentro do attrs
}))`
  background: #7159c1;
  border: 0;
  padding: 0 15px;
  margin-left: 10px;
  border-radius: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${props =>
    props.loading &&
    css`
      svg {
        animation: ${rotate} 1.5s linear infinite;
      }
    `}
`; // se for verdadeira aplica css atravez desse outro module CSS...

export const List = styled.ul`
  list-style: none;
  margin-top: 30px;
  li {
    padding: 15px 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    & + li {
      /* aplica estilização em todos menos primeiro */
      border-top: 1px solid #eee;
    }

    a {
      color: #7159c1;
      text-decoration: none;
    }
  }
`;
