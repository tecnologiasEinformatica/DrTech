import { useState, useEffect, useCallback } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import ListarCierre from "./ListarCierre";

const Cierre = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIngresoId, setSelectedIngresoId] = useState(null);
  const [ListaCierre, setListaCierre] = useState([]);
  const [estado_cierre, setEstadoCierre] = useState('');
  const [formaPago_cierre, setPagoCierre] = useState('');
  const [montoPago_cierre, setMontoPagoCierre] = useState('');
  const [oc_cierre, setOcCierre] = useState('');
  const [numeroFactura_cierre, setNumeroFactura] = useState('');
  const [comprobanteFiele_cierre, setComprobanteFIle] = useState('');
  const [comentario_cierre, setComentarioCierre] = useState('');
  const [selectedIngreso, setSelectedIngreso] = useState({});

  const tiposEstadoCierre = ['PAGADO', 'PAGO PARCIAL', 'RECHAZADO', 'REVISADO'];
  const tiposFormaPago = ['TRANSFERENCIA', 'TARJETA', 'EFECTIVO', 'OC'];

  const fetchEmployeeList = useCallback(async () => {
    try {
      const limit = 100;
      const response = await axios.get(`/ingresos-y-diagnosticos/${currentPage}/${limit}`);
      setEmployeeList(response.data);

      const responseCierre = await axios.get(`/cierre/all/${currentPage}/${limit}`);
      setListaCierre(responseCierre.data); 
    } catch (error) {
      console.error('Error al obtener la lista:', error);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchEmployeeList();
  }, [currentPage, fetchEmployeeList]);

  const openModal = (employeeId) => {
    const selectedEmployee = employeeList.find((employee) => employee.id_ingreso === employeeId);
  
    if (selectedEmployee && selectedEmployee.id_ingreso) {
      setSelectedIngreso(selectedEmployee);
      setSelectedIngresoId(selectedEmployee.id_ingreso); // Asignamos el ID_ingreso aquí
    }
  };

  const registrarCierre = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('id_ingreso', selectedIngresoId);
      formData.append('estado_cierre', estado_cierre);
      formData.append('formaPago_cierre', formaPago_cierre);
      formData.append('montoPago_cierre', montoPago_cierre);
      formData.append('oc_cierre', oc_cierre);
      formData.append('numeroFactura_cierre', numeroFactura_cierre);
      formData.append('comprobanteFiele_cierre', comprobanteFiele_cierre);
      formData.append('comentario_cierre', comentario_cierre);

      const { data } = await axios.post(`cierre`, formData, {
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

  return (
    <>
      <div className='px-5 py-3'>
        <div className='d-flex justify-content-center mt-2'>
          <h3>Cierre</h3>
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
                    CREAR CIERRE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <ListarCierre ListaCierre={ListaCierre} currentPage={currentPage}/>

        <div className='modal fade' id='exampleModal' tabIndex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
          <div className='modal-dialog modal-lg'>
            <div className='modal-content'>
              <div className='modal-header custom-header' style={{ backgroundColor: 'blue', color: 'white' }}>
                <h1 className='modal-title fs-5' id='exampleModalLabel'>
                  CIERRE DE DIPOSITIVO
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

                <form encType="multipart/form-data" onSubmit={registrarCierre} >
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
                            setEstadoCierre(e.target.value);
                          }} 
                        >
                          <option>Seleccionar</option>
                          {tiposEstadoCierre.map((item, index) => (
                            <option key={index} value={item}>{item}</option>
                          ))}
                        </select>
                      </div>

                      <div className='mb-1'>
                        <label htmlFor='recipient-name' className='col-form-label'>
                          Forma de Pago
                        </label>
                        <select
                          type='text'
                          className='form-select'
                          onChange={(e) => {
                            setPagoCierre(e.target.value);
                          }} 
                        >
                          <option>Seleccionar</option>
                          {tiposFormaPago.map((item, index) => (
                            <option key={index} value={item}>{item}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="cierreFile" className="form-label">
                            Comprobante de Cierre (PDF, Excel, Imagen, etc.)
                          </label>
                          <input
                              type="file"
                              className="form-control"
                              id="cierreFile"
                              onChange={(e) => setComprobanteFIle(e.target.files[0])}
                              name="comprobanteFiele_cierre" // Asegúrate de usar el mismo nombre
                            />
                        </div>
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className='mb-1'>
                        <label htmlFor='recipient-name' className='col-form-label'>
                          MontoPagado
                        </label>
                        <input
                          type='text'
                          placeholder='Ingrese Monto Pagado'
                          className='form-control'
                          onChange={(e) => {
                            setMontoPagoCierre(e.target.value);
                          }} 
                        />
                      </div>

                      <div className='mb-1'>
                        <label htmlFor='recipient-name' className='col-form-label'>
                          Numero de OC
                        </label>
                        <input
                          type='text'
                          placeholder='Ingrese OC'
                          className='form-control'
                          onChange={(e) => {
                            setOcCierre(e.target.value);
                          }} 
                        />
                      </div>

                      <div className='mb-1'>
                        <label htmlFor='recipient-name' className='col-form-label'>
                          Numero de Factura
                        </label>
                        <input
                          type='text'
                          placeholder='Ingrese OC'
                          className='form-control'
                          onChange={(e) => {
                            setNumeroFactura(e.target.value);
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
                            setComentarioCierre(e.target.value);
                          }} 
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <button className='btn btn-success me-md-2' data-bs-dismiss='modal' type='submit'>
                    Guardar Cierre
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

export default Cierre;
