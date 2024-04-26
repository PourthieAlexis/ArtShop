import styled from 'styled-components';
import PrimaryInput from '../components/shared/PrimaryInput';
import SecondaryInput from '../components/shared/SecondaryInput';
import { useSelector } from 'react-redux';
import { selectToken } from '../reducers/authenticationSlice';
import { useQuery } from '@tanstack/react-query';
import { showCart } from '../api/backend/cart';
import LoadingIndicator from '../components/shared/LoadingIndicator';
import CartList from '../components/cart/CartList';
import { useNavigate } from 'react-router-dom';

export function CartView() {

    const token = useSelector(selectToken);
    const navigate = useNavigate();

    const { data: cart, isLoading, isError } = useQuery({ queryKey: ['showCart'], queryFn: () => showCart(token) });

    const totalPrice = cart?.data.reduce((total: number, item: any) => total + item.art.price, 0);

    if (isLoading) return <LoadingIndicator isLoading={isLoading} />

    if (isError) return <div>Error fetching data</div>;

    return (
        <CartContainer>
            <CartList cartList={cart} />
            <Checkout>
                <TotalPrice>{totalPrice} €</TotalPrice>
                <ButtonCheckout>
                    <PrimaryInput type='button' value="Continue Shopping" onClick={() => navigate('/')} />
                    <SecondaryInput type='button' value='Proceed to Checkout' onClick={() => navigate('/')} />
                </ButtonCheckout>
            </Checkout>
        </CartContainer>
    );
}


const CartContainer = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
`
const Checkout = styled.div`
    width: 70%;
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    align-self: center;
`
const TotalPrice = styled.h3`
`

const ButtonCheckout = styled.div`
    display: flex;
    align-items: center;
    gap:1rem;
`