import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, FileText, FileEdit, ArrowRight, Sparkles, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const DashboardNormal = () => {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-8 animate-fade-in">
        {/* Welcome Section - Warm & Friendly */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Heart className="h-7 w-7 text-accent animate-pulse" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Welcome Back!
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">Let's make legal work simple and delightful today ✨</p>
        </div>

        {/* Simple Stats - Visual & Friendly */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-2 border-accent/20 bg-gradient-to-br from-background to-accent/5">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                  <Search className="h-7 w-7 text-accent" />
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold">127</div>
                  <p className="text-xs text-muted-foreground">Total Searches</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-accent">🎉 Great progress!</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-accent/20 bg-gradient-to-br from-background to-accent/5">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                  <FileText className="h-7 w-7 text-accent" />
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold">89</div>
                  <p className="text-xs text-muted-foreground">Documents</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-accent">📄 You're on fire!</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-accent/20 bg-gradient-to-br from-background to-accent/5">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
                  <FileEdit className="h-7 w-7 text-accent" />
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold">45</div>
                  <p className="text-xs text-muted-foreground">Drafts</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-accent">✨ Amazing work!</p>
            </CardContent>
          </Card>
        </div>

        {/* What would you like to do? - Playful Cards */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-accent" />
            What would you like to do?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link to="/dashboard/ask" className="group">
              <Card className="hover:scale-105 hover:border-accent transition-all duration-300 hover:shadow-2xl cursor-pointer h-full border-2">
                <CardHeader className="text-center space-y-4">
                  <div className="mx-auto h-20 w-20 rounded-3xl bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Search className="h-10 w-10 text-accent" />
                  </div>
                  <div className="space-y-2">
                    <CardTitle className="text-xl">Ask Questions</CardTitle>
                    <CardDescription className="text-base">
                      Get simple answers to your legal questions in plain language
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="w-full justify-between group-hover:bg-accent/10">
                    Let's Go!
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link to="/dashboard/interact" className="group">
              <Card className="hover:scale-105 hover:border-accent transition-all duration-300 hover:shadow-2xl cursor-pointer h-full border-2">
                <CardHeader className="text-center space-y-4">
                  <div className="mx-auto h-20 w-20 rounded-3xl bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileText className="h-10 w-10 text-accent" />
                  </div>
                  <div className="space-y-2">
                    <CardTitle className="text-xl">Upload Document</CardTitle>
                    <CardDescription className="text-base">
                      We'll read it and explain what it means to you
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="w-full justify-between group-hover:bg-accent/10">
                    Upload Now
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </Link>

            <Link to="/dashboard/draft" className="group">
              <Card className="hover:scale-105 hover:border-accent transition-all duration-300 hover:shadow-2xl cursor-pointer h-full border-2">
                <CardHeader className="text-center space-y-4">
                  <div className="mx-auto h-20 w-20 rounded-3xl bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileEdit className="h-10 w-10 text-accent" />
                  </div>
                  <div className="space-y-2">
                    <CardTitle className="text-xl">Create Document</CardTitle>
                    <CardDescription className="text-base">
                      Tell us what you need and we'll draft it for you
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="w-full justify-between group-hover:bg-accent/10">
                    Start Creating
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Recent Activity - Simple & Clear */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">Your Recent Work</h2>
          <div className="space-y-3">
            {[
              {
                title: "✅ Contract Analysis Done",
                subtitle: "We checked your NDA and it looks good!",
                time: "2 hours ago"
              },
              {
                title: "🔍 Research Complete",
                subtitle: "Found answers about California employment law",
                time: "5 hours ago"
              },
              {
                title: "📝 Draft Ready",
                subtitle: "Your service agreement is ready to review",
                time: "1 day ago"
              }
            ].map((activity, index) => (
              <Card key={index} className="hover:border-accent/50 transition-all cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="font-medium text-lg">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">{activity.subtitle}</p>
                    </div>
                    <p className="text-sm text-muted-foreground whitespace-nowrap ml-4">{activity.time}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardNormal;
