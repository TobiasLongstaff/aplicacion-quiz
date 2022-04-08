import React, { useEffect, useState } from 'react'
import './navegacion.css'
import { Link } from 'react-router-dom'
import { UilSignout, UilUserCircle, UilAngleLeft, UilRedo } from '@iconscout/react-unicons'
import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2/dist/sweetalert2.all.min.js'
import { motion } from 'framer-motion'

const cookies = new Cookies

const Navigation = ({titulo, volver, refresh, childClick}) =>
{
    const [botonVolver, setVolver] = useState(null)
    const [botonRefresh, setRefresh] = useState(null)
    let navigate = useNavigate();

    useEffect(() =>
    {
        if(volver != null)
        {
            setVolver(
                <Link to={volver}>
                    <motion.button
                        whileHover={{ backgroundColor: '#88a4ff' }}
                        whileTap={{ scale: 0.9 }}
                        className="btn-nav-general-volver">
                        <UilAngleLeft size="32"/>
                    </motion.button>
                </Link>
            )
        }

        if(refresh === true)
        {
            setRefresh(
                <motion.button   
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="btn-nav-general"
                    onClick={()=>childClick()}>
                    <UilRedo size="32"/>
                    
                </motion.button>
            )
        }
    },[])

    const handelClick = () =>
    {
        Swal.fire(
        {
            title: '¿Cerrar Sesión?',
            text: "¿Estás seguro que queres cerrar sesión?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#00C3E3',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Cerrar Sesión'
        }).then((result) => 
        {
            if(result.isConfirmed) 
            {
                cookies.remove('id_usuario')
                cookies.remove('hashSession')
                cookies.remove('nombre')
                cookies.remove('mail')
                cookies.remove('tipo')
                navigate('/')
            }
        })
    }

    const variants = 
    {
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
    }

    return (
        <nav>
            <header className="container-header-nav">
                {botonVolver}
                <motion.h1
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5 }}
                    variants={variants}>
                    {titulo}
                </motion.h1>
                {botonRefresh}
            </header>
            <main className="container-controles-nav">
                <div>
                    <Link to="/mi-cuenta">
                        <motion.button   
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="btn-nav-general">
                            <UilUserCircle size="32"/>
                        </motion.button>
                    </Link>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }} 
                        onClick={handelClick} className="btn-nav-general">
                        <UilSignout size="32"/>
                    </motion.button>
                </div>
            </main>
        </nav>
    )
}

export default Navigation