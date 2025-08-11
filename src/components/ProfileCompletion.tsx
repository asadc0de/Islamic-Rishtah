import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { StepIndicator } from './StepIndicator';
import { ProgressBar } from './ProgressBar';
import { TabNavigation } from './TabNavigation';
import { PersonalInfoStep } from './PersonalInfoStep';
import { ReligiousInfoStep } from './ReligiousInfoStep';
import { FamilyBackgroundStep } from './FamilyBackgroundStep';
import { CareerEducationStep } from './CareerEducationStep';
import { auth, db } from '../firebase/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface FormData {
  personalInfo: {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    gender: string;
    aboutMe: string;
    expectations: string;
    healthConditions: string;
  };
  religiousInfo: {
    sunniMuslim: string;
    revertMuslim: string;
    prayerFrequency: string;
    quranReading: string;
    hijab: string;
    beard: string;
  };
  familyBackground: {
    maritalStatus: string;
    children: string;
    wantChildren: string;
    nationality: string;
    motherTongue: string;
    languagesKnown: string;
    country: string;
    city: string;
  };
  careerEducation: {
    education: string;
    occupation: string;
    income: string;
    employmentStatus: string;
  };
}

export const ProfileCompletion: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const navigate = useNavigate();
  const [showErrors, setShowErrors] = useState(false);
  const [creatingProfile, setCreatingProfile] = useState(false);

  // Set default date of birth to 18 years ago
  const getDefaultDOB = () => {
    const today = new Date();
    today.setFullYear(today.getFullYear() - 18);
    return today.toISOString().split('T')[0];
  };
  const [formData, setFormData] = useState<FormData>({
    personalInfo: {
      firstName: '',
      lastName: '',
      dateOfBirth: getDefaultDOB(),
      gender: '',
      aboutMe: '',
      expectations: '',
      healthConditions: '',
    },
    religiousInfo: {
      sunniMuslim: '',
      revertMuslim: '',
      prayerFrequency: '',
      quranReading: '',
      hijab: '',
      beard: '',
    },
    familyBackground: {
      maritalStatus: '',
      children: '',
      wantChildren: '',
      nationality: '',
      motherTongue: '',
      languagesKnown: '',
      country: '',
      city: '',
    },
    careerEducation: {
      education: '',
      occupation: '',
      income: '',
      employmentStatus: '',
    },
  });

  const updateFormData = (section: keyof FormData, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  // Validation functions for each step, return error objects
  const validatePersonalInfo = (data: FormData['personalInfo']) => {
    const errors: any = {};
    if (!data.firstName) errors.firstName = 'First name is required.';
    if (!data.lastName) errors.lastName = 'Last name is required.';
    if (!data.dateOfBirth) errors.dateOfBirth = 'Date of birth is required.';
    else {
      const dob = new Date(data.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      const day = today.getDate() - dob.getDate();
      let is18 = age > 18 || (age === 18 && (m > 0 || (m === 0 && day >= 0)));
      if (!is18) errors.dateOfBirth = 'You must be at least 18 years old.';
      if (dob > today) errors.dateOfBirth = 'Date of birth cannot be in the future.';
    }
    if (!data.gender) errors.gender = 'Gender is required.';
    if (!data.aboutMe) errors.aboutMe = 'About Me is required.';
    if (!data.expectations) errors.expectations = 'Expectations are required.';
    if (!data.healthConditions) errors.healthConditions = 'Health conditions are required.';
    return errors;
  };
  const validateReligiousInfo = (data: FormData['religiousInfo']) => {
    const errors: any = {};
    if (!data.sunniMuslim) errors.sunniMuslim = 'Required.';
    if (!data.revertMuslim) errors.revertMuslim = 'Required.';
    if (!data.prayerFrequency) errors.prayerFrequency = 'Required.';
    if (!data.quranReading) errors.quranReading = 'Required.';
    if (!data.hijab) errors.hijab = 'Required.';
    if (!data.beard) errors.beard = 'Required.';
    return errors;
  };
  const validateFamilyBackground = (data: FormData['familyBackground']) => {
    const errors: any = {};
    if (!data.maritalStatus) errors.maritalStatus = 'Required.';
    if (!data.children) errors.children = 'Required.';
    if (!data.wantChildren) errors.wantChildren = 'Required.';
    if (!data.nationality) errors.nationality = 'Required.';
    if (!data.motherTongue) errors.motherTongue = 'Required.';
    if (!data.country) errors.country = 'Required.';
    if (!data.city) errors.city = 'Required.';
    return errors;
  };
  const validateCareerEducation = (data: FormData['careerEducation']) => {
    const errors: any = {};
    if (!data.education) errors.education = 'Required.';
    if (!data.occupation) errors.occupation = 'Required.';
    if (!data.income) errors.income = 'Required.';
    if (!data.employmentStatus) errors.employmentStatus = 'Required.';
    return errors;
  };

  // Error state for each step
  const [stepErrors, setStepErrors] = useState<any>({});
  // Validate and update errors on every change
  const handleStepChange = (section: keyof FormData, data: any) => {
    updateFormData(section, data);
    let errors = {};
    if (section === 'personalInfo') errors = validatePersonalInfo({ ...formData.personalInfo, ...data });
    if (section === 'religiousInfo') errors = validateReligiousInfo({ ...formData.religiousInfo, ...data });
    if (section === 'familyBackground') errors = validateFamilyBackground({ ...formData.familyBackground, ...data });
    if (section === 'careerEducation') errors = validateCareerEducation({ ...formData.careerEducation, ...data });
    setStepErrors(errors);
    // Remove error display if all errors are gone
    if (Object.keys(errors).length === 0) setShowErrors(false);
  };

  const handleNext = () => {
    let errors = {};
    if (currentStep === 1) errors = validatePersonalInfo(formData.personalInfo);
    if (currentStep === 2) errors = validateReligiousInfo(formData.religiousInfo);
    if (currentStep === 3) errors = validateFamilyBackground(formData.familyBackground);
    setStepErrors(errors);
    setShowErrors(Object.keys(errors).length > 0);
    if (Object.keys(errors).length === 0 && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      setShowErrors(false);
      setStepErrors({});
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCompleteProfile = async () => {
    let errors = validatePersonalInfo(formData.personalInfo);
    if (Object.keys(errors).length > 0) {
      setCurrentStep(1);
      setShowErrors(true);
      setStepErrors(errors);
      return;
    }
    errors = validateReligiousInfo(formData.religiousInfo);
    if (Object.keys(errors).length > 0) {
      setCurrentStep(2);
      setShowErrors(true);
      setStepErrors(errors);
      return;
    }
    errors = validateFamilyBackground(formData.familyBackground);
    if (Object.keys(errors).length > 0) {
      setCurrentStep(3);
      setShowErrors(true);
      setStepErrors(errors);
      return;
    }
    errors = validateCareerEducation(formData.careerEducation);
    if (Object.keys(errors).length > 0) {
      setCurrentStep(4);
      setShowErrors(true);
      setStepErrors(errors);
      return;
    }
    setShowErrors(false);
    setStepErrors({});
    const user = auth.currentUser;
    if (!user) {
      toast.error('No authenticated user found.');
      return;
    }
    try {
      setCreatingProfile(true);
      // Save detailed profile data to Firestore
      await setDoc(doc(db, 'userProfileData', user.uid), {
        ...formData,
        profileCompleted: true,
        profileCompletedAt: new Date().toISOString()
      });
      toast.success('Profile information saved successfully!');
      setTimeout(() => navigate('/dashboard'), 1200);
    } catch (error: any) {
      toast.error('Failed to save profile: ' + error.message);
    } finally {
      setCreatingProfile(false);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep
            data={formData.personalInfo}
            onChange={(data) => handleStepChange('personalInfo', data)}
            showErrors={showErrors}
            errors={stepErrors}
          />
        );
      case 2:
        return (
          <ReligiousInfoStep
            data={formData.religiousInfo}
            onChange={(data) => handleStepChange('religiousInfo', data)}
            showErrors={showErrors}
            errors={stepErrors}
          />
        );
      case 3:
        return (
          <FamilyBackgroundStep
            data={formData.familyBackground}
            onChange={(data) => handleStepChange('familyBackground', data)}
            showErrors={showErrors}
            errors={stepErrors}
          />
        );
      case 4:
        return (
          <CareerEducationStep
            data={formData.careerEducation}
            onChange={(data) => handleStepChange('careerEducation', data)}
            showErrors={showErrors}
            errors={stepErrors}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 py-6 px-2 sm:px-4 md:py-8">
      <div className="w-full max-w-lg sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-[48%] mx-auto bg-white rounded-lg shadow-sm p-4 sm:p-6 md:p-8">


        <div className="flex flex-row items-center justify-between w-full mb-4 gap-2">
          <h1 className="text-lg sm:text-xl font-bold text-gray-900 mb-0">Complete Your Profile</h1>
          <div className="flex items-center justify-end w-auto">
            <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
          </div>
        </div>
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

        <TabNavigation
          currentStep={currentStep}
          onTabClick={setCurrentStep}
        />

        {renderCurrentStep()}

  <div className="flex flex-row justify-between items-center mt-8 gap-3">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1 || creatingProfile}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors w-full sm:w-auto ${
              currentStep === 1 || creatingProfile
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <ChevronLeft size={16} />
            Previous
          </button>

          <button
            onClick={currentStep === totalSteps ? handleCompleteProfile : handleNext}
            disabled={creatingProfile}
            className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors w-full sm:w-auto ${
              currentStep === totalSteps
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-red-600 text-white hover:bg-red-700'
            } ${creatingProfile ? 'opacity-60 cursor-not-allowed' : ''}`}
          >
            {creatingProfile
              ? 'Creating profile...'
              : currentStep === totalSteps
                ? (<><Check size={18} className="mr-2" /><span>Complete Profile</span></>)
                : (<><span>Next</span> <ChevronRight size={16} /></>)}
          </button>
        </div>
      </div>
    </div>
  );
};