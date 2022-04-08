import React, { useState, useEffect } from 'react'
import { UilAt, UilKeySkeletonAlt } from '@iconscout/react-unicons'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'universal-cookie'
// import MensajeError from '../components/mensaje-error/MensajeError'

const cookie = new Cookies

const Login = () =>
{
    let navigate = useNavigate()
    const [ form, setForm ] = useState(
    {
        mail: '',
        password: '',
    })
    const [ error, setError ] = useState()

    useEffect(() =>
    {
        if(cookie.get('hashSession') != null)
        {
            navigate('/menu/seguimiento-de-pedidos')
        }
    },[])

    const handelSubmit = async e =>
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
            let res = await fetch(url+'login.php', config)
            let infoPost = await res.json()
            console.log(infoPost[0])
            if(infoPost[0].id != null)
            {
                cookie.set('id_usuario', infoPost[0].id, {path: '/'})
                cookie.set('nombre', infoPost[0].nombre, {path: '/'})
                cookie.set('mail', form.mail, {path: '/'})
                cookie.set('tipo', infoPost[0].tipo, {path: '/'})
                cookie.set('hashSession', infoPost[0].hash, {path: '/'})
                navigate('/menu/seguimiento-de-pedidos')
            }
            else
            {
                setError(infoPost[0].mensaje)
            }
        }
        catch (error)
        {
            console.error(error)
        }
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
            <main className="container-login">
                <form className="form-general" onSubmit={handelSubmit}>
                    <header className="container-titulo-form">
                        <h2>Iniciar sesión</h2>
                    </header>
                    <main className="container-textbox">
                        <div className="form-group">
                            <input type="email" name="mail" className="form-style" placeholder="E-Mail" onChange={handelChange} required />
                            <UilAt size="25" className="input-icon"/>
                        </div>                   
                        <div className="form-group">
                            <input type="password" name="password" className="form-style" placeholder="Contraseña" onChange={handelChange} required />
                            <UilKeySkeletonAlt size="25" className="input-icon"/>
                        </div>	
                        {/* <MensajeError error={error} /> */}
                    </main>
                    <div className="container-btn">
                        <input type="submit" value="Iniciar sesión" className="btn-general"/>
                        <Link to="/registro" className="link-general">
                            <button type="button" className="btn-general btn-secundario">Crear Cuenta</button>
                        </Link>
                    </div>
                </form>
            </main>
        </article>
    )
}

export default Login