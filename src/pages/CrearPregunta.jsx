import React from 'react'
import Navigation from '../components/Navegacion/Navegacion'
import { UilTextFields, UilAlignLeft, UilQuestionCircle, UilCheckCircle, UilTimesCircle } from '@iconscout/react-unicons'

const CrearPregunta = () =>
{
    return(
        <article>
            <Navigation titulo="Crear Cuestionario" volver="/cuentionarios"/>
            <main className="container-crear-cuestionario">
                <form className="form-general">
                    <h1>Cuestionario</h1>
                    <main className="container-textbox">
                        <div className="form-group">
                            <input type="text" name="titulo" className="form-style" placeholder="Titulo del cuestionario" required />
                            <UilTextFields size="25" className="input-icon"/>
                        </div>
                        <div className="form-group">
                            <input type="text" name="titulo" className="form-style" placeholder="Descripcion" required />
                            <UilAlignLeft  size="25" className="input-icon"/>
                        </div>
                        <div className="container-pregunta">
                            <label>Pregunta 1</label>
                            <div className="container-info-pregunta">
                                <div className="form-group">
                                    <input type="text" name="titulo" className="form-style" placeholder="Pregunta" required />
                                    <UilQuestionCircle size="25" className="input-icon"/>
                                </div>
                                <div className="form-group">
                                    <input type="text" name="titulo" className="form-style" placeholder="Respuesta correcta" required />
                                    <UilCheckCircle size="25" className="input-icon"/>
                                </div>
                                <div className="form-group">
                                    <input type="text" name="titulo" className="form-style" placeholder="Respuesta incorrecta" required />
                                    <UilTimesCircle size="25" className="input-icon"/>
                                </div>
                                <button type="button" className="btn-general btn-secundario">Agregar Respuesta Incorrecta</button>
                            </div>
                        </div>
                        <div className="container-btn">
                            <button type="button" className="btn-general btn-secundario">Agregar Nueva Pregunta</button>
                            <button type="submit" className="btn-general">Finalizar Cuestionario</button>
                        </div>
                    </main>
                </form>
            </main>
        </article>
    )
}

export default CrearPregunta