import { useState } from "react";
import Titulo from "./common/Titulo";
import axios from "axios";
import Swal from 'sweetalert2';

const Ingreso = () => {
  const reconocidos = [
    { label: 'Seleccionar', value: '' },
    { label: 'No', value: 'no' },
    { label: 'Intermitente', value: 'intermitente' },
    { label: 'Si', value: 'si' },
    { label: 'No Se', value: 'no se' },
  ];
  const tipoDispositivos = [
    { label: 'Seleccionar Dispositivo', value: '' },
    { label: 'Disco Duro', value: 'disco duro' },
    { label: 'SSD', value: 'ssd' },
    { label: 'SD', value: 'sd' },
    { label: 'Pendrive', value: 'prendrive' },
    { label: 'CD', value: 'cd' },
    { label: 'Disquete', value: 'disquete' },
  ];
  const marcas = [
    { label: 'Seleccionar Marca', value: '' },
    { label: 'Western Digital', value: 'western digital' },
    { label: 'Seagate', value: 'seagate' },
    { label: 'Toshiba', value: 'toshiba' },
    { label: 'Hitachi', value: 'Hitachi' },
    { label: 'Samsung', value: 'samsung' },
    { label: 'SanDisk', value: 'sandisk' },
    { label: 'Kingstone', value: 'kingstone' },
    { label: 'Lacie', value: 'lacie' },
    { label: 'Otro', value: 'otro' },
  ];
  const tituloIngreo = {
    texto: 'Hola Bienvenido',
    estilo: 'estilo-registro',
  };
  const [realizarOtroIngreso, setRealizarOtroIngreso] = useState(false);

  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [reconocido, setReconocido] = useState('');
  const [tipo_dispositivo, setTipoDispositivo] = useState('');
  const [marca, setMarca] = useState('');
  const [capacidad_almacenamiento, setCapacidadAlmacenamiento] = useState('');
  const [identificador, setIdentificador] = useState('');
  const [comentario_cliente, setComentarioCliente] = useState('');
  const [rut, setRut] = useState('');
  const [recupera_ingreso, setRecuperaIngreso] = useState('');
  const [, setLoading] = useState(false);

  const selectReconocido = (e) => {
    setReconocido(e.target.value);
  };
  const selectTipoDispositivo = (e) => {
    setTipoDispositivo(e.target.value);
  };
  const selectMarca = (e) => {
    setMarca(e.target.value);
  };
  const limpiarCampos = () => {
   
    setReconocido('');
    setTipoDispositivo('');
    setMarca('');
    setCapacidadAlmacenamiento('');
    setIdentificador('');
    setComentarioCliente('');
    
    setRecuperaIngreso('');
  };

  const registroIngreso = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        `ingreso`,
        {
          nombre,
          correo,
          telefono,
          reconocido,
          tipo_dispositivo,
          marca,
          capacidad_almacenamiento,
          identificador,
          comentario_cliente,
          rut,
          recupera_ingreso
        }
      );

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: data.message,
        showConfirmButton: false,
        timer: 1500
      });

      const realizarOtro = await Swal.fire({
        title: '¿Deseas realizar otro ingreso?',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
      });

      if (realizarOtro.isConfirmed) {
        setRealizarOtroIngreso(true);
        limpiarCampos();
      } else {
        
        setRealizarOtroIngreso(false);
        window.location.reload();
      }
    } catch (err) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: err.message,
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  return (
    <>
      {realizarOtroIngreso ? (
        <form onSubmit={registroIngreso}>
        <div id="myCarousel" className="carousel slide mb-6" data-bs-ride="carousel">
    <div className="carousel-indicators">
      <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className="" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2" className=""></button>
      <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3" className="active" aria-current="true"></button>
    </div>
    <div className="carousel-inner">
      <div className="carousel-item">
      <img src="./../public/heder003.jpg" className="bd-placeholder-img" width="100%" height="100%" alt="Slide 1" aria-hidden="true" preserveAspectRatio="xMidYMid slice" />
        <div className="container">
         {/*  <div className="carousel-caption text-start">
            <h1>Example headline.</h1>
            <p className="opacity-75">Some representative placeholder content for the first slide of the carousel.</p>
            <p><a className="btn btn-lg btn-primary" href="#">Sign up today</a></p>
          </div> */}
        </div>
      </div>
      <div className="carousel-item">
      <img src="./../public/header002.jpg" className="bd-placeholder-img" width="100%" height="100%" alt="Slide 1" aria-hidden="true" preserveAspectRatio="xMidYMid slice" />
        <div className="container">
         {/*  <div className="carousel-caption">
            <h1>Another example headline.</h1>
            <p>Some representative placeholder content for the second slide of the carousel.</p>
            <p><a className="btn btn-lg btn-primary" href="#">Learn more</a></p>
          </div> */}
        </div>
      </div>
      <div className="carousel-item active">
      <img src="./../public/header001.jpg" className="bd-placeholder-img" width="100%" height="100%" alt="Slide 1" aria-hidden="true" preserveAspectRatio="xMidYMid slice" />
        <div className="container">
         {/*  <div className="carousel-caption text-end">
            <h1>One more for good measure.</h1>
            <p>Some representative placeholder content for the third slide of this carousel.</p>
            <p><a className="btn btn-lg btn-primary" href="#">Browse gallery</a></p>
          </div> */}
        </div>
      </div>
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div>
  <Titulo titulo={tituloIngreo} />
   <div className="container text-center">
    <p>Por Favor Completar el Formulario de Ingreso de su dispositivo</p>
  </div>
  <div className="col-md "> 
  <div className="card text-bg-light mb-3" >
  <div className="card-body">
    <h5 className="card-title text-center">REGISTRE SU DISPOSITIVO</h5>
    <div className="container ">
  <div className="row">
    <div className="col-md ">
      <div className="mb-3">
       <label  className="form-label">Nombre Cliente</label>
          <input 
          type="text" 
          className="form-control" 
          aria-describedby="emailHelp"
          onChange={(e) => setNombre(e.target.value)}
          value={nombre}

          />
    
       </div>
       <div className="mb-3">
       <label  className="form-label">Telefono</label>
          <input 
          type="text" 
          className="form-control" 
          aria-describedby="emailHelp"
          onChange={(e) => setTelefono(e.target.value)}
          value={telefono}
          />
    
       </div>
       <div className="mb-3">
        <label className="form-label">Marca</label>
        <select className="form-select" onChange={selectMarca}>
          {marcas.map(marca => (
            <option key={marca.value} value={marca.value}>{marca.label}</option>
          ))}
        </select>
        </div>
         <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">Comentarios</label>
          <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(e) => setComentarioCliente(e.target.value)} value={comentario_cliente}></textarea>
         </div>
       
    </div>
    <div className="col-md">
      <div className="mb-3">
       <label  className="form-label">Rut</label>
          <input 
          type="text" 
          className="form-control" 
          aria-describedby="emailHelp"
          onChange={(e) => setRut(e.target.value)}
          value={rut}
          
          />
    
       </div>
       <div className="mb-3">
        <label className="form-label">¿Su dispositivo era reconocido?</label>
        <select className="form-select" onChange={selectReconocido}>
          {reconocidos.map(reconocido => (
            <option key={reconocido.value} value={reconocido.value}>{reconocido.label}</option>
          ))}
        </select>
        </div>
        <div className="mb-3">
       <label  className="form-label">S/N o Identificador Etiqueta</label>
          <input 
          type="text" 
          className="form-control" 
          aria-describedby="emailHelp"
          onChange={(e) => setIdentificador(e.target.value)}
          value={identificador}
          />
    
       </div>
       <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea2" className="form-label">Lo mas Importante a Recuperar</label>
          <textarea className="form-control" id="exampleFormControlTextarea2" rows="3" onChange={(e) => setRecuperaIngreso(e.target.value)} value={recupera_ingreso}></textarea>
         </div>
    </div>
    <div className="col-md">
      <div className="mb-3">
       <label  className="form-label">Email</label>
          <input 
          type="email" 
          className="form-control" 
          aria-describedby="emailHelp"
          onChange={(e) => setCorreo(e.target.value)}
          value={correo}
          />
    
       </div>
       <div className="mb-3">
        <label className="form-label">Tipo de dispositivo</label>
        <select className="form-select" onChange={selectTipoDispositivo}>
          {tipoDispositivos.map(tipoDispositivo => (
            <option key={tipoDispositivo.value} value={tipoDispositivo.value}>{tipoDispositivo.label}</option>
          ))}
        </select>
        </div>
        <div className="mb-3">
       <label  className="form-label">Capacidad en GB</label>
          <input 
          type="text" 
          className="form-control" 
          aria-describedby="emailHelp"
          onChange={(e) => setCapacidadAlmacenamiento(e.target.value)}
          value={capacidad_almacenamiento}
          />
    
       </div>
      
    </div>
    <div className="d-grid gap-2">
          <button className="btn btn-primary me-md-2" type="submit">GUARDAR REGISTRO DEL DISPOSITIVO</button>
          
        </div>
    
 
  </div>
   </div>
  </div>
</div>
  
  </div>
  </form>
      ) : (
        <>
          {/* Código del carrusel y título */}
          <form onSubmit={registroIngreso}>
        <div id="myCarousel" className="carousel slide mb-6" data-bs-ride="carousel">
    <div className="carousel-indicators">
      <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" className="" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2" className=""></button>
      <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3" className="active" aria-current="true"></button>
    </div>
    <div className="carousel-inner">
      <div className="carousel-item">
      <img src="./../public/heder003.jpg" className="bd-placeholder-img" width="100%" height="100%" alt="Slide 1" aria-hidden="true" preserveAspectRatio="xMidYMid slice" />
        <div className="container">
         {/*  <div className="carousel-caption text-start">
            <h1>Example headline.</h1>
            <p className="opacity-75">Some representative placeholder content for the first slide of the carousel.</p>
            <p><a className="btn btn-lg btn-primary" href="#">Sign up today</a></p>
          </div> */}
        </div>
      </div>
      <div className="carousel-item">
      <img src="./../public/header002.jpg" className="bd-placeholder-img" width="100%" height="100%" alt="Slide 1" aria-hidden="true" preserveAspectRatio="xMidYMid slice" />
        <div className="container">
         {/*  <div className="carousel-caption">
            <h1>Another example headline.</h1>
            <p>Some representative placeholder content for the second slide of the carousel.</p>
            <p><a className="btn btn-lg btn-primary" href="#">Learn more</a></p>
          </div> */}
        </div>
      </div>
      <div className="carousel-item active">
      <img src="./../public/header001.jpg" className="bd-placeholder-img" width="100%" height="100%" alt="Slide 1" aria-hidden="true" preserveAspectRatio="xMidYMid slice" />
        <div className="container">
         {/*  <div className="carousel-caption text-end">
            <h1>One more for good measure.</h1>
            <p>Some representative placeholder content for the third slide of this carousel.</p>
            <p><a className="btn btn-lg btn-primary" href="#">Browse gallery</a></p>
          </div> */}
        </div>
      </div>
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Previous</span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="visually-hidden">Next</span>
    </button>
  </div>
  <Titulo titulo={tituloIngreo} />
   <div className="container text-center">
    <p>Por Favor Completar el Formulario de Ingreso de su dispositivo</p>
  </div>
  <div className="col-md "> 
  <div className="card text-bg-light mb-3" >
  <div className="card-body">
    <h5 className="card-title text-center">REGISTRE SU DISPOSITIVO</h5>
    <div className="container ">
  <div className="row">
    <div className="col-md ">
      <div className="mb-3">
       <label  className="form-label">Nombre Cliente</label>
          <input 
          type="text" 
          className="form-control" 
          aria-describedby="emailHelp"
          onChange={(e) => setNombre(e.target.value)}
          value={nombre}

          />
    
       </div>
       <div className="mb-3">
       <label  className="form-label">Telefono</label>
          <input 
          type="text" 
          className="form-control" 
          aria-describedby="emailHelp"
          onChange={(e) => setTelefono(e.target.value)}
          value={telefono}
          />
    
       </div>
       <div className="mb-3">
        <label className="form-label">Marca</label>
        <select className="form-select" onChange={selectMarca}>
          {marcas.map(marca => (
            <option key={marca.value} value={marca.value}>{marca.label}</option>
          ))}
        </select>
        </div>
         <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">Comentarios</label>
          <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(e) => setComentarioCliente(e.target.value)} value={comentario_cliente}></textarea>
         </div>
       
    </div>
    <div className="col-md">
      <div className="mb-3">
       <label  className="form-label">Rut</label>
          <input 
          type="text" 
          className="form-control" 
          aria-describedby="emailHelp"
          onChange={(e) => setRut(e.target.value)}
          value={rut}
          
          />
    
       </div>
       <div className="mb-3">
        <label className="form-label">¿Su dispositivo era reconocido?</label>
        <select className="form-select" onChange={selectReconocido}>
          {reconocidos.map(reconocido => (
            <option key={reconocido.value} value={reconocido.value}>{reconocido.label}</option>
          ))}
        </select>
        </div>
        <div className="mb-3">
       <label  className="form-label">S/N o Identificador Etiqueta</label>
          <input 
          type="text" 
          className="form-control" 
          aria-describedby="emailHelp"
          onChange={(e) => setIdentificador(e.target.value)}
          value={identificador}
          />
    
       </div>
       <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea2" className="form-label">Lo mas Importante a Recuperar</label>
          <textarea className="form-control" id="exampleFormControlTextarea2" rows="3" onChange={(e) => setRecuperaIngreso(e.target.value)} value={recupera_ingreso}></textarea>
         </div>
    </div>
    <div className="col-md">
      <div className="mb-3">
       <label  className="form-label">Email</label>
          <input 
          type="email" 
          className="form-control" 
          aria-describedby="emailHelp"
          onChange={(e) => setCorreo(e.target.value)}
          value={correo}
          />
    
       </div>
       <div className="mb-3">
        <label className="form-label">Tipo de dispositivo</label>
        <select className="form-select" onChange={selectTipoDispositivo}>
          {tipoDispositivos.map(tipoDispositivo => (
            <option key={tipoDispositivo.value} value={tipoDispositivo.value}>{tipoDispositivo.label}</option>
          ))}
        </select>
        </div>
        <div className="mb-3">
       <label  className="form-label">Capacidad en GB</label>
          <input 
          type="text" 
          className="form-control" 
          aria-describedby="emailHelp"
          onChange={(e) => setCapacidadAlmacenamiento(e.target.value)}
          value={capacidad_almacenamiento}
          />
    
       </div>
      
    </div>
    <div className="d-grid gap-2">
          <button className="btn btn-primary me-md-2" type="submit">GUARDAR REGISTRO DEL DISPOSITIVO</button>
          
        </div>
    
 
  </div>
   </div>
  </div>
</div>
  
  </div>
  </form>
        </>
      )}
    </>
  );
};

export default Ingreso;
