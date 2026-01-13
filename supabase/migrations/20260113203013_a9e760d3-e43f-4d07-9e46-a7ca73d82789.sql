-- Create a settings table for app-wide configuration
CREATE TABLE public.app_settings (
  id TEXT PRIMARY KEY DEFAULT 'main',
  maintenance_mode BOOLEAN NOT NULL DEFAULT false,
  maintenance_message TEXT DEFAULT 'Estamos em manutenção. Voltaremos em breve!',
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.app_settings ENABLE ROW LEVEL SECURITY;

-- Anyone can read settings (needed to check maintenance mode)
CREATE POLICY "Anyone can view app settings" 
ON public.app_settings 
FOR SELECT 
USING (true);

-- Only admins can update settings
CREATE POLICY "Admins can update app settings" 
ON public.app_settings 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Insert default settings
INSERT INTO public.app_settings (id, maintenance_mode, maintenance_message)
VALUES ('main', false, 'Estamos em manutenção. Voltaremos em breve!');