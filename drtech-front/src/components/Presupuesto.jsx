import React,{ useState, useEffect, useCallback } from "react";
import axios from 'axios';
import Swal from 'sweetalert2';
import ListarDescuento from "./ListarDescuento";


const Presupuesto = () => {
  const [valor_netoStandarDescuento, setValorNetoEstandarDescuento] = useState('');
  const [valor_Urgente_descuento, setValorNetoUrgenteDescuento] = useState('');
  const [porcentaje_descuento, setPorcentajeDescuento] = useState('');
  const [medio_respaldo_descuento, setRespaldoDescuento] = useState('');
  const [descripcion_descuento, setDecriptionDescuento] = useState('');
  const [listaPresupuesto, setListaPresupuesto] = useState([]);
  const [listaDescuento, setListarDescuento] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPresupuesto, setSelectedPresupuesto] = useState(null);
  const [, setSelectedIngreso] = useState(null);
  const [selectedTablaIngreso, setTablaIngreso] = useState(null);

  const conMedioRespaldo = ['SI', 'NO'];

  const fetchPresupuestoList = useCallback(async () => {
    try {
      const limit = 10;
      const response = await axios.get(`/presupuesto/all/${currentPage}/${limit}`);
      setListaPresupuesto(response.data);
      const responseDescuento = await axios.get(`/descuento/all/${currentPage}/${limit}`);
      setListarDescuento(responseDescuento.data);
      /* const responseIngresos = await axios.get(`/ingresos-y-diagnosticos/${currentPage}/${limit}`);
      setTablaIngreso(responseIngresos.data); */
    } catch (error) {
      console.error('Error al obtener la lista:', error);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchPresupuestoList();
  }, [currentPage, fetchPresupuestoList]);

  const registrarDescuento = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`descuento`, {
        id_presupuesto: selectedPresupuesto,
        valor_netoStandarDescuento,
        valor_Urgente_descuento,
        porcentaje_descuento,
        medio_respaldo_descuento,
        descripcion_descuento
      });
      fetchPresupuestoList();
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
     
      console.log(err.message);
    }
  };

  const openModal = async (presupuesto) => {
    setSelectedIngreso(presupuesto);
    
    setSelectedPresupuesto(presupuesto.id_presupuesto);
    
    try {
      const response = await axios.get(`/detalle-ingreso/${presupuesto.id_ingreso}`);
      console.log(response);
      console.log(response.data);
      setTablaIngreso(response.data);
    } catch (error) {
      console.error('Error al obtener los detalles del ingreso:', error);
    }
    
  };

  return (
    <div className='px-5 py-3'>
      <div className='d-flex justify-content-center mt-2'>
        <h3>DESCUENTOS</h3>
      </div>
      <div className='mt-3'>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>N Ingreso</th>
              <th>Fecha Presupuesto</th>
              <th>Valor Neto Standar</th>
              <th>Valor Neto Urgente</th>
              <th>Medio de Respaldo</th>
              <th>Descuento Aprobacion</th>
              <th>Descuento Recuperacion</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {listaPresupuesto.map((presupuesto) => (
              <tr key={presupuesto.id_presupuesto}>
                <td>{presupuesto.id_ingreso}</td>
                <td>{presupuesto.fecha_presupuesto}</td>
                <td>{presupuesto.netoStandar_presupuesto}</td>
                <td>{presupuesto.netoUrgente_presupuesto}</td>
                <td>{presupuesto.medioRespaldo_presupuesto}</td>
                <td>{presupuesto.descuentoAprovacion_presupuesto}</td>
                <td>{presupuesto.descuentoRecuperacion_presupuesto}</td>
                <td>
                  <div className='d-flex justify-content-center mt-2'>
                    <button
                      type='button'
                      className='btn btn-info btn-sm'
                      data-bs-toggle='modal'
                      data-bs-target='#exampleModal'
                      data-bs-whatever='@mdo'
                      onClick={() => openModal(presupuesto)}
                    >
                      CREAR DESCUENTO
                    </button>
                    
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
       <ListarDescuento listaDescuento={listaDescuento} currentPage={currentPage}/>

        <div className='modal fade' id='exampleModal' tabIndex='-1' aria-labelledby='exampleModalLabel' aria-hidden='true'>
        <div className='modal-dialog modal-lg'>
            <div className='modal-content'>
              <div className='modal-header custom-header' style={{ backgroundColor: 'blue', color: 'white' }}>
                <h1 className='modal-title fs-5' id='exampleModalLabel'>
                  DESCUENTO DE PRESUPUESTO
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
               {selectedTablaIngreso && (
  <div style={{ border: '1px solid #ddd', borderRadius: '1px', margin: '2px' }}>
    <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', rowGap: '1px' }}>
      {Object.entries(selectedTablaIngreso[0]).map(([key, value]) => (
       
        <React.Fragment key={key}>
          <div style={{ background: '#f0f8ff', padding: '1px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>{key}:</div>
          <div style={{ background: '#f0f8ff', padding: '1px', borderBottom: '1px solid #ddd' }}>{value}</div>
        </React.Fragment>
      ))}
    </div>
  </div>
)}

                <form  onSubmit={registrarDescuento}>
                  <div className='row'>
                    <div className='col-md-6'>
                    <div className='mb-1'>
                        <label htmlFor='recipient-name' className='col-form-label'>
                          Valor Neto Standar
                        </label>
                        <input
                          type='text'
                          placeholder='Ingrese Valor Neto Standar'
                          className='form-control'
                           onChange={(e) => {
                            setValorNetoEstandarDescuento(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className='col-md-6'>
                    <div className='mb-1'>
                        <label htmlFor='recipient-name' className='col-form-label'>
                          Valor Neto Urgente
                        </label>
                        <input
                          type='text'
                          placeholder='Ingrese  Valor Neto Urgente'
                          className='form-control'
                          onChange={(e) => {
                            setValorNetoUrgenteDescuento(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className='col-md-6'>
                    <div className='mb-1'>
                        <label htmlFor='recipient-name' className='col-form-label'>
                          % DE DESCUENTO
                        </label>
                        <input
                          type='text'
                          placeholder='Ingrese % DE DESCUENTO'
                          className='form-control'
                          onChange={(e) => {
                            setPorcentajeDescuento(e.target.value);
                          }}
                        />
                      </div>
                      <div className='mb-1'>
                        <label htmlFor='recipient-name' className='col-form-label'>
                          Quitar Medio de Respaldo:
                        </label>
                        <select
                          type='text'
                          className='form-select'
                         onChange={(e) => {
                          setRespaldoDescuento(e.target.value);
                          }} 
                        >
                          <option>Seleccionar</option>
                          {conMedioRespaldo.map((item, index) => {
                            return <option key={index} value={item}>{item}</option>;
                          })}
                        </select>
                      </div>
                  
                    </div>
                    <div className="col-md-6">
                    <div className='mb-1'>
                      <label htmlFor='message-text' className='col-form-label'>
                        Comentario
                      </label>
                      <textarea
                        className='form-control'
                        onChange={(e) => {
                          setDecriptionDescuento(e.target.value);
                        }}
                      ></textarea>
                    </div>
                    </div>
                  </div>
                  <button className='btn btn-success me-md-2' data-bs-dismiss='modal' type='submit'>
                        GUARDAR DESCUENTO
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
  );
};

export default Presupuesto;
