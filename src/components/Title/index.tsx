'use client'

export default function Title() {
    return (
        <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
                Pessoas Desaparecidas
            </h1>
            <div className="flex justify-center items-center">
                <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mx-auto"></div>
            </div>
            <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
                Sistema de busca de pessoas desaparecidas
            </p>
        </div>
    )
}