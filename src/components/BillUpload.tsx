import { useState } from 'react';
import { createBill } from '../services/api';

interface BillUploadProps {
  onUploadSuccess: () => void;
}

const toBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result as string);
  reader.onerror = error => reject(error);
});

export function BillUpload({ onUploadSuccess }: BillUploadProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
  
    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
      console.log("Iniciando envio..."); 
  
      if (!selectedFile) {
        setError('Por favor, selecione um arquivo.');
        return;
      }
  
      setIsLoading(true);
      setError('');
  
      try {
        console.log("Convertendo arquivo para Base64..."); 
        const base64String = await toBase64(selectedFile);
        console.log("Conversão concluída. Enviando para a API..."); 
  
        await createBill(base64String);
        
        console.log("API respondeu com sucesso!"); 
        onUploadSuccess();
        setSelectedFile(null); 
      } catch (e: any) {
        console.error("Erro no processo de upload:", e); 
        setError(e.message || 'Ocorreu um erro.');
      } finally {
        console.log("Finalizando processo, desativando loading."); 
        setIsLoading(false);
      }
    };

  return (
<form onSubmit={handleSubmit} className="upload-form">
      <h2>Enviar Nova Conta</h2>
      <label htmlFor="file-upload" className="upload-input">
        {selectedFile ? selectedFile.name : <p>Clique para selecionar um arquivo (PDF, JPG, PNG)</p>}
      </label>
      <input
        id="file-upload"
        type="file"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}
        style={{ display: 'none' }} 
      />
      <button type="submit" disabled={isLoading} className="upload-button">
        {isLoading ? 'Analisando...' : 'Enviar e Extrair Dados'}
      </button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
}