import React, { ReactNode } from 'react';
import { useOnboardingContextValue, OnboardingContext } from './onboarding-context';

export type OnboardingProviderProps = {
  children: ReactNode;
};

const OnboardingProvider = (props: OnboardingProviderProps) => {
  const { children } = props;
  const onboardingContextData = useOnboardingContextValue();

  return (
    <OnboardingContext.Provider value={onboardingContextData}>
      {children}
    </OnboardingContext.Provider>
  );
};

export default OnboardingProvider;
