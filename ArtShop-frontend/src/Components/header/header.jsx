import './header.css'
function Header()
{

    return(
    <div className="general-header">
        <tr className="header-container">
            <td>
                <button className="header-bouton mainbutton mb1">bouton 1</button>
                <button className="header-bouton mainbutton mb2">bouton 2</button>
                <button className="header-bouton mainbutton mb3">bouton 3</button>
            </td>
            <image className='logo'><b>Logo</b></image>

            <button className="header-bouton compte">Compte</button>
        </tr>
    </div>
    );
}
export default Header;