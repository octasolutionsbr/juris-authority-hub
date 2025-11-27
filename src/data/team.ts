export interface TeamMember {
  id: string;
  name: string;
  role: "socio" | "associado";
  title: string;
  areas: string[];
  bio: string;
  email: string;
  whatsapp: string;
  photo?: string;
  publications?: string[];
  education?: string[];
}

export const teamMembers: TeamMember[] = [
  {
    id: "dr-carlos-mendes",
    name: "Dr. Carlos Mendes",
    role: "socio",
    title: "Sócio Fundador",
    areas: ["direito-empresarial", "direito-tributario"],
    bio: "Especialista em Direito Empresarial e Tributário com mais de 25 anos de experiência. Atuou em operações de M&A superiores a R$ 500 milhões. Mestre em Direito Tributário pela USP.",
    email: "carlos.mendes@juriscompany.com.br",
    whatsapp: "+5511999990001",
    photo: "carlos-mendes",
    education: [
      "Mestrado em Direito Tributário - USP",
      "Especialização em Direito Empresarial - FGV",
      "Graduação em Direito - USP"
    ],
    publications: [
      "Planejamento Tributário em Operações de M&A (2022)",
      "Governança Corporativa e Compliance (2020)"
    ]
  },
  {
    id: "dra-ana-silva",
    name: "Dra. Ana Silva",
    role: "socio",
    title: "Sócia",
    areas: ["direito-trabalhista", "direito-contratual"],
    bio: "Referência em Direito Trabalhista com expertise em negociações coletivas e contencioso estratégico. Mais de 20 anos defendendo os interesses de grandes corporações.",
    email: "ana.silva@juriscompany.com.br",
    whatsapp: "+5511999990002",
    photo: "ana-silva",
    education: [
      "Especialização em Direito do Trabalho - Mackenzie",
      "Graduação em Direito - PUC-SP"
    ],
    publications: [
      "Compliance Trabalhista na Era Digital (2023)"
    ]
  },
  {
    id: "dr-roberto-costa",
    name: "Dr. Roberto Costa",
    role: "socio",
    title: "Sócio",
    areas: ["direito-imobiliario", "direito-ambiental"],
    bio: "Especialista em grandes empreendimentos imobiliários e licenciamento ambiental. Assessorou projetos imobiliários com VGV superior a R$ 2 bilhões.",
    email: "roberto.costa@juriscompany.com.br",
    whatsapp: "+5511999990003",
    photo: "roberto-costa",
    education: [
      "Especialização em Direito Imobiliário - FGV",
      "Graduação em Direito - USP"
    ]
  },
  {
    id: "dra-patricia-oliveira",
    name: "Dra. Patrícia Oliveira",
    role: "socio",
    title: "Sócia",
    areas: ["propriedade-intelectual", "direito-digital"],
    bio: "Pioneira em Direito Digital no Brasil, com atuação destacada em LGPD e propriedade intelectual. Consultora de startups e empresas de tecnologia.",
    email: "patricia.oliveira@juriscompany.com.br",
    whatsapp: "+5511999990004",
    photo: "patricia-oliveira",
    education: [
      "LLM em Direito Digital - Harvard Law School",
      "Graduação em Direito - FGV"
    ],
    publications: [
      "LGPD na Prática: Guia para Empresas (2023)",
      "Propriedade Intelectual no Ambiente Digital (2021)"
    ]
  },
  {
    id: "dr-fernando-alves",
    name: "Dr. Fernando Alves",
    role: "socio",
    title: "Sócio",
    areas: ["direito-tributario", "direito-contratual"],
    bio: "Especialista em contencioso tributário de alta complexidade e planejamento fiscal estratégico. Recuperou mais de R$ 300 milhões em créditos tributários para clientes.",
    email: "fernando.alves@juriscompany.com.br",
    whatsapp: "+5511999990005",
    photo: "fernando-alves",
    education: [
      "Doutorado em Direito Tributário - USP",
      "Mestrado em Direito Tributário - PUC-SP"
    ]
  },
  {
    id: "dra-juliana-martins",
    name: "Dra. Juliana Martins",
    role: "associado",
    title: "Advogada Associada",
    areas: ["direito-empresarial", "direito-contratual"],
    bio: "Especialista em contratos empresariais complexos e due diligence. Atuou em diversas operações de fusões e aquisições no setor de tecnologia.",
    email: "juliana.martins@juriscompany.com.br",
    whatsapp: "+5511999990006",
    education: [
      "Especialização em Direito Empresarial - Insper",
      "Graduação em Direito - Mackenzie"
    ]
  },
  {
    id: "dr-eduardo-santos",
    name: "Dr. Eduardo Santos",
    role: "associado",
    title: "Advogado Associado",
    areas: ["direito-trabalhista", "direito-empresarial"],
    bio: "Especialista em compliance trabalhista e consultoria preventiva. Desenvolve políticas internas para empresas de médio e grande porte.",
    email: "eduardo.santos@juriscompany.com.br",
    whatsapp: "+5511999990007",
    education: [
      "Especialização em Direito do Trabalho - USP",
      "Graduação em Direito - PUC-SP"
    ]
  },
  {
    id: "dra-camila-rodrigues",
    name: "Dra. Camila Rodrigues",
    role: "associado",
    title: "Advogada Associada",
    areas: ["direito-imobiliario", "direito-contratual"],
    bio: "Atuação focada em incorporações imobiliárias e contratos de locação comercial. Expertise em regularização de grandes empreendimentos.",
    email: "camila.rodrigues@juriscompany.com.br",
    whatsapp: "+5511999990008",
    education: [
      "Especialização em Direito Imobiliário - FGV",
      "Graduação em Direito - Mackenzie"
    ]
  }
];
