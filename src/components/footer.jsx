import './footer.css';
import logo from '../images/logo.svg';
import insta from '../images/insta.png';
import fb from '../images/fb.png';
import linked from '../images/linked.png';

function Footer() {
    var footerMenu = {
        'About us': 'about.php',
        'Careers': 'careers.php',
        'Contact': 'contact.php',
        'Services': 'services.php'
    };
    var footerFootMenu = {
        'Terms & Conditions': 'tnc.php',
        'Privacy Policy': 'privacy.php',
        'Accessibility': 'accessibility.php',
        'Legal': 'legal.php'
    };
    return (
        <div className="footerContainer">
            <div className="footerHead">
                <div className="footerMenuContainer">
                    {Object.keys(footerMenu).map((key) => {
                        return(
                            <a key={key} href={footerMenu[key]}>{key}</a>
                        )
                    })}
                </div>
                <div className="footerLogoContainer">
                    <img className="footerLogo" src={logo} />
                    <p>Follow Us :</p>
                    <div>
                        <img className="footerInstaImg" src={insta} />
                        <img className="footerFbImg" src={fb} />
                        <img className="footerLinkedImg" src={linked}/>
                    </div>
                </div>
                <div className="footerNewsletterContainer">
                    <p>Get the latest updates from us</p>
                    <div className="newsEmailBtnC">
                        <input type="email" placeholder="Your email Address" name="newsletterEmail"/>
                        <div>Subscribe</div>
                    </div>
                </div>
            </div>
            <div className="footerFoot">
                {Object.keys(footerFootMenu).map((key,i) => {
                    if(i !== Object.keys(footerFootMenu).length-1) {
                        return(<p key={key}><a href={footerFootMenu[key]}>{key}</a><span>|</span></p>)
                    } else {
                        return(<p key={key}><a href={footerFootMenu[key]}>{key}</a></p>)
                    }
                })}
            </div>
        </div>
    )
};
export default Footer;