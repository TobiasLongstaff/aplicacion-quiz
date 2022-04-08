import React, { useState } from 'react'
import { UilAt, UilKeySkeletonAlt, UilUser } from '@iconscout/react-unicons'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
// import { url } from '../services/Settings'
// import MensajeError from '../components/mensaje-error/MensajeError'
// import useFetchGET from '../hooks/useFetchGET'

const Registro = () =>
{
    const [ form, setForm ] = useState(
    {
        nombre_apellido: '',
        mail: '',
        telefono: '',
        sector: '',
        perfil_de_usuario: '',
        password: '',
        password_con: ''
    })
    const [ error, setError ] = useState()

    const handelRegistro = async e =>
    {
        e.preventDefault()

        try 
        {
            let config =
            {
                method: 'POST',
                headers: 
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            }
            Swal.fire('Creando Cuenta')
            Swal.showLoading()
            let res = await fetch(url+'crear-cuenta.php', config)
            let infoPost = await res.json()
            console.log(infoPost[0])
            if(infoPost[0].mensaje == 'Cuenta creada')
            {
                Swal.fire(
                    'Cuenta creada exitosamente',
                    'Te llegara un mail avisando cuando tu cuenta esta lista para usarse ',
                    'success'
                )
                setForm({         
                    nombre_apellido: '',
                    mail: '',
                    telefono: '',
                    sector: '',
                    perfil_de_usuario: '',
                    password: '',
                    password_con: '' 
                });
                setError('')
            }
            else
            {
                Swal.close()
                setError(infoPost[0].mensaje)
            }
        }
        catch (error)
        {
            console.error(error)
            Swal.close()
            setError('Error al registrarte intentar mas tarde')
        }
    }

    const handelChange = e =>
    {
        setForm(
        {
            ...form,
            [e.target.name]: e.target.value
        })
        console.log(form)
    }

    return(
        <article>
            <main className="container-login">
                <form className="form-general" onSubmit={handelRegistro}>
                    <header className="container-titulo-form">
                        <h2>Crear Cuenta</h2>
                    </header>
                    <main className="container-textbox">
                        <div className="ico-textbox-grup">
                            <div className="ico-textbox">
                                <UilUser size="20"/>
                            </div>
                            <input type="text" placeholder="Nombre Apellido" name="nombre_apellido" className="textbox-general con-ico" onChange={handelChange} required/>
                        </div>
                        <div className="ico-textbox-grup">
                            <div className="ico-textbox">
                                <UilAt size="20"/>
                            </div>
                            <input type="email" placeholder="E-Mail" name="mail" className="textbox-general con-ico" onChange={handelChange} required/>
                        </div>
                        <div className="ico-textbox-grup">
                            <div className="ico-textbox">
                                <UilKeySkeletonAlt size="20"/>
                            </div>
                            <input type="password" placeholder="Contraseña" name="password" className="textbox-general con-ico" onChange={handelChange} required/>
                        </div>
                        <div className="ico-textbox-grup">
                            <div className="ico-textbox">
                                <UilKeySkeletonAlt size="20"/>
                            </div>
                            <input type="password" placeholder="Confirmar Contraseña" name="password_con" className="textbox-general con-ico" onChange={handelChange} required/>
                        </div>
                        {/* <MensajeError error={error}/> */}
                    </main>
                    <div className="container-btn">
                        <input type="submit" value="Crear Cuenta" className="btn-general"/>
                        <Link to="/" className="link-general">
                            <button type="button" className="btn-general btn-secundario">Volver</button>
                        </Link>
                    </div>
                </form>
            </main>
        </article>
    )
}

export default Registro