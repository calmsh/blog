-- Allow authenticated users to insert posts
drop policy if exists "Authenticated users can create posts" on posts;
create policy "Authenticated users can create posts" on posts
  for insert with check (auth.uid() = user_id);
