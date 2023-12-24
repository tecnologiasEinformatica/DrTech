import PropTypes from 'prop-types';

const propTypes = {
    listaDescuento: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
};
const itemsPerPage = 10; // Ajusta según tus necesidades

const ListarDescuento = ({listaDescuento, currentPage}) => {
    const renderEmployeeList = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
    
      
    
        return listaDescuento.slice(startIndex, endIndex).map(employee => (
          <tr key={employee.id_descuento}>
            <td>{employee.id_presupuesto}</td>
            <td>{employee.valor_netoStandarDescuento}</td>
            <td>{employee.valor_Urgente_descuento}</td>
            <td>{employee.descripcion_descuento}</td>
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
        <h3>Descuentos Creados </h3>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">N Presupuesto</th>
            <th scope="col">Valor Neto Standar</th>
            <th scope="col">Valor Urgente </th>
            <th scope="col">Comentario Descuento</th>
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
ListarDescuento.propTypes = propTypes;
export default ListarDescuento