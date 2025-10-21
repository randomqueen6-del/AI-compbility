import { z } from 'zod';

export const PersonDataSchema = z.object({
  nickname: z.string()
    .min(1, 'ニックネームは必須です')
    .max(10, 'ニックネームは10文字以内で入力してください'),
  gender: z.string()
    .min(1, '性別を選択してください'),
  age: z.string().optional(),
  zodiacSign: z.string().optional(),
  bloodType: z.string().optional(),
  mbti: z.string().optional(),
  animalHoroscope: z.string().optional(),
  enneagram: z.string().optional(),
  kuseiKigaku: z.string().optional(),
  rokuseiAstrology: z.string().optional(),
  animalFortuneTelling: z.string().optional(),
  fourPillars: z.string()
    .max(10, '四柱推命は10文字以内で入力してください')
    .optional(),
  sanmeigaku: z.string()
    .max(10, '算命学は10文字以内で入力してください')
    .optional(),
});

export const CompatibilityFormSchema = z.object({
  personA: PersonDataSchema,
  personB: PersonDataSchema,
});

export type PersonDataInput = z.infer<typeof PersonDataSchema>;
export type CompatibilityFormInput = z.infer<typeof CompatibilityFormSchema>;
