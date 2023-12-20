const isDevelopment = process.env.NODE_ENV !== "production";
module.exports = {
  presets: ["@babel/preset-env", ["@babel/preset-react", { runtime: "automatic" }]],
  plugins: [
    isDevelopment && "react-refresh/babel"
    // ... other plugins
  ].filter(Boolean)
};
