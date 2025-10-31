import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, Sparkles, Download, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ModelSelector } from "@/components/ModelSelector";
import { useAuth } from "@/hooks/useAuth";

const Ask = () => {
  const { user } = useAuth();
  const [query, setQuery] = useState("");
  const [jurisdiction, setJurisdiction] = useState("california");
  const [practiceArea, setPracticeArea] = useState("contract");
  const [citationStyle, setCitationStyle] = useState("bluebook");
  const [format, setFormat] = useState("irac");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const [results, setResults] = useState<any>(null);
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

  const handleResearch = async () => {
    if (!query.trim()) {
      toast({
        title: "Query required",
        description: "Please enter a legal research question.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('legal-research', {
        body: {
          query,
          jurisdiction,
          practiceArea,
          citationStyle,
          format,
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
        title: "Research complete!",
        description: "Your IRAC analysis is ready.",
      });
    } catch (error) {
      console.error('Error conducting research:', error);
      toast({
        title: "Error",
        description: "Failed to complete research. Please try again.",
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
            <Search className="h-8 w-8 text-accent" />
            ASK - Legal Research
          </h1>
          <p className="text-muted-foreground">
            Get comprehensive legal research with IRAC-formatted analysis
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Input Section */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Research Query</CardTitle>
                <CardDescription>
                  Enter your legal question for AI-powered IRAC analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="query">Legal Question</Label>
                  <Textarea
                    id="query"
                    placeholder="Example: What are the requirements for establishing a breach of contract claim under California law?"
                    className="min-h-32 resize-none"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="jurisdiction">Jurisdiction</Label>
                    <Select value={jurisdiction} onValueChange={setJurisdiction}>
                      <SelectTrigger id="jurisdiction">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="california">California</SelectItem>
                        <SelectItem value="newyork">New York</SelectItem>
                        <SelectItem value="texas">Texas</SelectItem>
                        <SelectItem value="federal">Federal</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="practice-area">Practice Area</Label>
                    <Select value={practiceArea} onValueChange={setPracticeArea}>
                      <SelectTrigger id="practice-area">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="contract">Contract Law</SelectItem>
                        <SelectItem value="tort">Tort Law</SelectItem>
                        <SelectItem value="corporate">Corporate Law</SelectItem>
                        <SelectItem value="employment">Employment Law</SelectItem>
                        <SelectItem value="ip">Intellectual Property</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="citation-style">Citation Style</Label>
                    <Select value={citationStyle} onValueChange={setCitationStyle}>
                      <SelectTrigger id="citation-style">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bluebook">Bluebook</SelectItem>
                        <SelectItem value="apa">APA</SelectItem>
                        <SelectItem value="mla">MLA</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="format">Format Type</Label>
                    <Select value={format} onValueChange={setFormat}>
                      <SelectTrigger id="format">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="irac">IRAC Format</SelectItem>
                        <SelectItem value="summary">Summary Only</SelectItem>
                        <SelectItem value="detailed">Detailed Analysis</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button 
                  onClick={handleResearch} 
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? (
                    <>
                      <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Run Research
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
                      <CardTitle>IRAC Analysis Results</CardTitle>
                      <CardDescription>Comprehensive legal research output</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
                        Confidence: 92%
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Export PDF
                      </Button>
                    </div>
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
                <CardTitle className="text-base">Recent Researches</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { title: "Contract breach CA", time: "2h ago" },
                  { title: "Employment discrimination", time: "5h ago" },
                  { title: "IP infringement case", time: "1d ago" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors">
                    <Search className="h-4 w-4 text-accent mt-1 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.title}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {item.time}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-accent/5 border-accent/20">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-accent" />
                  Pro Tip
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  For more accurate results, include specific facts, dates, and parties involved in your query. 
                  The AI performs better with detailed context.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Ask;
