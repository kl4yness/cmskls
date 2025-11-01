"use client";
import { registerUser } from "@/app/actions/register";
import { signInWithCredetials } from "@/app/actions/signIn";
import {
  Tabs,
  Tab,
  Input,
  Link,
  Button,
  Card,
  CardBody,
  addToast,
} from "@heroui/react";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function AuthForm() {
  const [selected, setSelected] = useState("login");

  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: "",
  });

  const [registerFormData, setRegisterFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signInWithCredetials(
      loginFormData.username,
      loginFormData.password
    );

    if (!result.success) {
      addToast({
        title: "Error of auth",
        description: result.message,
        color: "danger",
      });
      return;
    }

    addToast({
      title: "Success!",
      description: result.message,
      color: "success",
    });

    if (result.success) {
      redirect("/pages/profile");
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await registerUser(registerFormData);

    if (!result.success) {
      addToast({
        title: "Error",
        description: result.message,
        color: "danger",
      });
      return;
    }

    if (result.success) {
      addToast({
      title: "Success!",
      description: "Account registered ✅",
      color: "success",
    });
      redirect('/pages/profile')
    }
  };

  return (
    <div className="flex flex-col w-full items-center">
      <Card className="max-w-full w-[340px] h-[400px]">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            aria-label="Tabs form"
            selectedKey={selected}
            onSelectionChange={(key) => setSelected(String(key))}
            size="md"
          >
            <Tab key="login" title="Login">
              <form className="flex flex-col gap-4" onSubmit={handleLogin}>
                <Input
                  isRequired
                  label="Username"
                  placeholder="Enter your username"
                  type="text"
                  value={loginFormData.username}
                  onChange={(e) =>
                    setLoginFormData({
                      ...loginFormData,
                      username: e.target.value,
                    })
                  }
                />
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  value={loginFormData.password}
                  onChange={(e) =>
                    setLoginFormData({
                      ...loginFormData,
                      password: e.target.value,
                    })
                  }
                />
                <p className="text-center text-small">
                  Need to create an account?{" "}
                  <Link size="sm" onPress={() => setSelected("sign-up")}>
                    Sign up
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="primary" type="submit">
                    Login
                  </Button>
                </div>
              </form>
            </Tab>
            <Tab key="sign-up" title="Sign up">
              <form
                className="flex flex-col gap-4 h-[300px]"
                onSubmit={handleRegister}
              >
                <Input
                  isRequired
                  label="Username"
                  placeholder="Enter your username"
                  type="text"
                  value={registerFormData.username}
                  onChange={(e) =>
                    setRegisterFormData({
                      ...registerFormData,
                      username: e.target.value,
                    })
                  }
                />
                <Input
                  isRequired
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  value={registerFormData.password}
                  onChange={(e) =>
                    setRegisterFormData({
                      ...registerFormData,
                      password: e.target.value,
                    })
                  }
                />
                <Input
                  isRequired
                  label="Confirm password"
                  placeholder="Confirm your password"
                  type="password"
                  value={registerFormData.confirmPassword}
                  onChange={(e) =>
                    setRegisterFormData({
                      ...registerFormData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
                <p className="text-center text-small">
                  Already have an account?{" "}
                  <Link size="sm" onPress={() => setSelected("login")}>
                    Login
                  </Link>
                </p>
                <div className="flex gap-2 justify-end">
                  <Button fullWidth color="primary" type="submit">
                    Sign up
                  </Button>
                </div>
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
