import type { Bill } from '../services/api';
import { BillItem } from './BillItem';

interface BillListProps {
  bills: Bill[];
  onDelete: (id: string) => void;
}

export function BillList({ bills, onDelete }: BillListProps) {
  if (bills.length === 0) {
    return <p>Nenhuma conta encontrada. Envie a primeira!</p>;
  }

  return (
    <div className="bills-list">
      <h2>Contas Salvas</h2>
      {bills.length === 0 
        ? <p style={{textAlign: 'center'}}>Nenhuma conta encontrada. Envie a primeira!</p>
        : bills.map((bill) => (
          <BillItem key={bill.id} bill={bill} onDelete={onDelete} />
        ))
      }
    </div>
  );
}