'use client'

import PessoaCard from '../Card'
import Paginacao from '../Pagination'

export default function ListaResultados({ 
    pessoas, 
    carregando, 
    erro, 
    pagina, 
    totalPaginas, 
    proximaPagina, 
    paginaAnterior 
}) {
    if (carregando) {
        return (
            <div className="flex justify-center items-center w-full">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-4 border-gray-500"></div>
            </div>
        )
    }

    if (erro) {
        return (
            <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8 w-full" role="alert">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-red-700">{erro}</p>
                    </div>
                </div>
            </div>
        )
    }

    if (pessoas.length === 0) {
        return (
            <div className="shadow bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 w-full">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                            Nenhuma pessoa encontrada com os filtros aplicados.
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full md:w-2/3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 mb-2">
                {pessoas.map((pessoa) => (
                    <PessoaCard key={pessoa.id} pessoa={pessoa} />
                ))}
            </div>

            <Paginacao 
                pagina={pagina} 
                totalPaginas={totalPaginas} 
                proximaPagina={proximaPagina} 
                paginaAnterior={paginaAnterior}
                totalItens={pessoas.length}
            />
        </div>
    )
}