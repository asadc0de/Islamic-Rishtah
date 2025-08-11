import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { FormField } from './FormField';
import { CustomDropdown } from './CustomDropdown';

interface ReligiousInfoData {
  sunniMuslim: string;
  revertMuslim: string;
  prayerFrequency: string;
  quranReading: string;
  hijab: string;
  beard: string;
}

interface ReligiousInfoStepProps {
  data: ReligiousInfoData;
  onChange: (data: Partial<ReligiousInfoData>) => void;
  showErrors?: boolean;
  errors?: any;
}

export const ReligiousInfoStep: React.FC<ReligiousInfoStepProps> = ({ data, onChange, showErrors, errors = {} }) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  const sunniOptions = [
    { value: 'yes-sunni', label: 'Yes I am Sunni' },
  ];

  const revertOptions = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' },
  ];

  const prayerOptions = [
    { value: 'always', label: 'Always' },
    { value: 'often', label: 'Often' },
    { value: 'sometimes', label: 'Sometimes' },
    { value: 'never', label: 'Never' },
  ];

  const quranOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'occasionally', label: 'Occasionally' },
    { value: 'never', label: 'Never' },
  ];

  const hijabOptions = [
    { value: 'niqab', label: 'Niqab' },
    { value: 'hijab', label: 'Hijab' },
    { value: 'none', label: 'None' },
  ];

  const beardOptions = [
    { value: 'full-beard', label: 'Full Beard' },
    { value: 'trimmed', label: 'Trimmed' },
    { value: 'mustache-only', label: 'Mustache Only' },
    { value: 'clean-shaven', label: 'Clean Shaven' },
  ];

  const handleDropdownToggle = (dropdownId: string, isOpen: boolean) => {
    setOpenDropdown(isOpen ? dropdownId : null);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Heart className="text-red-600" size={18} />
        <div>
          <h2 className="text-base font-bold text-gray-900">Religious Info</h2>
          <p className="text-xs text-gray-600">Share your religious preferences and practices</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <FormField label="Are you a Sunni Muslim?" required error={showErrors ? errors.sunniMuslim : undefined}>
          <CustomDropdown
            options={sunniOptions}
            value={data.sunniMuslim}
            placeholder="Select An Option"
            onChange={(value) => onChange({ sunniMuslim: value })}
            isOpen={openDropdown === 'sunni'}
            onToggle={(isOpen) => handleDropdownToggle('sunni', isOpen)}
          />
        </FormField>

  <FormField label="Are You a Revert Muslim?" required error={showErrors ? errors.revertMuslim : undefined}>
          <CustomDropdown
            options={revertOptions}
            value={data.revertMuslim}
            placeholder="Are You a Revert Muslim?"
            onChange={(value) => onChange({ revertMuslim: value })}
            isOpen={openDropdown === 'revert'}
            onToggle={(isOpen) => handleDropdownToggle('revert', isOpen)}
          />
        </FormField>

  <FormField label="Prayer Frequency" required error={showErrors ? errors.prayerFrequency : undefined}>
          <CustomDropdown
            options={prayerOptions}
            value={data.prayerFrequency}
            placeholder="Prayer Frequency"
            onChange={(value) => onChange({ prayerFrequency: value })}
            isOpen={openDropdown === 'prayer'}
            onToggle={(isOpen) => handleDropdownToggle('prayer', isOpen)}
          />
        </FormField>

  <FormField label="Quran Reading" required error={showErrors ? errors.quranReading : undefined}>
          <CustomDropdown
            options={quranOptions}
            value={data.quranReading}
            placeholder="Quran Reading"
            onChange={(value) => onChange({ quranReading: value })}
            isOpen={openDropdown === 'quran'}
            onToggle={(isOpen) => handleDropdownToggle('quran', isOpen)}
          />
        </FormField>

  <FormField label="Hijab" required error={showErrors ? errors.hijab : undefined}>
          <CustomDropdown
            options={hijabOptions}
            value={data.hijab}
            placeholder="Hijab Preference"
            onChange={(value) => onChange({ hijab: value })}
            isOpen={openDropdown === 'hijab'}
            onToggle={(isOpen) => handleDropdownToggle('hijab', isOpen)}
          />
        </FormField>

  <FormField label="Beard" required error={showErrors ? errors.beard : undefined}>
          <CustomDropdown
            options={beardOptions}
            value={data.beard}
            placeholder="Beard Preference"
            onChange={(value) => onChange({ beard: value })}
            isOpen={openDropdown === 'beard'}
            onToggle={(isOpen) => handleDropdownToggle('beard', isOpen)}
          />
        </FormField>
      </div>
    </div>
  );
};