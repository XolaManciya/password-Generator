type passwordProps = {
  length: number;
  upperCaseIsChecked: boolean;
  lowerCaseIsChecked: boolean;
  symbolIsChecked: boolean;
  numberIsChecked: boolean;
};

const random = (min = 0, max = 1) => {
  return Math.floor(Math.random() * (max + 1 - min) + min);
};

const randomLower = () => {
  return String.fromCharCode(random(97, 122));
};

const randomUpper = () => {
  return String.fromCharCode(random(65, 90));
};

const randomSymbol = () => {
  const symbols = "~*$%@#^&!?*'-=/,.{}()[]<>";
  return symbols[random(0, symbols.length - 1)];
};

export default function PasswordGeneratorutils() {
  const generatePassword = ({
    length,
    lowerCaseIsChecked,
    numberIsChecked,
    symbolIsChecked,
    upperCaseIsChecked,
  }: passwordProps) => {
    let password = "";

    if (
      !lowerCaseIsChecked &&
      !upperCaseIsChecked &&
      !numberIsChecked &&
      !symbolIsChecked
    ) {
      return { error: "Password must have at least 1 character." };
    } else if (length === 0) {
      return { error: "Password length cannot be 0" };
    }

    for (let i = 0; i < length; i++) {
      let choice = random(0, 3);
      if (lowerCaseIsChecked && choice === 0) {
        password += randomLower();
      } else if (upperCaseIsChecked && choice === 1) {
        password += randomUpper();
      } else if (symbolIsChecked && choice === 2) {
        password += randomSymbol();
      } else if (numberIsChecked && choice === 3) {
        password += random(0, 9);
      } else {
        i--;
      }
    }
    return { password: password };
  };

  const checkPasswordStrength = (password: string) => {
    let score = 0;
    if (!password) {
      score = 0;
    }
    if (password.length >= 8) {
      score += 1;
    }
    if (/[a-z]/.test(password)) {
      score += 1;
    }
    if (/[A-Z]/.test(password)) {
      score += 1;
    }
    if (/\d/.test(password)) {
      score += 1;
    }
    if (/[^A-Za-z0-9]/.test(password)) {
      score += 1;
    }

    //return password strength
    switch (score) {
      case 0:
        return { passwordStrength: "TOO WEAK" };
      case 1:
        return { passwordStrength: "TOO WEAK" };
      case 2:
        return { passwordStrength: "WEAK" };
      case 3:
        return { passwordStrength: "WEAK" };
      case 4:
        return { passwordStrength: "MEDIUM" };
      case 5:
        return { passwordStrength: "STRONG" };

      default:
        return { passwordStrength: "TOO WEAK" };
    }
  };
  return { checkPasswordStrength, generatePassword };
}
