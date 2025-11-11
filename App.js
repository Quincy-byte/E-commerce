import './App.css';
import Navbar from './Components/Assets/Navbar/Navbar';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Shop from './Components/Assets/Pages/Shop';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Shop/>}/>
        <Route path='/mens' elements={<ShopCategory category="men"/>}/>
        <Route path='/womens' elements={<ShopCategory category="women"/>}/>
        <Route path='/kids' elements={<ShopCategory category="kids"/>}/>
        <Route path="/product" element={<Product/>}>
        <Route path=':productId' element={<Product/>}/>
        </Route>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<LoginSignup/>}/>
      </Routes>
      <Footer/>
        </BrowserRouter>
      
    </div>
  );
}

export default App;

