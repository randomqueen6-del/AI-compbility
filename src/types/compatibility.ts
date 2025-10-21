export interface PersonData {
  nickname: string;
  gender: string;
  age: string;
  zodiacSign: string;
  bloodType: string;
  mbti: string;
  fourPillars: string;
  kuseiKigaku: string;
  rokuseiAstrology: string;
  sanmeigaku: string;
  enneagram: string;
  animalHoroscope: string;
  animalFortuneTelling: string;
}

export interface CompatibilityResult {
  personA: PersonProfile;
  personB: PersonProfile;
  compatibility: {
    percentage: number;
    goodPoints: string[];
    cautionPoints: string[];
    overallReview: string;
    individualItems: {
      zodiacCompatibility?: number;
      bloodTypeCompatibility?: number;
      mbtiCompatibility?: number;
      enneagramCompatibility?: number;
      animalHoroscopeCompatibility?: number;
      kuseiKigakuCompatibility?: number;
    };
  };
}

export interface PersonProfile {
  nickname: string;
  description: string;
}

export const ZODIAC_SIGNS = [
  "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
  "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"
];

export const BLOOD_TYPES = ["A", "B", "O", "AB"];

export const MBTI_TYPES = [
  "INTJ", "INTP", "ENTJ", "ENTP", "INFJ", "INFP", "ENFJ", "ENFP",
  "ISTJ", "ISFJ", "ESTJ", "ESFJ", "ISTP", "ISFP", "ESTP", "ESFP"
];

export const ENNEAGRAM_TYPES = [
  "Type 1 - The Perfectionist",
  "Type 2 - The Helper",
  "Type 3 - The Achiever",
  "Type 4 - The Individualist",
  "Type 5 - The Investigator",
  "Type 6 - The Loyalist",
  "Type 7 - The Enthusiast",
  "Type 8 - The Challenger",
  "Type 9 - The Peacemaker"
];

export const ANIMAL_HOROSCOPE = [
  "Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake",
  "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"
];
