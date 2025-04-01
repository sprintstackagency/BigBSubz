
-- Function to safely add to a user's balance
CREATE OR REPLACE FUNCTION add_to_balance(user_uuid UUID, amount_to_add DECIMAL)
RETURNS VOID LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  UPDATE profiles
  SET balance = balance + amount_to_add
  WHERE id = user_uuid;
END;
$$;
