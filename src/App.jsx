import React, { useState } from 'react';

function App() {
  // 1. Productos iniciales obligatorios
  const [productos, setProductos] = useState([
    { codigo: 'PROD-001', descripcion: 'Coca cola', precio: 2.33, categoria: 'Bebidas' },
    { codigo: 'PROD-002', descripcion: 'Fanta', precio: 1.70, categoria: 'Bebidas' },
    { codigo: 'PROD-003', descripcion: 'Galletas Casino', precio: 1.50, categoria: 'Snacks' },
    { codigo: 'PROD-004', descripcion: 'Agua San Mateo', precio: 2.00, categoria: 'Bebidas' },
    { codigo: 'PROD-005', descripcion: 'Sublime', precio: 2.50, categoria: 'Golosinas' }
  ]);

  // 2. Estados para el formulario, errores y confirmaciones
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [categoria, setCategoria] = useState('');
  const [error, setError] = useState('');
  const [exito, setExito] = useState('');

  // FUNCIÓN CLAVE: Manejar cambio en la descripción en tiempo real
  const handleDescripcionChange = (e) => {
    const valor = e.target.value;
    setDescripcion(valor);
    setExito('');

    // Validación interactiva instantánea del límite máximo de 10 caracteres
    if (valor.length > 10) {
      setError('La descripción no puede superar el límite máximo de 10 caracteres.');
    } else if (error && error.includes('límite máximo')) {
      // Si el error actual era por exceso de caracteres y ya bajó a 10 o menos, lo eliminamos dinámicamente
      setError('');
    }
  };

  // 3. Función para manejar el registro y validaciones al enviar
  const handleSubmit = (e) => {
    e.preventDefault();
    setExito('');

    // Validación de descripción vacía o menor a 3 caracteres
    if (!descripcion || descripcion.trim().length < 3) {
      setError('La descripción es obligatoria y debe tener al menos 3 caracteres.');
      return;
    }

    // Validación de límite máximo de 10 caracteres
    if (descripcion.trim().length > 10) {
      setError('La descripción no puede superar el límite máximo de 10 caracteres.');
      return;
    }

    // Validación de precio (número mayor que cero)
    const precioNum = parseFloat(precio);
    if (!precio || isNaN(precioNum) || precioNum <= 0) {
      setError('El precio es obligatorio y debe ser mayor que cero.');
      return;
    }

    // Validación de categoría obligatoria
    if (!categoria) {
      setError('Debe seleccionar una categoría obligatoria.');
      return;
    }

    // Generar código automático único sin duplicados
    const nuevoCodigo = `PROD-00${productos.length + 1}`;

    // Crear el nuevo producto
    const nuevoProducto = {
      codigo: nuevoCodigo,
      descripcion: descripcion.trim(),
      precio: precioNum,
      categoria: categoria
    };

    // Incorporar al estado de React y actualizar la tabla automáticamente
    setProductos([...productos, nuevoProducto]);
    setExito('¡Producto registrado con éxito!');

    // Limpiar campos del formulario
    handleLimpiar();
  };

  const handleLimpiar = () => {
    setDescripcion('');
    setPrecio('');
    setCategoria('');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Barra de navegación superior estilo rosado */}
      <header className="bg-pink-400 text-white shadow-md py-4 px-6">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-wide">Gestión de productos</h1>
          <nav className="space-x-4">
            <span className="cursor-pointer hover:underline">Catálogo</span>
            <span className="cursor-pointer hover:underline">Registros</span>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-6">
        {/* Título de la sección */}
        <h2 className="text-2xl font-bold text-pink-600 text-center mb-6">
          Catálogo y Registro de Productos
        </h2>

        {/* Mensajes de error o éxito */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm font-medium transition-all">
            {error}
          </div>
        )}
        {exito && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 text-sm font-medium transition-all">
            {exito}
          </div>
        )}

        {/* Formulario de Registro */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-pink-100 mb-8">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">+ Nuevo producto</h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-medium text-gray-600">Descripción</label>
                <span className={`text-xs ${descripcion.length > 10 ? 'text-red-500 font-bold' : 'text-gray-400'}`}>
                  {descripcion.length}/10
                </span>
              </div>
              <input
                type="text"
                value={descripcion}
                onChange={handleDescripcionChange}
                placeholder="Máx. 10 caracteres"
                className={`w-full border rounded px-3 py-2 focus:outline-none transition ${
                  descripcion.length > 10 
                    ? 'border-red-500 focus:border-red-500 bg-red-50' 
                    : 'border-gray-300 focus:border-pink-500'
                }`}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Precio (S/)</label>
              <input
                type="number"
                step="0.01"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                placeholder="0.00"
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Categoría</label>
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-pink-500 bg-white"
              >
                <option value="">Seleccione...</option>
                <option value="Bebidas">Bebidas</option>
                <option value="Snacks">Snacks</option>
                <option value="Golosinas">Golosinas</option>
              </select>
            </div>
            <div className="md:col-span-3 flex justify-end space-x-3 mt-2">
              <button
                type="button"
                onClick={handleLimpiar}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 font-medium text-sm transition"
              >
                Limpiar
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-pink-500 text-white rounded hover:bg-pink-600 font-medium text-sm shadow transition"
              >
                Registrar producto
              </button>
            </div>
          </form>
        </div>

        {/* Tabla de Productos */}
        <div className="bg-white rounded-lg shadow-sm border border-pink-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-pink-50 text-gray-700 border-b border-pink-100">
                <th className="py-3 px-4 font-semibold text-sm">Código</th>
                <th className="py-3 px-4 font-semibold text-sm">Descripción</th>
                <th className="py-3 px-4 font-semibold text-sm">Precio</th>
                <th className="py-3 px-4 font-semibold text-sm">Categoría</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((prod) => (
                <tr key={prod.codigo} className="border-b border-gray-100 hover:bg-pink-50/30">
                  <td className="py-3 px-4 text-sm text-gray-600">{prod.codigo}</td>
                  <td className="py-3 px-4 text-sm text-gray-800 font-medium">{prod.descripcion}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">S/ {prod.precio.toFixed(2)}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    <span className="bg-pink-100 text-pink-700 px-2.5 py-0.5 rounded-full text-xs font-medium">
                      {prod.categoria}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default App;