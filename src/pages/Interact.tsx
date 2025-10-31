import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Upload, File, CheckCircle2, Loader2, AlertCircle, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { supabase } from "@/integrations/supabase/client";
import { ModelSelector } from "@/components/ModelSelector";
import { useAuth } from "@/hooks/useAuth";

const Interact = () => {
  const { user } = useAuth();
  const [files, setFiles] = useState<Array<{ name: string; status: string; content?: string }>>([]);
  const [analysisType, setAnalysisType] = useState("summarize");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const [results, setResults] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState('google/gemini-2.5-flash');
  const { toast } = useToast();

  useEffect(() => {
    loadUserPreference();
  }, [user]);

  const loadUserPreference = async () => {
    if (!user) return;
    try {
      const { data } = await supabase
        .from('user_preferences')
        .select('preferred_model')
        .eq('user_id', user.id)
        .maybeSingle();
      if (data?.preferred_model) {
        setSelectedModel(data.preferred_model);
      }
    } catch (error) {
      console.error('Error loading preference:', error);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(e.target.files || []);
    
    uploadedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const newFile = {
          name: file.name,
          status: "ready",
          content: event.target?.result as string
        };
        setFiles(prev => [...prev, newFile]);
      };
      reader.readAsText(file);
    });

    toast({
      title: "Files uploaded",
      description: `${uploadedFiles.length} file(s) ready for analysis.`,
    });
  };

  const handleAnalyze = async () => {
    if (files.length === 0) {
      toast({
        title: "No files",
        description: "Please upload at least one document.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      // Combine all file contents
      const documentText = files.map(f => `=== ${f.name} ===\n${f.content || ''}`).join('\n\n');

      const { data, error } = await supabase.functions.invoke('document-analysis', {
        body: {
          documentText,
          analysisType,
          fileName: files[0]?.name || 'document',
          model: selectedModel,
        }
      });

      if (error) throw error;

      if (data?.error) {
        if (data.error.includes('Rate limit')) {
          toast({
            title: "Rate limit reached",
            description: "Please try again in a moment.",
            variant: "destructive",
          });
        } else if (data.error.includes('Payment required')) {
          toast({
            title: "Credits needed",
            description: "Please add credits to continue using AI features.",
            variant: "destructive",
          });
        } else {
          throw new Error(data.error);
        }
        return;
      }

      setResults(data.analysis);
      setHasResults(true);
      toast({
        title: "Analysis complete!",
        description: "Document insights are ready.",
      });
    } catch (error) {
      console.error('Error analyzing documents:', error);
      toast({
        title: "Error",
        description: "Failed to analyze documents. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6 animate-fade-in max-w-7xl mx-auto">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <FileText className="h-8 w-8 text-accent" />
            INTERACT - Document Analysis
          </h1>
          <p className="text-muted-foreground">
            Upload and analyze legal documents with AI-powered insights
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Upload Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upload Documents</CardTitle>
                <CardDescription>
                  Drag and drop or click to upload legal documents for analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-accent/50 transition-colors cursor-pointer">
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <p className="text-sm font-medium mb-1">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground">
                      PDF, DOC, DOCX up to 20MB each
                    </p>
                  </label>
                </div>

                {files.length > 0 && (
                  <div className="space-y-2">
                    <Label>Uploaded Files</Label>
                    <div className="space-y-2">
                      {files.map((file, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 rounded-lg border">
                          <File className="h-5 w-5 text-accent" />
                          <span className="flex-1 text-sm font-medium truncate">{file.name}</span>
                          {file.status === "uploading" && <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />}
                          {file.status === "ready" && <CheckCircle2 className="h-4 w-4 text-accent" />}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="analysis-type">Analysis Type</Label>
                  <Select value={analysisType} onValueChange={setAnalysisType}>
                    <SelectTrigger id="analysis-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="summarize">Summarize Document</SelectItem>
                      <SelectItem value="clauses">Extract Key Clauses</SelectItem>
                      <SelectItem value="risk">Risk Analysis</SelectItem>
                      <SelectItem value="compare">Compare Documents</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={handleAnalyze} 
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  disabled={isAnalyzing || files.length === 0}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <FileText className="mr-2 h-4 w-4" />
                      Analyze Documents
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Results Section */}
            {hasResults && (
              <Card className="animate-fade-in-up">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <CardTitle>Analysis Results</CardTitle>
                      <CardDescription>Comprehensive document insights</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Export Report
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-sm max-w-none whitespace-pre-wrap">
                    {results}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <ModelSelector />
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Supported Analysis Types</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    <span className="text-sm">Document Summarization</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    <span className="text-sm">Clause Extraction</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    <span className="text-sm">Risk Assessment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    <span className="text-sm">Contract Comparison</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-accent" />
                    <span className="text-sm">OCR for Scanned Docs</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-accent/5 border-accent/20">
              <CardHeader>
                <CardTitle className="text-base">File Requirements</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>• Maximum file size: 20MB</p>
                <p>• Supported formats: PDF, DOC, DOCX</p>
                <p>• Multiple files supported</p>
                <p>• OCR enabled for scanned documents</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Interact;
