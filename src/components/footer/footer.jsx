import style from './footer.module.scss';
import { AiFillMail } from 'react-icons/ai';
import { AiOutlineLinkedin } from 'react-icons/ai';
import { AiFillInstagram } from 'react-icons/ai';
import { AiFillGithub } from 'react-icons/ai';

const Footer = () => {
  return (
    <footer className={style.footerTag}>
      <section className={style.description}>
        {' '}
        inspaired by Saheb Mohammadi's React & Redux curse.{' '}
      </section>
      <ul className={style.ulTag}>
        <li className={style.liTag}>
          <a href="https://www.instagram.com/sina_gh1999">
            <AiFillInstagram />
          </a>{' '}
        </li>
        <li className={style.liTag}>
          <a href="https://github.com/sinaGh-cyber">
            <AiFillGithub />
          </a>{' '}
        </li>
        <li className={style.liTag}>
          {' '}
          <a href="mailto:mohammad.sina.gholami.cyber@gmail.com">
            <AiFillMail />
          </a>{' '}
        </li>
        <li className={style.liTag}>
          {' '}
          <a href="https://www.linkedin.com/in/mohammad-sina-gholami-632489214/">
            <AiOutlineLinkedin />
          </a>{' '}
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
