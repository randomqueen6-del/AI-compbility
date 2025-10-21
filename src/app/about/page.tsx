"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Users, Sparkles, Camera, Info, ArrowRight, Star, Zap } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutPage() {
  
  // Floating icons animation data
  const floatingIcons = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    delay: i * 0.3,
    duration: 4 + i * 0.2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    icon: [Heart, Star, Sparkles, Zap][i % 4],
  }));

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto space-y-8 relative py-8"
    >
      {/* Floating Icons Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {floatingIcons.map((item) => {
          const IconComponent = item.icon;
          return (
            <motion.div
              key={item.id}
              className="absolute opacity-10"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                rotate: [0, 180, 360],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: item.duration,
                delay: item.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <IconComponent className="h-8 w-8 text-orange-400" />
            </motion.div>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Heart className="h-12 w-12 text-orange-500" />
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 bg-clip-text text-transparent">
              ソウルシンク
            </h1>
            <motion.div
              animate={{ rotate: [0, -360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-12 w-12 text-orange-500" />
            </motion.div>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            最高の相性診断アプリで、あなたの理想のパートナーを見つけませんか？星座、血液型、MBTIなど、様々な要素を組み合わせて、深い相性を分析します。
          </p>
        </motion.div>

        {/* Mission Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Card className="mb-8 border-0 shadow-xl bg-gradient-to-br from-orange-50 to-orange-100">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center mb-4 shadow-lg">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800">
                私たちのミッション
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 text-center text-lg leading-relaxed">
                私たちは、科学的なアプローチと伝統的な占いの知恵を組み合わせて、人々が深く意味のあるつながりを見つけるお手伝いをしています。
              </CardDescription>
            </CardContent>
          </Card>
        </motion.div>

        {/* How It Works Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <Card className="mb-8 border-0 shadow-xl bg-gradient-to-br from-orange-50 to-orange-100">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center mb-4 shadow-lg">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-bold text-gray-800">
                仕組み
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 text-center text-lg leading-relaxed">
                簡単な質問に答えるだけで、高度なアルゴリズムがあなたの性格と相性を分析し、パーソナライズされた結果をお届けします。
              </CardDescription>
            </CardContent>
          </Card>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid md:grid-cols-2 gap-6 mb-12"
        >
          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-orange-50 to-orange-100">
            <CardHeader className="text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-r from-orange-400 to-orange-500 flex items-center justify-center mb-3">
                <Star className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-800">
                星座相性診断
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 text-center">
                12星座の特性を基に、あなたとお相手の基本的な相性を分析します。
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-orange-50 to-orange-100">
            <CardHeader className="text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-gradient-to-r from-orange-400 to-orange-500 flex items-center justify-center mb-3">
                <Users className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-800">
                MBTI性格マッチング
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-600 text-center">
                16の性格タイプを基に、深いレベルでの相性を詳しく分析します。
              </CardDescription>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-center bg-gradient-to-r from-orange-100 to-orange-200 rounded-2xl p-8"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            お二人の相性を今すぐ発見しましょう！
          </h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            数分で完了する楽しいテストで、完璧なマッチを見つけてください。
          </p>
          <Link href="/test">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                <Heart className="mr-2 h-5 w-5" />
                テストを始める
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
