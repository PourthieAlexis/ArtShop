import './menuheader.css'
function Menuheader()
{

    return(
    <div className="general-header">
        <tr className="header-container">
            <td>
                <button className="header-bouton mainbutton mb1">Sign Up</button>
                <button className="header-bouton mainbutton mb2">Login</button>
                <button className="header-bouton mainbutton mb3">Login</button>
            </td>
            <image className='logo'><b>Logo</b></image>

            <button className="header-bouton compte">Compte</button>
        </tr>
    </div>
    );
}
export default Menuheader;