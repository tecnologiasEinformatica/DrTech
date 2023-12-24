import {  useEffect, useState, useCallback } from "react"
import { Navigate } from "react-router-dom"

import axios from "axios"
import Swal from "sweetalert2"
/* import md5 from "md5"  */

import Titulo from "./common/Titulo"
import Error from "./common/Error"
import ListarLeads from "./ListarLeads";



const Leads = () => {

   /*  const [  nombre,  setNombre ] = useState('') */
   const [goLeads] = useState(false) 
    const [loading, setLoading] = useState(false)
    const [error] = useState(false)
    const [nombre_leads, setNombreLeads] = useState('')
    const [telefono_leads, setTelefonoLeads] = useState('')
    const [correo_leads, setCorreoLeads] = useState('')
    const [comentarios_leads, setComentarioLeads] = useState('')
    const [accion_leads, setAccionLeads ] = useState('')

    const [employeeList, setEmployeeList] = useState([]);
  const [currentPage] = useState(1);


    const AccionLeads = ['Contactar en 1 Dias', 'Contactar en 2 Dias', 'Contactar en 3 Dias'];

    const tituloLeads = {
        texto: 'Registrar Leads ',
        estilo: 'estilo-registro',
      };

      const fetchEmployeeList = useCallback(async () => {
        try {
          const limit = 10;
          const response = await axios.get(`/leads/all/${currentPage}/${limit}`);
          setEmployeeList(response.data);
        } catch (error) {
          console.error('Error al obtener la lista :', error);
        }
      }, [currentPage]);
  
      useEffect(() => {
        fetchEmployeeList();
    }, [currentPage, fetchEmployeeList]);

      const limpiarCampos = (e) => {
        e.preventDefault()
        setNombreLeads('')
        setTelefonoLeads('')
        setCorreoLeads('')
        setAccionLeads('')
     }

     const registroLeads = async (e) => {
      e.preventDefault()
      setLoading(true)
      if ([nombre_leads,telefono_leads,correo_leads,comentarios_leads,accion_leads].includes('')){
        Swal.fire({
          position: "top-end",
          icon: "warning",
          title: "Debe llenar todos los campos",
          showConfirmButton: false,
          timer: 1500
        });
        
        setLoading(false)
        return
      } else if(!AccionLeads.includes(accion_leads)){
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Debe llenar todos los campos",
          showConfirmButton: false,
          timer: 1500
        });
        return
      }else{
        try {
          const { data } = await axios.post( 
            `leads`,
            {
              nombre_leads,
              telefono_leads,
              correo_leads,
              comentarios_leads,
              accion_leads
            
            }
          )
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: data.message,
            showConfirmButton: false,
            timer: 1500
          });
          fetchEmployeeList()
        } catch (err) {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: err.message,
            showConfirmButton: false,
            timer: 1500
          });
        }
        setLoading(false)
        limpiarCampos()
      }
    }

  /*   const loadData = async () => {
        try{
            const {nombre_usuario,username_usuario,email_usuario, id } = JSON.parse(localStorage.getItem('user'))
            const idSession = localStorage.getItem('idSession')  
            setUser(JSON.parse(localStorage.getItem('user')))
            setNombre(nombre_usuario)
            if(idSession!==md5(id+email_usuario+username_usuario)){
                localStorage.clear()
                setLogin(true)
            }else{
             getAsignacionTrabajoAPi()
            }
        }catch(err){
            setLogin(true)
            localStorage.clear()
        }
    }
    useEffect(() => {
        loadData()
    }, []) */

    if(goLeads){
        return <Navigate to="/leads"/>
    } 
  return (
   <>
       <Titulo titulo={tituloLeads} />
     <form  onSubmit={registroLeads}  >
     
    <div className="container ">
    
      <div className="row">
        <div className="col">
        
        <div className="card border mb-3" style={{ textAlign: 'center' }}>
        <h3>Ingresar Leads</h3> 
            <div className="card-body">
           
              <div className="mb-3">
                
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Nombre "
                  onChange={(e) => setNombreLeads(e.target.value)}
                  value={nombre_leads} 
                   
                />
              </div>
              <div className="mb-3">
                
                <input
                  type="text"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Telefono "
                   onChange={(e) => setTelefonoLeads(e.target.value)}
                  value={telefono_leads} 
                   
                />
              </div>
              <div className="mb-3">
                
                <input
                  type="email"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Mail"
                 onChange={(e) => setCorreoLeads(e.target.value)}
                  value={correo_leads} 
                   
                />
              </div>
              <div className='mb-1'>
                      
                      <textarea
                        className='form-control'
                        placeholder="Comentario"
                        onChange={(e) => {
                            setComentarioLeads(e.target.value);
                        }} 
                        value={comentarios_leads}
                      ></textarea>
                    </div>

                    <div className='mb-1'>
                      <label htmlFor='recipient-name' className='col-form-label'>
                        Accion:
                      </label>
                      <select
                        type='text'
                        className='form-select'
                          onChange={(e) => {
                            setAccionLeads(e.target.value);
                        }} 
                         value={accion_leads} 
                      >
                        <option value=''>Seleccionar</option>
                         {AccionLeads.map((item, index) => {
                          return <option key={index} value={item}>{item}</option>;
                        })} 
                      </select>
                    </div>

                   

              <div className="d-grid mb-3">

                {
                  loading?
                    <>
                      <div className="spinner-border text-success mx-auto"  role="status">
                      <span className="visually-hidden">Loading...</span>
                      </div>
                    </>
                    :(
                      <>
                      <button className="btn btn-warning me-md-2" type="submit"> Registrar Leads</button>
                     
                      <button  onClick={limpiarCampos}   className="btn btn-danger me-md-2 mt-3" type="button">Cancelar</button>
                      </>
                    )
                }

               
              </div>
              {error && <Error mensaje='Todos los campos son obligatorio'/>}
            </div>
          </div>
        </div>
        <div className="col-8 " >
        <div className="card border mb-3">
        <div className="card-body">
          <ListarLeads employeeList={employeeList} currentPage={currentPage}/>
         {/*  <ListarPresupuestos employeeList={employeeList} currentPage={currentPage} setCurrentPage={setCurrentPage} presupuesto={presupuesto} setPresupuesto={setPresupuesto}/>
         */}
          
        </div>
        
       
        
      
        </div>
        
        </div>
      
       </div>
     </div>
   </form>
   </>
  )
}


export default Leads