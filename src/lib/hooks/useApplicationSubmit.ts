import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../../components/auth/AuthContext';
import type { ApplicationFormData } from '../validation/application';
import { toast } from 'react-hot-toast';

interface SubmissionResult {
  success: boolean;
  message: string;
  applicationId?: string;
}

export function useApplicationSubmit() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (formData: ApplicationFormData): Promise<SubmissionResult> => {
    if (!user) {
      throw new Error('You must be signed in to submit an application');
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Prepare application data
      const applicationData = {
        ...formData,
        userId: user.uid,
        status: 'pending',
        submittedAt: serverTimestamp(),
        metadata: {
          userEmail: user.email,
          userName: user.displayName,
          submissionDate: new Date().toISOString(),
          lastModified: new Date().toISOString()
        }
      };

      // Create application document
      const applicationsRef = collection(db, 'applications');
      const docRef = await addDoc(applicationsRef, applicationData);

      // Create user-applications link for easy lookup
      const userApplicationsRef = collection(db, `users/${user.uid}/applications`);
      await addDoc(userApplicationsRef, {
        applicationId: docRef.id,
        programId: formData.programSelection.program,
        courseId: formData.programSelection.course,
        status: 'pending',
        submittedAt: serverTimestamp()
      });

      // Show success notification
      toast.success('Application submitted successfully!');

      // Return success result
      return {
        success: true,
        message: 'Application submitted successfully',
        applicationId: docRef.id
      };

    } catch (err) {
      // Handle errors
      console.error('Application submission error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit application';
      
      // Show error notification
      toast.error(errorMessage);
      
      setError(err instanceof Error ? err : new Error(errorMessage));
      
      // Return error result
      return {
        success: false,
        message: errorMessage
      };

    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = useCallback(() => {
    setError(null);
    setIsSubmitting(false);
  }, []);

  return {
    handleSubmit,
    resetForm,
    isSubmitting,
    error
  };
}