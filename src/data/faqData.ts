// FAQs específicas por área de atuação para SEO

export interface FAQItem {
  question: string;
  answer: string;
}

export const areaFAQs: Record<string, FAQItem[]> = {
  'direito-empresarial': [
    {
      question: "Qual o melhor advogado empresarial em Macapá?",
      answer: "A Juris Company é referência em advocacia empresarial em Macapá, com expertise em assessoria para empresas de petróleo e gás, contratos comerciais, fusões e aquisições, e compliance corporativo no Amapá."
    },
    {
      question: "Quanto custa uma assessoria jurídica empresarial no Amapá?",
      answer: "O custo varia conforme a complexidade e escopo dos serviços. A Juris Company oferece consulta inicial para avaliar suas necessidades e apresentar uma proposta personalizada para sua empresa."
    },
    {
      question: "Quais serviços de direito empresarial a Juris Company oferece em Macapá?",
      answer: "Oferecemos consultoria jurídica preventiva, elaboração e revisão de contratos, assessoria em operações societárias, due diligence, governança corporativa, e assessoria especializada para o setor de petróleo e gás."
    }
  ],
  'direito-tributario': [
    {
      question: "Como fazer planejamento tributário para empresas de petróleo no Amapá?",
      answer: "A Juris Company oferece planejamento tributário especializado para o setor de óleo e gás, otimizando a carga fiscal respeitando a legislação, incluindo benefícios da Zona Franca de Macapá e incentivos regionais."
    },
    {
      question: "Qual advogado tributarista em Macapá entende do setor de petróleo?",
      answer: "Nossa equipe possui expertise específica em tributação do setor petroleiro, incluindo ICMS, PIS/COFINS, e participações especiais sobre exploração de petróleo na costa do Amapá."
    },
    {
      question: "Como defender minha empresa em processos tributários no Amapá?",
      answer: "A Juris Company atua em contencioso tributário administrativo e judicial, com experiência em defesas perante a Receita Federal, SEFAZ-AP e tribunais administrativos e judiciais."
    }
  ],
  'direito-ambiental': [
    {
      question: "Como obter licenciamento ambiental para exploração de petróleo no Amapá?",
      answer: "A Juris Company assessora todo o processo de licenciamento ambiental junto ao IBAMA e órgãos estaduais, incluindo EIA/RIMA, audiências públicas e condicionantes ambientais para operações offshore."
    },
    {
      question: "Qual advogado ambiental em Macapá atende empresas de petróleo?",
      answer: "Nossa equipe é especializada em direito ambiental para o setor de óleo e gás, com experiência em licenciamento, compliance ambiental e defesa em processos administrativos e judiciais."
    },
    {
      question: "O que fazer em caso de autuação ambiental de empresa petroleira no Amapá?",
      answer: "Oferecemos defesa administrativa e judicial em processos ambientais, negociação de TACs (Termos de Ajustamento de Conduta) e gestão de passivos ambientais."
    }
  ],
  'direito-administrativo': [
    {
      question: "Como participar de licitações da ANP no Amapá?",
      answer: "A Juris Company assessora empresas em todo o processo licitatório da ANP, desde a habilitação até a assinatura de contratos de concessão para exploração na costa amapaense."
    },
    {
      question: "Qual advogado em Macapá entende de contratos administrativos de petróleo?",
      answer: "Temos experiência em contratos administrativos do setor de óleo e gás, incluindo concessões, contratos de partilha e acordos regulatórios com a ANP."
    },
    {
      question: "Como impugnar licitação pública no Amapá?",
      answer: "Oferecemos assessoria completa em impugnações e recursos administrativos em processos licitatórios estaduais e federais no Amapá."
    }
  ],
  'direito-trabalhista': [
    {
      question: "Qual advogado trabalhista em Macapá atende empresas offshore?",
      answer: "A Juris Company é especializada em direito trabalhista para o setor de petróleo, incluindo regime offshore, trabalho em plataformas e questões específicas da CLT para petroleiros."
    },
    {
      question: "Como evitar reclamações trabalhistas em empresas de petróleo no Amapá?",
      answer: "Oferecemos consultoria preventiva trabalhista, revisão de contratos de trabalho, adequação de políticas internas e treinamento para gestores sobre compliance trabalhista."
    },
    {
      question: "Quanto custa um advogado trabalhista empresarial em Macapá?",
      answer: "O valor varia conforme o escopo dos serviços. Oferecemos tanto assessoria mensal quanto atendimento por demanda para empresas de todos os portes no Amapá."
    }
  ],
  'direito-imobiliario': [
    {
      question: "Qual advogado imobiliário em Macapá é mais recomendado?",
      answer: "A Juris Company oferece assessoria completa em transações imobiliárias, regularização de imóveis, usucapião e contratos de locação em Macapá e região."
    },
    {
      question: "Como regularizar imóvel rural no Amapá?",
      answer: "Assessoramos todo o processo de regularização fundiária, incluindo georreferenciamento, CAR, e procedimentos junto ao INCRA e cartórios."
    },
    {
      question: "Quanto custa inventário de imóveis em Macapá?",
      answer: "O custo varia conforme o valor dos bens e complexidade do caso. Oferecemos inventário judicial e extrajudicial com acompanhamento completo."
    }
  ],
  'direito-penal': [
    {
      question: "Qual advogado criminalista em Macapá atende empresas?",
      answer: "A Juris Company atua em direito penal econômico e empresarial, incluindo crimes tributários, ambientais, contra a ordem econômica e compliance criminal."
    },
    {
      question: "O que fazer quando empresa é investigada por crime ambiental no Amapá?",
      answer: "Oferecemos defesa criminal especializada desde a fase de inquérito, incluindo acompanhamento de investigações, defesas em ações penais e negociação de acordos."
    },
    {
      question: "Quanto custa advogado criminal empresarial em Macapá?",
      answer: "Os honorários variam conforme a complexidade do caso. Oferecemos análise inicial para definir a melhor estratégia de defesa."
    }
  ],
  'direito-familia-sucessoes': [
    {
      question: "Qual advogado de família em Macapá é mais indicado?",
      answer: "A Juris Company oferece atendimento humanizado em questões de família, incluindo divórcio, guarda de filhos, pensão alimentícia e planejamento sucessório."
    },
    {
      question: "Como fazer inventário de empresário no Amapá?",
      answer: "Assessoramos inventários com patrimônio empresarial, incluindo avaliação de quotas societárias, sucessão na gestão e planejamento patrimonial familiar."
    },
    {
      question: "Quanto tempo demora um divórcio em Macapá?",
      answer: "O divórcio consensual pode ser concluído em poucos dias se realizado em cartório. Oferecemos assessoria para ambas as modalidades."
    }
  ],
  'direito-eleitoral': [
    {
      question: "Qual advogado eleitoral em Macapá para campanhas políticas?",
      answer: "A Juris Company oferece assessoria jurídica completa para campanhas eleitorais no Amapá, desde o registro de candidatura até a prestação de contas."
    },
    {
      question: "Como registrar candidatura no Amapá?",
      answer: "Assessoramos todo o processo de registro junto à Justiça Eleitoral, incluindo documentação, prazos e defesa em impugnações."
    },
    {
      question: "O que fazer em caso de impugnação de candidatura no Amapá?",
      answer: "Oferecemos defesa especializada em processos de impugnação e recursos eleitorais em todas as instâncias."
    }
  ],
  'direito-consumidor': [
    {
      question: "Qual advogado do consumidor em Macapá defende empresas?",
      answer: "A Juris Company atua na defesa de empresas em ações consumeristas, oferecendo consultoria preventiva e representação em processos judiciais e administrativos."
    },
    {
      question: "Como evitar processos de consumidor no Amapá?",
      answer: "Oferecemos consultoria em compliance consumerista, revisão de contratos de adesão e treinamento de equipes para atendimento ao consumidor."
    },
    {
      question: "Quanto custa defesa em ação de consumidor em Macapá?",
      answer: "Os honorários variam conforme o valor da causa e complexidade. Oferecemos análise prévia para definir a melhor estratégia de defesa."
    }
  ]
};

export const getAreaFAQs = (areaId: string): FAQItem[] => {
  return areaFAQs[areaId] || [];
};