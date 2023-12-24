
import { useState, useEffect } from 'react';
import axios from 'axios';

const EnviarPresupuestoWhasp = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchEmployeeList = async () => {
      try {
        const limit = 10;
        const response = await axios.get(`/ingresos-con-presupuesto/${currentPage}/${limit}`);
        setEmployeeList(response.data);
      } catch (error) {
        console.error('Error al obtener la lista de empleados:', error);
      }
    };

    fetchEmployeeList();
  }, [currentPage]);

  const enviarWhatsApp = (telefono, nombre, netoStandarPresupuesto) => {
    const mensaje = `Hola ${nombre}, te envío el presupuesto: ${netoStandarPresupuesto}`;
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    window.location.href = url;
  };

  return (
    <div className='px-5 py-3'>
      <div className='d-flex justify-content-center mt-2'>
        <h3>Enviar Presupuesto</h3>
      </div>
      <table className='table table-striped'>
        <thead>
          <tr>
            <th>N Ingreso</th>
            <th>Fecha Presupuesto</th>
            <th>Valor Neto Standar</th>
            <th>Valor Neto Urgente</th>
            <th>Nombre Cliente</th>
            <th>Telefono</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {employeeList.map((employee) => (
            <tr key={employee.id_presupuesto}>
              <td>{employee.id_ingreso}</td>
              <td>{employee.fecha_presupuesto}</td>
              <td>{employee.netoStandar_presupuesto}</td>
              <td>{employee.netoUrgente_presupuesto}</td>
              <td>{employee.nombre}</td>
              <td>{employee.telefono}</td>
              <td>
                <button
                  className='btn btn-success'
                  onClick={() => enviarWhatsApp(employee.telefono, employee.nombre, employee.netoStandar_presupuesto)}
                >
                  Enviar Presupuesto por WhatsApp
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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

export default EnviarPresupuestoWhasp;
