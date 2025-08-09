import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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

  const [formData, setFormData] = useState<FormData>({
    personalInfo: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
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

  // Validation functions for each step
  const validatePersonalInfo = (data: FormData['personalInfo']) => {
    if (!data.firstName || !data.lastName || !data.dateOfBirth || !data.gender || !data.aboutMe || !data.expectations || !data.healthConditions) {
      toast.error('All fields are required.');
      return false;
    }
    // Age validation
    const dob = new Date(data.dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    const m = today.getMonth() - dob.getMonth();
    const day = today.getDate() - dob.getDate();
    let is18 = age > 18 || (age === 18 && (m > 0 || (m === 0 && day >= 0)));
    if (!is18) {
      toast.error('You are under 18. You cannot create an account.');
      return false;
    }
    // Prevent future dates
    if (dob > today) {
      toast.error('Date of birth cannot be in the future.');
      return false;
    }
    return true;
  };
  const validateReligiousInfo = (data: FormData['religiousInfo']) => {
    return (
      data.sunniMuslim &&
      data.revertMuslim &&
      data.prayerFrequency &&
      data.quranReading &&
      data.hijab &&
      data.beard
    );
  };
  const validateFamilyBackground = (data: FormData['familyBackground']) => {
    return (
      data.maritalStatus &&
      data.children &&
      data.wantChildren &&
      data.nationality &&
      data.motherTongue &&
      data.country &&
      data.city
    );
  };
  const validateCareerEducation = (data: FormData['careerEducation']) => {
    return (
      data.education &&
      data.occupation &&
      data.income &&
      data.employmentStatus
    );
  };

  const handleNext = () => {
    let valid = true;
    if (currentStep === 1 && !validatePersonalInfo(formData.personalInfo)) {
      valid = false;
    }
    if (currentStep === 2 && !validateReligiousInfo(formData.religiousInfo)) {
      toast.error('All fields are required.');
      valid = false;
    }
    if (currentStep === 3 && !validateFamilyBackground(formData.familyBackground)) {
      toast.error('All fields are required.');
      valid = false;
    }
    setShowErrors(!valid);
    if (valid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      setShowErrors(false);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCompleteProfile = async () => {
    let valid = true;
    if (!validatePersonalInfo(formData.personalInfo)) {
      setCurrentStep(1);
      valid = false;
    }
    if (!validateReligiousInfo(formData.religiousInfo)) {
      toast.error('All fields are required.');
      setCurrentStep(2);
      valid = false;
    }
    if (!validateFamilyBackground(formData.familyBackground)) {
      toast.error('All fields are required.');
      setCurrentStep(3);
      valid = false;
    }
    if (!validateCareerEducation(formData.careerEducation)) {
      toast.error('All fields are required.');
      setCurrentStep(4);
      valid = false;
    }
    setShowErrors(!valid);
    if (!valid) return;
    const user = auth.currentUser;
    if (!user) {
      toast.error('No authenticated user found.');
      return;
    }
    try {
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
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep
            data={formData.personalInfo}
            onChange={(data) => updateFormData('personalInfo', data)}
            showErrors={showErrors}
          />
        );
      case 2:
        return (
          <ReligiousInfoStep
            data={formData.religiousInfo}
            onChange={(data) => updateFormData('religiousInfo', data)}
            showErrors={showErrors}
          />
        );
      case 3:
        return (
          <FamilyBackgroundStep
            data={formData.familyBackground}
            onChange={(data) => updateFormData('familyBackground', data)}
            showErrors={showErrors}
          />
        );
      case 4:
        return (
          <CareerEducationStep
            data={formData.careerEducation}
            onChange={(data) => updateFormData('careerEducation', data)}
            showErrors={showErrors}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 py-6 px-2 sm:px-4 md:py-8">
      <div className="w-full max-w-lg sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-[48%] mx-auto bg-white rounded-lg shadow-sm p-4 sm:p-6 md:p-8">
        <h1 className="text-lg sm:text-xl font-bold text-center text-gray-900 mb-4">
          Complete Your Profile
        </h1>

        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />

        <TabNavigation
          currentStep={currentStep}
          onTabClick={setCurrentStep}
        />

        {renderCurrentStep()}

        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center mt-8 gap-3">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors w-full sm:w-auto ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <ChevronLeft size={16} />
            Previous
          </button>

          <button
            onClick={currentStep === totalSteps ? handleCompleteProfile : handleNext}
            className={`flex items-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors w-full sm:w-auto ${
              currentStep === totalSteps
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-red-600 text-white hover:bg-red-700'
            }`}
          >
            {currentStep === totalSteps ? 'Complete Profile' : 'Next'}
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};