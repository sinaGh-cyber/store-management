import './App.scss';
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import Main from './components/main/main';

import ThemeModeProvider from './context/themeModeProvider';

function App() {
  return (
    <>
      <ThemeModeProvider>
        <Navbar />
        <Main />
        <Footer />
      </ThemeModeProvider>
    </>
  );
}

export default App;
