import { Form, Input, Button, Card, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast, ToastContainer } from "react-toastify";
import { signin } from "../service/signin";
import { useImage } from "../hooks/useImage";
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";

const { Title, Text } = Typography;

interface LoginData {
  email: string;
  password: string;
}

export default function Login() {
  
  const navigate = useNavigate();
  const [captchaToken, setCaptchaToken] = useState("");

console.log(import.meta.env.VITE_RECAPTCHA_SITE_KEY);
  const { data: image, isLoading, isError } = useImage();

  const mutation = useMutation({
    mutationFn: signin,
    onSuccess: (response: any) => {
      const token = response?.data?.accessToken;
      if (token) {
        localStorage.setItem("accessToken", token);
      }

      toast.success("ورود با موفقیت انجام شد");

      setTimeout(() => {
        navigate("/layout/managerDashboard");
      }, 800);
    },
    onError: (error: any) => {
      if (error?.response?.status === 409) {
        toast.info("کاربر قبلاً ثبت‌نام کرده است");
      } else {
        toast.error("ایمیل یا رمز عبور اشتباه است");
      }
    },
  });

const onFinish = (values: LoginData) => {
   if (!captchaToken) {
    toast.error("لطفاً ابتدا کپچا را تکمیل کنید.");
    return;
  }
  mutation.mutate({
    ...values,
    captchaToken,
  });
  console.log(values);
console.log(captchaToken);
};

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>خطا در دریافت تصویر</div>;
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      <ToastContainer />

      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 bg-blue-600 items-center justify-center">
        <div className="text-center text-white px-10">
          <img className="w-[40%] rounded-full mx-auto mb-6" src={image} alt="logo" />

          <Title level={2} style={{ color: "white" }}>
            ورود به حساب کاربری
          </Title>

          <Text className="!text-lg" style={{ color: "white" }}>
            به سامانه مدیریت اطلاعات خوش آمدید
          </Text>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex flex-1 items-center justify-center p-5">
        <Card className="w-full max-w-md shadow-2xl rounded-3xl">
          <div className="text-center mb-8">
            <Title level={2}>ورود</Title>

            <Text className="!text-base text-gray-500">اطلاعات خود را وارد کنید</Text>
          </div>

          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="ایمیل"
              name="email"
              rules={[
                {
                  required: true,
                  message: "ایمیل را وارد کنید",
                },
                {
                  type: "email",
                  message: "ایمیل نامعتبر است",
                },
              ]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              label="رمز عبور"
              name="password"
              rules={[
                {
                  required: true,
                  message: "رمز عبور را وارد کنید",
                },
                {
                  min: 6,
                  message: "رمز عبور باید حداقل ۶ کاراکتر باشد",
                },
              ]}
            >
              <Input.Password size="large" />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              block
              loading={mutation.isPending}
              className="h-12 mt-2"
            >
              ورود
            </Button>

            <div className="text-center mt-4">
              <Text className="!text-sm">
                حساب ندارید؟ <Link className="!text-lg" to="/signup">ثبت‌نام</Link>
              </Text>
            </div>
            <div className="flex mt-2 items-center justify-center">
      <ReCAPTCHA
  sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
  onChange={(token) => setCaptchaToken(token ?? "")}
/>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
}