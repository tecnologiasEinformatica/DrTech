import { useState } from "react";
import { Navigate } from "react-router-dom"
import Titulo from "./common/Titulo";
import axios from "axios"
import Swal from 'sweetalert2'
import md5 from 'md5'
import Error from './common/Error' 

const Login = () => {
  const [email_usuario,setEmailUsuario] = useState('')
  const [password,setPassword] = useState('')
  const [, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [goDashboard, setGoDashboard] = useState(false)

  const tituloRegistro = {
    texto: 'INICIAR SESION',
    estilo: 'estilo-registro',
  };

  const login = async (e) => {
    e.preventDefault()

    
    //validar
    if([email_usuario,password].includes('') || [email_usuario,password].includes('#') ){
        setError(true)
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: "Todos los campos son Obligatorios ",
            showConfirmButton: false,
            timer: 1500
          })
        return
    }else setError(false)
    setLoading(true)
    try {
        const { data } = await axios.post(
            `login` , 
            {
                email_usuario,
                password

            }
        )
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            html: `Bienvenido <strong>${data.nombre_usuario}</strong>`,
            showConfirmButton: false,
            timer: 2000
          })
          let dataRegis = {email_usuario}
          dataRegis.id = await data.id_usuario
          dataRegis.email_usuario = await data.email_usuario
          dataRegis.nombre_usuario = await data.nombre_usuario
          const idSession = await md5(dataRegis.id+dataRegis.email_usuario+dataRegis.nombre_usuario)
          localStorage.setItem('user', JSON.stringify(dataRegis))
          localStorage.setItem('idSession',idSession)
          setGoDashboard(true)
    } catch(err) {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: err.message.includes('401')?'DATOS DE ACCESO INCORRECTOS':err.message,
            showConfirmButton: false,
            timer: 2000
          })
    }
   
 }

 if(goDashboard){
  return <Navigate to="/dashboard"/>
}

  return (
    <>
     <Titulo titulo={tituloRegistro} />
     <form onSubmit={login}>
        <div className="container" style={{paddingTop: 60}}>
          <div className="container-fluid h-custom">
            <div className="row d-flex justify-content-center align-items-center h-100">
            {error && <Error mensaje='Todos los campos son obligatorio'/>}
              <div className="col-md-9 col-lg-6 col-xl-5">
              <img src="./../public/image001.png" className="bi me-2"  />
              </div>
              <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <div style={{ background: 'rgba(0, 0, 0, 0.5)', padding: '20px', borderRadius: '10px' }}>
                  <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start">
                    <p className="lead fw-normal mb-0 me-3" style={{ color: 'white' }}>INGRESE CON SU CUENTA</p>
                  </div>
                 {/*    <h1 style={{color: 'red', fontSize: '15px', textAlign: 'center', marginTop: '20px'}}>{error && error}</h1> */}
                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      className="form-control form-control-lg"
                      placeholder="Ingrese Email valido"
                      onChange={(e) => setEmailUsuario(e.target.value)}
                      value={email_usuario}
                    />
                    <label className="form-label" style={{ color: 'white' }}>Ingrese EMail</label>
                  </div>
                  <div className="form-outline mb-3">
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Ingrese Password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                    <label className="form-label" style={{ color: 'white' }}>Password</label>
                  </div>
    
              
    
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-3">
                    <button className="btn btn-success me-md-2" type="submit">INICAR SESION</button>
                    
                  </div>
    
                </div>
              </div>
            </div>


            
          </div>
        </div>
        </form>
    </>
  )



};

  



   
export default Login;