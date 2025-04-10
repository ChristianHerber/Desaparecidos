'use client'

export default function Paginacao({ pagina, totalPaginas, proximaPagina, paginaAnterior, totalItens }) {
    return (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 rounded-lg shadow">
            <div className="flex-1 flex justify-between sm:hidden">
                <button
                    onClick={paginaAnterior}
                    disabled={pagina === 0}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                        pagina === 0
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                >
                    Anterior
                </button>
                <button
                    onClick={proximaPagina}
                    disabled={pagina >= totalPaginas - 1}
                    className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                        pagina >= totalPaginas - 1
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                >
                    Próxima
                </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Mostrando <span className="font-medium">{totalItens}</span> resultados
                        {totalPaginas > 0 && (
                            <> - Página <span className="font-medium">{pagina + 1}</span> de <span className="font-medium">{totalPaginas}</span></>
                        )}
                    </p>
                </div>
                <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <button
                            onClick={paginaAnterior}
                            disabled={pagina === 0}
                            className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                                pagina === 0
                                    ? "text-gray-300 cursor-not-allowed"
                                    : "text-gray-500 hover:bg-gray-50"
                            }`}
                        >
                            <span className="sr-only">Anterior</span>
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>

                        <button
                            onClick={proximaPagina}
                            disabled={pagina >= totalPaginas - 1}
                            className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                                pagina >= totalPaginas - 1
                                    ? "text-gray-300 cursor-not-allowed"
                                    : "text-gray-500 hover:bg-gray-50"
                            }`}
                        >
                            <span className="sr-only">Próxima</span>
                            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </nav>
                </div>
            </div>
        </div>
    )
}