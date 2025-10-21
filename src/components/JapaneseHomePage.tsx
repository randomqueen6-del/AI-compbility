"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Heart,
  Sparkles,
  Star,
  Users,
  Zap,
  Shield,
  Award,
  ArrowRight,
  MessageCircle,
  Calendar,
  TrendingUp,
  ChevronRight
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0 }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 }
}

export default function JapaneseHomePage() {

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-orange-100 to-orange-200 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/img/banner.webp"
            alt="ソウルシンク背景"
            fill
            className="object-cover object-center opacity-20"
            priority
            quality={100}
          />
        </div>

        {/* Background Animation */}
        <div className="absolute inset-0">
          {/* Floating Hearts */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`heart-${i}`}
              className="absolute"
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 10 + i * 2,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              <Heart className="h-4 w-4 text-orange-200/30" />
            </motion.div>
          ))}

          {/* Floating Stars */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute"
              animate={{
                x: [0, -80, 0],
                y: [0, 120, 0],
                rotate: [0, -180, -360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 15 + i * 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              <Star className="h-3 w-3 text-yellow-300/40" />
            </motion.div>
          ))}

          {/* Floating Sparkles */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`sparkle-${i}`}
              className="absolute"
              animate={{
                x: [0, 60, 0],
                y: [0, -80, 0],
                rotate: [0, 360, 720],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 12 + i * 1.8,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            >
              <Sparkles className="h-5 w-5 text-pink-300/50" />
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.div variants={fadeInUp} className="flex items-center justify-center gap-4">
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="relative"
              >
                <Sparkles className="h-12 w-12 text-orange-500" />
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Sparkles className="h-12 w-12 text-orange-300" />
                </motion.div>
              </motion.div>

              <motion.h1
                variants={scaleIn}
                className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 bg-clip-text text-transparent relative"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                ソウルシンク
                <motion.div
                  className="absolute -top-2 -right-2"
                  animate={{
                    rotate: [0, 20, -20, 0],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Heart className="h-6 w-6 text-orange-500/70" />
                </motion.div>
              </motion.h1>

              <motion.div
                animate={{
                  rotate: [0, -360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="relative"
              >
                <Sparkles className="h-12 w-12 text-orange-500" />
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 0, 0.5],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5
                  }}
                >
                  <Sparkles className="h-12 w-12 text-orange-300" />
                </motion.div>
              </motion.div>
            </motion.div>

            <motion.p
              variants={fadeInUp}
              className="text-2xl md:text-3xl text-gray-700 font-light"
            >
              古代の知恵を通じて完璧なマッチを発見
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed"
            >
              占星術、性格タイプ、古代の占い方法を使用して相性の秘密を解き明かします。
              私たちのAI搭載プラットフォームは、伝統的な知恵と現代心理学を組み合わせて、お二人の人間関係について深い洞察を明らかにします。
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/test">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                    <Heart className="mr-2 h-5 w-5" />
                    テストを始める
                  </Button>
                </motion.div>
              </Link>

              <Link href="/about">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button variant="outline" size="lg" className="border-2 border-orange-300 text-orange-600 hover:bg-orange-50 px-8 py-4 text-lg font-semibold">
                    <Sparkles className="mr-2 h-5 w-5" />
                    詳しく見る
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
            >
              特徴
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              私たちの包括的なアプローチで、お二人の相性を発見してください
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              {
                icon: Star,
                title: "星座相性診断",
                description: "12星座の特性を基に、あなたとお相手の基本的な相性を分析します。",
                color: "from-orange-400 to-orange-500",
                bgPattern: "⭐",
                illustration: "🌟"
              },
              {
                icon: Users,
                title: "MBTI性格マッチング",
                description: "16の性格タイプを基に、深いレベルでの相性を詳しく分析します。",
                color: "from-orange-400 to-orange-600",
                bgPattern: "👥",
                illustration: "🧠"
              },
              {
                icon: Zap,
                title: "性格分析",
                description: "詳細な性格分析で、お二人の内面的な相性を明らかにします。",
                color: "from-orange-300 to-orange-500",
                bgPattern: "⚡",
                illustration: "💡"
              },
              {
                icon: Award,
                title: "詳細分析",
                description: "包括的な分析レポートで、お二人の関係性を深く理解できます。",
                color: "from-orange-500 to-orange-600",
                bgPattern: "🏆",
                illustration: "📊"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{
                  y: -10,
                  transition: { type: "spring", stiffness: 300 }
                }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-gray-50 relative overflow-hidden group">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5 text-6xl flex items-center justify-center group-hover:opacity-10 transition-opacity duration-300">
                    {feature.bgPattern}
                  </div>

                  <CardHeader className="text-center pb-4 relative z-10">
                    <motion.div
                      className={`w-20 h-20 mx-auto rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 shadow-xl relative`}
                      whileHover={{
                        scale: 1.1,
                        rotate: [0, -10, 10, 0],
                        transition: { duration: 0.5 }
                      }}
                    >
                      <feature.icon className="h-10 w-10 text-white" />

                      {/* Floating illustration */}
                      <motion.div
                        className="absolute -top-2 -right-2 text-2xl"
                        animate={{
                          y: [-5, 5, -5],
                          rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        {feature.illustration}
                      </motion.div>

                      {/* Pulse effect */}
                      <motion.div
                        className={`absolute inset-0 rounded-full bg-gradient-to-r ${feature.color} opacity-30`}
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.3, 0, 0.3],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.div>

                    <CardTitle className="text-xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="relative z-10">
                    <CardDescription className="text-gray-600 text-center leading-relaxed group-hover:text-gray-700 transition-colors">
                      {feature.description}
                    </CardDescription>
                  </CardContent>

                  {/* Hover effect border */}
                  <motion.div
                    className={`absolute inset-0 rounded-lg bg-gradient-to-r ${feature.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                  />
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-100 to-orange-200 relative overflow-hidden">
        {/* Background Illustrations */}
        <div className="absolute inset-0">
          {/* Large decorative hearts */}
          <motion.div
            className="absolute top-10 left-10 text-orange-200/30 text-8xl"
            animate={{
              rotate: [0, 15, -15, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            💝
          </motion.div>

          <motion.div
            className="absolute top-20 right-20 text-orange-200/30 text-6xl"
            animate={{
              y: [-10, 10, -10],
              rotate: [0, -10, 10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            💕
          </motion.div>

          <motion.div
            className="absolute bottom-10 left-20 text-orange-200/30 text-7xl"
            animate={{
              x: [-5, 5, -5],
              rotate: [0, 20, -20, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            ✨
          </motion.div>

          <motion.div
            className="absolute bottom-20 right-10 text-orange-200/30 text-5xl"
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            🌟
          </motion.div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-3xl mx-auto"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold text-gray-800 mb-6"
            >
              今すぐ運命の人を見つけましょう
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-gray-600 mb-8"
            >
              数分で完了する楽しいテストで、完璧なマッチを発見してください
            </motion.p>
            <motion.div variants={fadeInUp}>
              <Link href="/test">
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    y: -2,
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group"
                >
                  <Button size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-12 py-6 text-xl font-bold shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                    {/* Button background animation */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-500"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "0%" }}
                      transition={{ duration: 0.3 }}
                    />

                    <span className="relative z-10 flex items-center">
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <Heart className="mr-3 h-6 w-6" />
                      </motion.div>
                      テストを始める
                      <motion.div
                        animate={{
                          x: [0, 5, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <ArrowRight className="ml-3 h-6 w-6" />
                      </motion.div>
                    </span>

                    {/* Sparkle effects on hover */}
                    <motion.div
                      className="absolute top-1 right-1 text-yellow-300"
                      animate={{
                        rotate: [0, 360],
                        scale: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      ✨
                    </motion.div>
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
