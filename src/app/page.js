'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [professores, setProfessores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfessores = async () => {
      try {
        const response = await axios.get('http://localhost:3001/professor');
        setProfessores(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar os professores:', error);
        setLoading(false);
      }
    };
    fetchProfessores();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1>CARREGANDO...</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Professores</h1>
      <button className="bg-green-500 text-white py-2 px-4 rounded mb-4">
        Novo
      </button>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Nome</th>
            <th className="px-4 py-2">Estado Civil</th>
            <th className="px-4 py-2">Data de Nascimento</th>
            <th className="px-4 py-2">Telefone</th>
            <th className="px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {professores
            .sort((a, b) => a.tx_nome.localeCompare(b.tx_nome))
            .map((professor) => (
              <tr key={professor.id_professor}>
                <td className="border px-4 py-2">{professor.tx_nome}</td>
                <td className="border px-4 py-2">
                  {professor.tx_estado_civil === 'S'
                    ? 'Solteiro(a)'
                    : professor.tx_estado_civil === 'C'
                    ? 'Casado(a)'
                    : 'Divorciado(a)'}
                </td>
                <td className="border px-4 py-2">
                  {new Date(professor.dt_nascimento).toLocaleDateString('pt-BR')}
                </td>
                <td className="border px-4 py-2">{professor.tx_telefone}</td>
                <td className="border px-4 py-2">
                  <button className="bg-blue-500 text-white py-1 px-2 rounded mr-2">
                    Alterar
                  </button>
                  <button className="bg-red-500 text-white py-1 px-2 rounded">
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
