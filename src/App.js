import React,{ useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './page/Login';
import Adsadd from './page/admin/Adsadd';
import Layout from './Layout';
import ViewAds from './page/ViewAds';
import ShowAds from './page/admin/ShowAds';
import AdminHome from './page/admin/AdminHome';
import Singleads from './page/Singleads';
import Master from './Master';
import Editads from './Editads';
import About from './About';

function App() {
 return(
    <BrowserRouter>
    <Routes >
 

    <Route path='/' element={<Layout/>}></Route>
    <Route path='/login' element={<Login />}></Route>
    <Route path='/about' element={<About/>}></Route>
    <Route path='/admin' element={<AdminHome/>}></Route>
    <Route path='/adsadd' element={<Adsadd />}></Route>
    <Route path='/viewads' element={<ViewAds />}></Route>
     <Route path='/showads' element={<ShowAds />}></Route>
     <Route path='/show-ads/:id' element={<Singleads/>}></Route>

     <Route path='/editads/:id' element={<Editads/>}></Route>

   
    
  

    </Routes>
    </BrowserRouter>
 );
   }

export default App;
