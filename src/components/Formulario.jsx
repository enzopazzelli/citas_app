import { useState, useEffect } from "react";
import Error from './Error';
/**
  En mi App.jsx estoy declarando el estado setPaciente, y lo estoy pasando como prop al componente "Formulario";
  Ahora, en mi componente Formulario.jsx lo estoy modificando (al estado setPaciente) con los datos del componente Formulario.
 */

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {


    /**Los Hooks se coloccan en la parte superior de los componentes de React */
    /**No se deben colocar dentro de condicionales ni despues de un return */

    const [nombre, setNombre] = useState('');
    const [propietario, setPropietario] = useState('');
    const [email, setEmail] = useState('');
    const [fecha, setFecha] = useState('');
    const [sintomas, setSintomas] = useState('');

    const [error, setError] = useState(false);

    useEffect(() => {
        if(Object.keys(paciente).length > 0 ){
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(paciente.fecha)
            setSintomas(paciente.sintomas)
        } 
    }, [paciente]);

    // Con estos metodos genero algo parecido a un hash o token que será el id del objeto paciente.
    const generarId = () => {
        const random = Math.random().toString(36).substr(2);
        const fecha = Date.now().toString(36);

        return random + fecha;
    }

    const handleSubmit = (e) => {
        e.preventDefault(); // En primera medida prevengo el comportamiento por defecto del boton Submit (refrescar la página) 

        // Validancion del formulario
        if ([nombre, propietario, email, fecha, sintomas].includes("")) {
            console.log("Hay al menos un campo vacío");
            setError(true);
            return;
        };

        setError(false);

        //Objeto de Paciente
        const objetoPaciente = {
            nombre,
            propietario,
            email,
            fecha,
            sintomas
            
        }

        if(paciente.id){
            // Editando el registro
            objetoPaciente.id = paciente.id
    
            const pacientesActualizados = pacientes.map (pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState)

            setPacientes(pacientesActualizados)
            setPaciente({})


        } else{
            // Registrando un nuevo paciente
            objetoPaciente.id = generarId();
            setPacientes([...pacientes, objetoPaciente]); // El spread operator coloca en el primer lugar del array una copia del array y luego agrega el objeto, en este caso "objetoPaciente"
        }
    
        

        // Aqui reinicio el formulario seteando un string vacío en cada campo
        setNombre('');
        setPropietario('');
        setEmail('');
        setFecha('');
        setSintomas('');
    }


    return (

        <div className="md:w-1/2 lg:w-2/5">
            <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>
            <p className="text-lg mt-5 text-center mb-10">
                Añade Pacientes y {''}
                <span className="text-indigo-600 font-bold ">Administralos</span>
            </p>

            <form onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg py-10 px-5 mb-10 mx-5"
            >
                {/** En la prop "children" se cierra la etiqueta de mi componente y
                 *  todo lo que se encuentre dentro, es pasado como prop */}
                {error && <Error>Todos los campos son obligatorios</Error>}

                <div className="mb-5">
                    <label
                        htmlFor="mascota"
                        className="block text-gray-700 uppercase font-bold">
                        Nombre Mascota
                    </label>
                    <input
                        id="mascota"
                        type="text"
                        placeholder="Nombre de la Mascota"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="propietario"
                        className="block text-gray-700 uppercase font-bold">
                        Nombre Propietario
                    </label>
                    <input
                        id="propietario"
                        type="text"
                        placeholder="Nombre del Propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={propietario}
                        onChange={(e) => setPropietario(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="block text-gray-700 uppercase font-bold">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="Contacto Propietario"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="alta"
                        className="block text-gray-700 uppercase font-bold">
                        Alta
                    </label>
                    <input
                        id="alta"
                        type="date"
                        className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="sintomas"
                        className="block text-gray-700 uppercase font-bold">
                        Sintomas
                    </label>
                    <textarea className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                        id="sintomas"
                        placeholder="Describe los Sintomas"
                        value={sintomas}
                        onChange={(e) => setSintomas(e.target.value)}
                    ></textarea>
                </div>
                <input type="submit"
                    className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all"
                    id=""
                    value={paciente.id ? 'Editar Paciente' : 'Agregar Paciente'} />
            </form>
        </div>
    )
};

export default Formulario;