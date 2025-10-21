"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Heart, Sparkles } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  type PersonData,
  ZODIAC_SIGNS,
  BLOOD_TYPES,
  MBTI_TYPES,
  ENNEAGRAM_TYPES,
  ANIMAL_HOROSCOPE,
} from "@/types/compatibility"
import {
  ZODIAC_SIGNS_JA,
  BLOOD_TYPES_JA,
  MBTI_TYPES_JA,
  ENNEAGRAM_TYPES_JA,
  ANIMAL_HOROSCOPE_JA,
  KUSEI_KIGAKU_JA,
  ROKUSEI_ASTROLOGY_JA,
  ANIMAL_FORTUNE_TELLING_JA,
} from "@/types/compatibility-ja"
import { getTranslations } from "@/lib/translations"
import { defaultLocale } from "@/lib/i18n"
import { CompatibilityFormSchema } from "@/lib/validation"

// Define data arrays
const zodiacSigns = [
  "牡羊座",
  "牡牛座",
  "双子座",
  "蟹座",
  "獅子座",
  "乙女座",
  "天秤座",
  "蠍座",
  "射手座",
  "山羊座",
  "水瓶座",
  "魚座",
]

const bloodTypes = ["A型", "B型", "O型", "AB型"]

const ageGroups = [
  "10代",
  "20代前半",
  "20代後半",
  "30代前半",
  "30代後半",
  "40代前半",
  "40代後半",
  "50代前半",
  "50代後半",
  "60代以上",
]

const mbtiTypes = [
  "INTJ",
  "INTP",
  "ENTJ",
  "ENTP",
  "INFJ",
  "INFP",
  "ENFJ",
  "ENFP",
  "ISTJ",
  "ISFJ",
  "ESTJ",
  "ESFJ",
  "ISTP",
  "ISFP",
  "ESTP",
  "ESFP",
]

// Alert component using shadcn/ui's AlertDialog
const Alert = ({
  isOpen,
  onClose,
  title,
  message,
  tone = "error",
}: {
  isOpen: boolean
  onClose: () => void
  title: string
  message: string
  tone?: "error" | "info" | "success"
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-orange-800">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-foreground">
            {message}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-end">
          <AlertDialogAction 
            onClick={onClose}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
          >
            OK
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

// PersonForm component to render individual person cards
const PersonForm = ({
  person,
  data,
  personKey,
  onUpdate,
}: {
  person: string
  data: PersonData
  personKey: "personA" | "personB"
  onUpdate: (key: "personA" | "personB", field: keyof PersonData, value: string) => void
}) => {
  return (
    <Card className="bg-card border-border shadow-soft transition-all duration-300 hover:shadow-romantic max-w-2xl mx-auto overflow-hidden p-0">
      <CardHeader className="bg-gradient-to-r from-orange-50 to-orange-100 border-b border-border p-6 m-0 rounded-t-lg">
        <CardTitle className="text-xl font-bold text-orange-800 text-center m-0">{person}</CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {/* Nickname - Required */}
        <div className="space-y-2">
          <Label htmlFor={`nickname-${personKey}`} className="text-sm font-medium text-foreground">
            ニックネーム <span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            <Input
              id={`nickname-${personKey}`}
              value={data.nickname}
              onChange={(e) => onUpdate(personKey, "nickname", e.target.value)}
              placeholder="ニックネームを入力"
              className="border-border bg-background w-full pr-12"
              maxLength={10}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
              {data.nickname.length}/10
            </span>
          </div>
        </div>

        {/* Gender - Optional */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-foreground">
            性別
          </Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div
              className={`flex items-center space-x-2 p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
                data.gender === "male"
                  ? "bg-orange-50 border-orange-200 shadow-sm"
                  : "bg-gray-50 border-gray-200 hover:bg-orange-25"
              }`}
              onClick={() => onUpdate(personKey, "gender", "male")}
            >
              <input
                type="radio"
                id={`male-${personKey}`}
                name={`gender-${personKey}`}
                value="male"
                checked={data.gender === "male"}
                onChange={(e) => onUpdate(personKey, "gender", e.target.value)}
                className="w-4 h-4 text-orange-600 bg-white border-orange-300 focus:ring-orange-500 focus:ring-2 focus:ring-offset-0 pointer-events-none"
                style={{
                  accentColor: "#ea580c",
                }}
              />
              <Label htmlFor={`male-${personKey}`} className="text-sm cursor-pointer">
                男性
              </Label>
            </div>
            <div
              className={`flex items-center space-x-2 p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
                data.gender === "female"
                  ? "bg-orange-50 border-orange-200 shadow-sm"
                  : "bg-gray-50 border-gray-200 hover:bg-orange-25"
              }`}
              onClick={() => onUpdate(personKey, "gender", "female")}
            >
              <input
                type="radio"
                id={`female-${personKey}`}
                name={`gender-${personKey}`}
                value="female"
                checked={data.gender === "female"}
                onChange={(e) => onUpdate(personKey, "gender", e.target.value)}
                className="w-4 h-4 text-orange-600 bg-white border-orange-300 focus:ring-orange-500 focus:ring-2 focus:ring-offset-0 pointer-events-none"
                style={{
                  accentColor: "#ea580c",
                }}
              />
              <Label htmlFor={`female-${personKey}`} className="text-sm cursor-pointer">
                女性
              </Label>
            </div>
            <div
              className={`flex items-center space-x-2 p-3 rounded-lg border transition-all duration-200 cursor-pointer ${
                data.gender === "other"
                  ? "bg-orange-50 border-orange-200 shadow-sm"
                  : "bg-gray-50 border-gray-200 hover:bg-orange-25"
              }`}
              onClick={() => onUpdate(personKey, "gender", "other")}
            >
              <input
                type="radio"
                id={`other-${personKey}`}
                name={`gender-${personKey}`}
                value="other"
                checked={data.gender === "other"}
                onChange={(e) => onUpdate(personKey, "gender", e.target.value)}
                className="w-4 h-4 text-orange-600 bg-white border-orange-300 focus:ring-orange-500 focus:ring-2 focus:ring-offset-0 pointer-events-none"
                style={{
                  accentColor: "#ea580c",
                }}
              />
              <Label htmlFor={`other-${personKey}`} className="text-sm cursor-pointer">
                その他
              </Label>
            </div>
          </div>
        </div>

        {/* Age Group - Required */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">
            年齢層 <span className="text-destructive">*</span>
          </Label>
          <Select value={data.age || ""} onValueChange={(value) => onUpdate(personKey, "age", value)}>
            <SelectTrigger className="border-border bg-background w-full">
              <SelectValue placeholder="年齢層を選択してください" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              {ageGroups.map((age) => (
                <SelectItem key={age} value={age}>
                  {age}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Zodiac Sign */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">
            星座
          </Label>
          <Select value={data.zodiacSign || ""} onValueChange={(value) => onUpdate(personKey, "zodiacSign", value)}>
            <SelectTrigger className="border-border bg-background w-full">
              <SelectValue placeholder="星座を選択してください" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              {ZODIAC_SIGNS_JA.map((sign, index) => (
                <SelectItem key={sign} value={ZODIAC_SIGNS[index]}>
                  {sign}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Blood Type */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">
            血液型
          </Label>
          <Select value={data.bloodType || ""} onValueChange={(value) => onUpdate(personKey, "bloodType", value)}>
            <SelectTrigger className="border-border bg-background w-full">
              <SelectValue placeholder="血液型を選択してください" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              {BLOOD_TYPES_JA.map((type, index) => (
                <SelectItem key={type} value={BLOOD_TYPES[index]}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* MBTI */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">
            MBTI
          </Label>
          <Select value={data.mbti || ""} onValueChange={(value) => onUpdate(personKey, "mbti", value)}>
            <SelectTrigger className="border-border bg-background w-full">
              <SelectValue placeholder="MBTIを選択してください" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              {MBTI_TYPES_JA.map((type, index) => (
                <SelectItem key={type} value={MBTI_TYPES[index]}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Chinese Zodiac */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">
            干支
          </Label>
          <Select
            value={data.animalHoroscope || ""}
            onValueChange={(value) => onUpdate(personKey, "animalHoroscope", value)}
          >
            <SelectTrigger className="border-border bg-background w-full">
              <SelectValue placeholder="干支を選択してください" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              {ANIMAL_HOROSCOPE_JA.map((animal, index) => (
                <SelectItem key={animal} value={ANIMAL_HOROSCOPE[index]}>
                  {animal}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Enneagram */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">
            エニアグラム
          </Label>
          <Select value={data.enneagram || ""} onValueChange={(value) => onUpdate(personKey, "enneagram", value)}>
            <SelectTrigger className="border-border bg-background w-full">
              <SelectValue placeholder="エニアグラムを選択してください" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              {ENNEAGRAM_TYPES_JA.map((type, index) => (
                <SelectItem key={type} value={ENNEAGRAM_TYPES[index]}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Kusei Kigaku */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">
            九星気学
          </Label>
          <Select value={data.kuseiKigaku || ""} onValueChange={(value) => onUpdate(personKey, "kuseiKigaku", value)}>
            <SelectTrigger className="border-border bg-background w-full">
              <SelectValue placeholder="九星を選択してください" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              {KUSEI_KIGAKU_JA.map((kusei) => (
                <SelectItem key={kusei} value={kusei}>
                  {kusei}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Rokusei Astrology */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">
            六星占術
          </Label>
          <Select
            value={data.rokuseiAstrology || ""}
            onValueChange={(value) => onUpdate(personKey, "rokuseiAstrology", value)}
          >
            <SelectTrigger className="border-border bg-background w-full">
              <SelectValue placeholder="六星占術を選択してください" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              {ROKUSEI_ASTROLOGY_JA.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Animal Fortune Telling */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">
            動物占い
          </Label>
          <Select
            value={data.animalFortuneTelling || ""}
            onValueChange={(value) => onUpdate(personKey, "animalFortuneTelling", value)}
          >
            <SelectTrigger className="border-border bg-background w-full">
              <SelectValue placeholder="動物占いを選択してください" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border">
              {ANIMAL_FORTUNE_TELLING_JA.map((animal) => (
                <SelectItem key={animal} value={animal}>
                  {animal}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Four Pillars of Destiny */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">
            四柱推命
          </Label>
          <div className="relative">
            <Input
              value={data.fourPillars || ""}
              onChange={(e) => onUpdate(personKey, "fourPillars", e.target.value)}
              placeholder="四柱推命を入力"
              className="border-border bg-background w-full pr-12"
              maxLength={10}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
              {(data.fourPillars || "").length}/10
            </span>
          </div>
        </div>

        {/* Sanmeigaku */}
        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">
            算命学
          </Label>
          <div className="relative">
            <Input
              value={data.sanmeigaku || ""}
              onChange={(e) => onUpdate(personKey, "sanmeigaku", e.target.value)}
              placeholder="算命学を入力"
              className="border-border bg-background w-full pr-12"
              maxLength={10}
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
              {(data.sanmeigaku || "").length}/10
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function TestPage() {
  const t = getTranslations(defaultLocale)
  const router = useRouter()
  const [person1, setPerson1] = useState<PersonData>({
    nickname: "",
    gender: "",
    age: "",
    zodiacSign: "",
    bloodType: "",
    mbti: "",
    animalHoroscope: "",
    enneagram: "",
    fourPillars: "",
    kuseiKigaku: "",
    rokuseiAstrology: "",
    sanmeigaku: "",
    animalFortuneTelling: "",
  })

  const [person2, setPerson2] = useState<PersonData>({
    nickname: "",
    gender: "",
    age: "",
    zodiacSign: "",
    bloodType: "",
    mbti: "",
    animalHoroscope: "",
    enneagram: "",
    fourPillars: "",
    kuseiKigaku: "",
    rokuseiAstrology: "",
    sanmeigaku: "",
    animalFortuneTelling: "",
  })

  const [modal, setModal] = useState<{
    isOpen: boolean
    title: string
    message: string
    tone?: "error" | "info" | "success"
  }>({
    isOpen: false,
    title: "",
    message: "",
    tone: "error",
  })

  const updateFormData = (person: "personA" | "personB", field: keyof PersonData, value: string) => {
    if (person === "personA") {
      setPerson1((prev) => ({ ...prev, [field]: value }))
    } else {
      setPerson2((prev) => ({ ...prev, [field]: value }))
    }
  }

  const showModal = (title: string, message: string, tone: "error" | "info" | "success" = "error") => {
    setModal({ isOpen: true, title, message, tone })
  }

  const closeModal = () => {
    setModal((prev) => ({ ...prev, isOpen: false }))
  }

  const validateForm = () => {
    try {
      CompatibilityFormSchema.parse({
        personA: person1,
        personB: person2
      });
      return true;
    } catch (error: any) {
      if (error.errors && error.errors.length > 0) {
        const firstError = error.errors[0];
        const field = firstError.path.join('.');
        const message = firstError.message;
        
        // Create user-friendly error messages
        let title = "入力が必要です";
        let userMessage = message;
        
        if (field.includes('personA')) {
          userMessage = `あなたの情報: ${message}`;
        } else if (field.includes('personB')) {
          userMessage = `お相手の情報: ${message}`;
        }
        
        showModal(title, userMessage, "error");
      } else {
        showModal("入力エラー", "すべての項目を正しく入力してください。", "error");
      }
      return false;
    }
  }

  const handleSubmit = async () => {
    if (!validateForm()) {
      return
    }

    // Store data in localStorage for results page
    localStorage.setItem("compatibilityData", JSON.stringify({ person1, person2 }))
    router.push("/results")
  }

  return (
    <div className="min-h-screen bg-background/80 backdrop-blur-sm">
      {/* Modal */}
      <Alert
        isOpen={modal.isOpen}
        onClose={closeModal}
        title={modal.title}
        message={modal.message}
        tone={modal.tone}
      />

      <div className="container mx-auto px-4 py-6 sm:py-8">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-6 sm:mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Heart className="h-8 w-8 sm:h-12 sm:w-12 text-accent" />
            </motion.div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent mb-3 sm:mb-4 leading-tight">
              恋愛相性診断
            </h1>
            <motion.div
              animate={{ rotate: [0, -360] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Sparkles className="h-8 w-8 sm:h-12 sm:w-12 text-accent" />
            </motion.div>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            占星術、性格タイプ、古代の知恵を通して、あなたにぴったりの相性を見つけましょう
          </p>
        </motion.div>

        {/* Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6 sm:mb-8 mx-0 lg:mx-10">
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <PersonForm person="あなた" data={person1} personKey="personA" onUpdate={updateFormData} />
          </motion.div>

          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <PersonForm person="お相手" data={person2} personKey="personB" onUpdate={updateFormData} />
          </motion.div>
        </div>

        {/* Submit Button */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center px-4"
        >
          <Button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl w-full sm:w-auto max-w-sm mx-auto"
            size="lg"
          >
            ❤️ 相性を診断する
          </Button>
          <p className="text-sm text-muted-foreground mt-2">ニックネームと年齢層を入力してください</p>
        </motion.div>
      </div>
    </div>
  )
}