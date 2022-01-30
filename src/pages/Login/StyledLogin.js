import styled from "styled-components";

const Container = styled.div`
    height: 100vh;
    width: 100%;
    background-color: var(--light-grey);
`;

const ContentWrapper = styled.div`
    width: 800px;
    background-color: #fff;
    border-radius: 10px;
    height: 60vh;
    box-shadow: var(--b-shadow);
    @media (max-width: 768px){
        flex-direction: column-reverse;
        height: 80%;
        justify-content: center;
        width: 95%;
    }
`;
const LeftSection = styled.div`
    width: 50%;
    padding: 40px;
    h3{
        font-weight: 700;
        text-transform: uppercase;
    }
    @media (max-width: 768px){  
        width: 100%;
        height: 50%;
    }
`;
const RightSection = styled.div`
    width: 50%;
    background: var(--blue);
    padding: 40px;
    border-radius: 0px 10px 10px 0px;
    h3{
        text-transform: uppercase;
        text-shadow: 3px 4px 7px rgba(81,67,21,0.8);
        margin-bottom: 10px;
        font-size: 35px;
    }
    @media (max-width: 768px){  
        width: 100%;
        height: 50%;
        border-radius: 10px 10px 0px 0px;
    }
`;
const LoginForm = styled.div`
    width: 80%;

    .input-field{
        display: block;
        border: 0px;
        background-color: var(--light-grey);
        outline: none;
        margin: 10px 0px;
        width: 100%;
        height: 40px;
        border-radius: 10px;
        padding:  0px 15px;
        position: relative;
    }
    .invalid{
        background: #ff00003b;
    }

    .error-msg{
        color: red;
        font-weight: 600;
        font-size: 12px;
    }
    .input-field[type="submit"]{
        background-color: var(--blue);
        color: white;
        text-transform: uppercase;
        transition: .3s;
        :hover{
        background: var(--hover-blue);
        }
    } 
`;

export {Container, ContentWrapper, LeftSection, RightSection, LoginForm}