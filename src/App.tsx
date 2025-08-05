import { useState, useEffect } from 'react';
import  { getBills, deleteBill } from './services/api';
import type { Bill } from './services/api'
import { BillUpload } from './components/BillUpload';
import { BillList } from './components/BillList';
import './App.css';

function App() {
  const [bills, setBills] = useState<Bill[]>([]);
  const [error, setError] = useState('');

  const fetchBills = async () => {
    try {
      const data = await getBills();
      setBills(data);
    } catch (e: any) {
      setError(e.message);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteBill(id);
      setBills(currentBills => currentBills.filter(bill => bill.id !== id));
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
<div className="app-container">
      <h1 className="main-title">
        <span>LAE</span> Cartórios
      </h1>
      <p className="main-subtitle">Gerenciador de Contas com IA</p>
      
      <BillUpload onUploadSuccess={fetchBills} />
      <hr className="separator" />
      {error && <p className="error-message">Erro na Aplicação: {error}</p>}
      <BillList bills={bills} onDelete={handleDelete} />
    </div>
  );
}

export default App;