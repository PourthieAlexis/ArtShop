import {
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsTwitterX,
  BsYoutube,
} from "react-icons/bs";
import styled from "styled-components";

export default function Footer() {
  return (
    <FooterContainer>
      <FooterContent>
        <LogoContainer>Logo</LogoContainer>
        <ListLink>
          <Link>A propos</Link>
          <Link>Contact</Link>
          <Link>Foire aux questions (FAQ)</Link>
          <Link>Politique de confidentialité</Link>
          <Link>Conditions d'utilisations</Link>
        </ListLink>
        <SocialMedia>
          <BsFacebook />
          <BsInstagram />
          <BsTwitterX />
          <BsLinkedin />
          <BsYoutube />
        </SocialMedia>
      </FooterContent>
      <FooterRight>
        <FooterRightContent>
          <p>2023 Relume. All right reserved.</p>
          <p>Cookies Settings</p>
        </FooterRightContent>
      </FooterRight>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FooterContent = styled.div`
  display: flex;
  width: 90%;
  justify-content: space-between;
  height: 10rem;
  border-bottom: 1px solid black;
  padding: 0 1rem 0 1rem;
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ListLink = styled.ul`
  display: flex;
  align-items: center;
  padding: 0;
  gap: 2rem;
`;

const Link = styled.li`
  list-style: none;
  font-weight: 600;
`;

const SocialMedia = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const FooterRight = styled.div`
  height: 7rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FooterRightContent = styled.div`
  display: flex;
  gap: 2rem;
`;
