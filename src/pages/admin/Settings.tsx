import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { KeyRound, Mail, Trash2, AlertTriangle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Settings() {
  const { toast } = useToast();
  const { user, logout } = useAuth();
  
  // Change Password State
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  
  // Change Email State
  const [newEmail, setNewEmail] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  
  // Delete Account State
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Erro",
        description: "As senhas não coincidem.",
        variant: "destructive",
      });
      return;
    }
    
    if (newPassword.length < 6) {
      toast({
        title: "Erro",
        description: "A nova senha deve ter pelo menos 6 caracteres.",
        variant: "destructive",
      });
      return;
    }
    
    setPasswordLoading(true);
    
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });
      
      if (error) throw error;
      
      toast({
        title: "Senha alterada",
        description: "Sua senha foi alterada com sucesso.",
      });
      
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      toast({
        title: "Erro ao alterar senha",
        description: error.message || "Ocorreu um erro ao alterar a senha.",
        variant: "destructive",
      });
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleChangeEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newEmail || !newEmail.includes("@")) {
      toast({
        title: "Erro",
        description: "Por favor, insira um email válido.",
        variant: "destructive",
      });
      return;
    }
    
    setEmailLoading(true);
    
    try {
      const { error } = await supabase.auth.updateUser({
        email: newEmail
      });
      
      if (error) throw error;
      
      toast({
        title: "Email de confirmação enviado",
        description: "Um email de confirmação foi enviado para o novo endereço. Verifique sua caixa de entrada.",
      });
      
      setNewEmail("");
    } catch (error: any) {
      toast({
        title: "Erro ao alterar email",
        description: error.message || "Ocorreu um erro ao alterar o email.",
        variant: "destructive",
      });
    } finally {
      setEmailLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirmation !== "EXCLUIR") {
      toast({
        title: "Erro",
        description: "Digite 'EXCLUIR' para confirmar a exclusão.",
        variant: "destructive",
      });
      return;
    }
    
    setDeleteLoading(true);
    
    try {
      // First delete the profile (this will cascade to related data)
      const { error: profileError } = await supabase
        .from("profiles")
        .delete()
        .eq("id", user?.id);
      
      if (profileError) throw profileError;
      
      // Delete user roles
      const { error: rolesError } = await supabase
        .from("user_roles")
        .delete()
        .eq("user_id", user?.id);
      
      if (rolesError) throw rolesError;
      
      // Sign out the user
      await logout();
      
      toast({
        title: "Conta excluída",
        description: "Sua conta foi excluída com sucesso.",
      });
    } catch (error: any) {
      toast({
        title: "Erro ao excluir conta",
        description: error.message || "Ocorreu um erro ao excluir a conta. Entre em contato com o administrador.",
        variant: "destructive",
      });
    } finally {
      setDeleteLoading(false);
      setDeleteConfirmation("");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-4 md:space-y-6 max-w-2xl">
        <div>
          <h1 className="text-2xl md:text-3xl font-heading font-bold">Configurações da Conta</h1>
          <p className="text-sm md:text-base text-muted-foreground mt-1 md:mt-2">
            Gerencie as configurações de segurança da sua conta
          </p>
        </div>

        <div className="grid gap-6">
          {/* Change Password */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <KeyRound className="h-5 w-5 text-primary" />
                <CardTitle>Alterar Senha</CardTitle>
              </div>
              <CardDescription>
                Atualize sua senha para manter sua conta segura
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Senha Atual</Label>
                  <PasswordInput
                    id="current-password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Digite sua senha atual"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">Nova Senha</Label>
                  <PasswordInput
                    id="new-password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Digite a nova senha"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirmar Nova Senha</Label>
                  <PasswordInput
                    id="confirm-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirme a nova senha"
                  />
                </div>
                <Button type="submit" disabled={passwordLoading}>
                  {passwordLoading ? "Alterando..." : "Alterar Senha"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Change Email */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                <CardTitle>Alterar Email</CardTitle>
              </div>
              <CardDescription>
                Email atual: <span className="font-medium">{user?.email}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleChangeEmail} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="new-email">Novo Email</Label>
                  <Input
                    id="new-email"
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="Digite o novo email"
                  />
                  <p className="text-xs text-muted-foreground">
                    Um email de confirmação será enviado para o novo endereço.
                  </p>
                </div>
                <Button type="submit" disabled={emailLoading}>
                  {emailLoading ? "Enviando..." : "Alterar Email"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Delete Account */}
          <Card className="border-destructive/50">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Trash2 className="h-5 w-5 text-destructive" />
                <CardTitle className="text-destructive">Excluir Conta</CardTitle>
              </div>
              <CardDescription>
                Exclua permanentemente sua conta e todos os dados associados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                  <AlertTriangle className="h-5 w-5 text-destructive mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-destructive">Atenção: Esta ação é irreversível</p>
                    <p className="text-xs text-muted-foreground">
                      Ao excluir sua conta, você perderá acesso a todos os seus dados, incluindo perfil, audiências e anúncios.
                    </p>
                  </div>
                </div>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Excluir Minha Conta
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Confirmar Exclusão da Conta</AlertDialogTitle>
                      <AlertDialogDescription className="space-y-3">
                        <p>
                          Você está prestes a excluir permanentemente sua conta. Esta ação não pode ser desfeita.
                        </p>
                        <p>
                          Digite <span className="font-bold text-foreground">EXCLUIR</span> para confirmar:
                        </p>
                        <Input
                          value={deleteConfirmation}
                          onChange={(e) => setDeleteConfirmation(e.target.value)}
                          placeholder="EXCLUIR"
                          className="mt-2"
                        />
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel onClick={() => setDeleteConfirmation("")}>
                        Cancelar
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeleteAccount}
                        disabled={deleteConfirmation !== "EXCLUIR" || deleteLoading}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        {deleteLoading ? "Excluindo..." : "Excluir Conta"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
