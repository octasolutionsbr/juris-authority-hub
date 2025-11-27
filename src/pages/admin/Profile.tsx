import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Upload } from "lucide-react";

export default function AdminProfile() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const practiceAreas = [
    "Direito Empresarial",
    "Direito Tributário",
    "Direito Trabalhista",
    "Direito Contratual",
    "Direito Imobiliário",
    "Direito Ambiental",
    "Propriedade Intelectual",
    "Direito Digital",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      toast({ title: "Perfil atualizado com sucesso!" });
      setLoading(false);
    }, 1000);
  };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-4xl">
        <div>
          <h1 className="text-3xl font-heading font-bold">Meu Perfil</h1>
          <p className="text-muted-foreground mt-2">
            Gerencie suas informações profissionais
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Foto de Perfil */}
          <Card>
            <CardHeader>
              <CardTitle>Foto de Perfil</CardTitle>
              <CardDescription>Adicione uma foto profissional</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
                  <User className="h-12 w-12 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <Button type="button" variant="outline" size="sm">
                    <Upload className="mr-2 h-4 w-4" />
                    Fazer Upload
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    JPG, PNG ou GIF. Máximo 2MB.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Informações Básicas */}
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Completo</Label>
                  <Input id="name" placeholder="Dr. João Silva" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">Título/Cargo</Label>
                  <Input id="title" placeholder="Sócio Fundador" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Biografia</Label>
                <Textarea 
                  id="bio" 
                  placeholder="Conte sobre sua experiência e especialidades..."
                  rows={5}
                />
              </div>
            </CardContent>
          </Card>

          {/* Áreas de Atuação */}
          <Card>
            <CardHeader>
              <CardTitle>Áreas de Atuação</CardTitle>
              <CardDescription>Selecione suas especialidades</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {practiceAreas.map((area) => (
                  <div key={area} className="flex items-center space-x-2">
                    <Checkbox id={area} />
                    <label
                      htmlFor={area}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {area}
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contatos */}
          <Card>
            <CardHeader>
              <CardTitle>Contatos</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="seu@email.com.br" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="whatsapp">WhatsApp</Label>
                  <Input id="whatsapp" placeholder="+55 11 99999-9999" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Formação e Publicações */}
          <Card>
            <CardHeader>
              <CardTitle>Formação Acadêmica</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea 
                placeholder="Adicione suas formações, uma por linha..."
                rows={4}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Publicações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea 
                placeholder="Liste suas publicações, uma por linha..."
                rows={4}
              />
            </CardContent>
          </Card>

          <Button type="submit" disabled={loading} size="lg">
            {loading ? "Salvando..." : "Salvar Alterações"}
          </Button>
        </form>
      </div>
    </AdminLayout>
  );
}

function User({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
