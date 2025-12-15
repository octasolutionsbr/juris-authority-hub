import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();
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
        title: t("contact.form.required"),
        description: t("contact.form.requiredMessage"),
        variant: "destructive",
      });
      return;
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
        <section className="pt-28 pb-10 border-b border-border">
          <div className="container mx-auto px-4 lg:px-8">
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
              <span className="text-primary">{t("contact.title")}</span>
            </h1>
            <p className="text-muted-foreground">
              {t("contact.description")}
            </p>
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
                      {t("contact.talkToUs")}
                    </h2>
                    <p className="text-muted-foreground mb-8 leading-relaxed">
                      {t("contact.availabilityFull")}
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4 group">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        <Mail className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2 text-lg">{t("contact.info.email")}</h3>
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
                        <h3 className="font-semibold text-foreground mb-2 text-lg">{t("contact.info.phone")}</h3>
                        <a
                          href="tel:+559632231425"
                          className="text-muted-foreground hover:text-primary transition-colors"
                        >
                          (96) 93223-1425
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 group">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2 text-lg">{t("contact.info.address")}</h3>
                        <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                          {t("contact.info.location")}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 group">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                        <Clock className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2 text-lg">{t("contact.info.hours")}</h3>
                        <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                          {t("contact.info.hoursText")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Form */}
                <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
                  <div className="bg-card border border-border rounded-2xl p-8 shadow-lg">
                    <h2 className="text-2xl font-heading font-bold text-foreground mb-6">
                      {t("contact.sendMessage")}
                    </h2>
                    
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
                          className="h-12"
                        />
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
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
                            className="h-12"
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
                            className="h-12"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                          {t("contact.form.subject")}
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder={t("contact.form.subjectPlaceholder")}
                          className="h-12"
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
                          rows={6}
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full group"
                      >
                        {t("contact.form.submit")}
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
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.817!2d-51.066944!3d0.034722!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8d61925e7f7ea5f1%3A0x1234567890abcdef!2sR.%20Prof.%20Tostes%2C%20783%20-%20Centro%2C%20Macap%C3%A1%20-%20AP%2C%2068900-022!5e0!3m2!1spt-BR!2sbr!4v1234567890123!5m2!1spt-BR!2sbr"
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
