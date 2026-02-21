export const caseMurder = {
  case_murder_1: {
    meta: {
      title: "Kasus Pembunuhan di Rumah 1A",
      suspect: "Bu Sari",
    },

    evidences: [
      {
        id: "cctv_log",
        name: "Rekaman CCTV Rumah 1A",
        contradicts: ["statement_home"],
      },
      {
        id: "phone_record",
        name: "Catatan Telepon Bu Sari",
        contradicts: ["statement_home"],
      },
    ],

    start_case_1: {
      type: "story",
      text: "Rumah 1A sudah kosong selama 3 bulan. Tapi tadi malam, tetangga melaporkan ada cahaya aneh dari dalam.",
      next: "story_2",
    },

    story_2: {
      type: "story",
      text: "Kamu adalah detektif yang ditugaskan menyelidiki kasus ini. Di depanmu berdiri Pak Budi, penjaga kompleks perumahan.",
      next: "dialog_intro",
    },

    dialog_intro: {
      type: "dialog",
      speaker: "Pak Budi",
      text: "Saya yang pertama kali melihatnya, Pak. Cahaya hijau berkedip-kedip dari jendela lantai dua.",
      next: "option_1",
    },

    option_1: {
      type: "option",
      choices: [
        {
          text: "Jam berapa Anda melihatnya?",
          effect: { truth: 5 },
          next: "dialog_time",
        },
        {
          text: "Apakah ada yang tinggal di rumah itu?",
          effect: { trust: 5 },
          next: "dialog_resident",
        },
        {
          text: "Mungkin hanya lampu rusak.",
          effect: {},
          next: "dialog_dismiss",
        },
      ],
    },

    dialog_time: {
      type: "dialog",
      speaker: "Pak Budi",
      text: "Sekitar jam 2 malam, Pak. Saya sedang patroli. Cahayanya... tidak seperti lampu biasa.",
      next: "action_1",
    },

    dialog_resident: {
      type: "dialog",
      speaker: "Pak Budi",
      text: "Pemiliknya, Bu Sari, sudah pindah ke luar kota. Rumah itu seharusnya kosong.",
      next: "action_1",
    },

    dialog_dismiss: {
      type: "dialog",
      speaker: "Pak Budi",
      text: "Bukan lampu biasa, Pak! Saya sudah 10 tahun jadi satpam. Ini... berbeda.",
      next: "action_1",
    },

    action_1: {
      type: "action",
      actions: ["percaya", "ragu", "tanya"],
      result: {
        percaya: "dialog_action_trust",
        ragu: "dialog_action_doubt",
        tanya: "dialog_action_question",
      },
    },

    dialog_action_doubt: {
      type: "dialog",
      speaker: "Pak Budi",
      text: "Kalau tidak percaya, silakan masuk sendiri ke rumah itu. Tapi saya tidak mau ikut.",
      next: "story_investigate",
    },

    dialog_action_trust: {
      type: "dialog",
      speaker: "Pak Budi",
      text: "Terima kasih sudah percaya, Pak. Ada satu hal lagi... saya dengar suara aneh juga.",
      next: "dialog_sound",
    },

    dialog_action_question: {
      type: "dialog",
      speaker: "Pak Budi",
      text: "Sebenarnya... Bu Sari pergi mendadak. Katanya ada urusan keluarga, tapi sepertinya dia ketakutan.",
      next: "story_investigate",
    },

    dialog_sound: {
      type: "dialog",
      speaker: "Pak Budi",
      text: "Seperti suara mesin... berdengung pelan. Dari basement rumah itu.",
      next: "story_investigate",
    },

    story_investigate: {
      type: "story",
      text: "Kamu memutuskan untuk masuk ke rumah 1A. Pintu depan tidak terkunci.",
      next: "story_inside",
    },

    story_inside: {
      type: "story",
      text: "Di dalam, debu tebal menutupi semua furnitur. Tapi ada jejak kaki menuju ke tangga basement.",
      next: "option_2",
    },

    option_2: {
      type: "option",
      choices: [
        {
          text: "Ikuti jejak ke basement.",
          effect: { truth: 15 },
          next: "dialog_basement",
        },
        {
          text: "Periksa lantai atas dulu.",
          effect: { trust: 10 },
          next: "dialog_upstairs",
        },
        {
          text: "Panggil backup.",
          effect: { trust: 5, truth: 5 },
          next: "dialog_backup",
        },
      ],
    },

    dialog_basement: {
      type: "dialog",
      speaker: "Narasi",
      text: "Kamu menuruni tangga basement. Suara dengung semakin keras. Ada cahaya hijau dari balik pintu.",
      next: "option_final",
    },

    dialog_upstairs: {
      type: "dialog",
      speaker: "Narasi",
      text: "Di lantai atas, kamu menemukan foto-foto eksperimen ilmiah dan catatan tentang 'Portal Dimensi'.",
      next: "option_final",
    },

    dialog_backup: {
      type: "dialog",
      speaker: "Narasi",
      text: "Saat menunggu backup, kamu mendengar ledakan dari basement. Cahaya hijau meledak keluar!",
      next: "option_final",
    },

    option_final: {
      type: "option",
      choices: [
        {
          text: "Buka pintu basement!",
          effect: { truth: 10 },
          next: "ending",
        },
        {
          text: "Evakuasi dan laporkan ke pusat.",
          effect: { trust: 10 },
          next: "ending",
        },
      ],
    },

    ending: {
      type: "ending",
    },
  },

  case_murder_2: {
    meta: {
      title: "Kematian di Restoran Golden Lotus",
      suspect: "Wanita Berambut Merah",
    },

    evidences: [
      {
        id: "cctv_restoran",
        name: "Rekaman CCTV Restoran",
        contradicts: ["statement_alibi"],
      },
      {
        id: "botol_racun",
        name: "Botol Racun di Tas Tersangka",
        contradicts: ["statement_innocent"],
      },
    ],

    start_case_2: {
      type: "story",
      text: "Seorang pengusaha kaya ditemukan tewas di restoran mewah 'Golden Lotus'. Diduga keracunan saat makan malam.",
      next: "story_2_2",
    },

    story_2_2: {
      type: "story",
      text: "Kamu tiba di TKP. Korban bernama Tuan Hartono, 55 tahun. Di hadapanmu berdiri Mbak Rina, pelayan yang melayani korban.",
      next: "dialog_intro",
    },

    dialog_intro: {
      type: "dialog",
      speaker: "Mbak Rina",
      text: "Saya yang terakhir kali melayani beliau, Pak. Dia memesan sup kepiting spesial, seperti biasa.",
      next: "option_1",
    },

    option_1: {
      type: "option",
      choices: [
        {
          text: "Siapa yang menyiapkan makanannya?",
          effect: { truth: 5 },
          next: "dialog_chef",
        },
        {
          text: "Apakah ada yang mencurigakan saat makan?",
          effect: { trust: 5 },
          next: "dialog_suspicious",
        },
        {
          text: "Mungkin korban memang sakit.",
          effect: {},
          next: "dialog_dismiss",
        },
      ],
    },

    dialog_chef: {
      type: "dialog",
      speaker: "Mbak Rina",
      text: "Chef Anton yang memasak. Tapi... beliau dan Tuan Hartono sempat bertengkar minggu lalu soal investasi.",
      next: "action_1",
    },

    dialog_suspicious: {
      type: "dialog",
      speaker: "Mbak Rina",
      text: "Sebenarnya ada seorang wanita yang duduk di meja sebelah. Dia terus memperhatikan Tuan Hartono.",
      next: "action_1",
    },

    dialog_dismiss: {
      type: "dialog",
      speaker: "Mbak Rina",
      text: "Tidak mungkin, Pak! Tuan Hartono sangat sehat. Dia bahkan baru pulang dari gym tadi sore.",
      next: "action_1",
    },

    action_1: {
      type: "action",
      actions: ["percaya", "ragu", "tanya"],
      result: {
        percaya: "dialog_action_trust",
        ragu: "dialog_action_doubt",
        tanya: "dialog_action_question",
      },
    },

    dialog_action_doubt: {
      type: "dialog",
      speaker: "Mbak Rina",
      text: "Kenapa Bapak meragukan saya? Saya sudah bekerja di sini 5 tahun! Cek saja CCTV kalau tidak percaya.",
      next: "story_investigate",
    },

    dialog_action_trust: {
      type: "dialog",
      speaker: "Mbak Rina",
      text: "Terima kasih, Pak. Ada yang ingin saya sampaikan... saya melihat seseorang memasukkan sesuatu ke minuman korban.",
      next: "dialog_witness",
    },

    dialog_action_question: {
      type: "dialog",
      speaker: "Mbak Rina",
      text: "Sebenarnya... istri Tuan Hartono juga ada di restoran malam itu. Tapi di meja berbeda, dengan pria lain.",
      next: "story_investigate",
    },

    dialog_witness: {
      type: "dialog",
      speaker: "Mbak Rina",
      text: "Wanita berambut merah itu... dia berjalan melewati meja korban dan tangannya bergerak cepat di atas gelas.",
      next: "story_investigate",
    },

    story_investigate: {
      type: "story",
      text: "Kamu memutuskan untuk memeriksa lebih lanjut. Ada tiga lokasi yang perlu diselidiki.",
      next: "story_inside",
    },

    story_inside: {
      type: "story",
      text: "Di meja korban masih ada sisa makanan dan minuman. Tim forensik sedang mengamankan barang bukti.",
      next: "option_2",
    },

    option_2: {
      type: "option",
      choices: [
        {
          text: "Periksa rekaman CCTV.",
          effect: { truth: 15 },
          next: "dialog_cctv",
        },
        {
          text: "Interogasi Chef Anton.",
          effect: { trust: 10 },
          next: "dialog_chef_interogasi",
        },
        {
          text: "Cari wanita berambut merah.",
          effect: { trust: 5, truth: 5 },
          next: "dialog_woman",
        },
      ],
    },

    dialog_cctv: {
      type: "dialog",
      speaker: "Narasi",
      text: "Rekaman CCTV menunjukkan wanita berambut merah memang melewati meja korban. Tapi wajahnya tertutup topi.",
      next: "option_final",
    },

    dialog_chef_interogasi: {
      type: "dialog",
      speaker: "Narasi",
      text: "Chef Anton mengaku memang bertengkar dengan korban, tapi soal utang bukan investasi. Dia tampak menyembunyikan sesuatu.",
      next: "option_final",
    },

    dialog_woman: {
      type: "dialog",
      speaker: "Narasi",
      text: "Wanita berambut merah ternyata adalah mantan sekretaris korban yang dipecat bulan lalu. Dia kabur saat melihatmu.",
      next: "option_final",
    },

    option_final: {
      type: "option",
      choices: [
        {
          text: "Tangkap wanita berambut merah sebagai tersangka utama!",
          effect: { truth: 10 },
          next: "ending",
        },
        {
          text: "Kumpulkan lebih banyak bukti sebelum menuduh siapapun.",
          effect: { trust: 10 },
          next: "ending",
        },
      ],
    },

    ending: {
      type: "ending",
    },
  },

  case_murder_3: {
    meta: {
      title: "Mayat di Gudang Pelabuhan",
      suspect: "Kapten Kapal",
    },

    evidences: [
      {
        id: "manifest_kapal",
        name: "Manifest Kargo Palsu",
        contradicts: ["statement_cargo"],
      },
      {
        id: "pisau_berdarah",
        name: "Pisau Berdarah di Kapal",
        contradicts: ["statement_weapon"],
      },
    ],

    start_case_3: {
      type: "story",
      text: "Mayat seorang pekerja pelabuhan ditemukan di gudang tua. Tubuhnya penuh luka tusuk.",
      next: "story_3_2",
    },

    story_3_2: {
      type: "story",
      text: "Korban bernama Adi, 32 tahun, pekerja shift malam. Di sampingmu berdiri Pak Joko, mandor pelabuhan.",
      next: "dialog_intro",
    },

    dialog_intro: {
      type: "dialog",
      speaker: "Pak Joko",
      text: "Adi anak baik, Pak. Tidak punya musuh. Tapi akhir-akhir ini dia sering bertanya soal kapal dari Singapura.",
      next: "option_1",
    },

    option_1: {
      type: "option",
      choices: [
        {
          text: "Kapal apa dari Singapura?",
          effect: { truth: 5 },
          next: "dialog_ship",
        },
        {
          text: "Kapan terakhir Anda melihat Adi?",
          effect: { trust: 5 },
          next: "dialog_lasttime",
        },
        {
          text: "Mungkin ini perampokan biasa.",
          effect: {},
          next: "dialog_dismiss",
        },
      ],
    },

    dialog_ship: {
      type: "dialog",
      speaker: "Pak Joko",
      text: "Kapal 'Sea Dragon'. Datang tiap bulan, bawa kontainer tertutup. Adi curiga isinya bukan barang legal.",
      next: "action_1",
    },

    dialog_lasttime: {
      type: "dialog",
      speaker: "Pak Joko",
      text: "Tadi malam sekitar jam 11. Dia bilang mau mengecek gudang nomor 7. Setelah itu... tidak ada kabar.",
      next: "action_1",
    },

    dialog_dismiss: {
      type: "dialog",
      speaker: "Pak Joko",
      text: "Perampokan tidak sampai menusuk 12 kali, Pak! Ini pembunuhan terencana. Ada yang ingin membungkamnya.",
      next: "action_1",
    },

    action_1: {
      type: "action",
      actions: ["percaya", "ragu", "tanya"],
      result: {
        percaya: "dialog_action_trust",
        ragu: "dialog_action_doubt",
        tanya: "dialog_action_question",
      },
    },

    dialog_action_doubt: {
      type: "dialog",
      speaker: "Pak Joko",
      text: "Anda curiga saya? Adi seperti anak sendiri bagi saya! Tanya siapa saja di pelabuhan ini.",
      next: "story_investigate",
    },

    dialog_action_trust: {
      type: "dialog",
      speaker: "Pak Joko",
      text: "Terima kasih percaya, Pak. Saya harus ceritakan... Kapten kapal Sea Dragon mengancam Adi kemarin.",
      next: "dialog_threat",
    },

    dialog_action_question: {
      type: "dialog",
      speaker: "Pak Joko",
      text: "Ada rumor... kontainer itu berisi senjata ilegal. Dan ada pejabat bea cukai yang terlibat.",
      next: "story_investigate",
    },

    dialog_threat: {
      type: "dialog",
      speaker: "Pak Joko",
      text: "Kapten Viktor, orang Rusia. Dia bilang akan 'membereskan' siapa saja yang ikut campur urusannya.",
      next: "story_investigate",
    },

    story_investigate: {
      type: "story",
      text: "Kamu memutuskan untuk menyelidiki lebih dalam. Kapal Sea Dragon masih berlabuh di dermaga.",
      next: "story_inside",
    },

    story_inside: {
      type: "story",
      text: "Gudang nomor 7 masih dipasangi garis polisi. Ada noda darah memanjang menuju ke arah dermaga.",
      next: "option_2",
    },

    option_2: {
      type: "option",
      choices: [
        {
          text: "Naik ke kapal Sea Dragon.",
          effect: { truth: 15 },
          next: "dialog_onboard",
        },
        {
          text: "Periksa isi kontainer tertutup.",
          effect: { trust: 10 },
          next: "dialog_container",
        },
        {
          text: "Hubungi bea cukai untuk info.",
          effect: { trust: 5, truth: 5 },
          next: "dialog_customs",
        },
      ],
    },

    dialog_onboard: {
      type: "dialog",
      speaker: "Narasi",
      text: "Di kapal, kamu menemukan pisau berdarah tersembunyi di kabin kapten. Kapten Viktor tidak ada di tempat.",
      next: "option_final",
    },

    dialog_container: {
      type: "dialog",
      speaker: "Narasi",
      text: "Kontainer berisi peti-peti berisi senjata api ilegal. Adi pasti menemukan ini dan dibunuh karenanya.",
      next: "option_final",
    },

    dialog_customs: {
      type: "dialog",
      speaker: "Narasi",
      text: "Petugas bea cukai mengaku ada 'pengaturan khusus' untuk kapal Sea Dragon. Seseorang membayar untuk mengabaikan pemeriksaan.",
      next: "option_final",
    },

    option_final: {
      type: "option",
      choices: [
        {
          text: "Kejar dan tangkap Kapten Viktor!",
          effect: { truth: 10 },
          next: "ending",
        },
        {
          text: "Bongkar jaringan penyelundupan lebih dulu.",
          effect: { trust: 10 },
          next: "ending",
        },
      ],
    },

    ending: {
      type: "ending",
    },
  },
};
