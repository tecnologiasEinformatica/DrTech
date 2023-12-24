import { useState, useEffect, useCallback } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import ListarRetiro from "./ListarRetiro";
const Retiro = () => {
    const [nombre_retiro, setNombreRetiro] = useState('');
    const [rut_retiro, setRutRetiro] = useState('');
    const [comprobanteFile_retiro,  setComprobanteFIleRetiro] = useState('');
    const [descripcion_retiro, setDescripcionRetiro] = useState('');


    const [selectedRetiro, setSelectedRetiro] = useState(null);
    const [listarIngreso, setlistarIngreso] = useState([]);
    const [listaRetiro, setlistarRetiro] = useState([]);
   
    const [currentPage, setCurrentPage] = useState(1);

    const registrarRetiro = async (e) => {
        e.preventDefault();
    
        try {
            const formData = new FormData();
            formData.append('id_ingreso', selectedRetiro);
            formData.append('nombre_retiro', nombre_retiro);
            formData.append('rut_retiro', rut_retiro);
            formData.append('comprobanteFile_retiro', comprobanteFile_retiro);
            formData.append('descripcion_retiro', descripcion_retiro);
    
            const { data } = await axios.post(`retiro`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: data.message,
                showConfirmButton: false,
                timer: 1500,
            });
        } catch (err) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: err.message,
                showConfirmButton: false,
                timer: 1500,
            });
    
            console.error(err.message);
        }
    };

    const fetchPresupuestoList = useCallback(async () => {
        try {
          const limit = 10;
          const response = await axios.get(`/ingreso/all/${currentPage}/${limit}`);
          setlistarIngreso(response.data);
        const responseretiro = await axios.get(`/retiro/all/${currentPage}/${limit}`);
        setlistarRetiro(responseretiro.data); 
        } catch (error) {
          console.error('Error al obtener la lista:', error);
        }
      }, [currentPage]);
    
      useEffect(() => {
        fetchPresupuestoList();
      }, [currentPage, fetchPresupuestoList]);
      
 const openModal = (employee) => {
        setSelectedRetiro(employee.id_ingreso);  
      }; 

  return (
    <div className='px-5 py-3'>
    <div className='d-flex justify-content-center mt-2'>
      <h3>Retiros</h3>
    </div>
    <div className='mt-3'>
      <table className="table table-striped">
        <thead>
          <tr>
          <th>N Ingreso</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Telefono</th>
            <th>Disco Reconocido</th>
            <th>Fecha Ingreso</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {listarIngreso.map((employee) => (
           <tr key={employee.id_ingreso}>
           <td>{employee.id_ingreso}</td>
           <td>{employee.nombre}</td>
           <td>{employee.correo}</td>
           <td>{employee.telefono}</td>
           <td>{employee.reconocido}</td>
           <td>{employee.fecha_ingreso}</td>
              <td>
                <div className='d-flex justify-content-center mt-2'>
                  <button
                    type='button'
                    className='btn btn-info btn-sm'
                    data-bs-toggle='modal'
                    data-bs-target='#exampleModal'
                    data-bs-whatever='@mdo'
                  onClick={() => openModal(employee)}
                  >
                    CREAR RETIRO
                  </button>
                  
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  <ListarRetiro listaRetiro={listaRetiro} currentPage={currentPage}/> 
    <div className='modal fade' id='exampleModal' tabIndex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
        <div className='modal-dialog modal-lg'>
            <div className='modal-content'>
              <div className='modal-header custom-header' style={{ backgroundColor: 'blue', color: 'white' }}>
                <h1 className='modal-title fs-5' id='exampleModalLabel'>
                  Retiro de Dispositivo 
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
               {/*  <h4>Datos del Ingreso Seleccionado</h4> */}
               {/*  {selectedIngreso && (
                  <div style={{ border: '1px solid #ddd', borderRadius: '1px', margin: '2px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', rowGap: '1px' }}>
                      <div style={{ background: '#f0f8ff', padding: '1px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>ID de Ingreso:</div>
                      <div style={{ background: '#f0f8ff', padding: '1px', borderBottom: '1px solid #ddd' }}>{selectedIngreso.id_ingreso}</div>
                      <div style={{ background: '#f0f8ff', padding: '1px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Falla:</div>
                      <div style={{ background: '#f0f8ff', padding: '1px', borderBottom: '1px solid #ddd' }}>{selectedIngreso.falla_diagnostico}</div>
                      <div style={{ background: '#f0f8ff', padding: '1px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Valor Respaldo:</div>
                      <div style={{ background: '#f0f8ff', padding: '1px', borderBottom: '1px solid #ddd' }}>{selectedIngreso.respado_diagnostico}</div>
                      <div style={{ background: '#f0f8ff', padding: '1px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Costo Interno:</div>
                      <div style={{ background: '#f0f8ff', padding: '1px', borderBottom: '1px solid #ddd' }}>{selectedIngreso.costoInterno_diagnostico}</div>
                      <div style={{ background: '#f0f8ff', padding: '1px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Comentraio Diagnostico:</div>
                      <div style={{ background: '#f0f8ff', padding: '1px', borderBottom: '1px solid #ddd' }}>{selectedIngreso.comentario_diagnostico}</div>
                      <div style={{ background: '#f0f8ff', padding: '1px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Serial Diagnostico:</div>
                      <div style={{ background: '#f0f8ff', padding: '1px', borderBottom: '1px solid #ddd' }}>{selectedIngreso.serial_diagnostico}</div>
                      <div style={{ background: '#f0f8ff', padding: '1px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Modelo Diagnostico:</div>
                      <div style={{ background: '#f0f8ff', padding: '1px', borderBottom: '1px solid #ddd' }}>{selectedIngreso.modelo_diagnostico}</div>
                    </div>
                  </div>
                )} */}

                <form encType="multipart/form-data"  onSubmit={registrarRetiro}>
                  <div className='row'>
                    <div className='col-md-6'>
                    <div className='mb-1'>
                        <label htmlFor='recipient-name' className='col-form-label'>
                          Nombre
                        </label>
                        <input
                          type='text'
                          placeholder='Ingrese Nombre'
                          className='form-control'
                           onChange={(e) => {
                            setNombreRetiro(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className='col-md-6'>
                    <div className='mb-1'>
                        <label htmlFor='recipient-name' className='col-form-label'>
                          Rut
                        </label>
                        <input
                          type='text'
                          placeholder='Ingrese Rut'
                          className='form-control'
                          onChange={(e) => {
                            setRutRetiro(e.target.value);
                          }}
                        />
                      </div>
                       
                    </div>
                    <div className="col-md-6">
    <div className="mb-3">
      <label htmlFor="comprobanteFile" className="form-label">
        Comprobante de Retiro (PDF, Excel, Imagen, etc.)
      </label>
      <input
        type="file"
        className="form-control"
        id="comprobanteFile"
        onChange={(e) => setComprobanteFIleRetiro(e.target.files[0])}
        name="comprobanteFile_retiro" // Nombre del campo debe coincidir con el backend
      />
    </div>
  </div>
                    <div className='col-md-6'>
                    <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea2" className="form-label">Comentraio</label>
          <textarea className="form-control" id="exampleFormControlTextarea2" rows="3" onChange={(e) => setDescripcionRetiro(e.target.value)} value={descripcion_retiro}></textarea>
         </div>
                  
                    </div>
                  </div>
                  <button className='btn btn-success me-md-2' data-bs-dismiss='modal' type='submit'>
                        GUARDAR RETIRO
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
      <button
        className='btn btn-primary'
        onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
      >
        Next Page
      </button>
    </div> 
  </div>
  )
}

export default Retiro