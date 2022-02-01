import styled from "styled-components";

const AdSidebar = styled.div`
    height: 100vh;
    background-color: var(--blue);
    min-width: 25%;
    position: relative;
`;

const SidebarTop = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    padding: 20px;
    border-bottom: 1px solid #95959573;
    h4{
        color: white;
    }
    .hamburger svg{
        fill: #fff;
    }
`;

const SidebarMenu = styled.div`
margin-top: 20px;
    ul{
        padding: 0px;
        a{
            color: #fff;
            text-decoration: none;
                
            }
            li{
                list-style-type: none;
                padding: 8px 20px;
                display: flex;
                align-items: center;
                font-size: 18px;
                font-weight: 400;

                &:hover{
                background-color: var(--hover-blue);
                color: white;
            }
                span{
                    margin-right: 5px;
                }
            }
        }
        .active{
            li{
                color: var(--hover-blue);
                background-color: #fff;
            } 
    }
`;

const SidebarBottom = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 20px;
    position: absolute;
    width: 100%;
    bottom: 15px;
    .options-dot svg{
        fill: #fff;
    }
`;
const Avatar = styled.div`
    height: 40px;
    border-radius: 50px;
    a{
        color: #fff;
        text-decoration: none;
        span{
            font-weight: 500;
        }
    }
    img{
        width: fit-content;
        height: 100%;
        object-fit: cover;
        border-radius: 50px;
        margin-right: 5px;
    }
`;
export { AdSidebar, SidebarTop, SidebarMenu, SidebarBottom, Avatar }