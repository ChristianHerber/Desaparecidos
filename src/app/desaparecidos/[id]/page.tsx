'use client'

import Link from 'next/link'
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react'

interface Props {
    params: { id: string }
}

interface Pessoa {
    id: number
    nome: string
    idade: number
    urlFoto?: string
    sexo?: string
    ultimaOcorrencia?: {
        dtDesaparecimento?: string
        dataLocalizacao?: string
        ocoId?: number
    }
}

export default function Detalhes({ params }: Props) {
    const router = useRouter();
    const [pessoa, setPessoa] = useState<Pessoa | null>(null)
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState<string | null>(null)

    useEffect(() => {
        const buscarPessoa = async () => {
            try {
                setCarregando(true)
                const url = `https://abitus-api.geia.vip/v1/pessoas/${params.id}`

                const resposta = await fetch(url)

                if (!resposta.ok) {
                    throw new Error(`Falha ao buscar dados da API: ${resposta.status}`)
                }

                const dados = await resposta.json()
                setPessoa(dados)
                setErro(null)
            } catch (error) {
                console.error('Erro ao buscar pessoa:', error)
                setErro('Não foi possível carregar as informações.')
            } finally {
                setCarregando(false)
            }
        }

        buscarPessoa()
    }, [params.id])

    if (carregando) {
        return (
            <div className="flex justify-center items-center w-full h-screen bg-gray-50">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
            </div>
        )
    }
    if (erro) return (
        <div className="flex justify-center items-center w-full h-screen bg-gray-50">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 shadow-md">
                <p className="text-red-600 font-medium text-lg">{erro}</p>
            </div>
        </div>
    )
    if (!pessoa) return (
        <div className="flex justify-center items-center w-full h-screen bg-gray-50">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 shadow-md">
                <p className="text-yellow-600 font-medium text-lg">Nenhuma pessoa encontrada.</p>
            </div>
        </div>
    )

    const handleClick = () => {
        if (pessoa.id) {
            if (pessoa.ultimaOcorrencia?.ocoId) {
                router.push(`/form/${pessoa.ultimaOcorrencia.ocoId}`);
            }
        }
    };

    const formatarData = (dataString?: string) => {
        if (!dataString) return "";
        return new Date(dataString).toLocaleDateString('pt-BR');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container max-w-3xl mx-auto px-4">
                <div className="mb-6">
                    <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        <span>Voltar para a lista</span>
                    </Link>
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                    <div className="relative">
                        <div className="absolute top-4 left-4 z-10">
                            <span className={`px-4 py-2 rounded-full text-sm font-bold text-white shadow-md ${
                                pessoa.ultimaOcorrencia?.dataLocalizacao ? 'bg-green-600' : 'bg-red-600'
                            }`}>
                                {pessoa.ultimaOcorrencia?.dataLocalizacao ? 'Localizado' : 'Desaparecido'}
                            </span>
                        </div>
                        
                        <div className="h-32 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                        
                        <div className="flex justify-center -mt-16">
                            {pessoa.urlFoto ? (
                                <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-white">
                                    <img
                                        src={pessoa.urlFoto}
                                        alt={pessoa.nome || "Foto não disponível"}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="h-32 w-32 rounded-full flex items-center justify-center border-4 border-white shadow-lg bg-gray-100 text-gray-400">
                                    <svg className="h-16 w-16" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0-2a3 3 0 100-6 3 3 0 000 6zm9 11a1 1 0 01-2 0v-2a3 3 0 00-3-3H8a3 3 0 00-3 3v2a1 1 0 01-2 0v-2a5 5 0 015-5h8a5 5 0 015 5v2z" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="p-6">
                        <h2 className="text-center text-2xl font-bold text-gray-800 mb-2">
                            {pessoa.nome || "Nome não informado"}
                        </h2>
                        
                        {pessoa.ultimaOcorrencia?.dtDesaparecimento && (
                            <p className="text-center text-gray-500 mb-6">
                                Desaparecido desde {formatarData(pessoa.ultimaOcorrencia.dtDesaparecimento)}
                            </p>
                        )}
                        
                        <div className="grid grid-cols-1 gap-6 mb-8">
                            <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
                                <h3 className="font-medium text-gray-800 mb-3 border-b border-gray-200 pb-2">Informações Pessoais</h3>
                                
                                <div className="space-y-3">
                                    {pessoa.idade && (
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600 font-medium">Idade:</span>
                                            <span className="text-gray-800">{pessoa.idade} anos</span>
                                        </div>
                                    )}
                                    
                                    {pessoa.sexo && (
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600 font-medium">Sexo:</span>
                                            {pessoa.sexo === "MASCULINO" ? (
                                                <span className="px-3 py-1 text-xs font-bold rounded-full bg-blue-100 text-blue-800">Masculino</span>
                                            ) : pessoa.sexo === "FEMININO" ? (
                                                <span className="px-3 py-1 text-xs font-bold rounded-full bg-pink-100 text-pink-800">Feminino</span>
                                            ) : (
                                                <span>Não informado</span>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <div className="bg-gray-50 rounded-lg p-4 shadow-sm">
                                <h3 className="font-medium text-gray-800 mb-3 border-b border-gray-200 pb-2">Detalhes da Ocorrência</h3>
                                
                                <div className="space-y-3">
                                    {pessoa.ultimaOcorrencia?.dtDesaparecimento && (
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600 font-medium">Data:</span>
                                            <span className="text-gray-800">{formatarData(pessoa.ultimaOcorrencia.dtDesaparecimento)}</span>
                                        </div>
                                    )}
                                    
                                    {pessoa.ultimaOcorrencia?.localDesaparecimentoConcat && (
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600 font-medium">Local:</span>
                                            <span className="text-gray-800">
                                                {pessoa.ultimaOcorrencia.localDesaparecimentoConcat}
                                            </span>
                                        </div>
                                    )}

                                    {pessoa.ultimaOcorrencia?.ocorrenciaEntrevDesapDTO.vestimentasDesaparecido && (
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600 font-medium">Vestimentas:</span>
                                            <span className="text-gray-800">{pessoa.ultimaOcorrencia.ocorrenciaEntrevDesapDTO.vestimentasDesaparecido}</span>
                                        </div>
                                    )}
                                    
                                    {pessoa.ultimaOcorrencia?.dataLocalizacao && (
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-600 font-medium">Localizado em:</span>
                                            <span className="px-3 py-1 text-xs font-bold rounded-full bg-green-100 text-green-800">
                                                {formatarData(pessoa.ultimaOcorrencia.dataLocalizacao)}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        
                        <button
                            className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                            onClick={handleClick}
                        >
                            <div className="flex items-center justify-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1v-3a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                <span>Enviar informações</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}