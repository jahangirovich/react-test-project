import styled from 'styled-components'

export const Button = styled.div`
    padding: 10px 20px;
    background-color: ${props => props.backgroundColor ? "#5b80ba" : "white"};
    border: none;
    border-radius: 40px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    color: ${props => props.backgroundColor ? "white" : "#5b80ba"};
    display: flex;
    align-items: center;
    
    cursor: pointer;
    margin: 0 10px;
    &:focus {
        outline: none;
    }
    &:hover{
        background-color: white;
        color: #5b80ba;
    }
    span{
        margin: 0 10px;
    }
    
`

export const Card = styled.div`
    width: 100%;
    background-color: ${props => {
        if(props.background == 0){
            return ("#ffebee")
        }
        else if(props.background == 1){
            return ("#fcccd4")
        }
        else if(props.background == 10){
            return ("#e5f5d5")
        }
        else{
            return ("#b7e08d")
        }
    }};
    padding: 8px 12px;
    position: relative;
    cursor: ${props => {
        if(props.isAdmin) return "pointer";
        else return "unset";
    }};
    margin: 10px 0;
    .disabled{
        display: none !important;
    }
    .editIcon{
        position: absolute;
        right: 50%;
        font-size: 25px;
        top: 20%;
        display: none;
    }
    &:hover .editIcon{
        display: inline-block
    }
`

export const Category = styled.div`
    width: 100%;
    padding: 8px 12px;
    .byOrder{
        span{
            color: #a89151;
            border: 1px solid #a89151;
        }
        .current{
            background-color: #a89151;
            color: white;
        }
    }
    div{
        margin: 10px 0;
        span{
            color: #5b80ba;
            display: inline-block;
            padding: 3px 15px;
            border-radius: 20px;
            border: 1px solid #5b80ba;
            margin: 0 10px;
            background-color: white;
            cursor: pointer
        }
        .current{
            background-color: #5b80ba;
            color: white;
        }
    }
`

export const Body = styled.div`
    padding: 10px;
    margin-top: 20px;
`

export const MainBody = styled.div`
  width: 100%;
`
export const Header = styled.div`
  display: flex;
  align-items: center;
`

export const Modal = styled.div`
    width: 100%;
    height: ${props => props.height}%;
    background-color: rgba(0,0,0,0.5);
    transition: 0.3s all;
    overflow: hidden;
    z-index: 10001;
    display: flex;
    max-height: 10000px;
    justify-content: center;
    left: 0;
    top: 0;
    position: fixed;
    div{
        form{
            padding: 40px 10px;
            width: 400px;
            background-color: white;
            .options{
                span{
                    display: block;
                    border-radius: 20px;
                    padding: 4px 10px;
                    margin: 10px 0;
                    cursor: pointer;
                    background-color: #e6e6e6
                }
                .selected{
                    background-color: #5b80ba !important;
                    color: white
                }
            }
            p{
                position: relative;
                margin: 10px 0;
            }
            .errors{
                color: red;
            }
            input{
                display: block;
                width: 100%;
                padding: 5px;
                outline: none;
                transition: 0.3s all;
                border: none;
                border-bottom: 1px solid #e6e6e6;
                &:focus{
                    border-bottom: 1px solid #5b80ba;
                }
                &[type=submit]{
                    cursor: pointer;
                    padding: 10px;
                    background-color: #5b80ba;
                    color: white;
                    margin-top: 50px
                }
            }
        }
    }
`
