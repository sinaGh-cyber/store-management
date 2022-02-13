import './App.scss';
import Navbar from './components/navbar/navbar';
import Footer from './components/footer/footer';
import Filter from './components/filter/filter';
import ProductsList from './components/productsList/productsList';

import ThemeModeProvider from './context/themeModeProvider';
import ProductsProvider from './context/productsProvider';

function App() {
  return (
    <>
      <ProductsProvider>
        <ThemeModeProvider>
          <Navbar />
          <Filter/>
          <ProductsList/>
          <Footer />
        </ThemeModeProvider>
      </ProductsProvider>
    </>
  );
}

export default App;
