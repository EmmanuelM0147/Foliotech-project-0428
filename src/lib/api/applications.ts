import { SupabaseClient } from '@supabase/supabase-js';

import { ApplicationFormData } from '../validation/application';
import { toast } from 'react-hot-toast';

/**
 * Submits a student application to Supabase
 * @param formData The application form data
 * @returns Promise with success status and message
 */

interface ApplicationResponse {
  success: boolean;
  message: string;
  applicationId?: string;
  error?: any;
}

/**
 * @param formData - The form data to be submitted.
 * @param supabaseClient - The Supabase client instance.
 * @returns A promise that resolves to an `ApplicationResponse` object.
 * @description This function securely handles the submission of user application forms to Supabase.
 */
export async function submitApplicationForm(
  formData: ApplicationFormData,
  supabaseClient: SupabaseClient
): Promise<ApplicationResponse> {
  try {
    // **1. Input Validation:**
    // Check for required fields and data types.
    // Additional validation can be added here, such as min/max lengths, etc.

    // Example validation for personal info:
    const { personalInfo } = formData;
    if (!personalInfo.firstName || !personalInfo.lastName || !personalInfo.email || !personalInfo.phone) {
      return {
        success: false,
        message: 'Missing required fields in personal information.',
        error: 'Validation Error',
      };
    }

    // Email validation using a simple regex (consider using a more robust library).
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(personalInfo.email)) {
      return {
        success: false,
        message: 'Invalid email format.',
        error: 'Validation Error',
      };
    }

    // Phone number validation using a simple regex (consider using a more robust library).
    const phoneRegex = /^[0-9+]+$/;
    if (!phoneRegex.test(personalInfo.phone)) {
      return {
        success: false,
        message: 'Invalid phone number format.',
        error: 'Validation Error',
      };
    }
    
    // Other validation for other fields ...

    // **2. Data Sanitization:**
    // Supabase handles parameterized queries, but for other fields, we sanitize.
    const sanitizedPersonalInfo = {
      firstName: personalInfo.firstName.trim(),
      lastName: personalInfo.lastName.trim(),
      email: personalInfo.email.trim().toLowerCase(),
      phone: personalInfo.phone.trim(),
      //Sanitize other fields here
    };

    // **3. Supabase Interaction:**
    // Use the authenticated Supabase client to interact with the database.
    // Security policies on Supabase tables ensure that only authorized users can insert/update data.

    const { data, error } = await supabaseClient
      .from('applications') // Replace with your table name
      .insert({
        ...formData,
        personal_info: sanitizedPersonalInfo,
        status: 'pending',
        // add other form data here
        // created_at: new Date().toISOString() - you may configure supabase to handle this
        // updated_at: new Date().toISOString()
      })
      .select('id')
      .single();

    if (error) {
      console.error('Supabase error:', error);
      if (error.code === '23505') {
        return {
          success: false,
          message: 'Duplicate submission detected.',
          error: error.message,
        };
      }
      return {
        success: false,
        message: `Supabase error: ${error.message}`,
        error: error.message,
      };
    }

    // Success response.
    return {
      success: true,
      message: 'Application submitted successfully!',
      applicationId: data.id,
    };
  } catch (error) {
    console.error('Unexpected error submitting application:', error);
    // Handle edge cases (e.g., network failure).
    return {
      success: false,
      message: `Unexpected error: ${error instanceof Error ? error.message : 'An unknown error occurred.'}`,
      error,
    };
  }
}


export async function submitApplication(formData: ApplicationFormData, supabaseClient: SupabaseClient = supabase): Promise<{ success: boolean; message: string; applicationId?: string }> {
  try {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('You must be signed in to submit an application');
    }

    // Prepare application data
    const applicationData = {
      user_id: user.id,
      personal_info: formData.personalInfo,
      academic_background: formData.academicBackground,
      program_selection: formData.programSelection,
      accommodation: formData.accommodation,
      referee: formData.referee,
      status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Insert application into Supabase
    const { data, error } = await supabase
      .from('applications')
      .insert(applicationData)
      .select('id')
      .single();

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(error.message);
    }

    // Show success toast
    toast.success('Application submitted successfully!');
    
    // Return success result
    return {
      success: true,
      message: 'Application submitted successfully',
      applicationId: data.id
    };
  } catch (error) {
    console.error('Error submitting application:', error);
    
    // Show error toast
    toast.error(error instanceof Error ? error.message : 'Failed to submit application');
    
    // Return error result
    return {
      success: false, 
      message: error instanceof Error ? error.message : 'Failed to submit application'
    };
  }
}

/**
 * Saves a draft application to Supabase
 * @param formData Partial application form data
 * @param draftId Optional existing draft ID to update
 * @returns Promise with success status and draft ID
 */
export async function saveDraft(formData: Partial<ApplicationFormData>, draftId?: string, supabaseClient: SupabaseClient = supabase): Promise<{ success: boolean; draftId: string }> {
  try {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('You must be signed in to save a draft');
    }

    // Prepare draft data
    const draftData = {
      user_id: user.id,
      personal_info: formData.personalInfo || {},
      academic_background: formData.academicBackground || {},
      program_selection: formData.programSelection || {},
      accommodation: formData.accommodation || {},
      referee: formData.referee || {},
      status: 'draft',
      updated_at: new Date().toISOString()
    };

    let result;

    if (draftId) {
      // Update existing draft
      result = await supabase
        .from('applications') 
        .update(draftData)
        .eq('id', draftId)
        .eq('user_id', user.id)
        .select('id')
        .single();
    } else {
      // Create new draft
      draftData.created_at = new Date().toISOString();
      result = await supabase
        .from('applications')
        .insert(draftData)
        .select('id')
        .single();
    }

    if (result.error) {
      throw new Error(result.error.message);
    }

    return {
      success: true,
      draftId: result.data.id
    };
  } catch (error) {
    console.error('Error saving draft:', error);
    throw error;
  }
}

/**
 * Retrieves a user's applications from Supabase
 * @returns Promise with array of applications
 */
export async function getUserApplications(supabaseClient: SupabaseClient = supabase) {
  try {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('You must be signed in to view applications');
    }

    // Fetch applications
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Error fetching applications:', error);
    throw error;
  }
}

/**
 * Retrieves a specific application by ID
 * @param applicationId The application ID to retrieve
 * @returns Promise with application data
 */
export async function getApplicationById(applicationId: string, supabaseClient: SupabaseClient = supabase) {
  try {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('You must be signed in to view applications');
    }

    // Fetch application
    const { data, error } = await supabase
      .from('applications')
      .select('*')
      .eq('id', applicationId)
      .eq('user_id', user.id)
      .single();

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error('Error fetching application:', error);
    throw error;
  }
}