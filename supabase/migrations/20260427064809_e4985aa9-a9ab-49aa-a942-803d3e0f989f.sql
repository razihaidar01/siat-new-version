-- Add video support to existing images/gallery table
ALTER TABLE public.images
  ADD COLUMN IF NOT EXISTS media_type TEXT NOT NULL DEFAULT 'image',
  ADD COLUMN IF NOT EXISTS thumbnail_url TEXT,
  ADD COLUMN IF NOT EXISTS duration_seconds INTEGER,
  ADD COLUMN IF NOT EXISTS file_size_bytes BIGINT;

-- Restrict media_type to known values
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'images_media_type_check'
  ) THEN
    ALTER TABLE public.images
      ADD CONSTRAINT images_media_type_check
      CHECK (media_type IN ('image', 'video'));
  END IF;
END $$;

-- Create a public videos bucket (videos can get large; separate from images)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'gallery-videos',
  'gallery-videos',
  true,
  524288000, -- 500 MB hard cap
  ARRAY['video/mp4', 'video/webm', 'video/quicktime']
)
ON CONFLICT (id) DO UPDATE
  SET public = EXCLUDED.public,
      file_size_limit = EXCLUDED.file_size_limit,
      allowed_mime_types = EXCLUDED.allowed_mime_types;

-- RLS for storage.objects on gallery-videos
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects'
      AND policyname = 'Gallery videos are publicly readable'
  ) THEN
    CREATE POLICY "Gallery videos are publicly readable"
      ON storage.objects FOR SELECT
      USING (bucket_id = 'gallery-videos');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects'
      AND policyname = 'Admins can upload gallery videos'
  ) THEN
    CREATE POLICY "Admins can upload gallery videos"
      ON storage.objects FOR INSERT TO authenticated
      WITH CHECK (
        bucket_id = 'gallery-videos'
        AND has_role(auth.uid(), 'admin'::app_role)
      );
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE schemaname = 'storage' AND tablename = 'objects'
      AND policyname = 'Admins can delete gallery videos'
  ) THEN
    CREATE POLICY "Admins can delete gallery videos"
      ON storage.objects FOR DELETE TO authenticated
      USING (
        bucket_id = 'gallery-videos'
        AND has_role(auth.uid(), 'admin'::app_role)
      );
  END IF;
END $$;