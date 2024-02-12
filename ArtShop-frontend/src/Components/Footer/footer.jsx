import './footer.css'
function Footer()
{
    return(
        <footer>
            <div className="general-footer">  
                <li className="footer-container">
                    <ul>
                    <img className='logo logo-footer' src="./src/assets/logo.png"></img>
                    </ul>
                    <ul>
                        <button className="footer-bouton fb1"><b>bouton 1</b></button>
                        <button className="footer-bouton fb2"><b>bouton 2</b></button>
                        <button className="footer-bouton fb3"><b>bouton 3</b></button>
                        <button className="footer-bouton fb4"><b>bouton 4</b></button>
                        <button className="footer-bouton fb5"><b>bouton 5</b></button>
                    </ul>
                    <ul>
                        <button className="footer-bouton social fb1"><img className='imageSocial' src='./src/assets/facebook.png'></img></button>
                        <button className="footer-bouton social fb2"><img className='imageSocial' src='./src/assets/insta.png'></img></button>
                        <button className="footer-bouton social fb3"><img className='imageSocial' src='./src/assets/logoX.png'></img></button>
                        <button className="footer-bouton social fb4"><img className='imageSocial' src='./src/assets/linkedin.png'></img></button>
                        <button className="footer-bouton social fb5"><img className='imageSocial' src='./src/assets/youtube.png'></img></button>
                    </ul>
                </li>
                <li className='footer-legal'>
                    <p>Made in 2024. All rights reserved.</p> <a className="footerlink" href="https://google.fr/">privacy policy</a> <a className="footerlink" href="">terms of service</a> <a className="footerlink" href="">cookies setting</a>
                </li>
            </div>
        </footer>
    )
}

export default Footer;