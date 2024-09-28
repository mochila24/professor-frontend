'use client'; // Para permitir o uso de hooks no App Router

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation'; // Para navegar e obter o ID
import axios from 'axios';

export default function EditarProfessor() {
  const { id } = useParams(); // Obter o ID do professor da URL
  const [formData, setFormData] = useState({
    tx_nome: '',
    tx_sexo: 'M',
    tx_estado_civil: 'S',
    dt_nascimento: '',
    tx_telefone: '',
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Função para buscar os dados do professor
  useEffect(() => {
    const fetchProfessor = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/professor/${id}`);
        setFormData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar os dados do professor:', error);
      }
    };
    fetchProfessor();
  }, [id]);

  // Função para atualizar os dados do professor
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/professor/${id}`, formData);
      router.push('/'); // Redireciona para a página principal após a atualização
    } catch (error) {
      console.error('Erro ao atualizar professor:', error);
    }
  };

  // Função para deletar o professor
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/professor/${id}`);
      router.push('/'); // Redireciona para a página principal após a exclusão
    } catch (error) {
      console.error('Erro ao excluir professor:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h1>CARREGANDO...</h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-gray-900">Editar Professor</h1>
        <form onSubmit={handleUpdate}>
          <label className="block mb-2 text-gray-700">Nome:</label>
          <input
            type="text"
            value={formData.tx_nome}
            onChange={(e) => setFormData({ ...formData, tx_nome: e.target.value })}
            className="w-full p-2 mb-4 border border-gray-300 rounded bg-gray-50 text-gray-800"
            required
          />

          <label className="block mb-2 text-gray-700">Sexo:</label>
          <select
            value={formData.tx_sexo}
            onChange={(e) => setFormData({ ...formData, tx_sexo: e.target.value })}
            className="w-full p-2 mb-4 border border-gray-300 rounded bg-gray-50 text-gray-800"
          >
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
          </select>

          <label className="block mb-2 text-gray-700">Estado Civil:</label>
          <select
            value={formData.tx_estado_civil}
            onChange={(e) => setFormData({ ...formData, tx_estado_civil: e.target.value })}
            className="w-full p-2 mb-4 border border-gray-300 rounded bg-gray-50 text-gray-800"
          >
            <option value="S">Solteiro(a)</option>
            <option value="C">Casado(a)</option>
            <option value="D">Divorciado(a)</option>
          </select>

          <label className="block mb-2 text-gray-700">Data de Nascimento:</label>
          <input
            type="date"
            value={formData.dt_nascimento}
            onChange={(e) => setFormData({ ...formData, dt_nascimento: e.target.value })}
            className="w-full p-2 mb-4 border border-gray-300 rounded bg-gray-50 text-gray-800"
            required
          />

          <label className="block mb-2 text-gray-700">Telefone:</label>
          <input
            type="text"
            value={formData.tx_telefone}
            onChange={(e) => setFormData({ ...formData, tx_telefone: e.target.value })}
            className="w-full p-2 mb-4 border border-gray-300 rounded bg-gray-50 text-gray-800"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Atualizar Professor
          </button>
        </form>

        <button
          className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={() => router.push('/')}
        >
          Retornar
        </button>

        <button
          className="w-full mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          onClick={handleDelete}
        >
          Deletar Professor
        </button>
      </div>
    </div>
  );
}
