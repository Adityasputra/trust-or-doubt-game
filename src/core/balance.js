export const BALANCE = {
  TRUST_MAX: 100,
  TRUTH_MAX: 100,
  PRESSURE_MAX: 100,

  ACTIONS: {
    believe: { trust: +10, pressure: -5 },
    doubt: { trust: -5, truth: +5, pressure: +10 },
    question: { truth: +3, pressure: +5 },
    accept: { trust: +5, pressure: -10 },
    objection: { trust: -10, truth: +10, pressure: +15 },
  },

  PRESENT: {
    correct: { truth: +20, pressure: +20 },
    incorrect: { trust: -15, pressure: +5 },
  },
};
