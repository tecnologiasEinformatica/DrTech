import PropTypes from 'prop-types';

const propTypes = {
    ListarAprobacion: PropTypes.array.isRequired,
    currentPage: PropTypes.number.isRequired,
 
  
};
const itemsPerPage = 5;

const ListaAprobacion = ({ListarAprobacion, currentPage}) => {


    const renderListadoAprobacion = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
    
        return ListarAprobacion.slice(startIndex, endIndex).map(aprobacion => (
          <tr key={aprobacion.id_aprobacion}>
            <td>{aprobacion.id_presupuesto}</td>
            <td>{aprobacion.fecha_aprobacion}</td>
            <td>{aprobacion.tipoServicio_aprobacion}</td>
            <td>{aprobacion.estado_aprobacion}</td>
            <td>
            <button
                  className='btn btn-warning'
                  type='button'
                 
                >
                  MOSTRAR 
                </button>
           
            </td>
          </tr>
        ));
      };
  return (
    <><div className='d-flex justify-content-center mt-2'>
          <h3>Estados de Presupuesto </h3>
      </div><table className="table">

              <thead>
                  <tr>
                      <th scope="col"># de Presupuesto</th>
                      <th scope="col">Fecha Aprobacion</th>
                      <th scope="col">Tipo de servicio </th>
                      <th scope="col">Estado</th>
                      <th scope="col"></th>
                  </tr>
              </thead>
              <tbody>
                 {renderListadoAprobacion()}
    
              </tbody>
          </table></>
  )
}
ListaAprobacion.propTypes = propTypes;
export default ListaAprobacion