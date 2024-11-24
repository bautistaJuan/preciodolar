'use client'
import { formatCurrencyCoverter } from "../utils/currency"
import { useState, useEffect } from 'react'
import { ArrowLeftRight } from 'lucide-react'
import fetchRate from "../utils/fetchDolar"

export default function CurrencyConverter() {
    const [rate, setRate] = useState<number>(1)
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
        <div className="mt-12 rounded-lg shadow-md p-6 max-w-md mx-auto">
            {/* <button className="bg-red-500 mx-4 p-2 text-white font-bold">OFU</button>
            <button className="bg-red-500 mx-4 p-2 text-white font-bold">OFU</button> */}
            <h2 className="text-2xl font-bold mb-4 text-center  bold">Conversor</h2>
            {/* <h6 className="mb-4 text-center font-thin">Calcula cuanto te sale comprar y cuanto podes comprar </h6> */}
            <div className="flex flex-col space-y-4">
                <div>
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-600 mb-1">
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
                <div className="flex  items-center justify-between">
                    <div className="text-lg font-semibold">{fromUSD ? 'USD' : 'ARS'}</div>
                    <button
                        onClick={handleSwitch}
                        className="p-2 bg-green-500 rounded-full"
                        aria-label="Cambiar dirección de conversión"
                    >
                        <ArrowLeftRight className="h-6 w-6 text-white" />
                    </button>
                    <div className="text-lg font-semibold">{fromUSD ? 'ARS' : 'USD'}</div>
                </div>
                <div className="text-center  text-2xl">
                    {amount !== '' && formatCurrencyCoverter(convertedAmount, fromUSD ? 'ARS' : 'USD')}
                    <p className="text-sm mt-1">
                        Comprar 1 USD = {formatCurrencyCoverter(rate, 'ARS')}
                    </p>
                </div>
            </div>
        </div>
    )
}

