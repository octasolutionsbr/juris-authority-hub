import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Mensagem enviada!",
      description: "Entraremos em contato em breve.",
    });

    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-foreground to-foreground/90">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-5xl md:text-6xl font-heading font-bold text-background mb-6">
                Entre em Contato
              </h1>
              <p className="text-xl text-background/80 leading-relaxed">
                Estamos prontos para discutir suas necessidades jurídicas e apresentar soluções personalizadas.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Contact Information */}
                <div className="space-y-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                  <div>
                    <h2 className="text-3xl font-heading font-bold text-foreground mb-6">
                      Fale Conosco
                    </h2>
                    <p className="text-muted-foreground mb-8 leading-relaxed">
                      Nossa equipe está disponível para atendê-lo e oferecer as melhores soluções jurídicas para seu caso.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4 group">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        <Mail className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2 text-lg">Email</h3>
                        <a
                          href="mailto:contato@juriscompany.com"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          contato@juriscompany.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 group">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        <Phone className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2 text-lg">Telefone</h3>
                        <a
                          href="tel:+5511999999999"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          (11) 99999-9999
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 group">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2 text-lg">Endereço</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          Av. Paulista, 1000 - Conjunto 101<br />
                          Bela Vista, São Paulo - SP<br />
                          CEP 01310-100
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 group">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        <Clock className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2 text-lg">Horário de Atendimento</h3>
                        <p className="text-muted-foreground leading-relaxed">
                          Segunda a Sexta: 9h às 18h<br />
                          Sábado: 9h às 13h<br />
                          Domingo: Fechado
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
                  <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
                    <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
                      Envie sua Mensagem
                    </h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                          Nome Completo *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Seu nome completo"
                          required
                          className="h-12"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                            Email *
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="seu@email.com"
                            required
                            className="h-12"
                          />
                        </div>

                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                            Telefone
                          </label>
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="(11) 99999-9999"
                            className="h-12"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                          Assunto
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="Assunto da sua mensagem"
                          className="h-12"
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                          Mensagem *
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Descreva suas necessidades jurídicas..."
                          rows={6}
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full group"
                      >
                        Enviar Mensagem
                        <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="rounded-2xl overflow-hidden shadow-xl border border-border">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.1975397252445!2d-46.65639688502207!3d-23.561684084682836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce59c8da0aa315%3A0xd59f9431f2c9776a!2sAv.%20Paulista%2C%201000%20-%20Bela%20Vista%2C%20S%C3%A3o%20Paulo%20-%20SP!5e0!3m2!1spt-BR!2sbr!4v1234567890123!5m2!1spt-BR!2sbr"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização do escritório"
                />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
