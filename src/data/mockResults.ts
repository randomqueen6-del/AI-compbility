import { CompatibilityResult, PersonData } from '@/types/compatibility';

export const getMockCompatibilityResult = (personA: PersonData, personB: PersonData): CompatibilityResult => {
  const compatibilityPercentage = Math.floor(Math.random() * 30) + 70; // Random between 70-99%
  
  // Generate individual compatibility scores
  const generateIndividualScore = () => Math.floor(Math.random() * 30) + 65;
  
  return {
    personA: {
      nickname: personA.nickname,
      description: `${personA.nickname}さんは心温かく創造的な人で、どんな状況にも喜びをもたらします。他者とのつながりを築く天性の能力を持ち、本当に感染力のある楽観的な見通しを持っています。共感的な性格により、素晴らしい友人やパートナーとなり、いつでも手助けや話を聞く準備ができています。`
    },
    personB: {
      nickname: personB.nickname,
      description: `${personB.nickname}さんは冒険心があり思慮深い人で、素晴らしいユーモアのセンスを持っています。人生に対してユニークな視点を持ち、新しい挑戦を恐れません。人間関係に対するバランスの取れたアプローチと他者への真の思いやりにより、困難な時でもいつでも頼りにできる人です。`
    },
    compatibility: {
      percentage: compatibilityPercentage,
      individualItems: {
        zodiacCompatibility: personA.zodiacSign && personB.zodiacSign ? generateIndividualScore() : undefined,
        bloodTypeCompatibility: personA.bloodType && personB.bloodType ? generateIndividualScore() : undefined,
        mbtiCompatibility: personA.mbti && personB.mbti ? generateIndividualScore() : undefined,
        enneagramCompatibility: personA.enneagram && personB.enneagram ? generateIndividualScore() : undefined,
        animalHoroscopeCompatibility: personA.animalHoroscope && personB.animalHoroscope ? generateIndividualScore() : undefined,
        kuseiKigakuCompatibility: personA.kuseiKigaku && personB.kuseiKigaku ? generateIndividualScore() : undefined,
      },
      goodPoints: [
        "お二人とも意味のある会話と真のつながりを深く大切にしています",
        "お互いの補完的な性格が関係に完璧なバランスを生み出しています",
        "お二人とも忠誠心と信頼を重視し、絆の強固な基盤を築いています",
        "お互いに成長し、より良い自分になるよう刺激し合っています",
        "共通のユーモアのセンスが関係を軽やかで楽しいものにしています",
        "お二人とも家族や友人を大切にする価値観を共有しています"
      ],
      cautionPoints: [
        "時々、お互いの違いを理解するのに時間がかかることがあります",
        "コミュニケーションスタイルの違いに注意が必要です",
        "お互いの個人的な時間を尊重することが大切です",
        "意見の相違があった時は、冷静に話し合うことを心がけましょう",
        "お互いの成長ペースの違いを受け入れることが重要です"
      ],
      overallReview: compatibilityPercentage >= 85 
        ? `${personA.nickname}さんと${personB.nickname}さんの相性は非常に素晴らしいです！お二人は深いレベルで理解し合い、お互いを支え合う理想的なパートナーシップを築くことができます。星座や性格タイプの分析から、長期的な関係において非常に良い相性を示しています。お互いの違いを尊重し合いながら、共通の目標に向かって歩んでいくことで、さらに強い絆を築くことができるでしょう。`
        : compatibilityPercentage >= 75
        ? `${personA.nickname}さんと${personB.nickname}さんは良い相性を持っています。お互いの性格や価値観に共通点が多く、理解し合える関係を築くことができます。時々意見の違いがあるかもしれませんが、それがお互いの成長につながる良い刺激となるでしょう。コミュニケーションを大切にし、お互いを尊重することで、より深い関係を築いていくことができます。`
        : `${personA.nickname}さんと${personB.nickname}さんの関係には成長の余地があります。お互いの違いを理解し、受け入れることで、より良い関係を築くことができるでしょう。異なる視点や価値観を持つことは、お互いにとって学びの機会となります。忍耐強くコミュニケーションを取り、お互いの良い面を見つけることに焦点を当てることで、素晴らしいパートナーシップを築くことができます。`
    }
  };
};
