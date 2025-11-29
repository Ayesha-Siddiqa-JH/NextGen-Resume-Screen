import { FileText, Download } from 'lucide-react';

export default function ReferenceLetter({ letter }) {
    if (!letter) return null;

    const handleDownload = () => {
        const element = document.createElement('a');
        const file = new Blob([letter], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = 'reference_letter.txt';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    return (
        <div className="reference-letter">
            <h3><FileText size={20} /> AI-Generated Reference Letter</h3>

            <div className="letter-content">
                <pre>{letter}</pre>
            </div>

            <button onClick={handleDownload} className="download-btn">
                <Download size={18} />
                Download Reference Letter
            </button>
        </div>
    );
}
