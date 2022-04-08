import React, { useState, useEffect } from 'react'
import Navigation from '../components/Navegacion/Navegacion'
import { UilTextFields, UilAlignLeft, UilQuestionCircle, UilCheckCircle, UilTimesCircle } from '@iconscout/react-unicons'

const CrearPregunta = () =>
{
    const [ form, setForm ] = useState({
        titulo: '',
        description: '',
        preguntas: {}
    })

    // const [ cantRes, setCantRes ] = useState(
    // [

    // ])

    const [ cantPre, setCantPre ] = useState(
    [
        {
            pre_id: 1,
            pregunta: '',
            correcta: '',
            incorrectas:     
            [{
                res_in: 1,
                incorrecta: ''
            }]
        }
    ])

    useEffect(() =>
    {
        console.log(cantPre)

    },[cantPre])

    const agregarPregunta = () =>
    {
        setCantPre(
        [
            ...cantPre,
            { 
                pre_id: cantPre[cantPre.length-1].pre_id + 1,
                pregunta: '',
                correcta: '',
                incorrectas:             
                [{
                    res_in: 1,
                    incorrecta: ''
                }]
            },
        ])
    }

    const agregarRespuestaIncorrecta = () =>
    {
        // setCantRes(
        // [
        //     ...cantRes,
        //     { 
        //         res_in: cantRes[cantRes.length-1].res_in + 1,
        //         // ['incorrecta_'+Number(cantRes[cantRes.length-1].res_in + 1)]: ''
        //         incorrecta: ''
        //     },
        // ])
        setCantPre()
    }

    const handelChangeIncorrecta = e =>
    {
        const cantRespuesta = [...cantRes]
        let elementIndex = cantRespuesta .findIndex((obj => obj.res_in == [e.target.name]))
        cantRespuesta[elementIndex].incorrecta = e.target.value
        setCantRes(cantRespuesta)
    }

    const handelChangePregunta = e =>
    {
        const cantPregunta = [...cantPre]
        const namePregunta = e.target.name.split('-')
        if(namePregunta[0] == 'pregunta')
        {
            let elementIndex = cantPregunta.findIndex((obj => obj.pre_id == namePregunta[1]))
            cantPregunta[elementIndex].pregunta = e.target.value
        }
        else
        {
            let elementIndex = cantPregunta.findIndex((obj => obj.pre_id == namePregunta[1]))
            cantPregunta[elementIndex].correcta = e.target.value
        }
        setCantPre(cantPregunta)
    }

    const handelChange = e =>
    {
        setForm(
        {
            ...form,
            [e.target.name]: e.target.value
        })
    }

    return(
        <article>
            <Navigation titulo="Crear Cuestionario" volver="/cuentionarios"/>
            <main className="container-crear-cuestionario">
                <form className="form-general">
                    <h1>Cuestionario</h1>
                    <main className="container-textbox">
                        <div className="form-group">
                            <input type="text" name="titulo" className="form-style" placeholder="Titulo del cuestionario" onChange={handelChange} required />
                            <UilTextFields size="25" className="input-icon"/>
                        </div>
                        <div className="form-group">
                            <input type="text" name="descripcion" className="form-style" placeholder="Descripcion" onChange={handelChange} required />
                            <UilAlignLeft  size="25" className="input-icon"/>
                        </div>
                        {cantPre.map((filaPre) =>
                        (
                            <div className="container-pregunta">
                                <label>Pregunta {filaPre.pre_id}</label>
                                <div className="container-info-pregunta">
                                    <div className="form-group">
                                        <input type="text" name={'pregunta-'+filaPre.pre_id} className="form-style" placeholder="Pregunta" onChange={handelChangePregunta} required />
                                        <UilQuestionCircle size="25" className="input-icon"/>
                                    </div>
                                    <div className="form-group">
                                        <input type="text" name={'correcta-'+filaPre.pre_id}className="form-style" placeholder="Respuesta correcta" onChange={handelChangePregunta} required />
                                        <UilCheckCircle size="25" className="input-icon"/>
                                    </div>
                                    {filaPre.incorrectas.map((fila) =>
                                    (
                                        <div className="form-group">
                                            <input type="text" name={fila.res_in} className="form-style" placeholder={'Restuesta incorrecta '+fila.res_in} onChange={handelChangeIncorrecta} required />
                                            <UilTimesCircle size="25" className="input-icon"/>
                                        </div>
                                    ))} 
                                    <button type="button" onClick={()=>agregarRespuestaIncorrecta()} className="btn-general btn-secundario">Agregar Respuesta Incorrecta</button>
                                </div>
                            </div>
                        ))} 
                        <div className="container-btn">
                            <button type="button" className="btn-general btn-secundario" onClick={()=>agregarPregunta()}>Agregar Nueva Pregunta</button>
                            <button type="submit" className="btn-general">Finalizar Cuestionario</button>
                        </div>
                    </main>
                </form>
            </main>
        </article>
    )
}

export default CrearPregunta