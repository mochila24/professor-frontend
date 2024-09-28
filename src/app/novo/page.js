'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function NovoProfessor() {
  const [formData, setFormData] = useState({
    tx_nome: '',
    tx_sexo: 'M',
    tx_estado_civil: 'S',
    dt_nascimento: '',
    tx_telefone: '',
    id_titulo: 1,
  });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/professor', formData);
      router.push('/');
    } catch (error) {
      console.error('Erro ao adicionar professor:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Adicionar Novo Professor</h1>
        <form onSubmit={handleSubmit}>
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
            Adicionar Professor
          </button>
        </form>

        <button
          className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={() => router.push('/')}
        >
          Retornar
        </button>
      </div>
    </div>
  );
}
