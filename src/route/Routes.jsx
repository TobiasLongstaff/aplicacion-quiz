import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Registro from '../pages/Registro'
import Cuestionarios from '../pages/Cuestionarios'
import VerCuestionario from '../pages/VerCuestionario'
import MisCuestionarios from '../pages/MisCuestionarios'
import CuestionariosContestados from '../pages/CuestionariosContestados'
import VerRespuestas from '../pages/VerRespuestas'

function Rutas()
{
    return(
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Login/>} />
                <Route exact path="/registro" element={<Registro/>} />
                <Route exact path="/cuestionarios" element={<Cuestionarios/>} />
                <Route exact path="/ver-cuestionario/:id" element={<VerCuestionario/>} />
                <Route exact path="/mis-cuestionarios" element={<MisCuestionarios/>} />
                <Route exact path="/cuestionarios-contestados" element={<CuestionariosContestados/>} />
                <Route exact path="/ver-respuestas/:id/:idres" element={<VerRespuestas/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Rutas