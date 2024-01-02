import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { number, string, z } from "zod";
import RegisterForm from "../components/RegisterForm";
import manIllustration from "../assets/img/illustrations/illustration_register_man.png";
import avatarIcon from "../assets/img/icons/icon_avatar.png";
import { fetchFnc } from "../utils/fetch";
import { useAuth } from "../hooks/auth/useAuth";
import { errorToast, successToast } from "../utils/helpers";
import axios from "axios";

const Register = () => {
  const onRegister = async (data) => {
    const formData = new FormData();

    for (const key in data) {
      if (
        data["type"] === "VOYAGEUR" &&
        (key === "vehicleBrand" ||
          key === "vehicleMatricule" ||
          key === "vehicleMaxPlace" ||
          key === "vehicleModel" ||
          key === "vehicleYear")
      ) {
        continue;
      }
      formData.append(key, data[key]);
    }

    fetchFnc({
      url: "auth/sign-up",
      method: "post",
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
      data: data,
    })
      .then((successMsg) => successToast(successMsg))
      .catch((errMsg) => errorToast(errMsg));
  };

  return (
    <section className="register-section">
      <div className="register-wrapper">
        <div className="form-structure">
          <div className="register-header">
            <img src={avatarIcon} alt="Avatar" />
            <h2>Partagez la route avec nous</h2>
            <h4>Inscrivez-vous maintenant</h4>
          </div>

          <RegisterForm onRegister={onRegister} />
        </div>

        <img
          className="form-illustration"
          src={manIllustration}
          alt="Man Waving"
        />
      </div>
    </section>
  );
};

export default Register;
