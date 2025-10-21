import React from 'react'
import { Heart, Star, Sparkles } from 'lucide-react'
import { getTranslations } from '@/lib/translations'
import { defaultLocale } from '@/lib/i18n'

function Footer() {
    const t = getTranslations(defaultLocale)
    
    return (
        <footer className="bg-gradient-to-r from-orange-100 to-yellow-100 border-t border-orange-200">
            <div className="container mx-auto px-4 py-8">
                <div className="text-center space-y-4">
                    <div className="flex items-center justify-center gap-2">
                        <Heart className="h-5 w-5 text-orange-500" />
                        <h3 className="text-xl font-semibold text-orange-700">{t.compatibilityTest}</h3>
                        <Heart className="h-5 w-5 text-orange-500" />
                    </div>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        星の知恵、性格の洞察、古代の占いの伝統を通じて、魂の間の魔法を発見してください。
                    </p>
                    <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                            <Star className="h-4 w-4" />
                            <span>星座</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Sparkles className="h-4 w-4" />
                            <span>性格タイプ</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            <span>恋愛相性</span>
                        </div>
                    </div>
                    <div className="text-xs text-gray-400 pt-4 border-t border-orange-200">
                        © 2025 {t.compatibilityTest}. 完璧なマッチを見つけるために❤️で作られました。
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
