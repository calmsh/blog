-- Create comments table
create table if not exists comments (
  id uuid default gen_random_uuid() primary key,
  post_id uuid references posts(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create post_likes table
create table if not exists post_likes (
  id uuid default gen_random_uuid() primary key,
  post_id uuid references posts(id) on delete cascade not null,
  user_id uuid references auth.users(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(post_id, user_id)
);

-- Set up Row Level Security (RLS)
alter table comments enable row level security;
alter table post_likes enable row level security;

-- Policies for comments
create policy "Public comments are viewable by everyone." on comments
  for select using (true);

create policy "Authenticated users can insert their own comments." on comments
  for insert with check (auth.uid() = user_id);

create policy "Users can delete their own comments." on comments
  for delete using (auth.uid() = user_id);

-- Policies for post_likes
create policy "Public likes are viewable by everyone." on post_likes
  for select using (true);

create policy "Authenticated users can insert their own likes." on post_likes
  for insert with check (auth.uid() = user_id);

create policy "Users can delete their own likes." on post_likes
  for delete using (auth.uid() = user_id);
