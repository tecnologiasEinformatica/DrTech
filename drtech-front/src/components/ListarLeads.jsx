import PropTypes from 'prop-types';

const propTypes = {
  employeeList: PropTypes.array.isRequired,
  currentPage: PropTypes.number.isRequired,
};

const itemsPerPage = 10; // Ajusta según tus necesidades

const ListarLeads = ({ employeeList, currentPage }) => {
  const renderEmployeeList = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const enviarWhatsApp = (telefono, nombre, comentario) => {
      const mensaje = `Hola ${nombre}, te contacto desde DrTech para saber como sigue su problema con el disco nuestro diagnostico fue ${comentario}.`;
      const telefonoCodificado = encodeURIComponent(telefono);
      const mensajeCodificado = encodeURIComponent(mensaje);
      const whatsappLink = `https://wa.me/${telefonoCodificado}?text=${mensajeCodificado}`;
      window.open(whatsappLink, '_blank');
    };

    return employeeList.slice(startIndex, endIndex).map(employee => (
      <tr key={employee.id_leads}>
        <td>{employee.nombre_leads}</td>
        <td>{employee.telefono_leads}</td>
        <td>{employee.correo_leads}</td>
        <td>{employee.comentarios_leads}</td>
        <td>{employee.accion_leads}</td>
        <td>
          <button
            className='btn btn-success'
            onClick={() => enviarWhatsApp(employee.telefono_leads, employee.nombre_leads, employee.comentarios_leads )}
          >
            Contactar por WhatsApp
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <div className='d-flex justify-content-center mt-2'>
        <h3>Leads </h3>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Telefono</th>
            <th scope="col">Mail </th>
            <th scope="col">Cometario</th>
            <th scope="col">Accion</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {renderEmployeeList()}
        </tbody>
      </table>
    </>
  );
};

ListarLeads.propTypes = propTypes;
export default ListarLeads;
