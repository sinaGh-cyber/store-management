import './App.scss';
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import Main from './components/main/main';

import ThemeModeProvider from './context/themeModeProvider';
import ProductsProvider from './context/productsProvider';

function App() {
  return (
    <>
      <ProductsProvider>
        <ThemeModeProvider>
          <Navbar />
          <Main />
          <Footer />
        </ThemeModeProvider>
      </ProductsProvider>
    </>
  );
}

export default App;
