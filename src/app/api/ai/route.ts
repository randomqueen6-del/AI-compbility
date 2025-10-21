import { OpenAI } from 'openai';
import { NextRequest, NextResponse } from 'next/server';
import { PersonData, CompatibilityResult } from '@/types/compatibility';

// Singleton OpenAI instance to avoid recreating connections
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

// Japanese blood type compatibility matrix (based on ketsuekigata beliefs)
const BLOOD_TYPE_COMPATIBILITY = {
  'A': { 'A': 88, 'B': 45, 'AB': 78, 'O': 82 },
  'B': { 'A': 45, 'B': 85, 'AB': 80, 'O': 88 },
  'AB': { 'A': 78, 'B': 80, 'AB': 92, 'O': 75 },
  'O': { 'A': 82, 'B': 88, 'AB': 75, 'O': 90 }
};

// Enhanced zodiac compatibility matrix
const ZODIAC_COMPATIBILITY: {
  [key: string]: { [key: string]: number }
} = {
  '牡羊座': { '牡羊座': 85, '牡牛座': 60, '双子座': 80, '蟹座': 65, '獅子座': 90, '乙女座': 70, '天秤座': 85, '蠍座': 75, '射手座': 95, '山羊座': 70, '水瓶座': 88, '魚座': 75 },
  '牡牛座': { '牡羊座': 60, '牡牛座': 88, '双子座': 65, '蟹座': 85, '獅子座': 70, '乙女座': 92, '天秤座': 75, '蠍座': 80, '射手座': 65, '山羊座': 90, '水瓶座': 70, '魚座': 85 },
  // Add more zodiac combinations as needed...
};

// Enhanced system prompt for logical compatibility analysis
const SYSTEM_PROMPT = `あなたは心理学とデータ分析に精通した相性分析の専門家です。統計学的手法と行動心理学の理論に基づいて、客観的で論理的な分析を行ってください。

【必須JSON形式】
{
  "compatibilityPercentage": [40.0-99.9の小数点1桁],
  "personAAnalysis": "[性格の深層分析・行動パターン・恋愛傾向・価値観・コミュニケーションスタイル・ストレス反応・成長の可能性を含む詳細な人物像 400-600文字]",
  "personBAnalysis": "[性格の深層分析・行動パターン・恋愛傾向・価値観・コミュニケーションスタイル・ストレス反応・成長の可能性を含む詳細な人物像 400-600文字]", 
  "goodPoints": ["相性の良い点を詳細に説明。具体的なシチュエーション、心理的な結びつき、お互いの成長への影響、日常生活での調和、感情的な共鳴について各150-250文字で記述 5-8個"],
  "cautionPoints": ["注意すべき点を詳細に説明。問題が起こりやすい場面、根本的な原因、具体的な解決策や改善方法、お互いの理解を深める方法について各120-200文字で記述 4-6個"],
  "overallReview": "[データに基づく総合的な関係性分析・将来性の具体的な展望・関係発展のための段階的なアドバイス・長期的な関係維持の戦略・お互いの心理的成長への影響・行動科学の観点からの関係性の考察について包括的に記述 800-1200文字]",
  "individualItems": {
    "提供されたデータの分野のみ": 小数点1桁(40.0-100.0)
  }
}

【分析の基盤理論】
- 星座分析：天体の影響による性格傾向と相互作用のパターン分析
- 血液型：日本文化における行動特性と社会心理学的相性理論
- MBTI：ユング心理学に基づく認知機能の相互補完性と対立点の分析
- エニアグラム：行動動機と深層心理の相性メカニズム
- 干支・九星気学：東洋哲学における性格分類と相互関係の統計的傾向
- その他占術：各理論体系の特徴を活かした客観的分析

【分析アプローチ】
- 各理論の統計的な相関関係に基づく客観的評価
- 行動心理学の観点からの相性メカニズムの解明
- データに基づく具体的な改善策と発展可能性の提示
- 感情的・認知的・行動的側面からの多角的分析
- 長期的な関係性の維持要因と課題の科学的考察

【表現スタイル】
- 「〜でしょう」「〜かもしれません」等の曖昧表現は避け、データに基づいて断定的に表現する
- 「○○さんは〜です」「お二人は〜な関係性を持っています」と分析結果を明確に述べる
- 心理学・行動科学の専門用語を適切に使用し、論理的な根拠を示す
- 具体的な行動・感情・シチュエーション・日常の場面を詳細に描写する
- 統計的な傾向・パターン分析・相関関係といった科学的アプローチを重視する
- 各項目で具体例やケーススタディを含めて説明を充実させる

【詳細化の指針】
- goodPointsとcautionPointsは心理学的根拠に基づく詳細な説明にする
- 「なぜそうなるのか」の理論的背景、「どのような場面で現れるのか」の具体例、「どう対処すべきか」の実践的アドバイスを含める
- overallReviewは関係の全体像を科学的に分析し、データに基づいた未来への具体的な指針を示す
- 人物分析では表面的な特徴だけでなく、認知パターンや行動傾向の深層分析まで言及する

【血液型相性の基準】（日本のketsuekigata文化に基づく統計的傾向）
- A型×A型: 88% (几帳面で協調性があり価値観が一致しやすい)
- B型×B型: 85% (自由で創造的、お互いの個性を理解し合える)
- AB型×AB型: 92% (複雑で知的、深い理解と共感が可能)
- O型×O型: 90% (リーダーシップがあり積極的で活動的)
- A型×B型: 45% (几帳面vs自由奔放で価値観が対立しやすい)
- A型×AB型: 78% (A型の安定性がAB型の多面性を理解・支援)
- A型×O型: 82% (O型のリーダーシップをA型が組織的に支援)
- B型×AB型: 80% (創造性と知的好奇心が相互に刺激)
- B型×O型: 88% (活発で積極的、行動力のある関係)
- AB型×O型: 75% (知的なAB型と実践的なO型の補完関係)

【評価基準】
- 完全一致: 95.0-100.0% (理想的なパートナーシップ)
- 高相性: 85.0-94.9% (深い理解と調和の可能性)
- 良相性: 70.0-84.9% (相互補完による成長関係)
- 普通: 55.0-69.9% (努力次第で良好な関係に発展)
- 注意: 40.0-54.9% (課題解決への取り組みが必要)

【重要な注意事項】
- スピリチュアルな表現（宇宙、カルマ、運命、魂、神秘的など）は使用しない
- 科学的・論理的・心理学的な根拠に基づいた表現のみを使用する
- ニックネームには必ず「さん」を付けて表記する
- 動物占いの動物名は日本語表記を維持する（例：猿、虎、狼など）

【情報量が少ない場合の対応】
提供されたデータが名前・年齢・性別程度で詳細情報が不足している場合は、以下の文言を各分析項目に適切に組み込んでください：
- "提供された情報が限られているため、一般的な傾向に基づく分析となります"
- "より詳細な情報（血液型、星座、MBTI等）があれば、より精度の高い分析が可能です"
- "現在の情報では基本的な傾向分析に留まりますが、追加情報により分析精度が向上します"
ただし、この文言は自然に文章に組み込み、違和感のないように表現してください。`;

// Pre-computed field mappings for faster processing
const DATA_FIELDS = [
  'age', 'zodiacSign', 'bloodType', 'mbti', 'enneagram',
  'animalHoroscope', 'kuseiKigaku', 'fourPillars',
  'rokuseiAstrology', 'sanmeigaku', 'animalFortuneTelling'
] as const;

const COMPATIBILITY_MAPPINGS = [
  { fields: ['zodiacSign'], key: 'zodiacCompatibility' },
  { fields: ['bloodType'], key: 'bloodTypeCompatibility' },
  { fields: ['mbti'], key: 'mbtiCompatibility' },
  { fields: ['enneagram'], key: 'enneagramCompatibility' },
  { fields: ['animalHoroscope'], key: 'animalHoroscopeCompatibility' },
  { fields: ['kuseiKigaku'], key: 'kuseiKigakuCompatibility' }
] as const;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { personA, personB }: { personA: PersonData; personB: PersonData } = body;

    // Fast validation
    if (!personA?.nickname || !personB?.nickname) {
      return NextResponse.json({ error: '人物データが必要です' }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: 'OpenAI APIキーが設定されていません' }, { status: 500 });
    }

    // Check if we have any meaningful data beyond basic info (name, gender, age)
    const hasAdditionalData = DATA_FIELDS.some(field => 
      (personA[field] && personA[field].trim() !== '') || 
      (personB[field] && personB[field].trim() !== '')
    );

    // Count available data fields for more precise information assessment
    const availableDataCount = DATA_FIELDS.filter(field => 
      (personA[field] && personA[field].trim() !== '') && 
      (personB[field] && personB[field].trim() !== '')
    ).length;

    const isLimitedData = availableDataCount <= 2; // Only name, gender, age or very few additional fields

    const dataString = JSON.stringify({ personA, personB }, Object.keys({ personA, personB }).sort());
    const seed = dataString.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % 2147483647;

    const prompt = createOptimizedPrompt(personA, personB, hasAdditionalData, isLimitedData);
    
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: prompt }
      ],
      temperature: 0.8, 
      max_tokens: 8000,
      seed: seed, 
    });

    const text = completion.choices[0]?.message?.content;

    if (!text) {
      return NextResponse.json({ error: 'OpenAIからの応答が取得できませんでした' }, { status: 500 });
    }

    const result = parseOptimizedResponse(text, personA, personB);
    return NextResponse.json(result);

  } catch (error: any) {
    console.error('Compatibility analysis error:', error);

    // Streamlined error handling
    const errorResponses: Record<string, { message: string; status: number }> = {
      'insufficient_quota': { message: 'OpenAI APIの使用量制限に達しました', status: 429 },
      'invalid_api_key': { message: 'OpenAI APIキーが無効です', status: 401 },
      'model_not_found': { message: '指定されたAIモデルが見つかりません', status: 400 }
    };

    const errorInfo = errorResponses[error?.code] || {
      message: `相性分析の生成に失敗しました: ${error.message || '不明なエラー'}`,
      status: 500
    };

    return NextResponse.json({ error: errorInfo.message }, { status: errorInfo.status });
  }
}

function getBloodTypeCompatibility(typeA: string, typeB: string): number {
  const normalizedA = typeA?.toUpperCase().replace(/[^ABO]/g, '') as keyof typeof BLOOD_TYPE_COMPATIBILITY;
  const normalizedB = typeB?.toUpperCase().replace(/[^ABO]/g, '') as keyof typeof BLOOD_TYPE_COMPATIBILITY;
  
  if (BLOOD_TYPE_COMPATIBILITY[normalizedA]?.[normalizedB]) {
    return BLOOD_TYPE_COMPATIBILITY[normalizedA][normalizedB];
  }
  return 75; // Default moderate compatibility
}

function getZodiacCompatibility(signA: string, signB: string): number {
  if (ZODIAC_COMPATIBILITY[signA]?.[signB]) {
    return ZODIAC_COMPATIBILITY[signA][signB];
  }
  // Default compatibility based on element groups
  const fireElements = ['牡羊座', '獅子座', '射手座'];
  const earthElements = ['牡牛座', '乙女座', '山羊座'];
  const airElements = ['双子座', '天秤座', '水瓶座'];
  const waterElements = ['蟹座', '蠍座', '魚座'];
  
  const getElement = (sign: string) => {
    if (fireElements.includes(sign)) return 'fire';
    if (earthElements.includes(sign)) return 'earth';
    if (airElements.includes(sign)) return 'air';
    if (waterElements.includes(sign)) return 'water';
    return 'unknown';
  };
  
  const elementA = getElement(signA);
  const elementB = getElement(signB);
  
  if (elementA === elementB) return 85;
  if ((elementA === 'fire' && elementB === 'air') || (elementA === 'air' && elementB === 'fire')) return 82;
  if ((elementA === 'earth' && elementB === 'water') || (elementA === 'water' && elementB === 'earth')) return 80;
  return 70; // Different elements
}

function createOptimizedPrompt(personA: PersonData, personB: PersonData, hasAdditionalData?: boolean, isLimitedData?: boolean): string {
  // Simple person info formatting with "さん" suffix
  const formatPerson = (person: PersonData, label: string): string => {
    const basicInfo = `【${label}】${person.nickname}さん(${person.gender || '性別未設定'})`;
    
    const additionalInfo = DATA_FIELDS
      .filter(field => person[field])
      .map(field => `${field}:${person[field]}`)
      .join(' ');

    return additionalInfo ? `${basicInfo} ${additionalInfo}` : basicInfo;
  };

  // Determine available compatibility fields
  const availableFields = COMPATIBILITY_MAPPINGS
    .filter(({ fields }) => fields.every(field => personA[field] && personB[field]))
    .map(({ key }) => key);

  // Enhanced matching analysis with predicted compatibility scores
  const matchingFields: string[] = [];
  const compatibilityHints: string[] = [];
  
  DATA_FIELDS.forEach(field => {
    if (personA[field] && personB[field]) {
      if (personA[field] === personB[field]) {
        matchingFields.push(`${field}:${personA[field]}`);
      } else {
        // Provide compatibility hints for different values
        if (field === 'bloodType') {
          const compatibility = getBloodTypeCompatibility(personA[field], personB[field]);
          compatibilityHints.push(`血液型相性予測: ${compatibility}%`);
        }
        if (field === 'zodiacSign') {
          const compatibility = getZodiacCompatibility(personA[field], personB[field]);
          compatibilityHints.push(`星座相性予測: ${compatibility}%`);
        }
      }
    }
  });

  const totalMatches = matchingFields.length;
  const matchInfo = totalMatches > 0 
    ? `\n【完全一致データ】${totalMatches}項目: ${matchingFields.join(', ')}`
    : '';
  
  const hintInfo = compatibilityHints.length > 0
    ? `\n【相性予測ヒント】${compatibilityHints.join(', ')}`
    : '';

  const basePrompt = `${formatPerson(personA, '人物A')}
${formatPerson(personB, '人物B')}${matchInfo}${hintInfo}

相性分析を行ってください。
individualItems含める分野:${availableFields.length ? availableFields.join(',') : 'なし'}

${isLimitedData ? `
【重要】情報量制限モード：
提供された情報が限られているため、以下の点を各分析項目に自然に組み込んでください：
- 現在の基本情報に基づく一般的な傾向分析であることを伝える
- より詳細な情報（血液型、星座、MBTI、エニアグラム等）があれば分析精度が向上することを適切な場所で言及
- 限られた情報でも可能な範囲での有用な分析を提供する
- 文章は自然で読みやすく、情報不足感を強調しすぎない程度に調整する
` : ''}

重要:
- 必ずニックネームに「さん」を付けて表記する
- 動物占いなどの動物名は日本語表記を維持する
- individualItemsの値は必ず数値のみ（40.0-99.0の小数点1桁）
- 提供されたデータがある分野のみ含める  
- 血液型・星座が異なる場合は上記の相性基準表を参考に評価
- 同じデータなら85-99%の高得点を与える
- 相性予測ヒントを参考に個別項目スコアを決定
- 毎回一貫性のある分析を行う
- スピリチュアルな表現は避け、論理的・科学的な分析に徹する

JSON形式のみで回答してください。`;

  return basePrompt;
}

function parseOptimizedResponse(text: string, personA: PersonData, personB: PersonData): CompatibilityResult {
  try {
    // Fast JSON extraction with regex
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error('JSON形式が見つかりません');

    const response = JSON.parse(jsonMatch[0]);

    // Validate required fields
    const required = ['compatibilityPercentage', 'personAAnalysis', 'personBAnalysis'];
    if (required.some(field => !response[field])) {
      throw new Error('必須フィールドが不足しています');
    }

    // Build individual items efficiently with fallback calculations
    const individualItems: Record<string, number> = {};
    COMPATIBILITY_MAPPINGS.forEach(({ fields, key }) => {
      if (fields.every(field => personA[field] && personB[field])) {
        let compatibilityScore = response.individualItems?.[key];
        
        // If AI didn't provide a score, calculate it based on our logic
        if (compatibilityScore === undefined) {
          if (key === 'bloodTypeCompatibility') {
            compatibilityScore = getBloodTypeCompatibility(personA.bloodType!, personB.bloodType!);
          } else if (key === 'zodiacCompatibility') {
            compatibilityScore = getZodiacCompatibility(personA.zodiacSign!, personB.zodiacSign!);
          } else {
            // For other fields, check if they match
            const fieldName = fields[0];
            compatibilityScore = personA[fieldName] === personB[fieldName] ? 90 : 75;
          }
        }
        
        // Ensure the value is numeric and within valid range
        if (typeof compatibilityScore === 'number' && compatibilityScore >= 40 && compatibilityScore <= 100) {
          individualItems[key] = Math.round(compatibilityScore * 10) / 10;
        } else if (typeof compatibilityScore === 'string' && !isNaN(Number(compatibilityScore))) {
          const numValue = Number(compatibilityScore);
          if (numValue >= 40 && numValue <= 100) {
            individualItems[key] = Math.round(numValue * 10) / 10;
          }
        }
      }
    });

    return {
      personA: {
        nickname: personA.nickname + 'さん',
        description: response.personAAnalysis
      },
      personB: {
        nickname: personB.nickname + 'さん',
        description: response.personBAnalysis
      },
      compatibility: {
        percentage: Math.min(Math.max(parseFloat(response.compatibilityPercentage), 40), 100),
        goodPoints: Array.isArray(response.goodPoints) ? response.goodPoints.slice(0, 10) : [],
        cautionPoints: Array.isArray(response.cautionPoints) ? response.cautionPoints.slice(0, 10) : [],
        overallReview: response.overallReview || '',
        individualItems
      }
    };

  } catch (error: any) {
    console.error('JSON parsing failed:', error);
    throw new Error(`AIレスポンスの解析に失敗しました: ${error.message}`);
  }
}