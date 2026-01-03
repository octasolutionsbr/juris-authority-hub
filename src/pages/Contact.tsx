import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Send, Clock, Loader2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";
import SEOHead from "@/components/SEOHead";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: t("contact.form.required"),
        description: t("contact.form.requiredMessage"),
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
          subject: formData.subject || undefined,
          message: formData.message,
        },
      });

      if (error) {
        throw error;
      }

      toast({
        title: t("contact.form.success"),
        description: t("contact.form.successMessage"),
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error: any) {
      console.error("Erro ao enviar contato:", error);
      toast({
        title: "Erro ao enviar mensagem",
        description: "Por favor, tente novamente ou entre em contato por telefone.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Início",
        "item": "https://juriscompany.net/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Contato",
        "item": "https://juriscompany.net/contato"
      }
    ]
  };

  return (
    <>
      <SEOHead 
        title="Contato - Agende uma Consulta"
        description="Entre em contato com a Juris Company em Macapá-AP. Agende uma consulta jurídica com nossos especialistas em direito empresarial, petróleo e gás. Telefone: (96) 93223-1425."
        keywords="contato advogado Macapá, agendar consulta jurídica Amapá, telefone escritório advocacia, endereço Juris Company"
        canonicalUrl="/contato"
        structuredData={breadcrumbSchema}
      />
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow pt-20">
          {/* Contact Content */}
          <section className="py-8 lg:py-12 bg-background min-h-[calc(100vh-5rem)]">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="max-w-6xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
                  {/* Contact Information */}
                  <div className="space-y-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                    <div>
                      <h1 className="text-2xl lg:text-3xl font-heading font-bold text-foreground mb-3">
                        {t("contact.talkToUs")}
                      </h1>
                      <p className="text-muted-foreground text-sm lg:text-base leading-relaxed">
                        {t("contact.availabilityFull")}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-start gap-3 group">
                        <div className="inline-flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 flex-shrink-0">
                          <Mail className="w-5 h-5" />
                        </div>
                        <div>
                          <h2 className="font-semibold text-foreground text-sm lg:text-base">{t("contact.info.email")}</h2>
                          <a
                            href="mailto:contato@juriscompany.net"
                            className="text-muted-foreground text-sm hover:text-primary transition-colors"
                          >
                            contato@juriscompany.net
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 group">
                        <div className="inline-flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 flex-shrink-0">
                          <Phone className="w-5 h-5" />
                        </div>
                        <div>
                          <h2 className="font-semibold text-foreground text-sm lg:text-base">{t("contact.info.phone")}</h2>
                          <a
                            href="tel:+559632231425"
                            className="text-muted-foreground text-sm hover:text-primary transition-colors"
                          >
                            (96) 93223-1425
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 group">
                        <div className="inline-flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 flex-shrink-0">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <div>
                          <h2 className="font-semibold text-foreground text-sm lg:text-base">{t("contact.info.address")}</h2>
                          <address className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line not-italic">
                            {t("contact.info.location")}
                          </address>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 group">
                        <div className="inline-flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 flex-shrink-0">
                          <Clock className="w-5 h-5" />
                        </div>
                        <div>
                          <h2 className="font-semibold text-foreground text-sm lg:text-base">{t("contact.info.hours")}</h2>
                          <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                            {t("contact.info.hoursText")}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Contact Form */}
                  <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
                    <div className="bg-card border border-border rounded-xl p-4 lg:p-6 shadow-lg">
                      <h2 className="text-lg lg:text-xl font-heading font-bold text-foreground mb-4">
                        {t("contact.sendMessage")}
                      </h2>
                      
                      <form onSubmit={handleSubmit} className="space-y-3">
                        <div>
                          <label htmlFor="name" className="block text-xs font-medium text-foreground mb-1">
                            {t("contact.form.name")} *
                          </label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder={t("contact.form.namePlaceholder")}
                            required
                            disabled={isSubmitting}
                            className="h-9"
                          />
                        </div>

                        <div className="grid md:grid-cols-2 gap-3">
                          <div>
                            <label htmlFor="email" className="block text-xs font-medium text-foreground mb-1">
                              {t("contact.form.email")} *
                            </label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder={t("contact.form.emailPlaceholder")}
                              required
                              disabled={isSubmitting}
                              className="h-9"
                            />
                          </div>

                          <div>
                            <label htmlFor="phone" className="block text-xs font-medium text-foreground mb-1">
                              {t("contact.form.phone")}
                            </label>
                            <Input
                              id="phone"
                              name="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder={t("contact.form.phonePlaceholder")}
                              disabled={isSubmitting}
                              className="h-9"
                            />
                          </div>
                        </div>

                        <div>
                          <label htmlFor="subject" className="block text-xs font-medium text-foreground mb-1">
                            {t("contact.form.subject")}
                          </label>
                          <Input
                            id="subject"
                            name="subject"
                            type="text"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder={t("contact.form.subjectPlaceholder")}
                            disabled={isSubmitting}
                            className="h-9"
                          />
                        </div>

                        <div>
                          <label htmlFor="message" className="block text-xs font-medium text-foreground mb-1">
                            {t("contact.form.message")} *
                          </label>
                          <Textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder={t("contact.form.messagePlaceholder")}
                            rows={3}
                            required
                            disabled={isSubmitting}
                            className="resize-none"
                          />
                        </div>

                        <Button
                          type="submit"
                          size="default"
                          className="w-full group"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                              Enviando...
                            </>
                          ) : (
                            <>
                              {t("contact.form.submit")}
                              <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </>
                          )}
                        </Button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Map Section */}
          <section className="py-8 bg-muted/30">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="max-w-6xl mx-auto">
                <div className="rounded-xl overflow-hidden shadow-xl border border-border">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.817!2d-51.066944!3d0.034722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8d61925e7f7ea5f1%3A0x1234567890abcdef!2sR.%20Prof.%20Tostes%2C%20783%20-%20Centro%2C%20Macap%C3%A1%20-%20AP%2C%2068900-022!5e0!3m2!1spt-BR!2sbr!4v1234567890123!5m2!1spt-BR!2sbr"
                    width="100%"
                    height="350"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Localização do escritório Juris Company em Macapá-AP"
                  />
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Contact;
