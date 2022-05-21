import React, { createContext, ReactNode, useContext, useEffect } from "react";

type TVars = {
  [x: string]: string;
};

type Source = {
  [key: string]: string;
};

type ManagerContextType = {
  t: (key: keyof Source, variables?: TVars) => string | undefined;
};

type Language = {
  language: string;
  source: Source;
};

type LanguageConfig = {
  languages: [Language, Language];
  defaultLanguage: string;
};

const LanguageManagerContext = createContext<ManagerContextType>({
  t: () => undefined,
});

class LanguageManager {
  current: string;
  config: LanguageConfig;
  source: Source;
  constructor() {
    this.config = {} as LanguageConfig;
    this.current = "";
    this.source = {} as Source;
  }

  initialize(config: LanguageConfig) {
    this.config = config;
    this.current = config.defaultLanguage;
    const defaultLang = this.config.defaultLanguage;
    const languages = this.config.languages;
    const initialSource = languages[0].source;
    const defaultSource = languages.find(
      ({ language }) => language === defaultLang
    );
    if (defaultSource) {
      this.source = defaultSource.source;
      return;
    }
    this.source = initialSource;
  }

  changeLanguage(lang?: string) {
    if (!lang) {
      const current = this.current;
      const currentIndex = this.config.languages.findIndex(
        ({ language }) => language.toLowerCase() === current.toLowerCase()
      );
      if (currentIndex === 0) {
        this.source = this.config.languages[1].source;
      }
      this.source = this.config.languages[0].source;
      return;
    }
    const languageItem = this.config.languages.find(
      ({ language }) => language.toLowerCase() === lang.toLowerCase()
    );

    if (languageItem) {
      this.source = languageItem.source;
      return;
    }
    const defaultItem = this.config.languages.find(
      ({ language }) => language === this.config.defaultLanguage
    );

    if (defaultItem) {
      this.source = defaultItem?.source;
    }
  }
}

interface LanguageProviderProps {
  children: ReactNode;
  config: LanguageConfig;
}

const LanguageProvider = ({ children, config }: LanguageProviderProps) => {
  const manager = new LanguageManager();
  useEffect(() => {
    manager.initialize(config);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config]);
  const t = (key: keyof Source, variables?: TVars) => {
    if (Object.prototype.hasOwnProperty.call(manager.source, key)) {
      return manager.source[key];
    }
    return undefined;
  };

  return (
    <LanguageManagerContext.Provider value={{ t }}>
      {children}
    </LanguageManagerContext.Provider>
  );
};

const useTranslation = () => {
  return useContext(LanguageManagerContext);
};

export type { LanguageConfig };
export { LanguageManager, useTranslation };
export default LanguageProvider;
