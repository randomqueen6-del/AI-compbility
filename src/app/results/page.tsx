"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PersonData, CompatibilityResult } from "@/types/compatibility";
import { Heart, Share2, ArrowLeft, CheckCircle, AlertTriangle, Instagram, Twitter, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function ResultsPage() {
  const router = useRouter();
  const [result, setResult] = useState<CompatibilityResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const hasAnalyzed = useRef(false);

  // Individual items mapping for display
  const individualItemsLabels = {
    zodiacCompatibility: "星座相性",
    bloodTypeCompatibility: "血液型相性", 
    mbtiCompatibility: "MBTI相性",
    enneagramCompatibility: "エニアグラム相性",
    animalHoroscopeCompatibility: "干支相性",
    kuseiKigakuCompatibility: "九星気学相性"
  };

  // Floating hearts animation data
  const floatingHearts = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    delay: i * 0.5,
    duration: 3 + i * 0.5,
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));

  useEffect(() => {
    if (hasAnalyzed.current) return;
    
    const data = localStorage.getItem("compatibilityData");
    if (!data) {
      router.push("/test");
      return;
    }

    try {
      const parsedData = JSON.parse(data);
      hasAnalyzed.current = true;
      
      const analyzeCompatibility = async () => {
        try {
          const response = await fetch('/api/ai', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              personA: parsedData.person1,
              personB: parsedData.person2
            })
          });

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to analyze compatibility');
          }

          const result = await response.json();
          setResult(result);
        } catch (error:any) {
          console.error("Error analyzing compatibility:", error);
          setError(error.message || '相性分析に失敗しました');
        } finally {
          setLoading(false);
        }
      };

      analyzeCompatibility();
    } catch (error) {
      console.error("Error parsing compatibility data:", error);
      router.push("/test");
    }
  }, [router]);

  const handleShare = (platform: string) => {
    if (!result) return;
    
    const shareText = `私たちの相性は${result.compatibility.percentage}%でした！ #相性診断 #ソウルシンク`;
    const shareUrl = window.location.href;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`);
        break;
      case 'instagram':
        navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
        alert('Instagramでシェアするためにテキストをコピーしました！');
        break;
      default:
        navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
        alert('シェア用テキストをコピーしました！');
    }
  };

  const getCompatibilityColor = (percentage: number) => {
    if (percentage >= 80) return "from-green-400 to-emerald-500";
    if (percentage >= 60) return "from-orange-400 to-orange-500";
    if (percentage >= 40) return "from-yellow-400 to-orange-500";
    return "from-red-400 to-orange-500";
  };

  const getCompatibilityMessage = (percentage: number) => {
    if (percentage >= 80) return "素晴らしい相性です！";
    if (percentage >= 60) return "良い相性です！";
    if (percentage >= 40) return "まずまずの相性です";
    return "努力が必要な相性です";
  };

  const getPercentageColor = (percentage: number) => {
    if (percentage >= 80) return 'text-green-600';
    if (percentage >= 60) return 'text-orange-600';
    return 'text-red-600';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="mb-6"
          >
            <Heart className="h-16 w-16 text-orange-500 mx-auto" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">相性を分析中...</h2>
          <p className="text-gray-600">星の配置と性格を読み取っています</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200">
        <div className="text-center">
          <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">エラーが発生しました</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Button onClick={() => router.push("/test")} className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <ArrowLeft className="mr-2 h-4 w-4" />
            テストに戻る
          </Button>
        </div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">結果が見つかりません</h2>
          <Button onClick={() => router.push("/test")} className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <ArrowLeft className="mr-2 h-4 w-4" />
            テストに戻る
          </Button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 relative overflow-hidden"
    >
      {/* Floating Hearts Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {floatingHearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute opacity-20"
            style={{
              left: `${heart.x}%`,
              top: `${heart.y}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              rotate: [0, 180, 360],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: heart.duration,
              delay: heart.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Heart className="h-8 w-8 text-orange-400" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 max-w-4xl mx-auto py-8 px-4">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-12 w-12 text-orange-500" />
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 bg-clip-text text-transparent">
              相性診断結果
            </h1>
            <motion.div
              animate={{ rotate: [0, -360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Heart className="h-12 w-12 text-orange-500" />
            </motion.div>
          </div>
        </motion.div>

        {/* Compatibility Score */}
        {result.compatibility.percentage && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8"
          >
            <Card className="border-0 shadow-2xl bg-gradient-to-br from-white to-gray-50">
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-3xl font-bold text-gray-800 mb-2">
                  {result.personA.nickname} × {result.personB.nickname}
                </CardTitle>
                <div className="relative">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1, delay: 0.6, type: "spring" }}
                    className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-r ${getCompatibilityColor(result.compatibility.percentage)} flex items-center justify-center shadow-lg`}
                  >
                    <span className="text-4xl font-bold text-white">
                      {result.compatibility.percentage}%
                    </span>
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="text-xl font-semibold text-gray-700 mt-4"
                  >
                    {getCompatibilityMessage(result.compatibility.percentage)}
                  </motion.p>
                </div>
              </CardHeader>
            </Card>
          </motion.div>
        )}

        {/* Individual Items Evaluation */}
        {result.compatibility.individualItems && Object.keys(result.compatibility.individualItems).length > 0 && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-8"
          >
            <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-50 to-indigo-100">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Sparkles className="h-6 w-6 text-purple-500" />
                  項目別相性
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(result.compatibility.individualItems)
                    .filter(([_, value]) => value !== undefined && value !== null)
                    .map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                        <span className="font-medium text-gray-700">
                          {individualItemsLabels[key as keyof typeof individualItemsLabels] || key}
                        </span>
                        <span className={`font-bold ${getPercentageColor(value)}`}>
                          {value}%
                        </span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Overall Review */}
        {result.compatibility.overallReview && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-8"
          >
            <Card className="border-0 shadow-xl bg-gradient-to-br from-orange-50 to-orange-100">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Heart className="h-6 w-6 text-orange-500" />
                  総合評価
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {result.compatibility.overallReview}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Good Points and Caution Points */}
        {(result.compatibility.goodPoints?.length > 0 || result.compatibility.cautionPoints?.length > 0) && (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Good Points */}
            {result.compatibility.goodPoints?.length > 0 && (
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <Card className="border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50 h-full">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      良い点
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {result.compatibility.goodPoints.map((point, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                          className="flex items-start gap-2 text-gray-700"
                        >
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{point}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Caution Points */}
            {result.compatibility.cautionPoints?.length > 0 && (
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.4 }}
              >
                <Card className="border-0 shadow-xl bg-gradient-to-br from-yellow-50 to-orange-50 h-full">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
                      <AlertTriangle className="h-5 w-5 text-orange-500" />
                      注意点
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {result.compatibility.cautionPoints.map((point, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                          className="flex items-start gap-2 text-gray-700"
                        >
                          <AlertTriangle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                          <span>{point}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            onClick={() => router.push("/test")}
            variant="outline"
            size="lg"
            className="border-2 border-orange-300 text-orange-600 hover:bg-orange-50 px-8 py-3"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            もう一度テストする
          </Button>

          {result.compatibility.percentage && (
            <div className="flex gap-2">
              <Button
                onClick={() => handleShare('twitter')}
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3"
              >
                <Twitter className="mr-2 h-5 w-5" />
                Twitter
              </Button>
              <Button
                onClick={() => handleShare('instagram')}
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-6 py-3"
              >
                <Instagram className="mr-2 h-5 w-5" />
                Instagram
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}