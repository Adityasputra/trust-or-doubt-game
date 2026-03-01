export const caseMurder = {
  case_murder_1: {
    meta: {
      title: "Kasus Pembunuhan di Rumah 1A",
      slug: "kasus-pembunuhan-di-rumah-1a",
      suspect: "Bu Sari",
      portrait: "https://example.com/portrait_bu_sari.jpg",
      description:
        "Seorang wanita bernama Bu Sari ditemukan meninggal di rumahnya yang kosong selama 3 bulan. Tidak ada bukti fisik yang menunjukkan adanya pembunuhan, tetapi ada beberapa indikasi aneh yang muncul saat penyelidikan awal.",
      chronology:
        "Bu Sari pindah ke luar kota 3 bulan lalu. Tapi tadi malam, ada cahaya hijau berkedip-kedip dari rumahnya yang kosong.",
    },

    evidences: [
      {
        id: "cctv_log",
        name: "Rekaman CCTV Rumah 1A",
        description: "Rekaman menunjukkan Bu Sari masuk ke rumah jam 1 malam",
        contradicts: ["statement_home"],
      },
      {
        id: "phone_record",
        name: "Catatan Telepon Bu Sari",
        description: "Panggilan terakhir dari rumah 1A jam 1:30 malam",
        contradicts: ["statement_home"],
      },
      {
        id: "neighbor_testimony",
        name: "Kesaksian Tetangga",
        description: "Tetangga melihat mobil Bu Sari parkir di depan rumah",
        contradicts: ["statement_home", "statement_time"],
      },
    ],

    statements: {
      statement_home: {
        id: "statement_home",
        speaker: "Pak Budi",
        summary: "Bu Sari sudah pindah ke luar kota 3 bulan lalu",
        fullText:
          "Pemiliknya Bu Sari, Pak. Tiga bulan lalu dia tiba-tiba pindah ke luar kota.",
      },
      statement_time: {
        id: "statement_time",
        speaker: "Pak Budi",
        summary: "Cahaya muncul sekitar jam 2 malam",
        fullText: "Sekitar jam 2 malam lebih sedikit, Pak. Saya ingat betul.",
      },
      statement_empty: {
        id: "statement_empty",
        speaker: "Pak Budi",
        summary: "Rumah sudah kosong sejak Bu Sari pergi",
        fullText:
          "Rumah itu seharusnya kosong. Tidak ada yang berani mendekatinya.",
      },
    },

    startNode: "start_case_1",
    nodes: {
      start_case_1: {
        type: "story",
        text: "Malam itu hujan deras mengguyur Perumahan Griya Asri. Rumah nomor 1A, yang sudah kosong selama 3 bulan terakhir, berdiri sunyi di ujung jalan. Cat putihnya mulai mengelupas, dan halaman depannya dipenuhi rumput liar yang tak terawat. Tapi tadi malam, sekitar pukul 2 dini hari, beberapa tetangga melaporkan ada cahaya aneh yang berkedip-kedip dari balik jendela lantai dua. Cahaya hijau terang yang tidak wajar.",
        next: "story_2",
      },

      story_2: {
        type: "story",
        text: "Kamu adalah Detektif Arga, seorang penyidik senior dari Kepolisian Daerah yang sudah menangani puluhan kasus aneh selama karirmu. Pagi ini, kamu berdiri di depan pagar rumah 1A yang berkarat. Angin dingin berhembus membawa bau tanah basah. Di sampingmu berdiri Pak Budi, penjaga kompleks perumahan berusia 50-an dengan seragam satpam yang sudah lusuh. Wajahnya terlihat lelah, seperti tidak tidur semalaman.",
        next: "dialog_intro",
      },

      dialog_intro: {
        type: "dialog",
        speaker: "Pak Budi",
        text: "Saya yang pertama kali melihatnya, Pak Detektif. Waktu itu saya sedang patroli malam seperti biasa. Tiba-tiba saya lihat cahaya hijau berkedip-kedip dari jendela lantai dua rumah ini. Bukan cahaya lampu biasa, Pak. Ini... berbeda. Seperti ada sesuatu yang hidup di dalamnya. Saya langsung merinding dan tidak berani mendekat sendirian.",
        next: "option_1",
      },

      option_1: {
        type: "option",
        choices: [
          {
            text: "Jam berapa tepatnya Anda melihat cahaya itu?",
            effect: { truth: 5 },
            next: "dialog_time",
          },
          {
            text: "Siapa pemilik rumah ini? Apakah ada yang tinggal di sini?",
            effect: { trust: 5 },
            next: "dialog_resident",
          },
          {
            text: "Mungkin hanya lampu rusak atau korsleting listrik.",
            effect: {},
            next: "dialog_dismiss",
          },
          {
            text: "[Tekan] Anda terlihat sangat ketakutan. Apa yang sebenarnya Anda sembunyikan?",
            effect: { truth: 10, pressure: 10 },
            requiresEmotion: ["nervous", "afraid", "anxious"],
            next: "dialog_pressure_1",
          },
          {
            text: "[Tenangkan] Saya percaya Anda. Ceritakan dengan tenang apa yang terjadi.",
            effect: { trust: 10 },
            requiresEmotion: ["calm", "happy"],
            next: "dialog_calm_1",
          },
        ],
      },

      dialog_time: {
        type: "dialog",
        speaker: "Pak Budi",
        text: "Sekitar jam 2 malam lebih sedikit, Pak. Saya ingat betul karena baru saja cek jam tangan sebelum mulai patroli rute ketiga. Cahayanya muncul tiba-tiba, berkedip-kedip selama beberapa menit, lalu padam. Tapi yang aneh, Pak... cahaya itu tidak seperti lampu biasa. Warnanya hijau terang, hampir seperti cahaya neon, tapi bergerak-gerak seperti ada kabut di dalamnya. Saya sudah 20 tahun jadi satpam, belum pernah lihat yang seperti itu.",
        recordStatement: "statement_time",
        next: "action_1",
      },

      dialog_resident: {
        type: "dialog",
        speaker: "Pak Budi",
        text: "Pemiliknya Bu Sari, Pak. Wanita paruh baya, tinggal sendirian. Orangnya pendiam, jarang keluar rumah. Tiga bulan lalu dia tiba-tiba pindah ke luar kota. Katanya ada urusan keluarga mendesak, tapi saya curiga ada yang tidak beres. Sebelum pergi, wajahnya pucat sekali, seperti orang ketakutan. Dia bahkan tidak sempat pamit ke tetangga lain. Sejak itu rumah ini kosong, tidak ada yang berani mendekatinya.",
        recordStatement: "statement_home",
        next: "action_1",
      },

      dialog_dismiss: {
        type: "dialog",
        speaker: "Pak Budi",
        text: "Bukan lampu rusak, Pak! Saya serius! Listrik rumah ini sudah diputus PLN sejak Bu Sari pindah. Tidak mungkin ada lampu yang menyala. Lagipula, cahaya itu... hidup, Pak. Bergerak-gerak seperti ada sesuatu di baliknya. Saya sudah 20 tahun kerja sebagai satpam di kompleks ini, sudah lihat banyak hal aneh. Tapi yang semalam itu... berbeda. Membuat bulu kuduk saya berdiri.",
        next: "action_1",
      },

      dialog_pressure_1: {
        type: "dialog",
        speaker: "Pak Budi",
        text: "Se-sembunyikan?! Tidak, Pak! Saya tidak menyembunyikan apa-apa! Tapi... baiklah, ada satu hal yang belum saya ceritakan. Sebenarnya, tiga hari sebelum Bu Sari pergi, saya melihat dia membawa peralatan aneh ke dalam rumah. Tabung-tabung besar, kabel-kabel tebal... seperti peralatan laboratorium. Waktu saya tanya, dia bilang itu untuk 'proyek pribadi'. Saya tidak mau ikut campur urusan penghuni, jadi saya diam saja. Sekarang saya menyesal tidak bertanya lebih jauh...",
        recordStatement: "statement_time",
        next: "action_1",
      },

      dialog_calm_1: {
        type: "dialog",
        speaker: "Pak Budi",
        text: "Terima kasih, Pak Detektif. Jarang ada yang mau dengar cerita saya sampai selesai. Sebenarnya, Bu Sari itu orang baik. Dia sering kasih saya kue kalau Lebaran. Tapi belakangan... dia berubah. Semakin jarang keluar, sering begadang sampai larut malam. Lampu di lantai dua menyala terus sampai subuh. Tetangga sempat komplain karena kadang terdengar suara berdengung dari rumahnya. Saya pikir dia punya hobi aneh. Tidak pernah saya sangka akan jadi seperti ini...",
        recordStatement: "statement_home",
        next: "action_1",
      },

      action_1: {
        type: "action",
        actions: ["believe", "doubt", "question"],
        result: {
          believe: {
            next: "dialog_action_trust",
            effect: { trust: 10, pressure: -5 },
          },
          doubt: {
            next: "dialog_action_doubt",
            effect: { trust: -5, pressure: 5 },
          },
          question: {
            next: "dialog_action_question",
            effect: { truth: 5 },
          },
        },
      },

      dialog_action_doubt: {
        type: "dialog",
        speaker: "Pak Budi",
        text: (state) => {
          const map = {
            angry:
              "Apa Bapak tidak percaya saya?! Saya sudah kerja di sini 20 tahun! Tanya saja tetangga lain kalau tidak percaya. Mereka juga ada yang lihat cahaya itu! Saya tidak mungkin berbohong soal hal seperti ini!",
            afraid:
              "Kenapa Bapak meragukan saya? Saya sudah tua, Pak, tidak ada gunanya saya berbohong. Yang saya lihat semalam itu nyata. Sampai sekarang saya masih gemetar kalau ingat cahaya itu...",
            nervous:
              "Saya mulai tidak nyaman dengan pertanyaan ini, Pak. Saya hanya melaporkan apa yang saya lihat. Kalau Bapak tidak percaya, silakan tanya warga lain. Beberapa dari mereka juga terbangun karena cahaya aneh itu...",
            anxious:
              "Saya hanya ingin ini cepat selesai, Pak. Sejak semalam saya tidak bisa tidur. Setiap kali memejamkan mata, bayangan cahaya hijau itu muncul lagi. Tolong selidiki rumah ini, Pak...",
            happy:
              "Saya pikir kita bisa bekerja sama dengan baik, Pak Detektif. Saya akan bantu apapun yang Bapak butuhkan. Yang penting kasus ini segera terungkap supaya warga bisa tenang lagi.",
            sad: "Saya hanya melakukan tugas saya sebagai penjaga kompleks, Pak. Kalau ada hal aneh, sudah kewajiban saya untuk melaporkan. Saya tidak mencari perhatian atau apa...",
            calm: "Silakan tanya siapa saja di kompleks ini, Pak. Saya yakin ada beberapa warga lain yang juga melihat cahaya itu. Saya tidak mungkin berhalusinasi sendirian.",
          };
          return map[state.emotion] || map.calm;
        },
        next: "story_investigate",
      },

      dialog_action_trust: {
        type: "dialog",
        speaker: "Pak Budi",
        text: "Terima kasih sudah percaya, Pak Detektif. Jarang ada orang yang mau mendengarkan cerita saya dengan serius. Sebenarnya ada satu hal lagi yang belum saya ceritakan... Semalam, selain cahaya hijau itu, saya juga mendengar suara aneh dari dalam rumah.",
        next: "dialog_sound",
      },

      dialog_action_question: {
        type: "dialog",
        speaker: "Pak Budi",
        text: "Sebenarnya, Pak... ada hal yang mengganjal tentang kepergian Bu Sari. Tiga bulan lalu, sebelum dia pindah, saya sering lihat mobil-mobil asing parkir di depan rumahnya malam-malam. Orang-orang berjas hitam keluar masuk membawa kotak-kotak besar. Bu Sari bilang itu urusan keluarga, tapi wajahnya ketakutan. Seminggu kemudian, dia pergi tanpa pamit. Yang aneh, dia tidak bawa banyak barang. Hampir semua perabotannya masih di dalam.",
        next: "story_investigate",
      },

      dialog_sound: {
        type: "dialog",
        speaker: "Pak Budi",
        text: "Suaranya seperti mesin, Pak. Berdengung pelan tapi konstan, seperti generator listrik tapi nadanya lebih tinggi. Suara itu datang dari bawah... dari basement rumah ini. Saya tahu rumah ini punya basement karena dulu pernah bantu Bu Sari angkat barang. Tapi sekarang, setelah dengar suara itu... saya tidak berani mendekat lagi.",
        next: "story_investigate",
      },

      story_investigate: {
        type: "story",
        text: "Setelah mendengar kesaksian Pak Budi, kamu memutuskan untuk masuk ke rumah 1A dan menyelidiki langsung. Dengan hati-hati, kamu mendorong pagar besi yang berkarat. Bunyi derit menggema di kesunyian pagi. Halaman rumah dipenuhi dedaunan kering dan rumput liar setinggi lutut. Pintu depan berwarna coklat tua, catnya mengelupas di beberapa bagian. Yang mengejutkan, pintu itu tidak terkunci. Gagang pintu berputar dengan mudah saat kamu memegangnya.",
        next: "story_inside",
      },

      story_inside: {
        type: "story",
        text: "Di dalam, kegelapan menyambutmu. Udara pengap dan berbau apak, seperti ruangan yang sudah lama tidak dibuka. Saat matamu mulai terbiasa dengan kegelapan, kamu melihat pemandangan yang aneh. Debu tebal menutupi semua furnitur—sofa, meja, rak buku—seperti salju abu-abu. Tapi di lantai, ada jejak kaki yang jelas. Jejak sepatu berukuran besar, masih segar, mengarah dari pintu depan ke sebuah pintu di bawah tangga. Pintu itu menuju ke basement. Kamu juga menyadari ada bau samar yang aneh... seperti bau ozon setelah petir menyambar.",
        collectEvidence: "neighbor_testimony",
        next: "option_2",
      },

      option_2: {
        type: "option",
        choices: [
          {
            text: "Ikuti jejak kaki ke basement. Itu jelas petunjuk penting.",
            effect: { truth: 15 },
            next: "dialog_basement",
          },
          {
            text: "Periksa lantai atas dulu. Cahaya hijau itu terlihat dari jendela lantai dua.",
            effect: { trust: 10 },
            next: "dialog_upstairs",
          },
          {
            text: "Ini terlalu berbahaya. Panggil backup dulu sebelum melanjutkan.",
            effect: { trust: 5, truth: 5 },
            next: "dialog_backup",
          },
          {
            text: "[Berani] Masuk langsung tanpa senter. Kegelapan tidak akan menghentikanku.",
            effect: { truth: 20, pressure: 15 },
            requiresEmotion: ["calm", "angry"],
            next: "dialog_brave",
          },
        ],
      },

      dialog_basement: {
        type: "dialog",
        speaker: "Narasi",
        text: "Kamu memutuskan untuk mengikuti jejak kaki ke basement. Dengan hati-hati, kamu menuruni tangga kayu yang berderit di setiap langkah. Semakin dalam kamu turun, semakin keras suara dengung yang terdengar. Seperti yang diceritakan Pak Budi, suaranya mirip mesin tapi dengan nada yang tidak wajar. Di dasar tangga, ada sebuah pintu besi berat. Dari celah bawah pintu, cahaya hijau terang merembes keluar, berkedip-kedip dengan ritme yang hampir hipnotis. Udara di sini terasa berbeda—lebih dingin, dan bau ozon semakin kuat.",
        next: "option_final",
      },

      dialog_upstairs: {
        type: "dialog",
        speaker: "Narasi",
        text: "Kamu memutuskan untuk memeriksa lantai atas terlebih dahulu. Tangga utama berderit keras saat kamu naik. Di lantai dua, kamu menemukan beberapa kamar yang tertutup. Di kamar paling ujung—kamar yang jendelanya menghadap jalan—kamu menemukan sesuatu yang mengejutkan. Dinding kamar dipenuhi foto-foto, diagram, dan catatan tulisan tangan. Ada foto-foto eksperimen ilmiah, rumus matematika yang kompleks, dan yang paling mencolok: gambar sketsa sebuah 'Portal Dimensi'. Di meja kerja, ada jurnal tebal dengan tulisan 'Proyek Gerbang - Dr. Sari Wijaya'. Bu Sari ternyata bukan wanita biasa.",
        next: "option_final",
      },

      dialog_backup: {
        type: "dialog",
        speaker: "Narasi",
        text: "Naluri profesionalmu mengatakan ini terlalu berbahaya untuk ditangani sendirian. Kamu mundur ke halaman depan dan menghubungi pusat untuk meminta backup. Sambil menunggu, kamu mengawasi rumah dari kejauhan. Lima menit berlalu dalam kesunyian yang menegangkan. Tiba-tiba, tanpa peringatan, ledakan dahsyat terdengar dari dalam rumah! Tanah bergetar di bawah kakimu. Dari jendela lantai dua, cahaya hijau terang meledak keluar seperti kilat, menerangi seluruh kompleks perumahan. Alarm mobil-mobil di sekitar berbunyi bersamaan. Sesuatu yang besar baru saja terjadi di basement rumah itu.",
        next: "option_final",
      },

      dialog_brave: {
        type: "dialog",
        speaker: "Narasi",
        text: "Tanpa ragu, kamu mematikan sentermu dan membiarkan kegelapan menyelimuti. Matamu perlahan terbiasa dengan gelap. Kamu mengandalkan insting dan pendengaranmu. Suara dengung membimbingmu ke arah basement. Di kegelapan total, kamu menemukan sesuatu yang tidak terlihat sebelumnya—garis-garis bercahaya di dinding, seperti sirkuit elektronik yang berdenyut lemah. Peta menuju sumber energi. Dengan mengikuti pola cahaya samar ini, kamu menemukan panel kontrol tersembunyi di balik tangga. Tombol darurat emergency shutdown berkedip merah. Ini mungkin cara mematikan apapun yang ada di bawah sana.",
        collectEvidence: "neighbor_testimony",
        next: "option_final",
      },

      option_final: {
        type: "option",
        choices: [
          {
            text: "Buka pintu basement sekarang! Harus tahu apa yang ada di baliknya.",
            effect: { truth: 10 },
            next: "ending",
          },
          {
            text: "Ini di luar kemampuanku. Evakuasi area dan laporkan ke pusat komando.",
            effect: { trust: 10 },
            next: "ending",
          },
        ],
      },

      ending: {
        type: "ending",
        conditions: [
          {
            id: "perfect_ending",
            text: "Dengan keberanian dan kebijaksanaan yang seimbang, kamu membuka pintu basement sambil meminta backup tetap siaga. Cahaya hijau menyilaukan matamu sesaat. Saat pandangan mulai jelas, kamu melihatnya—sebuah lingkaran energi raksasa melayang di tengah ruangan. Portal. Di pojok ruangan, kamu menemukan catatan terakhir Dr. Sari Wijaya beserta manual lengkap cara mematikan mesin. Dengan koordinasi tim yang sempurna, portal berhasil ditutup dengan aman. Yang mengejutkan, Dr. Sari Wijaya sendiri muncul dari balik portal—dia tidak mati, tapi terjebak di dimensi lain selama 3 bulan! Berkat penyelidikanmu yang cermat dan keputusan yang tepat, Bu Sari berhasil diselamatkan. Kasus ini menjadi terobosan ilmiah terbesar abad ini, dan namamu tercatat dalam sejarah sebagai detektif yang membuka pintu ke dimensi baru.",
            requires: {
              truth: 25,
              trust: 15,
            },
          },
          {
            id: "hero_ending",
            text: "Dengan keberanian yang tersisa, kamu membuka pintu basement. Cahaya hijau menyilaukan matamu sesaat. Saat pandangan mulai jelas, kamu melihatnya—sebuah lingkaran energi raksasa melayang di tengah ruangan, berputar perlahan seperti pusaran air. Portal. Di sekelilingnya, mesin-mesin canggih berkedip dan berdengung. Di pojok ruangan, kamu menemukan catatan terakhir Dr. Sari Wijaya: 'Jika seseorang membaca ini, tolong hentikan mesin utama. Eksperimen ini sudah di luar kendali.' Dengan petunjuk itu, kamu berhasil mematikan mesin dan menutup portal. Kasus terpecahkan—Bu Sari adalah ilmuwan yang mencoba membuka gerbang ke dimensi lain, dan eksperimennya hampir menghancurkan seluruh kompleks perumahan.",
            requires: {
              truth: 20,
            },
          },
          {
            id: "cautious_ending",
            text: "Kamu memutuskan bahwa keselamatan adalah prioritas utama. Dengan cepat, kamu mengevakuasi warga sekitar dan memasang garis polisi di sekeliling rumah 1A. Tim khusus dari Badan Tenaga Nuklir didatangkan setelah kamu melaporkan tentang kemungkinan eksperimen ilegal. Mereka menemukan laboratorium rahasia di basement dan berhasil mematikan mesin sebelum terjadi bencana. Bu Sari dinyatakan meninggal dalam eksperimen yang gagal. Meski kamu tidak langsung memecahkan kasus, keputusanmu yang hati-hati menyelamatkan nyawa banyak orang. Kamu dipuji sebagai detektif yang mengutamakan keselamatan publik.",
            requires: {
              trust: 20,
            },
          },
          {
            id: "dark_ending",
            text: "Tekanan dari atasan dan desakan warga membuatmu gegabah. Kamu memaksa masuk ke basement tanpa persiapan memadai. Saat pintu besi terbuka, gelombang energi dahsyat menyapu tubuhmu. Portal yang tidak stabil meledak, menghancurkan separuh rumah 1A. Kamu selamat, tapi terluka parah dan harus pensiun dini. Pak Budi yang ikut bersamamu tidak seberuntung itu—dia koma selama berbulan-bulan. Rumah 1A kini hanya puing-puing, dan rahasia Dr. Sari Wijaya terkubur selamanya di bawah reruntuhan. Kompleks Griya Asri ditinggalkan penduduknya, menjadi kampung mati yang dihindari semua orang.",
            requires: {
              pressure: 20,
            },
          },
          {
            id: "secret_ending",
            text: "Berkat bukti kesaksian tetangga yang kamu kumpulkan, kamu menyadari ada pola aneh—semua saksi melihat cahaya hijau di waktu yang berbeda-beda. Ini bukan portal biasa, tapi mesin waktu! Kamu memutuskan untuk masuk ke portal sebelum menutupnya. Di sisi lain, kamu bertemu Dr. Sari Wijaya versi muda, 30 tahun yang lalu, sedang memulai eksperimennya. Dengan hati-hati, kamu memperingatkannya tentang bahaya eksperimen ini. Dia mendengarkan. Saat kamu kembali ke masa kini, rumah 1A tidak pernah ada—sejarah telah berubah. Tidak ada yang ingat tentang kasus ini kecuali kamu. Di sakumu, kamu menemukan catatan terima kasih dari Dr. Sari: 'Terima kasih telah menyelamatkan masa depanku.'",
            requires: {
              truth: 15,
              collectedEvidence: ["neighbor_testimony"],
            },
          },
          {
            id: "bittersweet_ending",
            text: "Kamu berhasil menutup portal, tapi dengan harga yang mahal. Saat mesin utama dimatikan, ledakan kecil terjadi. Kamu terluka ringan, dan yang lebih menyakitkan—jurnal penelitian Dr. Sari Wijaya hancur total. Dunia tidak akan pernah tahu tentang penemuan luar biasa ini. Bu Sari sendiri ditemukan tewas di sisi lain portal, tubuhnya membeku dalam waktu. Kasus ini ditutup sebagai 'kecelakaan laboratorium ilegal'. Kamu mendapat penghargaan atas keberanianmu, tapi setiap malam kamu bertanya-tanya: bagaimana jika ada cara lain? Rahasia dimensi lain tetap menjadi misteri yang akan kamu bawa sampai mati.",
            requires: {
              truth: 10,
              trust: 10,
            },
          },
          {
            id: "ending_neutral",
            text: "Kamu membuka pintu basement dengan hati-hati, senter tinggi. Tapi yang kau temukan hanyalah ruangan kosong yang berdebu. Tidak ada mesin, tidak ada portal, tidak ada cahaya hijau. Hanya dinding beton dingin dan rak-rak kosong. Kamu berdiri di sana dalam kebingungan. Apakah semuanya hanya ilusi? Halusinasi massal? Fenomena alam yang aneh? Saat kembali ke lantai atas, matahari sudah mulai terbit. Rumah 1A terlihat biasa saja di bawah cahaya pagi. Kasus ini tetap menjadi misteri yang tidak terpecahkan. Tapi sesekali, saat patroli malam, Pak Budi masih melaporkan melihat kedipan hijau samar dari jendela lantai dua. Mungkin ada hal-hal di dunia ini yang memang tidak bisa dijelaskan.",
            default: true,
          },
        ],
      },
    },
  },
  case_murder_2: {
    meta: {
      title: "Mayat di Gudang Pelabuhan",
      slug: "mayat-di-gudang-pelabuhan",
      suspect: "Kapten Hendra",
      portrait: "portrait_kapten_hendra.png",
      description:
        "Seorang buruh pelabuhan ditemukan tewas di gudang nomor 7. Tubuhnya terikat tali tambang, wajahnya membiru. Siapa yang membunuh Joko Santoso dan apa motifnya?",
      chronology:
        "Joko Santoso ditemukan tewas di gudang pelabuhan pada malam hari. Tidak ada saksi mata, hanya tanda-tanda bahwa korban dibunuh dengan cara yang sangat brutal.",
    },

    evidences: [
      {
        id: "shipping_manifest",
        name: "Manifes Pengiriman Kapal",
        description:
          "Catatan pengiriman menunjukkan muatan ilegal yang tidak terdaftar",
        contradicts: ["statement_cargo"],
      },
      {
        id: "bloody_rope",
        name: "Tali Tambang Berdarah",
        description:
          "Tali dengan noda darah korban, ditemukan di dekat kapal Samudra Jaya",
        contradicts: ["statement_accident"],
      },
      {
        id: "witness_photo",
        name: "Foto dari Saksi Mata",
        description:
          "Foto yang menunjukkan Kapten Hendra di dekat gudang 7 jam 11 malam",
        contradicts: ["statement_alibi"],
      },
      {
        id: "phone_messages",
        name: "Pesan di Ponsel Korban",
        description: "Puluhan pesan mencurigakan dari nomor tidak dikenal",
        contradicts: ["statement_relationship"],
      },
    ],

    statements: {
      statement_alibi: {
        id: "statement_alibi",
        speaker: "Kapten Hendra",
        summary: "Kapten mengklaim berada di kapal sepanjang malam",
        fullText:
          "Semalam? Saya di kapal sepanjang malam, Pak. Setelah makan malam di warung dekat dermaga sekitar jam 8, saya kembali ke kapal dan tidak turun lagi sampai subuh.",
      },
      statement_relationship: {
        id: "statement_relationship",
        speaker: "Kapten Hendra",
        summary: "Hubungan dengan korban baik-baik saja",
        fullText: "Hubungan kami baik-baik saja, Pak. Tidak ada masalah.",
      },
      statement_cargo: {
        id: "statement_cargo",
        speaker: "Kapten Hendra",
        summary: "Muatan kapal adalah barang legal",
        fullText: "Kapal saya hanya mengangkut barang-barang legal, Pak.",
      },
      statement_accident: {
        id: "statement_accident",
        speaker: "Kapten Hendra",
        summary: "Kapten tidak tahu bagaimana korban meninggal",
        fullText:
          "Saya hanya menemukan mayatnya. Saya tidak tahu apa yang terjadi.",
      },
    },

    startNode: "start_case_2",
    nodes: {
      start_case_2: {
        type: "story",
        text: "Pelabuhan Tanjung Emas selalu ramai di pagi hari. Buruh-buruh angkut berlalu-lalang membawa peti kemas, klakson truk bersahut-sahutan, dan bau garam laut bercampur solar memenuhi udara. Tapi pagi ini, suasana berbeda. Gudang nomor 7 di ujung dermaga dikelilingi garis polisi kuning. Seorang pekerja pelabuhan ditemukan tewas di antara tumpukan peti kayu. Tubuhnya terikat tali tambang, wajahnya membiru. Ini bukan kecelakaan kerja biasa.",
        next: "story_2_case2",
      },

      story_2_case2: {
        type: "story",
        text: "Kamu tiba di lokasi bersama tim forensik. Mayat sudah dievakuasi, tapi bekas darah masih terlihat di lantai beton gudang. Korban bernama Joko Santoso, 35 tahun, buruh angkut yang sudah bekerja di pelabuhan selama 10 tahun. Menurut laporan awal, dia terakhir terlihat hidup sekitar jam 11 malam, saat shift malam dimulai. Di dekatmu berdiri Kapten Hendra, nahkoda kapal kargo 'Samudra Jaya' yang berlabuh tepat di depan gudang 7. Pria bertubuh besar dengan janggut lebat dan tato jangkar di lengannya. Matanya gelisah.",
        next: "dialog_intro_case2",
      },

      dialog_intro_case2: {
        type: "dialog",
        speaker: "Kapten Hendra",
        text: "Saya yang menemukan mayatnya, Pak Detektif. Tadi subuh, sekitar jam 5, saya turun dari kapal untuk mengecek muatan di gudang. Pintu gudang tidak terkunci, padahal seharusnya dikunci setelah jam 10 malam. Saya masuk dan... di sana dia. Tergeletak di antara peti-peti. Awalnya saya kira dia tidur, tapi saat saya dekati... Ya Tuhan, wajahnya biru. Tali tambang melilit lehernya. Saya langsung teriak minta tolong dan menelepon polisi.",
        next: "option_1_case2",
      },

      option_1_case2: {
        type: "option",
        choices: [
          {
            text: "Apa hubungan Anda dengan korban? Apakah Anda mengenalnya?",
            effect: { truth: 5 },
            next: "dialog_relationship_case2",
          },
          {
            text: "Apa yang Anda lakukan semalam antara jam 11 malam sampai subuh?",
            effect: { truth: 10 },
            next: "dialog_alibi_case2",
          },
          {
            text: "Apakah ada orang lain yang melihat Anda menemukan mayat?",
            effect: { trust: 5 },
            next: "dialog_witness_case2",
          },
          {
            text: "[Intimidasi] Saya tahu Anda berbohong. Tato jangkar itu... saya sudah lihat di CCTV!",
            effect: { truth: 15, pressure: 20 },
            requiresEmotion: ["nervous", "afraid"],
            next: "dialog_intimidate_case2",
          },
          {
            text: "[Empati] Anda pasti sangat terguncang menemukan mayat seperti itu. Mau cerita?",
            effect: { trust: 15 },
            requiresEmotion: ["sad", "calm"],
            next: "dialog_empathy_case2",
          },
        ],
      },

      dialog_relationship_case2: {
        type: "dialog",
        speaker: "Kapten Hendra",
        text: "Joko? Tentu saya kenal dia. Semua orang di pelabuhan ini kenal Joko. Dia buruh yang rajin, tidak pernah bikin masalah. Kami... pernah bekerja sama beberapa kali. Dia sering bantu bongkar muat kapal saya. Hubungan kami baik-baik saja, Pak. Tidak ada masalah. Tapi... belakangan ini dia agak aneh. Sering terlihat cemas, seperti ada yang dia sembunyikan. Saya pernah tanya, tapi dia bilang tidak apa-apa.",
        recordStatement: "statement_relationship",
        next: "action_1_case2",
      },

      dialog_alibi_case2: {
        type: "dialog",
        speaker: "Kapten Hendra",
        text: "Semalam? Saya di kapal sepanjang malam, Pak. Setelah makan malam di warung dekat dermaga sekitar jam 8, saya kembali ke kapal dan tidak turun lagi sampai subuh. Kru saya bisa jadi saksi. Kami main kartu di ruang kemudi sampai sekitar jam 1 malam, lalu saya tidur di kabin. Saya tidak dengar apa-apa sampai alarm bangun berbunyi jam 4.30. Setelah itu saya bersiap dan turun untuk cek gudang seperti biasa.",
        recordStatement: "statement_alibi",
        next: "action_1_case2",
      },

      dialog_witness_case2: {
        type: "dialog",
        speaker: "Kapten Hendra",
        text: "Ada pak petugas keamanan pelabuhan yang datang setelah saya teriak. Namanya Pak Darman, sudah tua, jaga malam di pos depan. Dia yang bantu saya menelepon polisi karena tangan saya gemetar. Tapi waktu saya pertama kali masuk gudang dan menemukan mayat... tidak ada siapa-siapa. Gudang itu sepi. Hanya saya dan... Joko. Atau apa yang tersisa darinya.",
        next: "action_1_case2",
      },

      dialog_intimidate_case2: {
        type: "dialog",
        speaker: "Kapten Hendra",
        text: "CCTV?! Tu-tunggu dulu, Pak! Saya... saya memang turun dari kapal sebentar malam itu, tapi bukan untuk membunuh siapa-siapa! Saya hanya... hanya pergi ke warung kopi sebentar. Tato ini? Banyak pelaut punya tato jangkar, Pak! Ini bukan bukti! Kenapa Bapak langsung menuduh saya?! Saya yang melaporkan kematian Joko! Kalau saya pembunuhnya, untuk apa saya repot-repot memanggil polisi?!",
        recordStatement: "statement_alibi",
        next: "action_1_case2",
      },

      dialog_empathy_case2: {
        type: "dialog",
        speaker: "Kapten Hendra",
        text: "Ya... saya memang sangat terguncang, Pak. Joko itu... dia sebenarnya lebih dari sekadar buruh biasa bagi saya. Dia sudah seperti adik sendiri. Dulu, waktu kapal saya nyaris bangkrut, Joko yang pertama menawarkan diri kerja tanpa bayaran dulu sampai usaha saya pulih. Orang seperti itu mana mungkin punya musuh? Tapi belakangan... dia memang berubah. Lebih pendiam, sering melamun. Kalau saya tanya, dia cuma bilang 'ada masalah keluarga'. Sekarang saya menyesal tidak mendesak lebih jauh.",
        recordStatement: "statement_relationship",
        next: "action_1_case2",
      },

      action_1_case2: {
        type: "action",
        actions: ["believe", "doubt", "question"],
        result: {
          believe: {
            next: "dialog_action_trust_case2",
            effect: { trust: 10, pressure: -5 },
          },
          doubt: {
            next: "dialog_action_doubt_case2",
            effect: { trust: -5, pressure: 10 },
          },
          question: {
            next: "dialog_action_question_case2",
            effect: { truth: 10 },
          },
        },
      },

      dialog_action_doubt_case2: {
        type: "dialog",
        speaker: "Kapten Hendra",
        text: (state) => {
          const map = {
            angry:
              "Apa maksud Bapak?! Bapak curiga saya yang membunuh Joko? Gila! Saya yang melaporkan kematiannya! Kalau saya pembunuhnya, untuk apa saya repot-repot memanggil polisi? Saya bisa saja pergi berlayar dan tidak ada yang tahu!",
            afraid:
              "Ke-kenapa Bapak meragukan saya? Saya hanya kebetulan menemukan mayatnya... Saya tidak tahu apa-apa soal pembunuhan ini. Tolong, Pak... saya tidak mau dituduh macam-macam. Saya punya keluarga di rumah...",
            nervous:
              "Saya tidak suka cara Bapak bertanya. Seperti saya ini tersangka. Saya hanya saksi, Pak. Saya menemukan mayat dan melaporkannya. Itu saja. Kalau Bapak mau cari pembunuh, cari di tempat lain.",
            anxious:
              "Bapak membuat saya tidak nyaman. Saya sudah ceritakan semua yang saya tahu. Mau apalagi? Saya harus kembali ke kapal. Ada jadwal berlayar yang harus saya kejar. Tidak bisa berlama-lama di sini...",
            happy:
              "Haha, Bapak bercanda ya? Saya kira kita sudah mulai akrab. Baiklah, silakan selidiki saya kalau mau. Saya tidak punya apa-apa untuk disembunyikan. Tapi Bapak buang-buang waktu saja.",
            sad: "Saya mengerti Bapak harus curiga pada semua orang. Itu tugas Bapak. Tapi saya benar-benar tidak terlibat dalam kematian Joko. Dia teman saya. Kenapa saya harus menyakitinya?",
            calm: "Silakan selidiki saya, Pak. Saya tidak keberatan. Semua kru kapal saya bisa jadi alibi. Tapi sementara Bapak sibuk menyelidiki saya, pembunuh sebenarnya mungkin sudah kabur jauh.",
          };
          return map[state.emotion] || map.calm;
        },
        next: "story_investigate_case2",
      },

      dialog_action_trust_case2: {
        type: "dialog",
        speaker: "Kapten Hendra",
        text: "Terima kasih sudah percaya, Pak Detektif. Jujur, saya sangat terguncang dengan kejadian ini. Joko orang baik. Tidak pantas mati seperti itu. Sebenarnya... ada sesuatu yang mungkin penting. Seminggu terakhir, Joko sering terlihat bertemu dengan orang-orang asing di gudang 7. Orang-orang yang bukan pekerja pelabuhan. Saya pernah tanya, tapi dia bilang bukan urusan saya. Sekarang saya menyesal tidak mendesak lebih jauh.",
        next: "dialog_secret_case2",
      },

      dialog_action_question_case2: {
        type: "dialog",
        speaker: "Kapten Hendra",
        text: "Sebenarnya, Pak... ada hal yang belum saya ceritakan. Malam itu, sekitar jam 11.30, saya memang turun dari kapal sebentar. Bukan ke gudang, tapi ke warung kopi di ujung dermaga. Saya tidak bisa tidur dan butuh udara segar. Di sana, saya lihat Joko sedang bicara dengan seseorang di bayang-bayang gudang 7. Orang itu pakai jaket hitam, wajahnya tidak terlihat. Mereka seperti sedang bertengkar. Saya tidak mau ikut campur, jadi saya kembali ke kapal. Sekarang saya menyesal tidak menghampiri mereka.",
        next: "story_investigate_case2",
      },

      dialog_secret_case2: {
        type: "dialog",
        speaker: "Kapten Hendra",
        text: "Orang-orang itu... mereka bukan pedagang biasa. Pakaian mereka terlalu rapi untuk urusan pelabuhan. Dan mereka selalu datang malam-malam, saat pengawasan longgar. Saya curiga mereka terlibat penyelundupan. Mungkin narkoba, mungkin barang ilegal lain. Dan Joko... mungkin dia terlibat terlalu dalam sampai tidak bisa keluar. Ini hanya dugaan saya, tapi di dunia pelabuhan, hal seperti itu bukan tidak mungkin.",
        next: "story_investigate_case2",
      },

      story_investigate_case2: {
        type: "story",
        text: "Kamu meninggalkan Kapten Hendra dan masuk ke gudang 7 untuk investigasi lebih lanjut. Gudang ini besar, dipenuhi tumpukan peti kayu dan kontainer besi. Bau amis darah masih tercium samar di udara. Tim forensik sudah menandai lokasi ditemukannya mayat dengan kapur putih. Di sekitar area itu, kamu menemukan beberapa barang yang menarik perhatian: potongan tali tambang yang sama dengan yang melilit leher korban, sebuah ponsel murah yang layarnya retak, dan yang paling mencurigakan—sebuah amplop coklat berisi uang tunai jutaan rupiah yang terselip di balik peti.",
        next: "story_evidence_case2",
      },

      story_evidence_case2: {
        type: "story",
        text: "Kamu memeriksa ponsel yang ditemukan. Layarnya retak tapi masih menyala. Di dalamnya, ada puluhan pesan dari nomor tidak dikenal. Pesannya singkat-singkat: 'Gudang 7, jam 11', 'Bawa barangnya', 'Jangan sampai ketahuan'. Pesan terakhir dikirim malam tadi, jam 10.45: 'Kita perlu bicara. Ada masalah.' Sepertinya Joko terlibat dalam sesuatu yang lebih besar dari sekadar pekerjaan buruh. Pertanyaannya, siapa yang mengirim pesan-pesan ini? Dan apa yang sebenarnya terjadi di gudang 7 malam itu?",
        collectEvidence: "phone_messages",
        next: "option_2_case2",
      },

      option_2_case2: {
        type: "option",
        choices: [
          {
            text: "Lacak nomor pengirim pesan di ponsel korban. Itu kunci utama.",
            effect: { truth: 15 },
            next: "dialog_trace_case2",
          },
          {
            text: "Interogasi kru kapal Kapten Hendra untuk verifikasi alibinya.",
            effect: { trust: 10 },
            next: "dialog_crew_case2",
          },
          {
            text: "Periksa rekaman CCTV pelabuhan malam tadi.",
            effect: { truth: 10, trust: 5 },
            next: "dialog_cctv_case2",
          },
          {
            text: "[Agresif] Geledah kapal Samudra Jaya sekarang juga tanpa surat perintah!",
            effect: { truth: 20, trust: -10, pressure: 15 },
            requiresEmotion: ["angry"],
            next: "dialog_raid_case2",
          },
        ],
      },

      dialog_trace_case2: {
        type: "dialog",
        speaker: "Narasi",
        text: "Kamu menghubungi tim cyber untuk melacak nomor pengirim pesan. Hasilnya mengejutkan—nomor itu terdaftar atas nama perusahaan fiktif yang alamatnya tidak ada. Tapi ada satu petunjuk: sinyal terakhir dari nomor itu terlacak di area pelabuhan, tepatnya di dekat kapal 'Samudra Jaya'. Kapal milik Kapten Hendra. Apakah ini kebetulan, atau ada hubungan yang lebih dalam antara Kapten Hendra dan jaringan misterius ini?",
        next: "option_final_case2",
      },

      dialog_crew_case2: {
        type: "dialog",
        speaker: "Narasi",
        text: "Kamu menaiki kapal 'Samudra Jaya' dan menginterogasi para kru satu per satu. Sebagian besar mengkonfirmasi alibi Kapten Hendra—dia memang bermain kartu dengan mereka sampai jam 1 malam. Tapi ada satu kru, pelaut muda bernama Andi, yang memberikan informasi berbeda. 'Kapten turun dari kapal sekitar jam 11.30, Pak,' katanya gugup. 'Saya lihat dari jendela kabin. Dia pergi ke arah gudang, bukan warung kopi. Kembali sekitar sejam kemudian. Bajunya... seperti ada noda gelap.' Andi terlihat ketakutan setelah mengatakannya.",
        next: "option_final_case2",
      },

      dialog_cctv_case2: {
        type: "dialog",
        speaker: "Narasi",
        text: "Kamu menuju pos keamanan pelabuhan dan meminta rekaman CCTV malam tadi. Pak Darman, petugas keamanan, memutar rekaman dengan tangan gemetar. Di layar, kamu melihat Joko masuk ke gudang 7 sekitar jam 11 malam. Sepuluh menit kemudian, seseorang menyusul—sosok besar dengan jaket tebal yang menutupi wajahnya. Mereka bicara, lalu tiba-tiba sosok itu menyerang Joko. Perkelahian singkat, lalu Joko jatuh. Sosok itu menyeretnya ke dalam dan tidak terlihat lagi. Tapi ada satu frame yang menunjukkan kilatan tato jangkar di pergelangan tangan penyerang.",
        next: "option_final_case2",
      },

      dialog_raid_case2: {
        type: "dialog",
        speaker: "Narasi",
        text: "Tanpa menunggu surat perintah, kamu memimpin tim langsung ke kapal Samudra Jaya. Kapten Hendra terkejut dan marah, tapi tidak bisa berbuat banyak. Di dalam kabin kapten, kamu menemukan brankas tersembunyi di bawah lantai. Di dalamnya: tumpukan uang tunai, beberapa paspor palsu, dan yang paling penting—sarung tangan berlumuran darah yang tersimpan dalam kantong plastik. Kapten Hendra memucat. 'Tu-tunggu, Pak! Itu bukan milik saya! Ada yang menjebak saya!' Tapi ekspresi wajahnya mengatakan sebaliknya.",
        collectEvidence: "bloody_rope",
        next: "option_final_case2",
      },

      option_final_case2: {
        type: "option",
        choices: [
          {
            text: "Tangkap Kapten Hendra sekarang! Bukti sudah cukup kuat.",
            effect: { truth: 15 },
            next: "ending_case2",
          },
          {
            text: "Kumpulkan lebih banyak bukti dulu. Jangan sampai salah tangkap.",
            effect: { trust: 15 },
            next: "ending_case2",
          },
          {
            text: "[Negosiasi] Tawarkan plea bargain—dia mengaku, kita dapat nama bosnya.",
            effect: { truth: 10, trust: 10 },
            requiresEmotion: ["calm", "nervous"],
            next: "ending_case2",
          },
        ],
      },

      ending_case2: {
        type: "ending",
        conditions: [
          {
            id: "perfect_ending",
            text: "Dengan kombinasi bukti kuat dan pendekatan yang tepat, kamu tidak hanya menangkap Kapten Hendra, tapi juga membongkar seluruh jaringan penyelundupan internasional. Rekaman CCTV, kesaksian Andi, dan pelacakan nomor telepon membentuk kasus yang tidak terbantahkan. Kapten Hendra mengaku dan memberikan nama-nama bosnya sebagai plea bargain. Operasi gabungan polisi dan TNI AL berhasil menangkap 15 orang sindikat dan menyita barang bukti senilai miliaran rupiah. Keluarga Joko Santoso mendapat keadilan dan kompensasi. Kamu dianugerahi Bintang Bhayangkara dan ditawarkan posisi di Interpol. Pelabuhan Tanjung Emas kini lebih bersih dari sebelumnya.",
            requires: {
              truth: 30,
              trust: 15,
            },
          },
          {
            id: "hero_ending",
            text: "Dengan bukti yang terkumpul—rekaman CCTV, kesaksian Andi, dan pelacakan nomor telepon—kamu menghadapi Kapten Hendra di kapalnya. Awalnya dia menyangkal, tapi saat kamu tunjukkan foto tato jangkarnya yang terekam CCTV, dia akhirnya runtuh. 'Joko tahu terlalu banyak,' akunya dengan suara parau. 'Dia mengancam akan melaporkan bisnis penyelundupan kami ke polisi. Saya tidak bermaksud membunuhnya... tapi dia terus melawan.' Kapten Hendra ditangkap dan jaringan penyelundupan di pelabuhan akhirnya terbongkar. Kasus selesai.",
            requires: {
              truth: 25,
            },
          },
          {
            id: "cautious_ending",
            text: "Kamu memutuskan untuk membangun kasus yang lebih kuat sebelum bertindak. Dengan kesabaran, kamu mengumpulkan lebih banyak bukti dan saksi. Prosesnya memakan waktu berminggu-minggu, tapi hasilnya solid. Kapten Hendra ditangkap di tengah laut oleh tim gabungan saat mencoba melarikan diri. Bukti yang kamu kumpulkan tidak terbantahkan di pengadilan—dia divonis 20 tahun penjara. Meski lambat, keadilan tetap ditegakkan. Keluarga Joko bersyukur atas ketekunanmu.",
            requires: {
              trust: 25,
            },
          },
          {
            id: "dark_ending",
            text: "Tekanan untuk segera menyelesaikan kasus membuatmu ceroboh. Kamu menuduh Kapten Hendra secara terbuka tanpa bukti cukup. Dia menggugat balik atas pencemaran nama baik dan menang. Karirmu hancur—kamu dicopot dari jabatan dan menjadi bahan tertawaan media. Yang lebih buruk, pembunuh sebenarnya—Andi, kru muda yang memberikan kesaksian palsu—berhasil kabur dengan membawa rahasia. Dia-lah yang membunuh Joko karena utang judi, dan sengaja menjebak Kapten Hendra. Kamu tidak pernah bisa memaafkan dirimu sendiri atas kebodohan ini.",
            requires: {
              pressure: 25,
            },
          },
          {
            id: "secret_ending",
            text: "Analisis mendalam terhadap pesan di ponsel korban mengungkap kebenaran mengejutkan: Joko Santoso adalah agen penyamaran dari BNN yang sedang menginvestigasi penyelundupan narkoba! Kamu segera menghubungi BNN dan bekerja sama dalam operasi rahasia. Kapten Hendra ditangkap saat transaksi besar, bersama dengan bandar narkoba lintas negara. Misi Joko tidak sia-sia—jaringan narkoba internasional yang dia selidiki selama dua tahun akhirnya tumbang. Namanya diabadikan sebagai pahlawan yang gugur dalam tugas, dan kamu menjadi bagian dari kisah kepahlawanannya.",
            requires: {
              truth: 20,
              collectedEvidence: ["phone_messages"],
            },
          },
          {
            id: "tragic_ending",
            text: "Kamu berhasil menangkap Kapten Hendra, tapi kebenaran yang terungkap di pengadilan menghancurkan hatimu. Joko Santoso ternyata bukan korban yang tidak bersalah—dia adalah pemerasan yang mengancam keluarga Kapten Hendra. Istrinya sakit keras dan butuh biaya pengobatan. Joko mengancam akan membocorkan penyelundupan kecil-kecilan yang Kapten lakukan untuk biaya rumah sakit, kecuali dibayar mahal. Dalam keputusasaan, Kapten Hendra kehilangan kendali. Di pengadilan, hakim memberikan keringanan hukuman. Kamu menyadari bahwa tidak semua kasus memiliki jawaban hitam-putih.",
            requires: {
              truth: 15,
              trust: 20,
            },
          },
          {
            id: "conspiracy_ending",
            text: "Semakin dalam kamu menyelidiki, semakin berbahaya situasinya. Ternyata pelabuhan ini dikendalikan oleh kartel yang punya orang dalam di kepolisian. Saat kamu hampir membongkar semuanya, kamu diserang di malam hari. Beruntung kamu selamat, tapi semua bukti hilang—dicuri. Kapten Hendra ditemukan tewas di selnya, 'bunuh diri' kata laporan resmi. Kamu tahu ada konspirasi besar yang menutupi kebenaran. Kamu mengundurkan diri dari kepolisian dan menjadi jurnalis investigasi, bertekad untuk suatu hari mengungkap seluruh jaringan korup ini.",
            requires: {
              pressure: 15,
              truth: 10,
            },
          },
          {
            id: "ending_neutral",
            text: "Penyelidikan berjalan lambat. Bukti yang ada tidak cukup kuat untuk menahan siapapun. Kapten Hendra mengklaim alibinya solid, dan tanpa bukti fisik yang menghubungkannya langsung ke pembunuhan, jaksa menolak untuk melanjutkan kasus. Gudang 7 kembali beroperasi seperti biasa. Joko Santoso dikuburkan dengan tenang, kematiannya dicatat sebagai 'korban kekerasan oleh pelaku tidak dikenal'. Tapi kamu tahu ada yang tidak beres. Seseorang di pelabuhan ini adalah pembunuh, dan dia masih bebas berkeliaran. Kasus ini menghantui pikiranmu setiap kali melihat kapal berlayar di cakrawala.",
            default: true,
          },
        ],
      },
    },
  },

  case_murder_3: {
    meta: {
      title: "Tragedi di Gedung Teater Tua",
      slug: "tragedi-di-gedung-teater-tua",
      suspect: "Nyonya Ratna",
      portrait: "portrait_nyonya_ratna.png",
      description:
        "Aktor legendaris Tuan Baskara ambruk di atas panggung saat pertunjukan opera. Racun sianida ditemukan dalam darahnya. Siapa yang berani membunuh legenda panggung?",
      chronology:
        "Tuan Baskara tewas saat pertunjukan opera di gedung teater tua. Tidak ada saksi mata, hanya tanda-tanda bahwa korban diberi racun sianida.",
    },

    evidences: [
      {
        id: "theater_ticket",
        name: "Tiket Pertunjukan Malam Itu",
        description: "Tiket kursi VIP yang tidak pernah digunakan",
        contradicts: ["statement_attendance"],
      },
      {
        id: "poison_bottle",
        name: "Botol Racun Kosong",
        description: "Botol kecil berisi sisa sianida, ditemukan di ruang prop",
        contradicts: ["statement_drink"],
      },
      {
        id: "love_letter",
        name: "Surat Cinta Tersembunyi",
        description: "Surat-surat cinta penuh ancaman dari Maya untuk Baskara",
        contradicts: ["statement_relationship"],
      },
      {
        id: "cctv_backstage",
        name: "Rekaman CCTV Backstage",
        description:
          "Rekaman menunjukkan Lina masuk ke ruang prop sebelum pertunjukan",
        contradicts: ["statement_access"],
      },
    ],

    statements: {
      statement_relationship: {
        id: "statement_relationship",
        speaker: "Nyonya Ratna",
        summary: "Hubungan dengan suami baik-baik saja",
        fullText: "Baskara tidak punya musuh. Semua orang mencintainya.",
      },
      statement_drink: {
        id: "statement_drink",
        speaker: "Nyonya Ratna",
        summary: "Baskara hanya minum teh yang disiapkan Lina",
        fullText:
          "Sebelum pertunjukan, Baskara hanya minum teh hangat di ruang ganti. Tehnya disediakan oleh asisten pribadinya, Mbak Lina.",
      },
      statement_attendance: {
        id: "statement_attendance",
        speaker: "Nyonya Ratna",
        summary: "Nyonya Ratna menonton dari kursi VIP",
        fullText: "Saya menonton dari kursi VIP seperti biasa.",
      },
      statement_access: {
        id: "statement_access",
        speaker: "Lina",
        summary: "Lina mengaku tidak masuk ke ruang prop",
        fullText:
          "Saya hanya mengambil perlengkapan makeup, tidak ke ruang prop.",
      },
    },

    startNode: "start_case_3",
    nodes: {
      start_case_3: {
        type: "story",
        text: "Gedung Teater Mutiara berdiri megah di jantung kota tua. Bangunan bergaya kolonial ini sudah berusia lebih dari seratus tahun, menyimpan ribuan cerita di balik tirai merahnya yang beludru. Malam tadi, teater ini menjadi saksi bisu sebuah tragedi. Di tengah pertunjukan opera 'Carmen', aktor utama—Tuan Baskara, 55 tahun, legenda panggung yang namanya dikenal seantero negeri—tiba-tiba ambruk di atas panggung. Penonton awalnya mengira itu bagian dari akting. Tapi saat tubuhnya tidak bergerak dan busa putih keluar dari mulutnya, semua orang sadar: ini bukan sandiwara.",
        next: "story_2_case3",
      },

      story_2_case3: {
        type: "story",
        text: "Kamu tiba di lokasi saat matahari mulai terbit. Gedung teater masih dikelilingi mobil polisi dan ambulans. Penonton sudah dievakuasi semalam, tapi para pemain dan kru teater masih ditahan untuk diinterogasi. Di lobi teater yang dipenuhi poster-poster pertunjukan lama, kamu bertemu dengan Nyonya Ratna—istri korban sekaligus produser pertunjukan. Wanita anggun berusia 50-an dengan gaun hitam dan mata sembab. Dia memegang sapu tangan sutra yang sudah basah oleh air mata. Di jarinya, cincin berlian berkilau di bawah lampu kristal.",
        next: "dialog_intro_case3",
      },

      dialog_intro_case3: {
        type: "dialog",
        speaker: "Nyonya Ratna",
        text: "Pak Detektif... terima kasih sudah datang. Saya masih tidak percaya dengan apa yang terjadi. Baskara... suami saya... dia meninggal di atas panggung yang dia cintai seumur hidupnya. Ironis, bukan? Dia selalu bilang ingin mati di atas panggung, tapi bukan seperti ini. Bukan diracun seperti binatang. Siapapun yang melakukan ini... mereka harus membayar. Baskara tidak punya musuh. Semua orang mencintainya.",
        next: "option_1_case3",
      },

      option_1_case3: {
        type: "option",
        choices: [
          {
            text: "Bagaimana kondisi suami Anda sebelum pertunjukan dimulai?",
            effect: { truth: 5 },
            next: "dialog_condition_case3",
          },
          {
            text: "Apakah ada orang yang mungkin menyimpan dendam pada suami Anda?",
            effect: { truth: 10 },
            next: "dialog_enemies_case3",
          },
          {
            text: "Apa yang suami Anda makan atau minum sebelum tampil?",
            effect: { trust: 5 },
            next: "dialog_food_case3",
          },
          {
            text: "[Tuduhan] Anda mewarisi semua hartanya, bukan? Motif yang sempurna.",
            effect: { truth: 15, trust: -15, pressure: 20 },
            requiresEmotion: ["angry", "nervous"],
            next: "dialog_accuse_case3",
          },
          {
            text: "[Simpati] Saya turut berduka. Pasti berat kehilangan orang tercinta.",
            effect: { trust: 15 },
            requiresEmotion: ["sad", "calm"],
            next: "dialog_sympathy_case3",
          },
        ],
      },

      dialog_condition_case3: {
        type: "dialog",
        speaker: "Nyonya Ratna",
        text: "Baskara dalam kondisi prima, Pak. Tidak ada tanda-tanda sakit. Dia bahkan sangat bersemangat malam itu karena ada kritikus terkenal dari Jakarta yang datang menonton. Sebelum naik panggung, dia mencium kening saya seperti biasa dan berkata, 'Doakan aku, sayang. Malam ini akan jadi pertunjukan terbaik.' Lalu dia masuk ke ruang ganti untuk bersiap. Itu... terakhir kali saya bicara dengannya. Saat dia naik panggung, semuanya terlihat normal. Sampai babak kedua, saat dia minum dari piala prop dan tiba-tiba kejang...",
        next: "action_1_case3",
      },

      dialog_enemies_case3: {
        type: "dialog",
        speaker: "Nyonya Ratna",
        text: "Musuh? Baskara? Tidak mungkin, Pak! Semua orang menghormatinya. Dia mentor bagi banyak aktor muda. Tapi... kalau Bapak memaksa, ada beberapa nama yang mungkin perlu diperiksa. Pertama, ada Dimas—pemeran cadangan yang selalu ingin menggantikan posisi Baskara. Anak muda ambisius yang kadang terlalu ambisius. Kedua, ada Pak Wiryo, mantan manajer teater yang dipecat Baskara tahun lalu karena korupsi. Dan ketiga... ini mungkin tidak penting, tapi Baskara pernah menyebut ada seseorang yang mengancamnya lewat surat. Dia tidak mau cerita detailnya.",
        next: "action_1_case3",
      },

      dialog_food_case3: {
        type: "dialog",
        speaker: "Nyonya Ratna",
        text: "Sebelum pertunjukan, Baskara hanya minum teh hangat di ruang ganti. Itu kebiasaannya untuk menjaga suara. Tehnya disediakan oleh asisten pribadinya, Mbak Lina, yang sudah bekerja untuk kami selama 15 tahun. Tidak mungkin dia yang meracuni. Selain itu, Baskara tidak makan apa-apa—dia selalu berpuasa sebelum pertunjukan besar. Racun itu... pasti masuk saat dia di atas panggung. Piala yang dia minum saat adegan perjamuan... ada yang menaruh racun di sana. Tapi siapa yang punya akses ke prop teater?",
        recordStatement: "statement_drink",
        next: "action_1_case3",
      },

      dialog_accuse_case3: {
        type: "dialog",
        speaker: "Nyonya Ratna",
        text: "APA?! Berani-beraninya Bapak menuduh saya?! Suami saya baru saja meninggal dan Bapak sudah memikirkan soal harta?! Ya, saya mewarisi semuanya—karena saya ISTRINYA! 25 tahun pernikahan! Bapak pikir saya membunuh cinta sejati saya demi uang?! Saya sudah kaya sejak sebelum menikah dengan Baskara! Keluarga saya pemilik pabrik tekstil terbesar di Jawa! Kalau Bapak mau mencari pembunuh, cari di tempat lain! Bukan di rumah janda yang sedang berduka!",
        next: "action_1_case3",
      },

      dialog_sympathy_case3: {
        type: "dialog",
        speaker: "Nyonya Ratna",
        text: "Terima kasih, Pak Detektif... Anda orang pertama yang bicara seperti itu sejak semalam. Semua orang hanya bertanya soal penyelidikan, bukti, tersangka... tidak ada yang peduli bahwa saya baru saja kehilangan separuh jiwa saya. Baskara itu... dia bukan hanya suami. Dia sahabat, partner, segalanya. Kami melewati begitu banyak hal bersama. Masa-masa sulit di awal karir, keguguran pertama kami, kesuksesan pertamanya di Broadway... Sekarang saya harus menghadapi semua ini sendirian.",
        recordStatement: "statement_relationship",
        next: "action_1_case3",
      },

      action_1_case3: {
        type: "action",
        actions: ["believe", "doubt", "question"],
        result: {
          believe: {
            next: "dialog_action_trust_case3",
            effect: { trust: 10, pressure: -5 },
          },
          doubt: {
            next: "dialog_action_doubt_case3",
            effect: { trust: -10, pressure: 15 },
          },
          question: {
            next: "dialog_action_question_case3",
            effect: { truth: 10 },
          },
        },
      },

      dialog_action_doubt_case3: {
        type: "dialog",
        speaker: "Nyonya Ratna",
        text: (state) => {
          const map = {
            angry:
              "Apa maksud Bapak?! Bapak mencurigai saya?! Suami saya baru saja meninggal dan Bapak berani menuduh saya?! Kami sudah menikah 25 tahun! Saya mencintainya lebih dari apapun di dunia ini! Bagaimana bisa Bapak berpikir saya yang membunuhnya?!",
            afraid:
              "Ke-kenapa Bapak menatap saya seperti itu? Apa ada yang salah dengan jawaban saya? Saya hanya istri yang baru kehilangan suami... Tolong jangan curigai saya, Pak. Saya tidak sanggup menanggung tuduhan seperti itu di atas kesedihan ini...",
            nervous:
              "Bapak membuat saya gugup dengan pertanyaan-pertanyaan seperti ini. Saya sudah ceritakan semua yang saya tahu. Apa lagi yang Bapak inginkan? Mau periksa rekening bank saya? Silakan. Saya tidak punya alasan untuk membunuh suami sendiri.",
            anxious:
              "Saya merasa tidak nyaman, Pak. Seharusnya Bapak mencari pembunuh yang sebenarnya, bukan menginterogasi janda yang sedang berduka. Waktu terus berjalan dan siapapun yang melakukan ini bisa saja sudah kabur sekarang.",
            happy:
              "Saya mengerti Bapak harus curiga pada semua orang, termasuk saya. Itu profesionalisme. Tapi percayalah, saya tidak mungkin menyakiti Baskara. Dia adalah segalanya bagi saya. Hidup saya tidak akan sama lagi tanpanya.",
            sad: "Bapak boleh meragukan saya... Semua orang juga pasti berpikir istri adalah tersangka pertama. Tapi saya bersumpah demi Tuhan, saya tidak membunuh suami saya. Dia cinta pertama dan terakhir saya. Kehilangannya... menghancurkan saya.",
            calm: "Silakan selidiki saya, Pak Detektif. Saya tidak akan menghalangi pekerjaan Bapak. Periksa semua yang perlu diperiksa. Saya yakin pada akhirnya kebenaran akan terungkap, dan nama saya akan bersih.",
          };
          return map[state.emotion] || map.calm;
        },
        next: "story_investigate_case3",
      },

      dialog_action_trust_case3: {
        type: "dialog",
        speaker: "Nyonya Ratna",
        text: "Terima kasih atas pengertian Bapak. Ini masa yang sangat berat bagi saya. Sebenarnya... ada sesuatu yang belum saya ceritakan karena malu. Belakangan ini, hubungan saya dengan Baskara agak... renggang. Bukan karena pertengkaran, tapi karena dia terlalu sibuk dengan teater. Hampir tidak punya waktu untuk saya. Tapi itu bukan alasan untuk... Tidak, tidak mungkin saya menyakitinya. Meski kami jarang bicara, cinta saya padanya tidak pernah berkurang.",
        recordStatement: "statement_relationship",
        next: "dialog_confession_case3",
      },

      dialog_action_question_case3: {
        type: "dialog",
        speaker: "Nyonya Ratna",
        text: "Sebenarnya, Pak... ada hal yang mengganggu pikiran saya. Seminggu sebelum kejadian, saya menemukan surat di laci meja Baskara. Surat cinta. Bukan dari saya. Tulisannya feminin, dan isinya... sangat intim. Saya tidak tahu siapa pengirimnya karena tidak ada nama. Saya terlalu takut untuk bertanya pada Baskara. Mungkin dia punya... hubungan dengan wanita lain. Mungkin wanita itu ada hubungannya dengan kematiannya. Atau mungkin suami wanita itu yang marah. Saya tidak tahu lagi, Pak.",
        next: "story_investigate_case3",
      },

      dialog_confession_case3: {
        type: "dialog",
        speaker: "Nyonya Ratna",
        text: "Ada satu hal lagi yang mungkin penting. Malam sebelum pertunjukan, saya melihat Baskara bertemu seseorang di taman belakang teater. Seorang wanita muda berambut panjang. Mereka bicara lama, dan di akhir percakapan... wanita itu memeluk Baskara. Saya tidak berani konfrontasi karena takut mengganggu konsentrasinya sebelum show. Sekarang saya menyesal tidak bertanya. Wanita itu mungkin kunci dari semua ini.",
        next: "story_investigate_case3",
      },

      story_investigate_case3: {
        type: "story",
        text: "Kamu meninggalkan Nyonya Ratna dan berjalan ke belakang panggung untuk investigasi. Teater ini seperti labirin—lorong-lorong sempit menghubungkan ruang ganti, gudang kostum, dan area teknis. Bau bedak panggung dan parfum lama bercampur di udara. Di ruang prop, kamu menemukan piala yang digunakan dalam adegan perjamuan. Tim forensik sudah mengambil sampelnya—positif mengandung sianida dosis tinggi. Cukup untuk membunuh dalam hitungan menit. Siapapun pelakunya, dia tahu persis kapan dan bagaimana Baskara akan minum dari piala itu.",
        next: "story_backstage_case3",
      },

      story_backstage_case3: {
        type: "story",
        text: "Di ruang ganti Tuan Baskara, kamu menemukan bukti-bukti menarik. Sebuah foto lama menunjukkan Baskara muda bersama seorang wanita yang bukan Nyonya Ratna—wanita cantik dengan mata tajam dan senyum misterius. Di belakang foto, ada tulisan: 'Untuk cinta pertamaku - Maya, 1995'. Selain itu, ada beberapa surat yang disembunyikan di balik cermin rias. Surat-surat dengan tulisan tangan yang sama, penuh kata-kata cinta dan... ancaman. 'Jika kau tidak bisa menjadi milikku, tidak ada yang boleh memilikimu.' Tanggal surat terakhir: tiga hari yang lalu.",
        collectEvidence: "love_letter",
        next: "option_2_case3",
      },

      option_2_case3: {
        type: "option",
        choices: [
          {
            text: "Cari tahu siapa Maya dan di mana dia sekarang.",
            effect: { truth: 15 },
            next: "dialog_maya_case3",
          },
          {
            text: "Interogasi Dimas, pemeran cadangan yang ambisius.",
            effect: { trust: 10 },
            next: "dialog_dimas_case3",
          },
          {
            text: "Periksa siapa saja yang punya akses ke ruang prop malam itu.",
            effect: { truth: 5, trust: 10 },
            next: "dialog_access_case3",
          },
          {
            text: "[Provokasi] Konfrontasi Lina langsung—tunjukkan foto Maya dan lihat reaksinya!",
            effect: { truth: 20, pressure: 15 },
            requiresEmotion: ["angry", "anxious"],
            next: "dialog_confront_lina_case3",
          },
        ],
      },

      dialog_maya_case3: {
        type: "dialog",
        speaker: "Narasi",
        text: "Penyelidikan mengungkap bahwa Maya adalah aktris yang pernah bermain bersama Baskara 30 tahun lalu. Mereka pernah terlibat hubungan asmara sebelum Baskara menikahi Ratna. Maya menghilang dari dunia teater setelah patah hati, tapi catatan imigrasi menunjukkan dia kembali ke Indonesia dua bulan lalu setelah tinggal di luar negeri selama puluhan tahun. Yang lebih mengejutkan: Maya adalah ibu kandung dari Lina—asisten pribadi Baskara yang menyiapkan tehnya setiap malam. Puzzle mulai terbentuk.",
        next: "option_final_case3",
      },

      dialog_dimas_case3: {
        type: "dialog",
        speaker: "Narasi",
        text: "Kamu menemukan Dimas di balkon teater, merokok dengan tangan gemetar. Pria muda berusia 28 tahun dengan wajah tampan tapi mata yang gelisah. Saat diinterogasi, dia mengaku memang menginginkan peran utama, tapi tidak sampai membunuh. 'Saya mengagumi Tuan Baskara,' katanya. 'Dia guru saya. Tapi... ada yang perlu Bapak tahu. Malam itu, saya lihat seseorang menyelinap ke ruang prop sebelum pertunjukan. Wanita berambut panjang. Saya kira dia bagian dari kru, jadi tidak saya tegur. Sekarang saya menyesal tidak memperhatikan lebih jelas.'",
        next: "option_final_case3",
      },

      dialog_access_case3: {
        type: "dialog",
        speaker: "Narasi",
        text: "Daftar orang yang punya akses ke ruang prop sangat terbatas: manajer panggung, tim prop (3 orang), dan asisten pribadi para aktor. Dari pemeriksaan CCTV backstage, kamu melihat Lina—asisten Baskara—masuk ke ruang prop setengah jam sebelum pertunjukan. Dia membawa sesuatu di tangannya, tapi kamera tidak cukup jelas untuk melihat apa. Saat ditanya, Lina mengaku hanya mengambil perlengkapan makeup. Tapi matanya berkedip cepat—tanda klasik kebohongan.",
        collectEvidence: "cctv_backstage",
        next: "option_final_case3",
      },

      dialog_confront_lina_case3: {
        type: "dialog",
        speaker: "Narasi",
        text: "Kamu menemukan Lina di ruang ganti dan langsung menunjukkan foto Maya. Reaksinya luar biasa—wajahnya memucat, tangannya gemetar, dan air mata langsung mengalir. 'Ba-bagaimana Bapak bisa dapat foto itu?!' teriaknya. 'Itu... itu ibu saya! Ya, Maya adalah ibu kandung saya! Tapi saya tidak membunuh Tuan Baskara! Ibu memang marah padanya, tapi dia tidak pernah minta saya melakukan hal seperti itu!' Lina jatuh terduduk, menangis histeris. Ini informasi besar—tapi apakah dia berbohong atau benar-benar tidak bersalah?",
        collectEvidence: "love_letter",
        next: "option_final_case3",
      },

      option_final_case3: {
        type: "option",
        choices: [
          {
            text: "Tangkap Lina dan konfrontasi dengan bukti tentang Maya!",
            effect: { truth: 15 },
            next: "ending_case3",
          },
          {
            text: "Periksa lebih dalam motivasi Nyonya Ratna—cemburu bisa menjadi motif kuat.",
            effect: { trust: 10 },
            next: "ending_case3",
          },
          {
            text: "[Kasihan] Beri Lina kesempatan mengunjungi ibunya yang sekarat dulu.",
            effect: { trust: 20, truth: 5 },
            requiresEmotion: ["sad", "calm"],
            next: "ending_case3",
          },
          {
            text: "[Keras] Tangkap semua tersangka sekaligus—Lina, Dimas, dan Ratna!",
            effect: { truth: 5, trust: -10, pressure: 20 },
            requiresEmotion: ["angry"],
            next: "ending_case3",
          },
        ],
      },

      ending_case3: {
        type: "ending",
        conditions: [
          {
            id: "perfect_ending",
            text: "Kecermatanmu membuahkan hasil sempurna. Tidak hanya Lina yang tertangkap, tapi kamu juga berhasil mengungkap jaringan pemerasan yang lebih besar. Ternyata Pak Wiryo—mantan manajer teater—memanfaatkan dendam Maya dan Lina untuk menyingkirkan Baskara. Dia-lah dalang di balik semua ini, menyediakan racun dan merencanakan waktu eksekusi. Dengan kesaksian Lina dan bukti rekaman CCTV, Wiryo divonis hukuman mati. Lina mendapat keringanan karena statusnya sebagai korban manipulasi. Nyonya Ratna, meski hancur hatinya, akhirnya mendapat closure. Gedung Teater Mutiara mengadakan pertunjukan penghormatan terakhir untuk Tuan Baskara, dan kamu diundang sebagai tamu kehormatan.",
            requires: {
              truth: 35,
              trust: 15,
            },
          },
          {
            id: "hero_ending",
            text: "Dengan bukti yang terkumpul, kamu menghadapi Lina di ruang ganti. Awalnya dia menyangkal, tapi saat kamu menyebut nama Maya, pertahanannya runtuh. Air mata mengalir deras. 'Ibu saya mencintai Tuan Baskara seumur hidupnya,' akunya. 'Dia mengorbankan segalanya untuknya, tapi dia memilih wanita lain. Ibu tidak pernah sembuh dari luka itu. Saat dia tahu sakit kankernya sudah stadium akhir, dia memintaku melakukan satu hal terakhir...' Lina ditangkap atas tuduhan pembunuhan berencana. Maya meninggal dua hari kemudian. Tragedi cinta yang berakhir dengan tragedi nyata.",
            requires: {
              truth: 30,
            },
          },
          {
            id: "compassionate_ending",
            text: "Kamu mengungkap kebenaran tentang Lina dan Maya, tapi memilih pendekatan yang berbeda. Alih-alih langsung menangkap, kamu memberi Lina kesempatan untuk menyerahkan diri dan mengunjungi ibunya yang sekarat. Di samping ranjang Maya, dengan tanganmu sebagai saksi, Lina mengucapkan selamat tinggal pada ibunya untuk terakhir kali. Maya meninggal dengan tenang, mengetahui putrinya tidak akan menanggung beban sendirian. Lina menyerahkan diri keesokan harinya. Di pengadilan, cerita ini mengharukan semua orang—bahkan Nyonya Ratna meminta keringanan untuk Lina. Keadilan dan kemanusiaan berjalan beriringan.",
            requires: {
              trust: 25,
              truth: 15,
            },
          },
          {
            id: "dark_ending",
            text: "Tekanan media dan keluarga korban membuatmu terburu-buru. Kamu menangkap Nyonya Ratna berdasarkan bukti sirkumstansial—surat cinta dan kerenggangan hubungan. Media meliput secara sensasional. Tapi di tengah persidangan, Dimas—pemeran cadangan—bunuh diri di kamar hotelnya, meninggalkan surat pengakuan. Dialah pembunuhnya, bukan karena cinta atau dendam, tapi karena gangguan jiwa yang tidak terdeteksi. Nyonya Ratna dibebaskan, tapi hidupnya sudah hancur—nama baiknya tidak akan pernah pulih. Kamu dihukum atas kelalaian dan dipindahkan ke divisi administrasi. Karir cemerlangmu berakhir.",
            requires: {
              pressure: 25,
            },
          },
          {
            id: "secret_ending",
            text: "Analisismu terhadap surat cinta mengungkap kebenaran yang tidak terduga. Tulisan tangan di surat itu BUKAN milik Maya—tapi milik Dimas! Pemeran cadangan itu menyamar sebagai pengagum wanita untuk mendekati Baskara dan mempelajari kelemahannya. Ternyata Dimas adalah putra tidak sah Baskara dari hubungan gelap puluhan tahun lalu, yang tidak pernah diakui. Dendam yang terpendam selama seumur hidup memuncak malam itu. Saat dikonfrontasi, Dimas mencoba bunuh diri tapi berhasil dicegah. Dalam sidang, cerita tragis tentang anak yang ditolak ayahnya membuat publik terpecah antara simpati dan penghakiman. Baskara, ternyata, tidaklah sesuci yang dikira.",
            requires: {
              truth: 25,
              collectedEvidence: ["love_letter"],
            },
          },
          {
            id: "twist_ending",
            text: "Semua bukti mengarah ke Lina, tapi instingmu mengatakan ada yang janggal. Penyelidikan lebih dalam mengungkap kebenaran yang mencengangkan: Nyonya Ratna-lah dalang sebenarnya! Dia sudah lama tahu tentang Maya dan Lina. Dengan licik, dia memanipulasi Lina—memberikan racun dan meyakinkannya bahwa ini 'permintaan terakhir Maya'—padahal Maya tidak pernah minta hal seperti itu. Ratna ingin menyingkirkan suami yang tidak setia dan mewarisi seluruh kekayaannya, sambil membuat orang lain menanggung dosanya. Saat bukti manipulasinya terungkap di pengadilan, topeng istri setia itu runtuh. Lina dibebaskan, Ratna dipenjara seumur hidup.",
            requires: {
              trust: 20,
              truth: 20,
            },
          },
          {
            id: "supernatural_ending",
            text: "Kasus ini membawamu ke jalur yang tidak terduga. Saat menyelidiki sejarah Gedung Teater Mutiara, kamu menemukan catatan aneh—setiap 30 tahun, ada aktor yang meninggal di atas panggung dengan cara misterius. Baskara adalah korban ketiga. Tidak ada pembunuh manusia. Teater ini... terkutuk. Dalam ritual kuno, panggung ini dibangun di atas kuburan massal korban pandemi abad 19, dan roh-roh yang marah menuntut korban secara berkala. Kamu menutup kasus dengan 'sebab kematian tidak dapat ditentukan', tapi diam-diam menghubungi paranormal untuk membersihkan gedung. Sejak itu, tidak ada lagi kematian misterius di Teater Mutiara.",
            requires: {
              trust: 30,
            },
          },
          {
            id: "bittersweet_ending",
            text: "Kamu menangkap Lina dan mengungkap semua kebenaran. Tapi kemenangan ini terasa hambar. Di pengadilan, rekaman suara Maya yang sedang sekarat diputar—suara wanita tua yang hanya ingin mati dengan tenang, tanpa tahu putrinya akan berbuat sejauh ini. Lina menangis histeris, menyesal telah salah mengartikan kata-kata ibunya. Nyonya Ratna, meski mendapat keadilan untuk suaminya, kini hidup sendirian di rumah yang penuh kenangan. Dimas meninggalkan dunia teater selamanya, traumatized. Gedung Teater Mutiara ditutup untuk renovasi yang tidak pernah selesai. Semua orang kalah dalam tragedi ini, termasuk kamu.",
            requires: {
              truth: 20,
              pressure: 15,
            },
          },
          {
            id: "ending_neutral",
            text: "Penyelidikan berlarut-larut tanpa hasil konkret. Terlalu banyak tersangka, terlalu sedikit bukti pasti. Lina mengklaim tidak bersalah dan punya alibi yang sulit dipatahkan. Nyonya Ratna tetap berstatus saksi. Dimas dan Pak Wiryo juga tidak bisa dihubungkan langsung dengan pembunuhan. Kasus Tuan Baskara akhirnya masuk kategori 'cold case'—arsip yang menumpuk di gudang polisi bersama misteri-misteri lain yang tidak terpecahkan. Gedung Teater Mutiara tetap beroperasi, tapi penonton berbisik tentang hantu aktor yang konon masih terlihat di atas panggung saat tengah malam. Legenda panggung yang mati secara tragis, kini menjadi legenda hantu.",
            default: true,
          },
        ],
      },
    },
  },
};
