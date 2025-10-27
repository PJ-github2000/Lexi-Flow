import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Search, FileText, FileEdit, Sparkles, Shield, Zap, CheckCircle2, ArrowRight, Scale } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-legal-ai.jpg";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Navbar />
      
      {/* Hero Section */}
      <section className="container pt-32 pb-20 animate-fade-in">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
              <Sparkles className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-accent">Empowering Legal Intelligence with AI</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Transform Your Legal Practice with{" "}
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                AI-Powered Intelligence
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed">
              LexiFlow combines cutting-edge AI with legal expertise to deliver instant research, 
              intelligent document analysis, and automated drafting for modern law firms.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/auth">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-glow w-full sm:w-auto">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Book a Demo
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-accent" />
                <span className="text-sm text-muted-foreground">No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-accent" />
                <span className="text-sm text-muted-foreground">14-day free trial</span>
              </div>
            </div>
          </div>

          <div className="relative animate-fade-in-up">
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-primary/20 rounded-2xl blur-3xl"></div>
            <img 
              src={heroImage} 
              alt="Legal AI Platform Interface" 
              className="relative rounded-2xl shadow-2xl border border-border"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container py-20">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold">
            Three Powerful Modules, Infinite Possibilities
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to revolutionize your legal workflow
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-2 hover:border-accent transition-all duration-300 hover:shadow-glow">
            <CardContent className="p-8 space-y-4">
              <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Search className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-2xl font-bold">ASK</h3>
              <p className="text-muted-foreground">
                Smart Legal Research with IRAC-formatted responses. Get comprehensive analysis with 
                jurisdiction-specific insights and confidence scoring.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  <span>IRAC Format Analysis</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  <span>Multi-jurisdiction Support</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  <span>Citation Generation</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-accent transition-all duration-300 hover:shadow-glow">
            <CardContent className="p-8 space-y-4">
              <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <FileText className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-2xl font-bold">INTERACT</h3>
              <p className="text-muted-foreground">
                Document Upload & Analysis with intelligent extraction. Summarize, extract clauses, 
                and perform comprehensive risk analysis instantly.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  <span>Smart Summarization</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  <span>Clause Extraction</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  <span>Risk Analysis</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-accent transition-all duration-300 hover:shadow-glow">
            <CardContent className="p-8 space-y-4">
              <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <FileEdit className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-2xl font-bold">DRAFT</h3>
              <p className="text-muted-foreground">
                Intelligent Document Generation with AI-powered assistance. Create professional legal 
                documents with customizable templates and smart suggestions.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  <span>Template Library</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  <span>Smart Editing Tools</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-accent" />
                  <span>Version Control</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="container py-20 bg-muted/30 rounded-3xl my-20">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold">How It Works</h2>
          <p className="text-xl text-muted-foreground">Three simple steps to transform your legal workflow</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <div className="mx-auto h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center border-2 border-accent">
              <span className="text-2xl font-bold text-accent">1</span>
            </div>
            <h3 className="text-xl font-bold">Upload or Ask</h3>
            <p className="text-muted-foreground">
              Input your legal query, upload documents, or select a document template to get started.
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="mx-auto h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center border-2 border-accent">
              <span className="text-2xl font-bold text-accent">2</span>
            </div>
            <h3 className="text-xl font-bold">AI Analysis</h3>
            <p className="text-muted-foreground">
              Our advanced AI processes your request with legal precision and contextual understanding.
            </p>
          </div>

          <div className="text-center space-y-4">
            <div className="mx-auto h-16 w-16 rounded-full bg-accent/10 flex items-center justify-center border-2 border-accent">
              <span className="text-2xl font-bold text-accent">3</span>
            </div>
            <h3 className="text-xl font-bold">Get Results</h3>
            <p className="text-muted-foreground">
              Receive comprehensive, actionable insights and professional documents ready to use.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="container py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Why Legal Professionals Trust LexiFlow
            </h2>
            <p className="text-xl text-muted-foreground">
              Built by legal experts and AI engineers to meet the demanding needs of modern law practices.
            </p>
            
            <div className="space-y-4">
              <div className="flex gap-4">
                <Shield className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Enterprise Security</h4>
                  <p className="text-muted-foreground text-sm">
                    Bank-level encryption and compliance with legal industry standards
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Zap className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Lightning Fast</h4>
                  <p className="text-muted-foreground text-sm">
                    Get comprehensive legal analysis in seconds, not hours
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Sparkles className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold mb-1">Continuously Learning</h4>
                  <p className="text-muted-foreground text-sm">
                    Our AI stays updated with the latest legal precedents and regulations
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Card className="p-8 bg-gradient-to-br from-accent/5 to-primary/5 border-2">
            <CardContent className="space-y-6 p-0">
              <div className="text-center space-y-2">
                <div className="text-5xl font-bold text-accent">95%</div>
                <p className="text-muted-foreground">Time Saved on Legal Research</p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div className="text-center">
                  <div className="text-2xl font-bold">10,000+</div>
                  <p className="text-sm text-muted-foreground">Documents Analyzed</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">500+</div>
                  <p className="text-sm text-muted-foreground">Law Firms Trust Us</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-20">
        <Card className="bg-gradient-to-r from-primary to-accent p-12 text-center text-white border-0 shadow-2xl">
          <CardContent className="space-y-6 p-0">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Ready to Transform Your Legal Practice?
            </h2>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Join hundreds of law firms already using LexiFlow to work smarter, faster, and more efficiently.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Link to="/auth">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="bg-white/10 border-white/20 hover:bg-white/20 text-white w-full sm:w-auto">
                Schedule a Demo
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="container py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Link to="/" className="flex items-center gap-2 font-bold text-xl">
                <Scale className="h-6 w-6 text-accent" />
                <span>LexiFlow</span>
              </Link>
              <p className="text-sm text-muted-foreground">
                Empowering Legal Intelligence with AI
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/#features" className="hover:text-foreground transition-colors">Features</Link></li>
                <li><Link to="/#how-it-works" className="hover:text-foreground transition-colors">How It Works</Link></li>
                <li><Link to="/#pricing" className="hover:text-foreground transition-colors">Pricing</Link></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/about" className="hover:text-foreground transition-colors">About</Link></li>
                <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
                <li><Link to="/careers" className="hover:text-foreground transition-colors">Careers</Link></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
                <li><Link to="/security" className="hover:text-foreground transition-colors">Security</Link></li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>© 2025 LexiFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
