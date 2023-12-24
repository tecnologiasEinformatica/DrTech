import { useState, useEffect } from 'react';
import { Navigate } from "react-router-dom"
import axios from 'axios';
import Swal from 'sweetalert2';

const Presupuestar = () => {
  const [employeeList, setEmployeeList] = useState([]);
  /* const [presupuesto, setpresupuesto] = useState([]); */
  const [currentPage, setCurrentPage] = useState(1);
  const [goAprobacion, setGoAprobacion] = useState(false);

  const [netoStandar_presupuesto, setNetoPresupuesto] = useState('');
  const [medioRespaldo_presupuesto, setRespaldoPresupuesto] = useState('');
  const [selectedIngreso, setSelectedIngreso] = useState(null);
  const [selectedIngresoId, setSelectedIngresoId] = useState(null);

  const tiposRespaldoPresupuesto = ['DrTech 1TB', 'DrTech 2TB', 'DrTech 128GB', 'Respaldo Cliente'];

  useEffect(() => {
    const fetchEmployeeList = async () => {
      try {
        const limit = 10;
        const response = await axios.get(`/ingresos-y-diagnosticos/${currentPage}/${limit}`);      
        setEmployeeList(response.data);
        /* const responsePresupuesto = await axios.get(`/ingresos-y-diagnosticos-sin-presupuesto/${currentPage}/${limit}`);      
        setpresupuesto(responsePresupuesto.data); */
      } catch (error) {
        console.error('Error al obtener la lista de empleados:', error);
      }
    };

    fetchEmployeeList();
  }, [currentPage]);

  const registrarPresupuesto = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`presupuesto`, {
        id_ingreso: selectedIngresoId,
        netoStandar_presupuesto,
        medioRespaldo_presupuesto,
      });
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      setGoAprobacion(true);
    } catch (err) {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: err.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const openModal = async (employeeId) => {
    const selectedEmployee = employeeList.find((employee) => employee.id_diagnostico === employeeId);

    if (selectedEmployee && selectedEmployee.id_ingreso) {
      setSelectedIngreso(selectedEmployee);
      setSelectedIngresoId(selectedEmployee.id_ingreso);
    }
  };

  if(goAprobacion){
    return <Navigate to="/aprobacion"/>
  }

  return (
    <div className='px-5 py-3'>
      <div className='d-flex justify-content-center mt-2'>
        <h3>Presupuestar</h3>
      </div>
      <div className='mt-3'>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>N Ingreso</th>
              <th>Fecha Diagnostico</th>
              <th>Falla</th>
              <th>Respaldo</th>
              <th>Serial</th>
              <th>Costo Interno</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            
            {employeeList.map(employee => (
              <tr key={employee.id_diagnostico}>
                <td>{employee.id_ingreso}</td>
                <td>{employee.fecha_diagnostico}</td>
                <td>{employee.falla_diagnostico}</td>
                <td>{employee.respado_diagnostico}</td>
                <td>{employee.serial_diagnostico}</td>
                <td>{employee.costoInterno_diagnostico}</td>
                <td>
                  <button
                    type='button'
                    className='btn btn-warning'
                    data-bs-toggle='modal'
                    data-bs-target='#exampleModal'
                    data-bs-whatever='@mdo'
                    onClick={() => openModal(employee.id_diagnostico)}
                  >
                    CREAR PRESUPUESTO
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
                  PRESUPUESTAR DIAGNOSTICO
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
                {selectedIngreso && (
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

                      <div style={{ background: '#f0f8ff', padding: '1px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Falla:</div>
                      <div style={{ background: '#f0f8ff', padding: '1px', borderBottom: '1px solid #ddd' }}>{selectedIngreso.falla_diagnostico}</div>
                      <div style={{ background: '#f0f8ff', padding: '1px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Valor Respaldo:</div>
                      <div style={{ background: '#f0f8ff', padding: '1px', borderBottom: '1px solid #ddd' }}>{selectedIngreso.respado_diagnostico}</div>
                      <div style={{ background: '#f0f8ff', padding: '1px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Costo Interno:</div>
                      <div style={{ background: '#f0f8ff', padding: '1px', borderBottom: '1px solid #ddd' }}>{selectedIngreso.costoInterno_diagnostico}</div>
                      <div style={{ background: '#f0f8ff', padding: '1px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Comentraio Diagnóstico:</div>
                      <div style={{ background: '#f0f8ff', padding: '1px', borderBottom: '1px solid #ddd' }}>{selectedIngreso.comentario_diagnostico}</div>
                      <div style={{ background: '#f0f8ff', padding: '1px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Serial Diagnóstico:</div>
                      <div style={{ background: '#f0f8ff', padding: '1px', borderBottom: '1px solid #ddd' }}>{selectedIngreso.serial_diagnostico}</div>
                      <div style={{ background: '#f0f8ff', padding: '1px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>Modelo Diagnóstico:</div>
                      <div style={{ background: '#f0f8ff', padding: '1px', borderBottom: '1px solid #ddd' }}>{selectedIngreso.modelo_diagnostico}</div>

          
                     
                    </div>
                  </div>
                )}

                <form onSubmit={registrarPresupuesto}>
                  <div className='row'>
                    <div className='col-md-6'>
                      <div className='mb-1'>
                        <label htmlFor='recipient-name' className='col-form-label'>
                          Medio de Respaldo:
                        </label>
                        <select
                          type='text'
                          className='form-select'
                          onChange={(e) => {
                            setRespaldoPresupuesto(e.target.value);
                          }}
                        >
                          <option>Seleccionar</option>
                          {tiposRespaldoPresupuesto.map((item, index) => {
                            return <option key={index} value={item}>{item}</option>;
                          })}
                        </select>
                      </div>
                    </div>
                    <div className='col-md-6'>
                      <div className='mb-1'>
                        <label htmlFor='recipient-name' className='col-form-label'>
                          Valor Neto Standar
                        </label>
                        <input
                          type='text'
                          placeholder='Ingrese Tamaño'
                          className='form-control'
                          onChange={(e) => {
                            setNetoPresupuesto(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <button className='btn btn-success me-md-2' data-bs-dismiss='modal' type='submit'>
                    Crear Presupuesto
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
          onClick={() => setCurrentPage(prevPage => prevPage - 1)}
          disabled={currentPage === 1}
        >
          Previous Page
        </button>
        <span className='mx-2'>Page {currentPage}</span>
        <button
          className='btn btn-primary'
          onClick={() => setCurrentPage(prevPage => prevPage + 1)}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default Presupuestar;
