import React from "react";

import { StateErrorsProps, ValuesProps } from "@/presentation/pages/login";

export interface ContextData {
    stateErrors: StateErrorsProps,
    values: ValuesProps,
    setValues: (data: ValuesProps) => void
}

export default React.createContext<ContextData>(null);