'use client'

interface FilterProps {
    faixaIdadeInicial: number,
    setFaixaIdadeInicial: (value: number) => void,
    faixaIdadeFinal: number,
    setFaixaIdadeFinal: (value: number) => void,
    sexo: string,
    setSexo: (value: string) => void,
    nome: string,
    setNome: (value: string) => void,
    status: string,
    setStatus: (value: string) => void,
    setPagina: (value: number) => void,
}

export default function Filter({ 
    faixaIdadeInicial, 
    setFaixaIdadeInicial, 
    faixaIdadeFinal, 
    setFaixaIdadeFinal, 
    sexo, 
    setSexo, 
    nome, 
    setNome, 
    status, 
    setStatus, 
    setPagina 
}: FilterProps) {
    const limparFiltros = () => {
        setFaixaIdadeFinal(99)
        setFaixaIdadeInicial(0)
        setNome('')
        setSexo('')
        setStatus('DESAPARECIDO')
        setPagina(0)
    }

    return (
        <div className="md:w-1/3 sm:w-full bg-white shadow-lg rounded-xl border border-gray-100 p-6 mb-8 mr-2">
            <div className="border-b border-gray-200 pb-4 mb-6">
                <h2 className="text-xl font-bold text-gray-800">Filtros de Pesquisa</h2>
                <p className="text-gray-500 text-sm mt-1">Refine sua busca com os filtros abaixo</p>
            </div>

            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="idadeInicial" className="block text-gray-700 text-sm font-medium mb-2">
                            Idade mínima
                        </label>
                        <input
                            type="number"
                            id="idadeInicial"
                            min="0"
                            max="99"
                            value={faixaIdadeInicial}
                            onChange={(e) => setFaixaIdadeInicial(parseInt(e.target.value) || 0)}
                            className="bg-gray-50 border border-gray-300 rounded-lg w-full py-2.5 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>

                    <div>
                        <label htmlFor="idadeFinal" className="block text-gray-700 text-sm font-medium mb-2">
                            Idade máxima
                        </label>
                        <input
                            type="number"
                            id="idadeFinal"
                            min="0"
                            max="99"
                            value={faixaIdadeFinal}
                            onChange={(e) => setFaixaIdadeFinal(parseInt(e.target.value) || 0)}
                            className="bg-gray-50 border border-gray-300 rounded-lg w-full py-2.5 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="nome" className="block text-gray-700 text-sm font-medium mb-2">
                        Nome
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                        <input
                            type="text"
                            id="nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            placeholder="Digite um nome"
                            className="bg-gray-50 border border-gray-300 rounded-lg w-full py-2.5 pl-10 pr-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                    <label className="block text-gray-700 text-sm font-medium mb-3">
                        Sexo
                    </label>
                    <div className="flex gap-4">
                        <div className="flex items-center">
                            <input
                                type="radio"
                                name="sexo"
                                id="masculino"
                                checked={sexo === 'MASCULINO'}
                                onChange={() => setSexo('MASCULINO')}
                                className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                            />
                            <label htmlFor="masculino" className="text-sm text-gray-700 ml-2">
                                Masculino
                            </label>
                        </div>

                        <div className="flex items-center">
                            <input
                                type="radio"
                                name="sexo"
                                id="feminino"
                                checked={sexo === 'FEMININO'}
                                onChange={() => setSexo('FEMININO')}
                                className="w-4 h-4 text-pink-600 focus:ring-pink-500"
                            />
                            <label htmlFor="feminino" className="text-sm text-gray-700 ml-2">
                                Feminino
                            </label>
                        </div>
                        
                        <div className="flex items-center">
                            <input
                                type="radio"
                                name="sexo"
                                id="todos"
                                checked={sexo === ''}
                                onChange={() => setSexo('')}
                                className="w-4 h-4 text-gray-600 focus:ring-gray-500"
                            />
                            <label htmlFor="todos" className="text-sm text-gray-700 ml-2">
                                Todos
                            </label>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                    <label className="block text-gray-700 text-sm font-medium mb-3">
                        Situação
                    </label>
                    <div className="flex gap-4">
                        <div className="flex items-center">
                            <input
                                type="radio"
                                name="status"
                                id="localizado"
                                checked={status === 'LOCALIZADO'}
                                onChange={() => setStatus('LOCALIZADO')}
                                className="w-4 h-4 text-green-600 focus:ring-green-500"
                            />
                            <label htmlFor="localizado" className="text-sm text-gray-700 ml-2">
                                Localizado
                            </label>
                        </div>

                        <div className="flex items-center">
                            <input
                                type="radio"
                                name="status"
                                id="desaparecido"
                                checked={status === 'DESAPARECIDO'}
                                onChange={() => setStatus('DESAPARECIDO')}
                                className="w-4 h-4 text-red-600 focus:ring-red-500"
                            />
                            <label htmlFor="desaparecido" className="text-sm text-gray-700 ml-2">
                                Desaparecido
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <button
                    onClick={limparFiltros}
                    className="cursor-pointer w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-md transition-all flex items-center justify-center gap-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Limpar Filtros
                </button>
            </div>
        </div>
    )
}