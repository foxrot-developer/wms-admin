import styled from "styled-components";

const Col = styled.div`
    width: 30%;
    border-radius: 10px;
    background: #fff;
    padding: 30px;
    box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px,
     rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, 
     rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;
     @media (max-width: 768px){
        width: 100%;
        margin: 20px 0px ;
     }
     :hover{
         background: var(--blue);
         color: #fff;
         .total-count a{
            color: #fff;
         }
     }
     
     .icon-heading{
         h3{
             font-size: 20px;
         }
         span{
             margin-right: 5px;
         }
     }
     .total-count {
         text-align: right;
         h2{
            font-size: 40px;
         }
        a{
            color: var(--blue);
            font-weight: 500;
            text-decoration: none;

            :hover{
                text-decoration: underline;
            }
        }
     }
`;

export default  Col