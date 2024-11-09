"use client"
import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LoginModule from "../Auth/LoginModule";
import SignUpModule from "../Auth/SignUpModule";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AuthModal({authRoute,setAuthRoute, openAuthModal, setAuthModal,setRefreshNav }) {
  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openAuthModal}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={openAuthModal}>
          <Box sx={style}>
            {/* Close button */}
            <button
              className="absolute top-2 right-2 p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900"
              onClick={() => setAuthModal(false)}
              aria-label="Close"
            >
              <span className="text-xl">&times;</span>
            </button>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              
            {authRoute ==="login" && "Login Now"}
              {authRoute ==="signup" && "Sign-Up"}
            </Typography>
            {authRoute === "login" && <LoginModule  setAuthModal={setAuthModal} setRefreshNav={setRefreshNav}/>}
            {authRoute === "signup" && <SignUpModule setAuthModal={setAuthModal} setAuthRoute={setAuthRoute}/>}
            {/* Close Button */}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
