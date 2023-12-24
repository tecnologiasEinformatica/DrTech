import PropTypes from 'prop-types';

const propTypes = {
    listaRetiro: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
};
const itemsPerPage = 10; // Ajusta según tus necesidades


const ListarRetiro = ({listaRetiro,currentPage}) => {
    const renderEmployeeList = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
    
      
    
        return listaRetiro.slice(startIndex, endIndex).map(employee => (
          <tr key={employee.id_retiro}>
            <td>{employee.id_ingreso}</td>
            <td>{employee.nombre_retiro}</td>
            <td>{employee.rut_retiro}</td>
            <td>{employee.descripcion_retiro}</td>
            <td></td>
            <td></td>
            <td>
              <button
                className='btn btn-success'
               /*  onClick={() => enviarWhatsApp(employee.telefono_leads, employee.nombre_leads, employee.comentarios_leads )} */
              >
              Mostrar
              </button>
            </td>
          </tr>
        ));
      };
  return (
    <>
    <div className='d-flex justify-content-center mt-2'>
      <h3>Retiros Creados </h3>
    </div>
    <table className="table">
      <thead>
        <tr>
          <th scope="col">N Ingreso</th>
          <th scope="col">Nombre</th>
          <th scope="col">Rut </th>
          <th scope="col">Comentario</th>
          <th scope="col"></th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        {renderEmployeeList()}
      </tbody>
    </table>
  </>
  )
}
ListarRetiro.propTypes = propTypes;
export default ListarRetiro