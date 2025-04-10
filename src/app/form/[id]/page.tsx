'use client';

import { useState } from 'react';

interface LocationPhotoFormProps {
    params: {
        id: string;
    };
}

export default function Form({ params }: LocationPhotoFormProps) {
    const pessoaId = params.id;
    const [location, setLocation] = useState('');
    const [photo, setPhoto] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
        setPhoto(file);
        const reader = new FileReader();
        reader.onloadend = () => {
        setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
        const formData = new FormData();
        formData.append('pessoaId', pessoaId);
        formData.append('location', location);
        if (photo) {
        formData.append('photo', photo);
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
        
        console.log('Dados enviados:', { pessoaId, location, photo });
        setSubmitted(true);
        setIsLoading(false);
    } catch (error) {
        console.error('Erro ao enviar o formulário:', error);
        setError('Ocorreu um erro ao enviar os dados. Por favor, tente novamente.');
        setIsLoading(false);
    }
    };

    const handleReset = () => {
    setLocation('');
    setPhoto(null);
    setPreview(null);
    setSubmitted(false);
    setError(null);
    };

    return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 my-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Atualizar Localização e Foto
        </h2>
        
        <div className="mb-4 bg-blue-50 p-3 rounded-lg border border-blue-200">
        <p className="text-blue-700 text-sm">
            <span className="font-medium">ID da Ocorrência:</span> {pessoaId}
        </p>
        </div>
        
        {submitted ? (
        <div className="text-center">
            <div className="bg-green-100 p-4 rounded-lg mb-4">
            <p className="text-green-700 font-medium">Informações atualizadas com sucesso!</p>
            </div>
            <p className="mb-2">ID da Pessoa: <span className="font-semibold">{pessoaId}</span></p>
            <p className="mb-4">Localização: <span className="font-semibold">{location}</span></p>
            {preview && (
            <div className="mb-4">
                <p className="mb-2">Foto enviada:</p>
                <div className="relative h-48 w-full mb-2">
                <img 
                    src={preview} 
                    alt="Preview" 
                    className="rounded-lg object-cover h-full w-full"
                />
                </div>
            </div>
            )}
            <button
            onClick={handleReset}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300"
            >
                Atualizar novamente
            </button>
        </div>
        ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Localização
            </label>
            <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Informe a localização"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />
            </div>
            
            <div>
            <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-1">
                Foto
            </label>
            <div className="flex flex-col items-center space-y-4">
                <div className="w-full flex justify-center">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-3 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p className="text-sm text-gray-500">
                        <span className="font-semibold">Clique para enviar</span> ou arraste uma imagem
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG ou JPEG</p>
                    </div>
                    <input 
                        id="photo" 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={handlePhotoChange}
                        required
                    />
                </label>
                </div>
                
                {preview && (
                <div className="relative h-48 w-full">
                    <img 
                        src={preview} 
                        alt="Preview" 
                        className="rounded-lg object-cover h-full w-full"
                    />
                    <button
                        type="button"
                        onClick={() => {
                            setPhoto(null);
                            setPreview(null);
                        }}
                        className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    </button>
                </div>
                )}
            </div>
            </div>
            
            {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                {error}
            </div>
            )}
            
            <div>
            <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2 px-4 rounded-md text-white font-medium transition duration-300 ${
                isLoading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
            >
                {isLoading ? (
                <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                </span>
                ) : (
                'Salvar Informações'
                )}
            </button>
            </div>
        </form>
        )}
    </div>
    );
}