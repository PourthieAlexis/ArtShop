import styled from "styled-components";
import CartItem from "./CartItem";

export interface ICartListProps {
    cartList: any
}

export default function CartList(props: ICartListProps) {
    return (
        <CartListContainer>
            {props.cartList.length === 0 ?
                props.cartList.data.map((cartItem: any) =>
                    <CartItem key={cartItem.art.id} title={cartItem.art.title} image={cartItem.art.image} price={cartItem.art.price} quantity={cartItem.quantity} />
                )
                : "Vous n'avez pas d'oeuvre d'art dans votre panier."}
        </CartListContainer>
    );
}

const CartListContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
`