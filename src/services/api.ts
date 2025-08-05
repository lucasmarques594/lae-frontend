const API_URL = '/api';

export interface Bill {
  id: string;
  nome_cliente: string;
  vencimento: string;
  valor: number;
  tipo: string;
  descricao: string;
}

export const getBills = async (): Promise<Bill[]> => {
  const response = await fetch(`${API_URL}/bills`);
  if (!response.ok) {
    throw new Error('Falha ao buscar as contas.');
  }
  return response.json();
};

export const createBill = async (base64File: string): Promise<Bill> => {
  const response = await fetch(`${API_URL}/bills`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ file: base64File }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Falha ao criar a conta.');
  }
  return response.json();
};

export const deleteBill = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/bills/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Falha ao deletar a conta.');
  }
};