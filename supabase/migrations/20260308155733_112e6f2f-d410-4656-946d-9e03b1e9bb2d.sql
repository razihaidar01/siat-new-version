
CREATE OR REPLACE FUNCTION public.get_certificate_document_url(cert_number text)
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT file_url
  FROM public.documents
  WHERE title = cert_number
  LIMIT 1
$$;
