'use client'
import { formatCurrencyCoverter } from "../utils/currency"
import { useState, useEffect } from 'react'
import { ArrowLeftRight } from 'lucide-react'
import fetchRate from "../utils/fetchDolar"
interface CurrencyConverterProps {
    initialRate?: number
}

export default function CurrencyConverter({ initialRate = 1 }: CurrencyConverterProps) {
    const [rate, setRate] = useState<number>(initialRate)
    const [amount, setAmount] = useState<string>("1")
    const [fromUSD, setFromUSD] = useState<boolean>(true)
    useEffect(() => {
        fetchRate().then((rate) => {
            setRate(rate)
        })
        console.log(rate);

    }, [])

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (value === '' || /^\d*\.?\d*$/.test(value)) {
            setAmount(value)
        }
    }

    const handleSwitch = () => {
        setFromUSD(!fromUSD)
    }
    const convertedAmount = fromUSD
        ? parseFloat(amount) * rate
        : parseFloat(amount) / rate


    return (
        <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Conversor</h2>
            <div className="flex flex-col space-y-4">
                <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                        Cantidad
                    </label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={handleAmountChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        aria-label={`Cantidad en ${fromUSD ? 'USD' : 'ARS'}`}
                    />
                </div>
                <div className="flex items-center justify-between">
                    <div className="text-lg font-semibold">{fromUSD ? 'USD' : 'ARS'}</div>
                    <button
                        onClick={handleSwitch}
                        className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
                        aria-label="Cambiar dirección de conversión"
                    >
                        <ArrowLeftRight className="h-6 w-6 text-blue-600" />
                    </button>
                    <div className="text-lg font-semibold">{fromUSD ? 'ARS' : 'USD'}</div>
                </div>
                <div className="text-center">
                    {amount !== '' && formatCurrencyCoverter(convertedAmount, fromUSD ? 'USD' : 'ARS')}
                    <p className="text-sm text-gray-600 mt-1">
                        Tasa de cambio: 1 USD = {formatCurrencyCoverter(rate, 'ARS')}
                    </p>
                </div>
            </div>
        </div>
    )
}

