import React,{ useEffect, useState } from 'react'
import Navigation from '../components/Navegacion/Navegacion'
import '../styles/cuestionarios.css'
import { Link } from 'react-router-dom'
import url from '../services/Settings'

const Cuestionarios = () =>
{

    const [ data, setData ] = useState([])
    const [ loading, setLoading ] = useState(false)

    useEffect(() =>
    {
        obtenerCuestionarios()
    },[])

    const obtenerCuestionarios = async () =>
    {
        try
        {
            let res = await fetch(url+'cuestionarios')
            let data = await res.json()
            if(typeof data !== 'undefined')
            {
                setData(data)
                setLoading(false)
            }
        }
        catch(error)
        {
            console.error(error)
        }
    }

    return(
        <article>
            <Navigation titulo="Cuestionarios" refresh={true} childClick={()=>obtenerCuestionarios()}/>
            <main className="container-cards">
                {(() => {
                    if(loading)
                        return(
                            <div className="loader">Loading...</div>
                        )
                    return(
                        data.map((fila) =>
                        (
                            <Link key={fila.id} to={'/ver-cuestionario/'+fila.id}>
                                <div className="cards">
                                    <h1>{fila.titulo}</h1>
                                    <p>{fila.descripcion}</p>
                                    <label>{fila.fecha_creacion}</label>
                                </div>
                            </Link>
                        ))                                    
                    )
                })()}
            </main>
        </article>
    )
}

export default Cuestionarios