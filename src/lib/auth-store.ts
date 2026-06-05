import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Session, User } from "@supabase/supabase-js";

type AuthState = {
  user: User | null;
  session: Session | null;
  loading: boolean;
};

let listeners = new Set<(s: AuthState) => void>();
let state: AuthState = { user: null, session: null, loading: true };
let initialized = false;

function emit() {
  listeners.forEach((l) => l(state));
}

function init() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;
  supabase.auth.onAuthStateChange((_event, session) => {
    state = { user: session?.user ?? null, session, loading: false };
    emit();
  });
  supabase.auth.getSession().then(({ data }) => {
    state = { user: data.session?.user ?? null, session: data.session, loading: false };
    emit();
  });
}

export function useAuth() {
  const [s, setS] = useState<AuthState>(state);
  useEffect(() => {
    init();
    listeners.add(setS);
    setS(state);
    return () => {
      listeners.delete(setS);
    };
  }, []);
  return s;
}

export async function signOut() {
  await supabase.auth.signOut();
}
