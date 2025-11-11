import './App.css';
import Navbar from './Components/Navbar/Navbar';
import ProductList from './Pages/ProductList';
import ShopCategory from './Pages/ShopCategory';
import LoginSignup from './Pages/LoginSignup';
import Cart from './Pages/Cart';
import HomePage from './Pages/HomePage';
import Footer from './Components/Footer/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/men' element={<ShopCategory category="Men" />} />
        <Route path='/women' element={<ShopCategory category="Women" />} />
        <Route path='/kids' element={<ShopCategory category="Kids" />} />
        <Route path='/products' element={<ProductList />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<LoginSignup />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;
