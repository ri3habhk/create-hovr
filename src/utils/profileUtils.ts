import { supabase } from '@/integrations/supabase/client';

/**
 * Safely fetches a user profile, excluding sensitive data if viewing another user's profile
 * @param userId - The user ID to fetch
 * @param isOwnProfile - Whether this is the current user's own profile
 */
export const fetchSafeProfile = async (userId: string, isOwnProfile: boolean = false) => {
  if (isOwnProfile) {
    // Fetch complete profile for own account
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    return { data, error };
  } else {
    // Fetch only safe public data for other users
    const { data, error } = await supabase
      .from('profiles')
      .select('id, full_name, avatar_url, created_at, updated_at')
      .eq('id', userId)
      .single();
    
    return { data, error };
  }
};

/**
 * Sanitizes a profile object to remove sensitive data
 * Useful for client-side filtering before display
 */
export const sanitizeProfile = (profile: any, isOwnProfile: boolean = false) => {
  if (isOwnProfile) {
    return profile;
  }
  
  // Remove sensitive fields
  const { email, phone, ...safeProfile } = profile || {};
  return safeProfile;
};
