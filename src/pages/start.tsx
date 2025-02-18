import OpenSaucedLogo from "../assets/opensauced-logo.svg";
import { SUPABASE_LOGIN_URL } from "../constants";

function Start() {

  return (
    <div>
      <img src={OpenSaucedLogo} alt="Open Sauced Logo" />
      <p className="my-4 text-base font-bold text-white leading-5">
        Welcome to the{" "}
        <a
          href="https://opensauced.pizza/"
          className="text-orange no-underline"
        >
          OpenSauced
        </a>{" "}
        browser extension.
      </p>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href={SUPABASE_LOGIN_URL}
        className="bg-orange no-underline border-none rounded-md text-white font-bold py-2 px-4 cursor-pointer
          bg-gradient-to-r from-[#e67e22] to-[#d35400]"
      >
        Login!
      </a>
    </div>
  );
}

export default Start;
