import { BsFacebook, BsInstagram, BsLinkedin, BsTwitterX, BsYoutube } from 'react-icons/bs';
import styled from 'styled-components';

export interface IFooterProps {
}

export default function Footer(props: IFooterProps) {
    return (
        <FooterContainer>
            <FooterContent>
                <LogoContainer>
                    Logo
                </LogoContainer>
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
                    2023 Relume. All right reserved.
                    Cookies Settings
                </FooterRightContent>
            </FooterRight>
        </FooterContainer>
    );
}

const FooterContainer = styled.footer`
    display: flex;
    flex-direction: column;
    justify-content: center;
`

const FooterContent = styled.div`
    display: flex;
    justify-content: space-around;
    height: 10rem;
`

const LogoContainer = styled.div`
    display: flex;
    align-items: center;
`

const ListLink = styled.ul`
    display: flex;
    align-items: center;
    padding: 0;
    gap: 1rem;
`

const Link = styled.li`
    list-style: none;
`

const SocialMedia = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;
`

const FooterRight = styled.div`
    border-top: 1px solid black;
    height: 7rem;
    width: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;
`

const FooterRightContent = styled.div`
    display: flex;
`