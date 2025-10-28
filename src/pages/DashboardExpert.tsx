import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, FileText, FileEdit, ArrowRight, TrendingUp, Clock, FileCheck, BarChart3, Brain, Settings2 } from "lucide-react";
import { Link } from "react-router-dom";

const DashboardExpert = () => {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6 animate-fade-in">
        {/* Welcome Section */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-accent" />
            <h1 className="text-3xl font-bold">Expert Dashboard</h1>
          </div>
          <p className="text-muted-foreground">Advanced analytics and comprehensive control at your fingertips.</p>
        </div>

        {/* Advanced Stats Grid */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="border-accent/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Researches</CardTitle>
              <Search className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">127</div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 text-accent" />
                <span>+12% vs last period</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-accent/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Documents Analyzed</CardTitle>
              <FileText className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 text-accent" />
                <span>+18% vs last period</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-accent/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Drafts Created</CardTitle>
              <FileEdit className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">45</div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 text-accent" />
                <span>+8% vs last period</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-accent/20">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Avg. Confidence</CardTitle>
              <BarChart3 className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">94.2%</div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 text-accent" />
                <span>+2.1% accuracy gain</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Advanced Tools */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Settings2 className="h-5 w-5 text-accent" />
            Advanced Tools
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link to="/dashboard/ask">
              <Card className="hover:border-accent transition-all hover:shadow-glow cursor-pointer h-full">
                <CardHeader>
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center mb-2">
                    <Search className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle>Smart Analyzer</CardTitle>
                  <CardDescription>Deep legal research with IRAC analysis, case law citations, and jurisdiction filtering</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="w-full justify-between group">
                    Launch Analyzer
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link to="/dashboard/interact">
              <Card className="hover:border-accent transition-all hover:shadow-glow cursor-pointer h-full">
                <CardHeader>
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center mb-2">
                    <FileText className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle>Document Intelligence</CardTitle>
                  <CardDescription>Advanced extraction, clause detection, risk analysis, and compliance checking</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="w-full justify-between group">
                    Analyze Documents
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link to="/dashboard/draft">
              <Card className="hover:border-accent transition-all hover:shadow-glow cursor-pointer h-full">
                <CardHeader>
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center mb-2">
                    <FileEdit className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle>Precision Drafting</CardTitle>
                  <CardDescription>AI-powered document creation with version control, collaboration, and custom templates</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="w-full justify-between group">
                    Create Document
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Detailed Activity Log */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Detailed Activity Log</h2>
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {[
                  {
                    icon: FileCheck,
                    title: "Contract Analysis Completed",
                    subtitle: "NDA - Tech Startup Inc. • 47 clauses analyzed • 3 risks identified",
                    time: "2 hours ago",
                    badge: "High Priority"
                  },
                  {
                    icon: Search,
                    title: "Research Query Completed",
                    subtitle: "Employment law - California jurisdiction • 23 cases reviewed • 94% confidence",
                    time: "5 hours ago",
                    badge: "Complete"
                  },
                  {
                    icon: FileEdit,
                    title: "Draft Generated",
                    subtitle: "Service Agreement - ABC Corp • v2.3 • 8 pages • Ready for review",
                    time: "1 day ago",
                    badge: "Ready"
                  }
                ].map((activity, index) => (
                  <div key={index} className="p-4 flex items-center gap-4 hover:bg-muted/30 transition-colors cursor-pointer group">
                    <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                      <activity.icon className="h-5 w-5 text-accent" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{activity.title}</p>
                      <p className="text-sm text-muted-foreground truncate">{activity.subtitle}</p>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="px-2 py-1 rounded-md bg-accent/10 text-accent text-xs font-medium">
                        {activity.badge}
                      </span>
                      <div className="flex items-center gap-1 text-muted-foreground whitespace-nowrap">
                        <Clock className="h-4 w-4" />
                        {activity.time}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardExpert;
