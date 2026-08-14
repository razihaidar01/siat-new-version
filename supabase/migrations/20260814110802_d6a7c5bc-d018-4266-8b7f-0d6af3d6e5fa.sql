-- 1. documents: drop overly permissive duplicate policies
DROP POLICY IF EXISTS "Admin can select documents" ON public.documents;
DROP POLICY IF EXISTS "Admin can insert documents" ON public.documents;
DROP POLICY IF EXISTS "Admin can update documents" ON public.documents;
DROP POLICY IF EXISTS "Admin can delete documents" ON public.documents;

-- 2. credit_card_applications: admin-only reads
DROP POLICY IF EXISTS "Admin can view all applications" ON public.credit_card_applications;
CREATE POLICY "Admins can view all applications"
  ON public.credit_card_applications FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- 3. staff_profiles: admin-only writes, column-limited public reads
DROP POLICY IF EXISTS "Admin can insert staff profiles" ON public.staff_profiles;
DROP POLICY IF EXISTS "Admin can update staff profiles" ON public.staff_profiles;
DROP POLICY IF EXISTS "Staff profiles are publicly viewable" ON public.staff_profiles;

CREATE POLICY "Admins can insert staff profiles"
  ON public.staff_profiles FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update staff profiles"
  ON public.staff_profiles FOR UPDATE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete staff profiles"
  ON public.staff_profiles FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can view all staff profiles"
  ON public.staff_profiles FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Public can view active staff basic info"
  ON public.staff_profiles FOR SELECT TO anon
  USING (is_active = true);

REVOKE ALL ON public.staff_profiles FROM anon;
GRANT SELECT (id, employee_id, full_name, designation, department, photo_url, blood_group, date_of_joining, is_active, created_at)
  ON public.staff_profiles TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.staff_profiles TO authenticated;
GRANT ALL ON public.staff_profiles TO service_role;

-- 4. storage.objects: admin-only writes/deletes
DROP POLICY IF EXISTS "Admin can delete storage objects" ON storage.objects;
DROP POLICY IF EXISTS "Admin can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Admin can upload documents" ON storage.objects;
DROP POLICY IF EXISTS "Admin can upload certificates" ON storage.objects;
DROP POLICY IF EXISTS "Admin can upload staff photos" ON storage.objects;
DROP POLICY IF EXISTS "Admin can update staff photos" ON storage.objects;

CREATE POLICY "Admins can upload to managed buckets"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id IN ('certificates','documents','images','staff-photos','gallery-videos')
    AND public.has_role(auth.uid(), 'admin'::app_role)
  );
CREATE POLICY "Admins can update managed bucket objects"
  ON storage.objects FOR UPDATE TO authenticated
  USING (
    bucket_id IN ('certificates','documents','images','staff-photos','gallery-videos')
    AND public.has_role(auth.uid(), 'admin'::app_role)
  );
CREATE POLICY "Admins can delete managed bucket objects"
  ON storage.objects FOR DELETE TO authenticated
  USING (
    bucket_id IN ('certificates','documents','images','staff-photos','gallery-videos')
    AND public.has_role(auth.uid(), 'admin'::app_role)
  );

-- 5. contact_submissions: stop realtime broadcast of lead data
ALTER PUBLICATION supabase_realtime DROP TABLE public.contact_submissions;

-- 6. certificate document lookup: no privilege escalation, public docs only
CREATE OR REPLACE FUNCTION public.get_certificate_document_url(cert_number text)
RETURNS text
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path TO 'public'
AS $function$
  SELECT file_url
  FROM public.documents
  WHERE title = cert_number
    AND is_public = true
  LIMIT 1
$function$;

-- 7. has_role must not be callable by anonymous visitors
REVOKE ALL ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.has_role(uuid, app_role) FROM anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated, service_role;