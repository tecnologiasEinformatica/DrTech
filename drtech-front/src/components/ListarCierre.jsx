import PropTypes from 'prop-types';

const propTypes = {
  ListaCierre: PropTypes.array.isRequired,
    currentPage: PropTypes.number.isRequired,
};
const itemsPerPage = 10; // Ajusta según tus necesidades

const ListarCierre = ({ListaCierre, currentPage }) => {
  const renderEmployeeList = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return ListaCierre.slice(startIndex, endIndex).map(employee => (
      <tr key={employee.id_cierre}>
         <td>{employee.id_ingreso}</td>
        <td>{employee.estado_cierre}</td>
        <td>{employee.montoPago_cierre}</td>
        <td>{employee.formaPago_cierre}</td>
        <td>{employee.oc_cierre}</td>
        <td>{employee.numeroFactura_cierre}</td>
        <td>{employee.comentario_cierre}</td>
        <td>{employee.fecha_cierre}</td>
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
    <h3>CIERRE </h3>
</div>
<table className="table">

        <thead>
            <tr>
            <th scope="col">ID Ingreso</th>
                <th scope="col">Estado</th>
                <th scope="col">Monto Pagado</th>
                <th scope="col">Forma de Pago </th>
                <th scope="col">Numero OC</th>
                <th scope="col">Numero de Factura</th>
                <th scope="col">Cometario</th>
                <th scope="col">Fecha de Cierre</th>
                <th scope="col"></th>
            </tr>
        </thead>
        <tbody>
          {renderEmployeeList()}  

        </tbody>
    </table></>
  )
}
ListarCierre.propTypes = propTypes;
export default ListarCierre