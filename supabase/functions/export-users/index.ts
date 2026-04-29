// Temporary migration helper - exports auth users with bcrypt hashes
// DELETE this function after migration is complete
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  // Simple shared-secret guard
  const auth = req.headers.get("x-export-secret");
  if (auth !== "migration-2026-juris-export") {
    return new Response("forbidden", { status: 403, headers: corsHeaders });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

  // Use direct REST + service role to query auth.users via PostgREST is not exposed,
  // so we use the Admin API which paginates.
  const admin = createClient(supabaseUrl, serviceKey, {
    auth: { persistSession: false },
  });

  const allUsers: any[] = [];
  let page = 1;
  while (true) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage: 1000 });
    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    allUsers.push(...data.users);
    if (data.users.length < 1000) break;
    page++;
  }

  // Admin API does not return password hashes. Fetch via direct SQL using pg meta service.
  // Workaround: call internal endpoint via service role on REST? Not available.
  // We must dump via SQL using the service role connection (PostgREST cannot read auth schema).
  // Instead, use the management API style query: not available either.
  // So return only the user metadata; password hashes will be fetched via a SQL function we install.

  const { data: hashes, error: hashErr } = await admin.rpc("export_user_password_hashes");
  return new Response(
    JSON.stringify({
      users: allUsers.map((u) => ({
        id: u.id,
        email: u.email,
        email_confirmed_at: u.email_confirmed_at,
        phone: u.phone,
        created_at: u.created_at,
        raw_user_meta_data: u.user_metadata,
        raw_app_meta_data: u.app_metadata,
      })),
      hashes: hashes || [],
      hashErr: hashErr?.message,
    }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } }
  );
});
