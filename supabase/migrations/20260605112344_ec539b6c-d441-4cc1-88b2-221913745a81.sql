
-- Lock down SECURITY DEFINER helpers
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC, anon;
-- authenticated still needs EXECUTE so RLS policies can call has_role

-- Tighten insert policies (avoid bare WITH CHECK (true))
DROP POLICY IF EXISTS "Anyone places an order" ON public.orders;
CREATE POLICY "Anyone places an order" ON public.orders
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    total >= 0
    AND subtotal >= 0
    AND length(contact_name) > 0
    AND length(contact_phone) > 0
    AND length(address_line1) > 0
    AND length(city) > 0
    AND (user_id IS NULL OR user_id = auth.uid())
  );

DROP POLICY IF EXISTS "Anyone inserts order items" ON public.order_items;
CREATE POLICY "Anyone inserts order items" ON public.order_items
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    quantity > 0
    AND unit_price >= 0
    AND line_total >= 0
    AND EXISTS (SELECT 1 FROM public.orders o WHERE o.id = order_id)
  );
