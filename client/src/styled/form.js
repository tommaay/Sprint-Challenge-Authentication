import styled from 'styled-components';

export const Form = styled.form`
   width: 50%;
   margin: 0 auto;
   margin-top: 10rem;
   padding: 20px;
   border: 1px solid gray;
   border-radius: 5px;
   display: flex;
   flex-direction: column;
   align-items: center;
`;

export const Label = styled.label`
   font-size: 2rem;
   margin: 15px 0;
`;

export const Input = styled.input`
   width: 80%;
   font-size: 1.5rem;
   margin-bottom: 10px;
   border: 1px solid lightgray;
   border-radius: 5px;
   text-align: center;
   padding: 10px;
`;

export const Button = styled.button`
   width: 150px;
   font-size: 1.8rem;
   border: 1px solid gray;
   border-radius: 5px;
   margin-top: 10px;
`;
