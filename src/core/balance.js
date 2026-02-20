export const BALANCE = {
  TRUST_MAX: 100,
  PRESSURE_MAX: 100,

  ACTIONS: {
    accept: { trust: +5, pressure: -10 },
    doubt: { trust: -5, truth: +5, pressure: +10 },
    question: { truth: +0, pressure: +5 },
    objection: { trust: -10, pressure: +15 },
  },

  PRESENT: {
    correct: { truth: +20, pressure: +20 },
    incorrect: { trust: -15, pressure: +5 },
  },
};
