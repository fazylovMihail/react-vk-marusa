import { Social } from "@/components";

import "./footer.scss";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <ul className="footer__socials">
          <li className="footer__socials-item">
            <Social url="/" iconId="icon-vk" />
          </li>
          <li className="footer__socials-item">
            <Social url="/" iconId="icon-youtube" />
          </li>
          <li className="footer__socials-item">
            <Social url="/" iconId="icon-ok" />
          </li>
          <li className="footer__socials-item">
            <Social url="/" iconId="icon-telegram" />
          </li>
        </ul>
      </div>
    </footer>
  );
};
