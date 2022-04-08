import React from 'react'
import Navigation from '../components/Navegacion/Navegacion'
import '../styles/cuestionarios.css'
import { UilPlus } from '@iconscout/react-unicons'
import { Link } from 'react-router-dom'

const Cuestionarios = () =>
{
    return(
        <article>
            <Navigation titulo="Cuestionarios"/>
            <main className="container-cards">
                <Link to="/ver-cuestionario/1">
                    <div className="cards">
                        <h1>Primer cuestionario</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore repellat sit ullam sunt itaque dolorum autem ut ipsa! Perspiciatis ex exercitationem velit neque aut impedit voluptatibus minus accusantium delectus laudantium?</p>
                    </div>
                </Link>
                <div className="cards">
                    <Link to="/crear-cuestionario">
                        <button className="btn-nuevo-cuestionario"><UilPlus size="60"/></button>
                    </Link> 
                </div>
            </main>
        </article>
    )
}

export default Cuestionarios