interface LoginPayload {
  username: string,
  password: string
}

interface SignupPayload {
  username: string,
  email: string,
  password: string
  rePassword: string,
  birthDate: AntDesignDatePickerValue,
}

interface UserEditPayload {
  username: string,
  oldpassword?: string | null,
  newpassword?: string | null,
  repassword?: string | null,
  birthdate?: AntDesignDatePickerValue | null,
  profileimage?: string | null,
}

type AntDesignDatePickerValue = {
  $M: number;
  $D: number;
  $H: number;
  $L: string;
  $W: number;
  $d: string;
  $m: number;
  $ms: number;
  $s: number;
  $u: undefined;
  $x: {};
  $y: number;
}