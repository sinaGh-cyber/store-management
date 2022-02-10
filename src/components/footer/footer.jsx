import style from './footer.module.scss';

import { AiFillMail } from 'react-icons/ai';
import { AiOutlineLinkedin } from 'react-icons/ai';
import { AiFillInstagram } from 'react-icons/ai';
import { AiFillGithub } from 'react-icons/ai';

import {
  useThemeMode,
  posableThemeModes,
} from '../../context/themeModeProvider';
import { useState, useEffect } from 'react';

const Footer = () => {
  const { themeMode, themeModeToggler } = useThemeMode();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (themeMode === posableThemeModes.DARK) {
      setIsDark(true);
    } else {
      setIsDark(false);
    }
  }, [themeMode]);

  return (
    <>
      <footer
        className={`${style.footerTag} ${
          isDark ? style.bgDark : style.bgLight
        }`}
      >
        <section className={style.description}>
          {' '}
          <p>
            coded by <a href="https://github.com/sinaGh-cyber">me</a>
          </p>
          <br />
          <p>
            inspired by{' '}
            <a href="https://github.com/sahebmohammadi">Saheb Mohammadi</a>'s
            React &#38; Redux curse.
          </p>{' '}
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
    </>
  );
};

export default Footer;
