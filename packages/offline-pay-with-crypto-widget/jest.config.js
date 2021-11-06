module.exports = {
  preset: 'ts-jest',
  transform: {
  '^.+\\.(ts|tsx)?$': 'ts-jest',
  "^.+\\.(js|jsx)$": "babel-jest",
  },
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  testEnvironment: "node",
  testTimeout: 30000,
};
