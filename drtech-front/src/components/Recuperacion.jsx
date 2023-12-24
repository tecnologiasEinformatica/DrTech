import {  useState, useEffect, useCallback } from "react"
import axios from 'axios';
import Swal from 'sweetalert2';
import ListarRecuperacion from "./ListarRecuperacion";

const Recuperacion = () => {
    const [employeeList, setEmployeeList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
   
    const [selectedIngresoId, setSelectedIngresoId] = useState(null);
    const [ListarRecuperaciones, setListarRecuperaciones] = useState([]);
    const [selectedIngreso, setSelectedIngreso] = useState({});

    const [estado_recuperacion, setEstadoRecuperacion] = useState('');
    const [fallaProceso_recuperacion, setFallaRecuperacion] = useState('');
    const [gbRecuperados_recuperacion, setGbRecuperadosResupera] = useState('');
    const [comentarioTrabajo_recuperacion, setComentarioRecuperacion] = useState('');
  

    const tiposEstadoRecuperacion = ['EN RECUPERACION', 'TERMINADO', 'IRRECUPERABLE', 'REINGRESO'];
    const tiposFallaRecuperacion = ['LOGICA', 'SECTORES', 'FIRMWARE', 'ELECTRONICA','HEADSTACK', 'MOTOR','RAID LOGICO','RAID FISICO'];

  /*  const limpiarCampos = (e) => {
        e.preventDefault()
        setEstadoRecuperacion('')
        setFallaRecuperacion('')
        setGbRecuperadosResupera('')
        setComentarioRecuperacion('')
     }  */

    const fetchEmployeeList = useCallback(async () => {
        try {
          const limit = 10;
          const response = await axios.get(`/ingresos-y-diagnosticos/${currentPage}/${limit}`);
          setEmployeeList(response.data);
          const responseRecuperacion = await axios.get(`/recuperacion/all/${currentPage}/${limit}`);
          setListarRecuperaciones(responseRecuperacion.data);
        } catch (error) {
          console.error('Error al obtener la lista :', error);
        }
      }, [currentPage]);
  
      useEffect(() => {
        fetchEmployeeList();
    }, [currentPage, fetchEmployeeList,ListarRecuperaciones]);

    const openModal = (employeeId) => {
        const selectedEmployee = employeeList.find((employee) => employee.id_ingreso === employeeId);
      
        if (selectedEmployee && selectedEmployee.id_ingreso) {
          setSelectedIngreso(selectedEmployee);
          setSelectedIngresoId(selectedEmployee.id_ingreso); // Asignamos el ID_ingreso aquí
        }
      };

      const registroRecuperacion = async (e) => {
        e.preventDefault();
    
        try {
         /*  console.log("Datos que se están enviando:", {
            id_ingreso: selectedIngresoId,
            estado_recuperacion,
            fallaProceso_recuperacion,
            gbRecuperados_recuperacion,
            comentarioTrabajo_recuperacion,
          }); */
          const { data } = await axios.post(`recuperacion`, {
                id_ingreso: selectedIngresoId,
                estado_recuperacion,
                fallaProceso_recuperacion,
                gbRecuperados_recuperacion,
                comentarioTrabajo_recuperacion
            
          });
         /*  console.log("Respuesta del servidor:", data); */
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: data.message,
            showConfirmButton: false,
            timer: 1500,
          });
         /*  limpiarCampos();  */
          fetchEmployeeList()
        } catch (err) {
          Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: err.message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
       /*  limpiarCampos();  */
      };

    

  return (
    <>
    <div className='px-5 py-3'>
       <div className='d-flex justify-content-center mt-2'>
        <h3>Recuperacion</h3>
      </div>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>N Ingreso</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Telefono</th>
            <th>Fecha Ingreso</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {employeeList.map((employee) => (
            <tr key={employee.id_ingreso}>
              <td>{employee.id_ingreso}</td>
              <td>{employee.nombre}</td>
              <td>{employee.correo}</td>
              <td>{employee.telefono}</td>
              <td>{employee.fecha_ingreso}</td>
              <td>
                <button
                  type='button'
                  className='btn btn btn-success'
                  data-bs-toggle='modal'
                  data-bs-target='#exampleModal'
                  data-bs-whatever='@mdo'
                onClick={() => openModal(employee.id_ingreso)}  
                >
                  CREAR RECUPERACION
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
     
      <ListarRecuperacion ListarRecuperaciones={ListarRecuperaciones} currentPage={currentPage}/>
      <div className='modal fade' id='exampleModal' tabIndex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
        <div className='modal-dialog modal-lg'>
          <div className='modal-content'>
            <div className='modal-header custom-header' style={{ backgroundColor: 'blue', color: 'white' }}>
              <h1 className='modal-title fs-5' id='exampleModalLabel'>
                RECUPERACION
              </h1>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
                style={{ color: 'white' }}
              ></button>
            </div>
            <div className='modal-body'>
             <h4>Datos del Ingreso Seleccionado</h4>
              {selectedIngreso  && selectedIngreso.id_ingreso && (
                <div style={{ border: '1px solid #ddd', borderRadius: '1px', margin: '2px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', rowGap: '1px' }}>
                  <div style={{ background: '#f0f8ff', padding: '1px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>ID de Ingreso:</div>
                  <div style={{ background: '#f0f8ff', padding: '1px', borderBottom: '1px solid #ddd' }}>{selectedIngreso.id_ingreso}</div>
              
                  <div style={{ background: '#f0f8ff', padding: '1px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Nombre:</div>
                  <div style={{ background: '#f0f8ff', padding: '1px', borderBottom: '1px solid #ddd' }}>{selectedIngreso.nombre}</div>
              
                  <div style={{ background: '#f0f8ff', padding: '1px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Email:</div>
                  <div style={{ background: '#f0f8ff', padding: '1px', borderBottom: '1px solid #ddd' }}>{selectedIngreso.correo}</div>
              
                  <div style={{ background: '#f0f8ff', padding: '1px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Telefono:</div>
                  <div style={{ background: '#f0f8ff', padding: '1px', borderBottom: '1px solid #ddd' }}>{selectedIngreso.telefono}</div>
              
                  <div style={{ background: '#f0f8ff', padding: '1px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>¿Disco Reconocido?:</div>
                  <div style={{ background: '#f0f8ff', padding: '1px', borderBottom: '1px solid #ddd' }}>{selectedIngreso.reconocido}</div>
              
                  <div style={{ background: '#f0f8ff', padding: '1px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>A Recuperar:</div>
                  <div style={{ background: '#f0f8ff', padding: '1px', borderBottom: '1px solid #ddd' }}>{selectedIngreso.recupera_ingreso}</div>
              
                  <div style={{ background: '#f0f8ff', padding: '1px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Comentario:</div>
                  <div style={{ background: '#f0f8ff', padding: '1px', borderBottom: '1px solid #ddd' }}>{selectedIngreso.comentario_cliente}</div>
                  <div style={{ background: '#f0f8ff', padding: '1px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Falla diagnostico:</div>
                  <div style={{ background: '#f0f8ff', padding: '1px', borderBottom: '1px solid #ddd' }}>{selectedIngreso.falla_diagnostico}</div>
                  <div style={{ background: '#f0f8ff', padding: '1px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Marca:</div>
                  <div style={{ background: '#f0f8ff', padding: '1px', borderBottom: '1px solid #ddd' }}>{selectedIngreso.marca_diagnostico}</div>
                  <div style={{ background: '#f0f8ff', padding: '1px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Valor Standar:</div>
                  <div style={{ background: '#f0f8ff', padding: '1px', borderBottom: '1px solid #ddd' }}>{selectedIngreso.standar_diagnostico}</div>
                  <div style={{ background: '#f0f8ff', padding: '1px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Modelo:</div>
                  <div style={{ background: '#f0f8ff', padding: '1px', borderBottom: '1px solid #ddd' }}>{selectedIngreso.modelo_diagnostico}</div>
                  <div style={{ background: '#f0f8ff', padding: '1px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Comentario diagnostico:</div>
                  <div style={{ background: '#f0f8ff', padding: '1px', borderBottom: '1px solid #ddd' }}>{selectedIngreso.comentario_diagnostico}</div>
                </div>
              </div>
              )} 

              <form  onSubmit={registroRecuperacion}>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='mb-1'>
                      <label htmlFor='recipient-name' className='col-form-label'>
                        Estado:
                      </label>
                      <select
                        type='text'
                        className='form-select'
                        onChange={(e) => {
                            setEstadoRecuperacion(e.target.value);
                        }}
                      >
                        <option>Seleccionar</option>
                        {tiposEstadoRecuperacion.map((item, index) => {
                          return <option key={index} value={item}>{item}</option>;
                        })}
                      </select>
                    </div>

                    <div className='mb-1'>
                      <label htmlFor='recipient-name' className='col-form-label'>
                        Falla
                      </label>
                      <select
                        type='text'
                        className='form-select'
                        onChange={(e) => {
                        setFallaRecuperacion(e.target.value);
                        }}
                      >
                        <option>Seleccionar</option>
                        {tiposFallaRecuperacion.map((item, index) => {
                          return <option key={index} value={item}>{item}</option>;
                        })}
                      </select>
                    </div>
    
                  </div>
                  <div className='col-md-6'>
                    <div className='mb-1'>
                      <label htmlFor='recipient-name' className='col-form-label'>
                        GB RECUPERADOS
                      </label>
                      <input
                        type='text'
                        placeholder='Ingrese GB Recuperados'
                        className='form-control'
                        onChange={(e) => {
                            setGbRecuperadosResupera(e.target.value);
                        }}
                      />
                    </div>


                    <div className='mb-1'>
                      <label htmlFor='message-text' className='col-form-label'>
                        Comentario
                      </label>
                      <textarea
                        className='form-control'
                        onChange={(e) => {
                            setComentarioRecuperacion(e.target.value);
                        }}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <button  className='btn btn-success me-md-2' data-bs-dismiss='modal' type='submit'>
                  Crear Recuperacion
                </button>
              </form>
            </div>
            <div className='modal-footer'>
              <button type='button' className='btn btn-secondary' data-bs-dismiss='modal'>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div> 

      <div className='d-flex justify-content-center mt-2'>
        <button
          className='btn btn-primary'
          onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
          disabled={currentPage === 1}
        >
          Previous Page
        </button>
        <span className='mx-2'>Page {currentPage}</span>
        <button className='btn btn-primary' onClick={() => setCurrentPage((prevPage) => prevPage + 1)}>
          Next Page
        </button>
      </div> 
    </div>
   
     
     </>
  )
}

export default Recuperacion