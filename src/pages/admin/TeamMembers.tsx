import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTeamMembers } from "@/hooks/useTeamMembers";
import { useTranslateTeamMember } from "@/hooks/useTranslateTeamMember";
import { Languages, Loader2, Check, X, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const TeamMembers = () => {
  const { data: members = [], isLoading } = useTeamMembers();
  const { translateMember, translateAllMembers, isTranslating } = useTranslateTeamMember();
  const [translatingId, setTranslatingId] = useState<string | null>(null);

  const handleTranslateOne = async (member: typeof members[0]) => {
    setTranslatingId(member.id);
    try {
      await translateMember({
        memberId: member.id,
        title: member.title,
        bio: member.bio,
        education: member.education || undefined,
        publications: member.publications || undefined,
      });
    } finally {
      setTranslatingId(null);
    }
  };

  const hasEnglishTranslation = (member: typeof members[0]) => {
    return !!(member.title_en && member.bio_en);
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-heading font-bold">Equipe</h1>
            <p className="text-muted-foreground">
              Gerencie as traduções dos perfis dos advogados
            </p>
          </div>
          <Button
            onClick={translateAllMembers}
            disabled={isTranslating}
            className="gap-2"
          >
            {isTranslating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Languages className="h-4 w-4" />
            )}
            Traduzir Todos
          </Button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div className="grid gap-4">
            {members.map((member) => (
              <Card key={member.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-muted to-muted-foreground/20 flex items-center justify-center">
                        <span className="text-lg font-bold text-muted-foreground/50">
                          {member.name.split(" ").map((n) => n[0]).join("")}
                        </span>
                      </div>
                      <div>
                        <CardTitle className="text-lg">{member.name}</CardTitle>
                        <CardDescription>{member.title}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {hasEnglishTranslation(member) ? (
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          <Check className="w-3 h-3 mr-1" />
                          Traduzido
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-amber-600 border-amber-600">
                          <X className="w-3 h-3 mr-1" />
                          Sem tradução
                        </Badge>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleTranslateOne(member)}
                        disabled={isTranslating || translatingId === member.id}
                      >
                        {translatingId === member.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <RefreshCw className="h-4 w-4" />
                        )}
                        <span className="ml-2 hidden sm:inline">
                          {hasEnglishTranslation(member) ? "Retraduzir" : "Traduzir"}
                        </span>
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                {hasEnglishTranslation(member) && (
                  <CardContent className="pt-0">
                    <div className="text-sm text-muted-foreground space-y-2 border-t pt-3">
                      <p>
                        <span className="font-medium">Título (EN):</span>{" "}
                        {member.title_en}
                      </p>
                      <p className="line-clamp-2">
                        <span className="font-medium">Bio (EN):</span>{" "}
                        {member.bio_en}
                      </p>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default TeamMembers;
