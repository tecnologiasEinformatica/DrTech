import PropTypes from 'prop-types';

const propTypes = {
  employeeList: PropTypes.array.isRequired,
  setPresupuesto: PropTypes.func.isRequired,
};

/* const itemsPerPage = 10; */

const ListarPresupuestos = ({ employeeList, setPresupuesto }) => {
  const renderEmployeeList = () => (
    employeeList.map(employee => (
      <tr key={employee.id_presupuesto}>
        <td>{employee.id_ingreso}</td>
        <td>{employee.fecha_presupuesto}</td>
        <td>{employee.netoStandar_presupuesto}</td>
        <td>{employee.nombre}</td>
        <td>{employee.telefono}</td>
        <td>{employee.marca}</td>
        <td>{employee.tipo_dispositivo}</td>
        <td>{employee.recupera_ingreso}</td>
        <td>{employee.comentario_cliente}</td>
        <td>
          <button
            className='btn btn-warning'
            type='button'
            onClick={() => setPresupuesto(employee)} 
          >
            Aprobar Presupuesto 
          </button>
        </td>
      </tr>
    ))
  );

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col"># de Ingreso</th>
          <th scope="col">Fecha del Presupuesto</th>
          <th scope="col">Valor Neto Stantadar</th>
          <th scope="col">Nombre Cliente</th>
          <th scope="col">Telefono Cliente</th>
          <th scope="col">Marca</th>
          <th scope="col">Tipo</th>
          <th scope="col">A Recuperar</th>
          <th scope="col">Comentario Cliente</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {renderEmployeeList()}
      </tbody>
    </table>
  );
};

ListarPresupuestos.propTypes = propTypes;
export default ListarPresupuestos;