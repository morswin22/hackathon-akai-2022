import { useState } from "react";
import { Button } from "react-bootstrap";

export default function Unicorn() {
  const [clicked, setClicked] = useState(false);

  return <>
    <Button onClick={() => setClicked(true)}>{clicked ? 'No they dont 😡💔' : 'Unicorns exist! 🦄'}</Button>
  </>;
}