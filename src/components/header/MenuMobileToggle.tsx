"use client";

import { useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { Button } from "../ui/button";
import { MenuMobile } from "./MenuMobile";

// The only stateful part of the header. Extracted so NavBar, Logo and
// NavLinks can stay on the server: a single useState in NavBar was pulling
// the 17KB Logo SVG into the client bundle on every page.
//
// MenuMobile renders absolutely positioned elements, and the flex row this
// sits in is not itself positioned, so they still resolve against the fixed
// <header> exactly as before. Absolutely positioned children are not flex
// items, so the row's `gap` does not apply to them either.
export function MenuMobileToggle() {
  const [open, setToggle] = useState(false);

  return (
    <>
      <Button
        onClick={() => setToggle((value) => !value)}
        variant={"ghost"}
        size={"icon"}
        className="md:hidden relative z-50"
      >
        {open ? (
          <IoClose className="size-6 text-background animate-in fade-in" />
        ) : (
          <IoMenu className="size-6 text-foreground animate-in fade-in" />
        )}
      </Button>
      {open ? <MenuMobile open={open} setToggle={setToggle} /> : null}
    </>
  );
}
