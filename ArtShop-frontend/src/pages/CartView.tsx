import styled from 'styled-components';
import PrimaryInput from '../components/PrimaryInput';
import SecondaryInput from '../components/SecondaryInput';
import { useSelector } from 'react-redux';
import { selectIsLogged, selectToken } from '../reducers/authenticationSlice';
import CartItem from '../components/CartItem';
import { useQuery } from '@tanstack/react-query';
import { showCart } from '../api/backend/cart';

export function CartView() {

    const token = useSelector(selectToken);
    const isAuthenticated = useSelector(selectIsLogged);

    const { data, isLoading, isError } = useQuery({ queryKey: ['showCart'], queryFn: () => showCart(token) });


    if (isLoading) return <div>Chargement...</div>;
    if (isError) return <div>Error fetching data</div>;
    console.log(data)
    return (
        <CartContainer>
            {data?.data.map((cartItem: any) =>
                <CartItem key={cartItem.art.id} title={cartItem.art.title} image={cartItem.art.image} price={cartItem.art.price} quantity={cartItem.quantity} />
            )}
            <Checkout>
                <TotalPrice>100 €</TotalPrice>
                <ButtonCheckout>
                    <PrimaryInput type='button' value="Continue Shopping" />
                    <SecondaryInput type='button' value='Proceed to Checkout' />
                </ButtonCheckout>
            </Checkout>
        </CartContainer>
    );
}


const CartContainer = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    gap: 2rem;
`
const Checkout = styled.div`
    width: 70%;
    display: flex;
    justify-content: space-between;
`
const TotalPrice = styled.h3`
`

const ButtonCheckout = styled.div`
    display: flex;
    align-items: center;
    gap:1rem;
`