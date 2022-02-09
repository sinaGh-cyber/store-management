import style from './navbar.module.scss';
import toggleThemeMode from './navbar.toggleThemeMode.module.scss';

const Navbar = () => {
  return (
    <nav className={style.navTag}>
      <header className={style.headerTag}></header>

      <section className={style.buttonGroup}>
        <button className={style.NavbarRefreshBtn}></button>

        <div className={style.toggleThemeMode}>
          <div
            className={`${toggleThemeMode.button} ${toggleThemeMode.r}`}
            id={toggleThemeMode.button1}
          >
            <input type="checkbox" className={toggleThemeMode.checkbox} />
            <div className={toggleThemeMode.knobs}></div>
            <div className={toggleThemeMode.layer}></div>
          </div>
        </div>
      </section>
    </nav>
  );
};

export default Navbar;
