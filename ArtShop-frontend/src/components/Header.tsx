import styled from "styled-components";
import SecondaryInput from "./SecondaryInput";
import { useSelector } from "react-redux";
import { selectIsLogged } from "../reducers/authenticationSlice";
import { BiMessage, BiShoppingBag, BiUser } from "react-icons/bi";
export interface IHeaderProps {}

export default function Header(props: IHeaderProps) {
  const isAuthenticated = useSelector(selectIsLogged);
  return (
    <HeaderContainer>
      <ListLink>
        <Link>Art WorkShop</Link>
      </ListLink>
      <LogoImage>ArtShop</LogoImage>
      <GroupButton>
        {isAuthenticated ? (
          <>
            <StyledButton>
              <CartButton />
            </StyledButton>
            <StyledButton>
              <MessageButton />
            </StyledButton>
            <StyledButton>
              <ProfilButton />
            </StyledButton>
          </>
        ) : (
          <SecondaryInput
            type="button"
            value="Login"
            style={{ width: "7rem", height: "3rem" }}
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
`;

const ListLink = styled.ul`
  display: flex;
  align-items: center;
  padding: 0;
`;

const Link = styled.li`
  list-style: none;
`;

const LogoImage = styled.div`
  display: flex;
  align-items: center;
`;

const GroupButton = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.7rem;
  background-color: #e3e8f2;
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
