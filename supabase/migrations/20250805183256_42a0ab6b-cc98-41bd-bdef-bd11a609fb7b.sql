-- Enable real-time for tables
ALTER TABLE public.patients REPLICA IDENTITY FULL;
ALTER TABLE public.medical_results REPLICA IDENTITY FULL;
ALTER TABLE public.analysis_sessions REPLICA IDENTITY FULL;

-- Add realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.patients;
ALTER PUBLICATION supabase_realtime ADD TABLE public.medical_results;
ALTER PUBLICATION supabase_realtime ADD TABLE public.analysis_sessions;

-- Create storage bucket for medical images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types) 
VALUES (
  'medical-images', 
  'medical-images', 
  false, 
  52428800, -- 50MB
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
);

-- Storage policies for medical images
CREATE POLICY "Authenticated users can upload medical images"
ON storage.objects FOR INSERT 
WITH CHECK (
  bucket_id = 'medical-images' 
  AND auth.uid() IS NOT NULL
);

CREATE POLICY "Users can view their own medical images"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'medical-images'
  AND (
    -- Users can see their own images
    auth.uid()::text = (storage.foldername(name))[1]
    OR
    -- Admins can see all images
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  )
);

CREATE POLICY "Users can delete their own medical images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'medical-images'
  AND (
    auth.uid()::text = (storage.foldername(name))[1]
    OR
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  )
);

-- Add image_analysis_results table for storing AI analysis
CREATE TABLE public.image_analysis_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  image_url TEXT NOT NULL,
  image_type TEXT NOT NULL CHECK (image_type IN ('fundus', 'oct')),
  analysis_results JSONB,
  confidence_score NUMERIC(5,2),
  detected_conditions TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on image_analysis_results
ALTER TABLE public.image_analysis_results ENABLE ROW LEVEL SECURITY;

-- RLS policies for image_analysis_results
CREATE POLICY "Users can view their own analysis results"
ON public.image_analysis_results FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own analysis results"
ON public.image_analysis_results FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all analysis results"
ON public.image_analysis_results FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Add trigger for updated_at
CREATE TRIGGER update_image_analysis_results_updated_at
BEFORE UPDATE ON public.image_analysis_results
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add education_content table for eye health education
CREATE TABLE public.education_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  author_id UUID,
  is_published BOOLEAN DEFAULT false,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on education_content
ALTER TABLE public.education_content ENABLE ROW LEVEL SECURITY;

-- RLS policies for education_content
CREATE POLICY "Everyone can view published education content"
ON public.education_content FOR SELECT
USING (is_published = true);

CREATE POLICY "Admins can manage all education content"
ON public.education_content FOR ALL
USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE user_id = auth.uid() AND role = 'admin'
  )
);

-- Add trigger for updated_at
CREATE TRIGGER update_education_content_updated_at
BEFORE UPDATE ON public.education_content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample education content
INSERT INTO public.education_content (title, content, category, is_published, tags) VALUES
('Understanding Diabetic Retinopathy', 'Diabetic retinopathy is a diabetes complication that affects eyes. It is caused by damage to the blood vessels of the light-sensitive tissue at the back of the eye (retina). Learn about prevention, symptoms, and treatment options.', 'Disease Information', true, ARRAY['diabetes', 'retinopathy', 'prevention']),
('The Importance of Regular Eye Exams', 'Regular comprehensive eye exams are essential for maintaining good eye health and detecting problems early. Learn how often you should get your eyes examined and what to expect during an eye exam.', 'Prevention', true, ARRAY['eye exam', 'prevention', 'health']),
('Age-Related Macular Degeneration (AMD)', 'AMD is a common eye condition and a leading cause of vision loss among people age 50 and older. It causes damage to the macula, a small spot near the center of the retina.', 'Disease Information', true, ARRAY['amd', 'aging', 'vision loss']),
('Glaucoma: The Silent Thief of Sight', 'Glaucoma is a group of eye conditions that damage the optic nerve, which is vital to good vision. This damage is often caused by abnormally high pressure in your eye.', 'Disease Information', true, ARRAY['glaucoma', 'optic nerve', 'pressure']);