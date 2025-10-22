-- Add first_name and last_name columns to profiles table
ALTER TABLE public.profiles 
ADD COLUMN first_name text,
ADD COLUMN last_name text;

-- Migrate existing full_name data to first_name (temporary migration helper)
UPDATE public.profiles 
SET first_name = SPLIT_PART(full_name, ' ', 1),
    last_name = CASE 
        WHEN array_length(string_to_array(full_name, ' '), 1) > 1 
        THEN substring(full_name from position(' ' in full_name) + 1)
        ELSE ''
    END
WHERE full_name IS NOT NULL;