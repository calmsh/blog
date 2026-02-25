-- Add user_id column if it doesn't exist
alter table posts add column if not exists user_id uuid references auth.users(id);
