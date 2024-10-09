import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2"; 


function App() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState();
  const [sexo, setSexo] = useState("");
  const [cargo, setCargo] = useState("");
  const [pais, setPais] = useState("");
  const [idEmpleado, setId] = useState();

  const [editar, setEditar] = useState(false); 

  const [empleadosList, setEmpleados] = useState([]);

  const mostrarDatos = () => {
    Axios.post("http://localhost:3001/create", {
      nombre: nombre,
      edad: edad,
      sexo: sexo,
      cargo: cargo,
      pais: pais,
    }).then(() => {
      getEmpleados();
      limpiardatos();
      Swal.fire({
        title: "<strong>Registro exitoso!!!</strong>",
        html: "<i>El empleado <strong>"+nombre+"</strong> fue registrado con exito</i>",
        icon: 'success',
        timer: 3000
      }).catch(function(error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se logro agregar el empleado',
          footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente mas tarde": JSON.parse(JSON.stringify(error)).message
        })
      });  
    });
  };

  const limpiardatos = () => {
    setNombre("");
    setEdad("");
    setSexo("");
    setCargo("");
    setPais("");
    setId(null);
    setEditar(false);
  }
  const editarEmpleado = (val) => {
    setEditar(true);

    setNombre(val.nombre);
    setEdad(val.edad);
    setSexo(val.sexo);
    setCargo(val.cargo);
    setPais(val.pais);
    setId(val.id);
  }

  const update = () => {
    Axios.put("http://localhost:3001/update", {
      id:idEmpleado,
      nombre: nombre,
      edad: edad,
      sexo: sexo,
      cargo: cargo,
      pais: pais,
    }).then(() => {
      getEmpleados();
      limpiardatos();
      Swal.fire({
        title: "<strong>Actualizacion exitosa!!!</strong>",
        html: "<i>El empleado <strong>"+nombre+"</strong> fue actualizado con exito</i>",
        icon: 'success',
        timer: 3000
      }).catch(function(error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se logro actualizar al empleado',
          footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente mas tarde": JSON.parse(JSON.stringify(error)).message
        })
      });  
    });
  };

  const deletEmpleado = (val) => {
      Swal.fire({
        title: 'Estas seguro de eliminar a?',
        html: "<i>Realmente desea eliminar al empleado <strong>"+val.nombre+"</strong></i>",
        icon: '',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        showCancelButtonColor: '#d33',
        confirmButtonText: 'Si eliminarlo',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          Axios.delete(`http://localhost:3001/delete/${val.id}`).then(() => {
            getEmpleados();
            limpiardatos();
            Swal.fire(
              'Eliminado',
              val.nombre+' fue eliminado.',
              'success'
            );
          }).catch(function(error) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'No se logro eliminar al empleado',
              footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente mas tarde": JSON.parse(JSON.stringify(error)).message
            })
          }); 
        }
      }); 
  };

  const getEmpleados = () => {
    Axios.get("http://localhost:3001/empleados").then((response) => {
      setEmpleados(response.data);
    });
  };
  useEffect(() => {
    getEmpleados();
  }, []);

  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">Gestion de Empleados</div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Nombre:
            </span>
            <input
              type="text"
              onChange={(event) => {
                setNombre(event.target.value);
              }}
              className="form-control" value={nombre}
              placeholder="Ingrese un nombre"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Edad:
            </span>
            <input
              type="number" value={edad}
              onChange={(event) => {
                setEdad(parseInt(event.target.value));
              }}
              className="form-control"
              placeholder="Ingrese su edad"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Sexo
            </span>
            <input
              type="text" value={sexo}
              onChange={(event) => {
                setSexo(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese su sexo"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Cargo
            </span>
            <input
              type="text" value={cargo}
              onChange={(event) => {
                setCargo(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese su cargo"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Pais
            </span>
            <input
              type="text" value={pais}
              onChange={(event) => {
                setPais(event.target.value);
              }}
              className="form-control"
              placeholder="Ingrese su pais"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>
        <div className="card-footer text-muted">
          {
            editar? 
            <div>
            <button className="btn btn-warning m-2" onClick={update}>Actualizar</button> 
            <button className="btn btn-info m-2" onClick={limpiardatos}>Cancelar</button>
            </div>
            :<button className="btn btn-success" onClick={mostrarDatos}>Agregar</button>
          }
          
        </div>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edad</th>
            <th scope="col">Sexo</th>
            <th scope="col">Cargo</th>
            <th scope="col">Pais</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {empleadosList.map((val, key) => {
            return (
              <tr key={val.id}>
                <th scope="row">{val.id}</th>
                <td>{val.nombre}</td>
                <td>{val.edad}</td>
                <td>{val.sexo}</td>
                <td>{val.cargo}</td>
                <td>{val.pais}</td>
                <td>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic example"
                  >
                    <button type="button" 
                    onClick={() => editarEmpleado(val)}
                    
                    className="btn btn-info">
                      editar
                    </button>
                    <button type="button"
                    onClick={()=>
                      deletEmpleado(val)
                     }
                    className="btn btn-danger">
                      eliminar
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
