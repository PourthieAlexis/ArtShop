import styled from 'styled-components';
import { FaMinus, FaPlus } from 'react-icons/fa';

export interface ICartItemProps {
    title: string,
    image: string,
    price: number,
    quantity: number
}

export default function CartItem(props: ICartItemProps) {
    return (
        <>
            <Cart>
                <CartDetail>
                    <CartPicture src={props.image} />
                    <CardContent>
                        <CartDetailsTitle>{props.title}</CartDetailsTitle>
                        <CartDetailsPrice>{props.price} €</CartDetailsPrice>
                    </CardContent>
                </CartDetail>
                <CartStock>
                    <CartButton>
                        <FaMinus />
                    </CartButton>
                    {props.quantity}
                    <CartButton>
                        <FaPlus />
                    </CartButton>
                </CartStock>
            </Cart>
            <Hr />
        </>
    );
}




const Hr = styled.hr`
    width: 70%;
    margin: 0;
`

const Cart = styled.div`
    display: flex;
    justify-content: space-between;
    height: 7rem;
    width: 70%;
`

const CartDetail = styled.div`
    display: flex;
    width: 30%;
    gap: 1rem;
`

const CartPicture = styled.img`
    border-radius:4px
`

const CardContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`

const CartDetailsTitle = styled.div`

`

const CartDetailsPrice = styled.div`

`

const CartButton = styled.button`
    display: flex;
    align-items: center;
    background-color: #D9D9D9;
    border-radius: 50%;
    padding: 0.5rem;
    font-size: 1rem;
    border: none;
    cursor: pointer;
    outline: none;
`;

const CartStock = styled.div`
    display: flex;
    justify-content: end;
    align-items: center;
    width: 30%;
    gap: 2rem;
`