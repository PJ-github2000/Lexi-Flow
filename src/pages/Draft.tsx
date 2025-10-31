import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileEdit, Sparkles, Download, RefreshCw, Save, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ModelSelector } from "@/components/ModelSelector";
import { useAuth } from "@/hooks/useAuth";

const Draft = () => {
  const { user } = useAuth();
  const [prompt, setPrompt] = useState("");
  const [template, setTemplate] = useState("nda");
  const [style, setStyle] = useState("formal");
  const [length, setLength] = useState("medium");
  const [jurisdiction, setJurisdiction] = useState("california");
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasDraft, setHasDraft] = useState(false);
  const [draftContent, setDraftContent] = useState("");
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

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt required",
        description: "Please enter a document description.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('legal-draft', {
        body: {
          prompt,
          template,
          style,
          length,
          jurisdiction,
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

      setHasDraft(true);
      setDraftContent(data.document);
      toast({
        title: "Draft generated!",
        description: "Your document is ready for review and editing.",
      });
    } catch (error) {
      console.error('Error generating draft:', error);
      toast({
        title: "Error",
        description: "Failed to generate document. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 space-y-6 animate-fade-in max-w-7xl mx-auto">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <FileEdit className="h-8 w-8 text-accent" />
            DRAFT - Document Generation
          </h1>
          <p className="text-muted-foreground">
            Generate professional legal documents with AI assistance
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">
            {!hasDraft ? (
              <Card>
                <CardHeader>
                  <CardTitle>Document Prompt</CardTitle>
                  <CardDescription>
                    Describe the document you want to generate
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="template">Document Template</Label>
                    <Select value={template} onValueChange={setTemplate}>
                      <SelectTrigger id="template">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nda">Non-Disclosure Agreement</SelectItem>
                        <SelectItem value="service">Service Agreement</SelectItem>
                        <SelectItem value="employment">Employment Contract</SelectItem>
                        <SelectItem value="lease">Commercial Lease</SelectItem>
                        <SelectItem value="custom">Custom Document</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="prompt">Document Description</Label>
                    <Textarea
                      id="prompt"
                      placeholder="Example: Draft a mutual NDA between Tech Startup Inc. and Innovation Labs for the purpose of discussing a potential partnership. Include standard confidentiality provisions and a 3-year term."
                      className="min-h-32 resize-none"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="style">Writing Style</Label>
                      <Select value={style} onValueChange={setStyle}>
                        <SelectTrigger id="style">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="formal">Formal</SelectItem>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="simple">Simple Language</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="length">Document Length</Label>
                      <Select value={length} onValueChange={setLength}>
                        <SelectTrigger id="length">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="short">Short</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="long">Comprehensive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="jurisdiction-draft">Jurisdiction</Label>
                      <Select value={jurisdiction} onValueChange={setJurisdiction}>
                        <SelectTrigger id="jurisdiction-draft">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="california">California</SelectItem>
                          <SelectItem value="newyork">New York</SelectItem>
                          <SelectItem value="texas">Texas</SelectItem>
                          <SelectItem value="delaware">Delaware</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Button 
                    onClick={handleGenerate} 
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                        Generating Draft...
                      </>
                    ) : (
                      <>
                        <FileEdit className="mr-2 h-4 w-4" />
                        Generate Document
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="animate-fade-in-up">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <CardTitle>Generated Document</CardTitle>
                      <CardDescription>Review and edit your legal document</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Regenerate
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Sparkles className="mr-2 h-4 w-4" />
                        Simplify Language
                      </Button>
                      <Button size="sm" variant="outline">
                        Add Clause
                      </Button>
                      <Button size="sm" variant="outline">
                        Generate Summary
                      </Button>
                    </div>

                    <Textarea
                      value={draftContent}
                      onChange={(e) => setDraftContent(e.target.value)}
                      className="min-h-[500px] font-mono text-sm resize-none"
                    />

                    <div className="flex justify-end gap-2">
                      <Button variant="outline">
                        Cancel
                      </Button>
                      <Button className="bg-accent hover:bg-accent/90 text-accent-foreground">
                        <Save className="mr-2 h-4 w-4" />
                        Save Draft
                      </Button>
                    </div>
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
                <CardTitle className="text-base">Document Templates</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  "Non-Disclosure Agreement",
                  "Service Agreement",
                  "Employment Contract",
                  "Commercial Lease",
                  "Purchase Agreement",
                  "Partnership Agreement",
                ].map((template) => (
                  <button
                    key={template}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm"
                  >
                    {template}
                  </button>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-accent/5 border-accent/20">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-accent" />
                  AI Features
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground space-y-2">
                <p>• Smart clause suggestions</p>
                <p>• Plain language translation</p>
                <p>• Version history tracking</p>
                <p>• Collaborative editing</p>
                <p>• Export to DOCX/PDF</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Draft;
