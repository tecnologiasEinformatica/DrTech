import PropTypes from 'prop-types';

const propTypes = {
    ListarRecuperaciones: PropTypes.array.isRequired,
    currentPage: PropTypes.number.isRequired,
};
const itemsPerPage = 10; // Ajusta según tus necesidades


const ListarRecuperacion = ({ListarRecuperaciones, currentPage}) => {
    const renderEmployeeList = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
    
        return ListarRecuperaciones.slice(startIndex, endIndex).map(employee => (
          <tr key={employee.id_recuperacion}>
             <td>{employee.id_ingreso}</td>
            <td>{employee.estado_recuperacion}</td>
            <td>{employee.fallaProceso_recuperacion}</td>
            <td>{employee.gbRecuperados_recuperacion}</td>
            <td>{employee.comentarioTrabajo_recuperacion}</td>
            <td>{employee.fecha_recuperacion}</td>
            <td>
            <button
              className='btn btn-success'
             /*  onClick={enviarPresupuestoWhatsApp} */
              
            >
             Mostrar
            </button>
          
            </td>
          </tr>
        ));
      };
  return (
    <><div className='d-flex justify-content-center mt-5'>
    <h3>RECUPERADOS </h3>
</div>
<table className="table">

        <thead>
            <tr>
            <th scope="col">ID Ingreso</th>
                <th scope="col">Estado</th>
                <th scope="col">Falla</th>
                <th scope="col">GB Recuperados </th>
                <th scope="col">Cometario</th>
                <th scope="col">Fecha de Recupercion</th>
                <th scope="col"></th>
            </tr>
        </thead>
        <tbody>
          {renderEmployeeList()}  

        </tbody>
    </table></>
  )
}
ListarRecuperacion.propTypes = propTypes;
export default ListarRecuperacion