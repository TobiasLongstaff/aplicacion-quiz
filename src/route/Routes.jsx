import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Registro from '../pages/Registro'
import Cuestionarios from '../pages/Cuestionarios'
import CrearPregunta from '../pages/CrearPregunta'
import VerCuestionario from '../pages/VerCuestionario'

function Rutas()
{
    return(
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Login/>} />
                <Route exact path="/registro" element={<Registro/>} />
                <Route exact path="/cuentionarios" element={<Cuestionarios/>} />
                <Route exact path="/crear-cuestionario" element={<CrearPregunta/>} />
                <Route exact path="/ver-cuestionario/:id" element={<VerCuestionario/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Rutas