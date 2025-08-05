import type { Bill } from '../services/api';

interface BillItemProps {
  bill: Bill;
  onDelete: (id: string) => void;
}

export function BillItem({ bill, onDelete }: BillItemProps) {
  const handleDelete = () => {
    if (window.confirm(`Tem certeza que deseja deletar a conta de ${bill.nome_cliente}?`)) {
      onDelete(bill.id);
    }
  };

  return (
<div className="bill-item">
      <div className="bill-details">
        <h3>{bill.nome_cliente} - {bill.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h3>
        <p><strong>Vencimento:</strong> {new Date(bill.vencimento).toLocaleDateString('pt-BR')} | <strong>Tipo:</strong> {bill.tipo}</p>
        <p><strong>Descrição:</strong> {bill.descricao}</p>
      </div>
      <div className="bill-actions">
        <button onClick={handleDelete}>Deletar</button>
      </div>
    </div>
  );
}