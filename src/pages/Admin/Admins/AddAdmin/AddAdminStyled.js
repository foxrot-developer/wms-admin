import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    background: var(--light-grey);
`;
const ContentWrap = styled.div`
    display: flex;
    width: 100%;
    .add-btn{
        display: flex;
        justify-content: end;
    }
    .add-btn a{
        padding: 8px;
        margin-bottom: 10px;
    }
    .action-btns{
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        .edit-btn{
            fill: green;
        }
        .del-btn{
            fill: red;
        }
    }
    .form-container{
        .form{
            background: #fff;
            padding: 40px;
            width: 60%;
            margin: auto;
            box-shadow: var(--b-shadow);
            @media (max-width: 768px){
                width: 100%;
                padding: 20px;
            }
        }
    }
    .invalid{
        background: #ff00003b;
    }

    .error-msg{
        color: red;
        font-weight: 600;
        font-size: 12px;
    }
`;
export {Container, ContentWrap}