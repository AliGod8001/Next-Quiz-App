const birthDateConfig = {
  rules: [
    {
      type: "object" as const,
      required: true,
      message: "Please select your birth date!",
    },
  ],
};

const usernameConfig = {
  rules: [{ required: true, message: "Please enter your username!" }],
};

const emailConfig = {
  rules: [{ required: true, message: "Please enter your email!" }],
};

const passwordConfig = {
  rules: [{ required: true, message: "Please enter your Password!" }],
};

const rePasswordConfig = {
  rules: [{ required: true, message: "Please enter your re password!" }],
};

export {
  usernameConfig,
  birthDateConfig,
  emailConfig,
  passwordConfig,
  rePasswordConfig
}