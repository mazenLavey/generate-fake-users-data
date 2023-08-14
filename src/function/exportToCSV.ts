import Papa from 'papaparse';
import { UserData } from 'types/interfaces';

const exportToCSV = (data: UserData[] ) => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'fake_users.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export default exportToCSV;