import React, { ReactNode } from "react";
import {
  useCustomerInvokeContextValue,
  CustomerInvokeContext
} from "./onboarding-context";

export type CustomerInvokeProviderProps = {
  children: ReactNode;
};

const CustomerInvokeProvider = (props: CustomerInvokeProviderProps) => {
  const { children } = props;
  const onboardingContextData = useCustomerInvokeContextValue();

  return (
    <CustomerInvokeContext.Provider value={onboardingContextData}>
      {children}
    </CustomerInvokeContext.Provider>
  );
};

export default CustomerInvokeProvider;
