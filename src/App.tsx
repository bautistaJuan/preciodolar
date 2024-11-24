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
    </div>
  )
}

