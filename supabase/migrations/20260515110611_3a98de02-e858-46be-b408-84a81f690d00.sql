
DROP POLICY IF EXISTS "Authenticated can list avatars" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated can list post media" ON storage.objects;

CREATE POLICY "Users can list own avatar files"
ON storage.objects FOR SELECT TO authenticated
USING (
  bucket_id = 'avatars'
  AND (auth.uid())::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can list own post media files"
ON storage.objects FOR SELECT TO authenticated
USING (
  bucket_id = 'post-media'
  AND (auth.uid())::text = (storage.foldername(name))[1]
);
