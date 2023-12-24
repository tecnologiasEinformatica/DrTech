import { useState, useEffect } from 'react';
import { Navigate } from "react-router-dom"
import axios from 'axios';
import md5 from 'md5';
import Swal from 'sweetalert2';

const Diagnosticar = () => {
  /* const [selectedIngreso, setSelectedIngreso] = useState(null); */
  const [selectedIngreso, setSelectedIngreso] = useState({});
  const [, setNombre] = useState('');
  const [, setUser] = useState(null);
  const [employeeList, setEmployeeList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [goPresupuestar, setGoPresupuestar] = useState(false)
 /*  const [, setIdIngreso] = useState(''); */
  const [marca_diagnostico, setMarcaDiagnostico] = useState('');
  const [tamaño_diagnostico, setTamañoDiagnostico] = useState('');
  const [capacidad_diagnostico, setCapacidadDiagnostico] = useState('');
  const [modelo_diagnostico, setModeloDiagnostico] = useState('');
  const [serial_diagnostico, setSerialDiagnostico] = useState('');
  const [falla_diagnostico, setFallaDiagnostico] = useState('');
  const [standar_diagnostico, setStandarDiagnostico] = useState('');
  const [respado_diagnostico, setRespaldoDiagnostico] = useState('');
  const [comentario_diagnostico, setComentarioDiagnostico] = useState('');
  const [costoInterno_diagnostico, setCostoInternoDiagnostico] = useState('');
  const [urgente_diagnostico, setUrgenteDiagnostico] = useState('');
  
  const [selectedIngresoId, setSelectedIngresoId] = useState(null);
  

  const tiposTamaño = ['2,5', '3,5', '1,8', 'M.2', 'Otro'];
  const tiposMarca = ['WD', 'Seagate', 'Toshiba', 'Hitachi', 'Samsung', 'SanDisk', 'Kingstone', 'Lacie', 'Otro'];
  const tiposFalla = ['Logico', 'Sectores', 'Firmware', 'Electronica', 'Headstack', 'Motor', 'Raid Logico', 'Raid Fisico'];
  const tiposUrgente = ['1', '2', '3', '4', '5', '6', '7'];
  const tiposStandard = ['2', '3', '4', '5', '6', '7'];

  const loadData = async () => {
    try {
      const { nombre_usuario, email_usuario, id } = JSON.parse(localStorage.getItem('user'));
      const idSession = localStorage.getItem('idSession');
      setUser(JSON.parse(localStorage.getItem('user')));

      setNombre(nombre_usuario);
      if (idSession !== md5(id + email_usuario + nombre_usuario)) {
        localStorage.clear();
      }
    } catch (err) {
      localStorage.clear();
    }
  };

  /* const limpiarCampos = (e) => {
    e.preventDefault();
    setIdIngreso('0');
    setMarcaDiagnostico('');
    setCapacidadDiagnostico('');
    setModeloDiagnostico('');
    setSerialDiagnostico('');
    setFallaDiagnostico('');
    setStandarDiagnostico('');
    setRespaldoDiagnostico('');
    setComentarioDiagnostico('');
    setCostoInternoDiagnostico('');
    setUrgenteDiagnostico('');
    setSelectedIngresoId(null);
  }; */

  const registrarDiagnostico = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`diagnostico`, {
        id_ingreso: selectedIngresoId,
        marca_diagnostico,
        tamaño_diagnostico,
        capacidad_diagnostico,
        modelo_diagnostico,
        serial_diagnostico,
        falla_diagnostico,
        standar_diagnostico,
        respado_diagnostico,
        comentario_diagnostico,
        costoInterno_diagnostico,
        urgente_diagnostico,
      });
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      setGoPresupuestar(true)
    } catch (err) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: err.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    /* limpiarCampos(); */
  };

  useEffect(() => {
    loadData();

    const fetchEmployeeList = async () => {
      try {
        const limit = 10;
        const response = await axios.get(`/ingreso/sin-diagnostico/${currentPage}/${limit}`);
        setEmployeeList(response.data);
      } catch (error) {
        console.error('Error al obtener la lista de empleados:', error);
      }
    };

    fetchEmployeeList();
  }, [currentPage]);

  const openModal = (employeeId) => {
    const selectedEmployee = employeeList.find((employee) => employee.id_ingreso === employeeId);
  
    /* console.log('selectedEmployee:', selectedEmployee); */
  
    if (selectedEmployee && selectedEmployee.id_ingreso) {
      setSelectedIngreso(selectedEmployee);
      setSelectedIngresoId(selectedEmployee.id_ingreso);
    }
  }

if(goPresupuestar){
  return <Navigate to="/presupuestar"/>
}

  return (
    <div className='px-5 py-3'>
       <div className='d-flex justify-content-center mt-2'>
        <h3>Diagnosticar</h3>
      </div>
      <table className='table table-striped'>
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
          {employeeList.map((employee) => (
            <tr key={employee.id_ingreso}>
              <td>{employee.id_ingreso}</td>
              <td>{employee.nombre}</td>
              <td>{employee.correo}</td>
              <td>{employee.telefono}</td>
              <td>{employee.reconocido}</td>
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
                  CREAR DIAGNOSTICO
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='modal fade' id='exampleModal' tabIndex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
        <div className='modal-dialog modal-lg'>
          <div className='modal-content'>
            <div className='modal-header custom-header' style={{ backgroundColor: 'blue', color: 'white' }}>
              <h1 className='modal-title fs-5' id='exampleModalLabel'>
                DIAGNOSTICAR DISPOSITIVO
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
              {/* {console.log('selectedIngreso:', selectedIngreso)} */}
{selectedIngreso && selectedIngreso.id_ingreso && (
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
                  
                </div>
              </div>
              )}

              <form onSubmit={registrarDiagnostico}>
                <div className='row'>
                  <div className='col-md-6'>
                    <div className='mb-1'>
                      <label htmlFor='recipient-name' className='col-form-label'>
                        Tamaño:
                      </label>
                      <select
                        type='text'
                        className='form-select'
                        onChange={(e) => {
                          setTamañoDiagnostico(e.target.value);
                        }}
                      >
                        <option>Seleccionar</option>
                        {tiposTamaño.map((item, index) => {
                          return <option key={index} value={item}>{item}</option>;
                        })}
                      </select>
                    </div>

                    <div className='mb-1'>
                      <label htmlFor='recipient-name' className='col-form-label'>
                        Marca
                      </label>
                      <select
                        type='text'
                        className='form-select'
                        onChange={(e) => {
                          setMarcaDiagnostico(e.target.value);
                        }}
                      >
                        <option>Seleccionar</option>
                        {tiposMarca.map((item, index) => {
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
                          setFallaDiagnostico(e.target.value);
                        }}
                      >
                        <option>Seleccionar</option>
                        {tiposFalla.map((item, index) => {
                          return <option key={index} value={item}>{item}</option>;
                        })}
                      </select>
                    </div>

                    <div className='mb-1'>
                      <label htmlFor='recipient-name' className='col-form-label'>
                        Urgente
                      </label>
                      <select
                        type='text'
                        className='form-select'
                        onChange={(e) => {
                          setUrgenteDiagnostico(e.target.value);
                        }}
                      >
                        <option>Seleccionar</option>
                        {tiposUrgente.map((item, index) => {
                          return <option key={index} value={item}>{item}</option>;
                        })}
                      </select>
                    </div>

                    <div className='mb-1'>
                      <label htmlFor='recipient-name' className='col-form-label'>
                        Standar
                      </label>
                      <select
                        type='text'
                        className='form-select'
                        onChange={(e) => {
                          setStandarDiagnostico(e.target.value);
                        }}
                      >
                        <option>Seleccionar</option>
                        {tiposStandard.map((item, index) => {
                          return <option key={index} value={item}>{item}</option>;
                        })}
                      </select>
                    </div>
                  </div>
                  <div className='col-md-6'>
                    <div className='mb-1'>
                      <label htmlFor='recipient-name' className='col-form-label'>
                        Capacidad
                      </label>
                      <input
                        type='text'
                        placeholder='Ingrese Tamaño'
                        className='form-control'
                        onChange={(e) => {
                          setCapacidadDiagnostico(e.target.value);
                        }}
                      />
                    </div>

                    <div className='mb-1'>
                      <label htmlFor='recipient-name' className='col-form-label'>
                        Modelo
                      </label>
                      <input
                        type='text'
                        placeholder='Ingrese Modelo'
                        className='form-control'
                        onChange={(e) => {
                          setModeloDiagnostico(e.target.value);
                        }}
                      />
                    </div>

                    <div className='mb-1'>
                      <label htmlFor='recipient-name' className='col-form-label'>
                        Serial
                      </label>
                      <input
                        type='number'
                        placeholder='Ingrese la Serial'
                        className='form-control'
                        onChange={(e) => {
                          setSerialDiagnostico(e.target.value);
                        }}
                      />
                    </div>

                    <div className='mb-1'>
                      <label htmlFor='recipient-name' className='col-form-label'>
                        Costo interno
                      </label>
                      <input
                        type='number'
                        placeholder='Ingrese Costo interno'
                        className='form-control'
                        onChange={(e) => {
                          setCostoInternoDiagnostico(e.target.value);
                        }}
                      />
                    </div>

                    <div className='mb-1'>
                      <label htmlFor='recipient-name' className='col-form-label'>
                        Valor respaldo
                      </label>
                      <input
                        type='number'
                        placeholder='Ingrese valor Respaldo'
                        className='form-control'
                        onChange={(e) => {
                          setRespaldoDiagnostico(e.target.value);
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
                          setComentarioDiagnostico(e.target.value);
                        }}
                      ></textarea>
                    </div>
                  </div>
                </div>
                <button  className='btn btn-success me-md-2' data-bs-dismiss='modal' type='submit'>
                  Crear Diagnóstico
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
  );
};

export default Diagnosticar;