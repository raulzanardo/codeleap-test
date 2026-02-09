import { useState } from "react";
import { Modal } from "../components/modal";
import TextInput from "../components/textInput";

export function SignUp() {
  const [open, setOpen] = useState(true);
  const [username, setUsername] = useState("");

  function handleSubmit(name: string) {
    if (name.trim().length === 0) return;
    console.log("username submitted:", name);
    setOpen(false);
    setUsername("");
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
