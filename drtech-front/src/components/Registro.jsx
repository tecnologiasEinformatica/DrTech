import { useState } from "react"
import { Navigate } from "react-router-dom"
import Titulo from "./common/Titulo"
import axios from "axios"
import Swal from "sweetalert2"
import Error from "./common/Error"
import md5 from 'md5'

const Registro = () => {
 const [nombre_usuario, setNombreUsuario] = useState('')
 const [email_usuario, setEmailUsuario] = useState('')
 const [password, setpasswordUsuario] = useState('')
 const [passwordConfirm, setpasswordConfirmUsuario] = useState('')
 const [tipo_usuario, setTipoUsuario] = useState('')
 const [, setLoading] = useState(false)
 const [error, setError] = useState(false)
 const [goLogin, setGoLogin] = useState(false)

 const limpiarCampos = (e) => {
    e.preventDefault()
    setNombreUsuario('')
    setEmailUsuario('')
    setpasswordUsuario('')
    setpasswordConfirmUsuario('')
    setTipoUsuario('')
 }

 const tituloRegistro = {
    texto: 'Registrar Usuario ',
    estilo: 'estilo-registro',
  };

 const registrar = async (e) => {
    e.preventDefault()

    let dataRegis = {nombre_usuario,email_usuario}
    //validar
    if([nombre_usuario,email_usuario,password,passwordConfirm,tipo_usuario].includes('') || [nombre_usuario,email_usuario,passwordConfirm,tipo_usuario].includes('#') ){
        setError(true)
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: "Todos los campos son Obligatorios ",
            showConfirmButton: false,
            timer: 1500
          })
        return
    }else  if(password!==passwordConfirm ){
        setpasswordUsuario('')
        setpasswordConfirmUsuario('')
        Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: "Las contraseñas no coinciden",
            showConfirmButton: false,
            timer: 1500
          })
        setError(true)
        return
    }else setError(false)
    setLoading(true)
    try {
        const { data } = await axios.post(
            `usuario` , 
            {
                nombre_usuario,
                email_usuario,
                password,
                tipo_usuario

            }
        )
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: data.message,
            showConfirmButton: false,
            timer: 1500
          })
          dataRegis.id = await data.data.insertId
          const idSession = await md5(dataRegis.id+dataRegis.email_usuario+dataRegis.nombre_usuario)
          localStorage.setItem('user', JSON.stringify(dataRegis))
          localStorage.setItem('idSession',idSession)
          setGoLogin(true)
    } catch(err) {
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: err.message,
            showConfirmButton: false,
            timer: 1500
          })
    }
    limpiarCampos(e)
 }

    if(goLogin){
        return <Navigate to="/dashboard"/>
    }
    return (
        <>
          <Titulo titulo={tituloRegistro} />
          <form  onSubmit={registrar} >
            <div className="container ">
              <div className="row">
                <div className="col">
                <img src="./../public/header001.jpg" className="bd-placeholder-img" width="100%" height="100%" alt="Slide 1" aria-hidden="true" preserveAspectRatio="xMidYMid slice" />
                </div>
                <div className="col-6 card" >
                  <div className="card border mb-3">
                    <div className="card-body">
                      <h5 className="card-title text-center">REGISTRO  USUARIOS</h5>
                    
                      <div className="mb-3">
                        <label className="form-label">
                          Nombre de usuario
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          aria-describedby="emailHelp"
                          onChange={(e) => setNombreUsuario(e.target.value)}
                          value={nombre_usuario} 
                        />
    
                      </div>
                      <div className="mb-3">
                        <label className="form-label">
                          Email address
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          aria-describedby="emailHelp"
                          onChange={(e) => setEmailUsuario(e.target.value)}
                          value={email_usuario} 
                        />
    
                      </div>
                      <div className="mb-3">
                        <label className="form-label">
                          Contraseña
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          aria-describedby="emailHelp"
                          onChange={(e) => setpasswordUsuario(e.target.value)}
                          value={password} 
                        />
    
                      </div>
                      <div className="mb-3">
                        <label className="form-label">
                          Confirmar Contraseña
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          aria-describedby="emailHelp"
                           onChange={(e) => setpasswordConfirmUsuario(e.target.value)}
                          value={passwordConfirm} 
                        />
    
                      </div>
                      <div className="mb-3">
                        <label className="form-label">
                         Tipo de Usuario
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          aria-describedby="emailHelp"
                          onChange={(e) => setTipoUsuario(e.target.value)}
                          value={tipo_usuario}  
                        />
    
                      </div>
                      <div className="d-grid gap-2 d-md-flex justify-content-md-end mb-3">
                        <button className="btn btn-success me-md-2" type="submit">Crear Usuario</button>
                        <button  onClick={limpiarCampos}  className="btn btn-primary" type="button">Cancelar</button>
                      </div>
                      {error && <Error mensaje='Todos los campos son obligatorio'/>} 
                    </div>
                  </div>
    
                </div>
    
              </div>
            </div>
          </form>
        </>
      )
}

export default Registro