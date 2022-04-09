import React, { useState } from 'react'
import { UilAt, UilKeySkeletonAlt, UilUser } from '@iconscout/react-unicons'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import url from '../services/Settings'
import MensajeError from '../components/mensaje-error/MensajeError'

const Registro = () =>
{
    const [ form, setForm ] = useState(
    {
        nombre_apellido: '',
        mail: '',
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
            let res = await fetch(url+'registro', config)
            let infoPost = await res.json()
            console.log(infoPost)
            if(infoPost.id)
            {
                Swal.fire(
                    'Cuenta creada exitosamente',
                    '',
                    'success'
                )
                setForm({         
                    nombre_apellido: '',
                    mail: '',
                    password: '',
                    password_con: '' 
                });
                setError('')
            }
            else
            {
                Swal.close()
                setError(infoPost.error)
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
                        <div className="form-group">
                            <input type="text" value={form.nombre_apellido} name="nombre_apellido" className="form-style" placeholder="Nombre Apellido" onChange={handelChange} required />
                            <UilUser size="25" className="input-icon"/>
                        </div>
                        <div className="form-group">
                            <input type="email" name="mail" value={form.mail} className="form-style" placeholder="E-Mail" onChange={handelChange} required />
                            <UilAt size="25" className="input-icon"/>
                        </div>
                        <div className="form-group">
                            <input type="password" name="password" value={form.password} className="form-style" placeholder="Contraseña" onChange={handelChange} required />
                            <UilKeySkeletonAlt size="25" className="input-icon"/>
                        </div>
                        <div className="form-group">
                            <input type="password" name="password_con" value={form.password_con} className="form-style" placeholder="Confirmar Contraseña" onChange={handelChange} required />
                            <UilKeySkeletonAlt size="25" className="input-icon"/>
                        </div>
                        <MensajeError error={error}/>
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