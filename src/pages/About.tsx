import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Target, Eye, Award, Users, TrendingUp, Scale, Clock, Shield } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Scale,
      title: "Excelência Jurídica",
      description: "Compromisso com a mais alta qualidade técnica em todas as nossas entregas.",
    },
    {
      icon: Shield,
      title: "Ética e Integridade",
      description: "Conduta profissional pautada pelos mais rigorosos padrões éticos.",
    },
    {
      icon: Users,
      title: "Foco no Cliente",
      description: "Relacionamento próximo e soluções personalizadas para cada necessidade.",
    },
    {
      icon: TrendingUp,
      title: "Inovação",
      description: "Uso de tecnologia e metodologias modernas para resultados superiores.",
    },
  ];

  const stats = [
    { number: "25+", label: "Anos de Experiência" },
    { number: "500+", label: "Clientes Atendidos" },
    { number: "1.000+", label: "Casos de Sucesso" },
    { number: "R$ 2Bi+", label: "Em Operações" },
  ];

  const differentials = [
    {
      icon: Clock,
      title: "Agilidade",
      description: "Respostas rápidas e prazos cumpridos com precisão.",
    },
    {
      icon: Award,
      title: "Especialização",
      description: "Equipe altamente qualificada em diversas áreas do direito.",
    },
    {
      icon: Target,
      title: "Resultados",
      description: "Foco em soluções práticas e efetivas para nossos clientes.",
    },
    {
      icon: Eye,
      title: "Transparência",
      description: "Comunicação clara e honesta em todas as etapas.",
    },
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-foreground to-foreground/90">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-heading font-bold text-background mb-6">
                Sobre Nós
              </h1>
              <p className="text-xl text-background/80 leading-relaxed">
                Excelência jurídica e compromisso com resultados que transformam
                negócios e protegem interesses.
              </p>
            </div>
          </div>
        </section>

        {/* Nossa História */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-8">
                Nossa História
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Fundado em 2000, o escritório nasceu da visão de profissionais experientes
                  que acreditavam em uma advocacia diferente: estratégica, próxima e
                  orientada por resultados concretos.
                </p>
                <p>
                  Ao longo de mais de duas décadas, construímos uma trajetória sólida,
                  assessorando desde startups inovadoras até grandes corporações em
                  operações complexas que somam bilhões de reais.
                </p>
                <p>
                  Hoje, somos reconhecidos como um dos principais escritórios de advocacia
                  empresarial do país, com uma equipe multidisciplinar de especialistas
                  dedicados a entregar soluções jurídicas de excelência.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Missão e Visão */}
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <Card className="p-8 border-2">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Target className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-foreground">
                    Missão
                  </h3>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Oferecer soluções jurídicas estratégicas e personalizadas, protegendo
                  os interesses de nossos clientes com excelência técnica, ética e
                  comprometimento com resultados excepcionais.
                </p>
              </Card>

              <Card className="p-8 border-2">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Eye className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-foreground">
                    Visão
                  </h3>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Ser reconhecido como referência nacional em advocacia empresarial,
                  destacando-nos pela inovação, qualidade técnica e pela construção de
                  relações duradouras baseadas em confiança e resultados.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-12 text-center">
                Nossos Valores
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map((value, index) => {
                  const Icon = value.icon;
                  return (
                    <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                        {value.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {value.description}
                      </p>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Números */}
        <section className="py-20 bg-gradient-to-br from-primary to-primary/80">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground mb-12 text-center">
                Nossa Trajetória em Números
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-4xl md:text-5xl font-heading font-bold text-primary-foreground mb-2">
                      {stat.number}
                    </div>
                    <div className="text-lg text-primary-foreground/80">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Diferenciais */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-12 text-center">
                Nossos Diferenciais
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {differentials.map((diff, index) => {
                  const Icon = diff.icon;
                  return (
                    <div key={index} className="text-center">
                      <div className="w-20 h-20 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 hover:bg-primary hover:scale-105 transition-all duration-300 group">
                        <Icon className="w-10 h-10 text-primary group-hover:text-primary-foreground transition-colors" />
                      </div>
                      <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                        {diff.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {diff.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
