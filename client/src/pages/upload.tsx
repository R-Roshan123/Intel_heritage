import Layout from "@/components/layout";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload as UploadIcon, FileText, CheckCircle, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(prev => [...prev, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'text/plain': ['.txt'],
      'application/json': ['.json']
    }
  });

  const removeFile = (name: string) => {
    setFiles(files.filter(f => f.name !== name));
  };

  const handleUpload = () => {
    if (files.length === 0) return;
    
    setUploading(true);
    setProgress(0);
    
    // Simulation of upload & compression process
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          setFiles([]);
          toast({
            title: "Processing Complete",
            description: "Files have been compressed and indexed successfully.",
          });
          return 100;
        }
        return prev + 5;
      });
    }, 150);
  };

  return (
    <Layout>
      <div className="space-y-2">
        <h1 className="text-3xl font-serif font-bold text-primary">Data Ingestion</h1>
        <p className="text-muted-foreground">Upload raw reports for NLP extraction and compression.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Dropzone */}
        <div className="md:col-span-2 space-y-4">
          <div 
            {...getRootProps()} 
            className={`
              border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all
              ${isDragActive ? 'border-amber-500 bg-amber-50' : 'border-slate-200 hover:border-amber-400 hover:bg-slate-50'}
            `}
          >
            <input {...getInputProps()} />
            <div className="h-16 w-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <UploadIcon className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-900">Drop excavation reports here</h3>
            <p className="text-sm text-slate-500 mt-2">
              Support for PDF, TXT, and JSON metadata. <br/>
              Max file size: 50MB
            </p>
            <Button variant="outline" className="mt-6">Select Files</Button>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="space-y-2 animate-in fade-in slide-in-from-bottom-2">
              <h4 className="text-sm font-medium text-slate-500">Selected Files ({files.length})</h4>
              {files.map(file => (
                <div key={file.name} className="flex items-center justify-between p-3 bg-white border rounded-lg shadow-sm">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-amber-600" />
                    <div>
                      <p className="text-sm font-medium text-slate-900">{file.name}</p>
                      <p className="text-xs text-slate-400">{(file.size / 1024).toFixed(1)} KB</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeFile(file.name)} disabled={uploading}>
                    <X className="h-4 w-4 text-slate-400" />
                  </Button>
                </div>
              ))}
              
              <div className="pt-4">
                {uploading ? (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-medium">
                      <span>Compressing & Indexing...</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                ) : (
                  <Button className="w-full bg-amber-600 hover:bg-amber-700" onClick={handleUpload}>
                    Start Processing
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar Info */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="font-serif font-bold text-lg text-slate-900">Compression Guidelines</h3>
              <ul className="space-y-3">
                <li className="flex gap-3 text-sm text-slate-600">
                  <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0" />
                  <span>Ensure reports include standard location coordinates where possible.</span>
                </li>
                <li className="flex gap-3 text-sm text-slate-600">
                  <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0" />
                  <span>Use standard dating notation (e.g., 1200 BCE, not "late bronze age" only).</span>
                </li>
                <li className="flex gap-3 text-sm text-slate-600">
                  <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0" />
                  <span>Images in PDFs will be OCR processed automatically.</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
