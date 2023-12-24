 import md5 from "md5" 
import { useEffect, useState } from "react"
import { Navigate, Link, Outlet  } from "react-router-dom"
import PropTypes from 'prop-types';
/* import Diagnosticar from "./Diagnosticar"; */

const Dashboard = ({setUser}) => {
    const [,setNombre] = useState('')
    const [goLogin,setLogin] = useState(false)

    const loadData = async () => {
        try {
            const {nombre_usuario,email_usuario,id} = JSON.parse(localStorage.getItem('user'))
            const idSession = localStorage.getItem('idSession')
            setUser(JSON.parse(localStorage.getItem('user')))

            setNombre(nombre_usuario)
            if(idSession!==md5(id+email_usuario+nombre_usuario)){
                localStorage.clear()
                setLogin(true)

            }
        } catch(err) {
            setLogin(true)
            localStorage.clear()
            
        }
    }

    useEffect( () => {
        loadData()
    }, [])

    if(goLogin){
        return <Navigate to="/login"/>
    }
    return (
        <div className="container-fluid">
            <div className="row flex-nowrap">
                <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-primary">
                    <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                        <a href="/" className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">
                            <span className="fs-5 fw-bolder d-none d-sm-inline">Dashboard</span>
                        </a>
                        <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                        
                            <li>
                                <Link to="/" className="nav-link px-0 align-middle text-white">
                                    <span className="ms-1 d-none d-sm-inline">Ingreso </span> 
                                </Link>
                                <ul className="submenu">
                                <li>
                                    <Link to="/leads" className="nav-link px-0 align-middle text-white">
                                    <span className="ms-1 d-none d-sm-inline"> Ingreso Leads </span>
                                    </Link>
                                </li>
                    
                                </ul>
                                            </li>
                            <li>
                                <Link to="/diagnosticar" className="nav-link px-0 align-middle text-white">
                                    <span className="ms-1 d-none d-sm-inline"> Diagnosticar</span>
                                </Link>
                            </li>
                            <li>
                <Link to="/presupuestar" className="nav-link px-0 align-middle text-white">
                  <span className="ms-1 d-none d-sm-inline"> Presupuestar</span>
                </Link>
                <ul className="submenu">
                <li>
                    <Link to="/enviarPresupuesto" className="nav-link px-0 align-middle text-white">
                      <span className="ms-1 d-none d-sm-inline"> Enviar Presupuesto  </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/aprobacion" className="nav-link px-0 align-middle text-white">
                      <span className="ms-1 d-none d-sm-inline"> Aprobacion </span>
                    </Link>
                  </li>
                  <li>
                    <Link to="/descuentos" className="nav-link px-0 align-middle text-white">
                      <span className="ms-1 d-none d-sm-inline"> Descuentos</span>
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                        <Link to="/recuperacion" className="nav-link px-0 align-middle text-white">
                                    <span className="ms-1 d-none d-sm-inline"> Recuperacion</span>
                         </Link>
                 </li>
                 <li>
                        <Link to="/cierre" className="nav-link px-0 align-middle text-white">
                                    <span className="ms-1 d-none d-sm-inline"> Cierre</span>
                         </Link>
                 </li>
                 <li>
                        <Link to="/retiro" className="nav-link px-0 align-middle text-white">
                                    <span className="ms-1 d-none d-sm-inline"> Retiro</span>
                         </Link>
                 </li>
                </ul>
             </div>
                </div>
                <div className="col p-0 m-0">
                    <div className='p-2 d-flex justify-content-center shadow'>
                        <h4>Sistema DrTech Administracion</h4>   
                          
                    </div>
                    {/*  <Diagnosticar/>         */}      
                     <Outlet /> 
                </div>
            </div>
        </div>
    )
}
Dashboard.propTypes = {
    setUser: PropTypes.func.isRequired,
  };

export default Dashboard