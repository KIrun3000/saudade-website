export type BlogLink = {
  label: string;
  url: string;
};

export type BlogSection = {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
  quote?: string;
  /** Optional image rendered directly after this section's content, to intersperse
   *  imagery through the article instead of stacking it in one block. */
  image?: string;
  /** Clickable external references, rendered as a list of links (e.g. a
   *  "Sources and Inspiration" section). Language-independent. */
  links?: BlogLink[];
};

export type BlogArticleTranslation = {
  title: string;
  subtitle?: string;
  quote?: string;
  sections: BlogSection[];
  postImageSections?: BlogSection[];
};

export type BlogArticle = {
  slug: "saudade-meaning" | "textile-frequency" | "who-made-my-clothes" | "permaculture";
  category: "PHILOSOPHY" | "CONSCIOUS FASHION" | "REGENERATION";
  publishedAt: string;
  author: "Mayka";
  title: string;
  subtitle?: string;
  description: string;
  cardImage: string;
  heroImage: string;
  /** SEO keywords / OG tags for this article. */
  keywords?: string[];
  quote?: string;
  extraImages?: string[];
  sections: BlogSection[];
  postImageSections?: BlogSection[];
  translations?: {
    es?: BlogArticleTranslation;
    pt?: BlogArticleTranslation;
    pl?: BlogArticleTranslation;
  };
};

// Shared, language-independent source lists so a "Sources and Inspiration"
// section can reuse the same verified links across every translation.
const SOURCES_PERMACULTURE: BlogLink[] = [
  { label: "Saudade — About: the vision of Saudade Land", url: "https://www.saudadevoces.com/about" },
  { label: "What Is Permaculture, Anyway? — Omega Institute", url: "https://www.eomega.org/article/what-is-permaculture-anyway" },
  { label: "Permaculture: Principles and Applications — Vert Zero", url: "https://vertzero.eco/en/insights/permaculture-principles-and-applications" },
  { label: "Permaculture — Wikipedia", url: "https://en.wikipedia.org/wiki/Permaculture" },
  { label: "What Is Permaculture? Benefits & Applications — Indonesia Asri", url: "https://indonesiaasri.com/en/education/what-is-permaculture/" },
  { label: "27 Benefits of Permaculture and the Challenges — Futurside", url: "https://futurside.com/permaculture-benefits-and-challenges-you-need-to-know/" },
];

const SOURCES_TEXTILE_FREQUENCY: BlogLink[] = [
  { label: "The Frequency of Fabric — Dr. Heidi Yellen's study (Sound Healing Research Foundation)", url: "https://soundhealingresearchfoundation.org/wp-content/uploads/2024/08/Frequency-of-Fabric.pdf" },
  { label: "Washing synthetic clothes & microplastic pollution — Nature, Scientific Reports", url: "https://www.nature.com/articles/s41598-019-43023-x" },
  { label: "Global Organic Textile Standard (GOTS)", url: "https://global-standard.org/" },
  { label: "Linen — Wikipedia", url: "https://en.wikipedia.org/wiki/Linen" },
  { label: "A New Textiles Economy — Ellen MacArthur Foundation", url: "https://www.ellenmacarthurfoundation.org/a-new-textiles-economy" },
];

const SOURCES_WHO_MADE: BlogLink[] = [
  { label: "Fashion Revolution — Who Made My Clothes?", url: "https://www.fashionrevolution.org/" },
  { label: "Rana Plaza collapse — Wikipedia", url: "https://en.wikipedia.org/wiki/Rana_Plaza_collapse" },
  { label: "Clean Clothes Campaign", url: "https://cleanclothes.org/" },
  { label: "A New Textiles Economy — Ellen MacArthur Foundation", url: "https://www.ellenmacarthurfoundation.org/a-new-textiles-economy" },
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: "saudade-meaning",
    category: "PHILOSOPHY",
    publishedAt: "2026-03-01",
    author: "Mayka",
    title: "What Does Saudade Mean?",
    description:
      "Saudade is more than a word. It is a feeling, a sensation, and a call for awareness rooted in longing, love, and human connection.",
    cardImage:
      "/wp-content/uploads/2023/09/F56E23B8-D3FF-4BA1-BE97-73AC2B21B4CE_1_105_c-e1729254532272.jpeg",
    heroImage:
      "/wp-content/uploads/2023/09/pexels-tellez-erik-12747153.jpg",
    keywords: [
      "saudade",
      "saudade meaning",
      "what does saudade mean",
      "Portuguese word saudade",
      "longing",
      "nostalgia",
      "Brazilian Portuguese",
      "untranslatable words",
      "emotional connection",
      "Saudade brand",
    ],
    quote: '"When I think of saudade I think of the ocean"',
    extraImages: ["/costaricaocean.jpeg"],
    sections: [
      {
        paragraphs: [
          "Saudade is the word I hold most dear — out of the three languages I carry within me, Brazilian Portuguese being my first and my heart's true home. What makes saudade extraordinary is that no other language has a word quite like it. And I think that is telling. Not everything that is most real can be translated. Some truths only live in feeling.",
          "Saudade is what stirs in you when you miss someone so deeply that you reach for your phone with no reason, no message planned — only the quiet need to hear their voice. It is the energy that closes the distance between two hearts. The invisible thread that pulls you back toward what you love. It is longing, but it is also love. It is absence, but it is also a kind of presence.",
          "Have you felt this? If something in these words recognises you, then saudade already lives in you. It arrives as nostalgia, as love so full it aches, as the particular tenderness for beauty that has passed. It is never small. Saudade is vast and intimate, ancient and entirely personal. Like the ocean, it is always moving — always reaching, always returning.",
        ],
      },
    ],
    postImageSections: [
      {
        paragraphs: [
          "Saudade is not something that happens to us. It is woven into what we are. The longing to connect, to return, to reach across distance — this is not weakness. It is the most alive part of us. It is what I wanted to honour when I created this brand: the harmony between self and world, the beauty of feeling deeply, and the courage to let love move through you unguarded.",
          "With love and joy, I offer you this: Saudade. Not just a brand, not just a word — a way of moving through the world. A gathering of souls who have remembered that feeling is not a flaw but a compass. That beauty is not frivolous but essential. That real, honest, human connection is worth building a life around.",
          "For a future rooted in integrity, in harmony with nature, in love that extends far beyond ourselves.",
        ],
        quote: "\"We cannot change everything at once. But we can choose how we live, what we wear, who we stand beside, and where we pour our energy. Together, we weave this. And that is enough to begin.\"",
      },
    ],
    translations: {
      pt: {
        title: "O Que Significa Saudade?",
        quote: '"Quando penso em saudade, penso no oceano"',
        sections: [
          {
            paragraphs: [
              "Saudade é a palavra que guardo com mais carinho — das três línguas que carrego dentro de mim, o português brasileiro sendo a minha primeira e o verdadeiro lar do meu coração. O que torna a saudade extraordinária é que nenhuma outra língua tem uma palavra bem como ela. E acho que isso é revelador. Nem tudo que é mais real pode ser traduzido. Algumas verdades só vivem no sentimento.",
              "Saudade é o que se agita em você quando sente falta de alguém tão profundamente que alcança o telefone sem razão, sem mensagem planejada — apenas com a necessidade silenciosa de ouvir a voz dessa pessoa. É a energia que encurta a distância entre dois corações. O fio invisível que te puxa de volta ao que você ama. É saudade, mas também é amor. É ausência, mas também é uma espécie de presença.",
              "Você já sentiu isso? Se algo nestas palavras te reconhece, então a saudade já vive em você. Chega como nostalgia, como amor tão pleno que dói, como a ternura particular pela beleza que passou. Nunca é pequena. A saudade é vasta e íntima, antiga e inteiramente pessoal. Como o oceano, está sempre em movimento — sempre alcançando, sempre retornando.",
            ],
          },
        ],
        postImageSections: [
          {
            paragraphs: [
              "A saudade não é algo que nos acontece. Está tecida no que somos. O anseio de conectar, de retornar, de alcançar através da distância — isso não é fraqueza. É a parte mais viva de nós. É o que quis honrar quando criei esta marca: a harmonia entre o eu e o mundo, a beleza de sentir profundamente, e a coragem de deixar o amor fluir por você sem defesas.",
              "Com amor e alegria, ofereço-lhe isto: Saudade. Não apenas uma marca, não apenas uma palavra — uma maneira de se mover pelo mundo. Uma reunião de almas que se lembraram que sentir não é uma falha, mas uma bússola. Que a beleza não é frívola, mas essencial. Que a conexão humana real e honesta vale a pena construir uma vida ao redor.",
              "Por um futuro enraizado na integridade, em harmonia com a natureza, em amor que se estende muito além de nós mesmos.",
            ],
            quote: "\"Não podemos mudar tudo de uma vez. Mas podemos escolher como vivemos, o que vestimos, ao lado de quem ficamos e onde derramamos nossa energia. Juntos, tecemos isso. E isso é suficiente para começar.\"",
          },
        ],
      },
      es: {
        title: "¿Qué Significa Saudade?",
        quote: '"Cuando pienso en saudade, pienso en el océano"',
        sections: [
          {
            paragraphs: [
              "Saudade es la palabra que más atesoro — de los tres idiomas que llevo dentro de mí, siendo el portugués brasileño el primero y el verdadero hogar de mi corazón. Lo que hace a saudade extraordinaria es que ningún otro idioma tiene una palabra igual. Y creo que eso es revelador. No todo lo que es más real puede traducirse. Algunas verdades solo viven en el sentimiento.",
              "Saudade es lo que se agita en ti cuando extrañas a alguien tan profundamente que alcanzas tu teléfono sin razón, sin ningún mensaje planeado — solo la necesidad silenciosa de escuchar su voz. Es la energía que cierra la distancia entre dos corazones. El hilo invisible que te jala de regreso hacia lo que amas. Es añoranza, pero también es amor. Es ausencia, pero también es una especie de presencia.",
              "¿Has sentido esto? Si algo en estas palabras te reconoce, entonces saudade ya vive en ti. Llega como nostalgia, como amor tan pleno que duele, como la ternura particular por la belleza que ha pasado. Nunca es pequeña. Saudade es vasta e íntima, antigua y completamente personal. Como el océano, siempre está en movimiento — siempre alcanzando, siempre regresando.",
            ],
          },
        ],
        postImageSections: [
          {
            paragraphs: [
              "Saudade no es algo que nos ocurre. Está tejida en lo que somos. El anhelo de conectar, de regresar, de alcanzar a través de la distancia — esto no es debilidad. Es la parte más viva de nosotros. Es lo que quise honrar cuando creé esta marca: la armonía entre el yo y el mundo, la belleza de sentir profundamente y el coraje de dejar que el amor fluya por ti sin defensas.",
              "Con amor y alegría, te ofrezco esto: Saudade. No solo una marca, no solo una palabra — una forma de moverse por el mundo. Una reunión de almas que han recordado que sentir no es un defecto sino una brújula. Que la belleza no es frívola sino esencial. Que la conexión humana real y honesta vale la pena construir una vida alrededor.",
              "Por un futuro arraigado en la integridad, en armonía con la naturaleza, en amor que se extiende mucho más allá de nosotros mismos.",
            ],
            quote: "\"No podemos cambiarlo todo a la vez. Pero podemos elegir cómo vivimos, qué vestimos, junto a quién estamos y dónde ponemos nuestra energía. Juntos, tejemos esto. Y eso es suficiente para comenzar.\"",
          },
        ],
      },
      pl: {
        title: "Co Znaczy Saudade?",
        quote: "„Kiedy myślę o saudade, myślę o oceanie”",
        sections: [
          {
            paragraphs: [
              "Saudade to słowo, które noszę w sobie najczulej — z trzech języków, które we mnie żyją, brazylijska portugalszczyzna jest pierwsza i jest prawdziwym domem mojego serca. To, co czyni saudade niezwykłą, to fakt, że żaden inny język nie ma słowa do niej podobnego. I myślę, że to coś znaczy. Nie wszystko, co najprawdziwsze, da się przetłumaczyć. Niektóre prawdy żyją tylko w uczuciu.",
              "Saudade to coś, co porusza się w Tobie, kiedy tęsknisz za kimś tak bardzo, że sięgasz po telefon bez powodu, bez żadnej wiadomości w głowie — tylko z cichą potrzebą usłyszenia jego głosu. To energia, która zamyka odległość między dwoma sercami. Niewidzialna nić, która ciągnie Cię z powrotem ku temu, co kochasz. To tęsknota, ale też miłość. To nieobecność, ale też pewien rodzaj obecności.",
              "Czułaś to? Jeśli coś w tych słowach Cię rozpoznaje, to saudade już w Tobie żyje. Przychodzi jako nostalgia, jako miłość tak pełna, że aż boli, jako szczególna czułość wobec piękna, które przeminęło. Nigdy nie jest mała. Saudade jest rozległa i intymna, dawna i całkowicie osobista. Jak ocean — zawsze w ruchu, zawsze sięgająca, zawsze powracająca.",
            ],
          },
        ],
        postImageSections: [
          {
            paragraphs: [
              "Saudade nie jest czymś, co nam się przydarza. Jest wpleciona w to, kim jesteśmy. Pragnienie połączenia, powrotu, sięgnięcia ponad odległość — to nie słabość. To najbardziej żywa część nas. To właśnie chciałam uczcić, tworząc tę markę: harmonię między sobą a światem, piękno głębokiego czucia i odwagę pozwolenia, by miłość przepływała przez Ciebie bez osłon.",
              "Z miłością i radością ofiarowuję Ci to: Saudade. Nie tylko markę, nie tylko słowo — sposób bycia w świecie. Spotkanie dusz, które przypomniały sobie, że uczucie nie jest wadą, lecz kompasem. Że piękno nie jest błahostką, lecz koniecznością. Że prawdziwe, uczciwe, ludzkie połączenie warte jest budowania wokół niego całego życia.",
              "Dla przyszłości zakorzenionej w uczciwości, w harmonii z naturą, w miłości, która sięga daleko poza nas samych.",
            ],
            quote: "„Nie zmienimy wszystkiego naraz. Ale możemy wybrać, jak żyjemy, co nosimy, przy kim stoimy i gdzie wlewamy naszą energię. Razem to tkamy. I to wystarczy, by zacząć.”",
          },
        ],
      },
    },
  },
  {
    slug: "textile-frequency",
    category: "CONSCIOUS FASHION",
    publishedAt: "2026-03-15",
    author: "Mayka",
    title: "The Frequency of Fabrics",
    subtitle:
      "Like the rhythms of nature, fabrics carry frequencies too. At Saudade we are all about weaving in the highest frequency!",
    description:
      "How linen, cotton, wool, and hemp carry different vibrational frequencies and why natural fibers matter for wellness and the planet.",
    cardImage:
      "/wp-content/uploads/2023/09/volha-flaxeco-L8QuQqL1ZJ8-unsplash-1.jpeg",
    heroImage:
      "/wp-content/uploads/2023/09/volha-flaxeco-L8QuQqL1ZJ8-unsplash-1.jpeg",
    keywords: [
      "fabric frequency",
      "frequency of fabrics",
      "linen frequency",
      "natural fibers",
      "linen",
      "hemp",
      "organic cotton",
      "wool",
      "synthetic fabrics microplastics",
      "conscious fashion",
      "high vibration clothing",
      "sustainable textiles",
    ],
    extraImages: [
      "/wp-content/uploads/2024/10/pexels-photo-4405941-4405941-2.jpg",
    ],
    sections: [
      {
        heading: "What is Frequency?",
        paragraphs: [
          "Everything in the universe has a vibrational frequency, which refers to how often something oscillates or repeats its motion over a specific period. In physics, frequency describes how often a wave - such as sound, light, or electromagnetic energy - repeats in one second, measured in Hertz (Hz). Vibrational frequency can be measured using specialized tools like vibrometers or spectrometers. This frequency can affect how objects or materials interact with their surroundings, including the human body. Natural materials like cotton and linen, for example, resonate at frequencies harmonious with the body, promoting relaxation and well-being, while synthetic materials have lower frequencies that can disrupt energy balance.",
          "The human body's signature frequency is 100mHz. It can vary from 70 to 100. A frequency lower than 62 indicates a compromised immune system.",
        ],
      },
      {
        heading: "Super Fabrics",
        paragraphs: ["Linen - Made from flax, 5000 mHz"],
        bullets: [
          "Sleeping in linen helps a person fall asleep faster and deeper",
          "Improves mood",
          "Rapid healing from surgeries, which is why hospitals have used linen sheets",
          "Resistant to fungus and bacteria",
          "Barrier to some diseases",
          "Regulates body temperature - warm when cold, cools when warm",
        ],
      },
      {
        paragraphs: [
          "Cotton - healthier but not a super fabric",
          "Organic cotton: 70 to 110 mHz",
          "Non-organic cotton, bleached and/or dyed: 40 to 70 mHz",
          "Wool - 5000 mHz",
          "Something very interesting: Wool's energy flows from left to right, whereas the frequency of linen flows right to left. Mixing these two together will cancel out the healing effects to zero.",
        ],
      },
      {
        heading: "Hemp",
        quote:
          "\"Plant a lot of hemp in the land of Fukushima. Hemp's vibration has the potentiality to purify the contaminated environment made by radiation. It grows fast and uses very little water. The soil it grows in doesn't require rotating for many years.\" - Dr. Masaru Emoto",
        bullets: [
          "Has an extremely high vibration",
          "Is at least 4x stronger than cotton",
          "Breathes better than any synthetic",
          "Naturally resistant to mold, mildew, and UV light",
        ],
      },
    ],
    postImageSections: [
      {
        heading: "Sources and Inspiration",
        paragraphs: [
          "To go deeper into the story behind these fibers, these resources offered knowledge and clarity:",
        ],
        links: SOURCES_TEXTILE_FREQUENCY,
      },
    ],
    translations: {
      pt: {
        title: "A Frequência dos Tecidos",
        subtitle:
          "Assim como os ritmos da natureza, os tecidos também carregam frequências. Na Saudade, trabalhamos sempre com a frequência mais alta!",
        sections: [
          {
            heading: "O Que é Frequência?",
            paragraphs: [
              "Tudo no universo tem uma frequência vibracional, que se refere à frequência com que algo oscila ou repete seu movimento em um período específico. Na física, frequência descreve com que frequência uma onda — como som, luz ou energia eletromagnética — se repete em um segundo, medida em Hertz (Hz). A frequência vibracional pode ser medida com ferramentas especializadas como vibrômetros ou espectrômetros. Essa frequência pode afetar como objetos ou materiais interagem com seu entorno, incluindo o corpo humano. Materiais naturais como algodão e linho, por exemplo, ressoam em frequências harmoniosas com o corpo, promovendo relaxamento e bem-estar, enquanto materiais sintéticos têm frequências mais baixas que podem perturbar o equilíbrio energético.",
              "A frequência característica do corpo humano é de 100 mHz. Pode variar de 70 a 100. Uma frequência inferior a 62 indica um sistema imunológico comprometido.",
            ],
          },
          {
            heading: "Super Tecidos",
            paragraphs: ["Linho — Feito de linho, 5000 mHz"],
            bullets: [
              "Dormir em linho ajuda a pessoa a adormecer mais rápido e mais profundamente",
              "Melhora o humor",
              "Recuperação rápida de cirurgias, razão pela qual os hospitais usavam lençóis de linho",
              "Resistente a fungos e bactérias",
              "Barreira para algumas doenças",
              "Regula a temperatura corporal — aquece quando está frio, refresca quando está quente",
            ],
          },
          {
            paragraphs: [
              "Algodão — mais saudável, mas não um super tecido",
              "Algodão orgânico: 70 a 110 mHz",
              "Algodão não orgânico, branqueado e/ou tingido: 40 a 70 mHz",
              "Lã — 5000 mHz",
              "Algo muito interessante: A energia da lã flui da esquerda para a direita, enquanto a frequência do linho flui da direita para a esquerda. Misturar os dois juntos cancelará os efeitos curativos para zero.",
            ],
          },
          {
            heading: "Cânhamo",
            quote:
              "\"Plantem muito cânhamo na terra de Fukushima. A vibração do cânhamo tem a potencialidade de purificar o ambiente contaminado pela radiação. Cresce rapidamente e usa muito pouca água. O solo em que cresce não precisa de rotação por muitos anos.\" — Dr. Masaru Emoto",
            bullets: [
              "Tem uma vibração extremamente alta",
              "É pelo menos 4x mais resistente que o algodão",
              "Respira melhor do que qualquer sintético",
              "Naturalmente resistente a mofo, bolor e luz UV",
            ],
          },
        ],
        postImageSections: [
          {
            heading: "Fontes e Inspiração",
            paragraphs: [
              "Para aprofundar a história por trás destas fibras, estes recursos ofereceram conhecimento e clareza:",
            ],
            links: SOURCES_TEXTILE_FREQUENCY,
          },
        ],
      },
      es: {
        title: "La Frecuencia de los Tejidos",
        subtitle:
          "Como los ritmos de la naturaleza, las telas también llevan frecuencias. ¡En Saudade nos dedicamos a tejer con la frecuencia más alta!",
        sections: [
          {
            heading: "¿Qué es la Frecuencia?",
            paragraphs: [
              "Todo en el universo tiene una frecuencia vibracional, que se refiere a con qué frecuencia algo oscila o repite su movimiento en un período específico. En física, la frecuencia describe cuántas veces una onda — como el sonido, la luz o la energía electromagnética — se repite en un segundo, medida en Hertz (Hz). La frecuencia vibracional puede medirse con herramientas especializadas como vibrómetros o espectrómetros. Esta frecuencia puede afectar cómo los objetos o materiales interactúan con su entorno, incluido el cuerpo humano. Los materiales naturales como el algodón y el lino, por ejemplo, resuenan a frecuencias armoniosas con el cuerpo, promoviendo la relajación y el bienestar, mientras que los materiales sintéticos tienen frecuencias más bajas que pueden alterar el equilibrio energético.",
              "La frecuencia característica del cuerpo humano es de 100 mHz. Puede variar de 70 a 100. Una frecuencia inferior a 62 indica un sistema inmune comprometido.",
            ],
          },
          {
            heading: "Super Tejidos",
            paragraphs: ["Lino — Hecho de lino, 5000 mHz"],
            bullets: [
              "Dormir en lino ayuda a la persona a dormirse más rápido y más profundamente",
              "Mejora el estado de ánimo",
              "Recuperación rápida de cirugías, razón por la cual los hospitales usaban sábanas de lino",
              "Resistente a hongos y bacterias",
              "Barrera contra algunas enfermedades",
              "Regula la temperatura corporal — calienta cuando hace frío, refresca cuando hace calor",
            ],
          },
          {
            paragraphs: [
              "Algodón — más saludable pero no un super tejido",
              "Algodón orgánico: 70 a 110 mHz",
              "Algodón no orgánico, blanqueado y/o teñido: 40 a 70 mHz",
              "Lana — 5000 mHz",
              "Algo muy interesante: La energía de la lana fluye de izquierda a derecha, mientras que la frecuencia del lino fluye de derecha a izquierda. Mezclar estos dos juntos cancelará los efectos curativos a cero.",
            ],
          },
          {
            heading: "Cáñamo",
            quote:
              "\"Planten mucho cáñamo en la tierra de Fukushima. La vibración del cáñamo tiene la potencialidad de purificar el ambiente contaminado por la radiación. Crece rápido y usa muy poca agua. El suelo en el que crece no requiere rotación por muchos años.\" — Dr. Masaru Emoto",
            bullets: [
              "Tiene una vibración extremadamente alta",
              "Es al menos 4 veces más fuerte que el algodón",
              "Respira mejor que cualquier sintético",
              "Naturalmente resistente al moho, el mildiu y la luz UV",
            ],
          },
        ],
        postImageSections: [
          {
            heading: "Fuentes e Inspiración",
            paragraphs: [
              "Para profundizar en la historia detrás de estas fibras, estos recursos ofrecieron conocimiento y claridad:",
            ],
            links: SOURCES_TEXTILE_FREQUENCY,
          },
        ],
      },
      pl: {
        title: "Częstotliwość Tkanin",
        subtitle:
          "Tak jak rytmy natury, również tkaniny niosą własne częstotliwości. W Saudade tkamy wyłącznie na najwyższej!",
        sections: [
          {
            heading: "Czym Jest Częstotliwość?",
            paragraphs: [
              "Wszystko we wszechświecie ma częstotliwość drgań — czyli to, jak często coś oscyluje lub powtarza swój ruch w określonym czasie. W fizyce częstotliwość opisuje, ile razy fala — dźwięku, światła czy energii elektromagnetycznej — powtarza się w ciągu sekundy, mierzona w hercach (Hz). Częstotliwość drgań można mierzyć specjalistycznymi narzędziami, jak wibrometry czy spektrometry. Ta częstotliwość wpływa na to, jak przedmioty i materiały oddziałują z otoczeniem — w tym z ludzkim ciałem. Materiały naturalne, takie jak bawełna i len, rezonują na częstotliwościach harmonijnych z ciałem, sprzyjając rozluźnieniu i dobrostanowi, podczas gdy materiały syntetyczne mają częstotliwości znacznie niższe, które potrafią zaburzyć równowagę energetyczną.",
              "Charakterystyczna częstotliwość ludzkiego ciała to 100 mHz. Może wahać się od 70 do 100. Częstotliwość poniżej 62 wskazuje na osłabiony układ odpornościowy.",
            ],
          },
          {
            heading: "Super Tkaniny",
            paragraphs: ["Len — wytwarzany z lnu, 5000 mHz"],
            bullets: [
              "Spanie w lnianej pościeli pomaga zasnąć szybciej i głębiej",
              "Poprawia nastrój",
              "Szybsza rekonwalescencja po operacjach — z tego powodu szpitale używały lnianej pościeli",
              "Odporny na grzyby i bakterie",
              "Bariera przed niektórymi chorobami",
              "Reguluje temperaturę ciała — grzeje, gdy zimno, chłodzi, gdy gorąco",
            ],
          },
          {
            paragraphs: [
              "Bawełna — zdrowsza, ale nie super tkanina",
              "Bawełna organiczna: 70 do 110 mHz",
              "Bawełna nieorganiczna, bielona lub barwiona: 40 do 70 mHz",
              "Wełna — 5000 mHz",
              "Coś bardzo ciekawego: energia wełny płynie z lewej do prawej, a częstotliwość lnu — z prawej do lewej. Połączenie tych dwóch tkanin wzajemnie znosi efekty uzdrawiające do zera.",
            ],
          },
          {
            heading: "Konopie",
            quote:
              "„Posadźcie dużo konopi na ziemi Fukushimy. Wibracja konopi ma potencjał, by oczyścić środowisko skażone promieniowaniem. Rosną szybko i potrzebują bardzo mało wody. Gleba, na której rosną, nie wymaga zmianowania przez wiele lat.” — dr Masaru Emoto",
            bullets: [
              "Mają wyjątkowo wysoką wibrację",
              "Są co najmniej cztery razy mocniejsze od bawełny",
              "Oddychają lepiej niż jakikolwiek syntetyk",
              "Naturalnie odporne na pleśń, grzyba i promieniowanie UV",
            ],
          },
        ],
        postImageSections: [
          {
            heading: "Źródła i Inspiracje",
            paragraphs: [
              "Aby zgłębić historię stojącą za tymi włóknami, te źródła dostarczyły wiedzy i jasności:",
            ],
            links: SOURCES_TEXTILE_FREQUENCY,
          },
        ],
      },
    },
  },
  {
    slug: "who-made-my-clothes",
    category: "CONSCIOUS FASHION",
    publishedAt: "2026-03-22",
    author: "Mayka",
    title: "Who Made My Clothes?",
    description:
      "A closer look at who makes our clothes, why fast fashion harms people and ecosystems, and why natural fibers are a conscious alternative.",
    cardImage:
      "/wp-content/uploads/2024/10/jon-tyson-uEXc4WGAI2c-unsplash-768x1024.jpg",
    heroImage:
      "/wp-content/uploads/2024/10/jon-tyson-uEXc4WGAI2c-unsplash-768x1024.jpg",
    keywords: [
      "who made my clothes",
      "fast fashion",
      "ethical fashion",
      "garment workers",
      "Rana Plaza",
      "fashion supply chain",
      "sustainable fashion",
      "slow fashion",
      "textile waste",
      "fashion transparency",
      "conscious clothing",
      "natural fibers",
    ],
    extraImages: [
      "/wp-content/uploads/2024/10/fast-fashion.webp",
    ],
    postImageSections: [
      {
        heading: "The Weight of What We Throw Away",
        paragraphs: [
          "Every second, the equivalent of a full garbage truck of clothing is either burned or buried somewhere on this earth. Globally, the fashion industry generates 92 million tonnes of textile waste each year — a number so large it becomes almost abstract until you picture the mountains of discarded clothes blanketing the Atacama Desert in Chile, visible from space, dyed in the colours of last season's trends.",
          "Fast fashion has engineered a world where clothing is treated as disposable. Production has doubled in the last two decades while the average garment is worn fewer than ten times before it is thrown away. We were not always like this. And we do not have to remain this way.",
        ],
      },
      {
        heading: "The Hands Behind the Label",
        paragraphs: [
          "There are approximately 40 million garment workers in the world. Most of them are women. Many earn less than a living wage — in some of the largest producing countries, that means less than three dollars a day. Behind the low price tag on a fast fashion piece is almost always a human being who paid the true cost instead.",
          "Children too are part of this invisible workforce — in cotton fields, in dyeing facilities, in factories without windows. Not because their families lack love, but because a system built on speed and cheapness has made their labour necessary for someone else's profit.",
          "In 2013, the Rana Plaza factory collapsed in Bangladesh. 1,134 garment workers died. Thousands more were injured. Workers had reported cracks in the building the day before. They were told to return anyway.",
          "We share these truths not to overwhelm, but because awareness is the first thread of change. When we know, we can choose differently. And every conscious choice — every garment bought with intention — is a quiet but powerful act of solidarity with the people and the planet on the other side of the label.",
        ],
        quote: "\"The most sustainable garment is the one already in your wardrobe. The most revolutionary act is choosing well.\"",
      },
      {
        heading: "Sources and Inspiration",
        paragraphs: [
          "To go deeper into the story behind our clothes, these resources offered knowledge and clarity:",
        ],
        links: SOURCES_WHO_MADE,
      },
    ],
    sections: [
      {
        paragraphs: [
          "I believe (and hope) that we have all pondered this question at some point. It is, in fact, a very important question to consider because the commercial and manufacturing aspects of the clothing industry can be overwhelming.",
          "Every Saudade piece is born from love and intention. Designed by Mayka and produced sustainably, each garment is crafted with care — sourcing only the finest natural, high-frequency fabrics and working with makers who share our belief that how something is made matters as much as what is made. From the thread to the final stitch, every choice is aligned with Saudade's vision: to create beauty that heals, honours the earth, and elevates the people who wear it.",
        ],
      },
      {
        heading: "The Fashion Industry",
        paragraphs: [
          "Let us understand the most common textiles:",
          "Polyester: 55%, Cotton: 27%, Cellulosic Fibres: 7%, Polypropylene: 4%, Nylon: 5%, Wool: 1%",
          "At its core, polyester is plastic — a product of petroleum, coal, and water, designed for cheapness, not consciousness. Its production demands enormous quantities of water and chemicals — a cost our planet quietly absorbs. And with every wash, microplastics flow into our waterways, entering ecosystems and bodies in ways we are only beginning to understand.",
          "Clean, free-flowing water is one of our most sacred resources. Every conscious choice we make — including what we wear — is a vote for the world we want to live in.",
          "The good news is that nature has already given us everything we need. Numerous natural fibres can replace synthetic materials entirely — and most offer far better quality, durability, and harmony with the body. We have the power to create a sustainable world. Clothing is one of the most tangible places to begin.",
          "How about starting with our shopping choices? What feels better against your skin, plastic or natural fibres?",
        ],
      },
    ],
    translations: {
      pt: {
        title: "Quem Fez Minhas Roupas?",
        sections: [
          {
            paragraphs: [
              "Acredito (e espero) que todos já pensamos nessa questão em algum momento. É, de fato, uma questão muito importante a considerar porque os aspectos comerciais e de fabricação da indústria do vestuário podem ser avassaladores.",
              "Cada peça Saudade nasce do amor e da intenção. Desenhada por Mayka e produzida de forma sustentável, cada peça é criada com cuidado — buscando apenas os mais finos tecidos naturais de alta frequência e trabalhando com criadores que compartilham nossa crença de que como algo é feito importa tanto quanto o que é feito. Do fio ao ponto final, cada escolha está alinhada com a visão da Saudade: criar beleza que cura, honra a terra e eleva as pessoas que a vestem.",
            ],
          },
          {
            heading: "A Indústria da Moda",
            paragraphs: [
              "Vamos entender os têxteis mais comuns:",
              "Poliéster: 55%, Algodão: 27%, Fibras Celulósicas: 7%, Polipropileno: 4%, Náilon: 5%, Lã: 1%",
              "Em sua essência, o poliéster é plástico — um produto do petróleo, carvão e água, criado para o baixo custo, não para a consciência. Sua produção exige enormes quantidades de água e produtos químicos — um custo que nosso planeta absorve silenciosamente. E a cada lavagem, microplásticos fluem para nossas vias aquáticas, entrando nos ecossistemas e nos corpos de maneiras que estamos apenas começando a entender.",
              "Água limpa e em fluxo livre é um dos nossos recursos mais sagrados. Cada escolha consciente que fazemos — incluindo o que vestimos — é um voto pelo mundo em que queremos viver.",
              "A boa notícia é que a natureza já nos deu tudo o que precisamos. Numerosas fibras naturais podem substituir completamente os materiais sintéticos — e a maioria oferece qualidade, durabilidade e harmonia com o corpo muito superiores. Temos o poder de criar um mundo sustentável. A roupa é um dos lugares mais tangíveis para começar.",
              "Que tal começar com nossas escolhas de compra? O que parece melhor contra a sua pele, plástico ou fibras naturais?",
            ],
          },
        ],
        postImageSections: [
          {
            heading: "O Peso do Que Jogamos Fora",
            paragraphs: [
              "A cada segundo, o equivalente a um caminhão de lixo cheio de roupas é queimado ou enterrado em algum lugar neste planeta. Globalmente, a indústria da moda gera 92 milhões de toneladas de resíduos têxteis por ano — um número tão grande que se torna quase abstrato até você imaginar as montanhas de roupas descartadas cobrindo o Deserto do Atacama no Chile, visíveis do espaço, tingidas nas cores das tendências da última temporada.",
              "A fast fashion criou um mundo onde a roupa é tratada como descartável. A produção dobrou nas últimas duas décadas enquanto a peça média é usada menos de dez vezes antes de ser jogada fora. Nem sempre fomos assim. E não precisamos continuar sendo.",
            ],
          },
          {
            heading: "As Mãos por Trás da Etiqueta",
            paragraphs: [
              "Há aproximadamente 40 milhões de trabalhadores da confecção no mundo. A maioria são mulheres. Muitas ganham menos do que um salário digno — em alguns dos maiores países produtores, isso significa menos de três dólares por dia. Por trás do preço baixo de uma peça de fast fashion está quase sempre um ser humano que pagou o verdadeiro custo.",
              "Crianças também fazem parte dessa força de trabalho invisível — em campos de algodão, em instalações de tinturaria, em fábricas sem janelas. Não porque suas famílias não tenham amor, mas porque um sistema construído sobre velocidade e baixo custo tornou o trabalho delas necessário para o lucro de outros.",
              "Em 2013, a fábrica Rana Plaza desabou em Bangladesh. 1.134 trabalhadores da confecção morreram. Milhares ficaram feridos. Os trabalhadores já haviam relatado rachaduras no edifício no dia anterior. Foram mandados voltar assim mesmo.",
              "Compartilhamos essas verdades não para sobrecarregar, mas porque a consciência é o primeiro fio da mudança. Quando sabemos, podemos escolher de forma diferente. E cada escolha consciente — cada peça comprada com intenção — é um ato silencioso mas poderoso de solidariedade com as pessoas e o planeta do outro lado da etiqueta.",
            ],
            quote: "\"A peça mais sustentável é a que já está no seu guarda-roupa. O ato mais revolucionário é escolher bem.\"",
          },
          {
            heading: "Fontes e Inspiração",
            paragraphs: [
              "Para aprofundar a história por trás das nossas roupas, estes recursos ofereceram conhecimento e clareza:",
            ],
            links: SOURCES_WHO_MADE,
          },
        ],
      },
      es: {
        title: "¿Quién Hizo Mi Ropa?",
        sections: [
          {
            paragraphs: [
              "Creo (y espero) que todos hemos reflexionado sobre esta pregunta en algún momento. Es, de hecho, una pregunta muy importante a considerar porque los aspectos comerciales y de fabricación de la industria de la ropa pueden ser abrumadores.",
              "Cada pieza de Saudade nace del amor y la intención. Diseñada por Mayka y producida de manera sostenible, cada prenda se confecciona con cuidado — buscando solo las más finas telas naturales de alta frecuencia y trabajando con creadores que comparten nuestra creencia de que cómo se hace algo importa tanto como lo que se hace. Desde el hilo hasta el último punto, cada elección está alineada con la visión de Saudade: crear belleza que sana, honra la tierra y eleva a las personas que la visten.",
            ],
          },
          {
            heading: "La Industria de la Moda",
            paragraphs: [
              "Entendamos los textiles más comunes:",
              "Poliéster: 55%, Algodón: 27%, Fibras Celulósicas: 7%, Polipropileno: 4%, Nylon: 5%, Lana: 1%",
              "En su esencia, el poliéster es plástico — un producto del petróleo, el carbón y el agua, diseñado para el bajo costo, no para la conciencia. Su producción exige enormes cantidades de agua y productos químicos — un costo que nuestro planeta absorbe silenciosamente. Y con cada lavado, los microplásticos fluyen hacia nuestros cursos de agua, entrando en los ecosistemas y los cuerpos de maneras que apenas estamos empezando a comprender.",
              "El agua limpia y libre es uno de nuestros recursos más sagrados. Cada elección consciente que hacemos — incluido lo que vestimos — es un voto por el mundo en que queremos vivir.",
              "La buena noticia es que la naturaleza ya nos ha dado todo lo que necesitamos. Numerosas fibras naturales pueden reemplazar completamente los materiales sintéticos — y la mayoría ofrecen mucha mejor calidad, durabilidad y armonía con el cuerpo. Tenemos el poder de crear un mundo sostenible. La ropa es uno de los lugares más tangibles para comenzar.",
              "¿Qué tal empezar con nuestras elecciones de compra? ¿Qué se siente mejor contra tu piel, el plástico o las fibras naturales?",
            ],
          },
        ],
        postImageSections: [
          {
            heading: "El Peso de Lo Que Desechamos",
            paragraphs: [
              "Cada segundo, el equivalente a un camión de basura lleno de ropa se quema o entierra en algún lugar de este planeta. A nivel mundial, la industria de la moda genera 92 millones de toneladas de residuos textiles al año — un número tan grande que se vuelve casi abstracto hasta que imaginas las montañas de ropa desechada que cubren el Desierto de Atacama en Chile, visibles desde el espacio, teñidas en los colores de las tendencias de la última temporada.",
              "La moda rápida ha creado un mundo donde la ropa es tratada como desechable. La producción se ha duplicado en las últimas dos décadas mientras que la prenda promedio se usa menos de diez veces antes de ser tirada. No siempre fuimos así. Y no tenemos que seguir siéndolo.",
            ],
          },
          {
            heading: "Las Manos Detrás de la Etiqueta",
            paragraphs: [
              "Hay aproximadamente 40 millones de trabajadores de la confección en el mundo. La mayoría son mujeres. Muchas ganan menos de un salario digno — en algunos de los países productores más grandes, eso significa menos de tres dólares al día. Detrás del precio bajo de una prenda de moda rápida casi siempre hay un ser humano que pagó el verdadero costo.",
              "Los niños también son parte de esta fuerza laboral invisible — en campos de algodón, en instalaciones de teñido, en fábricas sin ventanas. No porque sus familias no tengan amor, sino porque un sistema construido sobre velocidad y bajo costo ha hecho necesario su trabajo para el beneficio de otros.",
              "En 2013, la fábrica Rana Plaza se derrumbó en Bangladesh. 1.134 trabajadores de la confección murieron. Miles más resultaron heridos. Los trabajadores habían reportado grietas en el edificio el día anterior. Se les dijo que regresaran de todas formas.",
              "Compartimos estas verdades no para abrumar, sino porque la conciencia es el primer hilo del cambio. Cuando sabemos, podemos elegir de manera diferente. Y cada elección consciente — cada prenda comprada con intención — es un acto silencioso pero poderoso de solidaridad con las personas y el planeta al otro lado de la etiqueta.",
            ],
            quote: "\"La prenda más sostenible es la que ya está en tu armario. El acto más revolucionario es elegir bien.\"",
          },
          {
            heading: "Fuentes e Inspiración",
            paragraphs: [
              "Para profundizar en la historia detrás de nuestra ropa, estos recursos ofrecieron conocimiento y claridad:",
            ],
            links: SOURCES_WHO_MADE,
          },
        ],
      },
      pl: {
        title: "Kto Uszył Moje Ubrania?",
        sections: [
          {
            paragraphs: [
              "Wierzę (i mam nadzieję), że wszyscy w pewnym momencie zadawaliśmy sobie to pytanie. To w istocie pytanie bardzo ważne, bo komercyjna i produkcyjna strona przemysłu odzieżowego potrafi przytłoczyć.",
              "Każda rzecz Saudade rodzi się z miłości i intencji. Zaprojektowane przez Maykę i wytwarzane w sposób zrównoważony, każde ubranie powstaje z troską — z najszlachetniejszych naturalnych tkanin o wysokiej częstotliwości i we współpracy z twórcami, którzy podzielają nasze przekonanie, że to, jak coś powstaje, znaczy tyle samo, co to, co powstaje. Od nitki po ostatni szew każda decyzja jest zgodna z wizją Saudade: tworzyć piękno, które uzdrawia, czci ziemię i podnosi tych, którzy je noszą.",
            ],
          },
          {
            heading: "Przemysł Modowy",
            paragraphs: [
              "Przyjrzyjmy się najpopularniejszym tkaninom:",
              "Poliester: 55%, Bawełna: 27%, Włókna celulozowe: 7%, Polipropylen: 4%, Nylon: 5%, Wełna: 1%",
              "Poliester w swojej istocie to plastik — produkt ropy, węgla i wody, zaprojektowany dla taniości, nie dla świadomości. Jego produkcja pochłania ogromne ilości wody i chemikaliów — koszt, który po cichu absorbuje nasza planeta. A z każdym praniem mikroplastik trafia do wód, do ekosystemów i do ciał, w sposoby, które dopiero zaczynamy rozumieć.",
              "Czysta, swobodnie płynąca woda jest jednym z naszych najświętszych zasobów. Każdy świadomy wybór, jaki podejmujemy — także to, co nosimy — jest głosem oddanym na świat, w którym chcemy żyć.",
              "Dobra wiadomość jest taka, że natura już dała nam wszystko, czego potrzebujemy. Liczne włókna naturalne mogą całkowicie zastąpić materiały syntetyczne — i większość z nich oferuje znacznie lepszą jakość, trwałość i harmonię z ciałem. Mamy moc, by zbudować zrównoważony świat. Ubranie to jedno z najbardziej namacalnych miejsc, by zacząć.",
              "Może warto zacząć od naszych zakupowych wyborów? Co lepiej leży na Twojej skórze — plastik czy włókna naturalne?",
            ],
          },
        ],
        postImageSections: [
          {
            heading: "Ciężar Tego, Co Wyrzucamy",
            paragraphs: [
              "Co sekundę równowartość pełnej śmieciarki ubrań jest spalana lub zakopywana gdzieś na tej planecie. W skali świata przemysł modowy wytwarza co roku 92 miliony ton odpadów tekstylnych — liczba tak ogromna, że staje się niemal abstrakcją, dopóki nie wyobrazisz sobie gór wyrzuconej odzieży na chilijskiej pustyni Atacama, widocznych z kosmosu, ufarbowanych w kolory trendów minionego sezonu.",
              "Fast fashion stworzyła świat, w którym ubranie traktuje się jak coś jednorazowego. Produkcja podwoiła się w ciągu ostatnich dwóch dekad, a przeciętna rzecz jest zakładana mniej niż dziesięć razy, zanim zostanie wyrzucona. Nie zawsze tacy byliśmy. I nie musimy tacy zostać.",
            ],
          },
          {
            heading: "Ręce Kryjące Się Za Metką",
            paragraphs: [
              "Na świecie jest około 40 milionów osób pracujących w przemyśle odzieżowym. Większość z nich to kobiety. Wiele zarabia mniej niż wynosi godna płaca — w niektórych największych krajach producenckich oznacza to mniej niż trzy dolary dziennie. Za niską ceną na metce ubrania z fast fashion prawie zawsze stoi człowiek, który zapłacił prawdziwy koszt.",
              "Również dzieci są częścią tej niewidzialnej siły roboczej — na polach bawełny, w farbiarniach, w fabrykach bez okien. Nie dlatego, że ich rodzinom brakuje miłości, lecz dlatego, że system zbudowany na szybkości i taniości uczynił ich pracę niezbędną dla cudzego zysku.",
              "W 2013 roku zawaliła się fabryka Rana Plaza w Bangladeszu. Zginęło 1134 pracowników odzieżowych. Tysiące zostały ranne. Pracownicy zgłaszali pęknięcia w budynku już dzień wcześniej. Kazano im wrócić mimo wszystko.",
              "Dzielimy się tymi prawdami nie po to, by przygnieść, lecz dlatego, że świadomość jest pierwszą nicią zmiany. Kiedy wiemy, możemy wybierać inaczej. A każdy świadomy wybór — każde ubranie kupione z intencją — jest cichym, lecz mocnym aktem solidarności z ludźmi i planetą po drugiej stronie metki.",
            ],
            quote: "„Najbardziej zrównoważona rzecz to ta, która już wisi w Twojej szafie. Najbardziej rewolucyjny gest to wybierać dobrze.”",
          },
          {
            heading: "Źródła i Inspiracje",
            paragraphs: [
              "Aby zgłębić historię stojącą za naszymi ubraniami, te źródła dostarczyły wiedzy i jasności:",
            ],
            links: SOURCES_WHO_MADE,
          },
        ],
      },
    },
  },
  {
    slug: "permaculture",
    category: "REGENERATION",
    publishedAt: "2026-07-18",
    author: "Mayka",
    title: "Permaculture — Permanent Culture",
    subtitle:
      "More than a way of growing food, permaculture is a way of remembering how to live — in rhythm with the earth, in care for each other, in designs that heal rather than extract.",
    description:
      "Permaculture is more than a way of growing food. It is a way of remembering how to live in rhythm with the earth — its ethics, its principles, and the dream of Saudade Land.",
    cardImage: "/saudade-land-1.jpg",
    heroImage: "/saudade-land-1.jpg",
    keywords: [
      "permaculture",
      "permanent culture",
      "what is permaculture",
      "permaculture principles",
      "permaculture ethics",
      "Earth Care People Care Fair Share",
      "regenerative agriculture",
      "regenerative design",
      "David Holmgren",
      "Bill Mollison",
      "food forest",
      "soil regeneration",
      "sustainable living",
      "eco-village",
      "Saudade Land",
    ],
    quote: '"Another world is already sprouting in the cracks of this one."',
    // Inline images are interspersed through the sections below via each section's
    // `image` field (see the four `image:` entries). All Unsplash, free license:
    // hands in soil — Neslihan Gunaydin (@honeypoppet); polyculture bed — Pascale Amez
    // (@pascale_amez); harvest — Markus Spiske (@markusspiske); kitchen garden —
    // Fionn Große / (@urdonohue).
    sections: [
      {
        paragraphs: [
          "Permaculture is more than a way of growing food. It is a way of remembering how to live — in rhythm with the earth, in care for each other, in designs that heal rather than extract.",
          "It belongs to no single person. It lives in every gardener who saves seeds, every artist who plants possibility, every community that chooses to regenerate instead of consume. It is the language of everyone who is awake — everyone who is saudade.",
        ],
      },
      {
        heading: "What Is Permaculture?",
        paragraphs: [
          "The word permaculture was coined in the late 1970s by Bill Mollison and David Holmgren as a contraction of \"permanent agriculture\" — and soon widened into \"permanent culture.\" At its heart, it is a way of designing human life so that it works with nature rather than against it.",
        ],
        bullets: [
          "An ethically grounded design system for human habitats and food production that cooperates with living systems instead of exploiting them.",
          "A whole-systems approach that weaves together organic agriculture, renewable energy, water management, natural building, community design, and social structure.",
          "A global movement of people designing regenerative homes, farms, and communities rooted in three ethics: Earth Care, People Care, Fair Share.",
        ],
      },
      {
        quote:
          "\"Permaculture is the harmonious integration of landscape and people — providing for their food, energy, shelter, and other material and non-material needs in a sustainable way.\" — Bill Mollison",
        paragraphs: [
          "But more than a definition, permaculture is a feeling: the certainty that we are not separate from the land, that healing the earth is healing ourselves, that another world is already sprouting in the cracks of this one.",
        ],
        image: "/permaculture-hands-soil.jpg",
      },
      {
        heading: "Why It Matters Now",
        paragraphs: [
          "We live in a time of climate instability, resource depletion, and deep disconnection. Permaculture offers practical, hopeful pathways to survive and thrive — not just by minimizing harm, but by actively regenerating life. Its importance shows up on many levels:",
        ],
        bullets: [
          "Regenerates soil and water — builds living soil, improves water retention, and reduces erosion and drought vulnerability.",
          "Increases biodiversity — creates habitats where plants, animals, insects, and humans can coexist.",
          "Helps address climate change — sequesters carbon through trees, perennial plants, and healthy soils.",
          "Strengthens communities — fosters collaboration, local food security, education, and resilience.",
          "Supports health — physically (cleaner air, water, and nutrient-dense food), mentally (belonging and purpose), and spiritually (meaningful connection to life).",
        ],
      },
      {
        paragraphs: [
          "In a world shaped by extraction, permaculture is a quiet rebellion of care, slowness, and abundance. It is the work of grandmothers saving seeds, young people building community gardens, artists designing living systems, dreamers imagining cities that breathe. It is the collective vision of everyone who is saudade.",
        ],
        image: "/permaculture-garden.jpg",
      },
      {
        heading: "The Ethics and Principles That Guide It",
        paragraphs: ["Permaculture rests on three ethics:"],
        bullets: [
          "Earth Care — recognizing the planet as a living system with intrinsic value.",
          "People Care — meeting human needs with compassion, collaboration, and dignity.",
          "Fair Share — acknowledging limits, redistributing surplus, and caring for future generations.",
        ],
      },
      {
        paragraphs: [
          "From these ethics flow twelve design principles, as articulated by David Holmgren:",
        ],
        bullets: [
          "Observe and interact — learn from the land and the people before designing.",
          "Catch and store energy — sun, water, biomass, knowledge, relationships.",
          "Obtain a yield — ensure tangible benefits: food, shelter, health, joy.",
          "Apply self-regulation and accept feedback — adapt and refine.",
          "Use and value renewable resources — sun, wind, and water over fossil fuels.",
          "Produce no waste — close loops; compost, reuse, share.",
          "Design from patterns to details — see the whole before the parts.",
          "Integrate rather than segregate — create relationships, not isolated elements.",
          "Use small and slow solutions — scalable, adaptable, resilient.",
          "Use and value diversity — ecological and social.",
          "Use edges and value the marginal — creativity often lives at the borders.",
          "Creatively use and respond to change — design for evolution, not stasis.",
        ],
        image: "/permaculture-harvest.jpg",
      },
      {
        quote:
          "These are not rules. They are invitations — ways to align our choices with the intelligence of life.",
      },
      {
        heading: "How to Apply and Benefit From It",
        paragraphs: [
          "You don't need acres of land to practice permaculture. It begins as a way of seeing and grows into a way of living.",
        ],
      },
      {
        heading: "In Your Home and Daily Life",
        bullets: [
          "Observe your space — where do sun, wind, and water flow? Where do you waste energy or food?",
          "Catch and store — collect rainwater, compost food scraps, save seeds, keep knowledge and skills alive.",
          "Reduce waste — choose reusables, repair instead of replace, share what you don't need.",
          "Grow something — even a small herb garden, balcony pots, or a windowsill follows permaculture logic: diversity, soil care, closed loops.",
          "Choose slow, local, seasonal — food, clothing, and objects that last and carry meaning.",
        ],
      },
      {
        heading: "In Gardens and Small Farms",
        bullets: [
          "Design with patterns — beds, paths, and plant groupings that mimic natural systems.",
          "Integrate functions — plants that feed, shade, fix nitrogen, and attract pollinators, together.",
          "Value diversity — mix annuals and perennials, companion plant, invite wildlife.",
          "Build soil — mulch, compost, cover crops, minimal tillage.",
          "Manage water wisely — swales, basins, rainwater harvesting, drip irrigation.",
        ],
      },
      {
        heading: "In Communities and Larger Systems",
        bullets: [
          "Community gardens and CSAs — shared growspaces, local food networks, skill exchanges.",
          "Eco-villages and co-housing — shared energy, water, food, and care systems.",
          "Education and collaboration — workshops, design courses, seed libraries, tool shares.",
          "Support regenerative businesses — brands and projects aligned with Earth Care, People Care, Fair Share, like the vision of Saudade: a creative sanctuary where art, clothing, and land come together in a living system that heals.",
        ],
      },
    ],
    postImageSections: [
      {
        heading: "Saudade and the Dream of Permanent Culture",
        paragraphs: [
          "At Saudade, permaculture is not an add-on. It is the heartbeat of the dream: a sanctuary where art, clothing, and land come together in a living system that heals. This dream does not belong to one person. It belongs to everyone who chooses, in small or large ways, to live as if the future matters —",
        ],
        bullets: [
          "The artists who feel the earth in their work and refuse to create from extraction.",
          "The healers who tend bodies, minds, and soils with the same reverence.",
          "The dreamers who imagine homes, cities, and economies that honor life.",
          "The gardeners, the parents, the teachers, the makers.",
        ],
        image: "/permaculture-kitchen-garden.jpg",
      },
      {
        paragraphs: [
          "Every purchase of Saudade's clothing, every seed planted, every act of care is a step toward Saudade Land — a self-sustaining hub where renewable energy, permaculture, and circular economies replace exploitation and waste.",
          "In this sense, tending your garden, wearing clothes made with intention, sharing skills, and building community are all part of the same movement: creating a permanent culture — one that can endure, regenerate, and hold space for all of us who never quite had a place to belong.",
          "Permaculture, then, is not someone else's project. It is everyone's vision. It is the vision of everyone who is awake, everyone who is saudade.",
        ],
      },
      {
        heading: "A Gentle Invitation",
        paragraphs: [
          "You don't have to change everything at once. Permaculture honors small, slow solutions. Start where you are:",
        ],
        bullets: [
          "Notice one pattern in your life or space.",
          "Catch one form of energy you usually let slip away.",
          "Close one loop — compost, repair, share, plant.",
          "Join or support one project that feels aligned with Earth Care, People Care, Fair Share.",
        ],
        quote:
          "\"We came here to love the world back to life.\" If part of you never forgot this, permaculture is simply a language for that remembering — and you, with your hands, your heart, your choices, are already part of the movement.",
      },
      {
        heading: "Sources and Inspiration",
        paragraphs: [
          "If you feel called to go deeper, these resources offered knowledge, clarity, and fuel for this text. May these paths support your own remembering.",
        ],
        links: SOURCES_PERMACULTURE,
      },
    ],
    translations: {
      pt: {
        title: "Permacultura — Cultura Permanente",
        subtitle:
          "Mais do que um jeito de cultivar alimento, a permacultura é um jeito de lembrar como viver — em ritmo com a terra, em cuidado uns pelos outros, em desenhos que curam em vez de extrair.",
        quote: '"Outro mundo já está brotando nas rachaduras deste."',
        sections: [
          {
            paragraphs: [
              "A permacultura é mais do que um jeito de cultivar alimento. É um jeito de lembrar como viver — em ritmo com a terra, em cuidado uns pelos outros, em desenhos que curam em vez de extrair.",
              "Ela não pertence a ninguém em particular. Vive em cada jardineira que guarda sementes, em cada artista que planta possibilidade, em cada comunidade que escolhe regenerar em vez de consumir. É a língua de todos os que estão despertos — todos os que são saudade.",
            ],
          },
          {
            heading: "O Que É Permacultura?",
            paragraphs: [
              "A palavra permacultura foi cunhada no fim dos anos 1970 por Bill Mollison e David Holmgren como uma contração de \"agricultura permanente\" — e logo se ampliou para \"cultura permanente\". Em sua essência, é um jeito de desenhar a vida humana para que ela trabalhe com a natureza, e não contra ela.",
            ],
            bullets: [
              "Um sistema de design com base ética para habitats humanos e produção de alimentos que coopera com os sistemas vivos em vez de explorá-los.",
              "Uma abordagem de sistemas integrais que tece agricultura orgânica, energia renovável, gestão da água, construção natural, design comunitário e estruturas sociais.",
              "Um movimento global de pessoas desenhando lares, fazendas e comunidades regenerativas enraizadas em três éticas: Cuidar da Terra, Cuidar das Pessoas, Partilha Justa.",
            ],
          },
          {
            quote:
              "\"A permacultura é a integração harmoniosa entre paisagem e pessoas — provendo seu alimento, energia, abrigo e outras necessidades materiais e não materiais de forma sustentável.\" — Bill Mollison",
            paragraphs: [
              "Mas, mais do que uma definição, a permacultura é um sentimento: a certeza de que não somos separados da terra, de que curar a terra é curar a nós mesmos, de que outro mundo já está brotando nas rachaduras deste.",
            ],
          },
          {
            heading: "Por Que Importa Agora",
            paragraphs: [
              "Vivemos num tempo de instabilidade climática, esgotamento de recursos e desconexão profunda. A permacultura oferece caminhos práticos e esperançosos para sobreviver e prosperar — não apenas minimizando danos, mas regenerando a vida ativamente. Sua importância aparece em muitos níveis:",
            ],
            bullets: [
              "Regenera solo e água — constrói solo vivo, melhora a retenção de água e reduz a erosão e a vulnerabilidade à seca.",
              "Aumenta a biodiversidade — cria habitats onde plantas, animais, insetos e humanos podem coexistir.",
              "Ajuda a enfrentar as mudanças climáticas — sequestra carbono por meio de árvores, plantas perenes e solos saudáveis.",
              "Fortalece comunidades — estimula colaboração, segurança alimentar local, educação e resiliência.",
              "Sustenta a saúde — física (ar e água mais limpos e alimento rico em nutrientes), mental (pertencimento e propósito) e espiritual (conexão significativa com a vida).",
            ],
          },
          {
            paragraphs: [
              "Num mundo moldado pela extração, a permacultura é uma rebelião silenciosa de cuidado, lentidão e abundância. É o trabalho das avós que guardam sementes, dos jovens que constroem hortas comunitárias, dos artistas que desenham sistemas vivos, dos sonhadores que imaginam cidades que respiram. É a visão coletiva de todos os que são saudade.",
            ],
          },
          {
            heading: "As Éticas e Princípios Que a Guiam",
            paragraphs: ["A permacultura repousa sobre três éticas:"],
            bullets: [
              "Cuidar da Terra — reconhecer o planeta como um sistema vivo com valor intrínseco.",
              "Cuidar das Pessoas — atender às necessidades humanas com compaixão, colaboração e dignidade.",
              "Partilha Justa — reconhecer limites, redistribuir o excedente e cuidar das gerações futuras.",
            ],
          },
          {
            paragraphs: [
              "Dessas éticas fluem doze princípios de design, tal como articulados por David Holmgren:",
            ],
            bullets: [
              "Observe e interaja — aprenda com a terra e com as pessoas antes de desenhar.",
              "Capte e armazene energia — sol, água, biomassa, conhecimento, relações.",
              "Obtenha um rendimento — garanta benefícios tangíveis: alimento, abrigo, saúde, alegria.",
              "Aplique a autorregulação e aceite retorno — adapte e refine.",
              "Use e valorize recursos renováveis — sol, vento e água em vez de combustíveis fósseis.",
              "Não produza desperdício — feche ciclos; composte, reutilize, compartilhe.",
              "Desenhe dos padrões aos detalhes — veja o todo antes das partes.",
              "Integre em vez de segregar — crie relações, não elementos isolados.",
              "Use soluções pequenas e lentas — escaláveis, adaptáveis, resilientes.",
              "Use e valorize a diversidade — ecológica e social.",
              "Use as bordas e valorize o marginal — a criatividade muitas vezes vive nas fronteiras.",
              "Use com criatividade e responda à mudança — desenhe para a evolução, não para a estagnação.",
            ],
          },
          {
            quote:
              "Estes não são regras. São convites — modos de alinhar nossas escolhas com a inteligência da vida.",
          },
          {
            heading: "Como Aplicar e Se Beneficiar Dela",
            paragraphs: [
              "Você não precisa de hectares de terra para praticar permacultura. Ela começa como um jeito de ver e cresce até virar um jeito de viver.",
            ],
          },
          {
            heading: "Em Casa e no Dia a Dia",
            bullets: [
              "Observe seu espaço — por onde correm o sol, o vento e a água? Onde você desperdiça energia ou alimento?",
              "Capte e armazene — colha água da chuva, composte restos de comida, guarde sementes, mantenha vivos conhecimento e habilidades.",
              "Reduza o desperdício — escolha reutilizáveis, conserte em vez de substituir, compartilhe o que não precisa.",
              "Cultive algo — mesmo uma pequena horta de temperos, vasos na varanda ou um parapeito de janela segue a lógica da permacultura: diversidade, cuidado com o solo, ciclos fechados.",
              "Escolha o lento, o local, o sazonal — alimentos, roupas e objetos que duram e carregam significado.",
            ],
          },
          {
            heading: "Em Hortas e Pequenas Fazendas",
            bullets: [
              "Desenhe com padrões — canteiros, caminhos e agrupamentos de plantas que imitam sistemas naturais.",
              "Integre funções — plantas que alimentam, sombreiam, fixam nitrogênio e atraem polinizadores, juntas.",
              "Valorize a diversidade — misture anuais e perenes, faça consórcios, convide a vida selvagem.",
              "Construa solo — cobertura morta, composto, adubação verde, mínimo revolvimento.",
              "Gerencie a água com sabedoria — valas de infiltração, bacias, captação de chuva, irrigação por gotejamento.",
            ],
          },
          {
            heading: "Em Comunidades e Sistemas Maiores",
            bullets: [
              "Hortas comunitárias e CSAs — espaços de cultivo compartilhados, redes locais de alimento, trocas de saberes.",
              "Ecovilas e cohousing — sistemas compartilhados de energia, água, alimento e cuidado.",
              "Educação e colaboração — oficinas, cursos de design, bibliotecas de sementes, compartilhamento de ferramentas.",
              "Apoie negócios regenerativos — marcas e projetos alinhados com Cuidar da Terra, Cuidar das Pessoas, Partilha Justa, como a visão da Saudade: um santuário criativo onde arte, roupa e terra se unem num sistema vivo que cura.",
            ],
          },
        ],
        postImageSections: [
          {
            heading: "A Saudade e o Sonho da Cultura Permanente",
            paragraphs: [
              "Na Saudade, a permacultura não é um acréscimo. É o coração do sonho: um santuário onde arte, roupa e terra se unem num sistema vivo que cura. Esse sonho não pertence a uma só pessoa. Pertence a todos que escolhem, em pequenos ou grandes gestos, viver como se o futuro importasse —",
            ],
            bullets: [
              "As artistas que sentem a terra em seu trabalho e se recusam a criar a partir da extração.",
              "Os curadores que cuidam de corpos, mentes e solos com a mesma reverência.",
              "Os sonhadores que imaginam lares, cidades e economias que honram a vida.",
              "As jardineiras, as mães e pais, os professores, os fazedores.",
            ],
          },
          {
            paragraphs: [
              "Cada peça de roupa da Saudade, cada semente plantada, cada gesto de cuidado é um passo rumo à Saudade Land — um polo autossustentável onde energia renovável, permacultura e economias circulares substituem a exploração e o desperdício.",
              "Nesse sentido, cuidar da sua horta, vestir roupas feitas com intenção, compartilhar habilidades e construir comunidade são todos parte do mesmo movimento: criar uma cultura permanente — que possa perdurar, regenerar e acolher todas nós que nunca tivemos bem um lugar para pertencer.",
              "A permacultura, então, não é o projeto de outra pessoa. É a visão de todos. É a visão de todos os que estão despertos, todos os que são saudade.",
            ],
          },
          {
            heading: "Um Convite Suave",
            paragraphs: [
              "Você não precisa mudar tudo de uma vez. A permacultura honra soluções pequenas e lentas. Comece de onde você está:",
            ],
            bullets: [
              "Perceba um padrão na sua vida ou no seu espaço.",
              "Capte uma forma de energia que você costuma deixar escapar.",
              "Feche um ciclo — composte, conserte, compartilhe, plante.",
              "Junte-se a ou apoie um projeto que sinta alinhado com Cuidar da Terra, Cuidar das Pessoas, Partilha Justa.",
            ],
            quote:
              "\"Viemos aqui para amar o mundo de volta à vida.\" Se uma parte de você nunca esqueceu isso, a permacultura é simplesmente uma língua para essa lembrança — e você, com suas mãos, seu coração, suas escolhas, já faz parte do movimento.",
          },
          {
            heading: "Fontes e Inspiração",
            paragraphs: [
              "Se você se sentir chamada a ir mais fundo, estes recursos ofereceram conhecimento, clareza e combustível para este texto. Que estes caminhos apoiem a sua própria lembrança.",
            ],
            links: SOURCES_PERMACULTURE,
          },
        ],
      },
      es: {
        title: "Permacultura — Cultura Permanente",
        subtitle:
          "Más que una forma de cultivar alimento, la permacultura es una forma de recordar cómo vivir — en ritmo con la tierra, en cuidado mutuo, en diseños que sanan en lugar de extraer.",
        quote: '"Otro mundo ya está brotando en las grietas de este."',
        sections: [
          {
            paragraphs: [
              "La permacultura es más que una forma de cultivar alimento. Es una forma de recordar cómo vivir — en ritmo con la tierra, en cuidado mutuo, en diseños que sanan en lugar de extraer.",
              "No pertenece a nadie en particular. Vive en cada jardinera que guarda semillas, en cada artista que planta posibilidad, en cada comunidad que elige regenerar en lugar de consumir. Es el idioma de todos los que están despiertos — todos los que son saudade.",
            ],
          },
          {
            heading: "¿Qué Es la Permacultura?",
            paragraphs: [
              "La palabra permacultura fue acuñada a finales de los años setenta por Bill Mollison y David Holmgren como una contracción de \"agricultura permanente\" — y pronto se amplió a \"cultura permanente\". En su esencia, es una forma de diseñar la vida humana para que trabaje con la naturaleza, no contra ella.",
            ],
            bullets: [
              "Un sistema de diseño de base ética para hábitats humanos y producción de alimentos que coopera con los sistemas vivos en lugar de explotarlos.",
              "Un enfoque de sistemas integrales que entreteje agricultura orgánica, energía renovable, gestión del agua, construcción natural, diseño comunitario y estructuras sociales.",
              "Un movimiento global de personas que diseñan hogares, granjas y comunidades regenerativas arraigadas en tres éticas: Cuidado de la Tierra, Cuidado de las Personas, Reparto Justo.",
            ],
          },
          {
            quote:
              "\"La permacultura es la integración armoniosa entre paisaje y personas — proveyendo su alimento, energía, refugio y otras necesidades materiales y no materiales de manera sostenible.\" — Bill Mollison",
            paragraphs: [
              "Pero, más que una definición, la permacultura es un sentimiento: la certeza de que no estamos separados de la tierra, de que sanar la tierra es sanarnos a nosotros mismos, de que otro mundo ya está brotando en las grietas de este.",
            ],
          },
          {
            heading: "Por Qué Importa Ahora",
            paragraphs: [
              "Vivimos en un tiempo de inestabilidad climática, agotamiento de recursos y desconexión profunda. La permacultura ofrece caminos prácticos y esperanzadores para sobrevivir y prosperar — no solo minimizando el daño, sino regenerando la vida activamente. Su importancia se manifiesta en muchos niveles:",
            ],
            bullets: [
              "Regenera suelo y agua — construye suelo vivo, mejora la retención de agua y reduce la erosión y la vulnerabilidad a la sequía.",
              "Aumenta la biodiversidad — crea hábitats donde plantas, animales, insectos y humanos pueden coexistir.",
              "Ayuda a afrontar el cambio climático — secuestra carbono a través de árboles, plantas perennes y suelos sanos.",
              "Fortalece las comunidades — fomenta la colaboración, la seguridad alimentaria local, la educación y la resiliencia.",
              "Sostiene la salud — física (aire y agua más limpios y alimento rico en nutrientes), mental (pertenencia y propósito) y espiritual (conexión significativa con la vida).",
            ],
          },
          {
            paragraphs: [
              "En un mundo moldeado por la extracción, la permacultura es una rebelión silenciosa de cuidado, lentitud y abundancia. Es el trabajo de las abuelas que guardan semillas, de los jóvenes que construyen huertos comunitarios, de los artistas que diseñan sistemas vivos, de los soñadores que imaginan ciudades que respiran. Es la visión colectiva de todos los que son saudade.",
            ],
          },
          {
            heading: "Las Éticas y los Principios Que la Guían",
            paragraphs: ["La permacultura se apoya en tres éticas:"],
            bullets: [
              "Cuidado de la Tierra — reconocer el planeta como un sistema vivo con valor intrínseco.",
              "Cuidado de las Personas — atender las necesidades humanas con compasión, colaboración y dignidad.",
              "Reparto Justo — reconocer los límites, redistribuir el excedente y cuidar de las generaciones futuras.",
            ],
          },
          {
            paragraphs: [
              "De estas éticas fluyen doce principios de diseño, tal como los articuló David Holmgren:",
            ],
            bullets: [
              "Observa e interactúa — aprende de la tierra y de las personas antes de diseñar.",
              "Capta y almacena energía — sol, agua, biomasa, conocimiento, relaciones.",
              "Obtén un rendimiento — asegura beneficios tangibles: alimento, refugio, salud, alegría.",
              "Aplica la autorregulación y acepta la retroalimentación — adapta y afina.",
              "Usa y valora los recursos renovables — sol, viento y agua antes que combustibles fósiles.",
              "No produzcas desperdicio — cierra ciclos; composta, reutiliza, comparte.",
              "Diseña desde los patrones hasta los detalles — mira el todo antes que las partes.",
              "Integra en lugar de segregar — crea relaciones, no elementos aislados.",
              "Usa soluciones pequeñas y lentas — escalables, adaptables, resilientes.",
              "Usa y valora la diversidad — ecológica y social.",
              "Usa los bordes y valora lo marginal — la creatividad a menudo vive en las fronteras.",
              "Usa con creatividad y responde al cambio — diseña para la evolución, no para la inmovilidad.",
            ],
          },
          {
            quote:
              "Estas no son reglas. Son invitaciones — formas de alinear nuestras decisiones con la inteligencia de la vida.",
          },
          {
            heading: "Cómo Aplicarla y Beneficiarse de Ella",
            paragraphs: [
              "No necesitas hectáreas de tierra para practicar la permacultura. Comienza como una forma de ver y crece hasta volverse una forma de vivir.",
            ],
          },
          {
            heading: "En Tu Hogar y en la Vida Diaria",
            bullets: [
              "Observa tu espacio — ¿por dónde fluyen el sol, el viento y el agua? ¿Dónde desperdicias energía o alimento?",
              "Capta y almacena — recoge agua de lluvia, composta los restos de comida, guarda semillas, mantén vivos el conocimiento y las habilidades.",
              "Reduce el desperdicio — elige reutilizables, repara en lugar de reemplazar, comparte lo que no necesitas.",
              "Cultiva algo — incluso un pequeño huerto de hierbas, macetas en el balcón o el alféizar de una ventana sigue la lógica de la permacultura: diversidad, cuidado del suelo, ciclos cerrados.",
              "Elige lo lento, lo local, lo de temporada — alimentos, ropa y objetos que duran y llevan significado.",
            ],
          },
          {
            heading: "En Huertos y Pequeñas Granjas",
            bullets: [
              "Diseña con patrones — bancales, senderos y agrupaciones de plantas que imitan los sistemas naturales.",
              "Integra funciones — plantas que alimentan, dan sombra, fijan nitrógeno y atraen polinizadores, juntas.",
              "Valora la diversidad — mezcla anuales y perennes, asocia cultivos, invita a la vida silvestre.",
              "Construye suelo — acolchado, compost, abonos verdes, mínima labranza.",
              "Gestiona el agua con sabiduría — zanjas de infiltración, cuencas, captación de lluvia, riego por goteo.",
            ],
          },
          {
            heading: "En Comunidades y Sistemas Más Amplios",
            bullets: [
              "Huertos comunitarios y CSA — espacios de cultivo compartidos, redes locales de alimento, intercambios de saberes.",
              "Ecoaldeas y cohousing — sistemas compartidos de energía, agua, alimento y cuidado.",
              "Educación y colaboración — talleres, cursos de diseño, bibliotecas de semillas, préstamo de herramientas.",
              "Apoya negocios regenerativos — marcas y proyectos alineados con Cuidado de la Tierra, Cuidado de las Personas, Reparto Justo, como la visión de Saudade: un santuario creativo donde arte, ropa y tierra se unen en un sistema vivo que sana.",
            ],
          },
        ],
        postImageSections: [
          {
            heading: "Saudade y el Sueño de la Cultura Permanente",
            paragraphs: [
              "En Saudade, la permacultura no es un añadido. Es el corazón del sueño: un santuario donde arte, ropa y tierra se unen en un sistema vivo que sana. Este sueño no pertenece a una sola persona. Pertenece a todos los que eligen, en gestos pequeños o grandes, vivir como si el futuro importara —",
            ],
            bullets: [
              "Las artistas que sienten la tierra en su trabajo y se niegan a crear desde la extracción.",
              "Los sanadores que cuidan cuerpos, mentes y suelos con la misma reverencia.",
              "Los soñadores que imaginan hogares, ciudades y economías que honran la vida.",
              "Las jardineras, las madres y padres, los maestros, los hacedores.",
            ],
          },
          {
            paragraphs: [
              "Cada prenda de Saudade, cada semilla plantada, cada gesto de cuidado es un paso hacia Saudade Land — un núcleo autosostenible donde la energía renovable, la permacultura y las economías circulares reemplazan la explotación y el desperdicio.",
              "En este sentido, cuidar tu huerto, vestir ropa hecha con intención, compartir habilidades y construir comunidad son todos parte del mismo movimiento: crear una cultura permanente — que pueda perdurar, regenerar y acoger a todas las que nunca tuvimos del todo un lugar al que pertenecer.",
              "La permacultura, entonces, no es el proyecto de otra persona. Es la visión de todos. Es la visión de todos los que están despiertos, todos los que son saudade.",
            ],
          },
          {
            heading: "Una Invitación Suave",
            paragraphs: [
              "No tienes que cambiarlo todo de una vez. La permacultura honra las soluciones pequeñas y lentas. Comienza desde donde estás:",
            ],
            bullets: [
              "Nota un patrón en tu vida o en tu espacio.",
              "Capta una forma de energía que sueles dejar escapar.",
              "Cierra un ciclo — composta, repara, comparte, planta.",
              "Únete a o apoya un proyecto que sientas alineado con Cuidado de la Tierra, Cuidado de las Personas, Reparto Justo.",
            ],
            quote:
              "\"Vinimos aquí para amar al mundo de vuelta a la vida.\" Si una parte de ti nunca lo olvidó, la permacultura es simplemente un idioma para ese recuerdo — y tú, con tus manos, tu corazón, tus decisiones, ya eres parte del movimiento.",
          },
          {
            heading: "Fuentes e Inspiración",
            paragraphs: [
              "Si te sientes llamada a profundizar, estos recursos ofrecieron conocimiento, claridad y combustible para este texto. Que estos caminos apoyen tu propio recordar.",
            ],
            links: SOURCES_PERMACULTURE,
          },
        ],
      },
      pl: {
        title: "Permakultura — Kultura Trwała",
        subtitle:
          "Więcej niż sposób uprawy jedzenia, permakultura jest sposobem przypominania sobie, jak żyć — w rytmie z ziemią, w trosce o siebie nawzajem, w projektach, które leczą, zamiast wyzyskiwać.",
        quote: "„Inny świat już kiełkuje w szczelinach tego.”",
        sections: [
          {
            paragraphs: [
              "Permakultura to więcej niż sposób uprawy jedzenia. To sposób przypominania sobie, jak żyć — w rytmie z ziemią, w trosce o siebie nawzajem, w projektach, które leczą, zamiast wyzyskiwać.",
              "Nie należy do nikogo z osobna. Żyje w każdej ogrodniczce, która przechowuje nasiona, w każdym artyście, który sieje możliwość, w każdej wspólnocie, która wybiera regenerację zamiast konsumpcji. To język wszystkich przebudzonych — wszystkich, którzy są saudade.",
            ],
          },
          {
            heading: "Czym Jest Permakultura?",
            paragraphs: [
              "Słowo permakultura zostało ukute pod koniec lat 70. przez Billa Mollisona i Davida Holmgrena jako skrót od „rolnictwa trwałego” — i wkrótce rozszerzyło się do „kultury trwałej”. W swej istocie jest to sposób projektowania ludzkiego życia tak, by współpracowało z naturą, a nie przeciw niej.",
            ],
            bullets: [
              "System projektowania oparty na etyce, dla ludzkich siedlisk i produkcji żywności, który współpracuje z żywymi systemami, zamiast je eksploatować.",
              "Podejście całościowe, splatające rolnictwo ekologiczne, energię odnawialną, gospodarowanie wodą, budownictwo naturalne, projektowanie wspólnot i struktury społeczne.",
              "Globalny ruch ludzi projektujących regeneracyjne domy, gospodarstwa i wspólnoty zakorzenione w trzech zasadach etycznych: Troska o Ziemię, Troska o Ludzi, Sprawiedliwy Podział.",
            ],
          },
          {
            quote:
              "„Permakultura to harmonijna integracja krajobrazu i ludzi — zapewniająca ich pożywienie, energię, schronienie oraz inne materialne i niematerialne potrzeby w sposób zrównoważony.” — Bill Mollison",
            paragraphs: [
              "Ale permakultura to coś więcej niż definicja: to uczucie — pewność, że nie jesteśmy oddzieleni od ziemi, że leczenie ziemi jest leczeniem nas samych, że inny świat już kiełkuje w szczelinach tego.",
            ],
          },
          {
            heading: "Dlaczego To Ważne Teraz",
            paragraphs: [
              "Żyjemy w czasie niestabilności klimatu, wyczerpywania zasobów i głębokiego rozłączenia. Permakultura oferuje praktyczne, pełne nadziei ścieżki, by przetrwać i rozkwitać — nie tylko ograniczając szkody, lecz czynnie regenerując życie. Jej znaczenie ujawnia się na wielu poziomach:",
            ],
            bullets: [
              "Regeneruje glebę i wodę — buduje żywą glebę, poprawia zatrzymywanie wody i zmniejsza erozję oraz podatność na suszę.",
              "Zwiększa bioróżnorodność — tworzy siedliska, w których rośliny, zwierzęta, owady i ludzie mogą współistnieć.",
              "Pomaga stawić czoła zmianom klimatu — wiąże węgiel poprzez drzewa, rośliny wieloletnie i zdrowe gleby.",
              "Wzmacnia wspólnoty — sprzyja współpracy, lokalnemu bezpieczeństwu żywnościowemu, edukacji i odporności.",
              "Wspiera zdrowie — fizyczne (czystsze powietrze, woda i pełnowartościowe jedzenie), psychiczne (przynależność i sens) oraz duchowe (znacząca więź z życiem).",
            ],
          },
          {
            paragraphs: [
              "W świecie ukształtowanym przez wyzysk permakultura jest cichym buntem troski, powolności i obfitości. To dzieło babć przechowujących nasiona, młodych ludzi zakładających ogrody społeczne, artystów projektujących żywe systemy, marzycieli wyobrażających sobie miasta, które oddychają. To wspólna wizja wszystkich, którzy są saudade.",
            ],
          },
          {
            heading: "Etyka i Zasady, Które Ją Prowadzą",
            paragraphs: ["Permakultura opiera się na trzech zasadach etycznych:"],
            bullets: [
              "Troska o Ziemię — uznanie planety za żywy system o wartości samej w sobie.",
              "Troska o Ludzi — zaspokajanie ludzkich potrzeb ze współczuciem, współpracą i godnością.",
              "Sprawiedliwy Podział — uznawanie granic, redystrybucja nadwyżek i troska o przyszłe pokolenia.",
            ],
          },
          {
            paragraphs: [
              "Z tych zasad etycznych wypływa dwanaście zasad projektowych, sformułowanych przez Davida Holmgrena:",
            ],
            bullets: [
              "Obserwuj i wchodź w interakcję — ucz się od ziemi i od ludzi, zanim zaczniesz projektować.",
              "Chwytaj i magazynuj energię — słońce, wodę, biomasę, wiedzę, relacje.",
              "Uzyskuj plon — zapewniaj wymierne korzyści: jedzenie, schronienie, zdrowie, radość.",
              "Stosuj samoregulację i przyjmuj informację zwrotną — dostosowuj i udoskonalaj.",
              "Używaj i ceń zasoby odnawialne — słońce, wiatr i wodę zamiast paliw kopalnych.",
              "Nie wytwarzaj odpadów — zamykaj obiegi; kompostuj, używaj ponownie, dziel się.",
              "Projektuj od wzorców do szczegółów — dostrzegaj całość, zanim zajmiesz się częściami.",
              "Integruj, zamiast segregować — twórz relacje, a nie odosobnione elementy.",
              "Stosuj małe i powolne rozwiązania — skalowalne, elastyczne, odporne.",
              "Używaj i ceń różnorodność — ekologiczną i społeczną.",
              "Wykorzystuj obrzeża i ceń to, co marginalne — kreatywność często żyje na granicach.",
              "Twórczo wykorzystuj zmianę i odpowiadaj na nią — projektuj z myślą o ewolucji, nie o bezruchu.",
            ],
          },
          {
            quote:
              "To nie są zasady. To zaproszenia — sposoby, by uzgodnić nasze wybory z inteligencją życia.",
          },
          {
            heading: "Jak Ją Stosować i Czerpać z Niej Korzyści",
            paragraphs: [
              "Nie potrzebujesz hektarów ziemi, by praktykować permakulturę. Zaczyna się jako sposób patrzenia i wyrasta w sposób życia.",
            ],
          },
          {
            heading: "W Domu i w Codziennym Życiu",
            bullets: [
              "Obserwuj swoją przestrzeń — którędy płyną słońce, wiatr i woda? Gdzie marnujesz energię lub jedzenie?",
              "Chwytaj i magazynuj — zbieraj deszczówkę, kompostuj resztki jedzenia, przechowuj nasiona, pielęgnuj wiedzę i umiejętności.",
              "Ograniczaj odpady — wybieraj rzeczy wielokrotnego użytku, naprawiaj zamiast wymieniać, dziel się tym, czego nie potrzebujesz.",
              "Uprawiaj coś — nawet mały ogródek ziołowy, doniczki na balkonie czy parapet kierują się logiką permakultury: różnorodność, troska o glebę, zamknięte obiegi.",
              "Wybieraj to, co powolne, lokalne i sezonowe — jedzenie, ubrania i przedmioty, które trwają i niosą znaczenie.",
            ],
          },
          {
            heading: "W Ogrodach i Małych Gospodarstwach",
            bullets: [
              "Projektuj według wzorców — grządki, ścieżki i układy roślin naśladujące systemy naturalne.",
              "Łącz funkcje — rośliny, które karmią, dają cień, wiążą azot i przyciągają zapylacze, razem.",
              "Ceń różnorodność — mieszaj rośliny jednoroczne i wieloletnie, uprawiaj współrzędnie, zapraszaj dziką przyrodę.",
              "Buduj glebę — ściółkowanie, kompost, rośliny okrywowe, minimalna uprawa.",
              "Mądrze gospodaruj wodą — rowy chłonne, niecki, zbieranie deszczówki, nawadnianie kropelkowe.",
            ],
          },
          {
            heading: "We Wspólnotach i Większych Systemach",
            bullets: [
              "Ogrody społeczne i CSA — wspólne przestrzenie uprawy, lokalne sieci żywności, wymiana umiejętności.",
              "Ekowioski i kohousing — wspólne systemy energii, wody, żywności i opieki.",
              "Edukacja i współpraca — warsztaty, kursy projektowania, biblioteki nasion, współdzielenie narzędzi.",
              "Wspieraj biznesy regeneracyjne — marki i projekty zgodne z Troską o Ziemię, Troską o Ludzi, Sprawiedliwym Podziałem, jak wizja Saudade: twórcze sanktuarium, w którym sztuka, ubranie i ziemia łączą się w żywy system, który leczy.",
            ],
          },
        ],
        postImageSections: [
          {
            heading: "Saudade i Marzenie o Kulturze Trwałej",
            paragraphs: [
              "W Saudade permakultura nie jest dodatkiem. Jest sercem marzenia: sanktuarium, w którym sztuka, ubranie i ziemia łączą się w żywy system, który leczy. To marzenie nie należy do jednej osoby. Należy do każdego, kto wybiera — w małych lub wielkich gestach — życie tak, jakby przyszłość miała znaczenie —",
            ],
            bullets: [
              "Artystki, które czują ziemię w swojej pracy i odmawiają tworzenia z wyzysku.",
              "Uzdrowiciele, którzy troszczą się o ciała, umysły i gleby z tą samą czcią.",
              "Marzyciele, którzy wyobrażają sobie domy, miasta i gospodarki honorujące życie.",
              "Ogrodniczki, matki i ojcowie, nauczyciele, twórcy.",
            ],
          },
          {
            paragraphs: [
              "Każda część odzieży Saudade, każde zasiane ziarno, każdy gest troski to krok w stronę Saudade Land — samowystarczalnego ośrodka, w którym energia odnawialna, permakultura i gospodarka obiegu zamkniętego zastępują wyzysk i marnotrawstwo.",
              "W tym sensie pielęgnowanie ogrodu, noszenie ubrań tworzonych z intencją, dzielenie się umiejętnościami i budowanie wspólnoty są częścią tego samego ruchu: tworzenia kultury trwałej — takiej, która potrafi przetrwać, regenerować się i dawać miejsce nam wszystkim, którzy nigdy do końca nie mieli dokąd przynależeć.",
              "Permakultura nie jest więc czyimś cudzym projektem. Jest wizją każdego z nas. Jest wizją wszystkich przebudzonych, wszystkich, którzy są saudade.",
            ],
          },
          {
            heading: "Łagodne Zaproszenie",
            paragraphs: [
              "Nie musisz zmieniać wszystkiego naraz. Permakultura honoruje małe, powolne rozwiązania. Zacznij tam, gdzie jesteś:",
            ],
            bullets: [
              "Zauważ jeden wzorzec w swoim życiu lub w swojej przestrzeni.",
              "Uchwyć jedną formę energii, którą zwykle pozwalasz umknąć.",
              "Zamknij jeden obieg — kompostuj, napraw, podziel się, zasadź.",
              "Dołącz do jednego projektu lub wesprzyj go, jeśli czujesz, że jest zgodny z Troską o Ziemię, Troską o Ludzi, Sprawiedliwym Podziałem.",
            ],
            quote:
              "„Przyszliśmy tu, by miłością przywrócić świat do życia.” Jeśli jakaś część ciebie nigdy o tym nie zapomniała, permakultura jest po prostu językiem tego przypominania — a ty, swoimi dłońmi, sercem, wyborami, już jesteś częścią tego ruchu.",
          },
          {
            heading: "Źródła i Inspiracje",
            paragraphs: [
              "Jeśli czujesz wezwanie, by zajrzeć głębiej, te źródła dostarczyły wiedzy, jasności i paliwa dla tego tekstu. Niech te ścieżki wspierają twoje własne przypominanie.",
            ],
            links: SOURCES_PERMACULTURE,
          },
        ],
      },
    },
  },
];

export const BLOG_SLUGS = BLOG_ARTICLES.map((article) => article.slug);

export function getBlogArticleBySlug(slug: string) {
  return BLOG_ARTICLES.find((article) => article.slug === slug);
}

export function getLocalizedBlogArticle(slug: string, locale: string): BlogArticle | undefined {
  const article = BLOG_ARTICLES.find((a) => a.slug === slug);
  if (!article) return undefined;

  const translation = locale === "pt"
    ? article.translations?.pt
    : locale === "es"
    ? article.translations?.es
    : locale === "pl"
    ? article.translations?.pl
    : undefined;

  if (!translation) return article;

  // Image placement is defined once on the base (English) sections. Carry those
  // images across to the translated sections by index so every language keeps the
  // same interspersed layout without duplicating image paths per language.
  const withBaseImages = (
    translated: BlogSection[] | undefined,
    base: BlogSection[] | undefined,
  ) =>
    translated?.map((section, index) =>
      base?.[index]?.image ? { ...section, image: base[index].image } : section,
    );

  return {
    ...article,
    title: translation.title ?? article.title,
    subtitle: translation.subtitle ?? article.subtitle,
    quote: translation.quote ?? article.quote,
    sections: withBaseImages(translation.sections, article.sections) ?? article.sections,
    postImageSections:
      withBaseImages(translation.postImageSections, article.postImageSections) ??
      article.postImageSections,
  };
}

export function getProxiedBlogImageSrc(src: string) {
  // Images are now hosted locally in public/wp-content — return path directly
  if (src.startsWith("/")) return src;
  return `/api/blog-image?src=${encodeURIComponent(src)}`;
}
