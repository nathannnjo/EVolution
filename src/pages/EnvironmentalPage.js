import React, { useState, useEffect } from "react";
import { fetchEVNews } from "../newsService";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Leaf,
  Globe,
  Zap,
  Factory,
  Wind,
  Recycle,
  TrendingDown,
  Calendar,
  ExternalLink,
  RefreshCw,
  Sparkles,
  TreePine,
  Droplets,
  Sun,
} from "lucide-react";
import { motion } from "framer-motion";

export default function EnvironmentalPage() {
  const [news, setNews] = useState([]);
  const [isLoadingNews, setIsLoadingNews] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  const impactStats = {
    co2Reduced: 1.8,
    gallonsSaved: 252,
    treesEquivalent: 75,
    cleanAirDays: 72,
  };

  const environmentalBenefits = [
    {
      icon: TrendingDown,
      title: "Zero Direct Emissions",
      description:
        "EVs produce no tailpipe emissions, directly improving local air quality and reducing urban pollution.",
      color: "from-green-500 to-green-600",
      bgColor: "from-green-50 to-green-100",
      borderColor: "border-green-200",
    },
    {
      icon: Factory,
      title: "Lower Lifecycle Emissions",
      description:
        "Even accounting for manufacturing and electricity generation, EVs typically produce 50-70% fewer emissions than gas cars.",
      color: "from-blue-500 to-blue-600",
      bgColor: "from-blue-50 to-blue-100",
      borderColor: "border-blue-200",
    },
    {
      icon: Wind,
      title: "Renewable Energy Ready",
      description:
        "As the electrical grid becomes cleaner with more renewables, EVs automatically become even more environmentally friendly.",
      color: "from-cyan-500 to-cyan-600",
      bgColor: "from-cyan-50 to-cyan-100",
      borderColor: "border-cyan-200",
    },
    {
      icon: Recycle,
      title: "Battery Recycling",
      description:
        "EV batteries can be recycled and repurposed for energy storage, creating a circular economy for critical materials.",
      color: "from-purple-500 to-purple-600",
      bgColor: "from-purple-50 to-purple-100",
      borderColor: "border-purple-200",
    },
    {
      icon: Droplets,
      title: "Reduced Water Pollution",
      description:
        "EVs eliminate the risk of oil spills and reduce water contamination from gas stations and oil refineries.",
      color: "from-teal-500 to-teal-600",
      bgColor: "from-teal-50 to-teal-100",
      borderColor: "border-teal-200",
    },
    {
      icon: Sun,
      title: "Energy Efficiency",
      description:
        "Electric motors are 3-4x more efficient than combustion engines, converting 85-90% of energy into motion vs. 25-30%.",
      color: "from-amber-500 to-amber-600",
      bgColor: "from-amber-50 to-amber-100",
      borderColor: "border-amber-200",
    },
  ];

  // Mock news data
  const mockNews = [
    {
      id: 1,
      title: "Tesla Supercharger Network Reaches 50,000 Global Stations",
      summary:
        "Tesla announces major milestone in charging infrastructure, making EV adoption more accessible worldwide.",
      source: "Clean Technica",
      publishedAt: "2024-09-01T10:00:00Z",
      url: "#",
      category: "Infrastructure",
    },
    {
      id: 2,
      title: "Study: EVs Already Cleaner Than Gas Cars in 95% of the World",
      summary:
        "New research shows electric vehicles produce fewer emissions than gasoline cars even in regions with coal-heavy grids.",
      source: "Carbon Brief",
      publishedAt: "2024-08-28T14:30:00Z",
      url: "#",
      category: "Research",
    },
    {
      id: 3,
      title: "Major Automakers Pledge 100% Electric by 2035",
      summary:
        "Coalition of 12 major automotive companies commits to phasing out internal combustion engines within the next decade.",
      source: "Reuters",
      publishedAt: "2024-08-25T09:15:00Z",
      url: "#",
      category: "Industry",
    },
    {
      id: 4,
      title: "Breakthrough in Solid-State Batteries Promises 1000-Mile Range",
      summary:
        "Scientists develop new battery technology that could revolutionize EV adoption with ultra-fast charging and extended range.",
      source: "Nature Energy",
      publishedAt: "2024-08-22T16:45:00Z",
      url: "#",
      category: "Technology",
    },
    {
      id: 5,
      title: "California's EV Sales Surpass 25% of New Car Sales",
      summary:
        "Golden State leads the way as electric vehicle adoption accelerates beyond all projections.",
      source: "Green Car Reports",
      publishedAt: "2024-08-20T11:20:00Z",
      url: "#",
      category: "Market",
    },
  ];

  useEffect(() => {
    const loadNews = async () => {
      setIsLoadingNews(true);
      try {
        const articles = await fetchEVNews();
        setNews(articles);
        setLastUpdated(new Date());
      } catch (error) {
        console.error("Failed to load news:", error);
        // Fallback to mock data if API fails
        setNews(mockNews);
      }
      setIsLoadingNews(false);
    };

    loadNews();
  }, []);

  const refreshNews = async () => {
    setIsLoadingNews(true);
    try {
      const articles = await fetchEVNews();
      setNews(articles);
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Failed to refresh news:", error);
      // Keep existing news if refresh fails
    }
    setIsLoadingNews(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      Infrastructure: "bg-blue-100 text-blue-800",
      Research: "bg-green-100 text-green-800",
      Industry: "bg-purple-100 text-purple-800",
      Technology: "bg-orange-100 text-orange-800",
      Market: "bg-cyan-100 text-cyan-800",
    };
    return colors[category] || "bg-slate-100 text-slate-800";
  };

  return (
    <div
      className="min-h-screen p-4 md:p-8"
      style={{
        background:
          "linear-gradient(135deg, rgb(248, 250, 252) 0%, rgb(236, 253, 245) 50%, rgb(220, 252, 231) 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-800">
              Environmental Impact
            </h1>
          </div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Discover how electric vehicles are transforming our planet for the
            better, one mile at a time.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-2 border-0 shadow-xl bg-gradient-to-r from-green-500 to-green-500 text-white overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-6 h-6" />
                <h2 className="text-2xl font-bold">
                  Your Environmental Impact
                </h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">
                    {impactStats.co2Reduced}
                  </div>
                  <div className="text-sm opacity-90">Tons CO₂ Avoided</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">
                    {impactStats.gallonsSaved}
                  </div>
                  <div className="text-sm opacity-90">Gallons Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">
                    {impactStats.treesEquivalent}
                  </div>
                  <div className="text-sm opacity-90">Trees Equivalent</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">
                    {impactStats.cleanAirDays}
                  </div>
                  <div className="text-sm opacity-90">Clean Air Days</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3">
            <TreePine className="w-6 h-6 text-green-600" />
            <h2 className="text-2xl font-bold text-slate-800">
              Environmental Benefits of EVs
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {environmentalBenefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="h-full"
              >
                <Card
                  className={`h-full flex flex-col p-3 border-0 shadow-lg bg-white/90 backdrop-blur-sm hover:shadow-xl hover:scale-[1.02] transition-all duration-300 ${benefit.borderColor} border`}
                >
                  <CardContent className="p-6 flex flex-col flex-1">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br ${benefit.color} rounded-xl flex items-center justify-center mb-4 shadow-sm`}
                    >
                      <benefit.icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed flex-1">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="space-y-6"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Zap className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-slate-800">
                Latest EV Environmental News
              </h2>
            </div>
            <div className="flex items-center gap-3">
              {lastUpdated && (
                <span className="text-sm text-slate-600">
                  Updated {lastUpdated.toLocaleTimeString()}
                </span>
              )}
              <Button
                onClick={refreshNews}
                disabled={isLoadingNews}
                size="sm"
                className="bg-blue-500 hover:bg-blue-600"
              >
                <RefreshCw
                  className={`w-4 h-4 mr-2 ${
                    isLoadingNews ? "animate-spin" : ""
                  }`}
                />
                Refresh
              </Button>
            </div>
          </div>

          {isLoadingNews ? (
            <div className="grid gap-6">
              {Array(3)
                .fill(0)
                .map((_, i) => (
                  <Card
                    key={i}
                    className="border-0 shadow-lg bg-white/80 backdrop-blur-sm"
                  >
                    <CardContent className="p-6">
                      <div className="animate-pulse space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-16 h-6 bg-slate-200 rounded"></div>
                          <div className="w-24 h-4 bg-slate-200 rounded"></div>
                        </div>
                        <div className="w-3/4 h-6 bg-slate-200 rounded"></div>
                        <div className="w-full h-4 bg-slate-200 rounded"></div>
                        <div className="w-2/3 h-4 bg-slate-200 rounded"></div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          ) : (
            <div className="grid gap-6">
              {news.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Card className="p-3 border-0 shadow-lg bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 group cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                        <div className="flex-1 space-y-3">
                          <div className="flex items-center gap-3 flex-wrap">
                            <Badge
                              className={`text-xs ${getCategoryColor(
                                article.category
                              )}`}
                            >
                              {article.category}
                            </Badge>
                            <div className="flex items-center gap-1 text-sm text-slate-500">
                              <Calendar className="w-3 h-3" />
                              {formatDate(article.publishedAt)}
                            </div>
                            <span className="text-sm text-slate-500">•</span>
                            <span className="text-sm text-slate-500">
                              {article.source}
                            </span>
                          </div>

                          <h3 className="text-lg font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                            {article.title}
                          </h3>

                          <p className="text-slate-600 leading-relaxed">
                            {article.summary}
                          </p>
                        </div>

                        <div className="flex-shrink-0">
                          <Button
                            size="sm"
                            variant="outline"
                            className="group-hover:bg-blue-50 group-hover:border-blue-300 transition-colors"
                          >
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Read More
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {!isLoadingNews && news.length === 0 && (
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="pt-16 pb-12 text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Globe className="w-10 h-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  No News Available
                </h3>
                <p className="text-slate-600 mb-6">
                  Unable to load the latest environmental news at this time.
                </p>
                <Button
                  onClick={refreshNews}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
              </CardContent>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
}
