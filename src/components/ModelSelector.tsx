import { useState, useEffect } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, Zap, Clock, Brain } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

const models = [
  {
    id: 'google/gemini-2.5-flash',
    name: 'Gemini 2.5 Flash',
    description: 'Balanced speed and quality - Best for most tasks',
    icon: Zap,
    color: 'text-blue-500',
  },
  {
    id: 'google/gemini-2.5-pro',
    name: 'Gemini 2.5 Pro',
    description: 'Highest quality - Complex reasoning and analysis',
    icon: Brain,
    color: 'text-purple-500',
  },
  {
    id: 'google/gemini-2.5-flash-lite',
    name: 'Gemini 2.5 Flash Lite',
    description: 'Fastest - Simple tasks and quick responses',
    icon: Clock,
    color: 'text-green-500',
  },
  {
    id: 'openai/gpt-5',
    name: 'GPT-5',
    description: 'Premium - Excellent for nuanced legal work',
    icon: Sparkles,
    color: 'text-amber-500',
  },
  {
    id: 'openai/gpt-5-mini',
    name: 'GPT-5 Mini',
    description: 'Efficient - Good balance of speed and capability',
    icon: Zap,
    color: 'text-cyan-500',
  },
  {
    id: 'openai/gpt-5-nano',
    name: 'GPT-5 Nano',
    description: 'Economic - High-volume simple tasks',
    icon: Clock,
    color: 'text-emerald-500',
  },
];

export function ModelSelector() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [selectedModel, setSelectedModel] = useState('google/gemini-2.5-flash');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUserPreference();
  }, [user]);

  const loadUserPreference = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('user_preferences')
        .select('preferred_model')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (data?.preferred_model) {
        setSelectedModel(data.preferred_model);
      }
    } catch (error) {
      console.error('Error loading preferences:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleModelChange = async (modelId: string) => {
    if (!user) return;
    
    setSelectedModel(modelId);

    try {
      const { error } = await supabase
        .from('user_preferences')
        .upsert({ 
          user_id: user.id, 
          preferred_model: modelId 
        }, {
          onConflict: 'user_id'
        });

      if (error) throw error;

      const model = models.find(m => m.id === modelId);
      toast({
        title: "Model updated",
        description: `Now using ${model?.name}`,
      });
    } catch (error) {
      console.error('Error saving preference:', error);
      toast({
        title: "Error",
        description: "Failed to save model preference",
        variant: "destructive",
      });
    }
  };

  const selectedModelData = models.find(m => m.id === selectedModel);
  const Icon = selectedModelData?.icon || Sparkles;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-accent" />
          AI Model Selection
        </CardTitle>
        <CardDescription>
          Choose the AI model for legal analysis
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="model">Select Model</Label>
          <Select 
            value={selectedModel} 
            onValueChange={handleModelChange}
            disabled={isLoading}
          >
            <SelectTrigger id="model">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {models.map((model) => {
                const ModelIcon = model.icon;
                return (
                  <SelectItem key={model.id} value={model.id}>
                    <div className="flex items-center gap-2">
                      <ModelIcon className={`h-4 w-4 ${model.color}`} />
                      <span>{model.name}</span>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        {selectedModelData && (
          <div className="p-3 rounded-lg bg-accent/5 border border-accent/20 space-y-2">
            <div className="flex items-center gap-2">
              <Icon className={`h-5 w-5 ${selectedModelData.color}`} />
              <span className="font-medium">{selectedModelData.name}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {selectedModelData.description}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}