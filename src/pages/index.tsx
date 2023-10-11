import SignupForm from "~/components/SignUpForm";

import React, { useState, Fragment } from "react";
import { Container, Input } from "~/components";
import Password from "~/components/Password";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Container>
      {!isLoggedIn ? (
        <>
          <SignupForm />
        </>
      ) : (
        <Fragment>
          <h3>Hello World</h3>
        </Fragment>
      )}
    </Container>
  );
}
