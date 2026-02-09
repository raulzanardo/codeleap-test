// removed generated route types import (may be created by react-router typegen)
import { useState } from "react";
import { useNavigate } from "react-router";
import { Modal } from "../components/modal";
import TextInput from "../components/textInput";

export function meta() {
  return [
    { title: "CodeLeap Engineering Test - Sign Up" },
    { name: "description", content: "CodeLeap Engineering Test - Sign Up" },
  ];
}

export default function Home() {
  const [open, setOpen] = useState(true);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  function handleSubmit(name: string) {
    if (name.trim().length === 0) return;
    // store username and navigate to main page
    try {
      localStorage.setItem("username", name);
    } catch (e) {}
    setOpen(false);
    setUsername("");
    navigate("/home");
  }

  return (
    <>
      <Modal
        title="Welcome to CodeLeap network!"
        subtitle="Please enter your username"
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        actions={[
          {
            label: "ENTER",
            variant: "primary",
            onClick: () => handleSubmit(username),
            disabled: username.trim().length === 0,
          },
        ]}
        closeOnEsc={false}
        closeOnOverlayClick={false}
        showOverlay={false}
      >
        <div className="w-full">
          <TextInput
            value={username}
            onChange={setUsername}
            placeholder="John doe"
            onEnter={() => handleSubmit(username)}
          />
        </div>
      </Modal>
    </>
  );
}
