import { useState, useEffect } from 'react'
import { ArrowDownIcon, ArrowUpIcon } from 'lucide-react'
import type { DolarRate } from './types/dolar'
import Loader from './components/Loader'
import CurrencyConverter from './components/CurrencyConverter'
import { formatCurrency, formatDate } from './utils/currency'
export default function DolarRates() {
  const [rates, setRates] = useState<DolarRate[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch('https://dolarapi.com/v1/dolares')
        if (!response.ok) {
          throw new Error('Error al obtener los datos')
        }
        const data = await response.json()
        setRates(data)
        setLoading(false)
      } catch (err) {
        console.log(err);
        setError('Error al cargar las cotizaciones. Por favor, intente nuevamente.')
        setLoading(false)
      }
    }

    fetchRates()
  }, [])


  if (loading) {
    return (
      <Loader />
    )
  }

  if (error) {
    return (
      <div className="text-center py-4 text-red-500 bg-red-50 rounded-lg">
        {error}
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Cotizaciones del Dólar
      </h1>
      <div className="relative py-3 px-4 mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-indigo-500/10 to-purple-500/10 rounded-lg"></div>
        <p className="relative text-lg md:text-xl text-center font-medium bg-gradient-to-r from-blue-600 via-indigo-950-600 to-purple-600 bg-clip-text text-transparent">
          Consulta las cotizaciones del dólar en tiempo real y realiza conversiones precisas entre pesos y dólares, todo desde esta  página web.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rates.map((rate) => (
          <div key={rate.casa} className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                {rate.nombre}
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Compra</span>
                  <span className="text-lg font-semibold text-green-600 flex items-center gap-1">
                    <ArrowDownIcon className="h-4 w-4" />
                    {formatCurrency(rate.compra)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Venta</span>
                  <span className="text-lg font-semibold text-red-600 flex items-center gap-1">
                    <ArrowUpIcon className="h-4 w-4" />
                    {formatCurrency(rate.venta)}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-4">
                  Actualizado: {formatDate(rate.fechaActualizacion)}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <CurrencyConverter />
      <footer className='text-center mt-12'>
        <p className='text-gray-500 text-sm'>Esta aplicación es posible gracias a la API de <a className='text-blue-600 border p-1' href='https://dolarapi.com/docs/'>DolarApi</a> </p>
        <p className='text-gray-500 text-sm'>Desarrollada con <b className='text-blue-600 border p-1'>React</b>, por <a href="https://juan-bautista.vercel.app/" target='_blank' className='text-blue-600 border text-lg p-1 font-semibold'>Juan Bautista</a></p>
      </footer>
    </div>
  )
}

