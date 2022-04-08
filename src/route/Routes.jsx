import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Registro from '../pages/Registro'
// import Menu from '../pages/Menu'

function Rutas()
{
    return(
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Login/>} />
                <Route exact path="/registro" element={<Registro/>} />
                {/* <Route exact path="/menu/:pantalla" element={<Menu/>} /> */}
            </Routes>
        </BrowserRouter>
    )
}

export default Rutas