import { Form, Input, Button, Card, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useImage } from "../hooks/useImage";
import { useMutation } from "@tanstack/react-query";
import { signup } from "../service/signup";
import { toast, ToastContainer } from "react-toastify";

const { Title, Text } = Typography;

interface SignupData {
  username: string;
  email: string;
  password: string;
}

export default function Signup() {
  const navigate = useNavigate();

  const { data: image, isLoading, isError } = useImage();

  const mutation = useMutation({
    mutationFn: signup,
    onSuccess: (response: any) => {
      const token = response?.data?.accessToken;

      if (token) {
        localStorage.setItem("accessToken", token);
      }

      toast.success("ثبت نام موفق بود");

      setTimeout(() => {
        navigate("/login");
      }, 800);
    },
    onError: (error: any) => {
      if (error?.response?.status === 409) {
        toast.info("کاربر قبلاً ثبت‌نام کرده است");
      } else {
        toast.error("خطایی رخ داد");
      }
    },
  });

  const onFinish = (values: SignupData) => {
    mutation.mutate(values);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>خطا در دریافت تصویر</div>;

  return (
    <div className="min-h-screen flex bg-gray-100">
      <ToastContainer />

      <div className="hidden lg:flex w-1/2 bg-blue-600 items-center justify-center">
        <div className="text-center text-white px-10">
          <img
            className="w-[40%] mx-auto mb-6 rounded-full"
            src={image}
            alt="logo"
          />

          <Title level={2} style={{ color: "white" }}>
            ایجاد حساب کاربری
          </Title>

          <Text className="!text-lg" style={{ color: "white" }}>
            به سامانه مدیریت اطلاعات خوش آمدید
          </Text>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center p-5">
        <Card className="w-full max-w-md shadow-2xl rounded-3xl">

          <div className="text-center mb-8">
            <Title level={2}>ثبت‌نام</Title>
            <Text className="text-gray-500 !text-lg">
              اطلاعات خود را وارد کنید
            </Text>
          </div>

          <Form layout="vertical" onFinish={onFinish}>

            <Form.Item
              label="نام کاربری"
              name="username"
              rules={[{ required: true, message: "الزامی است" }]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              label="ایمیل"
              name="email"
              rules={[
                { required: true },
                { type: "email", message: "ایمیل نامعتبر" },
              ]}
            >
              <Input size="large" />
            </Form.Item>

            <Form.Item
              label="رمز عبور"
              name="password"
              rules={[
                { required: true },
                { min: 6 },
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
              ایجاد حساب
            </Button>

            <div className="text-center  mt-4">
              <Text className="!text-sm">
                حساب دارید؟ <Link className="text-base" to="/login">ورود</Link>
              </Text>
            </div>

          </Form>
        </Card>
      </div>
    </div>
  );
}