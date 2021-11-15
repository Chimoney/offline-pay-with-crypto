import * as React from 'react';
import {  AnimatePresence } from "framer-motion";

export const ModalContainer = ({ children }) => (
    <AnimatePresence
      initial={false}
      exitBeforeEnter={true}
      onExitComplete={() => null}
    >
      {children}
    </AnimatePresence>
  );
