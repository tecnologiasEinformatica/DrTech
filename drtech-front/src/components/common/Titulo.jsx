import PropTypes from 'prop-types';

const propTypes = {
  titulo: PropTypes.object.isRequired,
};

const Titulo = ({ titulo }) => {
  return (
    <h1 className={`text-center ${titulo.estilo}`}>{titulo.texto}</h1>
  );
};

Titulo.propTypes = propTypes;
export default Titulo;