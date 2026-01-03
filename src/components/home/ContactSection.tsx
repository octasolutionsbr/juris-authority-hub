import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";

const ContactSection = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
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

      // Limpar formulário
      setFormData({
        name: "",
        email: "",
        phone: "",
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

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6 animate-fade-in">
              {t("contact.title")} <span className="text-primary">{t("contact.subtitle")}</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed animate-fade-in" style={{ animationDelay: "0.1s" }}>
              {t("contact.description")}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Informações de Contato */}
            <div className="space-y-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div>
                <h3 className="text-2xl font-heading font-bold text-foreground mb-6">
                  {t("contact.talkToUs")}
                </h3>
                <p className="text-muted-foreground mb-8">
                  {t("contact.availability")}
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-background transition-all duration-300">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{t("contact.info.email")}</h4>
                    <a
                      href="mailto:contato@juriscompany.net"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      contato@juriscompany.net
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-background transition-all duration-300">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{t("contact.info.phone")}</h4>
                    <a
                      href="tel:+559632231425"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      (96) 93223-1425
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-background transition-all duration-300">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{t("contact.info.address")}</h4>
                    <p className="text-muted-foreground">
                      R. Prof. Tostes, 783 - Centro<br />
                      Macapá - AP<br />
                      CEP 68900-022
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulário de Contato */}
            <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
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
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
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
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
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
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    {t("contact.form.message")} *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t("contact.form.messagePlaceholder")}
                    rows={5}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full gradient-wine group"
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
    </section>
  );
};

export default ContactSection;
