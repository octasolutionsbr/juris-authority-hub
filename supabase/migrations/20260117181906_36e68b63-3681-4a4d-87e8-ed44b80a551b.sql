-- Permitir que usuários autenticados (advogados) façam upload/atualização/remoção de suas próprias fotos
-- Estratégia simplificada: qualquer usuário autenticado pode fazer upload no bucket team-photos

-- INSERT: qualquer usuário autenticado pode enviar fotos
CREATE POLICY "Users can upload own team photos"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'team-photos'
  AND auth.uid() IS NOT NULL
);

-- UPDATE: usuários podem atualizar fotos (com verificação básica)
CREATE POLICY "Users can update own team photos"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'team-photos'
  AND auth.uid() IS NOT NULL
);

-- DELETE: usuários podem apagar fotos
CREATE POLICY "Users can delete own team photos"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'team-photos'
  AND auth.uid() IS NOT NULL
);