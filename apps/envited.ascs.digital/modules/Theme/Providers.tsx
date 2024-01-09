'use client'

import { ThemeProvider } from 'next-themes'
import React, { FC, ReactNode } from 'react'

export const Providers: FC<{ children: ReactNode }> = ({ children }) => <ThemeProvider>{children}</ThemeProvider>
