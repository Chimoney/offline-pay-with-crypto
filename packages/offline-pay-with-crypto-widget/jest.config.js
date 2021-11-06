module.exports = {
  preset: 'ts-jest', 
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  transform: {
  '^.+\\.(ts|tsx)?$': '<rootDir>/node_modules/ts-jest',
  "^.+\\.(js|jsx)$": "<rootDir>/node_modules/babel-jest",
  },
  testEnvironment: "jsdom",
  testTimeout: 30000,
  "moduleNameMapper": {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.js",
    "\\.(scss|sass|css)$": "identity-obj-proxy"
  }
};
