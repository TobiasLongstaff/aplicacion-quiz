import React from 'react'
import Navigation from '../components/Navegacion/Navegacion'
import { UilTextFields, UilAlignLeft, UilQuestionCircle, UilCheckCircle, UilTimesCircle } from '@iconscout/react-unicons'


const VerCuestionario = () =>
{
    return(
        <article>
            <Navigation titulo="Prueba 1" volver="/cuentionarios"/>
            <main className="container-crear-cuestionario">
                <form className="form-general">
                    <h1>Prueba 1</h1>
                    <label>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Architecto officia fugiat corrupti inventore, reprehenderit in porro tempora similique, sunt ullam minus asperiores temporibus? Magnam nihil accusantium maxime at atque ad!</label>
                    <main className="container-textbox">
                        <div className="container-pregunta">
                            <label>Pregunta 1</label>
                            <label>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquam consectetur, ipsam eius, veritatis autem reiciendis nihil </label>
                            <div className="form-group">
                                <select name="titulo" className="form-style" placeholder="Pregunta" required >
                                    <option>Prueba</option>
                                </select>
                                <UilQuestionCircle size="25" className="input-icon"/>
                            </div>
                        </div>
                        <div className="container-btn">
                            <button type="submit" className="btn-general">Finalizar Cuestionario</button>
                        </div>
                    </main>
                </form>
            </main>
        </article>
    )
}

export default VerCuestionario