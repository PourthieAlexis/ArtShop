import styled from "styled-components";
import SecondaryInput from "../shared/SecondaryInput";
import { useSelector } from "react-redux";
import { selectIsLogged } from "../../reducers/authenticationSlice";
import { BiMessage, BiShoppingBag, BiUser } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsLogged);

  return (
    <HeaderContainer>
      <ListLink>
        <Li>
          <StyledNavLink to="/">Art WorkShop</StyledNavLink>
        </Li>
      </ListLink>
      <LogoImage>ArtShop</LogoImage>
      <GroupButton>
        {isAuthenticated ? (
          <>
            <StyledLink to="/cart">
              <CartButton />
            </StyledLink>
            <StyledLink to="/messages">
              <MessageButton />
            </StyledLink>
            <StyledLink to="/profil">
              <ProfilButton />
            </StyledLink>
          </>
        ) : (
          <SecondaryInput
            type="button"
            value="Login"
            style={{ width: "7rem", padding: '0' }}
            onClick={() => navigate('/login')}
          />
        )}
      </GroupButton>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 0 2rem;
  height: 5rem;
  border-bottom: 1px solid black;
`;

const ListLink = styled.ul`
  display: flex;
  align-items: center;
  padding: 0;
  flex: 1;
`;

const Li = styled.li`
  list-style: none;
`;

const LogoImage = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: center;
`;

const GroupButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 1rem;
  flex: 1;
`;

const StyledNavLink = styled(Link)`
  text-decoration: none;
  color: black
`;

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  background-color: #E3E8F2;
  cursor: pointer;
  padding: 0.7rem;
  color: #141c24;
  border: none;
  border-radius: 4px;
`;

const CartButton = styled(BiShoppingBag)`
  font-size: 1.5rem;
`;

const MessageButton = styled(BiMessage)`
  font-size: 1.5rem;
`;

const ProfilButton = styled(BiUser)`
  font-size: 1.5rem;
`;
