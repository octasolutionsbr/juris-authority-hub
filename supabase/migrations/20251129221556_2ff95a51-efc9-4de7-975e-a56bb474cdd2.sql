-- Create enums
CREATE TYPE public.app_role AS ENUM ('admin', 'lawyer');
CREATE TYPE public.hearing_type AS ENUM ('Conciliação', 'Instrução', 'Julgamento', 'Inicial', 'Sentença', 'Outras');
CREATE TYPE public.hearing_status AS ENUM ('agendada', 'realizada', 'cancelada', 'adiada');
CREATE TYPE public.listing_category AS ENUM ('imoveis', 'precatorios', 'creditos', 'outros');
CREATE TYPE public.listing_status AS ENUM ('available', 'pending', 'sold');

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  approved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE(user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create practice_areas table
CREATE TABLE public.practice_areas (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  icon TEXT NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,
  keywords TEXT[],
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.practice_areas ENABLE ROW LEVEL SECURITY;

-- Create team_members table
CREATE TABLE public.team_members (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('socio', 'associado')),
  title TEXT NOT NULL,
  bio TEXT NOT NULL,
  email TEXT,
  whatsapp TEXT,
  photo TEXT,
  areas TEXT[],
  education TEXT[],
  publications TEXT[],
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

-- Create hearings table
CREATE TABLE public.hearings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  case_number TEXT NOT NULL,
  court TEXT NOT NULL,
  type hearing_type NOT NULL,
  date_time TIMESTAMP WITH TIME ZONE NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  notes TEXT,
  status hearing_status NOT NULL DEFAULT 'agendada',
  is_shared BOOLEAN NOT NULL DEFAULT false,
  share_token TEXT UNIQUE,
  lawyer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.hearings ENABLE ROW LEVEL SECURITY;

-- Create listings table
CREATE TABLE public.listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category listing_category NOT NULL,
  price DECIMAL(15,2),
  status listing_status NOT NULL DEFAULT 'available',
  images TEXT[],
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;

-- Create security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for profiles
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger for hearings
CREATE TRIGGER update_hearings_updated_at
BEFORE UPDATE ON public.hearings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create trigger for listings
CREATE TRIGGER update_listings_updated_at
BEFORE UPDATE ON public.listings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, approved)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', ''),
    NEW.email,
    false
  );
  RETURN NEW;
END;
$$;

-- Create trigger for new user creation
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles"
ON public.profiles FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update all profiles"
ON public.profiles FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
ON public.user_roles FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for practice_areas
CREATE POLICY "Anyone can view practice areas"
ON public.practice_areas FOR SELECT
USING (true);

CREATE POLICY "Admins can manage practice areas"
ON public.practice_areas FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for team_members
CREATE POLICY "Anyone can view team members"
ON public.team_members FOR SELECT
USING (true);

CREATE POLICY "Admins can manage team members"
ON public.team_members FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for hearings
CREATE POLICY "Lawyers can view their own hearings"
ON public.hearings FOR SELECT
USING (auth.uid() = lawyer_id);

CREATE POLICY "Lawyers can create hearings"
ON public.hearings FOR INSERT
WITH CHECK (auth.uid() = lawyer_id);

CREATE POLICY "Lawyers can update their own hearings"
ON public.hearings FOR UPDATE
USING (auth.uid() = lawyer_id);

CREATE POLICY "Lawyers can delete their own hearings"
ON public.hearings FOR DELETE
USING (auth.uid() = lawyer_id);

CREATE POLICY "Admins can view all hearings"
ON public.hearings FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage all hearings"
ON public.hearings FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for listings
CREATE POLICY "Anyone can view available listings"
ON public.listings FOR SELECT
USING (true);

CREATE POLICY "Approved lawyers can create listings"
ON public.listings FOR INSERT
WITH CHECK (
  auth.uid() = created_by AND
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND approved = true
  )
);

CREATE POLICY "Users can update their own listings"
ON public.listings FOR UPDATE
USING (auth.uid() = created_by);

CREATE POLICY "Users can delete their own listings"
ON public.listings FOR DELETE
USING (auth.uid() = created_by);

CREATE POLICY "Admins can manage all listings"
ON public.listings FOR ALL
USING (public.has_role(auth.uid(), 'admin'));

-- Insert initial practice areas data
INSERT INTO public.practice_areas (id, title, icon, description, long_description, order_index) VALUES
('direito-empresarial', 'Direito Empresarial', 'Briefcase', 'Assessoria completa para empresas, contratos e governança corporativa', 'Oferecemos consultoria jurídica estratégica para empresas de todos os portes, incluindo constituição de sociedades, elaboração e revisão de contratos empresariais, governança corporativa, fusões e aquisições, e compliance empresarial.', 1),
('direito-civil', 'Direito Civil', 'Scale', 'Atuação em contratos, responsabilidade civil e direito de família', 'Nossa equipe especializada atua em todas as áreas do direito civil, incluindo contratos, responsabilidade civil, direito de família, sucessões, direito das coisas e obrigações, sempre buscando soluções jurídicas eficientes e personalizadas.', 2),
('direito-tributario', 'Direito Tributário', 'Calculator', 'Planejamento tributário e contencioso fiscal', 'Auxiliamos empresas e pessoas físicas no planejamento tributário, recuperação de créditos tributários, defesas administrativas e judiciais em questões fiscais, sempre visando a redução da carga tributária dentro da legalidade.', 3),
('direito-trabalhista', 'Direito Trabalhista', 'Users', 'Consultoria preventiva e contencioso trabalhista', 'Prestamos assessoria completa em relações trabalhistas, incluindo consultoria preventiva, elaboração de políticas internas, defesa em reclamatórias trabalhistas e negociações coletivas.', 4),
('direito-imobiliario', 'Direito Imobiliário', 'Home', 'Assessoria em transações imobiliárias e regularizações', 'Atuamos em todas as etapas de negócios imobiliários, desde due diligence até a conclusão de transações, regularizações fundiárias, incorporações imobiliárias e resolução de conflitos.', 5),
('direito-consumidor', 'Direito do Consumidor', 'ShoppingCart', 'Defesa de direitos do consumidor e recall', 'Representamos consumidores e empresas em questões relacionadas ao Código de Defesa do Consumidor, incluindo recalls, vícios de produtos e serviços, e relações de consumo em geral.', 6);

-- Insert initial team members data
INSERT INTO public.team_members (id, name, role, title, bio, email, whatsapp, areas, order_index) VALUES
('roberto-costa', 'Roberto Costa', 'socio', 'Sócio Fundador', 'Advogado com mais de 20 anos de experiência em direito empresarial e tributário. Especialista em reestruturações societárias e planejamento tributário.', 'roberto.costa@juriscompany.com.br', '5511999999001', ARRAY['direito-empresarial', 'direito-tributario'], 1),
('ana-silva', 'Ana Silva', 'socio', 'Sócia Fundadora', 'Especialista em direito civil e imobiliário com ampla experiência em transações complexas e litígios de alto valor.', 'ana.silva@juriscompany.com.br', '5511999999002', ARRAY['direito-civil', 'direito-imobiliario'], 2),
('carlos-mendes', 'Carlos Mendes', 'associado', 'Advogado Associado', 'Advogado focado em direito trabalhista e previdenciário, com experiência em grandes corporações.', 'carlos.mendes@juriscompany.com.br', '5511999999003', ARRAY['direito-trabalhista'], 3),
('patricia-oliveira', 'Patricia Oliveira', 'associado', 'Advogada Associada', 'Especializada em direito do consumidor e responsabilidade civil, com atuação em casos de grande repercussão.', 'patricia.oliveira@juriscompany.com.br', '5511999999004', ARRAY['direito-consumidor', 'direito-civil'], 4),
('fernando-alves', 'Fernando Alves', 'associado', 'Advogado Associado', 'Advogado com foco em contencioso empresarial e recuperação de créditos.', 'fernando.alves@juriscompany.com.br', '5511999999005', ARRAY['direito-empresarial'], 5);