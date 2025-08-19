-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user', 'clinician')),
  specialty TEXT,
  license_number TEXT,
  organization TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles"
ON public.profiles
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name, role)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email),
    CASE 
      WHEN NEW.email = 'enochlebabo@gmail.com' THEN 'admin'
      WHEN NEW.email LIKE '%doctor%' OR NEW.email LIKE '%clinician%' THEN 'clinician'
      ELSE 'user'
    END
  );
  RETURN NEW;
END;
$$;

-- Create trigger for new users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create patient records table
CREATE TABLE public.patient_records (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  patient_name TEXT NOT NULL,
  patient_age INTEGER,
  patient_gender TEXT CHECK (patient_gender IN ('male', 'female', 'other')),
  diagnosis_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  image_url TEXT NOT NULL,
  image_type TEXT NOT NULL CHECK (image_type IN ('oct', 'fundus')),
  diagnosis_result JSONB,
  confidence_score DECIMAL(5,4),
  reviewed_by UUID REFERENCES public.profiles(user_id),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_by UUID NOT NULL REFERENCES public.profiles(user_id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for patient records
ALTER TABLE public.patient_records ENABLE ROW LEVEL SECURITY;

-- Patient records policies
CREATE POLICY "Clinicians and admins can view all patient records"
ON public.patient_records
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role IN ('admin', 'clinician')
  )
);

CREATE POLICY "Users can view their own patient records"
ON public.patient_records
FOR SELECT
USING (created_by = auth.uid());

CREATE POLICY "Clinicians and admins can insert patient records"
ON public.patient_records
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role IN ('admin', 'clinician')
  )
);

CREATE POLICY "Clinicians and admins can update patient records"
ON public.patient_records
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() AND role IN ('admin', 'clinician')
  )
);

-- Add trigger for updated_at
CREATE TRIGGER update_patient_records_updated_at
BEFORE UPDATE ON public.patient_records
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();