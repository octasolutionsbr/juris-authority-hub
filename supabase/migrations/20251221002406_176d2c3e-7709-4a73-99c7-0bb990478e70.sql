-- Adicionar keywords geo-localizadas para cada área de atuação
-- Focando em termos de Macapá, Amapá e setor de petróleo/gás

UPDATE practice_areas SET 
  keywords = ARRAY[
    'advogado empresarial Macapá',
    'assessoria jurídica empresas Amapá',
    'direito empresarial petróleo',
    'advogado contratos Macapá',
    'consultoria jurídica empresas norte Brasil',
    'advocacia corporativa Macapá',
    'escritório advocacia empresarial Amapá',
    'advogado óleo e gás Amapá',
    'fusões e aquisições Macapá',
    'compliance empresarial Amapá'
  ],
  keywords_en = ARRAY[
    'business lawyer Macapa',
    'corporate legal services Amapa',
    'oil and gas business law Brazil',
    'contract attorney Macapa',
    'corporate law firm Amazon region',
    'business attorney Amapa',
    'mergers and acquisitions Macapa'
  ]
WHERE id = 'direito-empresarial';

UPDATE practice_areas SET 
  keywords = ARRAY[
    'advogado tributário Macapá',
    'planejamento tributário empresas Amapá',
    'direito tributário petróleo',
    'advogado fiscal Macapá',
    'consultoria tributária empresas petroleiras',
    'impostos empresas Amapá',
    'escritório tributário Macapá',
    'defesa tributária Amapá',
    'ICMS petróleo Amapá',
    'tributos empresas norte Brasil'
  ],
  keywords_en = ARRAY[
    'tax lawyer Macapa',
    'tax planning Amapa',
    'oil industry tax law Brazil',
    'tax attorney Macapa',
    'corporate tax services Amapa'
  ]
WHERE id = 'direito-tributario';

UPDATE practice_areas SET 
  keywords = ARRAY[
    'advogado ambiental Macapá',
    'licenciamento ambiental petróleo Amapá',
    'direito ambiental offshore',
    'advogado licenciamento Macapá',
    'consultoria ambiental empresas petroleiras',
    'licença ambiental exploração petróleo',
    'escritório ambiental Macapá',
    'defesa ambiental Amapá',
    'EIA RIMA petróleo Amapá',
    'legislação ambiental costa Amapá'
  ],
  keywords_en = ARRAY[
    'environmental lawyer Macapa',
    'environmental licensing oil Amapa',
    'offshore environmental law Brazil',
    'environmental permit attorney Macapa',
    'oil exploration environmental services'
  ]
WHERE id = 'direito-ambiental';

UPDATE practice_areas SET 
  keywords = ARRAY[
    'advogado administrativo Macapá',
    'licitações públicas Amapá',
    'direito administrativo petróleo',
    'advogado licitação Macapá',
    'contratos administrativos Amapá',
    'concessão petróleo Amapá',
    'escritório administrativo Macapá',
    'defesa licitação Amapá',
    'regulação ANP Amapá',
    'advocacia pública Macapá'
  ],
  keywords_en = ARRAY[
    'administrative lawyer Macapa',
    'public procurement Amapa',
    'oil concession law Brazil',
    'bidding attorney Macapa',
    'government contracts Amapa'
  ]
WHERE id = 'direito-administrativo';

UPDATE practice_areas SET 
  keywords = ARRAY[
    'advogado trabalhista Macapá',
    'direito trabalhista empresas Amapá',
    'advogado trabalhista offshore',
    'consultoria trabalhista Macapá',
    'reclamação trabalhista Amapá',
    'direito trabalho petróleo',
    'escritório trabalhista Macapá',
    'defesa trabalhista empresarial Amapá',
    'CLT petroleiras Amapá',
    'regime offshore Amapá'
  ],
  keywords_en = ARRAY[
    'labor lawyer Macapa',
    'employment law Amapa',
    'offshore labor law Brazil',
    'employment attorney Macapa',
    'oil industry labor services'
  ]
WHERE id = 'direito-trabalhista';

UPDATE practice_areas SET 
  keywords = ARRAY[
    'advogado imobiliário Macapá',
    'direito imobiliário Amapá',
    'advogado compra e venda imóveis Macapá',
    'consultoria imobiliária Amapá',
    'regularização imóveis Macapá',
    'usucapião Amapá',
    'escritório imobiliário Macapá',
    'contratos imobiliários Amapá',
    'inventário imóveis Macapá',
    'locação comercial Amapá'
  ],
  keywords_en = ARRAY[
    'real estate lawyer Macapa',
    'property law Amapa',
    'real estate attorney Macapa',
    'property contracts Amapa',
    'real estate legal services Amazon'
  ]
WHERE id = 'direito-imobiliario';

UPDATE practice_areas SET 
  keywords = ARRAY[
    'advogado criminal Macapá',
    'advogado penal empresarial Amapá',
    'direito penal econômico Macapá',
    'defesa criminal Macapá',
    'crimes empresariais Amapá',
    'advocacia criminal Macapá',
    'crimes ambientais Amapá',
    'defesa penal Macapá',
    'habeas corpus Amapá',
    'advocacia criminal norte Brasil'
  ],
  keywords_en = ARRAY[
    'criminal lawyer Macapa',
    'white collar crime attorney Amapa',
    'corporate criminal law Brazil',
    'criminal defense Macapa',
    'environmental crimes Amapa'
  ]
WHERE id = 'direito-penal';

UPDATE practice_areas SET 
  keywords = ARRAY[
    'advogado família Macapá',
    'direito sucessório Amapá',
    'advogado divórcio Macapá',
    'inventário Amapá',
    'partilha bens Macapá',
    'pensão alimentícia Amapá',
    'guarda filhos Macapá',
    'testamento Amapá',
    'herança Macapá',
    'advocacia família Amapá'
  ],
  keywords_en = ARRAY[
    'family lawyer Macapa',
    'succession law Amapa',
    'divorce attorney Macapa',
    'inheritance law Amapa',
    'estate planning Macapa'
  ]
WHERE id = 'direito-familia-sucessoes';

UPDATE practice_areas SET 
  keywords = ARRAY[
    'advogado eleitoral Macapá',
    'direito eleitoral Amapá',
    'assessoria campanha Macapá',
    'registro candidatura Amapá',
    'impugnação mandato Macapá',
    'advocacia eleitoral Amapá',
    'recursos eleitorais Macapá',
    'prestação contas campanha Amapá',
    'propaganda eleitoral Macapá',
    'eleições Amapá'
  ],
  keywords_en = ARRAY[
    'election lawyer Macapa',
    'electoral law Amapa',
    'campaign legal services Macapa',
    'political law attorney Amapa'
  ]
WHERE id = 'direito-eleitoral';

UPDATE practice_areas SET 
  keywords = ARRAY[
    'advogado consumidor Macapá',
    'direito do consumidor Amapá',
    'defesa consumidor Macapá',
    'ação consumidor Amapá',
    'indenização consumidor Macapá',
    'advocacia consumidor Amapá',
    'procon Macapá',
    'danos morais consumidor Amapá',
    'recall Macapá',
    'vícios produto Amapá'
  ],
  keywords_en = ARRAY[
    'consumer law Macapa',
    'consumer rights attorney Amapa',
    'consumer protection lawyer Macapa',
    'product liability Amapa'
  ]
WHERE id = 'direito-consumidor';