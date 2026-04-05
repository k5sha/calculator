type TranslationKeys = 
  | "category.error" 
  | "category.systematic" 
  | "category.compression" 
  | "category.transform"
  | "category.analysis";

export interface CodeItem {
  name: { 
    uk: string; 
    en: string 
  };
  path: string;
  description: { 
    uk: string; 
    en: string 
  };
  categoryKey: TranslationKeys; 
  icon: string;
  isAvailable: boolean;
}

export const allCodes: CodeItem[] = [
  {
    name: { uk: "Рекурентний код", en: "Recurrent Code" },
    path: "/codes/recurrent",
    description: {
      uk: "Потужний алгоритм кодування з використанням регістрів зсуву для виправлення пакетів помилок.",
      en: "A powerful coding algorithm using shift registers to correct error bursts."
    },
    categoryKey: "category.error",
    icon: "🔄",
    isAvailable: true,
  },
  {
    name: { uk: "Коди-супутники", en: "Companion Codes" },
    path: "/codes/companions",
    description: {
      uk: "Метод виправлення помилок за допомогою побудови таблиць супутніх векторів для кодових комбінацій.",
      en: "Error correction method using companion vector tables for code combinations."
    },
    categoryKey: "category.systematic",
    icon: "🛰️",
    isAvailable: true,
  },
  {
    name: { uk: "Код Грея", en: "Gray Code" },
    path: "/codes/gray",
    description: {
      uk: "Мінімальна зміна бітів при переключенні станів. Ідеально для енкодерів.",
      en: "Minimal bit change between states. Ideal for rotary encoders."
    },
    categoryKey: "category.transform",
    icon: "🔢",
    isAvailable: true,
  },
  {
    name: { uk: "Код Шеннона-Фано", en: "Shannon-Fano Code" },
    path: "/codes/shannon-fano",
    description: {
      uk: "Ефективний метод префіксного кодування, що базується на розділенні ймовірностей символів.",
      en: "An efficient prefix coding method based on splitting symbol probabilities."
    },
    categoryKey: "category.compression",
    icon: "📉",
    isAvailable: true,
  },
  {
    name: { uk: "Двійково-десятковий код", en: "Binary-Coded Decimal" },
    path: "/codes/bcd",
    description: {
      uk: "Перетворення чисел у формат BCD (ДДК) з використанням довільних ваг розрядів для кожної тетради.",
      en: "Convert numbers to BCD format using custom bit weights for each nibble."
    },
    categoryKey: "category.transform",
    icon: "🔢",
    isAvailable: true,
  },
  {
    name: { uk: "Код Еллайеса", en: "Elias Code" },
    path: "/codes/elias",
    description: {
      uk: "Ітеративний матричний код, що використовує перевірку парності рядків та стовпців для виправлення помилок.",
      en: "An iterative matrix code using row and column parity checks to correct errors."
    },
    categoryKey: "category.error",
    icon: "🔲",
    isAvailable: true,
  },
  {
    name: { uk: "Код Хаффмена", en: "Huffman Code" },
    path: "/codes/huffman",
    description: {
      uk: "Алгоритм оптимального префіксного кодування для стиснення без втрат.",
      en: "An optimal prefix coding algorithm for lossless data compression."
    },
    categoryKey: "category.compression",
    icon: "📦",
    isAvailable: true,
  },
  {
    name: { uk: "Ентропія та Інформація", en: "Entropy & Information" },
    path: "/codes/entropy",
    description: {
      uk: "Розрахунок власної інформації символів та безумовної ентропії джерела повідомлень.",
      en: "Calculation of self-information and unconditional entropy of a message source."
    },
    categoryKey: "category.analysis",
    icon: "📊",
    isAvailable: true,
  },
  {
    name: { uk: "Код Хеммінга", en: "Hamming Code" },
    path: "#",
    description: {
      uk: "Класичний метод самокоригованих кодів для контролю цілісності даних.",
      en: "A classic error-correcting code method for data integrity control."
    },
    categoryKey: "category.systematic",
    icon: "🛡️",
    isAvailable: false,
  },
];