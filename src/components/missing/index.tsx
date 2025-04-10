'use client'

import { useState, useEffect } from 'react'
import Header from '../Header'
import Title from '../Title'
import Filter from '../Filter'
import List from '../List'

export default function PessoasDesaparecidas() {
    const [pessoas, setPessoas] = useState([])
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState<string | null>(null)
    const [pagina, setPagina] = useState(0)
    const [totalPaginas, setTotalPaginas] = useState(0)
    const porPagina = 12
    const [faixaIdadeInicial, setFaixaIdadeInicial] = useState(0)
    const [faixaIdadeFinal, setFaixaIdadeFinal] = useState(99)
    const [sexo, setSexo] = useState('')
    const [nome, setNome] = useState('')
    const [status, setStatus] = useState('DESAPARECIDO')

    useEffect(() => {
        const buscarPessoas = async () => {
            try {
                setCarregando(true)
                const url = `https://abitus-api.geia.vip/v1/pessoas/aberto/filtro?nome=${nome}&faixaIdadeInicial=${faixaIdadeInicial}&faixaIdadeFinal=${faixaIdadeFinal}&sexo=${sexo}&pagina=${pagina}&porPagina=${porPagina}&status=${status}`

                const resposta = await fetch(url)

                if (!resposta.ok) {
                    throw new Error(`Falha ao buscar dados da API: ${resposta.status}`)
                }

                const dados = await resposta.json()
                setPessoas(dados.content || [])
                setTotalPaginas(dados.totalPages || 0)
                setErro(null)
            } catch (error) {
                console.error('Erro ao buscar pessoas:', error)
                setErro('Não foi possível carregar a lista de pessoas desaparecidas. Tente novamente mais tarde.')
            } finally {
                setCarregando(false)
            }
        }

        buscarPessoas()
    }, [pagina, faixaIdadeInicial, faixaIdadeFinal, sexo, nome, status])

    const proximaPagina = () => {
        if (pagina < totalPaginas - 1) {
            setPagina(pagina + 1)
        }
    }

    const paginaAnterior = () => {
        if (pagina > 0) {
            setPagina(pagina - 1)
        }
    }

    return (
        <>
            <Header/>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Title/>

                <div className='flex flex-col md:flex-row items-start'>
                    <Filter
                        faixaIdadeInicial={faixaIdadeInicial}
                        setFaixaIdadeInicial={setFaixaIdadeInicial}
                        faixaIdadeFinal={faixaIdadeFinal}
                        setFaixaIdadeFinal={setFaixaIdadeFinal}
                        sexo={sexo}
                        setSexo={setSexo}
                        nome={nome}
                        setNome={setNome}
                        status={status}
                        setStatus={setStatus}
                        setPagina={setPagina}
                    />
                    
                    <List
                        pessoas={pessoas}
                        carregando={carregando}
                        erro={erro}
                        pagina={pagina}
                        totalPaginas={totalPaginas}
                        proximaPagina={proximaPagina}
                        paginaAnterior={paginaAnterior}
                    />
                </div>
            </div>
        </>
    )
}