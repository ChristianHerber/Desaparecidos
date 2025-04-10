'use client'

import { useRouter } from "next/navigation";

interface Pessoa {
    id?: string;
    urlFoto?: string;
    nome?: string;
    idade?: number;
    sexo?: "MASCULINO" | "FEMININO";
    dataNascimento?: string;
    ultimaOcorrencia?: {
        dtDesaparecimento?: string;
        uf?: string;
        cidade?: string;
        dataLocalizacao?: string;
    };
}

export default function PessoaCard({ pessoa }: { pessoa: Pessoa }) {
    const router = useRouter();

    const handleClick = () => {
        const hasDataLocalizacao = Boolean(pessoa.ultimaOcorrencia?.dataLocalizacao);
        const hasPessoaId = Boolean(pessoa.id);
    
        const shouldNavigate = !hasDataLocalizacao && hasPessoaId;
    
        if (shouldNavigate) {
            router.push(`/desaparecidos/${pessoa.id}`);
        }
    };
    

    const formatarData = (dataString?: string) => {
        if (!dataString) return "";
        return new Date(dataString).toLocaleDateString('pt-BR');
    };

    return (
        <div 
            className="bg-white overflow-hidden shadow-md rounded-xl hover:shadow-xl transition-all duration-300 border border-gray-100 cursor-pointer transform hover:-translate-y-1"
            onClick={handleClick}
        >
            <div className="relative">
                {pessoa.ultimaOcorrencia?.dataLocalizacao && (
                    <div className="absolute top-2 right-2 z-10">
                        <span className="px-3 py-1 text-xs font-bold rounded-full bg-green-100 text-green-800 shadow-sm">
                            Localizado
                        </span>
                    </div>
                )}
                
                <div className="h-3 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
                
                <div className="p-4">
                    <div className="flex justify-center mb-4">
                        {pessoa.urlFoto ? (
                            <div className="h-28 w-28 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-md">
                                <img
                                    src={pessoa.urlFoto}
                                    alt={pessoa.nome || "Foto não disponível"}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        ) : (
                            <div className="h-28 w-28 rounded-full flex items-center justify-center bg-gray-100 text-gray-400 border-4 border-white shadow-md">
                                <svg className="h-14 w-14" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 12a5 5 0 100-10 5 5 0 000 10zm0-2a3 3 0 100-6 3 3 0 000 6zm9 11a1 1 0 01-2 0v-2a3 3 0 00-3-3H8a3 3 0 00-3 3v2a1 1 0 01-2 0v-2a5 5 0 015-5h8a5 5 0 015 5v2z" />
                                </svg>
                            </div>
                        )}
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-800 text-center mb-3 truncate">
                        {pessoa.nome || "Nome não informado"}
                    </h3>
                    
                    <div className="space-y-3 bg-gray-50 p-4 rounded-lg shadow-inner">
                        {pessoa.idade && (
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 font-medium">Idade:</span>
                                <span className="font-medium text-gray-800">{pessoa.idade} anos</span>
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
                                    <span className="font-medium text-gray-800">Não informado</span>
                                )}
                            </div>
                        )}
                        
                        {pessoa.dataNascimento && (
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 font-medium">Nascimento:</span>
                                <span className="font-medium text-gray-800">
                                    {formatarData(pessoa.dataNascimento)}
                                </span>
                            </div>
                        )}
                        
                        {pessoa.ultimaOcorrencia?.dtDesaparecimento && (
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 font-medium">Desaparecido em:</span>
                                <span className="font-medium text-gray-800">
                                    {formatarData(pessoa.ultimaOcorrencia.dtDesaparecimento)}
                                </span>
                            </div>
                        )}
                        
                        {pessoa.ultimaOcorrencia?.uf && (
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600 font-medium">Local:</span>
                                <span className="font-medium text-gray-800">
                                    {pessoa.ultimaOcorrencia.cidade || ""} - {pessoa.ultimaOcorrencia.uf}
                                </span>
                            </div>
                        )}
                    </div>
                    
                    {pessoa.ultimaOcorrencia?.dataLocalizacao && (
                        <div className="mt-4 pt-3 border-t border-gray-200">
                            <div className="flex items-center justify-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <span className="text-green-600 font-medium">
                                    Localizado em {formatarData(pessoa.ultimaOcorrencia.dataLocalizacao)}
                                </span>
                            </div>
                        </div>
                    )}
                    
                    {!pessoa.ultimaOcorrencia?.dataLocalizacao && (
                        <div className="mt-4 pt-3 border-t border-gray-200">
                            <div className="flex items-center justify-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <span className="text-red-600 font-medium">
                                    Ainda desaparecido
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}