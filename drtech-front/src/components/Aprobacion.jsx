import  { useState, useEffect, useCallback } from "react";
import axios from 'axios';
import Error from './common/Error';
import ListarPresupuestos from "./ListarPresupuestos";
import Swal from 'sweetalert2';
import ListaAprobacion from "./ListaAprobacion";

const Aprobacion = () => {
    const [estado_aprobacion, setEstadoAprobacion] = useState('');
    const [tipoServicio_aprobacion, setServicoAprobacion] = useState('');
    const [comentario_aprobacion, setCometarioAprobacion] = useState('');
    const [id_presupuesto, setIdPresupuesto] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, ] = useState(false);
    const [presupuesto, setPresupuesto] = useState();
    const [employeeList, setEmployeeList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [ListarAprobacion, setListarAprobacion] = useState([]);

    const tiposEstado = ['Aprobado', 'Rechazado'];
    const tiposServicio = ['Estandar', 'Urgente'];

    const registroAprobacion = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await axios.post(`aprobacion`, {
                id_presupuesto,
                estado_aprobacion,
                tipoServicio_aprobacion,
                comentario_aprobacion,
            });
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: data.message,
                showConfirmButton: false,
                timer: 1500,
            });
            limpiarCampos();
            fetchEmployeeList();
        } catch (err) {
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: err.message,
                showConfirmButton: false,
                timer: 1500,
            });
        }
        setLoading(false);
    };

    const fetchEmployeeList = useCallback(async () => {
        try {
            const limit = 10;
            const response = await axios.get(`/ingresos-con-presupuesto/${currentPage}/${limit}`);
            setEmployeeList(response.data);
            const responseAprovacion = await axios.get(`/aprobacion/all/${currentPage}/${limit}`);
            setListarAprobacion(responseAprovacion.data);
        } catch (error) {
            console.error('Error al obtener la lista :', error);
        }
    }, [currentPage]);

    useEffect(() => {
        fetchEmployeeList();
    }, [currentPage, fetchEmployeeList]);

    const limpiarCampos = () => {
        setEstadoAprobacion('');
        setServicoAprobacion('');
        setCometarioAprobacion('');
        setIdPresupuesto('');
        setPresupuesto('');
    };

    useEffect(() => {
        if (presupuesto) {
            setEstadoAprobacion(presupuesto.estado_aprobacion);
            setServicoAprobacion(presupuesto.tipoServicio_aprobacion);
            setCometarioAprobacion(presupuesto.comentario_aprobacion);
            setIdPresupuesto(presupuesto.id_presupuesto);
        }
    }, [presupuesto]);

    return (
        <>
            <div className='d-flex justify-content-center mt-2'>
                <h3>Aprobacion </h3>
            </div>
            <form onSubmit={registroAprobacion} className="container">
                <div className="row">
                    <div className="col-2">
                        <div className="card border mb-3">
                            <div className="card-body">
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        aria-describedby="emailHelp"
                                        placeholder="Numero de Ingreso "
                                        onChange={(e) => setIdPresupuesto(e.target.value)}
                                        value={id_presupuesto}
                                    />
                                </div>
                                <div className='mb-1'>
                                    <label htmlFor='recipient-name' className='col-form-label'>
                                        Estado:
                                    </label>
                                    <select
                                        type='text'
                                        className='form-select'
                                        onChange={(e) => {
                                            setEstadoAprobacion(e.target.value);
                                        }}
                                        value={estado_aprobacion}
                                    >
                                        <option value=''>Seleccionar</option>
                                        {tiposEstado.map((item, index) => (
                                            <option key={index} value={item}>{item}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='mb-1'>
                                    <label htmlFor='recipient-name' className='col-form-label'>
                                        Tipo de Servicio:
                                    </label>
                                    <select
                                        type='text'
                                        className='form-select'
                                        onChange={(e) => {
                                            setServicoAprobacion(e.target.value);
                                        }}
                                        value={tipoServicio_aprobacion}
                                    >
                                        <option value=''>Seleccionar</option>
                                        {tiposServicio.map((item, index) => (
                                            <option key={index} value={item}>{item}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='mb-1'>
                                    <label htmlFor='message-text' className='col-form-label'>
                                        Comentario
                                    </label>
                                    <textarea
                                        className='form-control'
                                        onChange={(e) => {
                                            setCometarioAprobacion(e.target.value);
                                        }}
                                        value={comentario_aprobacion}
                                    ></textarea>
                                </div>
                                <div className="d-grid mb-3">
                                    {loading ? (
                                        <div className="spinner-border text-success mx-auto" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    ) : (
                                        <>
                                            <button className="btn btn-warning me-md-2" type="submit">Guardar Aprobacion</button>
                                            <button onClick={limpiarCampos} className="btn btn-danger me-md-2 mt-3" type="button">Cancelar</button>
                                        </>
                                    )}
                                </div>
                                {error && <Error mensaje='Todos los campos son obligatorios' />}
                            </div>
                        </div>
                    </div>
                    <div className="col-10">
                        <div className="card border mb-3">
                            <div className="card-body">
                                <ListarPresupuestos employeeList={employeeList} currentPage={currentPage} setCurrentPage={setCurrentPage} presupuesto={presupuesto} setPresupuesto={setPresupuesto} />
                            </div>
                        </div>
                        <div className="card border mb-3">
                            <div className="card-body">
                                <ListaAprobacion ListarAprobacion={ListarAprobacion} currentPage={currentPage} />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}

export default Aprobacion;
