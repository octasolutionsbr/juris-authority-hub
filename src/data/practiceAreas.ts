export interface PracticeArea {
  id: string;
  title: string;
  icon: string;
  description: string;
  longDescription: string;
  keywords: string[];
}

export const practiceAreas: PracticeArea[] = [
  {
    id: "direito-empresarial",
    title: "Direito Empresarial",
    icon: "Building2",
    description: "Consultoria estratégica para governança corporativa, M&A e compliance empresarial.",
    longDescription: "Nossa equipe especializada em Direito Empresarial oferece consultoria jurídica completa para empresas de todos os portes. Atuamos em operações de fusões e aquisições, reestruturações societárias, governança corporativa, compliance, contratos empresariais complexos e assessoria em negociações estratégicas.",
    keywords: ["fusões e aquisições", "governança corporativa", "compliance empresarial", "reestruturação societária", "contratos empresariais"]
  },
  {
    id: "direito-tributario",
    title: "Direito Tributário",
    icon: "Calculator",
    description: "Planejamento tributário e contencioso fiscal para otimização de carga tributária.",
    longDescription: "Especialistas em planejamento tributário estratégico, recuperação de créditos tributários, contencioso administrativo e judicial, compensação e restituição de tributos. Atuamos na defesa de autos de infração e na estruturação de operações com eficiência fiscal.",
    keywords: ["planejamento tributário", "recuperação de créditos tributários", "contencioso fiscal", "otimização tributária", "defesa fiscal"]
  },
  {
    id: "direito-imobiliario",
    title: "Direito Imobiliário",
    icon: "Home",
    description: "Assessoria completa em transações imobiliárias, incorporações e regularização.",
    longDescription: "Atuação em todas as fases de empreendimentos imobiliários, desde a aquisição de terrenos, incorporações, loteamentos, contratos de compra e venda, locação comercial, regularização de propriedades e resolução de conflitos imobiliários.",
    keywords: ["incorporações imobiliárias", "transações imobiliárias", "loteamentos", "regularização de imóveis", "contratos imobiliários"]
  },
  {
    id: "direito-trabalhista",
    title: "Direito Trabalhista",
    icon: "Users",
    description: "Consultoria preventiva e contenciosa para relações trabalhistas estratégicas.",
    longDescription: "Assessoria completa em relações trabalhistas, incluindo consultoria preventiva, elaboração de políticas internas, auditorias trabalhistas, defesa em ações judiciais, negociações coletivas e compliance trabalhista.",
    keywords: ["consultoria trabalhista", "defesa trabalhista", "compliance trabalhista", "negociações coletivas", "auditorias trabalhistas"]
  },
  {
    id: "direito-contratual",
    title: "Direito Contratual",
    icon: "FileText",
    description: "Elaboração e revisão de contratos complexos para mitigar riscos empresariais.",
    longDescription: "Especialização em elaboração, análise e negociação de contratos empresariais de alta complexidade, due diligence contratual, gestão de riscos contratuais e resolução de disputas contratuais.",
    keywords: ["contratos empresariais", "due diligence", "gestão de riscos", "negociação contratual", "contratos complexos"]
  },
  {
    id: "direito-ambiental",
    title: "Direito Ambiental",
    icon: "Leaf",
    description: "Licenciamento ambiental e compliance para operações sustentáveis.",
    longDescription: "Consultoria especializada em licenciamento ambiental, regularização de atividades, compliance ambiental, defesa em processos administrativos e judiciais ambientais, e assessoria em transações envolvendo ativos ambientais.",
    keywords: ["licenciamento ambiental", "compliance ambiental", "regularização ambiental", "direito ambiental", "sustentabilidade empresarial"]
  },
  {
    id: "propriedade-intelectual",
    title: "Propriedade Intelectual",
    icon: "Lightbulb",
    description: "Proteção estratégica de marcas, patentes e ativos intangíveis.",
    longDescription: "Registro e proteção de marcas e patentes, contratos de licenciamento, transferência de tecnologia, combate à pirataria e concorrência desleal, e litígios relacionados a propriedade intelectual.",
    keywords: ["registro de marcas", "patentes", "propriedade intelectual", "transferência de tecnologia", "licenciamento"]
  },
  {
    id: "direito-digital",
    title: "Direito Digital",
    icon: "Globe",
    description: "Adequação à LGPD e proteção de dados para empresas digitais.",
    longDescription: "Especialização em proteção de dados pessoais (LGPD), compliance digital, contratos de tecnologia, e-commerce, crimes digitais e direitos autorais no ambiente digital.",
    keywords: ["LGPD", "proteção de dados", "compliance digital", "e-commerce", "contratos de tecnologia"]
  },
];
