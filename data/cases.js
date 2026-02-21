import { caseMurder } from "./cases_murder.js";

export const cases = [
  {
    id: "1",
    title: "Kasus Pembunuhan di Rumah 1A",
    description:
      "Seorang tetangga melaporkan cahaya aneh dari rumah 1A yang sudah kosong selama 3 bulan.",
    suspect: "Bu Sari",
    data: caseMurder.case_murder_1,
  },
  {
    id: "2",
    title: "Kematian di Restoran Golden Lotus",
    description:
      "Seorang pengusaha kaya ditemukan tewas di restoran mewah 'Golden Lotus'. Diduga keracunan saat makan malam.",
    suspect: "Wanita Berambut Merah",
    data: caseMurder.case_murder_2,
  },
  {
    id: "3",
    title: "Kasus Kehilangan di Museum",
    description:
      "Sebuah karya seni langka hilang dari museum. Ada petunjuk yang menunjukkan adanya kerugian internal.",
    suspect: "Pengurus Museum",
    data: caseMurder.case_murder_3,
  },
];