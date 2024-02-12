import './header.css'
function Header()
{
    return(
    <div className="general-header">
        <li className="header-container">
            <ul className='header-ul'>
                <button className="header-bouton mainbutton mb1">bouton 1</button>
                <button className="header-bouton mainbutton mb2">bouton 2</button>
                <button className="header-bouton mainbutton mb3">bouton 3</button>
            </ul>
            <img className='logo' src="./src/assets/logo.png"></img>
            <button className="header-bouton compte">Compte</button>
        </li>
    </div>
    );
}
export default Header;