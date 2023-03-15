// V1= Este componente Error recibe una prop llamada mensaje, la cual la llamo desde mi formulario.

// V2= Ahora mi prop se llama children. Es una palabra reservada en React y hace referencia a todo lo que pase a un componente.
// Cambia un poco la sintaxis. Revisar Linea70 de mi componente Formulario.
const Error = ({children}) => {
  return (
    
        <div className="bg-red-800 text-white text-center p-3 uppercase font-bold mb-3 rounded-md">
            <p>{children}</p>
        </div>
  )
}

export default Error;