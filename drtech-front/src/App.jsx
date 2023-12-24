import { useEffect, useState } from "react"
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import Ingreso from "./components/Ingreso"
import Login from "./components/Login"
import Registro from "./components/Registro"
import Dashboard from "./components/Dashboard"
import Diagnosticar from "./components/Diagnosticar"
import Presupuestar from "./components/Presupuestar"
import Aprobacion from "./components/Aprobacion"
import Presupuesto from "./components/Presupuesto"
import Leads from "./components/Leads"
import Recuperacion from "./components/Recuperacion"
import Cierre from "./components/Cierre"
import EnviarPresupuestoWhasp from "./components/EnviarPresupuestoWhasp"
import Retiro from "./components/Retiro"



const App = () => {
  const [user,setUser] = useState(undefined)


  const logOut = () => {
    localStorage.clear()
    setUser(undefined)
  }

  useEffect(() => {
    
  }, [user])


  return (
    <BrowserRouter>

    <div className="container">
        <header className="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
              <Link to='/' className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
                <img src="./../public/image001.png" className="bi me-2" width="30%" height="70%" />
                <span className="fs-2 mr-4 text-primary d-none d-sm-block ms-30">Sistema DrTech</span>
             </Link>
          <ul className="nav nav-pills">
            <li className="nav-item"><Link to='/'className="nav-link" ></Link></li>
            <li className="nav-item"><Link to='/' className="nav-link"></Link></li>
            
            {
              user!==undefined?(
                <>
                <li className="nav-item"><Link to='/login'  className="nav-link link-body-emphasis px-2">Usuario Conectado: <strong>{user.nombre_usuario.toUpperCase()}</strong></Link></li>
                <li className="nav-item"><Link to='/login' onClick={logOut} className="nav-link active" aria-current="page">Cerrar Sesion</Link></li>
                <li className="nav-item ms-2"><Link to='/registro' className="nav-link active" aria-current="page">Registrar</Link></li>
                </>
              ):(
                <li className="nav-item"><Link to='/login' className="nav-link active" aria-current="page">Iniciar Sesion</Link></li>
              )
            }
            
          </ul>
        </header>
      </div>  
 
      <div className="container">
      <Routes>
        <Route path="/" element={<Ingreso/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/registro" element={<Registro/>}/>
        <Route path="/dashboard" element={<Dashboard setUser={setUser}/>}/>
        <Route path="/diagnosticar" element={<Diagnosticar/>}/>
        <Route path="/presupuestar" element={<Presupuestar/>}/> 
        <Route path="/aprobacion" element={<Aprobacion/>}/>
        <Route path="/descuentos" element={<Presupuesto/>}/> 
        <Route path="/leads" element={<Leads/>}/>  
        <Route path="/recuperacion" element={<Recuperacion/>}/> 
        <Route path="/cierre" element={<Cierre/>}/> 
        <Route path="/enviarPresupuesto" element={<EnviarPresupuestoWhasp/>}/> 
        <Route path="/retiro" element={<Retiro/>}/>
      </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
